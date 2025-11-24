using Models;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<ApiResponse<List<tts>>> Get([FromQuery] string? text)
        {
            return await _service.Get(text);
        }

        // POST api/tts
        [HttpPost]
        [Authorize]
        public async Task<ApiResponse<tts>> Add([FromBody] TtsRequestBody record)
        {
            return await _service.Add(record);
        }

        // PUT api/tts/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ApiResponse<tts>> Update(string id, [FromBody] TtsRequestBody record)
        {
            record.id = id;
            return await _service.Update(record);
        }

        // DELETE api/tts/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ApiResponse<tts>> Delete(string id)
        {
            return await _service.Delete(id);
        }
    }
}
