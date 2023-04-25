using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BikeShop.Products.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class priceHist : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PriceHistories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    OldIncomePrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    NewIncomePrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    OldRetailPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    NewRetailPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    OldDealerPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    NewDealerPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    UserChangedId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Enabled = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PriceHistories", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");
          
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Options");

            migrationBuilder.DropTable(
                name: "OptionVariants");

            migrationBuilder.DropTable(
                name: "PriceHistories");

            migrationBuilder.DropTable(
                name: "ProductBinds");

            migrationBuilder.DropTable(
                name: "ProductImgs");

            migrationBuilder.DropTable(
                name: "ProductOptionVariantBinds");

            migrationBuilder.DropTable(
                name: "ProductReservations");

            migrationBuilder.DropTable(
                name: "ProductsCards");

            migrationBuilder.DropTable(
                name: "ProductSerialNumbers");

            migrationBuilder.DropTable(
                name: "ProductSpecifications");

            migrationBuilder.DropTable(
                name: "ProductStorageMoves");

            migrationBuilder.DropTable(
                name: "ProductStoragesTtansitions");

            migrationBuilder.DropTable(
                name: "QuantityUnitGroups");

            migrationBuilder.DropTable(
                name: "QuantityUnits");

            migrationBuilder.DropTable(
                name: "Specifications");

            migrationBuilder.DropTable(
                name: "StorageProducts");

            migrationBuilder.DropTable(
                name: "Storages");

            migrationBuilder.DropTable(
                name: "TagToProductBinds");

            migrationBuilder.DropTable(
                name: "ProductTags");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Brands");
        }
    }
}
