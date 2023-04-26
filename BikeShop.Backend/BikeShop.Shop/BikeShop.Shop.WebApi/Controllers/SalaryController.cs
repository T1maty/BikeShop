using BikeShop.Shop.Application.Interfaces;
using BikeShop.Shop.Domain.DTO.Salary;
using BikeShop.Shop.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Shop.WebApi.Controllers
{
    [ApiController]
    [Route("salary")]
    [Produces("application/json")]
    public class SalaryController : ControllerBase
    {
        private readonly ISalaryService _salaryService;

        public SalaryController(ISalaryService salaryService)
        {
            _salaryService = salaryService;
        }

        [HttpPut("update")]
        public async Task<UserSalary> UpdateSalary (Guid UserId, decimal Rate, decimal ShopPercent, decimal WorkPercent, decimal WorkshopPercent)
        {
            return await _salaryService.UpdateSalary(UserId, Rate, ShopPercent, WorkPercent, WorkshopPercent);
        }

        [HttpGet("byuser")]
        public async Task<UserSalary> Get(Guid UserId)
        {
            return await _salaryService.Get(UserId);
        }

        [HttpGet("calculate")]
        public async Task<CalculateSalary> Calculate(Guid UserId, DateTime Start, DateTime Finish)
        {
            return await _salaryService.Calculate(UserId, Start, Finish);
        }
    }
}
