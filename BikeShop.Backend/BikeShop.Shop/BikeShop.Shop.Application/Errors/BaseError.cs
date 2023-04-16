using BikeShop.Shop.Application.Exception;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.Common.Errors
{
    public class BaseError : Exception, IException
    {
        public string Error { get; set; }
        public string ErrorDescription { get; set; }
        public string? ReasonField { get; set; }
    }
}
