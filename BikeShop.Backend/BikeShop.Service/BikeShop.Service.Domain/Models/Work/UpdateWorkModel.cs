using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BikeShop.Service.Application.Common.Mappings;

namespace BikeShop.Service.WebApi.Models.Work;

// Модель для обновления услуги
public class UpdateWorkModel
{
    [Required] public int Id { get; set; }
    [Required] public string Name { get; set; }
    [Required] public string Description { get; set; }
    [Required] public double Price { get; set; }
    [Required] public int GroupId { get; set; }
    [Required] public bool Enabled { get; set; }
}