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
        public List<ProductOptionsDTO> productOptions { get; set; }

        public List<ProductSpecidicationDTO> productSpecifications { get; set; }

        public List<ProductImagesDTO> images { get; set; }

        public List<ProductTagsDTO> tags { get; set; }

        public ProductCardMicroDTO productCard { get; set; }
    }
}
