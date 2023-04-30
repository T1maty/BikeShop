using BikeShop.Products.Application.Common.Errors;
using BikeShop.Service.Application.Interfaces;
using BikeShop.Service.Domain.Entities;
using BikeShop.Service.WebApi.Models.Work;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace BikeShop.Service.Application.Services
{
    public class WorkService : IWorkService
    {
        private readonly IApplicationDbContext _context;

        public WorkService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Work> CreateWork(CreateWorkModel model)
        {
            var group = await _context.WorkGroups.FindAsync(model.GroupId);

            // Если такой услуги нет - исключение
            if (group is null) throw Errors.WorkGroupNotFound;

            var work = new Work { Name = model.Name, Description = model.Description, Price = model.Price, WorkGroupId = model.GroupId };
            await _context.Works.AddAsync(work);

            await _context.SaveChangesAsync(new CancellationToken());

            return work;
        }

        public async Task<List<Work>> GetWorksByGroupId(int id)
        {
            var ent = await _context.Works.Where(n => n.Enabled == true).Where(n => n.WorkGroupId == id).ToListAsync();

            return ent;
        }

        public async Task<Work> UpdateWork(UpdateWorkModel model)
        {
            var group = await _context.WorkGroups.FindAsync(model.GroupId);
            if (group is null) throw Errors.WorkGroupNotFound;

            var work = await _context.Works.FindAsync(model.Id);
            if (work is null) throw Errors.WorkNotFound;

            work.Description = model.Description;
            work.Price = model.Price;
            work.Name = model.Name;
            work.UpdatedAt = DateTime.Now;
            work.WorkGroupId = model.GroupId;
            work.Enabled = model.Enabled;

            await _context.SaveChangesAsync(new CancellationToken());

            return work;
        }

        public async Task<List<Work>> Search(string Querry)
        {
            var res = Querry.ToLower().Split(" ");
            var contQR = _context.Works.Where(n => n.Enabled == true);
            foreach (var item in res)
            {
                contQR = contQR.Where(n => n.Name.ToLower().Contains(item)
                                        || n.Id.ToString().Contains(item));
            }

            return await contQR.ToListAsync();
        }
    }
}
