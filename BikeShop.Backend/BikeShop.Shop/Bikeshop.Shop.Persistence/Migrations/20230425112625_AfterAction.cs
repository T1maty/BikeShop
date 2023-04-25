using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bikeshop.Shop.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AfterAction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "AfterActionCash",
                table: "CashboxHistories",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "AfterActionTerminal",
                table: "CashboxHistories",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AfterActionCash",
                table: "CashboxHistories");

            migrationBuilder.DropColumn(
                name: "AfterActionTerminal",
                table: "CashboxHistories");
        }
    }
}
