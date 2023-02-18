using MediatR;

namespace BikeShop.Shop.Application.CQRS.Commands.UpdateShop;

public class UpdateShopCommand : IRequest
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string Phone { get; set; }
    public string Secret { get; set; }
    public int StorageId { get; set; }
    public decimal CashboxCash { get; set; }
    public decimal CashboxTerminal { get; set; }
    
    public bool Enabled { get; set; }
}