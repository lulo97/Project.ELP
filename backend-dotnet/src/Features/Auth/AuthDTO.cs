namespace DTO
{
    public partial class JwtResponse
    {
        public required string username { get; set; }

        public required System.DateTime iat { get; set; }

        public required System.DateTime exp { get; set; }
    }

    public partial class AuthResponse
    {
        public required JwtResponse user { get; set; }
    }

    public class AuthRequest
    {
        public string username { get; set; } = "";
        public string password { get; set; } = "";
    }
}