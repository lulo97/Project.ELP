using Models;
using Microsoft.AspNetCore.Mvc;
using Utils;
using Microsoft.AspNetCore.Authorization;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SynonymsController : ControllerBase
    {
        private readonly SynonymsService _service;

        public SynonymsController(SynonymsService service)
        {
            _service = service;
        }

        // GET api/synonyms?word=&synonym=
        [HttpGet]
        [Authorize]
        public async Task<ApiResponse<List<synonyms>>> Get(
            [FromQuery] string? word,
            [FromQuery] string? synonym
        )
        {
            var username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Get(username, word, synonym);
        }

        // POST api/synonyms
        [HttpPost]
        [Authorize]
        public async Task<ApiResponse<synonyms>> Add([FromBody] SynonymRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Add(record);
        }

        // PUT api/synonyms/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ApiResponse<synonyms>> Update(string id, [FromBody] SynonymRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            record.id = id;
            return await _service.Update(record);
        }

        // DELETE api/synonyms/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ApiResponse<synonyms>> Delete(string id)
        {
            return await _service.Delete(id);
        }
    }
}
