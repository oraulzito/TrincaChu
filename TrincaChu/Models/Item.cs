using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TrincaChu.Models
{
    public class Item
    {
        public Item()
        {
            Event = new Event();
        }

        [Key] public long Id { get; set; }
       
        public string Name { get; set; }
        public float Value { get; set; }
        public int Quantity { get; set; }
        public long EventId { get; set; }
        public Category Category { get; set; }
        
        public virtual Event Event { get; set; }
    }

    public enum Category
    {
        Drink,
        AlcoholicDrink,
        Food
    }
}