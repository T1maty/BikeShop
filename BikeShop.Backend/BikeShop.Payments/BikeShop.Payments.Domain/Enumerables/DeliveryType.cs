using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.Enumerables
{
    public class DeliveryType
    {
        public static string Pickup { get { return "Pickup"; } }
        public static string Shipping { get { return "Shipping"; } }
        public static string BLCDelivery { get { return "BLCDelivery"; } }

    }
}
