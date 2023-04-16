using BikeShop.Shop.Application.Interfaces;
using BikeShop.Shop.Domain.DTO.Shift;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Shop.WebApi.Controllers
{
    [ApiController]
    [Route("shift")]
    [Produces("application/json")]
    public class ShiftController:ControllerBase
    {
        private readonly IShiftService _shiftService;

        public ShiftController(IShiftService shiftService)
        {
            _shiftService = shiftService;
        }

        [HttpGet("getuserstatus")]
        public async Task<UserShiftStatusDTO> GetUserStatus(Guid UserId)
        {
            return await _shiftService.GetUserStatus(UserId);
        }

        [HttpPost("openshift")]
        public async Task StartShift()
        {

        }

        [HttpPost("action")]
        public async Task FinishShift()
        {

        }
    }
}
