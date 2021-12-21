using Microsoft.EntityFrameworkCore;
using MyAppWebAPI.Models.Entities;

namespace MyAppWebAPI.Models
{
    public class MyAppDbContext : DbContext
    {
        public MyAppDbContext(DbContextOptions<MyAppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<City> Cities { get; set; }
        public DbSet<User> Users { get; set; }
    }
}