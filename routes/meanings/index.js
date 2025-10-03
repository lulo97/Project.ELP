const express = require("express");
const { executeSelect, execute } = require("../../database/execute.js");
const { getRandomId } = require("../../utils/getRandomId.js");
const { paginationMiddleware } = require("../../middleware/paginationMiddleware.js")

const router = express.Router();

async function getMeanings(req, res, next) {
  const { meaning, word, part_of_speech, where_options } = req.query;

  let _where_options;
  if (where_options) {
    _where_options = JSON.parse(where_options)
  }

  let sql = "SELECT * FROM MEANINGS";
  const params = [];
  const conditions = [];

  if (meaning) {
    conditions.push("meaning LIKE ?");
    params.push(`%${meaning}%`);
  }

  if (word) {
    if (_where_options && _where_options.word && _where_options.word.comparisonOperation == '=') {
      conditions.push("word = ?");
      params.push(`${word}`);
    } else {
      conditions.push("word LIKE ?");
      params.push(`%${word}%`);
    }
  }

  if (part_of_speech) {
    conditions.push("part_of_speech LIKE ?");
    params.push(`%${part_of_speech}%`);
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }


  sql += " ORDER BY CAST(id AS UNSIGNED) desc";
  const result = await executeSelect({ sql, params });

  res.locals.data = result;
  res.locals.error = null;

  next();
}


async function getMeaningsForTooltip(req, res, next) {
  let sql = `
SELECT 
    json_object(
        'word', w.word,
        'meanings', json_group_array(
            json_object(
                'part_of_speech', pos.name,
                'meaning', m.meaning
            )
        )
    ) AS data
FROM Words w
JOIN Meanings m ON m.word = w.word
JOIN part_of_speechs pos on pos.id = m.part_of_speech
GROUP BY w.word;
    `;

  let result = await executeSelect({ sql });

  result = result.map(ele => JSON.parse(ele.data))

  res.json({ data: result, error: null });
};

async function addMeaning(req, res, next) {
  const { meaning, word, part_of_speech } = req.body;
  const id = getRandomId();
  const sql = "INSERT INTO MEANINGS (id, meaning, word, part_of_speech) VALUES (?, ?, ?, ?)";
  const result = await execute({ sql: sql, params: [id, meaning, word, part_of_speech] })
  res.json({ data: result, error: null });
}

async function updateMeaning(req, res, next) {
  const { id } = req.params;
  const { meaning, word, part_of_speech } = req.body;
  const sql = "UPDATE MEANINGS SET meaning = ?, word = ?, part_of_speech = ? WHERE id = ?";
  const result = await execute({ sql: sql, params: [meaning, word, part_of_speech, id] })
  res.json({ data: result, error: null });
}

async function deleteMeaning(req, res, next) {
  const { id } = req.params;
  const sql = "DELETE FROM MEANINGS WHERE id = ?";
  const result = await execute({ sql: sql, params: [id] })
  res.json({ data: result, error: null });
}

router.get("/", getMeanings, paginationMiddleware);

router.get("/forTooltip", getMeaningsForTooltip)

router.post("/", addMeaning);

router.put("/:id", updateMeaning);

router.delete("/:id", deleteMeaning);

module.exports = router;
