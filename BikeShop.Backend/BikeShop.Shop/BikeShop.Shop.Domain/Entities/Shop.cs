namespace BikeShop.Shop.Domain.Entities;

public class Shop : BaseEntity
{
    public string Name { get; set; }
    public string Address { get; set; }
    public string Phone { get; set; }
    public string Secret { get; set; }
    public int StorageId { get; set; }
    public decimal CashboxCash { get; set; }
    public decimal CashboxTerminal { get; set; }
}