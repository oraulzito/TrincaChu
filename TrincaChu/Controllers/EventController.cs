using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrincaChu.Data;
using TrincaChu.Models;

namespace TrincaChu.Controllers
{
    [ApiController]
    [Route("v1/event")]
    [Authorize]
    public class EventController : Controller
    {
        private readonly DataContext _context;

        public EventController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<ICollection<Event>> Get()
        {
            try
            {
                return _context.Event.ToList();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Event> Get(long id)
        {
            try
            {
                return _context.Event.FirstOrDefault(ea => ea.Id == id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("myEvents")]
        public ActionResult<ICollection<EventAttendees>> GetMyEvents()
        {
            try
            {
                // return _context.Event.Join(
                //             eventAttendees,
                //             
                //         );
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Event ev)
        {
            try
            {
                _context.Event.Add(ev);

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Event ev)
        {
            try
            {
                var eventFirstOrDefaultAdmin = _context.EventAttendees.FirstOrDefault(
                    a => ClaimTypes.NameIdentifier.Equals(a.AttendeeId.ToString()) && a.Admin);

                if (eventFirstOrDefaultAdmin != null)
                {
                    var eventFirstOrDefault = _context.Event.FirstOrDefault(e => e.Id == id);

                    if (eventFirstOrDefault != null)
                    {
                        _context.Entry(ev).State = EntityState.Modified;

                        await _context.SaveChangesAsync();

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

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var attendeeAdmin = _context.EventAttendees.FirstOrDefault(
                    a => ClaimTypes.NameIdentifier.Equals(a.AttendeeId.ToString()) && a.Admin);

                if (attendeeAdmin != null)
                {
                    var eventFirstOrDefault = _context.Event.FirstOrDefault(e => e.Id == id);

                    if (eventFirstOrDefault != null)
                    {
                        _context.Event.Remove(eventFirstOrDefault);

                        await _context.SaveChangesAsync();

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
    }
}