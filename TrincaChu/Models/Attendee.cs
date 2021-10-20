using System.ComponentModel.DataAnnotations;

namespace TrincaChu.Models
{
    public class Attendee : User
    {
        private bool Admin { get; set; }
        private bool Confirmed { get; set; }
    }
}