using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.Enums
{
    public enum ProductSortAction
    {
        SortByStorageDescend, SortByStorageAscend,
        SortByRetailPriceDescend, SortByRetailPriceAscend,
        SortByDealerPriceDescend, SortByDealerPriceAscend,
        SortByIncomePriceDescend, SortByIncomePriceAscend,
        SortByPopularityDescend, SortByPopularityAscend,
        SortByCardStatusDescend, SortByCardStatusAscend,
    }
}
