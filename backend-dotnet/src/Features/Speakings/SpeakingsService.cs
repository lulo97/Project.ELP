using Microsoft.EntityFrameworkCore;
using Models;
using Utils;
using static Utils.Utils;
using static Utils.ApiResponse<Models.speakings>;

public class SpeakingsService
{
    private readonly AppDbContext _context;

    public SpeakingsService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<speakings>>> Get(string username, string? question = null)
    {
        var query = _context.speakings.AsQueryable();

        if (!string.IsNullOrWhiteSpace(question))
            query = query.Where(s => s.question!.ToLower().Contains(question.ToLower()));

        query = from row in query
                join u in _context.users
                    on row.user_id equals u.id
                where u.username == username
                select row;

        var data = await query.ToListAsync();
        return ApiResponse<List<speakings>>.Ok(data: data);
    }

    public async Task<ApiResponse<speakings>> Add(SpeakingRequestBody record)
    {
                record.user_id = _context.users.FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.question))
            return Fail("ErrorQuestionEmpty");

        if (string.IsNullOrWhiteSpace(record.answer))
            return Fail("ErrorAnswerEmpty");

        var new_record = new speakings
        {
            id = GetRandomId(),
            question = record.question,
            answer = record.answer,
            user_id = record.user_id,
        };

        _context.speakings.Add(new_record);
        await _context.SaveChangesAsync();
        return Ok(new_record);
    }

    public async Task<ApiResponse<speakings>> Update(SpeakingRequestBody record)
    {
        record.user_id = _context.users.FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.id))
            return Fail("ErrorIdEmpty");

        var existingRecord = await _context.speakings.FindAsync(record.id);

        if (existingRecord == null) return Fail("ErrorNotFound");

        if (!string.IsNullOrWhiteSpace(record.question))
            existingRecord.question = record.question;

        if (!string.IsNullOrWhiteSpace(record.answer))
            existingRecord.answer = record.answer;

        await _context.SaveChangesAsync();
        return Ok(existingRecord);
    }

    public async Task<ApiResponse<speakings>> Delete(string id)
    {
        var existing = await _context.speakings.FindAsync(id);
        if (existing == null)
            return Fail("ErrorNotExist");

        _context.speakings.Remove(existing);
        await _context.SaveChangesAsync();
        return ApiResponse<speakings>.Ok(null);
    }
}
