using Microsoft.EntityFrameworkCore;
using Models;
using Utils;
using static Utils.Utils;
using static Utils.ApiResponse<Models.synonyms>;

public class SynonymsService
{
    private readonly AppDbContext _context;

    public SynonymsService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<synonyms>>> Get(
        string userName,
        string? word = null,
        string? synonym = null)
    {
        var query = _context.synonyms.AsQueryable();

        if (!string.IsNullOrWhiteSpace(word))
            query = query.Where(s => s.word.ToLower().Contains(word.ToLower()));

        if (!string.IsNullOrWhiteSpace(synonym))
            query = query.Where(s => s.synonym.ToLower().Contains(synonym.ToLower()));

        query = from s in query
                join u in _context.users on s.user_id equals u.id
                where u.username == userName
                select s;

        var data = await query.ToListAsync();

        return ApiResponse<List<synonyms>>.Ok(data);
    }

    public async Task<ApiResponse<synonyms>> Add(SynonymRequestBody record)
    {
        record.user_id = _context.users.FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.word))
            return Fail("ErrorWordEmpty");

        if (string.IsNullOrWhiteSpace(record.synonym))
            return Fail("ErrorSynonymEmpty");

        if (string.IsNullOrWhiteSpace(record.user_id))
            return Fail("ErrorUserIdEmpty");

        var existing = await _context.synonyms
            .FirstOrDefaultAsync(e =>
                e.word == record.word &&
                e.synonym == record.synonym &&
                e.user_id == record.user_id);

        if (existing != null)
            return Fail("ErrorDuplicateSynonym");

        var new_record = new synonyms
        {
            id = GetRandomId(),
            word = record.word,
            synonym = record.synonym,
            note = record.note,
            user_id = record.user_id
        };

        _context.synonyms.Add(new_record);
        await _context.SaveChangesAsync();

        return Ok(new_record);
    }

    public async Task<ApiResponse<synonyms>> Update(SynonymRequestBody record)
    {
        record.user_id = _context.users.FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.id))
            return Fail("ErrorIdEmpty");

        if (string.IsNullOrWhiteSpace(record.word))
            return Fail("ErrorWordEmpty");

        if (string.IsNullOrWhiteSpace(record.synonym))
            return Fail("ErrorSynonymEmpty");

        if (string.IsNullOrWhiteSpace(record.user_id))
            return Fail("ErrorUserIdEmpty");

        var duplicate = await _context.synonyms
            .FirstOrDefaultAsync(e =>
                e.word == record.word &&
                e.synonym == record.synonym &&
                e.user_id == record.user_id &&
                e.id != record.id);

        if (duplicate != null)
            return Fail("ErrorDuplicateSynonym");

        var existingRecord = await _context.synonyms.FindAsync(record.id);

        if (existingRecord == null)
            return Fail("ErrorNotFound");

        existingRecord.word = record.word;
        existingRecord.synonym = record.synonym;
        existingRecord.note = record.note;
        existingRecord.user_id = record.user_id;

        await _context.SaveChangesAsync();

        return Ok(existingRecord);
    }

    public async Task<ApiResponse<synonyms>> Delete(string id)
    {
        var existing = await _context.synonyms.FindAsync(id);
        if (existing == null)
            return Fail("ErrorNotExist");

        _context.synonyms.Remove(existing);
        await _context.SaveChangesAsync();

        return ApiResponse<synonyms>.Ok(null);
    }
}
