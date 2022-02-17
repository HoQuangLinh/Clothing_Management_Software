using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Clothing_Management.Models
{
    public class ClothingManagementDBContext : DbContext
    {
        public ClothingManagementDBContext()
        { }

        public ClothingManagementDBContext(DbContextOptions<ClothingManagementDBContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasIndex(u => u.Username).IsUnique();
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
            modelBuilder.Entity<User>().HasIndex(u => u.Phone).IsUnique();

        }

        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Categories> Categories { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderDetail> OrderDetails { get; set; }
        public virtual DbSet<ReturnOrder> ReturnOrders { get; set; }
        public virtual DbSet<ReturnOrderDetail> ReturnOrderDetails { get; set; }
    }
}
