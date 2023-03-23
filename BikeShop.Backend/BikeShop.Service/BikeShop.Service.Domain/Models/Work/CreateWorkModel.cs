using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BikeShop.Service.Application.Common.Mappings;

namespace BikeShop.Service.WebApi.Models.Work;

// Модель на создание услуги
public class CreateWorkModel
{
    [Required] public string Name { get; set; }
    public string Description { get; set; }
    [Required] public double Price { get; set; }
    [Required] public int CurrencyId { get; set; } // айди валюты, в которой будет оплачиваться услуга
    [Required] public int GroupId { get; set; } // айди группы услуг, в которой она принадлежит
}