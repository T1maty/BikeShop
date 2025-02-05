﻿// <auto-generated />
using System;
using BikeShop.Service.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BikeShop.Service.Persistence.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230612091610_userData")]
    partial class userData
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("BikeShop.Service.Domain.Entities.Service", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClientDescription")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ClientFIO")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid>("ClientId")
                        .HasColumnType("char(36)");

                    b.Property<string>("ClientPhone")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<decimal>("Discount")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("DiscountProduct")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("DiscountWork")
                        .HasColumnType("decimal(65,30)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("MasterFIO")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("MasterPhone")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("PriceProduct")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("PriceWork")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("ProductDiscountId")
                        .HasColumnType("int");

                    b.Property<int>("ShopId")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("Total")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("TotalProduct")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("TotalWork")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("UserCreatedDescription")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid>("UserCreatedId")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("UserDeletedId")
                        .HasColumnType("char(36)");

                    b.Property<string>("UserFIO")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("UserMasterDescription")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid>("UserMasterId")
                        .HasColumnType("char(36)");

                    b.Property<string>("UserPhone")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid>("UserUpdatedId")
                        .HasColumnType("char(36)");

                    b.Property<int>("WorkDiscountId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Services");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ClientDescription = "desc",
                            ClientFIO = "",
                            ClientId = new Guid("e12ead63-ba9c-40d0-a274-0cce8af0a04c"),
                            ClientPhone = "",
                            CreatedAt = new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6986),
                            Discount = 500m,
                            DiscountProduct = 500m,
                            DiscountWork = 500m,
                            Enabled = true,
                            MasterFIO = "",
                            MasterPhone = "",
                            Name = "First",
                            Price = 500m,
                            PriceProduct = 500m,
                            PriceWork = 500m,
                            ProductDiscountId = 0,
                            ShopId = 1,
                            Status = "Waiting",
                            Total = 500m,
                            TotalProduct = 500m,
                            TotalWork = 500m,
                            UpdatedAt = new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6990),
                            UserCreatedDescription = "desc",
                            UserCreatedId = new Guid("0a97afbf-364e-430e-8aae-9ca1ec294ac1"),
                            UserDeletedId = new Guid("ea093099-b4e9-4bff-8be6-40187e0a06ea"),
                            UserFIO = "",
                            UserMasterDescription = "desc",
                            UserMasterId = new Guid("e034bff3-50ed-4ab2-bd4d-b3ad947b12d4"),
                            UserPhone = "",
                            UserUpdatedId = new Guid("00000000-0000-0000-0000-000000000000"),
                            WorkDiscountId = 0
                        });
                });

            modelBuilder.Entity("BikeShop.Service.Domain.Entities.ServiceProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("CatalogKey")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<decimal>("Discount")
                        .HasColumnType("decimal(65,30)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<decimal>("Quantity")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("QuantityUnitId")
                        .HasColumnType("int");

                    b.Property<string>("QuantityUnitName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("SerialNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("ServiceId")
                        .HasColumnType("int");

                    b.Property<decimal>("Total")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.ToTable("ServiceProducts");
                });

            modelBuilder.Entity("BikeShop.Service.Domain.Entities.ServiceWork", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal>("ComplicationPrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("Discount")
                        .HasColumnType("decimal(65,30)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<int>("ServiceId")
                        .HasColumnType("int");

                    b.Property<decimal>("Total")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("char(36)");

                    b.Property<int>("WorkId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("ServiceWorks");
                });

            modelBuilder.Entity("BikeShop.Service.Domain.Entities.Work", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<double>("Price")
                        .HasColumnType("double");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("WorkGroupId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("WorkGroupId");

                    b.ToTable("Works");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedAt = new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6936),
                            Description = "Work description 1",
                            Enabled = true,
                            Name = "Work 1",
                            Price = 228.0,
                            UpdatedAt = new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6943),
                            WorkGroupId = 1
                        },
                        new
                        {
                            Id = 2,
                            CreatedAt = new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6947),
                            Description = "Work description 2",
                            Enabled = true,
                            Name = "Work 2",
                            Price = 300.0,
                            UpdatedAt = new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6948),
                            WorkGroupId = 1
                        },
                        new
                        {
                            Id = 3,
                            CreatedAt = new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6951),
                            Description = "Work description 3",
                            Enabled = true,
                            Name = "Work 3",
                            Price = 500.0,
                            UpdatedAt = new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6952),
                            WorkGroupId = 2
                        });
                });

            modelBuilder.Entity("BikeShop.Service.Domain.Entities.WorkGroup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsCollapsed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("ParentId")
                        .HasColumnType("int");

                    b.Property<int>("ShopId")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("WorkGroups");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedAt = new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6660),
                            Enabled = true,
                            IsCollapsed = true,
                            Name = "First work group",
                            ParentId = 0,
                            ShopId = 1,
                            UpdatedAt = new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6715)
                        },
                        new
                        {
                            Id = 2,
                            CreatedAt = new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6721),
                            Enabled = true,
                            IsCollapsed = true,
                            Name = "Second work group",
                            ParentId = 0,
                            ShopId = 1,
                            UpdatedAt = new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6723)
                        },
                        new
                        {
                            Id = 3,
                            CreatedAt = new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6725),
                            Enabled = true,
                            IsCollapsed = false,
                            Name = "First Child of first work group",
                            ParentId = 1,
                            ShopId = 1,
                            UpdatedAt = new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6726)
                        });
                });

            modelBuilder.Entity("BikeShop.Service.Domain.Entities.Work", b =>
                {
                    b.HasOne("BikeShop.Service.Domain.Entities.WorkGroup", "WorkGroup")
                        .WithMany()
                        .HasForeignKey("WorkGroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("WorkGroup");
                });
#pragma warning restore 612, 618
        }
    }
}
