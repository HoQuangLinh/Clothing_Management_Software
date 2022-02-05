using System.Collections.Generic;
using System.Linq;
using Clothing_Management.Models;
using Microsoft.AspNetCore.Mvc;

namespace Clothing_Management.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			return View(new IndexViewModel
			{
				Products = null,
			});
		}

		public ActionResult Products()
		{
			var products = DataProvider.Instance.DB.Products.ToList();

			return View("~/Views/Home/Index.cshtml", new IndexViewModel
			{
				Products = products.AsReadOnly(),
			}) ;
		}

		public class IndexViewModel
        {
			public IReadOnlyList<Product> Products { get; set; }
        }
	}
}
