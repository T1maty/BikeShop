using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BikeShop.Identity.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class balanceHistory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "UserBalanceActionHistories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ActionAmount = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    BeforeAction = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    AfterAction = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Enabled = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBalanceActionHistories", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserBalanceActionHistories");

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
    }
}
