namespace TrincaChu.Models
{
    public class EventAttendees
    {
        public long EventId { get; set; }
        public Event Event { get; }
        public long AttendeeId { get; set; }
        public User Attendee { get; }

        public bool Admin { get; set; }
        public bool Confirmed { get; set; }
    }
}