using System;
using Microsoft.AspNetCore.Http;
namespace Clothing_Management.Dtos
{
    public class StaffDto
    {
        public IFormFile Image { get; set; }
        public string ImageUrl { get; set; }
        public string UserName { get; set; }
        public string Gender { get; set; }
        public string Position { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public string Fullname { get; set; }
        public string Address { get; set; }

    }
}