using Microsoft.EntityFrameworkCore;
using Models;
using Utils;

public class PartOfSpeechsService
{
    private readonly AppDbContext _context;

    public PartOfSpeechsService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<part_of_speechs>>> Get(string? word)
    {
        var data = new List<part_of_speechs>();

        if (string.IsNullOrWhiteSpace(word))
        {
            data = await (from pos in _context.part_of_speechs select pos).OrderBy(x => x.id).ToListAsync();
        }
        else
        {
            data = await (
                from pos in _context.part_of_speechs
                join m in _context.meanings on pos.id equals m.part_of_speech
                where word == null || m.word == word
                select new part_of_speechs
                    {
                        id = pos.id,
                        name = pos.name
                    }
            )
            .Distinct()
            .OrderBy(x => x.id)
            .ToListAsync();
        }

        return ApiResponse<List<part_of_speechs>>.Ok(
            data: data
        );
    }
}
