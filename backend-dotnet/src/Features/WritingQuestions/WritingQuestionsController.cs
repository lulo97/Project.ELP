using Models;
using Microsoft.AspNetCore.Mvc;
using Utils;
using Microsoft.AspNetCore.Authorization;

namespace Controllers
{
    [ApiController]
    [Route("api/writing_questions")]
    public class WritingQuestionsController : ControllerBase
    {
        private readonly WritingQuestionsService _service;

        public WritingQuestionsController(WritingQuestionsService service)
        {
            _service = service;
        }

        // GET api/writingquestions?query=
        [HttpGet]
        [Authorize]
        public async Task<ApiResponse<List<writing_questions>>> Get(
            [FromQuery] string? query
        )
        {
            var username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Get(username, query);
        }

        // POST api/writingquestions
        [HttpPost]
        [Authorize]
        public async Task<ApiResponse<writing_questions>> Add([FromBody] WritingQuestionRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Add(record);
        }

        // PUT api/writingquestions/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ApiResponse<writing_questions>> Update(string id, [FromBody] WritingQuestionRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            record.id = id;
            return await _service.Update(record);
        }

        // DELETE api/writingquestions/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ApiResponse<writing_questions>> Delete(string id)
        {
            return await _service.Delete(id);
        }
    }
}
