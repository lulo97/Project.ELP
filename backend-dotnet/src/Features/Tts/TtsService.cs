using Microsoft.EntityFrameworkCore;
using Models;
using Utils;
using static Utils.Utils;
using static Utils.ApiResponse<Models.tts>;

public class TtsService
{
    private readonly AppDbContext _context;

    public TtsService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<tts>>> Get(
        string? text = null)
    {
        var query = from t in _context.tts
                    select t;

        if (!string.IsNullOrWhiteSpace(text))
            query = query.Where(t => t.text!.ToLower().Contains(text.ToLower()));

        var data = await query.ToListAsync();

        return ApiResponse<List<tts>>.Ok(data);
    }

    public async Task<ApiResponse<tts>> Add(TtsRequestBody record)
    {
        if (string.IsNullOrWhiteSpace(record.text))
            return Fail("ErrorTextEmpty");

        var newRecord = new tts
        {
            id = GetRandomId(),
            text = record.text,
            audio_base64 = record.audio_base64
        };

        _context.tts.Add(newRecord);
        await _context.SaveChangesAsync();

        return Ok(newRecord);
    }

    public async Task<ApiResponse<tts>> Update(TtsRequestBody record)
    {
        if (string.IsNullOrWhiteSpace(record.id))
            return Fail("ErrorIdEmpty");

        if (string.IsNullOrWhiteSpace(record.text))
            return Fail("ErrorTextEmpty");

        var existing = await _context.tts.FindAsync(record.id);

        if (existing == null)
            return Fail("ErrorNotFound");

        existing.text = record.text;
        existing.audio_base64 = record.audio_base64;

        await _context.SaveChangesAsync();

        return Ok(existing);
    }

    public async Task<ApiResponse<tts>> Delete(string id)
    {
        var existing = await _context.tts.FindAsync(id);
        if (existing == null)
            return Fail("ErrorNotExist");

        _context.tts.Remove(existing);
        await _context.SaveChangesAsync();

        return ApiResponse<tts>.Ok(null);
    }
}
