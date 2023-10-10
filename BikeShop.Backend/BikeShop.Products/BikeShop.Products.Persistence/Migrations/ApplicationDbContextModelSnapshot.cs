﻿// <auto-generated />
using System;
using BikeShop.Products.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BikeShop.Products.Persistence.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("BikeShop.Products.Domain.Entities.Brand", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("ImageSource")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("SortOrder")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Brands");
                });

            modelBuilder.Entity("BikeShop.Products.Domain.Entities.ClientCartProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<Guid>("ClientId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<decimal>("Quantity")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("ClientCartProducts");
                });

            modelBuilder.Entity("BikeShop.Products.Domain.Entities.ClientFavProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<Guid>("ClientId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("ClientFavProducts");
                });

            modelBuilder.Entity("BikeShop.Products.Domain.Entities.Option", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Options");
                });

            modelBuilder.Entity("BikeShop.Products.Domain.Entities.OptionVariant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("OptionId")
                        .HasColumnType("int");

                    b.Property<string>("OptionName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("OptionVariants");
                });

            modelBuilder.Entity("BikeShop.Products.Domain.Entities.PriceHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<decimal>("NewDealerPrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("NewIncomePrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("NewRetailPrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("OldDealerPrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("OldIncomePrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("OldRetailPrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("UserChangedId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.ToTable("PriceHistories");
                });

            modelBuilder.Entity("BikeShop.Products.Domain.Entities.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("B2BVisibility")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Barcode")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("BrandId")
                        .HasColumnType("int");

                    b.Property<string>("CatalogKey")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("CategoryImport")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CategoryName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CategoryWay")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CheckStatus")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<decimal>("DealerPrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<decimal>("IncomePrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<bool>("IsMaster")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("ManufacturerBarcode")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("OldDealerPrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("OldIncomePrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("QuantityUnitId")
                        .HasColumnType("int");

                    b.Property<string>("QuantityUnitName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("RetailPrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<bool>("RetailVisibility")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("UserCreated")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("UserUpdated")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("BrandId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("BikeShop.Products.Domain.Entities.ProductBind", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ChildrenId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("ProductBinds");
                });

            modelBuilder.Entity("BikeShop.Products.Domain.Entities.ProductCard", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("DescriptionShort")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("ProductsCards");
                });

            modelBuilder.Entity("BikeShop.Products.Domain.Entities.ProductCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ChildrenIds")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("IconUrl")
                        .HasColumnType("longtext");

                    b.Property<bool>("IsB2BVisible")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsCollapsed")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsRetailVisible")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("ParentId")
                        .HasColumnType("int");

                    b.Property<int>("SortOrder")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Way")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("ProductCategories");
                });

            modelBuilder.Entity("BikeShop.Products.Domain.Entities.ProductImg", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("SortOrder")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Url")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("ProductImgs");
                });

            modelBuilder.Entity("BikeShop.Products.Domain.Entities.ProductOptionVariantBind", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("OptionId")
                        .HasColumnType("int");

                    b.Property<string>("OptionName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("OptionVariantId")
                        .HasColumnType("int");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("SortOrder")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("ProductOptionVariantBinds");
                });

            modelBuilder.Entity("BikeShop.Products.Domain.Entities.ProductReservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<decimal>("Quantity")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("StorageId")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("ProductReservations");
                });

            modelBuilder.Entity("BikeShop.Products.Domain.Entities.ProductSerialNumber", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<string>("SerialNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("ProductSerialNumbers");
                });

            modelBuilder.Entity("BikeShop.Products.Domain.Entities.ProductStorageMove", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("CatalogKey")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<decimal>("DealerPrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<decimal>("IncomePrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<string>("MoveDirection")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("PriceCurrencyId")
                        .HasColumnType("int");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<string>("ProductMoveSource")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ProductName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("Quantity")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("QuantityUnitId")
                        .HasColumnType("int");

                    b.Property<decimal>("RetailPrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("SourceId")
                        .HasColumnType("int");

                    b.Property<int>("StorageId")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("ProductStorageMoves");
                });

            modelBuilder.Entity("BikeShop.Products.Domain.Entities.ProductStoragesTtansition", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("MovingFromSkladId")
                        .HasColumnType("int");

                    b.Property<int>("MovingToSkladId")
                        .HasColumnType("int");

                    b.Property<string>("PSTStatus")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<decimal>("Quantity")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("ProductStoragesTtansitions");
                });

            modelBuilder.Entity("BikeShop.Products.Domain.Entities.QuantityUnit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal>("BaseCoeficient")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("GroupId")
                        .HasColumnType("int");

                    b.Property<string>("GroupName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("IsDefaultInGroup")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsSplittable")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsSwitchable")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("QuantityUnits");
                });

            modelBuilder.Entity("BikeShop.Products.Domain.Entities.QuantityUnitGroup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("QuantityUnitGroups");
                });

            modelBuilder.Entity("BikeShop.Products.Domain.Entities.Storage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsOutsource")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("SupplyDelay")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Storages");
                });

            modelBuilder.Entity("BikeShop.Products.Domain.Entities.StorageProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<decimal>("Quantity")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("StorageId")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("StorageProducts");
                });

            modelBuilder.Entity("BikeShop.Products.Domain.Entities.TagToCategoryBind", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("CategoryName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("TagId")
                        .HasColumnType("int");

                    b.Property<string>("TagName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("TagToCategoryBinds");
                });

            modelBuilder.Entity("BikeShop.Products.Domain.Entities.Product", b =>
                {
                    b.HasOne("BikeShop.Products.Domain.Entities.Brand", "Brand")
                        .WithMany()
                        .HasForeignKey("BrandId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Brand");
                });
#pragma warning restore 612, 618
        }
    }
}
