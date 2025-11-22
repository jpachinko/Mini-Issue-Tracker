using IssuesLogsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace IssuesLogsAPI.Context
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<IssueLog> IssueLog { get; set; }
    }
}
