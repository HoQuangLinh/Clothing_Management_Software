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
                                Phone="0352443232",
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
                                Phone="0939321939",
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
                                Phone="0938382937",
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
                                Phone="093839283",
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
                                Phone="0938297361",
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
            }
        }
    }
}
