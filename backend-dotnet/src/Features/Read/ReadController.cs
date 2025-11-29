using Models;
using Microsoft.AspNetCore.Mvc;
using Utils;
using Microsoft.AspNetCore.Authorization;

namespace Controllers
{
    [ApiController]
    [Route("api/read")]
    public class ReadController : ControllerBase
    {
        private readonly ReadService _service;

        public ReadController(ReadService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize]
        public async Task<ApiResponse<object>> Get(
            [FromQuery] string source_id
        )
        {
            var username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Get(source_id, username);
        }
    }
}
