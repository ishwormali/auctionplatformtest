using AuctionPlatform.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AuctionPlatform.IntegrationTests
{
    public class InjectTestAuthentication
    {
        public const string TestUserHeaderKey = "TestUser";
        readonly RequestDelegate _next;
        public InjectTestAuthentication(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context,UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            if(context.Request.Headers.Keys.Contains(TestUserHeaderKey))
            {
                var email = context.Request.Headers[TestUserHeaderKey];
                var user = await userManager.FindByEmailAsync(email);
                var userPrinciple=await signInManager.CreateUserPrincipalAsync(user);
                context.User = userPrinciple;
            }

            await _next(context);
        }
    }
}
