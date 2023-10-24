using BikeShop.Products.Application.Common.Errors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Service.Application.Common.Errors
{
    public class ServiceErrors
    {
        public static BaseError ServiceNotFound
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "serviceId",
                    Error = "ServiceNotFound",
                    ErrorDescription = "Service with specified Id not found"
                };
            }
        }

        public static BaseError UnsupportedActionForStatus
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "status",
                    Error = "UnsupportedActionForStatus",
                    ErrorDescription = "This action cant be applied coz of service status"
                };
            }
        }

        public static BaseError StatusNotFound
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "status",
                    Error = "StatusNotFound",
                    ErrorDescription = "Specified status not found."
                };
            }
        }
    }
}
