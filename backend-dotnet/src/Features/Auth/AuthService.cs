using DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Utils;
using static Utils.Utils;

public class AuthService
{
    private readonly AppDbContext _db;
    private readonly JwtSettings _jwt;

    public AuthService(AppDbContext db, JwtSettings jwt)
    {
        _db = db;
        _jwt = jwt;
    }

    public async Task<ApiResponse<object>> SignUp(string username, string password)
    {
        if (string.IsNullOrWhiteSpace(username))
            return ApiResponse<object>.Fail("UsernameNull");

        if (string.IsNullOrWhiteSpace(password))
            return ApiResponse<object>.Fail("PasswordNull");

        var exists = await _db.users.AnyAsync(u => u.username == username);
        if (exists)
            return ApiResponse<object>.Fail("UserAlreadyExists");

        var user = new users
        {
            id = GetRandomId(),
            username = username,
            password_hash = BCrypt.Net.BCrypt.HashPassword(password)
        };

        //Add alone only write changes to EF Change Tracker
        //Call SaveChangesAsync() to actually save in db
        //await _db.users.AddAsync(user);

        _db.users.Add(user);
        await _db.SaveChangesAsync();

        return ApiResponse.Ok(user);
    }

    public async Task<ApiResponse<object>> Login(string username, string password, HttpResponse response)
    {
        var user = await _db.users.FirstOrDefaultAsync(u => u.username == username);
        if (user == null)
            return ApiResponse<object>.Fail($"User '{username}' not exist!");

        Console.WriteLine("Process username = " + username);

        //Salt length/work factor doesn't matter when compare hash
        if (!BCrypt.Net.BCrypt.Verify(password, user.password_hash))
            return ApiResponse<object>.Fail("Password incorrect!");

        var token = CreateJwt(user.username);

        Console.WriteLine("Process token = " + token);

        var options = new CookieOptions
        {
            HttpOnly = true,
            Secure = false, // set to true in production with HTTPS
            SameSite = SameSiteMode.Strict,
            MaxAge = TimeSpan.FromSeconds(_jwt.MaxAgeSeconds)
        };

        // Append the token to the response cookies
        response.Cookies.Append("token", token, options);

        // Log details
        Console.WriteLine($"Done setting up token in cookies. Options => HttpOnly: {options.HttpOnly}, Secure: {options.Secure}, SameSite: {options.SameSite}, MaxAge (seconds): {options.MaxAge?.TotalSeconds}");

        return ApiResponse.Ok();
    }

    public ApiResponse<object> Logout(HttpResponse response, HttpRequest request)
    {
        if (!request.Cookies.ContainsKey("token"))
            return ApiResponse.Fail("No token detected to delete!");

        response.Cookies.Delete("token");
        return ApiResponse.Ok();
    }

    public ApiResponse<AuthResponse> Me(HttpRequest request)
    {
        if (!request.Cookies.TryGetValue("token", out var token))
            return ApiResponse<AuthResponse>.Fail("No token provided");

        //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InRlc3QxIiwibmJmIjoxNzYzODYwNDMxLCJleHAiOjE3Njc0NjA0MzEsImlhdCI6MTc2Mzg2MDQzMX0.4WZzF1zKgINVQzVEzMlUHuqwQAX-kbrGonoINc9HtAE
        //Console.WriteLine("Token: " + token);

        var handler = new JwtSecurityTokenHandler();
        var jwt = handler.ReadJwtToken(token);

        //JWT Claims:
        // Type: unique_name, Value: test1
        // Type: nbf, Value: 1763860431
        // Type: exp, Value: 1767460431
        // Type: iat, Value: 1763860431
        //Console.WriteLine("JWT Claims:");
        //foreach (var claim in jwt.Claims)
        //{
        //    Console.WriteLine($"Type: {claim.Type}, Value: {claim.Value}");
        //}

        var username = jwt.Claims.FirstOrDefault(c => c.Type == "unique_name")?.Value
                       ?? jwt.Claims.FirstOrDefault(c => c.Type == "username")?.Value;

        var authResponse = new AuthResponse
        {
            user = new JwtResponse
            {
                username = username!,
                iat = jwt.IssuedAt,
                exp = jwt.ValidTo
            }
        };

        return ApiResponse<AuthResponse>.Ok(authResponse);
    }

    private string CreateJwt(string username)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Secret));
        var handler = new JwtSecurityTokenHandler();

        var descriptor = new SecurityTokenDescriptor
        {
            //http://schemas.xmlsoap.org/ws/2005/05/identity/claims -> { "unique_name": username }
            Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, username) }),
            Expires = DateTime.UtcNow.AddSeconds(_jwt.MaxAgeSeconds),
            IssuedAt = DateTime.UtcNow,
            SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
        };

        var token = handler.CreateJwtSecurityToken(descriptor);
        return handler.WriteToken(token);
    }
}
