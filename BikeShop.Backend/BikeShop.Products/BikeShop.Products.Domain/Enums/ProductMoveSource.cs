using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.Enums
{
    public enum ProductMoveSourceEnum
    {
        Bill,
        IncomeAct,
        Order,
        Service
    }


    public class ProductMoveSource
    {
        private static Dictionary<string, ProductMoveSourceEnum> CreateDict()
        {
            var b = new Dictionary<string, ProductMoveSourceEnum>();
            b.Add("Bill", ProductMoveSourceEnum.Bill);
            b.Add("SupplyInvoice", ProductMoveSourceEnum.IncomeAct);
            b.Add("Order", ProductMoveSourceEnum.Order);
            b.Add("Service", ProductMoveSourceEnum.Service);
            b.Add("ProductMove", ProductMoveSourceEnum.Service);
            return b;
        }
        public static Dictionary<string, ProductMoveSourceEnum> Get()
        {
            var b = CreateDict();
            return b;
        }

        public static ProductMoveSourceEnum Get(string value)
        {
            var b = CreateDict();
            return b[value];
        }

        public static string Get(ProductMoveSourceEnum value)
        {
            var b = CreateDict();
            return b.Where(n => n.Value == value).First().Key;
        }
    }
}
