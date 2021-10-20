using Microsoft.AspNetCore.Mvc;
using TrincaChu.Data;

namespace TrincaChu.Controllers
{
    [ApiController]
    [Route("v1/attendee")]
    public class AttendeeController : Controller
    {
        private DataContext _context;

        public AttendeeController(DataContext context)
        {
            _context = context;
        }
    }
}