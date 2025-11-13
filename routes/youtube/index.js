const express = require("express");

const router = express.Router();

async function transcript(req, res, next) {
    try {
        const { video_id } = req.query;

        if (!video_id) {
            return res.status(400).json({ data: null, error: "Missing video_id parameter" });
        }

        const host = process.env.YOUTUBE_HOST || 'http://localhost:3005';

        const result = await fetch(host + `/transcript?video_id=${video_id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const result_json = await result.json();

        res.json(result_json);
    } catch (err) {
        console.error(err);
        res.status(500).json({ data: null, error: err.message });
    }
}

router.get("/transcript", transcript);

module.exports = router;
