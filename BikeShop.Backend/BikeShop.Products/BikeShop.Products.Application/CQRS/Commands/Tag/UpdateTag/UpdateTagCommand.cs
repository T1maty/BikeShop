using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.CQRS.Commands.Tag.UpdateTag
{
    public class UpdateTagCommand : IRequest
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int parentId { get; set; }
        public bool isCollapsed { get; set; } = true;
        public bool isRetailVisible { get; set; } = false;
        public bool isB2BVisible { get; set; } = false;
        public bool isUniversal { get; set; } = true;
        public int sorOrder { get; set; } 
    }
}
