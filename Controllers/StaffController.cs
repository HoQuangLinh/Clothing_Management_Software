using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Clothing_Management.Models;
using System;
using System.Linq;
public class StaffController : Controller
{
    private readonly ClothingManagementDBContext _context;
    public StaffController(ClothingManagementDBContext context)
    {
        _context = context;
    }

    //Get All Staffs    
    [HttpGet]
    [Route("/data/staffs")]
    public ActionResult GetAllStaff()
    {
        var Staffs = _context.Users.Where(user => user.Position != "Chủ cửa hàng");
        return new JsonResult(Staffs);
    }


    // Filter Staff By Position
    [HttpGet]
    //Example:Get /data/staffs/filter?position=Nhân viên thu ngân
    [Route("/data/staffs/filter")]
    public ActionResult FilterStaffByPosition(string position)
    {
        var FilteredStaff = _context.Users.Where(user => user.Position == position);
        return new JsonResult(FilteredStaff);
    }
}