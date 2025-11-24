using Models;
using Microsoft.AspNetCore.Mvc;
using Utils;
using Microsoft.AspNetCore.Authorization;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SpeakingsController : ControllerBase
    {
        private readonly SpeakingsService _service;

        public SpeakingsController(SpeakingsService service)
        {
            _service = service;
        }

        // GET api/speakings?question=
        [HttpGet]
        [Authorize]
        public async Task<ApiResponse<List<speakings>>> Get([FromQuery] string? question)
        {
            var username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Get(username, question);
        }

        // POST api/speakings
        [HttpPost]
        [Authorize]
        public async Task<ApiResponse<speakings>> Add([FromBody] SpeakingRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Add(record);
        }

        // PUT api/speakings/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ApiResponse<speakings>> Update(string id, [FromBody] SpeakingRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Update(record);
        }

        // DELETE api/speakings/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ApiResponse<speakings>> Delete(string id)
        {
            return await _service.Delete(id);
        }
    }
}
