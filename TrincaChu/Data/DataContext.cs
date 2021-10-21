using Microsoft.EntityFrameworkCore;
using TrincaChu.Models;

namespace TrincaChu.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<User> User { get; set; }
        public DbSet<Item> Item { get; set; }
        public DbSet<Event> Event { get; set; }
        public DbSet<EventAttendees> EventAttendees { get; set; }
        public DbSet<EventItens> EventItens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity => { entity.HasIndex(e => e.Email).IsUnique(); });

            modelBuilder.Entity<EventAttendees>()
                .HasKey(bc => new { bc.EventId, bc.AttendeeId });

            modelBuilder.Entity<EventItens>()
                .HasKey(bc => new { bc.EventId, bc.ItemId });
        }
    }
}