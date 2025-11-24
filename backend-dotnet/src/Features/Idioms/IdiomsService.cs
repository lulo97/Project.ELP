using Microsoft.EntityFrameworkCore;
using Models;
using Utils;
using static Utils.Utils;
using static Utils.ApiResponse<Models.idioms>;

public class IdiomsService
{
    private readonly AppDbContext _context;

    public IdiomsService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<idioms>>> Get(string userName, string? idiom = null)
    {
        var query = _context.idioms.AsQueryable();

        if (!string.IsNullOrWhiteSpace(idiom))
            query = query.Where(i => i.idiom.ToLower().Contains(idiom.ToLower()));

        query = from i in query
                join u in _context.users
                    on i.user_id equals u.id
                where u.username == userName
                select i;

        var data = await query.ToListAsync();
        return ApiResponse<List<idioms>>.Ok(data: data);
    }

    public async Task<ApiResponse<idioms>> Add(IdiomRequestBody record)
    {
        record.user_id = _context.users.FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.idiom))
            return Fail("ErrorIdiomEmpty");

        if (string.IsNullOrWhiteSpace(record.meaning))
            return Fail("ErrorMeaningEmpty");

        if (string.IsNullOrWhiteSpace(record.user_id))
            return Fail("ErrorUserIdEmpty");

        var existing = await _context.idioms
            .FirstOrDefaultAsync(e => e.idiom == record.idiom && e.user_id == record.user_id);

        if (existing != null)
            return Fail("ErrorDuplicateIdiom");

        var new_record = new idioms
        {
            idiom = record.idiom,
            meaning = record.meaning,
            example = record.example,
            user_id = record.user_id,
            id = GetRandomId()
        };

        _context.idioms.Add(new_record);
        await _context.SaveChangesAsync();

        return Ok(new_record);
    }

    public async Task<ApiResponse<idioms>> Update(IdiomRequestBody record)
    {
        record.user_id = _context.users.FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.id))
            return Fail("ErrorIdEmpty");

        if (string.IsNullOrWhiteSpace(record.idiom))
            return Fail("ErrorIdiomEmpty");

        if (string.IsNullOrWhiteSpace(record.meaning))
            return Fail("ErrorMeaningEmpty");

        var existing = await _context.idioms
            .FirstOrDefaultAsync(e => e.idiom == record.idiom && e.user_id == record.user_id && e.id != record.id);

        if (existing != null)
            return Fail("ErrorDuplicateIdiom");

        var existingRecord = await _context.idioms.FindAsync(record.id);

        if (existingRecord == null) return Fail("ErrorNotFound");

        _context.Entry(existingRecord).CurrentValues.SetValues(record);
        await _context.SaveChangesAsync();

        return Ok(existingRecord);
    }

    public async Task<ApiResponse<idioms>> Delete(string id)
    {
        var existing = await _context.idioms.FindAsync(id);
        if (existing == null)
            return Fail("ErrorNotExist");

        _context.idioms.Remove(existing);
        await _context.SaveChangesAsync();

        return ApiResponse<idioms>.Ok(null);
    }
}
