using TrincaChu.Data;

namespace TrincaChu.Services
{
    public class ItemService
    {
        private static DataContext _context;

        public ItemService(DataContext context)
        {
            _context = context;
        }
    }
}