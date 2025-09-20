const express = require("express");

const router = express.Router();

async function tts(req, res, next) {
    try {
        const { text } = req.query;
        if (!text) {
            return res.status(400).json({ data: null, error: "Missing text parameter" });
        }

        const ttsHost = process.env.TTS_HOST || 'http://localhost:5000';

        const result = await fetch(`${ttsHost}/tts?text=${encodeURIComponent(text)}`);
        const result_json = await result.json();

        res.json({ data: result_json, error: null });
    } catch (err) {
        console.error(err);
        res.status(500).json({ data: null, error: err.message });
    }
}

router.get("/", tts);

module.exports = router;
