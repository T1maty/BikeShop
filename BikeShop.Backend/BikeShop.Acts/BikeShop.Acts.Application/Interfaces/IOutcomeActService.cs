using BikeShop.Acts.Domain.DTO;
using BikeShop.Acts.Domain.DTO.Requests.OutcomeAct;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Interfaces
{
    public interface IOutcomeActService
    {
        public Task<List<OutcomeActWithProducts>> GetByShop(int id, int take);
        public Task<OutcomeActWithProducts> Create(CreateOutcomeActDTO dto);
        public Task<OutcomeActWithProducts> Execute(int invoiceId, Guid userId);
        public Task<OutcomeActWithProducts> Update(UpdateOutcomeActDTO dto);


    }
}
