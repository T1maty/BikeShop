﻿// <auto-generated />
using System;
using Bikeshop.Shop.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Bikeshop.Shop.Persistence.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("BikeShop.Shop.Domain.Entities.Shop", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("CashboxCash")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("CashboxTerminal")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Secret")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("StorageId")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("StorageId")
                        .IsUnique();

                    b.ToTable("Shops");
                });

            modelBuilder.Entity("BikeShop.Shop.Domain.Entities.ShopScheduleItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("Finish")
                        .HasColumnType("datetime(6)");

                    b.Property<TimeSpan>("PostFinishInaccuracy")
                        .HasColumnType("time(6)");

                    b.Property<TimeSpan>("PostStartInaccuracy")
                        .HasColumnType("time(6)");

                    b.Property<TimeSpan>("PreFinishInaccuracy")
                        .HasColumnType("time(6)");

                    b.Property<TimeSpan>("PreStartInaccuracy")
                        .HasColumnType("time(6)");

                    b.Property<int>("ShopId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Start")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.ToTable("ShopScheduleItems");
                });

            modelBuilder.Entity("BikeShop.Shop.Domain.Entities.UserShiftItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Action")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("Time")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.ToTable("UserShiftItems");
                });
#pragma warning restore 612, 618
        }
    }
}
