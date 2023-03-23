using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.Common.Errors
{
    public class Errors
    {
        public static BaseError WorkGroupNotFound { get { return new BaseError
        {
            ReasonField = "groupId",
            Error = "Work Group Id Not Found",
            ErrorDescription = "Specified GroupId do not match to any of work groups"
        }; } }

        public static BaseError WorkNotFound
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "id",
                    Error = "Work Id Not Found",
                    ErrorDescription = "Specified id do not match to any of works"
                };
            }
        }

        public static BaseError ParentGroupNotFound
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "parentId",
                    Error = "ParentGroupId Not Found",
                    ErrorDescription = "Specified id do not match to any of GroupIds"
                };
            }
        }

        public static BaseError GroupAlreadyExist
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "name",
                    Error = "Work Group Name alredy exist",
                    ErrorDescription = "Create work group error. Work group with given name at given shop already exists"
                };
            }
        }

        public static BaseError WorkGroupNotFoundUpdate
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "id",
                    Error = "work_group_not_found",
                    ErrorDescription = "Update work group error. Work group with given id not found"
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
                    Error = "Status not found",
                    ErrorDescription = "Specified status was not found"
                };
            }
        }
    }
}
