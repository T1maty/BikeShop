using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BikeShop.Identity.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Bike : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "00eb1fba-fefb-4cce-9be3-9db2c568c321");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "29d0e989-c00a-4ae7-875f-d8c869ce4e2f");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "5dd171d6-5e46-42ff-aef8-16b80a53c326");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "d09d77f9-86a4-4189-9baf-ee72d507cdb6");

            migrationBuilder.DropColumn(
                name: "BalanceCurrencyId",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "Bike",
                table: "Users",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0ad7bb78-51bd-4e05-bb7f-b9eb690cde1c", null, "admin", "ADMIN" },
                    { "41f53b1b-461c-4978-93e1-d14243e4c3ae", null, "superemployee", "SUPEREMPLOYEE" },
                    { "c39f53e2-140c-4f77-8184-1e19f490d2b0", null, "employee", "EMPLOYEE" },
                    { "d33f9801-74e9-4dc9-86d4-f41cd282a08e", null, "user", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "0ad7bb78-51bd-4e05-bb7f-b9eb690cde1c");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "41f53b1b-461c-4978-93e1-d14243e4c3ae");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "c39f53e2-140c-4f77-8184-1e19f490d2b0");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "d33f9801-74e9-4dc9-86d4-f41cd282a08e");

            migrationBuilder.DropColumn(
                name: "Bike",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "BalanceCurrencyId",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "00eb1fba-fefb-4cce-9be3-9db2c568c321", null, "superemployee", "SUPEREMPLOYEE" },
                    { "29d0e989-c00a-4ae7-875f-d8c869ce4e2f", null, "admin", "ADMIN" },
                    { "5dd171d6-5e46-42ff-aef8-16b80a53c326", null, "employee", "EMPLOYEE" },
                    { "d09d77f9-86a4-4189-9baf-ee72d507cdb6", null, "user", "USER" }
                });
        }
    }
}
