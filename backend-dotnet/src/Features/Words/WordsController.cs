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
        public async Task<ApiResponse<List<Words>>> Get(HttpRequest req,
            [FromQuery] string? word = null,
            [FromQuery] int pageIndex = 1,
            [FromQuery] int pageSize = 20,
            [FromQuery] string language = "en"
            )
        {
            // Safely get token from cookie
            if (!req.Cookies.TryGetValue("token", out var token) || string.IsNullOrEmpty(token))
            {
                throw new Exception("Token missing in cookies");
            }

            Console.WriteLine("token = " + token);

            // If you want username from the JWT, parse claims
            var handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var username = jwtToken.Claims.FirstOrDefault(c => c.Type == "username")?.Value
                           ?? "unknown";

            Console.WriteLine("username = " + username);

            return await _service.GetAsync(word, pageIndex, pageSize, username);
        }


        // POST api/words
        [HttpPost]
        public async Task<ApiResponse<Words>> Add([FromBody] Words record, [FromQuery] string language = "en")
        {
            return await _service.AddAsync(record, language);
        }

        // PUT api/words/{id}
        [HttpPut("{id}")]
        public async Task<ApiResponse<Words>> Update(string id, [FromBody] Words record, [FromQuery] string language = "en")
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
