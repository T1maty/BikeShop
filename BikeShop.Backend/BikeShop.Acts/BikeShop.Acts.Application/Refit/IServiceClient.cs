using BikeShop.Acts.Domain.Refit;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Refit
{
    public interface IServiceClient
    {
        [Get("/service/getbyid")]
        public Task<ServiceDTO> GetById(int id);
    }
}
