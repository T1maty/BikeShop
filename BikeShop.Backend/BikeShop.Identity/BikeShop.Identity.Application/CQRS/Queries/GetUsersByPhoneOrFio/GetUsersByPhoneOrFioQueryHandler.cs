using System.Linq.Expressions;
using BikeShop.Identity.Application.CQRS.Queries.GetUserBySignInData;
using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Identity.Application.CQRS.Queries.GetUsersByPhoneOrFio;

public class GetUsersByPhoneOrFioQueryHandler : IRequestHandler<GetUsersByPhoneOrFIOQuery, UserModelListModel>
{
    private readonly IAuthDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public GetUsersByPhoneOrFioQueryHandler(IAuthDbContext context, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public async Task<UserModelListModel> Handle(GetUsersByPhoneOrFIOQuery request, CancellationToken cancellationToken)
    {
        if (request.Phone is null && request.FIO is null)
            throw new GetUsersException("Create user error")
            {
                Error = "phone_fio_null",
                ErrorDescription = "Get users error. Phone AND FIO are absent"
            };

        // Получить юзеров по куску телефона или по куску ФИО
        // это пиздец
        //////////////// ниже до конца говнокод не смотрите

        Expression<Func<ApplicationUser, bool>> pred;

        if (request.Phone is not null && request.FIO is not null)
            pred = user => user.PhoneNumber.Contains(request.Phone)
                           && (user.LastName + user.FirstName + user.Patronymic).Contains(request.FIO);

        else if (request.Phone is null)
            pred = user => (user.LastName + user.FirstName + user.Patronymic).Contains(request.FIO);

        else
            pred = user => user.PhoneNumber.Contains(request.Phone);


        var users = await _userManager.Users.Where(pred).ToListAsync(cancellationToken);


        var resultModel = new UserModelListModel
        {
            Users = new List<GetUserModel>()
        };

        foreach (var user in users)
        {
            resultModel.Users.Add(new GetUserModel
            {
                User = user,
                UserRoles = await _userManager.GetRolesAsync(user)
            });
        }

        return resultModel;
    }
}