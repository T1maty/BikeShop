using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Domain.DTO.AgentHub;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Hubs
{
    public class AgentHub:Hub
    {
        private readonly IPrintService _printService;

        public AgentHub(IPrintService printService)
        {
            _printService = printService;
        }

        public async Task ConfirmPayment(TerminalPayment dto)
        {
            await Clients.All.SendAsync("ConfirmPay", dto);
        }

        public async Task CancelPayment(TerminalPayment dto)
        {
            await Clients.All.SendAsync("CancelPay", dto);
        }

        public async Task RequestPayment(TerminalPayment dto)
        {
            await Clients.All.SendAsync("RequestPay", dto);
        }
        
        //
        //Printing
        //
        public async Task PrintBill(StartPrintDTO dto)
        {
            var res = await _printService.PrintBill(dto);
            await Clients.All.SendAsync("Printing", res);
        }

        public async Task PrintProductSticker(StartPrintDTO dto)
        {
            var res = await _printService.PrintProductSticker(dto);
            await Clients.All.SendAsync("Printing", res);
        }

        public async Task PrintServiceSticker(StartPrintDTO dto)
        {
            var res = await _printService.PrintServiceSticker(dto);
            await Clients.All.SendAsync("Printing", res);
        }

        public async Task PrintEncashment(StartPrintDTO dto)
        {
            var res = await _printService.PrintEncashment(dto);
            await Clients.All.SendAsync("Printing", res);
        }

        public async Task PrintServiceIncomeAct(StartPrintDTO dto)
        {
            var res = await _printService.PrintServiceIncomeAct(dto);
            await Clients.All.SendAsync("Printing", res);
        }

        public async Task PrintServiceOutcomeShort(StartPrintDTO dto)
        {
            var res = await _printService.PrintServiceOutcomeShort(dto);
            await Clients.All.SendAsync("Printing", res);
        }

        public async Task PrintServiceOutcomeFull(StartPrintDTO dto)
        {
            var res = await _printService.PrintServiceOutcomeFull(dto);
            await Clients.All.SendAsync("Printing", res);
        }

    }
}
