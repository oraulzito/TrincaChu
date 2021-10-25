using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TrincaChu.Migrations
{
    public partial class AddPropertyToConfirmPresence : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TotalPerAteendeeWithDrink",
                table: "Event",
                newName: "TotalPerAteendeeWithoutAlcoholicDrink");

            migrationBuilder.AddColumn<DateTime>(
                name: "ConfirmPresenceUntilDateTime",
                table: "Event",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConfirmPresenceUntilDateTime",
                table: "Event");

            migrationBuilder.RenameColumn(
                name: "TotalPerAteendeeWithoutAlcoholicDrink",
                table: "Event",
                newName: "TotalPerAteendeeWithDrink");
        }
    }
}
