using Microsoft.EntityFrameworkCore;
using Models;
using Utils;
using static Utils.ApiResponse<Models.users>;
using static Utils.Utils;

public class UsersService
{
    private readonly AppDbContext _db;

    public UsersService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<ApiResponse<List<users>>> Get(string? username, string loginUsername)
    {
        if (loginUsername != "admin")
        {
            return ApiResponse<List<users>>.Fail("NotAdmin");
        }

        var query = _db.users.AsQueryable();

        if (!string.IsNullOrWhiteSpace(username))
            query = query.Where(u => EF.Functions.ILike(u.username, $"%{username}%"));

        var list = await query
            .OrderByDescending(u => u.created_at)
            .ToListAsync();

        return ApiResponse<List<users>>.Ok(list);
    }

    public async Task<ApiResponse<users>> Delete(string id, string loginUsername)
    {
        if (loginUsername != "admin")
            return Fail("NotAdmin");

        var user = await _db.users.FindAsync(id);

        if (user == null)
            return Fail("NotFoundUser");

        _db.users.Remove(user);
        await _db.SaveChangesAsync();

        return Ok(user);
    }
}
