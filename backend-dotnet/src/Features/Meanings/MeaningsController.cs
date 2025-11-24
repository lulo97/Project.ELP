using Microsoft.AspNetCore.Mvc;
using Models;
using Utils;
using Microsoft.AspNetCore.Authorization;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MeaningsController : ControllerBase
    {
        private readonly MeaningsService _service;

        public MeaningsController(MeaningsService service)
        {
            _service = service;
        }

        // GET api/meanings?word=
        [HttpGet]
        [Authorize]
        public async Task<ApiResponse<List<meanings>>> Get([FromQuery] string? word)
        {
            var username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Get(username, word);
        }

        // POST api/meanings
        [HttpPost]
        [Authorize]
        public async Task<ApiResponse<meanings>> Add([FromBody] MeaningRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Add(record);
        }

        // PUT api/meanings/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ApiResponse<meanings>> Update(string id, [FromBody] MeaningRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Update(record);
        }

        // DELETE api/meanings/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ApiResponse<meanings>> Delete(string id)
        {
            return await _service.Delete(id);
        }
    }
}
