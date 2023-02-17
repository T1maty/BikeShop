using MediatR;

namespace BikeShop.Shop.Application.CQRS.Commands.CreateShop;

public class CreateShopCommand : IRequest
{
    public string Name { get; set; }
    public string Address { get; set; }
    public string Phone { get; set; }
    public string Secret { get; set; }
    public int StorageId { get; set; }
}