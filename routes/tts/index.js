const express = require("express");
const { saveTTSData, getTTSData } = require("./saveTTSData")

const router = express.Router();

async function tts(req, res, next) {
    try {
        const { text } = req.query;

        if (!text) {
            return res.status(400).json({ data: null, error: "Missing text parameter" });
        }

        const existingTTSRow = await getTTSData(text);

        if (existingTTSRow) {
            return res.json({ data: { audio_base64: existingTTSRow.audio_base64 }, error: null });
        }

        const ttsHost = process.env.TTS_HOST || 'http://localhost:5000';

        const result = await fetch(`${ttsHost}/tts?text=${encodeURIComponent(text)}`);

        //{ audio_base64: "" }
        const result_json = await result.json();

        await saveTTSData({ text: text, audio_base64: result_json.audio_base64 })

        res.json({ data: result_json, error: null });
    } catch (err) {
        console.error(err);
        res.status(500).json({ data: null, error: err.message });
    }
}

router.get("/", tts);

module.exports = router;
