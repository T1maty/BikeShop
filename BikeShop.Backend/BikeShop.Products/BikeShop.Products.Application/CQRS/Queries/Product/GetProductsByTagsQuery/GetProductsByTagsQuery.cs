using MediatR;

namespace BikeShop.Products.Application.CQRS.Queries.Product.GetProductsByTagsQuery
{
    public class GetProductsByTagsQuery : IRequest<ProductsListModel>
    {
        // 1,2,7,8
        public string TagsArrayStr { get; set; }
    }
}