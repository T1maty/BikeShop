using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bikeshop.Shop.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SchedulePlusShift : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<TimeSpan>(
                name: "FinishedSpan",
                table: "ScheduleItems",
                type: "time(6)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ShiftFirstStart",
                table: "ScheduleItems",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ShiftLastFinish",
                table: "ScheduleItems",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShiftStatus",
                table: "ScheduleItems",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FinishedSpan",
                table: "ScheduleItems");

            migrationBuilder.DropColumn(
                name: "ShiftFirstStart",
                table: "ScheduleItems");

            migrationBuilder.DropColumn(
                name: "ShiftLastFinish",
                table: "ScheduleItems");

            migrationBuilder.DropColumn(
                name: "ShiftStatus",
                table: "ScheduleItems");
        }
    }
}
