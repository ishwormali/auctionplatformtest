using AuctionPlatform.IntegrationTests.Apis;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using RestEase;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;
using System.Linq;
using Shouldly;
using Microsoft.Extensions.Configuration;

namespace AuctionPlatform.IntegrationTests
{
    public class GetAuctions_Should
    {
        readonly TestServer _server;
        readonly IAuctionApi _api;
        public GetAuctions_Should()
        {
            _server = new TestServer(new WebHostBuilder().UseStartup<TestServerStartup>()
                .UseEnvironment("Production")
                .UseContentRoot(AppContext.BaseDirectory)
                .UseConfiguration(new ConfigurationBuilder()
                    .SetBasePath(AppContext.BaseDirectory)
                    .AddJsonFile("appsettings.json")
                    .Build())
                );

            _api = RestClient.For<IAuctionApi>(_server.CreateClient());
            _api.TestUser = "ishanbuddy@gmail.com";


        }

        [Fact]
        public async Task Return_Auctions()
        {
            var allAuctions=await _api.GetAll();
            allAuctions.ShouldNotBeEmpty();

        }
        
        [Fact]
        public async Task Not_Return_Expired_Auctions()
        {
            var allAuctions = await _api.GetAll();
            allAuctions.ShouldNotContain(m => m.AuctionEndDate <= DateTime.Now);

        }

    }
}
