using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BikeShop.Identity.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class isEmployee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "006f62a9-fc0f-4d06-a8d8-a9aa2c364af2");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "314dc3c6-efc6-4f6e-9a83-7d1c8bf5902e");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "3cc9fac0-8b33-43c1-a1eb-f68cd3a1efc9");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "f155136b-53ea-4412-8097-ae1cb0231a26");

            migrationBuilder.AddColumn<bool>(
                name: "IsEmployee",
                table: "Users",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "06e3bf99-eb2f-47a6-a0a8-489e2d5509e0", null, "employee", "EMPLOYEE" },
                    { "67ba3454-bac5-4441-9582-7a916a478248", null, "superemployee", "SUPEREMPLOYEE" },
                    { "77eee587-dbb1-4bc0-863f-26e71df33bf7", null, "admin", "ADMIN" },
                    { "8ac1ef93-84fa-44bb-a952-40583281317d", null, "user", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "06e3bf99-eb2f-47a6-a0a8-489e2d5509e0");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "67ba3454-bac5-4441-9582-7a916a478248");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "77eee587-dbb1-4bc0-863f-26e71df33bf7");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "8ac1ef93-84fa-44bb-a952-40583281317d");

            migrationBuilder.DropColumn(
                name: "IsEmployee",
                table: "Users");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "006f62a9-fc0f-4d06-a8d8-a9aa2c364af2", null, "user", "USER" },
                    { "314dc3c6-efc6-4f6e-9a83-7d1c8bf5902e", null, "superemployee", "SUPEREMPLOYEE" },
                    { "3cc9fac0-8b33-43c1-a1eb-f68cd3a1efc9", null, "employee", "EMPLOYEE" },
                    { "f155136b-53ea-4412-8097-ae1cb0231a26", null, "admin", "ADMIN" }
                });
        }
    }
}
