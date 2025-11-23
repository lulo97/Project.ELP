using System.IdentityModel.Tokens.Jwt;

namespace Utils
{
    public class JwtSettings
    {
        public required string Secret { get; set; } = "";
        public required int MaxAgeSeconds { get; set; }
        public required int HashSaltLength { get; set; }

        public override string ToString()
        {
            return $"JwtSettings: Secret={Secret}, MaxAgeSeconds={MaxAgeSeconds}, HashSaltLength={HashSaltLength}";
        }
    }


    public static class JwtHelper
    {
        public static string? GetUsernameFromToken(HttpRequest request)
        {
            if (!request.Cookies.TryGetValue("token", out var token) || string.IsNullOrEmpty(token))
            {
                return null;
            }

            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);

            var username = jwtToken.Claims.FirstOrDefault(c => c.Type == "unique_name")?.Value;

            return username;
        }
    }
}
