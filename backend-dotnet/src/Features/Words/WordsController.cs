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
        public async Task<ApiResponse<List<words>>> Get(
            [FromQuery] string? word,
            [FromQuery] int? pageIndex, //Allow to passing query pageIndex = ""
            [FromQuery] int? pageSize,
            [FromQuery] string language = "en"
        )
        {
            var username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Get(pageIndex ?? CONSTS.PAGE_INDEX, pageSize ?? CONSTS.PAGE_SIZE, username, word);
        }

        // POST api/words
        [HttpPost]
        public async Task<ApiResponse<words>> Add([FromBody] WordRequestBody record, [FromQuery] string language = "en")
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Add(record, language);
        }

        // PUT api/words/{id}
        [HttpPut("{id}")]
        public async Task<ApiResponse<words>> Update(string id, [FromBody] WordRequestBody record, [FromQuery] string language = "en")
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Update(record, language);
        }

        // DELETE api/words/{id}?language=
        [HttpDelete("{id}")]
        public async Task<ApiResponse<bool>> Delete(string id, [FromQuery] string language = "en")
        {
            return await _service.Delete(id, language);
        }
    }
}
