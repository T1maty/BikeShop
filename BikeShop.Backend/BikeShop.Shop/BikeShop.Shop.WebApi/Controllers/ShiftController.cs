using BikeShop.Shop.Application.Interfaces;
using BikeShop.Shop.Domain.DTO.Shift;
using BikeShop.Shop.Domain.Entities;
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
        public async Task<UserShiftItem> StartShift(Guid UserId)
        {
            return await _shiftService.StartShift(UserId);
        }

        [HttpPost("closeshift")]
        public async Task<UserShiftItem> FinishShift(Guid UserId)
        {
            return  await _shiftService.FinishShift(UserId);
        }

        [HttpPost("pauseshift")]
        public async Task<UserShiftItem> PauseShift(Guid UserId)
        {
            return await _shiftService.PauseShift(UserId);
        }
        [HttpPost("resumeshift")]
        public async Task<UserShiftItem> ResumeShift(Guid UserId)
        {
            return await _shiftService.ResumeShift(UserId);
        }
        [HttpGet("gethours")]
        public async Task<TimeSpan> GetHours(Guid UserId, DateTime Start, DateTime Stop)
        {
            return await _shiftService.GetHours(UserId, Start, Stop);
        }
    }
}
