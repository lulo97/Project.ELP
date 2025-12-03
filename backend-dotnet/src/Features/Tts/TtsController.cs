using Microsoft.AspNetCore.Mvc;
using Models;
using Utils;
using Microsoft.AspNetCore.Authorization;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TtsController : ControllerBase
    {
        private readonly TtsService _service;

        public TtsController(TtsService service)
        {
            _service = service;
        }

        // GET api/tts?text=
        [HttpGet]
        [Authorize]
        public async Task<ApiResponse<tts>> Get([FromQuery] string? text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return ApiResponse<tts>.Fail("Missing text parameter");

            return await _service.GetOrCreateTts(text);
        }

        // Keep existing POST/PUT/DELETE if needed
    }
}
