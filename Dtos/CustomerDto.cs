using System;
using Microsoft.AspNetCore.Http;
namespace Clothing_Management.Dtos
{
    public class CustomerDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
 
        public string Email { get; set; }
        public string Phone { get; set; }

        public string Address { get; set; }
        public float Point { get; set; }



    }
}