using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BikeShop.Identity.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UserSocial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<DateTime>(
                name: "Birth",
                table: "Users",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FacebookId",
                table: "Users",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "Users",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "GoogleId",
                table: "Users",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Language",
                table: "Users",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "355a4180-5b64-4e7c-a297-36fa5c17372d", null, "superemployee", "SUPEREMPLOYEE" },
                    { "5f28774a-3db5-45bd-8383-2f770713c6cb", null, "user", "USER" },
                    { "a42a871d-fbf0-4632-9433-7bc3ca43cde4", null, "admin", "ADMIN" },
                    { "d9fc40ef-2e37-4645-8cdc-64adb54dc82a", null, "employee", "EMPLOYEE" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "355a4180-5b64-4e7c-a297-36fa5c17372d");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "5f28774a-3db5-45bd-8383-2f770713c6cb");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "a42a871d-fbf0-4632-9433-7bc3ca43cde4");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "d9fc40ef-2e37-4645-8cdc-64adb54dc82a");

            migrationBuilder.DropColumn(
                name: "Birth",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "FacebookId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "GoogleId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Language",
                table: "Users");

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
    }
}
