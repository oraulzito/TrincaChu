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
    [Authorize]
    [Route("v1/eventItens")]
    public class EventItensController : Controller
    {
        private readonly DataContext _context;

        public EventItensController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Post([FromBody] EventItens eventItens)
        {
            try
            {
                _context.EventItens.Add(eventItens);

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var attendeeAdmin = _context.EventAttendees.FirstOrDefault(
                    a => (ClaimTypes.NameIdentifier.Equals(a.AttendeeId.ToString()) && a.Admin));

                var itemFirstOrDefault = _context.EventItens.FirstOrDefault(
                    ei => ei.ItemId == id &&
                          (ClaimTypes.NameIdentifier.Equals(ei.Item.CreatorId.ToString()) ||
                           ei.Event.Attendees.Contains(attendeeAdmin))
                );

                if (itemFirstOrDefault != null)
                {
                    _context.EventItens.Remove(itemFirstOrDefault);

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
    }
}