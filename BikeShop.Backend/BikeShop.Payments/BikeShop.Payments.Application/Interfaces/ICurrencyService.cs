using BikeShop.Payments.Domain.DTO.Requests;
using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Application.Interfaces
{
    public interface ICurrencyService
    {
        public Task<List<Currency>> GetAll();
        public Task<Currency> Create(CreateCurrencyDTO dto);
        public Task<Currency> Update(UpdateCurrencyDTO dto);
        public Task<List<CurrencyHistory>> GetHistory(int currencyId);
    }
}
