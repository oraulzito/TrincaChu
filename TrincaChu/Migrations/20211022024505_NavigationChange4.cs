using Microsoft.EntityFrameworkCore.Migrations;

namespace TrincaChu.Migrations
{
    public partial class NavigationChange4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_EventAttendees",
                table: "EventAttendees");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EventAttendees",
                table: "EventAttendees",
                columns: new[] { "AttendeeId", "EventId" });

            migrationBuilder.CreateIndex(
                name: "IX_EventItens_ItemId",
                table: "EventItens",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_EventAttendees_EventId",
                table: "EventAttendees",
                column: "EventId");

            migrationBuilder.AddForeignKey(
                name: "FK_EventAttendees_User_AttendeeId",
                table: "EventAttendees",
                column: "AttendeeId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EventItens_Item_ItemId",
                table: "EventItens",
                column: "ItemId",
                principalTable: "Item",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventAttendees_User_AttendeeId",
                table: "EventAttendees");

            migrationBuilder.DropForeignKey(
                name: "FK_EventItens_Item_ItemId",
                table: "EventItens");

            migrationBuilder.DropIndex(
                name: "IX_EventItens_ItemId",
                table: "EventItens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EventAttendees",
                table: "EventAttendees");

            migrationBuilder.DropIndex(
                name: "IX_EventAttendees_EventId",
                table: "EventAttendees");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EventAttendees",
                table: "EventAttendees",
                columns: new[] { "EventId", "AttendeeId" });
        }
    }
}
