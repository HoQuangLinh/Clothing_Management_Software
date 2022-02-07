using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clothing_Management.Models
{
    public class User
    {
        public string Id { get; set; }
        public string Fullname { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string ImageUrl { get; set; }
        public string Position { get; set; }
        public DateTime Birthday { get; set; }

        public ICollection<Order> Orders { get; set; }
        public ICollection<ReturnOrder> ReturnOrders { get; set; }
    }
}
