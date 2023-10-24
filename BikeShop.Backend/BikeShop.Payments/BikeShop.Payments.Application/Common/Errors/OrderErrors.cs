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

        public static BaseError UserNotFount
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "id",
                    Error = "UserNotFount",
                    ErrorDescription = "User with specified id not found."
                };
            }
        }

        public static BaseError WronStatus
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "orderStatus",
                    Error = "WronStatus",
                    ErrorDescription = "Status of order cant be updated, coz prev status does not match to new."
                };
            }
        }

        public static BaseError WronDeliveryType
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "deliveryType",
                    Error = "WronDeliveryType",
                    ErrorDescription = "Specified delivery type not exist."
                };
            }
        }

        public static BaseError DeserializeError
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "deliveryInfo",
                    Error = "DeserializeError",
                    ErrorDescription = "DeliveryInfo cant be deserialized."
                };
            }
        }

        public static BaseError OrderStatusBlock
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "orderStatus",
                    Error = "OrderStatusBlock",
                    ErrorDescription = "Action was blocked coz of order status."
                };
            }
        }

        public static BaseError ProductUpdateBlock
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "products",
                    Error = "ProductUpdateBlock",
                    ErrorDescription = "Products cant be updated, probably order already payed"
                };
            }
        }

        public static BaseError PrePayUpdateError
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "isPrePay",
                    Error = "PrePayUpdateError",
                    ErrorDescription = "PrePay cant be updated when order is already payed"
                };
            }
        }

        public static BaseError PaymentAlreadyExist
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "isPayed",
                    Error = "PaymentAlreadyExist",
                    ErrorDescription = "This order is already payed, you cant pay for it again"
                };
            }
        }
    }
}
