// using System;

using System;
using System.Collections.Generic;
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
    [Route("v1/item")]
    [Authorize]
    public class ItemController : Controller
    {
        private readonly EventService _eventService;
        private readonly ItemService _itemService;
        private readonly UnitOfWork _uow;

        public ItemController(
            UnitOfWork uow,
            ItemService itemService,
            EventService eventService
        )
        {
            _uow = uow;
            _itemService = itemService;
            _eventService = eventService;
        }


        [HttpGet("{id}")]
        public ActionResult<ICollection<EventAttendees>> GetItem(long id)
        {
            try
            {
                var item = _uow.ItemRepository
                    .GetAll(ea => ea.Id == id);

                return Ok(item);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(new { error = ex.Message });
            }
        }

        [HttpGet("event/{id}")]
        public ActionResult<ICollection<EventAttendees>> GetEventItems(long id)
        {
            try
            {
                var eventItems = _uow.ItemRepository
                    .GetAll(ea => ea.EventId == id);

                return Ok(eventItems);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(new { error = ex.Message });
            }
        }

        /// <summary>
        ///     Add a item to the event
        /// </summary>
        /// <remarks>
        ///     Sample request:
        ///     POST /updatePassword
        ///     {
        ///         "name": "string",
        ///         "value": 0,
        ///         "quantity": 0,
        ///         "eventId": 0,
        ///         "category": 0,
        ///     }
        /// </remarks>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] JObject jObject)
        {
            try
            {
                var item = new Item();
                
                item.Name = jObject["name"].ToString();
                item.Value = float.Parse(jObject["value"].ToString());
                item.Quantity = Convert.ToInt32(jObject["quantity"].ToString());
                item.EventId = long.Parse(jObject["eventId"].ToString());
                item.Event = _uow.EventRepository.Get(e => e.Id == long.Parse(jObject["eventId"].ToString()));
                item.Category = (Category)long.Parse(jObject["category"].ToString());

                _uow.ItemRepository.Add(item);

                _uow.Commit();

                _eventService.UpdateCalculateValues(item.EventId);

                _uow.Dispose();

                return NoContent();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(new { message = ex.Message });
            }
        }

        public object Object { get; set; }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Item item)
        {
            try
            {
                _uow.ItemRepository.Update(item);

                _uow.Commit();

                _eventService.UpdateCalculateValues(item.EventId);

                _uow.Dispose();

                return NoContent();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var item = _uow.ItemRepository.Get(i => i.Id == id);

                _uow.ItemRepository.Delete(item);

                _uow.Commit();

                _eventService.UpdateCalculateValues(item.EventId);

                _uow.Dispose();

                return NoContent();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(new { message = ex.Message });
            }
        }
    }
}