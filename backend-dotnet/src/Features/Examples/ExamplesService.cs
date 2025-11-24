using Microsoft.EntityFrameworkCore;
using Models;
using Utils;
using static Utils.ApiResponse<Models.examples>;
using static Utils.Utils;

public class ExamplesService
{
    private readonly AppDbContext _context;

    public ExamplesService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<examples>>> Get(
        string userName,
        string? word = null)
    {
        var query = _context.examples.AsQueryable();

        if (!string.IsNullOrWhiteSpace(word))
            query = query.Where(x => x.word.ToLower().Contains(word.ToLower()));

        query = from e in query
                join u in _context.users
                    on e.user_id equals u.id
                where u.username == userName
                select e;

        var data = await query.ToListAsync();

        return ApiResponse<List<examples>>.Ok(
            data: data
        );
    }

    public async Task<ApiResponse<examples>> Add(ExampleRequestBody record)
    {
        record.user_id = _context.users.FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.word))
            return Fail("ErrorWordEmpty");

        if (string.IsNullOrWhiteSpace(record.part_of_speech))
            return Fail("ErrorPartOfSpeechEmpty");

        if (string.IsNullOrWhiteSpace(record.example))
            return Fail("ErrorExampleEmpty");

        if (string.IsNullOrWhiteSpace(record.user_id))
            return Fail("ErrorUserIdEmpty");

        var duplicate = await _context.examples.FirstOrDefaultAsync(e =>
            e.word == record.word &&
            e.example == record.example &&
            e.user_id == record.user_id
        );

        if (duplicate != null)
            return Fail("ErrorDuplicateExample");

        var newRecord = new examples
        {
            id = GetRandomId(),
            word = record.word,
            part_of_speech = record.part_of_speech,
            example = record.example,
            user_id = record.user_id
        };

        _context.examples.Add(newRecord);
        await _context.SaveChangesAsync();

        return Ok(newRecord);
    }

    public async Task<ApiResponse<examples>> Update(ExampleRequestBody record)
    {
        record.user_id = _context.users.FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.id))
            return Fail("ErrorIdEmpty");

        if (string.IsNullOrWhiteSpace(record.word))
            return Fail("ErrorWordEmpty");

        if (string.IsNullOrWhiteSpace(record.part_of_speech))
            return Fail("ErrorPartOfSpeechEmpty");

        if (string.IsNullOrWhiteSpace(record.example))
            return Fail("ErrorExampleEmpty");

        if (string.IsNullOrWhiteSpace(record.user_id))
            return Fail("ErrorUserIdEmpty");

        var duplicate = await _context.examples.FirstOrDefaultAsync(e =>
            e.word == record.word &&
            e.example == record.example &&
            e.user_id == record.user_id &&
            e.id != record.id
        );

        if (duplicate != null)
            return Fail("ErrorDuplicateExample");

        var existingRecord = await _context.examples.FindAsync(record.id);

        if (existingRecord == null) return Fail("ErrorNotFound");

        _context.Entry(existingRecord!).CurrentValues.SetValues(record);

        await _context.SaveChangesAsync();

        return Ok(existingRecord);
    }

    public async Task<ApiResponse<examples>> Delete(string id, string language = "en")
    {
        var existing = await _context.examples.FindAsync(id);
        if (existing == null)
            return Fail("ErrorNotExist");

        _context.examples.Remove(existing);
        await _context.SaveChangesAsync();

        return ApiResponse<examples>.Ok(null);
    }
}
