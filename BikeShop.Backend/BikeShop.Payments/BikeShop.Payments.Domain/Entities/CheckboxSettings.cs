using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.Entities
{
    public class CheckboxSettings : BaseEntity
    {
        public string BearerToken { get; set; }
        public string SettingsName { get; set; }
        public string PIN { get; set; }
        public string Key { get; set; }
        public Guid ShiftId { get; set; }
    }
}
