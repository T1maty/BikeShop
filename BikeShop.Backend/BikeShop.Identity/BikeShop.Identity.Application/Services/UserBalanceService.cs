using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Identity.Application.Services
{
    public class UserBalanceService : IUserBalanceService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthDbContext _context;

        public UserBalanceService(UserManager<ApplicationUser> userManager, IAuthDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        public async Task<ApplicationUser> EditBalance(Guid userId, decimal amount, bool checkLimit)
        {
            
            var user = await _userManager.FindByIdAsync(userId.ToString());
            var hist = new UserBalanceActionHistory { UserId = userId, ActionAmount = amount, BeforeAction = user.Balance };
            user.Balance = user.Balance + amount;
            if (checkLimit && user.Balance < user.CreditLimit * -1) { throw new Exception(); }
            hist.AfterAction = user.Balance;
            await _context.UserBalanceActionHistories.AddAsync(hist);

            await _userManager.UpdateAsync(user);
            await _context.SaveChangesAsync(new CancellationToken());
            return user;
        }

        public async Task<List<ApplicationUser>> GetUsers()
        {
            return await _userManager.Users.Where(n => n.Balance != 0).ToListAsync();
        }

        public async Task<ApplicationUser> SetCreditLimit(Guid userId, decimal amount)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            user.CreditLimit = amount;
            await _userManager.UpdateAsync(user);
            return user;
        }
    }
}
