using Microsoft.AspNetCore.Mvc;
using TrincaChu.Data;

namespace TrincaChu.Controllers
{
    [ApiController]
    [Route("v1/user")]
    public class UserController : Controller
    {
        private DataContext _context;
        
        public UserController(DataContext context)
        {
            _context = context;
        }
    }
}