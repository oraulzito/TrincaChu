using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TrincaChu.Models
{
    public class Item
    {
        [Key] public long Id { get; set; }
        public string Name { get; set; }
        public float Value { get; set; }
        public int Quantity { get; set; }
        public ICollection<EventItens> Events { get; set; }
    }
}