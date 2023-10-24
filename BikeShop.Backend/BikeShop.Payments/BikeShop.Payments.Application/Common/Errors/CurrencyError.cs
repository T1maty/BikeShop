using BikeShop.Products.Application.Common.Errors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Application.Common.Errors
{
    public class CurrencyError
    {
        public static BaseError CurrencyNotFound
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "currencyId",
                    Error = "CurrencyNotFound",
                    ErrorDescription = "Currency with specified id was not found."
                };
            }
        }
    }
}
