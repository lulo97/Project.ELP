using Microsoft.EntityFrameworkCore;
using Models;
using Utils;
using static Utils.Utils;
using static Utils.ApiResponse<Models.writing_questions>;

public class WritingQuestionsService
{
    private readonly AppDbContext _context;

    public WritingQuestionsService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<writing_questions>>> Get(
        string username,
        string? query = null)
    {
        var q =
            from wq in _context.writing_questions
            join u in _context.users on wq.user_id equals u.id
            where u.username == username
            select wq;

        if (!string.IsNullOrWhiteSpace(query))
            q = q.Where(x => x.question.ToLower().Contains(query.ToLower()));

        var data = await q.ToListAsync();
        return ApiResponse<List<writing_questions>>.Ok(data);
    }

    public async Task<ApiResponse<writing_questions>> Add(WritingQuestionRequestBody record)
    {
        record.user_id = _context.users
            .FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.question))
            return Fail("ErrorQuestionEmpty");

        if (string.IsNullOrWhiteSpace(record.user_id))
            return Fail("ErrorUserIdEmpty");

        var newRecord = new writing_questions
        {
            id = GetRandomId(),
            question = record.question,
            user_id = record.user_id
        };

        _context.writing_questions.Add(newRecord);
        await _context.SaveChangesAsync();

        return Ok(newRecord);
    }

    public async Task<ApiResponse<writing_questions>> Update(WritingQuestionRequestBody record)
    {
        record.user_id = _context.users
            .FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.id))
            return Fail("ErrorIdEmpty");

        if (string.IsNullOrWhiteSpace(record.question))
            return Fail("ErrorQuestionEmpty");

        var existing = await _context.writing_questions.FindAsync(record.id);
        if (existing == null)
            return Fail("ErrorNotFound");

        existing.question = record.question;
        existing.user_id = record.user_id;

        await _context.SaveChangesAsync();

        return Ok(existing);
    }

    public async Task<ApiResponse<writing_questions>> Delete(string id)
    {
        var existing = await _context.writing_questions.FindAsync(id);
        if (existing == null)
            return Fail("ErrorNotExist");

        _context.writing_questions.Remove(existing);
        await _context.SaveChangesAsync();

        return ApiResponse<writing_questions>.Ok(null);
    }
}
