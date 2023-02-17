using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BikeShop.Identity.Application.Common.Mappings;
using BikeShop.Identity.Application.CQRS.Commands.CreateUser;

namespace BikeShop.Identity.WebApi.Models.User;

public class CreateUserModel : IMappable
{
    [Required] public string Phone { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Patronymic { get; set; }
    
    public void Mapping(Profile profile)
    {
        profile.CreateMap<CreateUserModel, CreateUserCommand>();
    }
}