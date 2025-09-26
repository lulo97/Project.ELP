const express = require("express");
const router = express.Router();
const { executeSelect } = require("../../database/execute.js");

async function get(req, res, next) {
    try {
        // 1. Overview counts
        const overviewSql = `
      SELECT
        (SELECT COUNT(*) FROM words) AS total_words,
        (SELECT COUNT(*) FROM meanings) AS total_meanings,
        (SELECT COUNT(*) FROM examples) AS total_examples,
        (SELECT COUNT(*) FROM phrases) AS total_phrases,
        (SELECT COUNT(*) FROM idioms) AS total_idioms,
        (SELECT COUNT(*) FROM writing_questions) AS total_writing_questions
    `;
        const overview = await executeSelect({ sql: overviewSql });

        // 2. Latest 5 words with meanings
        const latestWordsSql = `
      SELECT w.word, m.meaning, p.name AS part_of_speech
      FROM words w
      JOIN meanings m ON w.word = m.word
      JOIN part_of_speechs p ON m.part_of_speech = p.id
      ORDER BY w.id DESC
      LIMIT 5
    `;
        const latestWords = await executeSelect({ sql: latestWordsSql });

        // 3. Latest 5 examples
        const latestExamplesSql = `
      SELECT e.word, e.example, p.name AS part_of_speech
      FROM examples e
      JOIN part_of_speechs p ON e.part_of_speech = p.id
      ORDER BY e.id DESC
      LIMIT 5
    `;
        const latestExamples = await executeSelect({ sql: latestExamplesSql });

        // 4. Latest 5 phrases
        const latestPhrasesSql = `
      SELECT phrase, meaning, example
      FROM phrases
      ORDER BY id DESC
      LIMIT 5
    `;
        const latestPhrases = await executeSelect({ sql: latestPhrasesSql });

        // 5. Latest 5 idioms
        const latestIdiomsSql = `
      SELECT idiom, meaning, example
      FROM idioms
      ORDER BY id DESC
      LIMIT 5
    `;
        const latestIdioms = await executeSelect({ sql: latestIdiomsSql });

        // 6. Latest 5 writing questions with sample answer
        const latestWritingSql = `
      SELECT q.question, a.answer
      FROM writing_questions q
      LEFT JOIN writing_answers a ON q.id = a.question_id
      ORDER BY q.id DESC
      LIMIT 5
    `;
        const latestWriting = await executeSelect({ sql: latestWritingSql });

        // Send combined response
        res.json({
            data: {
                overview: overview[0],
                latestWords,
                latestExamples,
                latestPhrases,
                latestIdioms,
                latestWriting,
            },
            error: null,
        });
    } catch (err) {
        next(err);
    }
}

router.get("/", get);

module.exports = router;
