﻿// <auto-generated />
using System;
using Clothing_Management.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Clothing_Management.Migrations
{
    [DbContext(typeof(ClothingManagementDBContext))]
    [Migration("20220205035142_initialMigration")]
    partial class initialMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.22")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Clothing_Management.Models.Categories", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Clothing_Management.Models.Customer", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Point")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("Clothing_Management.Models.Order", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("CustomerId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("DateOrder")
                        .HasColumnType("datetime2");

                    b.Property<float>("Discount")
                        .HasColumnType("real");

                    b.Property<float>("OrderTotal")
                        .HasColumnType("real");

                    b.Property<string>("QrCodeUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("SubTotal")
                        .HasColumnType("real");

                    b.Property<float>("TotalReturnPrice")
                        .HasColumnType("real");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("Clothing_Management.Models.OrderDetail", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("OrderId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProductId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<float>("Quantity")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.HasIndex("ProductId");

                    b.ToTable("OrderDetails");
                });

            modelBuilder.Entity("Clothing_Management.Models.Product", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("CategoriesId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<double>("CostPrice")
                        .HasColumnType("float");

                    b.Property<double>("Discount")
                        .HasColumnType("float");

                    b.Property<string>("ImageDisplay")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("OriginPrice")
                        .HasColumnType("float");

                    b.Property<string>("QrCodeUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Quantity")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("SalePrice")
                        .HasColumnType("float");

                    b.Property<string>("Size")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CategoriesId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("Clothing_Management.Models.ReturnOrder", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("DateReturn")
                        .HasColumnType("datetime2");

                    b.Property<string>("OrderId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("QrCodeUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("ReturnFee")
                        .HasColumnType("real");

                    b.Property<float>("ReturnTempPrice")
                        .HasColumnType("real");

                    b.Property<float>("TotalReturnPrice")
                        .HasColumnType("real");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.HasIndex("UserId");

                    b.ToTable("ReturnOrders");
                });

            modelBuilder.Entity("Clothing_Management.Models.ReturnOrderDetail", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<float>("OldQuantity")
                        .HasColumnType("real");

                    b.Property<string>("OrderDetailId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<float>("ReturnQuantity")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("OrderDetailId");

                    b.ToTable("ReturnOrderDetails");
                });

            modelBuilder.Entity("Clothing_Management.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Birthday")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Fullname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Position")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Clothing_Management.Models.Order", b =>
                {
                    b.HasOne("Clothing_Management.Models.Customer", "Customer")
                        .WithMany("Orders")
                        .HasForeignKey("CustomerId");

                    b.HasOne("Clothing_Management.Models.User", "User")
                        .WithMany("Orders")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Clothing_Management.Models.OrderDetail", b =>
                {
                    b.HasOne("Clothing_Management.Models.Order", "Order")
                        .WithMany("OrderDetails")
                        .HasForeignKey("OrderId");

                    b.HasOne("Clothing_Management.Models.Product", "Product")
                        .WithMany("OrderDetails")
                        .HasForeignKey("ProductId");
                });

            modelBuilder.Entity("Clothing_Management.Models.Product", b =>
                {
                    b.HasOne("Clothing_Management.Models.Categories", "Categories")
                        .WithMany("Products")
                        .HasForeignKey("CategoriesId");
                });

            modelBuilder.Entity("Clothing_Management.Models.ReturnOrder", b =>
                {
                    b.HasOne("Clothing_Management.Models.Order", "Order")
                        .WithMany("ReturnOrders")
                        .HasForeignKey("OrderId");

                    b.HasOne("Clothing_Management.Models.User", "User")
                        .WithMany("ReturnOrders")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Clothing_Management.Models.ReturnOrderDetail", b =>
                {
                    b.HasOne("Clothing_Management.Models.OrderDetail", "OrderDetail")
                        .WithMany("ReturnOrderDetails")
                        .HasForeignKey("OrderDetailId");
                });
#pragma warning restore 612, 618
        }
    }
}
