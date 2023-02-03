using MediatR;

namespace BikeShop.Service.Application.CQRS.Commands.Service.UpdateService;

public class UpdateServiceCommand : IRequest
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string ClientDescription { get; set; }
    public string UserMasterDescription { get; set; }

    public int ShopId { get; set; }

    public string UserCreatedDescription { get; set; }

    public Guid UserMasterId { get; set; }

    // public decimal PriceWork { get; set; }
    // public decimal DiscountWork { get; set; }
    //
    // public decimal PriceService { get; set; }
    // public decimal DiscountService { get; set; }
    //
    // public decimal Price { get; set; }
    // public decimal Discount { get; set; }
    //public Status Status { get; set; } 
    //public decimal TotalWork { get; set; }
    //public decimal TotalService { get; set; }
    //public decimal Total { get; set; }
    //public Guid ClientId { get; set; } // Id клиента, чей байк ремонтируют
    //public Guid UserCreatedId { get; set; } // Id пользователья который создал запись
    //public Guid UserDeleted { get; set; } // Id юзера который удалил
}