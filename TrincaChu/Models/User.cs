using System.ComponentModel.DataAnnotations;

namespace TrincaChu.Models
{
    public class User
    {
        [Key] public long Id { get; set; }
        [Required] public string Name { get; set; }
        public string LastName { get; set; }
        [Required] [EmailAddress] public string Email { get; set; }
        [Required] public string Password { get; set; }
    }
}