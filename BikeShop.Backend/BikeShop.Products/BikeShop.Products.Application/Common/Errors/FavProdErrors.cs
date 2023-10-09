using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.Common.Errors
{
    public class FavProdErrors
    {
        public static BaseError ProductAlreadyInFav
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "ProductId",
                    Error = "ProductAlreadyInFav",
                    ErrorDescription = "Specified product already exist in Clients Fav List"
                };
            }
        }

        public static BaseError ProductNotFount
        {
            get
            {
                return new BaseError
                {
                    ReasonField = "ProductId",
                    Error = "ProductNotFount",
                    ErrorDescription = "Specified product was not found"
                };
            }
        }
    }
}
