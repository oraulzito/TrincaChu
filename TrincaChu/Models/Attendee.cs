using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TrincaChu.Models
{
    public class Attendee : User
    {
        public bool Admin { get; set; }
        public bool Confirmed { get; set; }
        public ICollection<EventAttendees> Events { get; set; }
    }
}