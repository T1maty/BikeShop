using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Refit
{
    public interface IFileserviceClient
    {
        [Multipart]
        [Post("/image/uploadactimg/{imgId}")]
        public Task<string> AddActImage(int imgId, [AliasAs("imageFile")] StreamPart stream);

        [Get("/image/getlinkact/{imgId}")]
        public Task<string> GetActImageLink(int imgId);
    }
}
