using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clothing_Management.Models
{
    public class Customer
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public float Point { get; set; }
        public float Total { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}
