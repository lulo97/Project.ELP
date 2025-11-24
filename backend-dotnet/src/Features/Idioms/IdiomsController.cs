using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Models;
using Utils;

namespace Controllers;

[ApiController]
[Route("api/[controller]")]
public class IdiomsController : ControllerBase
{
    private readonly IdiomsService _service;

    public IdiomsController(IdiomsService service)
    {
        _service = service;
    }

    // GET api/idioms?idiom=&userId=
    [HttpGet]
    [Authorize]
    public async Task<ApiResponse<List<idioms>>> Get([FromQuery] string? idiom)
    {
        var username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
        return await _service.Get(username, idiom);
    }

    // POST api/idioms
    [HttpPost]
    [Authorize]
    public async Task<ApiResponse<idioms>> Add([FromBody] IdiomRequestBody record)
    {
        record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
        return await _service.Add(record);
    }

    // PUT api/idioms/{id}
    [HttpPut("{id}")]
    [Authorize]
    public async Task<ApiResponse<idioms>> Update(string id, [FromBody] IdiomRequestBody record)
    {
        record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
        return await _service.Update(record);
    }

    // DELETE api/idioms/{id}
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ApiResponse<idioms>> Delete(string id)
    {
        return await _service.Delete(id);
    }
}
