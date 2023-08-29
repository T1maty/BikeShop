using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BikeShop.Payments.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Discount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BindToTargetId",
                table: "Discounts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsPersonal",
                table: "Discounts",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Target",
                table: "Discounts",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BindToTargetId",
                table: "Discounts");

            migrationBuilder.DropColumn(
                name: "IsPersonal",
                table: "Discounts");

            migrationBuilder.DropColumn(
                name: "Target",
                table: "Discounts");
        }
    }
}
