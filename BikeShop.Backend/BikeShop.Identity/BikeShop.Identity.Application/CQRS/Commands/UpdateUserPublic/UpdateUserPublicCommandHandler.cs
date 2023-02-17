using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace BikeShop.Identity.Application.CQRS.Commands.UpdateUserPublic;

// Обновить публичную информацию о пользователе
public class UpdateUserPublicCommandHandler : IRequestHandler<UpdateUserPublicCommand>
{
    private readonly UserManager<ApplicationUser> _userManager;


    public UpdateUserPublicCommandHandler(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<Unit> Handle(UpdateUserPublicCommand request, CancellationToken cancellationToken)
    {
        // Ищу пользователя по айди
        var user = await _userManager.FindByIdAsync(request.UserId);
        
        // Если не найден - ошибка
        if (user is null)
            throw new NotFoundException($"Update user public error. User with id {request.UserId} not found")
            {
                Error = "user_not_found",
                ErrorDescription = "Update user public error. User with given id not found",
                ReasonField = "userId"
            };

        // Если есть юзер с такой почтой - ошибка
        if (request.Email is not null)
        {
            var emailUser = await _userManager.FindByEmailAsync(request.Email);
            if (emailUser is not null)
                throw new AlreadyExistsException(
                    $"Update user public error. User with email {request.Email} already exists")
                {
                    Error = "email_already_exists",
                    ErrorDescription = "Update user public error. User with given email already exists",
                    ReasonField = "email"
                };
        }

        // Если все ок - обновляю
        user.FirstName = request.FirstName;
        user.LastName = request.LastName;
        user.Patronymic = request.Patronymic;
        user.Email = request.Email;

        await _userManager.UpdateAsync(user);

        return Unit.Value;
    }
}