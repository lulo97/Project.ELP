using Models;
using Microsoft.AspNetCore.Mvc;
using Utils;
using Microsoft.AspNetCore.Authorization;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SourcesController : ControllerBase
    {
        private readonly SourcesService _service;

        public SourcesController(SourcesService service)
        {
            _service = service;
        }

        // GET api/sources?source=&name=
        [HttpGet]
        [Authorize]
        public async Task<ApiResponse<List<sources>>> Get(
            [FromQuery] string? source,
            [FromQuery] string? name)
        {
            var username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Get(username, source, name);
        }

        // POST api/sources
        [HttpPost]
        [Authorize]
        public async Task<ApiResponse<sources>> Add([FromBody] SourceRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Add(record);
        }

        // PUT api/sources/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ApiResponse<sources>> Update(string id, [FromBody] SourceRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Update(record);
        }

        // DELETE api/sources/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ApiResponse<sources>> Delete(string id)
        {
            return await _service.Delete(id);
        }
    }
}
