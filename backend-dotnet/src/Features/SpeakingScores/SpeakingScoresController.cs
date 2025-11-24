using Models;
using Microsoft.AspNetCore.Mvc;
using Utils;
using Microsoft.AspNetCore.Authorization;

namespace Controllers
{
    [ApiController]
    [Route("api/speaking_scores")]
    public class SpeakingScoresController : ControllerBase
    {
        private readonly SpeakingScoresService _service;

        public SpeakingScoresController(SpeakingScoresService service)
        {
            _service = service;
        }

        // GET api/speakingscores?speakingId=
        [HttpGet]
        [Authorize]
        public async Task<ApiResponse<List<speaking_scores>>> Get([FromQuery] string? speakingId)
        {
            var username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Get(username, speakingId);
        }

        // POST api/speakingscores
        [HttpPost]
        [Authorize]
        public async Task<ApiResponse<speaking_scores>> Add([FromBody] SpeakingScoreRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Add(record);
        }

        // PUT api/speakingscores/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ApiResponse<speaking_scores>> Update(string id, [FromBody] SpeakingScoreRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Update(record);
        }

        // DELETE api/speakingscores/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ApiResponse<speaking_scores>> Delete(string id)
        {
            return await _service.Delete(id);
        }
    }
}
