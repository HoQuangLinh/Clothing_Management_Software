using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clothing_Management.Models
{
    public class Order
    {
        public string Id { get; set; }
        public DateTime DateOrder { get; set; }
        public float SubTotal { get; set; }
        public float Discount { get; set; }
        public float OrderTotal { get; set; }
        public string QrCodeUrl { get; set; }
        public string Status { get; set; }
        public float TotalReturnPrice { get; set; }

        //User
        public string UserId { get; set; }
        public User User { get; set; }

        //Customer
        public string CustomerId { get; set; }
        public Customer Customer { get; set; }

        public ICollection<OrderDetail> OrderDetails { get; set; }
        public ICollection<ReturnOrder> ReturnOrders { get; set; }
    }
}
