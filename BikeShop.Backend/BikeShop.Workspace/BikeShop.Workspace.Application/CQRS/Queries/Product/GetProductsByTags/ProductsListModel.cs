using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeShop.Workspace.Application.CQRS.Queries.Product.GetProductsByTags
{
    public class ProductsListModel
    {
        public List<Domain.Entities.Product> Products { get; set; }
    }
}