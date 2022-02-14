using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Clothing_Management.Dtos;
using Clothing_Management.Helpers;
using Clothing_Management.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Clothing_Management.Controllers
{
    public class HomeController : Controller
    {
        //private readonly IList<Product> _products;
        private readonly ClothingManagementDBContext _context;
        private CloudinaryConfig _cloudinaryConfig;
        private readonly IndexViewModel _index;

        public HomeController(ClothingManagementDBContext context, CloudinaryConfig cloudinaryConfig)
        {
            _context = context;
            _cloudinaryConfig = cloudinaryConfig;
            _index = new IndexViewModel();
        }

        public ActionResult Index()
        {
            return View(_index);
        }
        
		[Route("/api/products")]
		[ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
		public async Task<ActionResult> Products()
		{
            var products = await _context.Products.ToListAsync();
			return new JsonResult(products);
		}

		[Route("/api/categories")]
		[ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
		public async Task<ActionResult> Categories()
		{
			var categories = await _context.Categories.ToListAsync();
			return new JsonResult(categories);
		}

        [Route("/api/products/new")]
        [HttpPost]
        public IActionResult NewProduct([FromForm]ProductDto productDto)
        {
            var image = productDto.Image;
            var uploadResult = new ImageUploadResult();

            //Upload file to Cloudinary Server Using File ReadStream
            if (image.Length > 0)
            {
                using (var stream = image.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(image.Name, stream),

                    };

                    uploadResult = _cloudinaryConfig.Cloudinary.Upload(uploadParams);
                }
            }
            //Get Url from Cloudinary and Store to staffDto object 
            productDto.ImageDisplay = uploadResult.Url?.ToString();

            var product = new Product()
            {
                Name = productDto.Name,
                OriginPrice = productDto.OriginPrice,
                CostPrice = productDto.CostPrice,
                SalePrice = productDto.SalePrice,
                Discount = productDto.Discount,
                ImageDisplay = productDto.ImageDisplay,
                Size = productDto.Size,
                Quantity = productDto.Quantity,
                CategoriesId = productDto.CategoriesId,
            };

            _context.Products.Add(product);
            _context.SaveChanges();

            return Ok();
        }

        [Route("/api/products/update")]
        [HttpPost]
        public IActionResult UpdateProduct([FromForm]ProductDto productDto)
        {
            var product = _context.Products.SingleOrDefault(x => x.Id == productDto.Id);

            if (product == null)
                return Ok("Update failed");

            if (productDto.Image != null)
            {
                var image = productDto.Image;
                var uploadResult = new ImageUploadResult();

                //Upload file to Cloudinary Server Using File ReadStream
                if (image.Length > 0)
                {
                    using (var stream = image.OpenReadStream())
                    {
                        var uploadParams = new ImageUploadParams()
                        {
                            File = new FileDescription(image.Name, stream),

                        };

                        uploadResult = _cloudinaryConfig.Cloudinary.Upload(uploadParams);
                    }
                }
                //Get Url from Cloudinary and Store to staffDto object 
                productDto.ImageDisplay = uploadResult.Url?.ToString();
                product.ImageDisplay = productDto.ImageDisplay;
            }

            //update product
            product.Name = productDto.Name;
            product.OriginPrice = productDto.OriginPrice;
            product.CostPrice = productDto.CostPrice;
            product.SalePrice = productDto.SalePrice;
            product.Discount = productDto.Discount;
            product.Size = productDto.Size;
            product.Quantity = productDto.Quantity;
            product.CategoriesId = productDto.CategoriesId;
            
            _context.SaveChanges();

            return Ok("Update success");
        }

        public class IndexViewModel
        {
            
        }
    }
}
