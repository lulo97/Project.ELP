using Microsoft.EntityFrameworkCore;
using Models;
using Utils;
using static Utils.Utils;
using static Utils.ApiResponse<Models.writing_answers>;

public class WritingAnswersService
{
    private readonly AppDbContext _context;

    public WritingAnswersService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<writing_answers>>> Get(
        string username,
        string? questionId = null)
    {
        var query =
            from a in _context.writing_answers
            join u in _context.users on a.user_id equals u.id
            where u.username == username
            select a;

        if (!string.IsNullOrWhiteSpace(questionId))
            query = query.Where(a => a.question_id == questionId);

        var data = await query.ToListAsync();
        return ApiResponse<List<writing_answers>>.Ok(data);
    }

    public async Task<ApiResponse<writing_answers>> Add(WritingAnswerRequestBody record)
    {
        record.user_id = _context.users
            .FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.question_id))
            return Fail("ErrorQuestionIdEmpty");

        if (string.IsNullOrWhiteSpace(record.answer))
            return Fail("ErrorAnswerEmpty");

        if (string.IsNullOrWhiteSpace(record.user_id))
            return Fail("ErrorUserIdEmpty");

        var newRecord = new writing_answers
        {
            id = GetRandomId(),
            question_id = record.question_id,
            answer = record.answer,
            review = record.review,
            user_id = record.user_id
        };

        _context.writing_answers.Add(newRecord);
        await _context.SaveChangesAsync();

        return Ok(newRecord);
    }

    public async Task<ApiResponse<writing_answers>> Update(WritingAnswerRequestBody record)
    {
        record.user_id = _context.users
            .FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.id))
            return Fail("ErrorIdEmpty");

        if (string.IsNullOrWhiteSpace(record.question_id))
            return Fail("ErrorQuestionIdEmpty");

        if (string.IsNullOrWhiteSpace(record.answer))
            return Fail("ErrorAnswerEmpty");

        var existing = await _context.writing_answers.FindAsync(record.id);
        if (existing == null)
            return Fail("ErrorNotFound");

        existing.question_id = record.question_id;
        existing.answer = record.answer;
        existing.review = record.review;
        existing.user_id = record.user_id;

        await _context.SaveChangesAsync();

        return Ok(existing);
    }

    public async Task<ApiResponse<writing_answers>> Delete(string id)
    {
        var existing = await _context.writing_answers.FindAsync(id);
        if (existing == null)
            return Fail("ErrorNotExist");

        _context.writing_answers.Remove(existing);
        await _context.SaveChangesAsync();

        return ApiResponse<writing_answers>.Ok(null);
    }
}
