using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using TrincaChu.Models;
using TrincaChu.Repository;
using TrincaChu.Services;

namespace TrincaChu.Controllers
{
    [ApiController]
    [Route("v1/user")]
    [Authorize]
    public class UserController : Controller
    {
        private readonly AuthenticatorService _authenticatorService;
        private readonly UnitOfWork _uow;
        private readonly UserService _userService;

        public UserController(
            UnitOfWork uow,
            UserService userService,
            AuthenticatorService authenticatorService
        )
        {
            _uow = uow;
            _authenticatorService = authenticatorService;
        }

        [HttpGet("profile")]
        public ActionResult<User> Profile()
        {
            try
            {
                var user = _uow.UserRepository.Get(u =>
                    u.Id == long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)));
                return new OkObjectResult(
                    new
                    {
                        id = user.Id,
                        name = user.Name,
                        lastName = user.LastName,
                        email = user.Email,
                    });
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(new { error = ex.Message });
            }
        }

        [HttpGet("checkEmail")]
        public ActionResult<bool> Profile(string email)
        {
            try
            {
                var user = _uow.UserRepository.Get(u =>
                    u.Email == email);
                return user != null ;
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(new { error = ex.Message });
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Post([FromBody] User user)
        {
            try
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                _uow.UserRepository.Add(user);
                
                _uow.Commit();

                _uow.Dispose();

                return CreatedAtAction("Profile", new { id = user.Id }, user);
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
                var userToBeUpdated = _uow.UserRepository.Get(u =>
                    u.Id == long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)));

                if (userToBeUpdated != null)
                {
                    _uow.UserRepository.Detach(userToBeUpdated);
                    if (_authenticatorService.CheckPassword(user.Password, userToBeUpdated))
                    {
                        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                        
                        _uow.UserRepository.Update(user);
                        
                        _uow.Commit();
                        
                        _uow.Dispose();

                        return NoContent();
                    }
                }

                return BadRequest("You don't have the permission to do this!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        ///     Create an event
        /// </summary>
        /// <remarks>
        ///     Sample request:
        ///     POST /updatePassword
        ///     {
        ///     "oldPassword": "string",
        ///     "newPassword": "string"
        ///     }
        /// </remarks>
        [HttpPut("updatePassword")]
        public async Task<ActionResult> Put(JObject passwords)
        {
            try
            {
                var userToBeUpdated = _uow.UserRepository.Get(u =>
                    u.Id == long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)));

                if (userToBeUpdated != null)
                    if (_authenticatorService.CheckPassword(passwords["oldPassword"].ToString(), userToBeUpdated))
                    {
                        userToBeUpdated.Password = BCrypt.Net.BCrypt.HashPassword(passwords["newPassword"].ToString());
                        
                        _uow.UserRepository.Update(userToBeUpdated);
                        
                        _uow.Commit();
                        
                        _uow.Dispose();

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
                var userToBeDeleted = _uow.UserRepository.Get(u =>
                    u.Id == long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)));

                _uow.UserRepository.Delete(userToBeDeleted);

                _uow.Commit();
                
                _uow.Dispose();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        ///     Create an event
        /// </summary>
        /// <remarks>
        ///     Sample request:
        ///     POST /login
        ///     {
        ///     "email": "string",
        ///     "password": "string"
        ///     }
        /// </remarks>
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult> Login(JObject credentials)
        {
            try
            {
                var user = _uow.UserRepository.Get(u => u.Email == credentials["email"].ToString());

                if (user != null)
                {
                    if (_authenticatorService.CheckPassword(credentials["password"].ToString(), user))
                        return new OkObjectResult(new { token = _authenticatorService.GenerateToken(user) });
                    return BadRequest("Wrong Password");
                }

                return BadRequest("User not found");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}