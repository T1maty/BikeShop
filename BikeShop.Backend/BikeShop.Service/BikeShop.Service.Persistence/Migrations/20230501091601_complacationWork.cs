using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BikeShop.Service.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class complacationWork : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "ComplicationPrice",
                table: "ServiceWorks",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ComplicationPrice",
                table: "ServiceWorks");

            migrationBuilder.UpdateData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ClientId", "CreatedAt", "UpdatedAt", "UserCreatedId", "UserDeletedId", "UserMasterId" },
                values: new object[] { new Guid("23998046-18e1-4126-851d-c53a07234108"), new DateTime(2023, 4, 26, 12, 20, 9, 679, DateTimeKind.Local).AddTicks(4658), new DateTime(2023, 4, 26, 12, 20, 9, 679, DateTimeKind.Local).AddTicks(4662), new Guid("1e36f5d6-8974-47bb-b467-aecc55231876"), new Guid("8414ab3e-6383-4d16-9df4-882c4b19cd30"), new Guid("dbedd8a3-4beb-44c1-8d82-bae478211ad3") });

            migrationBuilder.UpdateData(
                table: "WorkGroups",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 26, 12, 20, 9, 679, DateTimeKind.Local).AddTicks(4210), new DateTime(2023, 4, 26, 12, 20, 9, 679, DateTimeKind.Local).AddTicks(4263) });

            migrationBuilder.UpdateData(
                table: "WorkGroups",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 26, 12, 20, 9, 679, DateTimeKind.Local).AddTicks(4268), new DateTime(2023, 4, 26, 12, 20, 9, 679, DateTimeKind.Local).AddTicks(4269) });

            migrationBuilder.UpdateData(
                table: "WorkGroups",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 26, 12, 20, 9, 679, DateTimeKind.Local).AddTicks(4272), new DateTime(2023, 4, 26, 12, 20, 9, 679, DateTimeKind.Local).AddTicks(4273) });

            migrationBuilder.UpdateData(
                table: "Works",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 26, 12, 20, 9, 679, DateTimeKind.Local).AddTicks(4602), new DateTime(2023, 4, 26, 12, 20, 9, 679, DateTimeKind.Local).AddTicks(4610) });

            migrationBuilder.UpdateData(
                table: "Works",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 26, 12, 20, 9, 679, DateTimeKind.Local).AddTicks(4614), new DateTime(2023, 4, 26, 12, 20, 9, 679, DateTimeKind.Local).AddTicks(4616) });

            migrationBuilder.UpdateData(
                table: "Works",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 26, 12, 20, 9, 679, DateTimeKind.Local).AddTicks(4619), new DateTime(2023, 4, 26, 12, 20, 9, 679, DateTimeKind.Local).AddTicks(4620) });
        }
    }
}
