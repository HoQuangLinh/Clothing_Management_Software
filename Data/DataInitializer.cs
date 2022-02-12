using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using Clothing_Management.Models;
using System.Collections.Generic;
namespace Clothing_Management.Data
{
    public class DataInitializer
    {
        public static void Seed(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<ClothingManagementDBContext>();
                if (!context.Customers.Any())
                {
                    List<Customer> customers = new List<Customer>(){
                            new Customer(){
                                Id="1",
                                Name="Hồ Quang Linh",
                                Phone="01234567",
                                Address="Lộc Ninh, Bình Phước",
                                Email="hoquanglinh2710@gmail.com",
                                Gender="Nam",
                                Total=100000,
                                Point=1200,
                            },  new Customer(){
                                Id="2",
                                Name="Nguyễn Tiến Đạt",
                                Phone="01234567",
                                Address="Lộc Ninh, Bình Phước",
                                Email="hoquanglinh2710@gmail.com",
                                Gender="Nam",
                                Total=100000,
                                Point=1200,
                            },
                                new Customer(){
                                Id="3",
                                Name="Phạm Xuân Bách",
                                Phone="01234567",
                                Address="Lộc Ninh, Bình Phước",
                                Email="hoquanglinh2710@gmail.com",
                                Gender="Nam",
                                Total=100000,
                                Point=1200,
                            },
                                new Customer(){
                                Id="4",
                                Name="Hồ Quang Linh",
                                Phone="01234567",
                                Address="Lộc Ninh, Bình Phước",
                                Email="hoquanglinh2710@gmail.com",
                                Gender="Nam",
                                Total=100000,
                                Point=1200,
                            },
                                new Customer(){
                                Id="5",
                                Name="Hồ Quang Linh",
                                Phone="01234567",
                                Address="Lộc Ninh, Bình Phước",
                                Email="hoquanglinh2710@gmail.com",
                                Gender="Nam",
                                Total=100000,
                                Point=1200,
                            },
                        };
                    context.Customers.AddRange(customers);
                    context.SaveChanges();
                }
            }
        }
    }
}