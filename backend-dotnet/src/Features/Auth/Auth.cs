namespace Models;

public partial class Auth
{
    public required string username { get; set; }

    public required System.DateTime iat { get; set; }

    public required System.DateTime exp { get; set; }
}

public class AuthResponse
{
    public required Auth user { get; set; }
}
