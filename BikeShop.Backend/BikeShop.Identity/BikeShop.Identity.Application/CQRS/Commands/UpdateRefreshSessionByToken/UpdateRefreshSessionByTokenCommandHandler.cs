using System.Collections.Specialized;
using BikeShop.Identity.Application.CQRS.Queries.GetAccessTokens;
using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Application.Services;
using IdentityModel;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace BikeShop.Identity.Application.CQRS.Commands.UpdateRefreshSessionByToken;

public class UpdateRefreshSessionByTokenCommandHandler
    : IRequestHandler<UpdateRefreshSessionByTokenCommand, AccessTokensModel>
{
    private readonly IAuthDbContext _context;
    private readonly TokenService _tokenService;

    public UpdateRefreshSessionByTokenCommandHandler(IAuthDbContext context, TokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    public async Task<AccessTokensModel> Handle(UpdateRefreshSessionByTokenCommand request,
        CancellationToken cancellationToken)
    {
        // Существующая сессия
        var existingSession = await _context.RefreshSessions
            .FirstOrDefaultAsync(session => session.RefreshToken == request.RefreshToken,
                cancellationToken);

        // Если нет сессии с таким рефшер токеном - исключение
        if (existingSession is null)
            throw new SessionNotFoundException()
            {
                Error = "session_not_found",
                ErrorDescription = "Session with refresh token not found"
            };
        
        // Кидаю дефолтный запрос на идентити для рефреша, получая новые токены
        var parameters = new NameValueCollection
        {
            { "client_id", request.ClientId },
            { "grant_type", "refresh_token" },
            { "refresh_token", request.RefreshToken },
            { "response_type", OidcConstants.ResponseTypes.Token }
        };
        var response = await _tokenService.GetIdpToken(parameters);
        var resultTokens = _tokenService.GetTokenResponse(response);

        // если не выдало рефреш токен - исключение
        if (resultTokens.RefreshToken is null)
            throw new RefreshTokenAbsentException(JsonSerializer.Serialize(resultTokens));

        existingSession.RefreshToken = resultTokens.RefreshToken;
        existingSession.ExpiresIn = resultTokens.ExpiresIn;
        existingSession.UpdatedAt = DateTime.Now;
        await _context.SaveChangesAsync(cancellationToken);

        return resultTokens;
    }
}