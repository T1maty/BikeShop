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

            modelBuilder.Entity("BikeShop.Shop.Domain.Entities.CashboxHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal>("AfterActionCash")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("AfterActionTerminal")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("CashAction")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("ShopId")
                        .HasColumnType("int");

                    b.Property<string>("Source")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("SourceId")
                        .HasColumnType("int");

                    b.Property<decimal>("TerminalAction")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("CashboxHistories");
                });

            modelBuilder.Entity("BikeShop.Shop.Domain.Entities.ScheduleHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Action")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid>("ActionTargetUser")
                        .HasColumnType("char(36)");

                    b.Property<string>("ActionTargetUserFIO")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid>("ActionUser")
                        .HasColumnType("char(36)");

                    b.Property<string>("ActionUserFIO")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsHolydayActual")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsHolydayPrev")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("ItemId")
                        .HasColumnType("int");

                    b.Property<int>("ShopId")
                        .HasColumnType("int");

                    b.Property<DateTime>("TimeFinishActual")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("TimeFinishPrev")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("TimeStartActual")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("TimeStartPrev")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("ScheduleHistories");
                });

            modelBuilder.Entity("BikeShop.Shop.Domain.Entities.ScheduleItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("CreatedUser")
                        .HasColumnType("char(36)");

                    b.Property<string>("CreatedUserFIO")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsHolyday")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("ShopId")
                        .HasColumnType("int");

                    b.Property<Guid>("TargetUser")
                        .HasColumnType("char(36)");

                    b.Property<string>("TargetUserFIO")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("TimeFinish")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("TimeStart")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("UpdatedUser")
                        .HasColumnType("char(36)");

                    b.Property<string>("UpdatedUserFIO")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("ScheduleItems");
                });

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

            modelBuilder.Entity("BikeShop.Shop.Domain.Entities.UserSalary", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<decimal>("Rate")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("ShopPercent")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("char(36)");

                    b.Property<decimal>("WorkPercent")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("WorkshopPercent")
                        .HasColumnType("decimal(65,30)");

                    b.HasKey("Id");

                    b.ToTable("UserSalaries");
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
