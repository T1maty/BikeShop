using BikeShop.Products.Application.Common.Exceptions;
using BikeShop.Products.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Products.Application.CQRS.Queries.Product.GetProductsByTagsQuery;

public class GetProductsByTagsQueryHandler : IRequestHandler<GetProductsByTagsQuery, ProductsListModel>
{
    private readonly IApplicationDbContext _context;

    public GetProductsByTagsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ProductsListModel> Handle(Product.GetProductsByTagsQuery.GetProductsByTagsQuery request, CancellationToken cancellationToken)
    {
        var tags = GetTagListFromString(request.TagsArrayStr);

        // Получаю айди продуктов с указанными тэгами
        var productsIds = await _context.TagToProductBinds.Where(bind => tags.Contains(bind.ProductTagId))
            .Select(bind => bind.ProductId).ToListAsync(cancellationToken);
        // Получаю продукты по айди продуктов
        var products = await _context.Products.Where(product => productsIds.Contains(product.Id))
            .ToListAsync(cancellationToken);

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

        // Тэги будут переданы через запятую, сплитю по запятой
        foreach (var tagStr in tagsArrayStr.Split("-"))
        {
            // Пытаюсь спарсить строку тэга в число
            var isNumber = int.TryParse(tagStr, out var currentTag);
            // Если не число - 400
            if (!isNumber)
                throw new InvalidFormatException($"Get products by tags error. Given invalid tags ({tagsArrayStr})")
                {
                    Error = "tags_invalid",
                    ErrorDescription = "Invalid tags format. Correct example: getbytags/1-2-3-4-5",
                    ReasonField = "tagsIds"
                };

            // Если один из тэгов число - добавляю его в результативный лист
            tagList.Add(currentTag);
        }

        // Если 0 тэгов перенесено - ошибка
        if (tagList.Count == 0)
            throw new InvalidFormatException($"Get products by tags error. Given invalid tags ({tagsArrayStr})")
            {
                Error = "tags_invalid",
                ErrorDescription = "Invalid tags format. Correct example: getbytags/1-2-3-4-5",
                ReasonField = "tagsIds"
            };

        // Если все ок - возвращаю лист
        return tagList;
    }
}
