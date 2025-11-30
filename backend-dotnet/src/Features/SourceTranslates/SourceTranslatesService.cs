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

        if (record.chunks is null || record.chunks.Count == 0)
            return Fail("ErrorChunksEmpty");

        if (string.IsNullOrWhiteSpace(record.source_id))
            return Fail("ErrorSourceIdEmpty");

        if (string.IsNullOrWhiteSpace(record.user_id))
            return Fail("ErrorUserIdEmpty");

        //Delete all old source_translates
        await _context.source_translates
            .Where(x => x.source_id == record.source_id)
            .ExecuteDeleteAsync();

        var newRecords = record.chunks.Select(item => new source_translates
        {
            id = GetRandomId(),
            chunk = item.chunk,
            translate = item.translate,
            source_id = record.source_id,
            user_id = record.user_id
        });

        await _context.source_translates.AddRangeAsync(newRecords);

        await _context.SaveChangesAsync();
        return Ok();
    }
}
