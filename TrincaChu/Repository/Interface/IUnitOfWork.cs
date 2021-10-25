using System.Threading.Tasks;
using TrincaChu.Models;

namespace TrincaChu.Repository
{
    public interface IUnitOfWork
    {
        IRepository<User> UserRepository { get; }
        IRepository<Item> ItemRepository { get; }
        IRepository<EventAttendees> EventAttendeesRepository { get; }
        IRepository<Event> EventRepository { get; }

        void Commit();
    }
}