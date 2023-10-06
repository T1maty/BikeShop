using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Hubs
{
    public class AgentHub:Hub
    {
        public async Task ConfirmPayment()
        {

        }

        public async Task RequestPayment(string v)
        {
            await Clients.All.SendAsync("ReqP",v);
        }

    }
}
