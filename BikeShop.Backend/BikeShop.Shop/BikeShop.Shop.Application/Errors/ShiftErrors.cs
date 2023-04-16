using BikeShop.Products.Application.Common.Errors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Application.Errors
{
    public class ShiftErrors
    {
        public static BaseError ShiftOpenningNotFound
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "action",
                    Error = "Shift Openning Not Found",
                    ErrorDescription = "To close or pause shift it needs to be openned first"
                };
            }
        }

        public static BaseError ShiftPauseNotFound
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "action",
                    Error = "Shift Pausing Not Found",
                    ErrorDescription = "To resume shift it needs to be paused first"
                };
            }
        }

        public static BaseError ShiftFinishNotFound
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "action",
                    Error = "Shift Finish Not Found",
                    ErrorDescription = "To open shift it needs to be finished first or it should be first shift"
                };
            }
        }

        public static BaseError LastActionNotFound
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "action",
                    Error = "Last Action Not Found",
                    ErrorDescription = "Last Action Not Found"
                };
            }
        }
    }
}
