using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuctionPlatform.Data;
using AuctionPlatform.Models;
using Microsoft.EntityFrameworkCore;

namespace AuctionPlatform.Services
{
    public class AuctionService : IAuctionService
    {
        ApplicationDbContext dbContext;
        public AuctionService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public Bid AddBid(Bid bid)
        {
            dbContext.Bids.Add(bid);
            dbContext.SaveChanges();
            return bid;
        }

        public AuctionItem GetAuctionById(int id)
        {
            return dbContext.AuctionItems.Include(m=>m.Bids).FirstOrDefault(m => m.Id == id);

        }

        public async Task<IEnumerable<AuctionItem>> GetAuctions()
        {
            return await dbContext.AuctionItems.Where(m => m.AuctionEndDate > DateTime.Now).ToListAsync();
        }

        public async Task<IEnumerable<AuctionItem>> GetExpiredAuctions()
        {
            return await dbContext.AuctionItems.Where(m => m.AuctionEndDate <= DateTime.Now && m.AuctionCompletedDate == null).Include(m => m.Bids).ToListAsync();

        }
    }
}
