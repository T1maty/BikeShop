using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BikeShop.Service.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ServiceProducts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    CatalogKey = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SerialNumber = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Quantity = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    QuantityUnitId = table.Column<int>(type: "int", nullable: false),
                    QuantityUnitName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Discount = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    ServiceId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Enabled = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceProducts", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Status = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ClientId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    ClientDescription = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserCreatedId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    UserCreatedDescription = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserMasterId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    UserMasterDescription = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserDeletedId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    WorkDiscountId = table.Column<int>(type: "int", nullable: false),
                    ProductDiscountId = table.Column<int>(type: "int", nullable: false),
                    PriceWork = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    DiscountWork = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    TotalWork = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    PriceProduct = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    DiscountProduct = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    TotalProduct = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Discount = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    ShopId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Enabled = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ServiceWorks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    WorkId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Discount = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    ServiceId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Enabled = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceWorks", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "WorkGroups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ParentId = table.Column<int>(type: "int", nullable: false),
                    IsCollapsed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ShopId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Enabled = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkGroups", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Works",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<double>(type: "double", nullable: false),
                    WorkGroupId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Enabled = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Works", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Works_WorkGroups_WorkGroupId",
                        column: x => x.WorkGroupId,
                        principalTable: "WorkGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Services",
                columns: new[] { "Id", "ClientDescription", "ClientId", "CreatedAt", "Discount", "DiscountProduct", "DiscountWork", "Enabled", "Name", "Price", "PriceProduct", "PriceWork", "ProductDiscountId", "ShopId", "Status", "Total", "TotalProduct", "TotalWork", "UpdatedAt", "UserCreatedDescription", "UserCreatedId", "UserDeletedId", "UserMasterDescription", "UserMasterId", "WorkDiscountId" },
                values: new object[] { 1, "desc", new Guid("f0095141-8d71-410b-8f36-808c68551b86"), new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3796), 500m, 500m, 500m, true, "First", 500m, 500m, 500m, 0, 1, "Waiting", 500m, 500m, 500m, new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3801), "desc", new Guid("9a23615b-7203-45b1-b125-9c4cc4f5880f"), new Guid("01ce7318-4774-4a31-9442-4571a4c981d4"), "desc", new Guid("8e5b11a5-4bf3-4346-9499-62af0959f547"), 0 });

            migrationBuilder.InsertData(
                table: "WorkGroups",
                columns: new[] { "Id", "CreatedAt", "Enabled", "IsCollapsed", "Name", "ParentId", "ShopId", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3343), true, true, "First work group", 0, 1, new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3413) },
                    { 2, new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3426), true, true, "Second work group", 0, 1, new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3433) },
                    { 3, new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3436), true, false, "First Child of first work group", 1, 1, new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3438) }
                });

            migrationBuilder.InsertData(
                table: "Works",
                columns: new[] { "Id", "CreatedAt", "Description", "Enabled", "Name", "Price", "UpdatedAt", "WorkGroupId" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3700), "Work description 1", true, "Work 1", 228.0, new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3708), 1 },
                    { 2, new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3713), "Work description 2", true, "Work 2", 300.0, new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3734), 1 },
                    { 3, new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3738), "Work description 3", true, "Work 3", 500.0, new DateTime(2023, 4, 26, 12, 17, 17, 317, DateTimeKind.Local).AddTicks(3740), 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Works_WorkGroupId",
                table: "Works",
                column: "WorkGroupId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ServiceProducts");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DropTable(
                name: "ServiceWorks");

            migrationBuilder.DropTable(
                name: "Works");

            migrationBuilder.DropTable(
                name: "WorkGroups");
        }
    }
}
