using Microsoft.EntityFrameworkCore;
using Models;
using Utils;
using static Features.ConstsTranslation;
using static Utils.ApiResponse<Models.consts>;

public class ConstsService
{
    private readonly AppDbContext _context;

    public ConstsService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<consts>>> GetAsync(
        string? key = null,
        int pageIndex = 1,
        int pageSize = 20,
        string language = "en")
    {
        var query = _context.consts.AsQueryable();

        if (!string.IsNullOrWhiteSpace(key))
            query = query.Where(c => c.key!.ToLower().Contains(key.ToLower()));

        query = query
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize);

        var data = await query.ToListAsync();

        return ApiResponse<List<consts>>.Ok(data);
    }

    public async Task<ApiResponse<consts>> AddAsync(consts record, string language = "en")
    {
        if (string.IsNullOrWhiteSpace(record.key))
            return Fail(ErrorKeyEmpty, language);

        var existing = await _context.consts
            .FirstOrDefaultAsync(e => e.key == record.key);

        if (existing != null)
            return Fail(ErrorKeyDuplicate, language);

        _context.consts.Add(record);
        await _context.SaveChangesAsync();
        return ApiResponse<consts>.Ok(record);
    }

    public async Task<ApiResponse<consts>> UpdateAsync(consts record, string language = "en")
    {
        if (string.IsNullOrWhiteSpace(record.key))
            return Fail(ErrorKeyEmpty, language);

        var existingRecord = await _context.consts.FindAsync(record.key);
        if (existingRecord == null)
            return Fail(ErrorNotExist, language);

        _context.Entry(existingRecord).CurrentValues.SetValues(record);
        await _context.SaveChangesAsync();
        return ApiResponse<consts>.Ok(existingRecord);
    }

    public async Task<ApiResponse<consts>> DeleteAsync(string key, string language = "en")
    {
        var row = await _context.consts.FindAsync(key);

        if (row == null)
            return Fail(ErrorNotExist, language);

        _context.consts.Remove(row);
        await _context.SaveChangesAsync();
        return ApiResponse<consts>.Ok();
    }
}
