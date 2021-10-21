using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TrincaChu.Models
{
    public class Item
    {
        [Key] public long Id { get; set; }

        public string Name { get; set; }
        public float Value { get; set; }
        public int Quantity { get; set; }

        [ForeignKey("User")] public long CreatorId { get; set; }
    }
}