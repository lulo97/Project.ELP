using Microsoft.EntityFrameworkCore;
using Models;
using Utils;
using static Utils.Utils;
using static Utils.ApiResponse<Models.speaking_scores>;

public class SpeakingScoresService
{
    private readonly AppDbContext _context;

    public SpeakingScoresService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<speaking_scores>>> Get(string username, string? speakingId = null)
    {
        var query = _context.speaking_scores.AsQueryable();

        if (!string.IsNullOrWhiteSpace(speakingId))
            query = query.Where(s => s.speaking_id == speakingId);

        var data = await query.ToListAsync();
        return ApiResponse<List<speaking_scores>>.Ok(data: data);
    }

    public async Task<ApiResponse<speaking_scores>> Add(SpeakingScoreRequestBody record)
    {
        if (string.IsNullOrWhiteSpace(record.speaking_id))
            return Fail("ErrorSpeakingIdEmpty");

        if (record.score == null)
            return Fail("ErrorScoreEmpty");

        var new_record = new speaking_scores
        {
            id = GetRandomId(),
            speaking_id = record.speaking_id,
            score = record.score,
            text_listened = record.text_listened,
            text = record.text
        };

        _context.speaking_scores.Add(new_record);
        await _context.SaveChangesAsync();
        return Ok(new_record);
    }

    public async Task<ApiResponse<speaking_scores>> Update(SpeakingScoreRequestBody record)
    {
        if (string.IsNullOrWhiteSpace(record.id))
            return Fail("ErrorIdEmpty");

        var existingRecord = await _context.speaking_scores.FindAsync(record.id);

        if (existingRecord == null) return Fail("ErrorNotFound");

        if (!string.IsNullOrWhiteSpace(record.speaking_id))
            existingRecord.speaking_id = record.speaking_id;

        if (record.score != null)
            existingRecord.score = record.score;

        if (record.text_listened != null)
            existingRecord.text_listened = record.text_listened;

        if (record.text != null)
            existingRecord.text = record.text;

        await _context.SaveChangesAsync();
        return Ok(existingRecord);
    }

    public async Task<ApiResponse<speaking_scores>> Delete(string id)
    {
        var existing = await _context.speaking_scores.FindAsync(id);
        if (existing == null)
            return Fail("ErrorNotExist");

        _context.speaking_scores.Remove(existing);
        await _context.SaveChangesAsync();
        return ApiResponse<speaking_scores>.Ok(null);
    }
}
