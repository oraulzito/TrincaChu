using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace TrincaChu.Models
{
    public class User
    {
        public User()
        {
            Events = new HashSet<EventAttendees>();
        }

        [Key] public long Id { get; set; }
        
        [Required] public string Name { get; set; }
        public string LastName { get; set; }
        [Required] [EmailAddress] public string Email { get; set; }
        [Required] [DataType(DataType.Password)] public string Password { get; set; }
        
        [JsonIgnore]public virtual ICollection<EventAttendees> Events { get; set; }
    }
}