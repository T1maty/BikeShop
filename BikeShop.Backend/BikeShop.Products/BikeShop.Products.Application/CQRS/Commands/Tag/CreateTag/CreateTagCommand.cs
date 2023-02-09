using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.CQRS.Commands.Tag.CreateTag
{
    public class CreateTagCommand : IRequest
    {
        public string Name { get; set; } = string.Empty;
        public int parentId { get; set; }
        public bool isCollapsed { get; set; } 
        public bool isRetailVisible { get; set; } = false;
        public bool isB2BVisible { get; set; } = false;
        public bool isUniversal { get; set; } = false;
        public int sortOrder { get; set; }

    }
}
