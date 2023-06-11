using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace quiz_api.Migrations
{
  public partial class InitialDb : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {

      migrationBuilder.CreateTable(
          name: "Questions",
          columns: table => new
          {
            QuestionId = table.Column<int>(type: "int", nullable: false)
                  .Annotation("SqlServer:Identity", "1, 1"),
            QuestionInWords = table.Column<string>(type: "nvarchar(250)", nullable: true),
            Option1 = table.Column<string>(type: "nvarchar(50)", nullable: true),
            Option2 = table.Column<string>(type: "nvarchar(50)", nullable: true),
            Option3 = table.Column<string>(type: "nvarchar(50)", nullable: true),
            Option4 = table.Column<string>(type: "nvarchar(50)", nullable: true),
            Answer = table.Column<int>(type: "int", nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_Questions", x => x.QuestionId);
          });
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropTable(
          name: "Questions");
    }
  }
}
