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

router.get("/", get);

module.exports = router;
