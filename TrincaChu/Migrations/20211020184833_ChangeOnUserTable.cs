using Microsoft.EntityFrameworkCore.Migrations;

namespace TrincaChu.Migrations
{
    public partial class ChangeOnUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Admin",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Confirmed",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "User");

            migrationBuilder.AddColumn<bool>(
                name: "Admin",
                table: "EventAttendees",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Confirmed",
                table: "EventAttendees",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Admin",
                table: "EventAttendees");

            migrationBuilder.DropColumn(
                name: "Confirmed",
                table: "EventAttendees");

            migrationBuilder.AddColumn<bool>(
                name: "Admin",
                table: "User",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Confirmed",
                table: "User",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "User",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
