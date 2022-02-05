using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clothing_Management.Models
{
    public class ReturnOrder
    {
        public string Id { get; set; }
        public float ReturnTempPrice { get; set; }
        public float ReturnFee { get; set; }
        public float TotalReturnPrice { get; set; }
        public string QrCodeUrl { get; set; }
        public DateTime DateReturn { get; set; }

        //Order
        public string OrderId { get; set; }
        public Order Order { get; set; }

        //User
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
