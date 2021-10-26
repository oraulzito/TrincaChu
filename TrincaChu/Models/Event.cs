using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace TrincaChu.Models
{
    public class Event
    {
        public Event()
        {
            Attendees = new HashSet<EventAttendees>();
            Itens = new HashSet<Item>();
        }


        [Key] public long Id { get; set; }

        public DateTime WhenWillHappen { get; set; }
        public DateTime ConfirmPresenceUntilDateTime { get; set; }
        public string Description { get; set; }
        public string Observations { get; set; }
        public string WhereItWillHappen { get; set; }
        public float TotalValue { get; set; }
        public float TotalCollected { get; set; }
        public float TotalPerPersonWithAlcoholicDrink { get; set; }
        public float TotalPerPersonWithoutAlcoholicDrink { get; set; }

        public ICollection<EventAttendees> Attendees { get; private set; }
        public ICollection<Item> Itens { get; private set; }
    }
}