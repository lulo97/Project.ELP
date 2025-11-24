using Microsoft.AspNetCore.Mvc;
using Utils;
using System.Text.Json;

namespace Controller
{
    [ApiController]
    [Route("api/redis")]
    public class RedisController : ControllerBase
    {
        private readonly RedisService _redisService;

        public RedisController(RedisService redisService)
        {
            _redisService = redisService;
        }

        // GET /api/redis?key=someKey
        [HttpGet]
        public async Task<ApiResponse<object?>> Get([FromQuery] string key)
        {
            if (string.IsNullOrWhiteSpace(key))
                return ApiResponse<object?>.Fail("Key is required");

            var value = await _redisService.Get(key);

            if (value == null) return ApiResponse<object?>.Ok();

            try
            {
                var jsonDoc = JsonSerializer.Deserialize<object>(value);
                return ApiResponse<object?>.Ok(jsonDoc);
            }
            catch
            {
                return ApiResponse<object?>.Ok(value);
            }
        }

        [HttpGet("reset")]
        public async Task<ApiResponse<object?>> Reset()
        {
            await _redisService.InitAsync();
            return ApiResponse<object?>.Ok();
        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok(new { message = "Hello World" });
        }
    }
}
