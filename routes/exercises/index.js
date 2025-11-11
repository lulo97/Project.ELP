const express = require("express");
const { executeSelect } = require("../../database/execute.js");
const {
  splitParagraphIntoSentences,
} = require("../../utils/splitParagraphIntoSentences.js");

const router = express.Router();

async function getMultipleChoiceQuestion(req, res, next) {
  let sql = `
SELECT 
  w.word, 
  m.meaning,
  m.part_of_speech
FROM words w
LEFT JOIN meanings m 
  ON w.word = m.word
WHERE m.meaning IS NOT NULL 
  AND m.part_of_speech IS NOT NULL
ORDER BY w.word, m.part_of_speech;
    `;

  let result = await executeSelect({ sql });

  res.json({ data: result, error: null });
}

async function getFillInBlank(req, res, next) {
  async function getSentences() {
    let sql = `
SELECT 
  string_agg(source, E'\\n') AS data
FROM sources;
    `;

    let result = await executeSelect({ sql: sql });

    const sentences = splitParagraphIntoSentences(result[0].data);

    return sentences;
  }

  const sentences = await getSentences();

  async function getAllWords() {
    let sql = `
SELECT 
  w.word,
  json_agg(
    json_build_object(
      'meaning', m.meaning,
      'part_of_speech', pos.name
    )
  ) AS meanings
FROM words w
JOIN meanings m ON w.word = m.word
JOIN part_of_speechs pos ON pos.id = m.part_of_speech
GROUP BY w.word;
    `;
    let result = await executeSelect({ sql: sql });
    return result;
  }

  const words = await getAllWords();

  const randomWord = words[Math.floor(Math.random() * words.length)];

  const selectedSentence = sentences.find((s) => {
    return s.toLowerCase().includes(randomWord.word.toLowerCase());
  });

  if (!selectedSentence) {
    return res.json({
      data: null,
      error: "Can't find sentence for word = " + randomWord.word,
    });
  }

  let result = {
    sentence: selectedSentence,
    word: randomWord.word,
    meanings: randomWord.meanings, // Already JSON from json_agg
  };

  res.json({ data: result, error: null });
}

router.get("/mcq", getMultipleChoiceQuestion);
router.get("/fillInBlank", getFillInBlank);

module.exports = router;
