using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clothing_Management.Models
{
    public class OrderDetail
    {
        public string Id { get; set; }
        public float Quantity { get; set; }

        //Order
        public string OrderId { get; set; }
        public Order Order { get; set; }

        //Product
        public string ProductId { get; set; }
        public Product Product { get; set; }

        public ICollection<ReturnOrderDetail> ReturnOrderDetails { get; set; }
    }
}
