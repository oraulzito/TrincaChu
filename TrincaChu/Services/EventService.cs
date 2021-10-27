using System;
using System.Collections.Generic;
using System.Linq;
using TrincaChu.Models;
using TrincaChu.Repository;

namespace TrincaChu.Services
{
    public class EventService
    {
        private readonly UnitOfWork _uow;

        public EventService(UnitOfWork uow)
        {
            _uow = uow;
        }

        private float PreventNaN(float val)
        {
            return float.IsNaN(val) ? 0 : val;
        }

        private float CalculatePercentageOfAlcoholicDrinksOnTotalPrice(long eventId)
        {
            var alcoholicItems =
                _uow.ItemRepository
                    .GetAll(item => item.EventId == eventId && item.Category == Category.AlcoholicDrink).ToList();

            var valueAlcoholicDrink = PreventNaN(alcoholicItems.Sum(item => item.Value * item.Quantity));

            var allItems = _uow.ItemRepository.GetAll(i => i.EventId == eventId);

            var valueAll = PreventNaN(allItems.Sum(i => i.Value * i.Quantity));

            var percentage = valueAlcoholicDrink / valueAll;

            return percentage;
        }

        public void UpdateCalculateValues(long eventId)
        {
            var percentageValue = CalculatePercentageOfAlcoholicDrinksOnTotalPrice(eventId);

            var valueTotal =
                PreventNaN(_uow.ItemRepository.GetAll(i => i.EventId == eventId).Sum(i => i.Value * i.Quantity));

            var attendeeTotal = _uow.EventAttendeesRepository.GetAll(ea => ea.EventId == eventId).Count();

            var dividedValue = valueTotal / attendeeTotal;

            var eventToBeUpdated = _uow.EventRepository.Get(i => i.Id == eventId);

            eventToBeUpdated.TotalValue = valueTotal;
            eventToBeUpdated.TotalPerPersonWithAlcoholicDrink = dividedValue + (dividedValue * percentageValue);
            eventToBeUpdated.TotalPerPersonWithoutAlcoholicDrink = dividedValue - (dividedValue * percentageValue);

            _uow.EventRepository.Update(eventToBeUpdated);

            _uow.Commit();
        }

        public void UpdateCollectedValue(long eventId, bool consumeAlcohol, bool add)
        {
            var eventToBeUpdated = _uow.EventRepository.Get(i => i.Id == eventId);

            if (add)
                eventToBeUpdated.TotalCollected += consumeAlcohol
                    ? eventToBeUpdated.TotalPerPersonWithAlcoholicDrink
                    : eventToBeUpdated.TotalPerPersonWithoutAlcoholicDrink;
            else
                eventToBeUpdated.TotalCollected -= consumeAlcohol
                    ? eventToBeUpdated.TotalPerPersonWithAlcoholicDrink
                    : eventToBeUpdated.TotalPerPersonWithoutAlcoholicDrink;

            _uow.EventRepository.Update(eventToBeUpdated);

            _uow.Commit();
        }

        public IList<long> GetEventAdminIds(long eventId)
        {
            return _uow.EventAttendeesRepository.GetAll()
                .Join(
                    _uow.EventRepository.GetAll(),
                    ea => ea.EventId,
                    e => e.Id,
                    (eaJoin, eJoin) => new { eaJoin, eJoin })
                .Where(u => u.eaJoin.Admin && u.eaJoin.EventId == eventId)
                .Select(ru => ru.eaJoin.AttendeeId)
                .Distinct()
                .ToList();
        }

        public int GetCountAttendees(long eventId)
        {
            return _uow.EventAttendeesRepository
                .GetAll(ea => ea.EventId == eventId).Count();
        }
    }
}