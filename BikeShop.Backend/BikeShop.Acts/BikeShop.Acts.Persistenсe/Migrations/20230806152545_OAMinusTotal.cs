using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BikeShop.Acts.Persistenсe.Migrations
{
    /// <inheritdoc />
    public partial class OAMinusTotal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Total",
                table: "OutcomeActs");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Total",
                table: "OutcomeActs",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
