using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.Enumerables
{
    public enum PaymentTargetEnum
    {
        Cashbox,
        Workshop
    }
    public class PaymentTarget
    {
        public static string Cashbox { get { return "Cashbox"; } set { } }
        public static string Workshop { get { return "Workshop"; } set { } }
    }
}
