using Models;
using Microsoft.AspNetCore.Mvc;
using Utils;
using Microsoft.AspNetCore.Authorization;

namespace Controllers
{
    [ApiController]
    [Route("api/writing_answers")]
    public class WritingAnswersController : ControllerBase
    {
        private readonly WritingAnswersService _service;

        public WritingAnswersController(WritingAnswersService service)
        {
            _service = service;
        }

        // GET api/writinganswers?questionId=
        [HttpGet]
        [Authorize]
        public async Task<ApiResponse<List<writing_answers>>> Get(
            [FromQuery] string? questionId
        )
        {
            var username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Get(username, questionId);
        }

        // POST api/writinganswers
        [HttpPost]
        [Authorize]
        public async Task<ApiResponse<writing_answers>> Add([FromBody] WritingAnswerRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Add(record);
        }

        // PUT api/writinganswers/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ApiResponse<writing_answers>> Update(string id, [FromBody] WritingAnswerRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            record.id = id;
            return await _service.Update(record);
        }

        // DELETE api/writinganswers/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ApiResponse<writing_answers>> Delete(string id)
        {
            return await _service.Delete(id);
        }
    }
}
