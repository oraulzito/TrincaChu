namespace TrincaChu.Models
{
    public class EventAttendees
    {
        public long EventId { get; set; }
        public Event Event { get; set; }
        public long AttendeeId { get; set; }
        public Attendee Attendee { get; set; }
    }
}