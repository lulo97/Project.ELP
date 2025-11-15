const path = require("path");

const routes = [
    { path: "/api/helloworld", handler: (req, res) => res.json({ message: "Hello World" }) },
    { path: "/api/todos", module: "./todos/index.js" },
    { path: "/api/words", module: "./words/index.js" },
    { path: "/api/sources", module: "./sources/index.js" },
    { path: "/api/meanings", module: "./meanings/index.js" },
    { path: "/api/part_of_speechs", module: "./part_of_speechs/index.js" },
    { path: "/api/examples", module: "./examples/index.js" },
    { path: "/api/tts", module: "./tts/index.js" },
    { path: "/api/phrases", module: "./phrases/index.js" },
    { path: "/api/exercises", module: "./exercises/index.js" },
    { path: "/api/writing_questions", module: "./writing_questions/index.js" },
    { path: "/api/writing_answers", module: "./writing_answers/index.js" },
    { path: "/api/idioms", module: "./idioms/index.js" },
    { path: "/api/homepage", module: "./homepage/index.js" },
    { path: "/api/stt", module: "./stt/index.js" },
    { path: "/api/speakings", module: "./speakings/index.js" },
    { path: "/api/speaking_scores", module: "./speaking_scores/index.js" },
    { path: "/api/redis", module: "./redis/index.js" },
    { path: "/api/synonyms", module: "./synonyms/index.js" },
    { path: "/api/posts", module: "./posts/index.js" },
    { path: "/api/source_translates", module: "./source_translates/index.js" },
    { path: "/api/word_details", module: "./word_details/index.js" },
    { path: "/api/ai", module: "./ai/index.js" },
    { path: "/api/events", module: "./events/index.js" },
    { path: "/api/auth", module: "./auth/index.js" },
    { path: "/api/read", module: "./read/index.js" },
    { path: "/api/youtube", module: "./youtube/index.js" },
];

module.exports = function (app) {
    routes.forEach((r) => {
        if (r.handler) {
            app.use(r.path, r.handler);
        } else if (r.module) {
            app.use(r.path, require(path.resolve(__dirname, r.module)));
        }
    });

    app.use("/api/docs", (req, res) => {
        const data = extractRoutes(routes);
        res.json(data);
    });

    app.use("/api/{*any}", (req, res) => {
        return res.json({
            error: "Unknown route!", unknownRoute: req.originalUrl, existingRoutes: extractRoutes(routes)
        })
    })
};

module.exports.routes = routes;