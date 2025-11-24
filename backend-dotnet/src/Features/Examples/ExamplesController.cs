using Models;
using Microsoft.AspNetCore.Mvc;
using Utils;
using Microsoft.AspNetCore.Authorization;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExamplesController : ControllerBase
    {
        private readonly ExamplesService _service;

        public ExamplesController(ExamplesService service)
        {
            _service = service;
        }

        // GET api/examples?word=&pageIndex=&pageSize=&language=
        [HttpGet]
        [Authorize]
        public async Task<ApiResponse<List<examples>>> Get(
            [FromQuery] string? word
        )
        {
            var username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Get(username, word);
        }

        // POST api/examples
        [HttpPost]
        [Authorize]
        public async Task<ApiResponse<examples>> Add([FromBody] ExampleRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Add(record);
        }

        // PUT api/examples/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ApiResponse<examples>> Update(string id, [FromBody] ExampleRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Update(record);
        }

        // DELETE api/examples/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ApiResponse<examples>> Delete(string id)
        {
            return await _service.Delete(id);
        }
    }
}
