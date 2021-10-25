using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TrincaChu.Data;
using TrincaChu.Models;

namespace TrincaChu.Repository
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly DataContext _context = null;
        private DbContextOptionsBuilder options;
        private bool disposed = false;

        private Repository<User> userRepository = null;
        private Repository<Item> itemRepository = null;
        private Repository<Event> eventRepository = null;
        private Repository<EventAttendees> eventAttendeesRepository = null;

        public UnitOfWork(DataContext context)
        {
            _context = context;
        }

        public IRepository<User> UserRepository
        {
            get
            {
                if (userRepository == null)
                {
                    userRepository = new Repository<User>(_context);
                }

                return userRepository;
            }
        }

        public IRepository<Item> ItemRepository
        {
            get
            {
                if (itemRepository == null)
                {
                    itemRepository = new Repository<Item>(_context);
                }

                return itemRepository;
            }
        }

        public IRepository<EventAttendees> EventAttendeesRepository
        {
            get
            {
                if (eventAttendeesRepository == null)
                {
                    eventAttendeesRepository = new Repository<EventAttendees>(_context);
                }

                return eventAttendeesRepository;
            }
        }

        public IRepository<Event> EventRepository
        {
            get
            {
                if (eventRepository == null)
                {
                    eventRepository = new Repository<Event>(_context);
                }

                return eventRepository;
            }
        }

        public void Commit()
        {
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}