﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.Requests.OutcomeAct
{
    public class CreateOutcomeActSUB
    {
        public int ShopId { get; set; }
        public Guid UserId { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}
