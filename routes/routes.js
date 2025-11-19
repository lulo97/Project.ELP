const todos = require("./todos/index.js");
const words = require("./words/index.js");
const sources = require("./sources/index.js");
const meanings = require("./meanings/index.js");
const part_of_speechs = require("./part_of_speechs/index.js");
const examples = require("./examples/index.js");
const tts = require("./tts/index.js");
const phrases = require("./phrases/index.js");
const exercises = require("./exercises/index.js");
const writing_questions = require("./writing_questions/index.js");
const writing_answers = require("./writing_answers/index.js");
const idioms = require("./idioms/index.js");
const homepage = require("./homepage/index.js");
const stt = require("./stt/index.js");
const speakings = require("./speakings/index.js");
const speaking_scores = require("./speaking_scores/index.js");
const redis = require("./redis/index.js");
const synonyms = require("./synonyms/index.js");
const posts = require("./posts/index.js");
const source_translates = require("./source_translates/index.js");
const word_details = require("./word_details/index.js");
const ai = require("./ai/index.js");
const events = require("./events/index.js");
const auth = require("./auth/index.js");
const read = require("./read/index.js");
const youtube = require("./youtube/index.js");
const prompts = require("./prompts/index.js");
const model_informations = require("./model_informations/index.js");
const consts = require("./consts/index.js");

const routes = [
  {
    path: "/api/helloworld",
    handler: (req, res) => res.json({ message: "Hello World" }),
  },
  { path: "/api/todos", handler: todos },
  { path: "/api/words", handler: words },
  { path: "/api/sources", handler: sources },
  { path: "/api/meanings", handler: meanings },
  { path: "/api/part_of_speechs", handler: part_of_speechs },
  { path: "/api/examples", handler: examples },
  { path: "/api/tts", handler: tts },
  { path: "/api/phrases", handler: phrases },
  { path: "/api/exercises", handler: exercises },
  { path: "/api/writing_questions", handler: writing_questions },
  { path: "/api/writing_answers", handler: writing_answers },
  { path: "/api/idioms", handler: idioms },
  { path: "/api/homepage", handler: homepage },
  { path: "/api/stt", handler: stt },
  { path: "/api/speakings", handler: speakings },
  { path: "/api/speaking_scores", handler: speaking_scores },
  { path: "/api/redis", handler: redis },
  { path: "/api/synonyms", handler: synonyms },
  { path: "/api/posts", handler: posts },
  { path: "/api/source_translates", handler: source_translates },
  { path: "/api/word_details", handler: word_details },
  { path: "/api/ai", handler: ai },
  { path: "/api/events", handler: events },
  { path: "/api/auth", handler: auth },
  { path: "/api/read", handler: read },
  { path: "/api/youtube", handler: youtube },
  { path: "/api/prompts", handler: prompts },
  { path: "/api/model_informations", handler: model_informations },
  { path: "/api/consts", handler: consts },
];

module.exports = function (app) {
  routes.forEach((r) => {
    app.use(r.path, r.handler);
  });

  app.use("/api/{*any}", (req, res) => {
    return res.json({
      error: "Unknown route!",
      unknownRoute: req.originalUrl,
    });
  });
};

module.exports.routes = routes;
