using System.Text.Json.Serialization;

namespace BikeShop.Payments.Domain.Entities;

public class Currency : BaseEntity
{
    public string Name { get; set; }
    public string Symbol { get; set; }
    public decimal Coefficient { get; set; }
    public bool IsBaseCurrency { get; set; } = false;

    [JsonIgnore] public IList<CurrencyHistory> CurrencyHistories { get; set; }
}