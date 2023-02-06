using System.Text.Json.Serialization;

namespace BikeShop.Payments.Domain.Entities;

public class CurrencyHistory : BaseEntity
{
    public int CurrencyId { get; set; }
    [JsonIgnore] public Currency Currency { get; set; }

    public decimal Coefficient { get; set; }
}