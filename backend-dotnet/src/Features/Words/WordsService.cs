using Microsoft.EntityFrameworkCore;
using Models;
using Utils;
using static Utils.Utils;
using static Features.WordsTranslation;
using static Utils.ApiResponse<Models.words>;

public class WordsService
{
    private readonly AppDbContext _context;

    public WordsService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<words>>> Get(
        int pageIndex,
        int pageSize,
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

        var totalCount = await query.CountAsync();

        query = query
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize);

        var data = await query.ToListAsync();

        return ApiResponse<List<words>>.Ok(
            data: data,
            pageIndex: pageIndex,
            pageSize: pageSize,
            totalCount: totalCount
        );
    }

    public async Task<ApiResponse<words>> Add(WordRequestBody record, string language = "en")
    {
        record.user_id = _context.users.FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.word))
            return Fail(ErrorWordEmpty, language);

        if (string.IsNullOrWhiteSpace(record.user_id))
            return Fail(ErrorUserIdEmpty, language);

        var existing = await _context.words
            .FirstOrDefaultAsync(e => e.word == record.word && e.user_id == record.user_id);

        if (existing != null)
            return Fail(ErrorDuplicateWord, language);

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

    public async Task<ApiResponse<words>> Update(WordRequestBody record, string language = "en")
    {
        record.user_id = _context.users.FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.id))
            return Fail(ErrorIdEmpty, language);

        if (string.IsNullOrWhiteSpace(record.word))
            return Fail(ErrorWordEmpty, language);

        if (string.IsNullOrWhiteSpace(record.user_id))
            return Fail(ErrorUserIdEmpty, language);

        var existing = await _context.words
            .FirstOrDefaultAsync(e => e.word == record.word && e.user_id == record.user_id && e.id != record.id);

        if (existing != null)
            return Fail(ErrorDuplicateWord, language);

        var existingRecord = await _context.words.FindAsync(record.id) ?? throw new InvalidOperationException("Record not found");

        _context.Entry(existingRecord).CurrentValues.SetValues(record);

        await _context.SaveChangesAsync();

        return Ok(existingRecord);
    }

    public async Task<ApiResponse<bool>> Delete(string id, string language = "en")
    {
        var row = await _context.words.FindAsync(id) ?? throw new InvalidOperationException("Record not found");
        _context.words.Remove(row);
        await _context.SaveChangesAsync();
        return ApiResponse<bool>.Ok(true);
    }
}