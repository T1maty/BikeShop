﻿// <auto-generated />
using System;
using BikeShop.Products.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BikeShop.Payments.Persistence.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230929142143_subOrder")]
    partial class subOrder
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("BikeShop.Payments.Domain.Entities.Bill", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<Guid?>("ClientId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("CurrencyId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("Discount")
                        .HasColumnType("decimal(65,30)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<Guid?>("FiscalId")
                        .HasColumnType("char(36)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(65,30)");

                    b.Property<string>("QRCode")
                        .HasColumnType("longtext");

                    b.Property<int>("ShopId")
                        .HasColumnType("int");

                    b.Property<decimal>("Total")
                        .HasColumnType("decimal(65,30)");

                    b.Property<Guid>("UUID")
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.ToTable("Bills");
                });

            modelBuilder.Entity("BikeShop.Payments.Domain.Entities.BillProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("BillId")
                        .HasColumnType("int");

                    b.Property<string>("CatalogKey")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("CurrencyId")
                        .HasColumnType("int");

                    b.Property<string>("CurrencySymbol")
                        .IsRequired()
                        .HasColumnType("longtext");

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

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<decimal>("Quantity")
                        .HasColumnType("decimal(65,30)");

                    b.Property<string>("QuantityUnitName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("SerialNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("Total")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("BillProducts");
                });

            modelBuilder.Entity("BikeShop.Payments.Domain.Entities.CheckboxSettings", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("BearerToken")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Key")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PIN")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("SettingsName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid>("ShiftId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("CheckboxSettings");
                });

            modelBuilder.Entity("BikeShop.Payments.Domain.Entities.Currency", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal>("Coefficient")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsBaseCurrency")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Symbol")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Currencies");
                });

            modelBuilder.Entity("BikeShop.Payments.Domain.Entities.CurrencyHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal>("Coefficient")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("CurrencyId")
                        .HasColumnType("int");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("CurrencyId");

                    b.ToTable("CurrencyHistories");
                });

            modelBuilder.Entity("BikeShop.Payments.Domain.Entities.Discount", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("BindToTargetId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsPersonal")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsZeroLoss")
                        .HasColumnType("tinyint(1)");

                    b.Property<decimal>("Limit")
                        .HasColumnType("decimal(65,30)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("SecretString")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Target")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Discounts");
                });

            modelBuilder.Entity("BikeShop.Payments.Domain.Entities.DiscountProductBind", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal>("AmountLimit")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("DiscountId")
                        .HasColumnType("int");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<decimal>("TotalLimit")
                        .HasColumnType("decimal(65,30)");

                    b.Property<string>("TypeOnly")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("DiscountProductBinds");
                });

            modelBuilder.Entity("BikeShop.Payments.Domain.Entities.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<Guid>("ClientId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("DeliveryInfo")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("DeliveryType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("DescriptionCilent")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("DiscountId")
                        .HasColumnType("int");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsPayed")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsPrePay")
                        .HasColumnType("tinyint(1)");

                    b.Property<Guid?>("ManagerId")
                        .HasColumnType("char(36)");

                    b.Property<decimal>("OrderDiscount")
                        .HasColumnType("decimal(65,30)");

                    b.Property<string>("OrderStatus")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("OrderType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("PaymentId")
                        .HasColumnType("int");

                    b.Property<int>("ShopId")
                        .HasColumnType("int");

                    b.Property<decimal>("TotalPrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("TotalProductDiscount")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("TotalProductsPrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid?>("UserCreated")
                        .HasColumnType("char(36)");

                    b.Property<Guid?>("UserUpdated")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("BikeShop.Payments.Domain.Entities.OrderProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("CatalogKey")
                        .IsRequired()
                        .HasColumnType("longtext");

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

                    b.Property<int>("OrderId")
                        .HasColumnType("int");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<int>("QuantityUnitId")
                        .HasColumnType("int");

                    b.Property<string>("QuantityUnitName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("SerialNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("Total")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("OrderProducts");
                });

            modelBuilder.Entity("BikeShop.Payments.Domain.Entities.Payment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal>("BankCount")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("Card")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("Cash")
                        .HasColumnType("decimal(65,30)");

                    b.Property<Guid>("ClientId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("CurrencyId")
                        .HasColumnType("int");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<decimal>("PersonalBalance")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("ShopId")
                        .HasColumnType("int");

                    b.Property<string>("Target")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("TargetId")
                        .HasColumnType("int");

                    b.Property<decimal>("Total")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.ToTable("Payments");
                });

            modelBuilder.Entity("BikeShop.Payments.Domain.Entities.CurrencyHistory", b =>
                {
                    b.HasOne("BikeShop.Payments.Domain.Entities.Currency", "Currency")
                        .WithMany("CurrencyHistories")
                        .HasForeignKey("CurrencyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Currency");
                });

            modelBuilder.Entity("BikeShop.Payments.Domain.Entities.Currency", b =>
                {
                    b.Navigation("CurrencyHistories");
                });
#pragma warning restore 612, 618
        }
    }
}
