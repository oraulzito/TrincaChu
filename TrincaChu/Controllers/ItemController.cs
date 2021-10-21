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
    [Route("v1/item")]
    [Authorize]
    public class ItemController : Controller
    {
        private readonly DataContext _context;

        public ItemController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<ICollection<Item>> Get()
        {
            try
            {
                return _context.Item.Where(i => ClaimTypes.NameIdentifier.Equals(i.CreatorId.ToString())).ToList();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Item> Get(long id)
        {
            try
            {
                return _context.Item.FirstOrDefault(i =>
                    ClaimTypes.NameIdentifier.Equals(i.CreatorId.ToString()) && i.Id == id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Item item)
        {
            try
            {
                _context.Item.Add(item);

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Item item)
        {
            try
            {
                var i = _context.Item.FirstOrDefault(i =>
                    ClaimTypes.NameIdentifier.Equals(i.CreatorId.ToString()) && i.Id == id);

                if (i != null)
                {
                    _context.Entry(item).State = EntityState.Modified;
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

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var item = _context.Item.FirstOrDefault(i =>
                    ClaimTypes.NameIdentifier.Equals(i.CreatorId.ToString()) && i.Id == id);

                _context.Item.Remove(item);

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}