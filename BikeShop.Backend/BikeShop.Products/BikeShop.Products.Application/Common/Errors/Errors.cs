using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.Common.Errors
{
    public class Errors
    {
        public static BaseError QuantityGroupNotFound { get { return new BaseError
        {
            ReasonField = "groupId",
            Error = "Group does not exist",
            ErrorDescription = "Specified GroupId do not match to any of groups"
        }; } }

        public static BaseError DuplicateQuantityGroupName
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "name",
                    Error = "Duplicate QuantityGroup Name",
                    ErrorDescription = "Specified Group Name already exist"
                };
            }
        }

        public static BaseError DuplicateQuantityUnitName
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "name",
                    Error = "Duplicate QuantityUnit Name",
                    ErrorDescription = "Specified Unit Name already exist"
                };
            }
        }

        public static BaseError DuplicateQuantityUnitFullName
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "fullName",
                    Error = "Duplicate QuantityUnit FullName",
                    ErrorDescription = "Specified Unit FullName already exist"
                };
            }
        }

        public static BaseError IdNotFound
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "id",
                    Error = "id not found",
                    ErrorDescription = "Specified id was not found"
                };
            }
        }

        public static BaseError ProductNotFount
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "productId",
                    Error = "productId not found",
                    ErrorDescription = "Specified Product id was not found"
                };
            }
        }
    }
}
