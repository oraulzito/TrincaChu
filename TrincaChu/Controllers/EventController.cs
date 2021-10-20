using Microsoft.AspNetCore.Mvc;
using TrincaChu.Data;

namespace TrincaChu.Controllers
{
    [ApiController]
    [Route("v1/event")]
    public class EventController : Controller
    {
        private DataContext _context;
        
        public EventController(DataContext context)
        {
            _context = context;
        }
    }
}