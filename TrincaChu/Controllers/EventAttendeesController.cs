using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TrincaChu.Data;
using TrincaChu.Models;

namespace TrincaChu.Controllers
{
    [ApiController]
    [Route("v1/eventAttendees")]
    [Authorize]
    public class EventAttendeesController : Controller
    {
        private readonly DataContext _context;

        public EventAttendeesController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EventAttendees eventAttendees)
        {
            try
            {
                _context.EventAttendees.Add(eventAttendees);

                await _context.SaveChangesAsync();

                return NoContent();
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
                var attendee = _context.EventAttendees.FirstOrDefault(
                    a => (ClaimTypes.NameIdentifier.Equals(a.AttendeeId.ToString()) && a.Admin) ||
                         ClaimTypes.NameIdentifier.Equals(a.AttendeeId.ToString()));

                if (attendee != null)
                {
                    var attendeeFirstOrDefault = _context.Event.FirstOrDefault(e => e.Id == id);

                    if (attendeeFirstOrDefault != null)
                    {
                        _context.Event.Remove(attendeeFirstOrDefault);

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