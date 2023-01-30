using MediatR;

namespace BikeShop.Workspace.Application.CQRS.Queries.Product.GetProductsByTags
{
    public class GetProductsByTagsQuery : IRequest<ProductsListModel>
    {
        // 1,2,7,8
        public string TagsArrayStr { get; set; }
    }
}