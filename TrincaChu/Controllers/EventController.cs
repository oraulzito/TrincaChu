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
    [Route("v1/event")]
    [Authorize]
    public class EventController : Controller
    {
        private readonly EventService _eventController;
        private readonly UnitOfWork _uow;

        public EventController(
            UnitOfWork uow,
            EventService eventService
        )
        {
            _uow = uow;
            _eventController = eventService;
        }

        [HttpGet]
        public ActionResult<ICollection<Event>> GetAll()
        {
            try
            {
                return new OkObjectResult(_uow.EventRepository.GetAll().ToList());
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(new { error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public ActionResult<ICollection<Event>> Get(long id)
        {
            try
            {
                return new OkObjectResult(_uow.EventRepository.Get(e => e.Id == id));
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(new { error = ex.Message });
            }
        }

        [HttpGet("myEvents")]
        public ActionResult<ICollection<EventAttendees>> GetMyEvents()
        {
            try
            {
                var atendeeAdmin = _uow.EventAttendeesRepository.Get(u => u.Admin);
                var attendeesCount = _uow.EventAttendeesRepository
                    .GetAll(ea => ea.AttendeeId == long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier))).Count();
                var myEvents = _uow.EventAttendeesRepository
                    .GetAll(ea =>
                        ea.AttendeeId == long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)) &&
                        ea.Admin)
                    .Join(
                        _uow.EventRepository.GetAll(),
                        ea => ea.EventId,
                        e => e.Id,
                        (eaJoin, eJoin) => new
                        {
                            id = eJoin.Id,
                            description = eJoin.Description,
                            whenWillHappen = eJoin.WhenWillHappen,
                            confirmPresenceUntilDateTime = eJoin.ConfirmPresenceUntilDateTime,
                            observations = eJoin.Observations,
                            totalValue = eJoin.TotalValue,
                            totalCollected = eJoin.TotalCollected,
                            totalPerPersonWithAlcoholicDrink = eJoin.TotalPerPersonWithAlcoholicDrink,
                            totalPerPersonWithoutAlcoholicDrink = eJoin.TotalPerPersonWithoutAlcoholicDrink,
                            atendeeAdmin.Attendee,
                            attendeeTotal = attendeesCount
                        }
                    );

                return Ok(myEvents);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(new { error = ex.Message });
            }
        }

        [HttpGet("futureEvents")]
        public ActionResult<ICollection<EventAttendees>> FutureEvents()
        {
            try
            {
                var atendeeAdmin = _uow.EventAttendeesRepository.Get(u => u.Admin);
                var attendeesCount = _uow.EventAttendeesRepository
                    .GetAll(ea => ea.AttendeeId == long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier))).Count();
                var myEvents = _uow.EventAttendeesRepository
                    .GetAll(ea => ea.Event.ConfirmPresenceUntilDateTime.CompareTo(DateTime.Now) > 0)
                    .Join(
                        _uow.EventRepository.GetAll(),
                        ea => ea.EventId,
                        e => e.Id,
                        (eaJoin, eJoin) => new
                        {
                            id = eJoin.Id,
                            description = eJoin.Description,
                            whenWillHappen = eJoin.WhenWillHappen,
                            confirmPresenceUntilDateTime = eJoin.ConfirmPresenceUntilDateTime,
                            observations = eJoin.Observations,
                            totalValue = eJoin.TotalValue,
                            totalCollected = eJoin.TotalCollected,
                            totalPerPersonWithAlcoholicDrink = eJoin.TotalPerPersonWithAlcoholicDrink,
                            totalPerPersonWithoutAlcoholicDrink = eJoin.TotalPerPersonWithoutAlcoholicDrink,
                            atendeeAdmin.Attendee,
                            attendeeTotal = attendeesCount
                        }
                    );

                return Ok(myEvents);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(new { error = ex.Message });
            }
        }

        [HttpGet("pastEvents")]
        public ActionResult<ICollection<EventAttendees>> PastEvents()
        {
            try
            {
                var atendeeAdmin = _uow.EventAttendeesRepository.Get(u => u.Admin);
                var attendeesCount = _uow.EventAttendeesRepository
                    .GetAll(ea => ea.AttendeeId == long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier))).Count();
                var myEvents = _uow.EventAttendeesRepository
                    .GetAll(ea => ea.Event.ConfirmPresenceUntilDateTime.CompareTo(DateTime.Now) < 0)
                    .Join(
                        _uow.EventRepository.GetAll(),
                        ea => ea.EventId,
                        e => e.Id,
                        (eaJoin, eJoin) => new
                        {
                            id = eJoin.Id,
                            description = eJoin.Description,
                            whenWillHappen = eJoin.WhenWillHappen,
                            confirmPresenceUntilDateTime = eJoin.ConfirmPresenceUntilDateTime,
                            observations = eJoin.Observations,
                            totalValue = eJoin.TotalValue,
                            totalCollected = eJoin.TotalCollected,
                            totalPerPersonWithAlcoholicDrink = eJoin.TotalPerPersonWithAlcoholicDrink,
                            totalPerPersonWithoutAlcoholicDrink = eJoin.TotalPerPersonWithoutAlcoholicDrink,
                            atendeeAdmin.Attendee,
                            attendeeTotal = attendeesCount
                        }
                    );

                return Ok(myEvents);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(new { error = ex.Message });
            }
        }

        [HttpGet("eventsIWillAttend")]
        public ActionResult<ICollection<EventAttendees>> EventsIWillAttend()
        {
            try
            {
                var atendeeAdmin = _uow.EventAttendeesRepository.Get(u => u.Admin);
                var attendeesCount = _uow.EventAttendeesRepository
                    .GetAll(ea => ea.AttendeeId == long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier))).Count();
                var myEvents = _uow.EventAttendeesRepository
                    .GetAll(ea =>
                        ea.AttendeeId == long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)))
                    .Join(
                        _uow.EventRepository.GetAll(),
                        ea => ea.EventId,
                        e => e.Id,
                        (eaJoin, eJoin) => new
                        {
                            id = eJoin.Id,
                            description = eJoin.Description,
                            whenWillHappen = eJoin.WhenWillHappen,
                            confirmPresenceUntilDateTime = eJoin.ConfirmPresenceUntilDateTime,
                            observations = eJoin.Observations,
                            totalValue = eJoin.TotalValue,
                            totalCollected = eJoin.TotalCollected,
                            totalPerPersonWithAlcoholicDrink = eJoin.TotalPerPersonWithAlcoholicDrink,
                            totalPerPersonWithoutAlcoholicDrink = eJoin.TotalPerPersonWithoutAlcoholicDrink,
                            atendeeAdmin.Attendee,
                            attendeeTotal = attendeesCount
                        }
                    );

                return Ok(myEvents);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(new { error = ex.Message });
            }
        }

        /// <summary>
        ///     Create an event
        /// </summary>
        /// <remarks>
        ///     Sample request:
        ///     POST /
        ///     {
        ///     "description": "string",
        ///     "observations": "string",
        ///     "whenWillHappen": "DateTime",
        ///     "confirmPresenceUntilDateTime": "DateTime",
        ///     "willYouConsumeAlcoholicDrink": bool
        ///     }
        /// </remarks>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] JObject jObject)
        {
            try
            {
                var eventToBeAdded = new Event
                {
                    Description = jObject["description"].ToString(),
                    WhenWillHappen = DateTime.Parse(jObject["whenWillHappen"].ToString()),
                    ConfirmPresenceUntilDateTime = DateTime.Parse(jObject["confirmPresenceUntilDateTime"].ToString()),
                    Observations = jObject["observations"].ToString(),
                    TotalValue = 0,
                    TotalCollected = 0,
                    TotalPerPersonWithAlcoholicDrink = 0,
                    TotalPerPersonWithoutAlcoholicDrink = 0
                };

                _uow.EventRepository.Add(eventToBeAdded);

                var attendee = _uow.UserRepository.Get(u =>
                    u.Id == long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)));

                var eventAttendeeCreator = new EventAttendees
                {
                    Event = eventToBeAdded,
                    Attendee = attendee,
                    Admin = true,
                    ConsumeAlcoholicDrink = bool.Parse(jObject["willYouConsumeAlcoholicDrink"].ToString())
                };

                _uow.EventAttendeesRepository.Add(eventAttendeeCreator);

                _uow.Commit();

                _uow.Dispose();

                return CreatedAtAction("Get", new { id = eventToBeAdded.Id }, eventToBeAdded);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(new { error = ex.Message });
            }
        }

        /// <summary>
        ///     Create an event
        /// </summary>
        /// <remarks>
        ///     Sample request:
        ///     POST /
        ///     {
        ///     "description": "string",
        ///     "observations": "string",
        ///     "whenWillHappen": "DateTime",
        ///     "confirmPresenceUntilDateTime": "DateTime",
        ///     }
        /// </remarks>
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] JObject jObject)
        {
            try
            {
                var eventAdmin = _uow.EventAttendeesRepository
                    .Get(ea =>
                        ea.AttendeeId == long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)) &&
                        ea.EventId == id && ea.Admin
                    );


                if (eventAdmin != null)
                {
                    var eventToBeAdded = new Event
                    {
                        Description = jObject["description"].ToString(),
                        WhenWillHappen = DateTime.Parse(jObject["whenWillHappen"].ToString()),
                        ConfirmPresenceUntilDateTime =
                            DateTime.Parse(jObject["confirmPresenceUntilDateTime"].ToString()),
                        Observations = jObject["observations"].ToString(),
                        TotalValue = eventAdmin.Event.TotalValue,
                        TotalCollected = eventAdmin.Event.TotalCollected,
                        TotalPerPersonWithAlcoholicDrink = eventAdmin.Event.TotalPerPersonWithAlcoholicDrink,
                        TotalPerPersonWithoutAlcoholicDrink = eventAdmin.Event.TotalPerPersonWithoutAlcoholicDrink
                    };

                    eventAdmin.Event = eventToBeAdded;

                    _uow.EventRepository.Update(eventAdmin.Event);

                    _uow.Commit();

                    _uow.Dispose();

                    return NoContent();
                }

                return new BadRequestObjectResult(new { error = "You don't have the permission to do this!" });
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(new { error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var eventAdmin = _uow.EventAttendeesRepository
                    .Get(ea =>
                        ea.AttendeeId == long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)) &&
                        ea.EventId == id && ea.Admin
                    );

                if (eventAdmin != null)
                {
                    _uow.EventRepository.Delete(eventAdmin.Event);

                    _uow.Commit();

                    _uow.Dispose();

                    return NoContent();
                }

                return new BadRequestObjectResult(new { error = "You don't have the permission to do this!" });
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(new { error = ex.Message });
            }
        }
    }
}