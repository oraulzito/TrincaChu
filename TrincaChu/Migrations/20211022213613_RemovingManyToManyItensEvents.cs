using Microsoft.EntityFrameworkCore.Migrations;

namespace TrincaChu.Migrations
{
    public partial class RemovingManyToManyItensEvents : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EventItens");

            migrationBuilder.RenameColumn(
                name: "CreatorId",
                table: "Item",
                newName: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_Item_EventId",
                table: "Item",
                column: "EventId");

            migrationBuilder.AddForeignKey(
                name: "FK_Item_Event_EventId",
                table: "Item",
                column: "EventId",
                principalTable: "Event",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Item_Event_EventId",
                table: "Item");

            migrationBuilder.DropIndex(
                name: "IX_Item_EventId",
                table: "Item");

            migrationBuilder.RenameColumn(
                name: "EventId",
                table: "Item",
                newName: "CreatorId");

            migrationBuilder.CreateTable(
                name: "EventItens",
                columns: table => new
                {
                    EventId = table.Column<long>(type: "bigint", nullable: false),
                    ItemId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventItens", x => new { x.EventId, x.ItemId });
                    table.ForeignKey(
                        name: "FK_EventItens_Event_EventId",
                        column: x => x.EventId,
                        principalTable: "Event",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventItens_Item_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Item",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EventItens_ItemId",
                table: "EventItens",
                column: "ItemId");
        }
    }
}
