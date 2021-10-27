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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity => { entity.HasIndex(e => e.Email).IsUnique(); });

            modelBuilder.Entity<EventAttendees>()
                .HasKey(bc => new { bc.EventId, bc.AttendeeId });
            modelBuilder.Entity<EventAttendees>()
                .HasOne(e => e.Event)
                .WithMany(ea => ea.Attendees)
                .HasForeignKey(ei => ei.EventId);
            modelBuilder.Entity<EventAttendees>()
                .HasOne(a => a.Attendee)
                .WithMany(ea => ea.Events)
                .HasForeignKey(ai => ai.AttendeeId);

            modelBuilder.Entity<Item>()
                .HasOne(e => e.Event)
                .WithMany(ea => ea.Items)
                .HasForeignKey(ei => ei.EventId);
            // modelBuilder.Entity<Event>()
            //     .HasMany(e => e.Items)
            //     .WithOne(ea => ea.Event)
            //     .HasForeignKey(ei => ei.EventId);
        }
    }
}