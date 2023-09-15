using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bikeshop.Shop.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ScheduleShopId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ShopId",
                table: "ScheduleItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ShopId",
                table: "ScheduleHistories",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShopId",
                table: "ScheduleItems");

            migrationBuilder.DropColumn(
                name: "ShopId",
                table: "ScheduleHistories");
        }
    }
}
