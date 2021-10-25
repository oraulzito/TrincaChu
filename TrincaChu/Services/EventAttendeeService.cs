using TrincaChu.Data;

namespace TrincaChu.Services
{
    public class EventAttendeeService
    {
        private static DataContext _context;

        public EventAttendeeService(DataContext context)
        {
            _context = context;
        }
    }
}