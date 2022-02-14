using Microsoft.AspNetCore.Mvc;
using Clothing_Management.Models;
namespace Clothing_Management.Controllers
{
    public class UserController : Controller
    {
        private readonly ClothingManagementDBContext _context;
        public UserController(ClothingManagementDBContext context)
        {
            _context = context;
        }

        [Route("/data/login/{key}")]
        [HttpGet]
        public ActionResult Login(string key)
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(key);
            return Ok(new
            {
                password = key,
                passwordHash = passwordHash
            });
        }
    }
}
