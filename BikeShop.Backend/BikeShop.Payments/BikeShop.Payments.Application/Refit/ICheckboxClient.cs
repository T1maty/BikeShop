using BikeShop.Acts.Domain.Refit;
using BikeShop.Payments.Domain.DTO.Refit.Checkbox;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Application.Refit
{
    public interface ICheckboxClient
    {
        [Post("/cashier/signinPinCode")]
        public Task<SignInResponse> SigninPinCode([Body]SignInModel data, [Header("X-License-Key")] string key);


        [Post("/receipts/sell")]
        [Headers("Content-Type: application/json")]
        public Task<SellResponse> Sell([Body] Receipt receipt, [Header("Authorization")] string bearer);

        [Get("/receipts/{id}/qrcode")]
        public Task<HttpResponseMessage> GerQRCode(Guid id, [Header("Authorization")] string bearer);

        [Get("/cashier/check-signature")]
        public Task<HttpResponseMessage> CheckSignature([Header("Authorization")] string bearer);

        [Post("/shifts")]
        public Task<HttpResponseMessage> CreateShift([Header("X-License-Key")] string key, [Header("Authorization")] string bearer);
    }
}
