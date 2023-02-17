using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BikeShop.Products.Domain.Entities;

namespace BikeShop.Products.Application.CQRS.Commands.Tag.CreateTag
{
    public class CreateTagCommand : IRequest<ProductTag>
    {
        public string Name { get; set; } = string.Empty;
        public int ParentId { get; set; } = 0;
        public bool IsCollapsed { get; set; } = false;
        public bool IsRetailVisible { get; set; } = false;
        public bool IsB2BVisible { get; set; } = false;
        public bool IsUniversal { get; set; } = false;
        public int SortOrder { get; set; } = 0;

    }
}
