using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clothing_Management.Dtos
{
    public class ProductDto
    {
        
        public string Name { get; set; }
        public double OriginPrice { get; set; }
        public double CostPrice { get; set; }
        public double Discount { get; set; }
        public double SalePrice { get; set; }

        public IFormFile Image { get; set; }
        public string ImageDisplay { get; set; }
        public string QrCodeUrl { get; set; }
        public string Size { get; set; }
        public int Quantity { get; set; }
        public int CategoriesId { get; set; }
    }
}
