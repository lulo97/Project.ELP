using Models;
using Microsoft.AspNetCore.Mvc;
using Utils;
using Microsoft.AspNetCore.Authorization;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly PostsService _service;

        public PostsController(PostsService service)
        {
            _service = service;
        }

        // GET api/posts?title=&pageIndex=&pageSize=
        [HttpGet]
        [Authorize]
        public async Task<ApiResponse<List<posts>>> Get([FromQuery] string? title)
        {
            var username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Get(username, title);
        }

        // POST api/posts
        [HttpPost]
        [Authorize]
        public async Task<ApiResponse<posts>> Add([FromBody] PostRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Add(record);
        }

        // PUT api/posts/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ApiResponse<posts>> Update(string id, [FromBody] PostRequestBody record)
        {
            record.username = JwtHelper.GetUsernameFromToken(HttpContext.Request)!;
            return await _service.Update(record);
        }

        // DELETE api/posts/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ApiResponse<posts>> Delete(string id)
        {
            return await _service.Delete(id);
        }
    }
}
