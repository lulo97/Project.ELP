const express = require("express");
const { applyCorrections } = require("../../utils/applyCorrections");
const router = express.Router();

async function get(req, res, next) {
  const { text } = req.query;

  const grammarHost = process.env.GRAMMAR_HOST || "http://localhost:3002/v2/check";

  const params = new URLSearchParams();
  params.append("language", "en-US");
  params.append("text", text);

  const result_grammar = await fetch(grammarHost, {
    method: "POST",
    body: params, // correctly encoded
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  const result_grammar_json = await result_grammar.json();

  const matches = result_grammar_json.matches || [];

  const correct_text = applyCorrections(text, matches);

  res.json({ data: { correct_text: correct_text, matches: matches }, error: null });
}

async function getOllama(req, res, next) {
  try {
    const { text } = req.query;

    if (!text) {
      return res.status(400).json({ error: "Missing 'text' query parameter" });
    }

    const ollamaHost = process.env.OLLAMA_HOST || "http://localhost:5001/api/generate";

    const response = await fetch(ollamaHost, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gnokit/improve-grammar",
        prompt: text,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const resultJson = await response.json();

    // Ollama returns corrected text in `response` field
    const correctedText = resultJson.response || "";

    res.json({ data: { correct_text: correctedText }, error: null });
  } catch (error) {
    next(error);
  }
}


router.get("/", getOllama);

module.exports = router;
