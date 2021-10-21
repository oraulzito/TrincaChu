using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TrincaChu.Models
{
    public class Event
    {
        [Key] public long Id { get; set; }

        public DateTime WhenWillHappen { get; set; }
        public string Description { get; set; }
        public string Observations { get; set; }
        public float TotalValue { get; set; }
        public float TotalCollected { get; set; }

        public ICollection<EventAttendees> Attendees { get; }
        public ICollection<EventItens> Itens { get; }
    }
}