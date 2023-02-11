using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using BikeShop.Identity.Application.Common.Configurations;
using BikeShop.Identity.Domain.Entities;
using Microsoft.IdentityModel.Tokens;

namespace BikeShop.Identity.Application.Services;

// Для генерации JWT-токенов
public class JwtService
{
    private readonly JwtConfiguration _configuration;

    public JwtService(JwtConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateUserJwt(ApplicationUser user, IEnumerable<string> userRoles)
    {
        // Добавляю клаймы в токен
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, "auth"),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),

            new Claim("id", user.Id),
        };
        // Добавляю роли юзера в клаймы токена
        claims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

        // Ключ подписи
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.Key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        // Формирую токен и возвращаю его
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