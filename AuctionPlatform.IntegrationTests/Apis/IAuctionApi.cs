using AuctionPlatform.Dto;
using RestEase;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AuctionPlatform.IntegrationTests.Apis
{
    public interface IAuctionApi
    {
        [Header("TestUser")]
        string TestUser { get; set; }

        [Get(ApiConstants.GetAuctions)]
        Task<IEnumerable<AuctionItemDto>> GetAll();
    }
}
