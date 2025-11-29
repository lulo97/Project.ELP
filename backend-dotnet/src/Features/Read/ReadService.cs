using Microsoft.EntityFrameworkCore;
using Models;
using Utils;
using static System.Runtime.InteropServices.JavaScript.JSType;
using static Utils.ApiResponse<Models.writing_questions>;
using static Utils.Utils;

public class ReadService
{
    private readonly AppDbContext _context;

    public ReadService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<object>> Get(string source_id, string username)
    {
        var user_id = await _context.users
            .Where(u => u.username == username)
            .Select(u => u.id)
            .FirstOrDefaultAsync();

        var words = await _context.words
            .Where(w => w.user_id == user_id)
            .ToListAsync();


        var idioms = await _context.idioms
            .Where(i => i.user_id == user_id)
            .ToListAsync();

        var phrases = await _context.phrases
            .Where(p => p.user_id == user_id)
            .ToListAsync();

        var meanings = await _context.meanings
            .Where(m => m.user_id == user_id)
            .ToListAsync();

        var source_translates = await _context.source_translates
            .Where(st => st.user_id == user_id && st.source_id == source_id)
            .ToListAsync();

        var sources = await _context.sources
            .Where(s => s.user_id == user_id && s.id == source_id)
            .ToListAsync();

        var result = new Dictionary<string, object?>
        {
            ["words"] = words,
            ["idioms"] = idioms,
            ["phrases"] = phrases,
            ["meanings"] = meanings,
            ["source_translates"] = source_translates,
            ["source_row"] = sources.FirstOrDefault(),
        };

        foreach (var key in result.Keys.ToList())
        {
            if (result[key] == null)
                result[key] = new List<object>();
        }

        return ApiResponse<object>.Ok(result);
    }
}
