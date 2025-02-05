﻿using BikeShop.Acts.Domain.DTO.AgentHub;
using BikeShop.Acts.Domain.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Interfaces
{
    public interface IPrintService
    {
        public Task<PrintQueue> AddQueue(int actId, string dataName, string? printSettings, int? prioriry, int agentId, IFormFile? imageFile);
        public Task<List<PrintQueue>> GetQueue(int AgentId);
        public Task DeleteQueue(int QueueId);
        public Task<List<PrintSettings>> GetAllPrintSettings();
        public Task<PrintSettings> CreatePrinterSettings(int AgentId, string Name, string Settings);
        public Task<PrintSettings> UpdatePrinterSettings(int Id, int AgentId, string Name, string Settings);
        public Task<PrintDTO> PrintBill(StartPrintDTO dto);
        public Task<PrintDTO> PrintProductSticker(StartPrintDTO dto);
        public Task<PrintDTO> PrintServiceSticker(StartPrintDTO dto);
        public Task<PrintDTO> PrintEncashment(StartPrintDTO dto);
        public Task<PrintDTO> PrintServiceIncomeAct(StartPrintDTO dto);
        public Task<PrintDTO> PrintServiceOutcomeShort(StartPrintDTO dto);
        public Task<PrintDTO> PrintServiceOutcomeFull(StartPrintDTO dto);

    }
}
