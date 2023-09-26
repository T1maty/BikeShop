using BikeShop.Products.Application.Common.Errors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Application.Common.Errors
{
    public class OrderErrors
    {
        public static BaseError ClientNotFound
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "clientId",
                    Error = "ClientNotFound",
                    ErrorDescription = "On of the orders contains ClientId, that does not exist."
                };
            }
        }

        public static BaseError OrderNotFount
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "id",
                    Error = "OrderNotFount",
                    ErrorDescription = "Order with specified id not found."
                };
            }
        }
    }
}
