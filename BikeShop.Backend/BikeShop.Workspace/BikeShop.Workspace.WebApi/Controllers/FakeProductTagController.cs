using AutoMapper;
using BikeShop.Workspace.Domain.Entities;
using BikeShop.Workspace.WebApi.Models.ProductTag;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Workspace.WebApi.Controllers
{
    [ApiController]
    [Route("tag")]
    public class FakeProductTagController : ControllerBase
    {
        private readonly IMapper _mapper;

        public FakeProductTagController(IMapper mapper)
        {
            _mapper = mapper;
        }

        private static List<ProductTag> _tags = new List<ProductTag>()
        {
            new ProductTag {
                Id = 1,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                IsB2BVisible = true,
                IsCollapsed = false,
                IsRetailVisible = true,
                IsUniversal = false,
                ParentId = 0,
                Name = "Tag1",
                SortOrder = 5
            },
            new ProductTag {
                Id = 2,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                IsB2BVisible = true,
                IsCollapsed = false,
                IsRetailVisible = true,
                IsUniversal = false,
                ParentId = 0,
                Name = "Tag2",
                SortOrder = 6
            },
            new ProductTag {
                Id = 3,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                IsB2BVisible = true,
                IsCollapsed = false,
                IsRetailVisible = true,
                IsUniversal = false,
                ParentId = 0,
                Name = "Tag3",
                SortOrder = 7
            },
            new ProductTag {
                Id = 4,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                IsB2BVisible = true,
                IsCollapsed = false,
                IsRetailVisible = true,
                IsUniversal = false,
                ParentId = 0,
                Name = "Tag4",
                SortOrder = 2
            },
        };


        [HttpPost("create")]
        public async Task<IActionResult> CreateProductTag([FromBody] CreateProductTagModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var tag = _mapper.Map<ProductTag>(model);
            tag.Id = _tags.Count + 1;
            _tags.Add(tag);

            return Ok();
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(_tags);
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateProductTag([FromBody] UpdateProductTagModel model)
        {
            if (!ModelState.IsValid) return BadRequest(model);

            var tag = _tags.FirstOrDefault(p => p.Id == model.Id);

            if (tag is null)
                return BadRequest($"No tag with id {model.Id}");

            tag.UpdatedAt = DateTime.Now;
            tag.Name = model.Name;
            tag.ParentId = model.ParentId;
            tag.IsCollapsed = model.IsCollapsed;
            tag.IsRetailVisible = model.IsRetailVisible;
            tag.IsB2BVisible = model.IsB2BVisible;
            tag.IsUniversal = model.IsUniversal;
            tag.SortOrder = model.SortOrder;

            return Ok();
        }

    }
}
