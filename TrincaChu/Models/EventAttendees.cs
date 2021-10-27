using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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

        [Required] [ForeignKey("Event")] public long EventId { get; set; }
        [JsonIgnore] public virtual Event Event { get; set; }

        [Required] [ForeignKey("User")] public long AttendeeId { get; set; }
        [JsonIgnore] public virtual User Attendee { get; set; }

        public bool Admin { get; set; }
        [Required] public bool ConsumeAlcoholicDrink { get; set; }
        [Required] public bool Paid { get; set; }
    }
}