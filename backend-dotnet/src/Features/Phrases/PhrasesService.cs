using Microsoft.EntityFrameworkCore;
using Models;
using Utils;
using static Utils.Utils;
using static Utils.ApiResponse<Models.phrases>;

public class PhrasesService
{
    private readonly AppDbContext _context;

    public PhrasesService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<phrases>>> Get(string username, string? phrase = null)
    {
        var query = _context.phrases.AsQueryable();

        if (!string.IsNullOrWhiteSpace(phrase))
            query = query.Where(p => p.phrase.ToLower().Contains(phrase.ToLower()));

        query = from p in query
                join u in _context.users
                    on p.user_id equals u.id
                where u.username == username
                select p;

        var data = await query.ToListAsync();
        return ApiResponse<List<phrases>>.Ok(data);
    }

    public async Task<ApiResponse<phrases>> Add(PhraseRequestBody record)
    {
        record.user_id = _context.users.FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.phrase)) return Fail("ErrorPhraseEmpty");
        if (string.IsNullOrWhiteSpace(record.meaning)) return Fail("ErrorMeaningEmpty");
        if (string.IsNullOrWhiteSpace(record.user_id)) return Fail("ErrorUserIdEmpty");

        var existing = await _context.phrases
            .FirstOrDefaultAsync(e => e.phrase == record.phrase && e.user_id == record.user_id);

        if (existing != null) return Fail("ErrorDuplicatePhrase");

        var newRecord = new phrases
        {
            id = GetRandomId(),
            phrase = record.phrase,
            meaning = record.meaning,
            example = record.example,
            user_id = record.user_id
        };

        _context.phrases.Add(newRecord);
        await _context.SaveChangesAsync();

        return ApiResponse<phrases>.Ok(newRecord);
    }

    public async Task<ApiResponse<phrases>> Update(PhraseRequestBody record)
    {
        record.user_id = _context.users.FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.id)) return Fail("ErrorIdEmpty");
        if (string.IsNullOrWhiteSpace(record.phrase)) return Fail("ErrorPhraseEmpty");
        if (string.IsNullOrWhiteSpace(record.meaning)) return Fail("ErrorMeaningEmpty");

        var existing = await _context.phrases
            .FirstOrDefaultAsync(e => e.phrase == record.phrase && e.user_id == record.user_id && e.id != record.id);

        if (existing != null) return Fail("ErrorDuplicatePhrase");

        var existingRecord = await _context.phrases.FindAsync(record.id);

        if (existingRecord == null) return Fail("ErrorNotFound");

        _context.Entry(existingRecord).CurrentValues.SetValues(record);
        await _context.SaveChangesAsync();

        return ApiResponse<phrases>.Ok(existingRecord);
    }

    public async Task<ApiResponse<phrases>> Delete(string id)
    {
        var existing = await _context.phrases.FindAsync(id);
        if (existing == null) return Fail("ErrorNotExist");

        _context.phrases.Remove(existing);
        await _context.SaveChangesAsync();

        return ApiResponse<phrases>.Ok(null);
    }
}
