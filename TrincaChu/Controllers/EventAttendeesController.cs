// using System;

using System;
using System.Collections.Generic;
using System.Linq;
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
    [Route("v1/attendees")]
    [Authorize]
    public class EventAttendeesController : Controller
    {
        private readonly EventService _eventService;
        private readonly ItemService _itemService;
        private readonly UnitOfWork _uow;

        public EventAttendeesController(
            UnitOfWork uow,
            ItemService itemService,
            EventService eventService
        )
        {
            _uow = uow;
            _itemService = itemService;
            _eventService = eventService;
        }

        [HttpGet("{eventId}")]
        public ActionResult<ICollection<User>> GetEventAttendees(long eventId)
        {
            try
            {
                var eventAttendees = _uow.EventAttendeesRepository
                    .GetAll(ea => ea.EventId == eventId)
                    .Join(
                        _uow.UserRepository.GetAll(),
                        ea => ea.AttendeeId,
                        u => u.Id,
                        (eaJoin, uJoin) => new
                        {
                            name = uJoin.Name,
                            lastName = uJoin.LastName,
                            email = uJoin.Email,
                            id = uJoin.Name,
                            paid = eaJoin.Paid,
                        }
                    );

                return Ok(eventAttendees);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(new { error = ex.Message });
            }
        }

        /// <summary>
        ///     Add an attendee to the event
        /// </summary>
        /// <remarks>
        ///     Sample request:
        ///     POST /updatePassword
        ///     {
        ///     "attendeeId": "string",
        ///     "eventId": "string"
        ///     "admin": boolean,
        ///     "consumeAlcoholicDrink": boolean,
        ///     "paid": boolean,
        ///     }
        /// </remarks>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] JObject jObject)
        {
            try
            {
                var eventAttendee = new EventAttendees();

                eventAttendee.Attendee = _uow.UserRepository.Get(u => u.Id == long.Parse(jObject["attendeeId"].ToString()));
                eventAttendee.Event = _uow.EventRepository.Get(e => e.Id == long.Parse(jObject["eventId"].ToString()));
                eventAttendee.EventId = long.Parse(jObject["attendeeId"].ToString());
                eventAttendee.AttendeeId = long.Parse(jObject["eventId"].ToString());
                eventAttendee.Admin = Boolean.Parse(jObject["admin"].ToString());
                eventAttendee.ConsumeAlcoholicDrink = Boolean.Parse(jObject["consumeAlcoholicDrink"].ToString());
                eventAttendee.Paid = Boolean.Parse(jObject["paid"].ToString());
                
                _uow.EventAttendeesRepository.Add(eventAttendee);

                _uow.Commit();

                _eventService.UpdateCalculateValues(eventAttendee.EventId);
                
                _uow.Dispose();
                
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        ///     Update the drink status of attendee
        /// </summary>
        /// <remarks>
        ///     Sample request:
        ///     POST /updatePassword
        ///     {
        ///     "eventId": "string"
        ///     "admin": boolean,
        ///     "consumeAlcoholicDrink": boolean,
        ///     "paid": boolean,
        ///     }
        /// </remarks>
        [HttpPut("willDrink")]
        public async Task<ActionResult> UpdateAlcoholicStatus([FromBody] JObject jObject)
        {
            try
            {
                var eventAttendeeToBeUpdated = _uow.EventAttendeesRepository.Get(e =>
                    e.EventId == long.Parse(jObject["eventId"].ToString()) &&
                    e.AttendeeId == long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier))
                );

                eventAttendeeToBeUpdated.ConsumeAlcoholicDrink =
                    Boolean.Parse(jObject["consumeAlcoholicDrink"].ToString());

                _uow.EventAttendeesRepository.Update(eventAttendeeToBeUpdated);

                _uow.Commit();

                _eventService.UpdateCalculateValues(eventAttendeeToBeUpdated.EventId);
                
                _uow.Dispose();
                
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        ///     Update pay status of attendee
        /// </summary>
        /// <remarks>
        ///     Sample request:
        ///     POST /updatePassword
        ///     {
        ///     "eventId": "string"
        ///     "attendeeId": "string"
        ///     }
        /// </remarks>
        [HttpPut("pay")]
        public async Task<ActionResult> Pay([FromBody] JObject jObject)
        {
            try
            {
                var eventAttendeeToBeUpdated = _uow.EventAttendeesRepository.Get(e =>
                    e.EventId == long.Parse(jObject["eventId"].ToString()) &&
                    e.AttendeeId == long.Parse(jObject["attendeeId"].ToString())
                );

                _eventService.UpdateCollectedValue(eventAttendeeToBeUpdated.EventId,
                    eventAttendeeToBeUpdated.ConsumeAlcoholicDrink, true);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        ///     Update the admin status of attendee
        /// </summary>
        /// <remarks>
        ///     Sample request:
        ///     POST /updatePassword
        ///     {
        ///     "attendeeId": "string",
        ///     "eventId": "string"
        ///     "admin": boolean,
        ///     }
        /// </remarks>
        [HttpPut("isAdmin")]
        public async Task<ActionResult> IsAdmin([FromBody] JObject jObject)
        {
            try
            {
                var eventAttendeeResquestingIsAdmin = _uow.EventAttendeesRepository.Get(e =>
                    e.EventId == long.Parse(jObject["eventId"].ToString()) &&
                    e.AttendeeId == long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier))
                    && e.Admin
                );

                if (eventAttendeeResquestingIsAdmin != null)
                {
                    var eventAttendeeToBeUpdated = _uow.EventAttendeesRepository.Get(e =>
                        e.EventId == long.Parse(jObject["eventId"].ToString()) &&
                        e.AttendeeId == long.Parse(jObject["attendeeId"].ToString())
                    );

                    eventAttendeeToBeUpdated.Admin = Boolean.Parse(jObject["admin"].ToString());

                    _uow.EventAttendeesRepository.Update(eventAttendeeToBeUpdated);

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

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var attendee = _uow.EventAttendeesRepository.Get(
                    a =>
                        (a.AttendeeId == long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)) && a.Admin) ||
                        a.AttendeeId == long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)));

                _uow.EventAttendeesRepository.Delete(attendee);

                _uow.Commit();

                _eventService.UpdateCollectedValue(attendee.EventId, attendee.ConsumeAlcoholicDrink, false);

                _eventService.UpdateCalculateValues(attendee.EventId);

                _uow.Dispose();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}