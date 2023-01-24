using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace BikeShop.Identity.Application.CQRS.Queries.GetUserBySignInData;

public class GetUserBySignInDataQueryHandler : IRequestHandler<GetUserBySignInDataQuery, GetUserModel>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public GetUserBySignInDataQueryHandler(UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public async Task<GetUserModel> Handle(GetUserBySignInDataQuery request, CancellationToken cancellationToken)
    {
        var signIn = await _signInManager
            .PasswordSignInAsync(request.Phone, request.Password, false, false);

        if (!signIn.Succeeded)
            throw new NotFoundException($"User with phone '{request.Phone}' and password '{request.Password}' not found")
            {
                Error = "error_login",
                ErrorDescription = "Login failed. Incorrect login or password"
            };

        var user = await _userManager.FindByNameAsync(request.Phone);
        var roles = await _userManager.GetRolesAsync(user);

        return new GetUserModel
        {
            User = user,
            UserRoles = roles
        };
    }
}