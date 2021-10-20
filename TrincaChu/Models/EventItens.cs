namespace TrincaChu.Models
{
    public class EventItens
    {
        public long EventId { get; set; }
        public Event Event { get; set; }
        public long ItemId { get; set; }
        public Item Item { get; set; }
    }
}