using System.Data.Entity;
using Microsoft.EntityFrameworkCore;
using TrincaChu.Models;
using DbContext = Microsoft.EntityFrameworkCore.DbContext;

namespace TrincaChu.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public Microsoft.EntityFrameworkCore.DbSet<User> User { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<Attendee> Attendee { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<Item> Item { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<Event> Event { get; set; }
    }
}