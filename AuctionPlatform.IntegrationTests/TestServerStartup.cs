using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;

namespace AuctionPlatform.IntegrationTests
{
    public class TestServerStartup:Startup
    {
        public TestServerStartup(IConfiguration configuration) : base(configuration)
        {
        }

        protected override void ConfigureJobs()
        {
            
        }

        protected override void ConfigureAdditionalMiddleware(IApplicationBuilder app)
        {
            base.ConfigureAdditionalMiddleware(app);
            app.UseMiddleware<InjectTestAuthentication>();
        }
    }
}
