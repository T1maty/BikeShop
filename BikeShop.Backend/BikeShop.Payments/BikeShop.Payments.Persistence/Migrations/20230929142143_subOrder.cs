using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BikeShop.Payments.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class subOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPrePay",
                table: "Orders",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPrePay",
                table: "Orders");
        }
    }
}
