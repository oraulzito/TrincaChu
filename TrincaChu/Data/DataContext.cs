﻿using System.Data.Entity;
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
        public Microsoft.EntityFrameworkCore.DbSet<EventAttendees> EventAttendees { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<EventItens> EventItens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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

            modelBuilder.Entity<EventItens>()
                .HasKey(bc => new { bc.EventId, bc.ItemId });
            modelBuilder.Entity<EventItens>()
                .HasOne(e => e.Event)
                .WithMany(ea => ea.Itens)
                .HasForeignKey(ei => ei.EventId);
            modelBuilder.Entity<EventItens>()
                .HasOne(a => a.Item)
                .WithMany(ea => ea.Events)
                .HasForeignKey(ai => ai.ItemId);
        }
    }
}