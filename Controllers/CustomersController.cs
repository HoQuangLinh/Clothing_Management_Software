using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Clothing_Management.Models;
using System;
using System.Linq;
public class CustomersController : Controller
{
    private readonly ClothingManagementDBContext _context;
    public CustomersController(ClothingManagementDBContext context)
    {
        _context = context;
    }

    //Get All Customers   
    [HttpGet]
    [Route("/data/customers")]
    public ActionResult GetAllCustomer()
    {
        var Customers = _context.Customers;
        return new JsonResult(Customers);
    }
}