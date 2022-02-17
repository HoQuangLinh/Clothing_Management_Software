using Microsoft.AspNetCore.Mvc;
using Clothing_Management.Models;
using Clothing_Management.Dtos;
using System.Linq;

namespace Clothing_Management.Controllers
{
    public class UserController : Controller
    {
        private readonly ClothingManagementDBContext _context;
        public UserController(ClothingManagementDBContext context)
        {
            _context = context;
        }

        [Route("/data/login")]
        [HttpPost]
        public ActionResult Login([FromForm] UserLoginDto userLoginDto)
        {
            //Find User exist in Database, if user no exists return NotFound
            var user = _context.Users.SingleOrDefault(user => user.Username == userLoginDto.UserName);
            if (user == null)
            {
                return NotFound(new
                {
                    Error = $"User {userLoginDto.UserName} not exist"
                });
            }

            //If User exist, verify password
            bool verifiedPassword = BCrypt.Net.BCrypt.Verify(userLoginDto.Password, user.Password);
            if (!verifiedPassword)
            {
                return StatusCode(401, new
                {
                    Error = "User name or password is incorrect"
                });

            }
            return Ok(new
            {
                id = user.Id,
                username = user.Username,
                imageUrl = user.ImageUrl
            });


        }
    }
}
