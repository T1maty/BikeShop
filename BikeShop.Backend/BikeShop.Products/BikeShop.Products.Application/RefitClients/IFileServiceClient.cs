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
        [Post("image/upload")]
        public Task<string> AddImageToCloud(int imgId, IFormFile imageFile);

        [Get("image/getlink")]
        public Task<string> GetImageLink(string imgId);
    }
}
