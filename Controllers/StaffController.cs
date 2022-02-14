using System.Net;
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
        var staffs = _context.Users.Where(user => user.Position != "Chủ cửa hàng").Select(user => new { user.Id, user.Fullname, user.Position, user.Phone, user.Gender });
        return new JsonResult(staffs);
    }

    //Get Staff By Id
    [Route("/data/staffs/{id}")]
    public ActionResult GetStaffById(int id)
    {

        var user = _context.Users.Select(user => new { user.Id, user.Username, user.Gender, user.Email, user.Phone, user.Fullname, user.Position, user.Address, user.ImageUrl }).Where(user => user.Position != "Chủ cửa hàng" && user.Id == id).FirstOrDefault();

        if (user == null)
        {
            return NotFound(
                new
                {
                    Error = $"Cannot find staff with id is {id}"
                }
           );
        }
        return Ok(user);
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
            Password = BCrypt.Net.BCrypt.HashPassword(staffDto.Password),
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

            return StatusCode(500, new
            {
                Error = ex.ToString()
            });
        }

    }

    //Edit Staff By Id
    [Route("/data/staffs/edit/{id}")]
    [HttpPut]
    public ActionResult EditStaffById(int id, StaffDto staffDto)
    {
        var staff = _context.Users.Where(user => user.Id == id).FirstOrDefault();
        if (staff == null)
        {
            return NotFound(new
            {
                Error = $"Cannot fimd staff with Id is {id}"
            });
        }

        if (staffDto.Image != null)
        {
            var image = staffDto.Image;
            var uploadResult = new ImageUploadResult();

            //Upload file to Cloudinary Server Using File ReadStream
            using (var stream = image.OpenReadStream())
            {

                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(image.Name, stream),

                };

                uploadResult = _cloudinaryConfig.Cloudinary.Upload(uploadParams);

                staffDto.ImageUrl = uploadResult.Url?.ToString();
                staff.ImageUrl = staffDto.ImageUrl ?? staff.ImageUrl;
            }
        }
        if (!string.IsNullOrEmpty(staffDto.Gender) && staff.Gender != staffDto.Gender)
        {
            staff.Gender = staffDto.Gender;

        }
        if (!string.IsNullOrEmpty(staffDto.Email) && staff.Email != staffDto.Email)
        {
            staff.Email = staffDto.Email;
        }
        if (!string.IsNullOrEmpty(staffDto.Phone) && staff.Phone != staffDto.Phone)
        {
            staff.Phone = staffDto.Phone;
        }
        if (!string.IsNullOrEmpty(staffDto.Fullname) && staff.Fullname != staffDto.Fullname)
        {
            staff.Fullname = staffDto.Fullname;
        }
        if (!string.IsNullOrEmpty(staffDto.Position) && staff.Position != staffDto.Position)
        {
            staff.Position = staffDto.Position;
        }
        if (!string.IsNullOrEmpty(staffDto.Address) && staff.Address != staffDto.Address)
        {
            staff.Address = staffDto.Address;
        }
        try
        {
            _context.SaveChanges();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                Error = ex.ToString()
            });
        }


        return Ok();
    }

    [HttpDelete]
    [Route("/data/staffs/delete/{id}")]
    public ActionResult DeleteStaff(int id)
    {
        var user = _context.Users.SingleOrDefault(user => user.Id == id && user.Position != "Chủ cửa hàng");
        if (user == null)
        {
            return NotFound(new
            {
                Error1 = $"Cannot find staff with Id is {id}"
            });
        }
        try
        {
            _context.Users.Remove(user);
            _context.SaveChanges();
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                Error = ex.ToString()
            });
        }

    }


}