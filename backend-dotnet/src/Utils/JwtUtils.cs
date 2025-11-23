using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Models;

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
}
