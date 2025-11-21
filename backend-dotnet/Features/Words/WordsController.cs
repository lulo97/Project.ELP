using Models;
using Microsoft.AspNetCore.Mvc;
using Utils;
using System.Diagnostics;

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
        public async Task<ApiResponse<List<Words>>> Get(
            [FromQuery] string? word = null,
            [FromQuery] string? userId = null,
            [FromQuery] int pageIndex = 1,
            [FromQuery] int pageSize = 20,
            [FromQuery] string language = "en")
        {
            Log.Write("He222llo");
            return await _service.GetAsync(word, pageIndex, pageSize, userId);
        }

        // POST api/words
        [HttpPost]
        public async Task<ApiResponse<Words>> Add([FromBody] Words record, [FromQuery] string language = "en")
        {
            return await _service.AddAsync(record, language);
        }

        // PUT api/words
        [HttpPut]
        public async Task<ApiResponse<Words>> Update([FromBody] Words record, [FromQuery] string language = "en")
        {
            return await _service.UpdateAsync(record, language);
        }

        // DELETE api/words/{id}?language=
        [HttpDelete("{id}")]
        public async Task<ApiResponse<bool>> Delete(int id, [FromQuery] string language = "en")
        {
            return await _service.DeleteAsync(id, language);
        }
    }
}
