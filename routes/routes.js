module.exports = function (app) {
    app.use("/api/helloworld", (req, res) => {
        return res.json({ message: "Hello World" });
    })

    app.use("/api/todos", require("./todos/index.js"));
    app.use("/api/words", require("./words/index.js"));
    app.use("/api/sources", require("./sources/index.js"));
    app.use("/api/meanings", require("./meanings/index.js"));
    app.use("/api/part_of_speechs", require("./part_of_speechs/index.js"));
    app.use("/api/examples", require("./examples/index.js"));
    app.use("/api/tts", require("./tts/index.js"));
};