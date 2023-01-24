using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using BikeShop.Identity.Application.Common.Configurations;
using BikeShop.Identity.Domain.Entities;
using Microsoft.IdentityModel.Tokens;

namespace BikeShop.Identity.Application.Services;

public class JwtService
{
    private readonly JwtConfiguration _configuration;

    public JwtService(JwtConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateUserJwt(ApplicationUser user, IList<string> userRoles)
    {
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, "auth"),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),

            new Claim(ClaimTypes.NameIdentifier, user.Id),
        };

        foreach (var role in userRoles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.Key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            _configuration.Issuer,
            _configuration.Audience,
            claims,
            expires: DateTime.UtcNow + _configuration.Expire,
            signingCredentials: creds
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}