using Microsoft.EntityFrameworkCore;
using Models;
using Utils;
using static Utils.Utils;
using static Utils.ApiResponse<Models.words>;

public class WordsService
{
    private readonly AppDbContext _context;

    public WordsService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<words>>> Get(
        string userName,
        string? word = null)
    {
        var query = _context.words.AsQueryable();

        if (!string.IsNullOrWhiteSpace(word))
            query = query.Where(w => w.word.ToLower().Contains(word.ToLower()));

        query = from w in query
                join u in _context.users
                    on w.user_id equals u.id
                where u.username == userName
                select w;

        var data = await query.ToListAsync();

        return ApiResponse<List<words>>.Ok(
            data: data
        );
    }

    public async Task<ApiResponse<words>> Add(WordRequestBody record)
    {
        record.user_id = _context.users.FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.word))
            return Fail("ErrorWordEmpty");

        if (string.IsNullOrWhiteSpace(record.user_id))
            return Fail("ErrorUserIdEmpty");

        var existing = await _context.words
            .FirstOrDefaultAsync(e => e.word == record.word && e.user_id == record.user_id);

        if (existing != null)
            return Fail("ErrorDuplicateWord");

        var new_record = new words
        {
            word = record.word,
            user_id = record.user_id,
            id = GetRandomId()
        };

        _context.words.Add(new_record);
        await _context.SaveChangesAsync();
        return Ok(new_record);
    }

    public async Task<ApiResponse<words>> Update(WordRequestBody record)
    {
        record.user_id = _context.users.FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.id))
            return Fail("ErrorIdEmpty");

        if (string.IsNullOrWhiteSpace(record.word))
            return Fail("ErrorWordEmpty");

        if (string.IsNullOrWhiteSpace(record.user_id))
            return Fail("ErrorUserIdEmpty");

        var existing = await _context.words
            .FirstOrDefaultAsync(e => e.word == record.word && e.user_id == record.user_id && e.id != record.id);

        if (existing != null)
            return Fail("ErrorDuplicateWord");

        var existingRecord = await _context.words.FindAsync(record.id);

        if (existingRecord == null) return Fail("ErrorNotFound");

        _context.Entry(existingRecord).CurrentValues.SetValues(record);

        await _context.SaveChangesAsync();

        return Ok(existingRecord);
    }

    public async Task<ApiResponse<words>> Delete(string id)
    {
        var existing = await _context.words.FindAsync(id);
        if (existing == null)
            return Fail("ErrorNotExist");

        _context.words.Remove(existing);
        await _context.SaveChangesAsync();

        return ApiResponse<words>.Ok(null);
    }
}