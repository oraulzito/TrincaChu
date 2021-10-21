using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrincaChu.Data;
using TrincaChu.Models;
using TrincaChu.Services;

namespace TrincaChu.Controllers
{
    [ApiController]
    [Route("v1/user")]
    [Authorize]
    public class UserController : Controller
    {
        private readonly DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;
        }

        // [HttpGet]        
        // public ActionResult<ICollection<User>> GetUsers()
        // {
        //     return _context.User.ToList();
        // }


        [HttpGet("profile")]
        public ActionResult<User> GetUser()
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Post([FromBody] User user)
        {
            try
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                _context.User.Add(user);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetUser", new { id = user.Id }, user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult> Put([FromBody] User user)
        {
            try
            {
                if (ClaimTypes.NameIdentifier.Equals(user.Id.ToString()))
                {
                    _context.Entry(user).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    return NoContent();
                }

                return BadRequest("You don't have the permission to do this!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> Delete()
        {
            try
            {
                var user = _context.User.FirstOrDefault(u => ClaimTypes.NameIdentifier.Equals(u.Id.ToString()));

                _context.User.Remove(user);

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult> Login(string email, string password)
        {
            try
            {
                var user = _context.User.FirstOrDefault(u => u.Email == email);

                if (user != null)
                {
                    if (BCrypt.Net.BCrypt.Verify(password, user.Password))
                        return Ok(AuthenticatorService.GenerateToken(user));
                    return BadRequest("Wrong password");
                }

                return BadRequest("User not found");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // TODO
        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            return BadRequest("in progress");
        }
    }
}