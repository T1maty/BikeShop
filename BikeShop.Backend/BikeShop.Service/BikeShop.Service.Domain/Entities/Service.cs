namespace BikeShop.Service.Domain.Entities;

// Сущность ремонта байка
public class Service : BaseEntity
{
    public string Name { get; set; } = string.Empty; // Название ремонта
    public string Status { get; set; } = string.Empty; // Статус ремонта
    public int ClientId { get; set; } // Id клиента, чей байк ремонтируют
    public string ClientDescription { get; set; } = string.Empty; // Описание клиента
    public int UserCreatedId { get; set; } // Id пользователья который создал запись
    public int UserMasterId { get; set; } // Id ремонтника

    public decimal PriceWork { get; set; } // цены
    public decimal DiscountWork { get; set; } 
    public decimal TotalWork { get; set; } 
    public decimal PriceService { get; set; } 
    public decimal DiscountService { get; set; } 
    public decimal TotalService { get; set; }

    public decimal Price { get; set; }
    public decimal Discount { get; set; }
    public decimal Total { get; set; }

    public int UserDeleted { get; set; } // Id юзера который удалил
}