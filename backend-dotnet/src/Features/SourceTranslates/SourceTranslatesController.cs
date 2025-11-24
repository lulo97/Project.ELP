using Models;
using Microsoft.AspNetCore.Mvc;
using Utils;
using Microsoft.AspNetCore.Authorization;

namespace Controllers
{
    [ApiController]
    [Route("api/source_translates")]
    public class SourceTranslatesController : ControllerBase
    {
        private readonly SourceTranslatesService _service;

        public SourceTranslatesController(SourceTranslatesService service)
        {
            _service = service;
        }

        // GET api/sourcetranslates?chunk=&sourceId=
        [HttpGet]
        [Authorize]
        public async Task<ApiResponse<List<source_translates>>> Get(
            [FromQuery] string? chunk,
            [FromQuery] string? sourceId)
        {
            var username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Get(username, chunk, sourceId);
        }

        // POST api/sourcetranslates
        [HttpPost]
        [Authorize]
        public async Task<ApiResponse<source_translates>> Add([FromBody] SourceTranslateRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Add(record);
        }

        // PUT api/sourcetranslates/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ApiResponse<source_translates>> Update(string id, [FromBody] SourceTranslateRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Update(record);
        }

        // DELETE api/sourcetranslates/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ApiResponse<source_translates>> Delete(string id)
        {
            return await _service.Delete(id);
        }
    }
}
