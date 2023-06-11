
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using quiz_api.Models;

namespace quiz_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class QuestionController : ControllerBase
{
  private readonly QuizDbContext _context;

  public QuestionController(QuizDbContext context)
  {
    _context = context;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
  {
    var randomQuestions = await (_context.Questions
    .Select(x => new
    {
      QuestionId = x.QuestionId,
      QuestionInWords = x.QuestionInWords,
      Options = new string[] { x.Option1, x.Option2, x.Option3, x.Option4 }
    })
    .OrderBy(y => Guid.NewGuid())
    .Take(5)
    ).ToListAsync();
    return Ok(randomQuestions);
  }
  [HttpPost]
  [Route("RetrieveAnswers")]
  public async Task<ActionResult<Question>> RetrieveAnswers(int[] questionIds)
  {
    var answers = await (_context.Questions
      .Where(x => questionIds.Contains(x.QuestionId))
      .Select(y => new
      {
        QuestionId = y.QuestionId,
        QuestionInWords = y.QuestionInWords,
        Options = new string[] { y.Option1, y.Option2, y.Option3, y.Option4 },
        Answer = y.Answer
      }))
      .ToListAsync();
    return Ok(answers);
  }
}