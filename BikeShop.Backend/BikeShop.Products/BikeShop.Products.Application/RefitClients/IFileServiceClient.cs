using Microsoft.AspNetCore.Http;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.RefitClients
{
    public interface IFileServiceClient
    {
        [Multipart]
        [Post("/image/upload/{imgId}")]
        public Task<string> AddImageToCloud(int imgId, [AliasAs("imageFile")] StreamPart stream);

        [Get("/image/getlink")]
        public Task<string> GetImageLink(string imgId);
    }
}
