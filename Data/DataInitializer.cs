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
                if (!context.Users.Any())
                {
                    List<User> users = new List<User>(){
                            new User(){
                                Fullname="Hồ Quang Linh",
                                Username="admin",
                                Password="111111",
                                Phone="0352942222",
                                Address="Lộc Ninh, Bình Phước",
                                Email="hoquanglinh2710@gmail.com",
                                Gender="Nam",
                                ImageUrl="https://res.cloudinary.com/hoquanglinh/image/upload/v1639459232/Linh/vqrzga5ncigbvauybbyf.png",
                                Position="Chủ cửa hàng",
                                Birthday=new DateTime(2000,11,24)
                            }, new User(){

                                Fullname="Phạm Xuân Bách",
                                Username="admin1",
                                Password="111111",
                                Phone="0352942222",
                                Address="Lộc Ninh, Bình Phước",
                                Email="hoquanglinh2810@gmail.com",
                                Gender="Nam",
                                ImageUrl="https://res.cloudinary.com/hoquanglinh/image/upload/v1639459232/Linh/vqrzga5ncigbvauybbyf.png",
                                Position="Chủ cửa hàng",
                                Birthday=new DateTime(2000,11,24)
                            },
                            new User(){

                                Fullname="Nguyễn Tiến Đạt",
                                Username="admin2",
                                Password="111111",
                                Phone="0939392939",
                                Address="Lộc Ninh, Bình Phước",
                                Email="datnguyen@gmail.com",
                                Gender="Nam",
                                ImageUrl="https://res.cloudinary.com/hoquanglinh/image/upload/v1639459232/Linh/vqrzga5ncigbvauybbyf.png",
                                Position="Chủ cửa hàng",
                                Birthday=new DateTime(2001,10,11)
                            },
                              new User(){
                                Fullname="Lê Thành Nam",
                                Username="namks",
                                Password="111111",
                                Phone="0352942222",
                                Address="Lộc Ninh, Bình Phước",
                                Email="nam2110@gmail.com",
                                Gender="Nam",
                                ImageUrl="https://res.cloudinary.com/hoquanglinh/image/upload/v1639459232/Linh/vqrzga5ncigbvauybbyf.png",
                                Position="Nhân viên kho",
                                Birthday=new DateTime(2000,11,24)
                            }, new User(){

                                Fullname="Hoàn Tấn Tài",
                                Username="tai1",
                                Password="111111",
                                Phone="03322942221",
                                Address="Bảo An, Ninh Bình",
                                Email="taiAli@gmail.com",
                                Gender="Nam",
                                ImageUrl="https://res.cloudinary.com/hoquanglinh/image/upload/v1639459232/Linh/vqrzga5ncigbvauybbyf.png",
                                Position="Nhân viên kho",
                                Birthday=new DateTime(2000,11,24)
                            },
                            new User(){

                                Fullname="Lê Thị Minh Tâm",
                                Username="tam21",
                                Password="111111",
                                Phone="0352942222",
                                Address="Lộc Ninh, Bình Phước",
                                Email="lethanhtam@gmail.com",
                                Gender="Nữ",
                                ImageUrl="https://res.cloudinary.com/hoquanglinh/image/upload/v1639459232/Linh/vqrzga5ncigbvauybbyf.png",
                                Position="Nhân viên thu ngân",
                                Birthday=new DateTime(2000,11,24)
                            }
                        };
                    context.Users.AddRange(users);
                    context.SaveChanges();
                }
                if (!context.Categories.Any())
                {
                    List<Categories> categories = new List<Categories>()
                    {
                        new Categories()
                        {
                            Name = "Áo thun", //1
                        },
                        new Categories()
                        {
                            Name = "Áo khoác", //2
                        },
                        new Categories()
                        {
                            Name = "Áo sơ mi", //3
                        },
                        new Categories()
                        {
                            Name = "Quần jean", //4
                        },
                        new Categories()
                        {
                            Name = "Quần tây", //5
                        },
                        new Categories()
                        {
                            Name = "Quần đùi", //6
                        }
                    };
                    context.Categories.AddRange(categories);
                    context.SaveChanges();
                }  
                if (!context.Products.Any())
                {
                    List<Product> products = new List<Product>()
                    {
                        new Product()
                        {
                            Name = "Áo ca ki",
                            OriginPrice = 20000,
                            CostPrice = 21000,
                            Discount = 0,
                            SalePrice = 21000,
                            ImageDisplay = "",
                            QrCodeUrl = "",
                            Size = "XL",
                            Quantity = 20,
                            CategoriesId = 1,
                        },
                        new Product()
                        {
                            Name = "Áo sơ mi xanh",
                            OriginPrice = 50000,
                            CostPrice = 51000,
                            Discount = 0,
                            SalePrice = 51000,
                            ImageDisplay = "",
                            QrCodeUrl = "",
                            Size = "L",
                            Quantity = 50,
                            CategoriesId = 3,
                        },
                        new Product()
                        {
                            Name = "Quần jean 2021",
                            OriginPrice = 30000,
                            CostPrice = 31000,
                            Discount = 0,
                            SalePrice = 31000,
                            ImageDisplay = "",
                            QrCodeUrl = "",
                            Size = "L",
                            Quantity = 30,
                            CategoriesId = 4,
                        }
                    };
                    context.Products.AddRange(products);
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
                                Total=112000,
                                Point=1400,
                            },  new Customer(){
                                Id="2",
                                Name="Nguyễn Tiến Đạt",
                                Phone="01234567",
                                Address="Lộc Ninh, Bình Phước",
                                Email="hoquanglinh2710@gmail.com",
                                Gender="Nam",
                                Total=150600,
                                Point=1000,
                            },
                                new Customer(){
                                Id="3",
                                Name="Phạm Xuân Bách",
                                Phone="01234567",
                                Address="Lộc Ninh, Bình Phước",
                                Email="hoquanglinh2710@gmail.com",
                                Gender="Nam",
                                Total=155000,
                                Point=700,
                            },
                                new Customer(){
                                Id="4",
                                Name="Hồ Quang Linh",
                                Phone="01234567",
                                Address="Lộc Ninh, Bình Phước",
                                Email="hoquanglinh2710@gmail.com",
                                Gender="Nam",
                                Total=140000,
                                Point=400,
                            },
                                new Customer(){
                                Id="5",
                                Name="Hồ Quang Linh",
                                Phone="01234567",
                                Address="Lộc Ninh, Bình Phước",
                                Email="hoquanglinh2710@gmail.com",
                                Gender="Nam",
                                Total=120000,
                                Point=200,
                            },
                        };
                    context.Customers.AddRange(customers);
                    context.SaveChanges();
                    }
                }
            }
        }
    }
}
