using BikeShop.Identity.Domain.DTO.Request;
using BikeShop.Identity.Domain.DTO.Request.Social;
using BikeShop.Identity.Domain.DTO.Response;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BikeShop.Identity.WebApi.Models.Auth;
using BikeShop.Identity.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace BikeShop.Identity.Application.Interfaces
{
    public interface IAuthService
    {
        public Task<UserResponseWithRoles> Register(RegisterFullDTO dto);
        public Task<ApplicationUser> Login(LoginRequestModel dto);

        public Task<LoginResponseModel> AppUserLoginTokensAsync(ApplicationUser user, HttpContext httpContext);
        public Task Logout(HttpContext httpContext);
        public Task<string> Refresh(HttpContext httpContext);

        public Task<ApplicationUser> SocialLogin([FromBody] SocialLoginDTO requestModel);
        public Task<ApplicationUser> SocialRegister(SocialRegisterDTO dto);

    }
}
