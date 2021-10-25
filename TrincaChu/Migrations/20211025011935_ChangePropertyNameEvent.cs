using Microsoft.EntityFrameworkCore.Migrations;

namespace TrincaChu.Migrations
{
    public partial class ChangePropertyNameEvent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TotalPerAteendeeWithoutAlcoholicDrink",
                table: "Event",
                newName: "TotalPerPersonWithoutAlcoholicDrink");

            migrationBuilder.RenameColumn(
                name: "TotalPerAteendeeWithAlcoholicDrink",
                table: "Event",
                newName: "TotalPerPersonWithAlcoholicDrink");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TotalPerPersonWithoutAlcoholicDrink",
                table: "Event",
                newName: "TotalPerAteendeeWithoutAlcoholicDrink");

            migrationBuilder.RenameColumn(
                name: "TotalPerPersonWithAlcoholicDrink",
                table: "Event",
                newName: "TotalPerAteendeeWithAlcoholicDrink");
        }
    }
}
