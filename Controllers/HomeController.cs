using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Clothing_Management.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Clothing_Management.Controllers
{
	public class HomeController : Controller
	{
		//private readonly IList<Product> _products;
		private readonly ClothingManagementDBContext _context;
		private readonly IndexViewModel _index;

		public HomeController(ClothingManagementDBContext context)
        {
			_context = context;
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
			_index.Products = await _context.Products.ToListAsync();
			return new JsonResult(_index.Products);
		}

		[Route("/api/categories")]
		[ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
		public async Task<ActionResult> Categories()
		{
			var categories = await _context.Categories.ToListAsync();
			return new JsonResult(categories);
		}

		[Route("staffs")]
		[ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
		public async Task<ActionResult> Staffs()
		{
			_index.Products = await _context.Products.ToListAsync();
			return new JsonResult(_index.Products);
		}

		public class IndexViewModel
        {
			public IReadOnlyList<Product> Products { get; set; }
        }
	}
}
