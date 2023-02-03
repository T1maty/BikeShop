using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BikeShop.Service.Application.Common.Mappings;
using BikeShop.Service.Application.CQRS.Commands.Service.UpdateServiceStatus;
using BikeShop.Service.Domain.Enums;

namespace BikeShop.Service.WebApi.Models.Service;

public class UpdateServiceStatusModel : IMappable
{
    [Required] 
    public int ServiceId { get; set; }

    [Required]
    [Range(0, 6, ErrorMessage = "Invalid status. Must me 0-6")]
    public Status NewStatus { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<UpdateServiceStatusModel, UpdateServiceStatusCommand>();
    }
}