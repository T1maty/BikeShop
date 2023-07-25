using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Identity.WebApi.Controllers
{
    [ApiController]
    [Route("balance")]
    [Produces("application/json")]
    public class UserBalanceController : ControllerBase
    {
        private readonly IUserBalanceService _userBalanceService;

        public UserBalanceController(IUserBalanceService userBalanceService)
        {
            _userBalanceService = userBalanceService;
        }

        [HttpGet("getusers")]
        public async Task<List<ApplicationUser>> GetUsers()
        {
            return await _userBalanceService.GetUsers();
        }

        [HttpPut("editbalance")]
        public async Task<ApplicationUser> EditBalance(Guid userId, decimal amount, bool checkLimit)
        {
            return await _userBalanceService.EditBalance(userId, amount, checkLimit);
        }
    }
}
