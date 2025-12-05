using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Utils;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly UsersService _service;

    public UsersController(UsersService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize]
    public async Task<ApiResponse<List<users>>> Get([FromQuery] string? username)
    {
        var loginUsername = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
        return await _service.Get(username, loginUsername);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ApiResponse<users>> Delete(string id)
    {
        var loginUsername = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
        return await _service.Delete(id, loginUsername);
    }
}
