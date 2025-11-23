using Microsoft.AspNetCore.Mvc;
using Models;
using Utils;

namespace Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _service;

        public AuthController(AuthService service)
        {
            _service = service;
        }

        [HttpPost("signup")]
        public async Task<ApiResponse<object>> SignUp([FromBody] AuthRequest body)
        {
            return await _service.SignUp(body.username, body.password);
        }

        [HttpPost("login")]
        public async Task<ApiResponse<object>> Login([FromBody] AuthRequest body)
        {
            // all login logic moved into service
            return await _service.Login(body.username, body.password, Response);
        }

        [HttpPost("logout")]
        public ApiResponse<object> Logout()
        {
            return _service.Logout(Response, Request);
        }

        [HttpGet("me")]
        public ApiResponse<AuthResponse> Me()
        {
            return _service.Me(Request);
        }

    }
}
