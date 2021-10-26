using Microsoft.EntityFrameworkCore.Migrations;

namespace TrincaChu.Migrations
{
    public partial class WhereItWillHappenOnEvents : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "WhereItWillHappen",
                table: "Event",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WhereItWillHappen",
                table: "Event");
        }
    }
}
