using BikeShop.Workspace.Application.Common.Exceptions;
using BikeShop.Workspace.Application.Interfaces;
using BikeShop.Workspace.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Workspace.Application.Services;

public class UserService
{
    private readonly IApplicationDbContext _context;

    public UserService(IApplicationDbContext context)
    {
        _context = context;
    }

    // Получение пользователя по email
    public async Task<User?> GetUserByEmail(string email, CancellationToken cancellationToken)
    {
        // Ищу пользователя по указанной почте
        return await _context.Users
            .FirstOrDefaultAsync(user => user.Email == email, 
                cancellationToken);
    } 
}