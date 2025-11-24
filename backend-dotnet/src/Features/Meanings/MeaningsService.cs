using Microsoft.EntityFrameworkCore;
using Models;
using Utils;
using static Utils.Utils;
using static Utils.ApiResponse<Models.meanings>;

public class MeaningsService
{
    private readonly AppDbContext _context;

    public MeaningsService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<meanings>>> Get(string username, string? word = null)
    {
        var query = _context.meanings.AsQueryable();

        if (!string.IsNullOrWhiteSpace(word))
            query = query.Where(m => m.word.ToLower().Contains(word.ToLower()));

        query = from m in query
                join u in _context.users
                    on m.user_id equals u.id
                where u.username == username
                select m;

        var data = await query.ToListAsync();
        return ApiResponse<List<meanings>>.Ok(data);
    }

    public async Task<ApiResponse<meanings>> Add(MeaningRequestBody record)
    {
        record.user_id = _context.users.FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.meaning))
            return Fail("ErrorMeaningEmpty");

        if (string.IsNullOrWhiteSpace(record.word))
            return Fail("ErrorWordEmpty");

        var newRecord = new meanings
        {
            id = GetRandomId(),
            word = record.word,
            meaning = record.meaning,
            part_of_speech = record.part_of_speech,
            user_id = record.user_id
        };

        _context.meanings.Add(newRecord);
        await _context.SaveChangesAsync();

        return ApiResponse<meanings>.Ok(newRecord);
    }

    public async Task<ApiResponse<meanings>> Update(MeaningRequestBody record)
    {
        if (string.IsNullOrWhiteSpace(record.id))
            return Fail("ErrorIdEmpty");

        var existing = await _context.meanings.FindAsync(record.id);
        if (existing == null)
            return Fail("ErrorNotExist");

        existing.word = record.word;
        existing.meaning = record.meaning;
        existing.part_of_speech = record.part_of_speech;

        await _context.SaveChangesAsync();
        return ApiResponse<meanings>.Ok(existing);
    }

    public async Task<ApiResponse<meanings>> Delete(string id)
    {
        var existing = await _context.meanings.FindAsync(id);
        if (existing == null)
            return Fail("ErrorNotExist");

        _context.meanings.Remove(existing);
        await _context.SaveChangesAsync();
        return ApiResponse<meanings>.Ok(null);
    }
}
