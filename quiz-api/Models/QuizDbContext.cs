using Microsoft.EntityFrameworkCore;

namespace quiz_api.Models;

public class QuizDbContext : DbContext
{
  public QuizDbContext(DbContextOptions<QuizDbContext> options) : base(options)
  {

  }

  public DbSet<Question> Questions { get; set; }
}