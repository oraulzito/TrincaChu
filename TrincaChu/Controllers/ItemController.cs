// using System;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        public ActionResult<ICollection<EventAttendees>> GetEventItens(long id)
        {
            try
            {
                var eventItens = _uow.ItemRepository
                    .GetAll(ea => ea.EventId == id);

                return Ok(eventItens);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(new { error = ex.Message });
            }
        }


        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Item item)
        {
            try
            {
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