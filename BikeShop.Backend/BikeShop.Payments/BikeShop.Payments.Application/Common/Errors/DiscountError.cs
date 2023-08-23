using BikeShop.Products.Application.Common.Errors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Application.Common.Errors
{
    public class DiscountError
    {
        public static BaseError WrongDiscountTarget
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "discount",
                    Error = "Wron disount target",
                    ErrorDescription = "Discount target does not match to action."
                };
            }
        }

        public static BaseError DiscountTargetNotFount
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "discountTarger",
                    Error = "Wron disount target",
                    ErrorDescription = "Specified discount targer not found."
                };
            }
        }

        public static BaseError DiscountNotFount
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "discountId",
                    Error = "Wron disount id",
                    ErrorDescription = "Discount with specified id not found."
                };
            }
        }
    }
}
