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
using Microsoft.EntityFrameworkCore;

public class StaffController : Controller
{
    private readonly ClothingManagementDBContext _context;

    private readonly CloudinaryConfig _cloudinaryConfig;
    public StaffController(ClothingManagementDBContext context, CloudinaryConfig cloudinaryConfig)
    {

        _context = context;
        _cloudinaryConfig = cloudinaryConfig;

    }

    //Get All Staffs    
    [HttpGet]
    [Route("/data/staffs")]
    public ActionResult GetAllStaff()
    {

        var staffs = _context.Users.Where(user => user.Position != "Chủ cửa hàng");
        return new JsonResult(staffs);
    }

    // Filter Staff By Position
    [HttpGet]
    //Example:Get /data/staffs/filter?position=Nhân viên thu ngân
    [Route("/data/staffs/filter")]
    public ActionResult FilterStaffByPosition(string position)
    {
        var filteredStaff = _context.Users.Where(user => user.Position == position);
        return new JsonResult(filteredStaff);
    }
    [Route("/data/addStaff")]
    [HttpPost]
    public ActionResult AddStaff([FromForm] StaffDto staffDto)
    {
        var image = staffDto.Image;

        var uploadResult = new ImageUploadResult();

        //Upload file to Cloudinary Server Using File ReadStream
        if (image != null)
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
        staffDto.ImageUrl = uploadResult.Url?.ToString();

        //Mapping StaffDao to User Entity
        var user = new User()
        {
            ImageUrl = staffDto.ImageUrl,
            Username = staffDto.UserName,
            Gender = staffDto.Gender,
            Position = staffDto.Position,
            Email = staffDto.Email,
            Phone = staffDto.Phone,
            Password = staffDto.Password,
            Fullname = staffDto.Fullname,
            Address = staffDto.Address

        };

        try
        {
            //Save One user to Database
            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok(user);
        }
        catch (Exception ex)
        {

            return StatusCode(500);
        }

    }
}