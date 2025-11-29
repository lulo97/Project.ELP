using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;

public class JwtAuthenticatedHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    [Obsolete]
    public JwtAuthenticatedHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock)
        : base(options, logger, encoder, clock) { }

    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        string? token = null;
        if (Request.Cookies.TryGetValue("token", out var t) && !string.IsNullOrEmpty(t))
        {
            token = t;
        }

        if (token == null)
        {
            return Task.FromResult(AuthenticateResult.Fail(new Exception("Token null!")));
        }

        string? username = null;
        string? exp = null;
        string? iat = null;

        var handler = new JwtSecurityTokenHandler();
        var jwt = handler.ReadJwtToken(token);

        username = jwt.Claims.FirstOrDefault(c => c.Type == "unique_name")?.Value ?? "unknown";
        exp = jwt.Claims.FirstOrDefault(c => c.Type == "exp")?.Value ?? "";
        iat = jwt.Claims.FirstOrDefault(c => c.Type == "iat")?.Value ?? "";

        if (exp == null)
        {
            return Task.FromResult(AuthenticateResult.Fail(new Exception("Expiry date from token is null!")));
        }

        if (iat == null)
        {
            return Task.FromResult(AuthenticateResult.Fail(new Exception("Issued at from token is null!")));
        }

        if (username == null)
        {
            return Task.FromResult(AuthenticateResult.Fail(new Exception("Username from token is null!")));
        }

        //exp = 1767479017
        if (!long.TryParse(exp, out var expUnix))
            return Task.FromResult(AuthenticateResult.Fail(new Exception("Invalid exp claim")));

        var expDate = DateTimeOffset.FromUnixTimeSeconds(expUnix).UtcDateTime; 
        var now = DateTime.UtcNow;

        if (now > expDate)
        {
            return Task.FromResult(AuthenticateResult.Fail(new Exception($"Token expired at {expDate} UTC. Current time: {now} UTC")));
        }

        Console.WriteLine($"Process authorize from {Request.Path} with token = {token[..10]}..., parsed username = {username}, exp = {exp}, iat = {iat}\n");

        var claims = jwt.Claims;
        var identity = new ClaimsIdentity(claims, "CookieJwt");
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, "CookieJwt");

        return Task.FromResult(AuthenticateResult.Success(ticket));
    }
}
