using Microsoft.AspNetCore.Mvc;

using TeachBoard.FileService.Application.Interfaces;

namespace TeachBoard.FileService.Api.Controllers;

[ApiController]
[Route("image")]
public class ImageController : ControllerBase
{
    private readonly IImageFileService _imageFileService;

    public ImageController(IImageFileService imageFileService)
    {
        _imageFileService = imageFileService;
    }

    [HttpPost("upload/{imgId:int}")]
    public async Task<string> AddToProduct(int imgId,
        [FromForm] IFormFile imageFile)
    {
        var imagePublicName = "product_img_" + imgId;
        var result = await _imageFileService.UploadImageAsync(imageFile, imagePublicName);

        return result;
    }

    [HttpGet("getlink")]
    public async Task<string> GetLink(string imgId)
    {
        var imagePublicId = "product_img_" + imgId;
        var link = _imageFileService.GetImageLink(imagePublicId);

        return link;
    }

    [HttpPost("uploadactimg/{imgId:int}")]
    public async Task<string> AddActImage(int imgId,
        [FromForm] IFormFile imageFile)
    {
        var imagePublicName = "act_img_" + imgId;
        var result = await _imageFileService.UploadImageAsync(imageFile, imagePublicName);

        return result;
    }

    [HttpGet("getlinkact/{imgId:int}")]
    public async Task<string> GetLinkAct(int imgId)
    {
        var imagePublicId = "act_img_" + imgId;
        var link = _imageFileService.GetImageLink(imagePublicId);

        return link;
    }

}