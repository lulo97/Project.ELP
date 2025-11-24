using Microsoft.EntityFrameworkCore;
using Models;
using Utils;
using static Utils.Utils;
using static Utils.ApiResponse<Models.sources>;

public class SourcesService
{
    private readonly AppDbContext _context;

    public SourcesService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<sources>>> Get(string username, string? source = null, string? name = null)
    {
        var query = _context.sources.AsQueryable();

        if (!string.IsNullOrWhiteSpace(source))
            query = query.Where(s => s.source.ToLower().Contains(source.ToLower()));

        if (!string.IsNullOrWhiteSpace(name))
            query = query.Where(s => s.name.ToLower().Contains(name.ToLower()));

        query = from s in query
                join u in _context.users
                    on s.user_id equals u.id
                where u.username == username
                select s;

        var data = await query.ToListAsync();
        return ApiResponse<List<sources>>.Ok(data: data);
    }

    public async Task<ApiResponse<sources>> Add(SourceRequestBody record)
    {
        record.user_id = _context.users.FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.source))
            return Fail("ErrorSourceEmpty");

        if (string.IsNullOrWhiteSpace(record.name))
            return Fail("ErrorNameEmpty");

        if (string.IsNullOrWhiteSpace(record.user_id))
            return Fail("ErrorUserIdEmpty");

        var existing = await _context.sources
            .FirstOrDefaultAsync(e => e.source == record.source && e.user_id == record.user_id);

        if (existing != null)
            return Fail("ErrorDuplicateSource");

        var new_record = new sources
        {
            id = GetRandomId(),
            source = record.source,
            name = record.name,
            user_id = record.user_id
        };

        _context.sources.Add(new_record);
        await _context.SaveChangesAsync();
        return Ok(new_record);
    }

    public async Task<ApiResponse<sources>> Update(SourceRequestBody record)
    {
        record.user_id = _context.users.FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.id))
            return Fail("ErrorIdEmpty");

        if (string.IsNullOrWhiteSpace(record.source))
            return Fail("ErrorSourceEmpty");

        if (string.IsNullOrWhiteSpace(record.name))
            return Fail("ErrorNameEmpty");

        if (string.IsNullOrWhiteSpace(record.user_id))
            return Fail("ErrorUserIdEmpty");

        var existing = await _context.sources
            .FirstOrDefaultAsync(e => e.source == record.source && e.user_id == record.user_id && e.id != record.id);

        if (existing != null)
            return Fail("ErrorDuplicateSource");

        var existingRecord = await _context.sources.FindAsync(record.id);

        if (existingRecord == null) return Fail("ErrorNotFound");

        _context.Entry(existingRecord).CurrentValues.SetValues(record);
        await _context.SaveChangesAsync();
        return Ok(existingRecord);
    }

    public async Task<ApiResponse<sources>> Delete(string id)
    {
        var existing = await _context.sources.FindAsync(id);
        if (existing == null)
            return Fail("ErrorNotExist");

        _context.sources.Remove(existing);
        await _context.SaveChangesAsync();
        return ApiResponse<sources>.Ok(null);
    }
}
