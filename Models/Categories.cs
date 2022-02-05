using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clothing_Management.Models
{
    public class Categories
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
