using BikeShop.Service.Domain.Entities;
using BikeShop.Service.WebApi.Models.WorkGroup;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Service.Application.Interfaces
{
    public interface IWorkGroupService
    {
        public Task<List<WorkGroup>> GetWorkGroupsByShopId(int id);
        public Task<WorkGroup> CreateWorkGroup(CreateWorkGroupModel model);
        public Task<WorkGroup> UpdateWorkGroup(UpdateWorkGroupModel model);
    }
}
