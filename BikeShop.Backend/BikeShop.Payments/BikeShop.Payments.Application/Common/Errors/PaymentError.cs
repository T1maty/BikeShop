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

        public static BaseError UserBalanceWithoutClientId
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "clientId",
                    Error = "UserBalanceWithoutClientId",
                    ErrorDescription = "You cant use UserBalance for payment, without clientId provided."
                };
            }
        }

        public static BaseError SourceShopWithoutShopId
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "shopId",
                    Error = "SourceShopWithoutShopId",
                    ErrorDescription = "You cant specifiy shop as source, without shop id provided."
                };
            }
        }

    }
}
