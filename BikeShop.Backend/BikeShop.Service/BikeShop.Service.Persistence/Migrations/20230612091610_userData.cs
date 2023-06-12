using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BikeShop.Service.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class userData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClientFIO",
                table: "Services",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ClientPhone",
                table: "Services",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "MasterFIO",
                table: "Services",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "MasterPhone",
                table: "Services",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "UserFIO",
                table: "Services",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "UserPhone",
                table: "Services",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ClientFIO", "ClientId", "ClientPhone", "CreatedAt", "MasterFIO", "MasterPhone", "UpdatedAt", "UserCreatedId", "UserDeletedId", "UserFIO", "UserMasterId", "UserPhone" },
                values: new object[] { "", new Guid("e12ead63-ba9c-40d0-a274-0cce8af0a04c"), "", new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6986), "", "", new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6990), new Guid("0a97afbf-364e-430e-8aae-9ca1ec294ac1"), new Guid("ea093099-b4e9-4bff-8be6-40187e0a06ea"), "", new Guid("e034bff3-50ed-4ab2-bd4d-b3ad947b12d4"), "" });

            migrationBuilder.UpdateData(
                table: "WorkGroups",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6660), new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6715) });

            migrationBuilder.UpdateData(
                table: "WorkGroups",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6721), new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6723) });

            migrationBuilder.UpdateData(
                table: "WorkGroups",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6725), new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6726) });

            migrationBuilder.UpdateData(
                table: "Works",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6936), new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6943) });

            migrationBuilder.UpdateData(
                table: "Works",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6947), new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6948) });

            migrationBuilder.UpdateData(
                table: "Works",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6951), new DateTime(2023, 6, 12, 12, 16, 10, 61, DateTimeKind.Local).AddTicks(6952) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientFIO",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "ClientPhone",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "MasterFIO",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "MasterPhone",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "UserFIO",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "UserPhone",
                table: "Services");

            migrationBuilder.UpdateData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ClientId", "CreatedAt", "UpdatedAt", "UserCreatedId", "UserDeletedId", "UserMasterId" },
                values: new object[] { new Guid("0d708728-2fa2-4733-95f8-2409447c6c9c"), new DateTime(2023, 5, 1, 12, 16, 1, 188, DateTimeKind.Local).AddTicks(4407), new DateTime(2023, 5, 1, 12, 16, 1, 188, DateTimeKind.Local).AddTicks(4413), new Guid("f445be01-05b8-4907-8ecb-3009134b4c93"), new Guid("4e60225e-fece-48c0-af00-0a14574758ad"), new Guid("2b1148a9-b629-4bbc-8dc7-35a953482600") });

            migrationBuilder.UpdateData(
                table: "WorkGroups",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 1, 12, 16, 1, 188, DateTimeKind.Local).AddTicks(3938), new DateTime(2023, 5, 1, 12, 16, 1, 188, DateTimeKind.Local).AddTicks(4011) });

            migrationBuilder.UpdateData(
                table: "WorkGroups",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 1, 12, 16, 1, 188, DateTimeKind.Local).AddTicks(4016), new DateTime(2023, 5, 1, 12, 16, 1, 188, DateTimeKind.Local).AddTicks(4019) });

            migrationBuilder.UpdateData(
                table: "WorkGroups",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 1, 12, 16, 1, 188, DateTimeKind.Local).AddTicks(4022), new DateTime(2023, 5, 1, 12, 16, 1, 188, DateTimeKind.Local).AddTicks(4034) });

            migrationBuilder.UpdateData(
                table: "Works",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 1, 12, 16, 1, 188, DateTimeKind.Local).AddTicks(4328), new DateTime(2023, 5, 1, 12, 16, 1, 188, DateTimeKind.Local).AddTicks(4342) });

            migrationBuilder.UpdateData(
                table: "Works",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 1, 12, 16, 1, 188, DateTimeKind.Local).AddTicks(4346), new DateTime(2023, 5, 1, 12, 16, 1, 188, DateTimeKind.Local).AddTicks(4348) });

            migrationBuilder.UpdateData(
                table: "Works",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 5, 1, 12, 16, 1, 188, DateTimeKind.Local).AddTicks(4356), new DateTime(2023, 5, 1, 12, 16, 1, 188, DateTimeKind.Local).AddTicks(4358) });
        }
    }
}
