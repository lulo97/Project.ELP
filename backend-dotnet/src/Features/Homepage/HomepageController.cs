using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Utils;

namespace Controller
{
    [ApiController]
    [Route("api/homepage")]
    public class HomepageController : ControllerBase
    {
        private readonly DbContextOptions<AppDbContext> _dbOptions;

        public HomepageController(DbContextOptions<AppDbContext> dbOptions)
        {
            _dbOptions = dbOptions;
        }

        [HttpGet]
        public async Task<ApiResponse<object?>> Get()
        {

                // 1. Overview counts
                var overviewSql = @"
                    SELECT
                        (SELECT COUNT(*) FROM words) AS total_words,
                        (SELECT COUNT(*) FROM meanings) AS total_meanings,
                        (SELECT COUNT(*) FROM examples) AS total_examples,
                        (SELECT COUNT(*) FROM phrases) AS total_phrases,
                        (SELECT COUNT(*) FROM idioms) AS total_idioms,
                        (SELECT COUNT(*) FROM writing_questions) AS total_writing_questions
                ";
                var overview = await DbHelper.ExecuteQueryAsync(_dbOptions, overviewSql);

                // 2. Latest 5 words with meanings
                var latestWordsSql = @"
                    SELECT w.word, m.meaning, p.name AS part_of_speech
                    FROM words w
                    JOIN meanings m ON w.word = m.word
                    JOIN part_of_speechs p ON m.part_of_speech = p.id
                    ORDER BY w.id DESC
                    LIMIT 5
                ";
                var latestWords = await DbHelper.ExecuteQueryAsync(_dbOptions, latestWordsSql);

                // 3. Latest 5 examples
                var latestExamplesSql = @"
                    SELECT e.word, e.example, p.name AS part_of_speech
                    FROM examples e
                    JOIN part_of_speechs p ON e.part_of_speech = p.id
                    ORDER BY e.id DESC
                    LIMIT 5
                ";
                var latestExamples = await DbHelper.ExecuteQueryAsync(_dbOptions, latestExamplesSql);

                // 4. Latest 5 phrases
                var latestPhrasesSql = @"
                    SELECT phrase, meaning, example
                    FROM phrases
                    ORDER BY id DESC
                    LIMIT 5
                ";
                var latestPhrases = await DbHelper.ExecuteQueryAsync(_dbOptions, latestPhrasesSql);

                // 5. Latest 5 idioms
                var latestIdiomsSql = @"
                    SELECT idiom, meaning, example
                    FROM idioms
                    ORDER BY id DESC
                    LIMIT 5
                ";
                var latestIdioms = await DbHelper.ExecuteQueryAsync(_dbOptions, latestIdiomsSql);

                // 6. Latest 5 writing questions with sample answer
                var latestWritingSql = @"
                    SELECT q.question, a.answer
                    FROM writing_questions q
                    LEFT JOIN writing_answers a ON q.id = a.question_id
                    ORDER BY q.id DESC
                    LIMIT 5
                ";
                var latestWriting = await DbHelper.ExecuteQueryAsync(_dbOptions, latestWritingSql);

                // Combine response
                var result = new
                {
                    overview = overview.FirstOrDefault(),
                    latestWords,
                    latestExamples,
                    latestPhrases,
                    latestIdioms,
                    latestWriting
                };

                return ApiResponse<object?>.Ok(result);
            
        }
    }
}
