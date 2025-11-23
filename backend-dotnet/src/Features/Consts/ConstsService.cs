using Microsoft.EntityFrameworkCore;
using Models;
using Utils;
using static Features.ConstsTranslation;
using static Utils.ApiResponse<Models.Consts>;

public class ConstsService
{
    private readonly AppDbContext _context;

    public ConstsService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<Consts>>> GetAsync(
        string? key = null,
        int pageIndex = 1,
        int pageSize = 20,
        string language = "en")
    {
        var query = _context.Consts.AsQueryable();

        if (!string.IsNullOrWhiteSpace(key))
            query = query.Where(c => c.Key!.ToLower().Contains(key.ToLower()));

        query = query
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize);

        var data = await query.ToListAsync();

        return ApiResponse<List<Consts>>.Ok(data);
    }

    public async Task<ApiResponse<Consts>> AddAsync(Consts record, string language = "en")
    {
        if (string.IsNullOrWhiteSpace(record.Key))
            return Fail(ErrorKeyEmpty, language);

        var existing = await _context.Consts
            .FirstOrDefaultAsync(e => e.Key == record.Key);

        if (existing != null)
            return Fail(ErrorKeyDuplicate, language);

        _context.Consts.Add(record);
        await _context.SaveChangesAsync();
        return ApiResponse<Consts>.Ok(record);
    }

    public async Task<ApiResponse<Consts>> UpdateAsync(Consts record, string language = "en")
    {
        if (string.IsNullOrWhiteSpace(record.Key))
            return Fail(ErrorKeyEmpty, language);

        var existingRecord = await _context.Consts.FindAsync(record.Key);

        if (existingRecord == null)
            return Fail(ErrorNotExist, language);

        _context.Entry(existingRecord).CurrentValues.SetValues(record);
        await _context.SaveChangesAsync();
        return ApiResponse<Consts>.Ok(existingRecord);
    }

    public async Task<ApiResponse<Consts>> DeleteAsync(string key, string language = "en")
    {
        var row = await _context.Consts.FindAsync(key);

        if (row == null)
            return Fail(ErrorNotExist, language);

        _context.Consts.Remove(row);
        await _context.SaveChangesAsync();
        return ApiResponse<Consts>.Ok();
    }
}
