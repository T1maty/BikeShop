using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.Refit
{
    public class ServiceDTO : BaseEntity
    {
        public string Name { get; set; } = string.Empty; // Название ремонта
        public string Status { get; set; } = "Waiting"; // Статус ремонта

        public Guid ClientId { get; set; } // Id клиента, чей байк ремонтируют
        public string ClientDescription { get; set; } = string.Empty; // Описание клиента
        public string ClientFIO { get; set; } = "";
        public string ClientPhone { get; set; } = "";

        public Guid UserCreatedId { get; set; } // Id пользователья который создал запись
        public Guid UserUpdatedId { get; set; }

        public string UserFIO { get; set; } = "";
        public string UserPhone { get; set; } = "";

        public string UserCreatedDescription { get; set; } = String.Empty;// описание описание того кто создал

        public Guid UserMasterId { get; set; }// Id ремонтника
        public string MasterFIO { get; set; } = "";
        public string MasterPhone { get; set; } = "";
        public string UserMasterDescription { get; set; } = String.Empty;

        public Guid UserDeletedId { get; set; }// Id юзера который удалил


        public int WorkDiscountId { get; set; } = 0;
        public int ProductDiscountId { get; set; } = 0;


        public decimal PriceWork { get; set; } // цены
        public decimal DiscountWork { get; set; }
        public decimal TotalWork { get; set; }

        public decimal PriceProduct { get; set; }
        public decimal DiscountProduct { get; set; }
        public decimal TotalProduct { get; set; }

        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }

        public int ShopId { get; set; }
    }
}
