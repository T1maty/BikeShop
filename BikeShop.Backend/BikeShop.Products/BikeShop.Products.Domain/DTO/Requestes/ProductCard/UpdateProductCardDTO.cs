using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes.ProductCard
{
    public class UpdateProductCardDTO
    {
        public int Id { get; set; }
        public string CheckStatus { get; set; }
        public List<OptionVariantDTO> productOptions { get; set; }

        public List<ProductSpecidicationDTO> productSpecifications { get; set; }

        public List<UpdateProductTagBindDTO> productTags { get; set; }

        public ProductCardMicroDTO productCard { get; set; }
        public List<UpdateBindProductDTO> bindedProducts { get; set; }
    }
}
