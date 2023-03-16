using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.Enums
{
    public enum ProductCheckStatusEnum
    {
        JustCreatedByUser,
        JustCreatedByScript,
        PartialyFilledByUser,
        PartialyFilledByScript,
        FilledByUser,
        FilledByScript,
        Confirmed
    }


    public class ProductCheckStatus
    {
        private static Dictionary<string, ProductCheckStatusEnum> CreateDict()
        {
            var b = new Dictionary<string, ProductCheckStatusEnum>();
            b.Add("JustCreatedByUser", ProductCheckStatusEnum.JustCreatedByUser);
            b.Add("JustCreatedByScript", ProductCheckStatusEnum.JustCreatedByScript);
            b.Add("PartialyFilledByUser", ProductCheckStatusEnum.PartialyFilledByUser);
            b.Add("PartialyFilledByScript", ProductCheckStatusEnum.PartialyFilledByScript);
            b.Add("FilledByUser", ProductCheckStatusEnum.FilledByUser);
            b.Add("FilledByScript", ProductCheckStatusEnum.FilledByScript);
            b.Add("Confirmed", ProductCheckStatusEnum.Confirmed);
            return b;
        }
        public static Dictionary<string, ProductCheckStatusEnum> Get()
        {
            var b = CreateDict();
            return b;
        }

        public static ProductCheckStatusEnum Get(string value)
        {
            var b = CreateDict();
            return b[value];
        }

        public static string Get(ProductCheckStatusEnum value)
        {
            var b = CreateDict();
            return b.Where(n => n.Value == value).First().Key;
        }
    }
}
