using BikeShop.Service.Domain.Entities;
using BikeShop.Service.WebApi.Models.Work;

namespace BikeShop.Service.Application.Interfaces
{
    public interface IWorkService
    {
        public Task<List<Work>> GetWorksByGroupId(int id);
        public Task<Work> CreateWork(CreateWorkModel model);
        public Task<Work> UpdateWork(UpdateWorkModel model);
        public Task<List<Work>> Search(string Querry);
    }
}
