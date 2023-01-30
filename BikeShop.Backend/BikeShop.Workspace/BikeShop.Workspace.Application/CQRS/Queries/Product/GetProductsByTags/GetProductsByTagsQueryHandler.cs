using BikeShop.Workspace.Application.Common.Exceptions;
using BikeShop.Workspace.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Workspace.Application.CQRS.Queries.Product.GetProductsByTags
{
    public class GetProductsByTagsQueryHandler : IRequestHandler<GetProductsByTagsQuery, ProductsListModel>
    {
        public IApplicationDbContext _context;

        public GetProductsByTagsQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ProductsListModel> Handle(GetProductsByTagsQuery request, CancellationToken cancellationToken)
        {
            var tags = GetTagListFromString(request.TagsArrayStr);

            var productsIds = await _context.TagToProductBinds.Where(bind => tags.Contains(bind.ProductTagId)).Select(bind => bind.ProductId).ToListAsync();
            var products = await _context.Products.Where(product => productsIds.Contains(product.Id)).ToListAsync();

            return new ProductsListModel
            {
                Products = products
            };
        }

        private static List<int> GetTagListFromString(string tagsArrayStr)
        {
            // Список всех айди тэгов в виде чисел
            var tagList = new List<int>();
            // для перебора
            int currentTag;

            // Тэги будут переданы через запятую, сплитю по запятой
            foreach (var tagStr in tagsArrayStr.Split("-"))
            {
                // Пытаюсь спарсить строку тэга в число
                bool isNumber = int.TryParse(tagStr, out currentTag);
                // Если не число - 400
                if (!isNumber)
                    throw new InvalidFormatException($"Get products by tags error. Given invalid tags ({tagsArrayStr})")
                    {
                        Error = "tags_invalid",
                        ErrorDescription = "Invalid tags format. Correct example: getbytags/1,2,3,4,5"
                    };

                // Если один из тэгов число - добавляю его в результативный лист
                tagList.Add(currentTag);
            }

            // Если 0 тэгов перенесено - ошибка
            if (tagList.Count == 0)
                throw new InvalidFormatException($"Get products by tags error. Given invalid tags ({tagsArrayStr})")
                {
                    Error = "tags_invalid",
                    ErrorDescription = "Invalid tags format. Correct example: getbytags/1,2,3,4,5"
                };

            // Если все ок - возвращаю лист
            return tagList;
        }
    }
}