using System;
using System.Collections.Generic;

namespace TrincaChu.Models
{
    public class Event
    {
        public long Id { get; set; }
        public DateTime WhenDateTime { get; set; }
        public string Description { get; set; }
        public string Observations { get; set; }
        public User[] Attendees { get; set; }
        public float TotalValue { get; set; }
        public float TotalCollected { get; set; }
        public List<Itens> ItensList { get; set; }
    }
}