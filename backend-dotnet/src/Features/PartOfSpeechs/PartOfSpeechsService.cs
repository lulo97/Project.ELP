using Microsoft.EntityFrameworkCore;
using Models;
using Utils;
using static Utils.ApiResponse<Models.examples>;
using static Utils.Utils;

public class PartOfSpeechsService
{
    private readonly AppDbContext _context;

    public PartOfSpeechsService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<part_of_speechs>>> Get()
    {
        var data = await _context.part_of_speechs.ToListAsync();
        return ApiResponse<List<part_of_speechs>>.Ok(
            data: data
        );
    }
}
