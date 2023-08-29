using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.Enumerables
{
    public enum DiscountTarget
    {
        ShopBillTotal, 
        ShopSingleProduct,

        WorkshopSingleProduct,
        WorkshopProductsTotal,
        WorkshopSingleWork,
        WorkshopWorkTotal,
        WorkshopTotal

    }
}
