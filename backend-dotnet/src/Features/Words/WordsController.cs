using Models;
using Microsoft.AspNetCore.Mvc;
using Utils;
using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WordsController : ControllerBase
    {
        private readonly WordsService _service;

        public WordsController(WordsService service)
        {
            _service = service;
        }

        // GET api/words?word=&userId=&pageIndex=&pageSize=&language=
        [HttpGet]
        [Authorize] //Error 401 Unauthorized

        //where_options = [{"field":"word","comparison_operation":"="}]
        public async Task<ApiResponse<List<words>>> Get(
            [FromQuery] string? word,
            [FromQuery] string? where_options
        )
        {
            var username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Get(username, word, where_options);
        }

        // POST api/words
        [HttpPost]
        [Authorize]
        public async Task<ApiResponse<words>> Add([FromBody] WordRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Add(record);
        }

        // PUT api/words/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ApiResponse<words>> Update(string id, [FromBody] WordRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Update(record);
        }

        // DELETE api/words/{id}?language=
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ApiResponse<words>> Delete(string id)
        {
            return await _service.Delete(id);
        }
    }
}
