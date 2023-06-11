using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.Enumerables
{
    public class OrderType
    {
        public static string FromShop { get { return "FromShop"; } }
        public static string B2B { get { return "B2B"; } }
        public static string Retail { get { return "Retail"; } }

    }
}
