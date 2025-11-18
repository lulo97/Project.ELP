const express = require("express");

const router = express.Router();

async function stt(req, res, next) {
    try {
        const { base64 } = req.body;
        if (!base64) {
            return res.status(400).json({ data: null, error: "Missing base64 parameter" });
        }

        const sttHost = process.env.UTILS_HOST || 'http://localhost:3002';

        const result = await fetch(sttHost, {
            method: "POST",
            body: JSON.stringify({ base64: base64 }),
            headers: { "Content-Type": "application/json" },
        });
        const result_json = await result.json();

        res.json({ data: result_json, error: null });
    } catch (err) {
        console.error(err);
        res.status(500).json({ data: null, error: err.message });
    }
}

router.post("/", stt);

module.exports = router;
