using BikeShop.Products.Application.Common.Errors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Application.Errors
{
    public class ScheduleErrors
    {
        public static BaseError ShopScheduleNotFount
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "shopId",
                    Error = "Shop not found.",
                    ErrorDescription = "Shop with specified id is not found."
                };
            }
        }

        public static BaseError ScheduleItemNotFount
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "itemId",
                    Error = "ScheduleItemNotFount",
                    ErrorDescription = "Schedule item with specified id is not found."
                };
            }
        }

        public static BaseError RemovingOfStartedShift
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "itemId",
                    Error = "RemovingOfStartedShift",
                    ErrorDescription = "Shift that already started cant be removed."
                };
            }
        }
    }
}
