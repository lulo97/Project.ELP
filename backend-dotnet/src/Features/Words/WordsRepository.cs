using Models;
using Microsoft.EntityFrameworkCore;

public class WordsRepository
{
    private readonly AppDbContext _context;

    public WordsRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Words> AddAsync(Words row)
    {
        _context.Words.Add(row);
        await _context.SaveChangesAsync();
        return row;
    }

    public async Task<Words?> UpdateAsync(Words row)
    {
        var existing = await _context.Words.FindAsync(row.Id) ?? throw new InvalidOperationException("Record not found");
        _context.Entry(existing!).CurrentValues.SetValues(row);
        await _context.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var row = await _context.Words.FindAsync(id) ?? throw new InvalidOperationException("Record not found");
        _context.Words.Remove(row!);
        await _context.SaveChangesAsync();
        return true;
    }

    public IQueryable<Words> Query()
    {
        return _context.Words.AsQueryable();
    }
}
