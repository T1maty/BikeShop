using BikeShop.Shop.Domain.DTO.Statistic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Application.Interfaces
{
    public interface IStatisticService
    {
        public Task<BaseStatisticDTO> Basic(DateTime Start, DateTime Finish);

    }
}
