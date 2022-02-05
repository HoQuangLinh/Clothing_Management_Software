﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clothing_Management.Models
{
    public class Product
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public double OriginPrice { get; set; }
        public double CostPrice { get; set; }
        public double Discount { get; set; }
        public double SalePrice { get; set; }
        public string ImageDisplay { get; set; }
        public string QrCodeUrl { get; set; }
        public string Size { get; set; }
        public string Quantity { get; set; }

        //Categories
        public string CategoriesId { get; set; }
        public Categories Categories { get; set; }

        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
