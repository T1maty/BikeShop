using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BikeShop.Identity.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Date : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "Users",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Updated",
                table: "Users",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2efbfed0-c825-4dbb-84ba-cf12156261ed", null, "superemployee", "SUPEREMPLOYEE" },
                    { "a2b8095c-f1da-413d-a004-f35ef700aac4", null, "employee", "EMPLOYEE" },
                    { "c980664a-2d25-42ae-a2c8-4fac8390ab19", null, "user", "USER" },
                    { "e7ba5fad-042e-4b54-9656-22158e864681", null, "admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "2efbfed0-c825-4dbb-84ba-cf12156261ed");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "a2b8095c-f1da-413d-a004-f35ef700aac4");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "c980664a-2d25-42ae-a2c8-4fac8390ab19");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "e7ba5fad-042e-4b54-9656-22158e864681");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Updated",
                table: "Users");

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
    }
}
