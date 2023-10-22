using BikeShop.Identity.Application.DTO;
using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Domain.DTO.Request;
using BikeShop.Identity.Domain.DTO.Request.Social;
using BikeShop.Identity.Domain.DTO.Response;
using BikeShop.Identity.Domain.Entities;
using BikeShop.Identity.Domain.Enum;
using BikeShop.Identity.WebApi.Models.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Ocsp;
using System.Threading;

namespace BikeShop.Identity.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthDbContext _context;
        private readonly IUserService _userService;
        private static Random _random = new Random();
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly CookieService _cookieService; // для вставки рефреш токена в куки
        private readonly JwtService _jwtService; // для генерации JWT-токенов

        public AuthService(UserManager<ApplicationUser> userManager, IAuthDbContext context, IUserService userService, SignInManager<ApplicationUser> signInManager, CookieService cookieService, JwtService jwtService)
        {
            _userManager = userManager;
            _context = context;
            _userService = userService;
            _signInManager = signInManager;
            _cookieService = cookieService;
            _jwtService = jwtService;
        }

        public async Task<UserResponseWithRoles> Register(RegisterFullDTO dto)
        {
            // Если есть пользователь с таким телефоном - ошибка
            if(dto.Email != null)
            {
                var existingUserByMail = await _userManager.FindByEmailAsync(dto.Email);
                if (existingUserByMail is not null)
                    throw new AlreadyExistsException($"Create user error. User with email {dto.Email} already exists")
                    {
                        Error = "email_already_exists",
                        ErrorDescription = "Create user error. User with given email already exists",
                        ReasonField = "email"
                    };
            }

            var existingUserByPhone = await _userManager.FindByNameAsync(dto.Phone);
            if (existingUserByPhone is not null)
                throw new AlreadyExistsException($"Create user error. User with phone {dto.Phone} already exists")
                {
                    Error = "phone_already_exists",
                    ErrorDescription = "Create user error. User with given phone already exists",
                    ReasonField = "phone"
                };


            // Создаю пользователя из запроса
            var user = new ApplicationUser
            {
                UserName = dto.Phone,
                PhoneNumber = dto.Phone,
                FirstName = dto.FirstName != null ? dto.FirstName : null,
                LastName = dto.LastName != null ? dto.LastName : null,
                Patronymic = dto.Patronymic != null ? dto.Patronymic : null,
                Email = dto.Email != null ? dto.Email : null
            };

            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded)

                throw new RegistrationException($"Error while user '{dto.Phone}' registration")
                {
                    Error = "error_registration",
                    ErrorDescription = "Registration error. Perhaps the password does not match the requirements",
                    ReasonField = "password"
                };


            return await _userService.GetUserResponseWithRoles(Guid.Parse(user.Id));
            
        }
        public async Task<ApplicationUser> Login(LoginRequestModel dto)
        {
            // Если не указан ни телефон ни почта - ошибка
            if (dto.Phone is null && dto.Email is null)
                throw new SignInDataException("Get user by sign in error. Phone AND email is null")
                {
                    Error = "phone_email_null",
                    ErrorDescription = "Get user error. Phone AND email are empty",
                    ReasonField = "phone_email"
                };

            // Ищу пользователя в базе по телефону или почте, в зависимости от того что указали
            var user = dto.Phone is not null
                ? await _userManager.FindByNameAsync(dto.Phone)
                : await _userManager.FindByEmailAsync(dto.Email);

            // Если нет такого пользователя
            if (user is null)
                throw new NotFoundException(
                    $"Get user by sign in error. User with phone/email {dto.Phone ?? dto.Email} not found")
                {
                    Error = "user_not_found",
                    ErrorDescription = "Get user error. User with given phone/email not found",
                    ReasonField = dto.Phone is null ? "email" : "phone"
                };

            // Сверяю пароль
            var result = await _signInManager.PasswordSignInAsync(user, dto.Password, false, false);
            if (!result.Succeeded)
                throw new SignInDataException($"Get user by sign in error. Incorrect password from user {user.PhoneNumber}")
                {
                    Error = "incorrect_password",
                    ErrorDescription = "Get user error. Incorrect password",
                    ReasonField = "password"
                };

            return user;
        }

        public async Task<ApplicationUser> SocialLogin([FromBody] SocialLoginDTO dto)
        {
            if (dto.SocialType != null && !Enum.IsDefined(typeof(SocialType), dto.SocialType))
                throw new NotFoundException($"LoginError user error.")
                {
                    Error = "socialType_not_found",
                    ErrorDescription = "Create user error. Specified social type cant be found",
                    ReasonField = "socialType"
                };


            ApplicationUser? user = null;

            if (dto.SocialType == SocialType.Google.ToString())
                user = await _userManager.Users.Where(n => n.GoogleId == dto.SocialId).FirstOrDefaultAsync();

            if (dto.SocialType == SocialType.Facebook.ToString())
                user = await _userManager.Users.Where(n => n.FacebookId == dto.SocialId).FirstOrDefaultAsync();

            // Если нет такого пользователя
            if (user is null)
                throw new NotFoundException(
                    $"Get user by sign in error. User not found")
                {
                    Error = "user_not_found",
                    ErrorDescription = "Get user error. User with given socialId not found",
                    ReasonField = "socialId"
                };

            await _signInManager.SignInAsync(user, true, "SocialId");

            return user;
        }

        public async Task<ApplicationUser> SocialRegister(SocialRegisterDTO dto)
        {
            // Если есть пользователь с таким телефоном - ошибка
            if (dto.Email != null)
            {
                var existingUserByMail = await _userManager.FindByEmailAsync(dto.Email);
                if (existingUserByMail is not null)
                    throw new AlreadyExistsException($"Create user error. User with email {dto.Email} already exists")
                    {
                        Error = "email_already_exists",
                        ErrorDescription = "Create user error. User with given email already exists",
                        ReasonField = "email"
                    };
            }

            var existingUserByPhone = await _userManager.FindByNameAsync(dto.Phone);
            if (existingUserByPhone is not null)
                throw new AlreadyExistsException($"Create user error. User with phone {dto.Phone} already exists")
                {
                    Error = "phone_already_exists",
                    ErrorDescription = "Create user error. User with given phone already exists",
                    ReasonField = "phone"
                };

            if(dto.Gender != null && !Enum.IsDefined(typeof(UserGender), dto.Gender))
                throw new NotFoundException($"Create user error. Scepified gender cant be found")
                {
                    Error = "gender_not_found",
                    ErrorDescription = "Create user error. Scepified gender cant be found",
                    ReasonField = "gender"
                };

            if (dto.Language != null && !Enum.IsDefined(typeof(UserLanguage), dto.Language))
                throw new NotFoundException($"Create user error. Scefified landuage cant be found")
                {
                    Error = "language_not_found",
                    ErrorDescription = "Create user error. Scefified landuage cant be found",
                    ReasonField = "language"
                };

            if (dto.SocialType != null && !Enum.IsDefined(typeof(SocialType), dto.SocialType))
                throw new NotFoundException($"Create user error. Specified social type cant be found")
                {
                    Error = "socialType_not_found",
                    ErrorDescription = "Create user error. Specified social type cant be found",
                    ReasonField = "socialType"
                };


            // Создаю пользователя из запроса
            var user = new ApplicationUser
            {
                UserName = dto.Phone,
                PhoneNumber = dto.Phone,
                FirstName = dto.FirstName != null ? dto.FirstName : null,
                LastName = dto.LastName != null ? dto.LastName : null,
                Patronymic = dto.Patronymic != null ? dto.Patronymic : null,
                Email = dto.Email != null ? dto.Email : null,

                Gender = dto.Gender != null ? dto.Gender : null,
                Birth = dto.Birth != null ? dto.Birth : null,
                Language = dto.Language != null ? dto.Language : null,

                FacebookId = dto.SocialType == SocialType.Facebook.ToString() ? dto.SocialId : null,
                GoogleId = dto.SocialType == SocialType.Google.ToString() ? dto.SocialId : null,
            };

            var result = dto.Password != null? await _userManager.CreateAsync(user, dto.Password): await _userManager.CreateAsync(user);
            if (!result.Succeeded)
                throw new RegistrationException($"Error while user '{dto.Phone}' registration")
                {
                    Error = "error_registration",
                    ErrorDescription = "Registration error. Perhaps the password does not match the requirements",
                    ReasonField = "password"
                };

            return user;
        }

        public async Task<LoginResponseModel> AppUserLoginTokensAsync(ApplicationUser user, HttpContext httpContext)
        {
            var roles = await _userManager.GetRolesAsync(user);

            // Существующая сессия для пользователя
            var existingSession = await _context.RefreshSessions
                .FirstOrDefaultAsync(session => session.UserId == Guid.Parse(user.Id));

            // Генерирую новый рефреш токен
            var newToken = Guid.NewGuid();

            // Если сессия есть - обновить токен
            if (existingSession is not null)
            {
                existingSession.RefreshToken = newToken;
                existingSession.UpdatedAt = DateTime.Now;
            }
            // Если сессии нет - создать
            else
            {
                _context.RefreshSessions.Add(new RefreshSession()
                {
                    UserId = Guid.Parse(user.Id),
                    RefreshToken = newToken
                });
            }

            await _context.SaveChangesAsync(new CancellationToken());

            _cookieService.AddRefreshCookieToResponse(httpContext.Response, newToken);
            var accessToken = _jwtService.GenerateUserJwt(user, roles);

            var u = user;

            return new LoginResponseModel { AccessToken = accessToken,
                User = new LoginResponseUserModel
                {
                    ShopId = u.ShopId,
                    Roles = roles,
                    Balance = u.Balance,
                    CreditLimit = u.CreditLimit,
                    Email = u.Email,
                    EmailConfirmed = u.EmailConfirmed,
                    FirstName = u.FirstName,
                    Id = Guid.Parse(u.Id),
                    LastName = u.LastName,
                    Patronymic = u.Patronymic,
                    PhoneNumber = u.PhoneNumber,
                    PhoneNumberConfirmed = u.PhoneNumberConfirmed,
                }
            };
        }

        public async Task Logout(HttpContext httpContext)
        {
            string refreshToken = _cookieService.GetRefreshTokenFromCookie(httpContext.Request);
            if (refreshToken == null)
                throw new NotFoundException($"No refresh token provided")
                {
                    Error = "no_refresh_token",
                    ErrorDescription = $"Refresh failed. No refresh token provided",
                    ReasonField = "refreshToken"
                };

            // Удаляю сессию по рефреш токену из базы
            // Ищу существующую сессию
            var existingSession = await _context.RefreshSessions
                .FirstOrDefaultAsync(session => session.RefreshToken == Guid.Parse(refreshToken));

            // Если сессии с таким рефреш токеном не существует - ошибка
            if (existingSession is null)
                throw new NotFoundException($"Session with refresh token {refreshToken} not found")
                {
                    Error = "session_not_found",
                    ErrorDescription = $"Logout failed. Given refresh token does not belong to any session",
                    ReasonField = "refreshToken"
                };

            var User = await _userManager.FindByIdAsync(existingSession.UserId.ToString());

            // Удаляю сессию из базы
            _context.RefreshSessions.Remove(existingSession);
            await _context.SaveChangesAsync(new CancellationToken());

            // Удаляю кукас
            httpContext.Response.Cookies.Delete("X-Refresh-Token");

            await _signInManager.SignOutAsync();
        }

        public async Task<string> Refresh(HttpContext httpContext)
        {
            var refreshToken = _cookieService.GetRefreshTokenFromCookie(httpContext.Request);

            if (refreshToken == null)
                throw new NotFoundException($"No refresh token provided")
                {
                    Error = "no_refresh_token",
                    ErrorDescription = $"Refresh failed. No refresh token provided",
                    ReasonField = "refreshToken"
                };

            // Ищу сессию с таким рефреш токеном
            var existingSession = await _context.RefreshSessions
                .FirstOrDefaultAsync(session => session.RefreshToken == Guid.Parse(refreshToken));

            // Если такой сессии нет - исключение
            if (existingSession is null)
                throw new NotFoundException($"Session with refresh token {refreshToken} not found")
                {
                    Error = "session_not_found",
                    ErrorDescription = $"Refresh failed. Given refresh token does not belong to any session",
                    ReasonField = "refreshToken"
                };

            // Если есть - обновляю рефреш сессию и возвращаю
            existingSession.RefreshToken = Guid.NewGuid();
            existingSession.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync(new CancellationToken());

            var User = await _userManager.FindByIdAsync(existingSession.UserId.ToString());
            var Roles = await _userManager.GetRolesAsync(User);

            // Добавляю рефреш токен в httpOnly cookie
            _cookieService.AddRefreshCookieToResponse(httpContext.Response, existingSession.RefreshToken);

            // Генерирую новый access токен и возвращаю его 
            var accessToken = _jwtService.GenerateUserJwt(User, Roles);

            return accessToken;
        }
    }
}
