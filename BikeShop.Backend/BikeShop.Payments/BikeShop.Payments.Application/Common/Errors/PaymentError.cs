using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.Common.Errors
{
    public class PaymentError
    {
        public static BaseError WrongPaymentTarget { get { return new BaseError
        {
            ReasonField = "target",
            Error = "Wrong Payment Target",
            ErrorDescription = "Specified target name do not exist."
        }; } }

       
    }
}
