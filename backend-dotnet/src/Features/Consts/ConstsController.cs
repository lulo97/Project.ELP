using Models;
using Microsoft.AspNetCore.Mvc;
using Utils;
using Microsoft.AspNetCore.Authorization;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConstsController : ControllerBase
    {
        private readonly ConstsService _service;

        public ConstsController(ConstsService service)
        {
            _service = service;
        }

        // GET api/consts?key=&pageIndex=&pageSize=
        [HttpGet]
        [Authorize]
        public async Task<ApiResponse<List<consts>>> Get(
            [FromQuery] string? key = null,
            [FromQuery] int pageIndex = 1,
            [FromQuery] int pageSize = 20,
            [FromQuery] string language = "en")
        {
            return await _service.GetAsync(key, pageIndex, pageSize, language);
        }

        // POST api/consts
        [HttpPost]
        public async Task<ApiResponse<consts>> Add([FromBody] consts record, [FromQuery] string language = "en")
        {
            return await _service.AddAsync(record, language);
        }

        // PUT api/consts/{id}
        [HttpPut("{id}")]
        public async Task<ApiResponse<consts>> Update(string id, [FromBody] consts record, [FromQuery] string language = "en")
        {
            return await _service.UpdateAsync(record, language);
        }

        // DELETE api/consts/{key}?language=
        [HttpDelete("{key}")]
        public async Task<ApiResponse<consts>> Delete(string key, [FromQuery] string language = "en")
        {
            return await _service.DeleteAsync(key, language);
        }
    }
}
