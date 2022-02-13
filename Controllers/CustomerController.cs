using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Clothing_Management.Models;
using System;
using System.Linq;
using Newtonsoft.Json;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using Clothing_Management.Helpers;
using Clothing_Management.Dtos;

public class CustomerController : Controller
{
    private readonly ClothingManagementDBContext _context;

    private CloudinaryConfig _cloudinaryConfig;
    public CustomerController(ClothingManagementDBContext context, CloudinaryConfig cloudinaryConfig)
    {

        _context = context;
        _cloudinaryConfig = cloudinaryConfig;

    }

    //Get All Customers    
    [HttpGet]
    [Route("/data/customers")]
    public ActionResult GetAllCustomer()
    {
        var customers = _context.Customers;
        return new JsonResult(customers);
    }

    // // Filter Staff By Position
    // [HttpGet]
    // //Example:Get /data/staffs/filter?position=Nhân viên thu ngân
    // [Route("/data/staffs/filter")]
    // public ActionResult FilterStaffByPosition(string position)
    // {
    //     var filteredStaff = _context.Users.Where(user => user.Position == position);
    //     return new JsonResult(filteredStaff);
    // }
    // [Route("/data/addStaff")]
    // [HttpPost]
    // public ActionResult AddStaff([FromForm] StaffDto staffDto)
    // {
    //     var image = staffDto.Image;
    //     var uploadResult = new ImageUploadResult();

    //     //Upload file to Cloudinary Server Using File ReadStream
    //     if (image.Length > 0)
    //     {
    //         using (var stream = image.OpenReadStream())
    //         {

    //             var uploadParams = new ImageUploadParams()
    //             {
    //                 File = new FileDescription(image.Name, stream),

    //             };

    //             uploadResult = _cloudinaryConfig.Cloudinary.Upload(uploadParams);

    //         }
    //     }
    //     //Get Url from Cloudinary and Store to staffDto object 
    //     staffDto.ImageUrl = uploadResult.Url?.ToString();

    //     //Mapping StaffDao to User Entity
    //     var user = new User()
    //     {
    //         ImageUrl = staffDto.ImageUrl,
    //         Username = staffDto.UserName,
    //         Gender = staffDto.Gender,
    //         Position = staffDto.Position,
    //         Email = staffDto.Email,
    //         Phone = staffDto.Phone,
    //         Password = staffDto.Password,
    //         Fullname = staffDto.Fullname,
    //         Address = staffDto.Address

    //     };


    //     //Save One user to Database
    //     _context.Users.Add(user);
    //     _context.SaveChanges();


    //     return Ok();
    // }
}