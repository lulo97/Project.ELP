using Microsoft.EntityFrameworkCore;
using Models;
using Utils;
using static Utils.Utils;
using static Utils.ApiResponse<Models.posts>;

public class PostsService
{
    private readonly AppDbContext _context;

    public PostsService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<List<posts>>> Get(string username, string? title = null)
    {
        var query = _context.posts.AsQueryable();

        if (!string.IsNullOrWhiteSpace(title))
            query = query.Where(p => p.title.ToLower().Contains(title.ToLower()));

        query = from p in query
                join u in _context.users
                    on p.user_id equals u.id
                where u.username == username
                select p;

        var data = await query.ToListAsync();

        return ApiResponse<List<posts>>.Ok(data: data);
    }

    public async Task<ApiResponse<posts>> Add(PostRequestBody record)
    {
        record.user_id = _context.users.FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.title))
            return Fail("ErrorTitleEmpty");

        if (string.IsNullOrWhiteSpace(record.content))
            return Fail("ErrorContentEmpty");

        if (string.IsNullOrWhiteSpace(record.user_id))
            return Fail("ErrorUserIdEmpty");

        var existing = await _context.posts
            .FirstOrDefaultAsync(e => e.title == record.title && e.user_id == record.user_id);

        if (existing != null)
            return Fail("ErrorDuplicateTitle");

        var new_record = new posts
        {
            id = GetRandomId(),
            title = record.title,
            content = record.content,
            user_id = record.user_id
        };

        _context.posts.Add(new_record);
        await _context.SaveChangesAsync();
        return Ok(new_record);
    }

    public async Task<ApiResponse<posts>> Update(PostRequestBody record)
    {
        record.user_id = _context.users.FirstOrDefault(x => x.username == record.username)!.id;

        if (string.IsNullOrWhiteSpace(record.id))
            return Fail("ErrorIdEmpty");

        if (string.IsNullOrWhiteSpace(record.title))
            return Fail("ErrorTitleEmpty");

        if (string.IsNullOrWhiteSpace(record.content))
            return Fail("ErrorContentEmpty");

        if (string.IsNullOrWhiteSpace(record.user_id))
            return Fail("ErrorUserIdEmpty");

        var existing = await _context.posts
            .FirstOrDefaultAsync(e => e.title == record.title && e.user_id == record.user_id && e.id != record.id);

        if (existing != null)
            return Fail("ErrorDuplicateTitle");

        var existingRecord = await _context.posts.FindAsync(record.id);

        if (existingRecord == null) return Fail("ErrorNotFound");

        _context.Entry(existingRecord).CurrentValues.SetValues(record);

        await _context.SaveChangesAsync();
        return Ok(existingRecord);
    }

    public async Task<ApiResponse<posts>> Delete(string id)
    {
        var existing = await _context.posts.FindAsync(id);
        if (existing == null)
            return Fail("ErrorNotExist");

        _context.posts.Remove(existing);
        await _context.SaveChangesAsync();

        return ApiResponse<posts>.Ok(null);
    }
}
