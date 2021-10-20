using Microsoft.AspNetCore.Mvc;
using TrincaChu.Data;

namespace TrincaChu.Controllers
{
    [ApiController]
    [Route("v1/item")]
    public class ItemController : Controller
    {
        private DataContext _context;

        public ItemController(DataContext context)
        {
            _context = context;
        }
    }
}