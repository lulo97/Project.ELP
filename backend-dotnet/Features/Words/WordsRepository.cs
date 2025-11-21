using Models;
using Microsoft.EntityFrameworkCore;

public class WordsRepository
{
    private readonly AppDbContext _context;

    public WordsRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Words>> GetAllAsync()
    {
        return await _context.Words.ToListAsync();
    }

    public async Task<Words?> GetByIdAsync(int id)
    {
        return await _context.Words.FindAsync(id);
    }

    public async Task<Words> AddAsync(Words row)
    {
        _context.Words.Add(row);
        await _context.SaveChangesAsync();
        return row;
    }

    public async Task<Words?> UpdateAsync(Words row)
    {
        var existing = await _context.Words.FindAsync(row.Id);
        if (existing == null) return null;

        existing.Word = row.Word;
        existing.UserId = row.UserId;

        await _context.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var row = await _context.Words.FindAsync(id);
        if (row == null) return false;

        _context.Words.Remove(row);
        await _context.SaveChangesAsync();
        return true;
    }

    public IQueryable<Words> Query()
    {
        return _context.Words.AsQueryable();
    }
}
