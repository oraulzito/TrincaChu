using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace TrincaChu.Models
{
    public class EventAttendees
    {
        public EventAttendees()
        {
            Event = new Event();
            Attendee = new User();
        }

        [Required] public long EventId { get; set; }
        [JsonIgnore] public virtual Event Event { get; set; }

        [Required] public long AttendeeId { get; set; }
        [JsonIgnore] public virtual User Attendee { get; set; }
        
        public bool Admin { get; set; }
        [Required] public bool ConsumeAlcoholicDrink { get; set; }
        [Required] public bool Paid { get; set; }
    }
}