using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ScheduleContext : DbContext
    {
        public ScheduleContext(DbContextOptions<ScheduleContext> options) : base(options)
        {
        }

        public DbSet<Schedule> Schedule { get; set; }
    }
}