using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BikeShop.Workspace.Application.Common.Mappings;
using BikeShop.Workspace.Application.CQRS.Commands.Work.UpdateWork;

namespace BikeShop.Workspace.WebApi.Models.Work;

// Модель для обновления услуги
public class UpdateWorkModel : IMappable
{
    [Required] public int Id { get; set; }
    [Required] public string Name { get; set; }
    [Required] public string Description { get; set; }
    [Required] public double Price { get; set; }
    [Required] public int CurrencyId { get; set; }
    [Required] public int GroupId { get; set; }


    public void Mapping(Profile profile)
    {
        profile.CreateMap<UpdateWorkModel, UpdateWorkCommand>();
    }
}