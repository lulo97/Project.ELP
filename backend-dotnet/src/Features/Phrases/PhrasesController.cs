using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Models;
using Utils;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PhrasesController : ControllerBase
    {
        private readonly PhrasesService _service;

        public PhrasesController(PhrasesService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize]
        public async Task<ApiResponse<List<phrases>>> Get([FromQuery] string? phrase)
        {
            var username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Get(username, phrase);
        }

        [HttpPost]
        [Authorize]
        public async Task<ApiResponse<phrases>> Add([FromBody] PhraseRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Add(record);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ApiResponse<phrases>> Update(string id, [FromBody] PhraseRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Update(record);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ApiResponse<phrases>> Delete(string id)
        {
            return await _service.Delete(id);
        }
    }
}
