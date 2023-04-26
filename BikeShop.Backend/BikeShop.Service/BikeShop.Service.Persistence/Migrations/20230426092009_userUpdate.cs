using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BikeShop.Service.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class userUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserUpdatedId",
                table: "Services",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.UpdateData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ClientId", "CreatedAt", "UpdatedAt", "UserCreatedId", "UserDeletedId", "UserMasterId", "UserUpdatedId" },
                values: new object[] { new Guid("23998046-18e1-4126-851d-c53a07234108"), new DateTime(2023, 4, 26, 12, 20, 9, 679, DateTimeKind.Local).AddTicks(4658), new DateTime(2023, 4, 26, 12, 20, 9, 679, DateTimeKind.Local).AddTicks(4662), new Guid("1e36f5d6-8974-47bb-b467-aecc55231876"), new Guid("8414ab3e-6383-4d16-9df4-882c4b19cd30"), new Guid("dbedd8a3-4beb-44c1-8d82-bae478211ad3"), new Guid("00000000-0000-0000-0000-000000000000") });

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserUpdatedId",
                table: "Services");

            migrationBuilder.UpdateData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ClientId", "CreatedAt", "UpdatedAt", "UserCreatedId", "UserDeletedId", "UserMasterId" },
                values: new object[] { new Guid("f0095141-8d71-410b-8f36-808c68551b86"), new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3796), new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3801), new Guid("9a23615b-7203-45b1-b125-9c4cc4f5880f"), new Guid("01ce7318-4774-4a31-9442-4571a4c981d4"), new Guid("8e5b11a5-4bf3-4346-9499-62af0959f547") });

            migrationBuilder.UpdateData(
                table: "WorkGroups",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3343), new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3413) });

            migrationBuilder.UpdateData(
                table: "WorkGroups",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3426), new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3433) });

            migrationBuilder.UpdateData(
                table: "WorkGroups",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3436), new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3438) });

            migrationBuilder.UpdateData(
                table: "Works",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3700), new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3708) });

            migrationBuilder.UpdateData(
                table: "Works",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3713), new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3734) });

            migrationBuilder.UpdateData(
                table: "Works",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3738), new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3740) });
        }
    }
}
