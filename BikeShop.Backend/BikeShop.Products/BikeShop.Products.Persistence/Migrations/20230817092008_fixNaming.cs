using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BikeShop.Products.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class fixNaming : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProdictId",
                table: "ProductFilterBinds",
                newName: "ProductId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "ProductFilterBinds",
                newName: "ProdictId");
        }
    }
}
