using BikeShop.Service.Domain.Enums;

namespace BikeShop.Service.Domain.Entities;

// Сущность ремонта байка
public class Service : BaseEntity
{
    public string Name { get; set; } = string.Empty; // Название ремонта
    public Status Status { get; set; } = Status.Waiting; // Статус ремонта
    
    public Guid ClientId { get; set; } // Id клиента, чей байк ремонтируют
    public string ClientDescription { get; set; } = string.Empty; // Описание клиента
    
    public Guid UserCreatedId { get; set; } // Id пользователья который создал запись
    public string UserCreatedDescription { get; set; } // описание описание того кто создал

    public Guid UserMasterId { get; set; } // Id ремонтника
    public string UserMasterDescription { get; set; }
    
    public Guid UserDeleted { get; set; } // Id юзера который удалил
    
    public decimal PriceWork { get; set; } // цены
    public decimal DiscountWork { get; set; } 
    public decimal TotalWork { get; set; } 
    
    public decimal PriceService { get; set; } 
    public decimal DiscountService { get; set; } 
    public decimal TotalService { get; set; }

    public decimal Price { get; set; }
    public decimal Discount { get; set; }
    public decimal Total { get; set; }
    
    public int ShopId { get; set; }

}