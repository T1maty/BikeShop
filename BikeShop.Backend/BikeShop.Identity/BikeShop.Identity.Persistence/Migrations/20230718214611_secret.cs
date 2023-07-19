using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BikeShop.Identity.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class secret : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "4acf0ce6-c7a9-4afb-8ed0-036b8564b2aa");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "76734c74-a6b0-4348-9670-91cd04a1ea1d");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "d493d439-9ac9-453a-9705-019ca1eb9634");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "df4e54ff-dfe3-493e-9c6c-5da2ce847806");

            migrationBuilder.AddColumn<string>(
                name: "Secret",
                table: "Users",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                name: "Secret",
                table: "Users");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4acf0ce6-c7a9-4afb-8ed0-036b8564b2aa", null, "superemployee", "SUPEREMPLOYEE" },
                    { "76734c74-a6b0-4348-9670-91cd04a1ea1d", null, "user", "USER" },
                    { "d493d439-9ac9-453a-9705-019ca1eb9634", null, "employee", "EMPLOYEE" },
                    { "df4e54ff-dfe3-493e-9c6c-5da2ce847806", null, "admin", "ADMIN" }
                });
        }
    }
}
