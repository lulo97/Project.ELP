using Microsoft.EntityFrameworkCore;
using Models;
using Utils;
using static Utils.Utils;
using static Utils.ApiResponse<Models.source_translates>;

public class SourceTranslatesService
{
    private readonly AppDbContext _context;

    public SourceTranslatesService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<source_translates>>> Get(string username, string? chunk = null, string? sourceId = null)
    {
        var query = _context.source_translates.AsQueryable();

        if (!string.IsNullOrWhiteSpace(chunk))
            query = query.Where(s => s.chunk.ToLower().Contains(chunk.ToLower()));

        if (!string.IsNullOrWhiteSpace(sourceId))
            query = query.Where(s => s.source_id == sourceId);

        query = from s in query
                join u in _context.users
                    on s.user_id equals u.id
                where u.username == username
                select s;

        var data = await query.ToListAsync();
        return ApiResponse<List<source_translates>>.Ok(data: data);
    }

    public async Task<ApiResponse<source_translates>> Add(SourceTranslateRequestBody record)
    {
        record.user_id = _context.users.FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.chunk))
            return Fail("ErrorChunkEmpty");

        if (string.IsNullOrWhiteSpace(record.translate))
            return Fail("ErrorTranslateEmpty");

        if (string.IsNullOrWhiteSpace(record.source_id))
            return Fail("ErrorSourceIdEmpty");

        if (string.IsNullOrWhiteSpace(record.user_id))
            return Fail("ErrorUserIdEmpty");

        var existing = await _context.source_translates
            .FirstOrDefaultAsync(e => e.chunk == record.chunk && e.source_id == record.source_id && e.user_id == record.user_id);

        if (existing != null)
            return Fail("ErrorDuplicateTranslate");

        var new_record = new source_translates
        {
            id = GetRandomId(),
            chunk = record.chunk,
            translate = record.translate,
            source_id = record.source_id,
            user_id = record.user_id
        };

        _context.source_translates.Add(new_record);
        await _context.SaveChangesAsync();
        return Ok(new_record);
    }

    public async Task<ApiResponse<source_translates>> Update(SourceTranslateRequestBody record)
    {
        record.user_id = _context.users.FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.id))
            return Fail("ErrorIdEmpty");

        if (string.IsNullOrWhiteSpace(record.chunk))
            return Fail("ErrorChunkEmpty");

        if (string.IsNullOrWhiteSpace(record.translate))
            return Fail("ErrorTranslateEmpty");

        if (string.IsNullOrWhiteSpace(record.source_id))
            return Fail("ErrorSourceIdEmpty");

        if (string.IsNullOrWhiteSpace(record.user_id))
            return Fail("ErrorUserIdEmpty");

        var existing = await _context.source_translates
            .FirstOrDefaultAsync(e => e.chunk == record.chunk && e.source_id == record.source_id && e.user_id == record.user_id && e.id != record.id);

        if (existing != null)
            return Fail("ErrorDuplicateTranslate");

        var existingRecord = await _context.source_translates.FindAsync(record.id);

        if (existingRecord == null) return Fail("ErrorNotFound");

        _context.Entry(existingRecord).CurrentValues.SetValues(record);
        await _context.SaveChangesAsync();
        return Ok(existingRecord);
    }

    public async Task<ApiResponse<source_translates>> Delete(string id)
    {
        var existing = await _context.source_translates.FindAsync(id);
        if (existing == null)
            return Fail("ErrorNotExist");

        _context.source_translates.Remove(existing);
        await _context.SaveChangesAsync();
        return ApiResponse<source_translates>.Ok(null);
    }
}
