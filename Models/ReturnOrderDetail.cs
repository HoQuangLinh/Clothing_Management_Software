using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clothing_Management.Models
{
    public class ReturnOrderDetail
    {
        public string Id { get; set; }
        public float ReturnQuantity { get; set; }
        public float OldQuantity { get; set; }

        //Order Detail
        public string OrderDetailId { get; set; }
        public OrderDetail OrderDetail { get; set; }
    }
}
