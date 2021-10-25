using Microsoft.EntityFrameworkCore.Migrations;

namespace TrincaChu.Migrations
{
    public partial class NavigationChange3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropIndex(
                name: "IX_EventAttendees_AttendeeId",
                table: "EventAttendees");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_EventItens_ItemId",
                table: "EventItens",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_EventAttendees_AttendeeId",
                table: "EventAttendees",
                column: "AttendeeId");

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
    }
}
