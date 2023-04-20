﻿// <auto-generated />
using System;
using BikeShop.Products.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BikeShop.Acts.Persistenсe.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230420220159_initial")]
    partial class initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("BikeShop.Acts.Domain.Entities.CashboxAction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal>("Cash")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("ShopId")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("UserCreated")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("UserUpdated")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.ToTable("CashboxActions");
                });

            modelBuilder.Entity("BikeShop.Acts.Domain.Entities.Encashment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal>("Card")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("Cash")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("ShopId")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("Time")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("UserCreated")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("UserUpdated")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.ToTable("Encashments");
                });

            modelBuilder.Entity("BikeShop.Acts.Domain.Entities.SupplyInvoice", b =>
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

                    b.Property<int>("ShopId")
                        .HasColumnType("int");

                    b.Property<string>("SypplyActStatus")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("Total")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("UserCreatedId")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("UserUpdatedId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.ToTable("SupplyInvoices");
                });

            modelBuilder.Entity("BikeShop.Acts.Domain.Entities.SupplyInvoiceProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Barcode")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("BrandName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CatalogKey")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<decimal>("IncomePrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<string>("ManufBarcode")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<decimal>("Quantity")
                        .HasColumnType("decimal(65,30)");

                    b.Property<string>("QuantityUnitName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("SupplyInvoiceId")
                        .HasColumnType("int");

                    b.Property<decimal>("Total")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("SupplyInvoiceProducts");
                });
#pragma warning restore 612, 618
        }
    }
}
