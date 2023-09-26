using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.Enumerables
{
    public class OrderStatus
    {
        public static string Created { get { return "Created"; } }
        public static string WaitingProcessing { get { return "WaitingProcessing"; } }
        public static string WaitingForPayment { get { return "WaitingForPayment"; } }
        public static string WaitingForComplictation { get { return "WaitingForComplictation"; } }
        public static string WaitingForShipping { get { return "WaitingForShipping"; } }
        public static string Shipped { get { return "Shipped"; } }
        public static string ReadyInShop { get { return "ReadyInShop"; } }
        public static string WaitingForMoving { get { return "WaitingForMoving"; } }
        public static string Finished { get { return "Finished"; } }
        public static string Canceled { get { return "Canceled"; } }
    }
}
