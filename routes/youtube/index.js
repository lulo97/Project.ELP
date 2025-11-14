const express = require("express");
const { Readable } = require("stream");

const router = express.Router();

async function transcript(req, res, next) {
  try {
    const { video_id } = req.query;

    if (!video_id) {
      return res
        .status(400)
        .json({ data: null, error: "Missing video_id parameter" });
    }

    const host = process.env.YOUTUBE_HOST || "http://localhost:3005";

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

/**
Flow: File on disk -> Youtube Service -> Backend -> Frontend 

1. Client send header range to Backend, Backend forward header range to Youtube Service 

2. Youtube Service: + Return header: Content-Range (current timestamp in bytes), Content-Length (file size in bytes) 
    + If header range is None: Stream full file from start 
    + If header range is not None: 
        + Read file from start (extract start from header range) 
        + Streaming chunks from file from start till end with chunk_size
*/
async function stream_audio(req, res) {
  try {
    const { video_id } = req.query;
    if (!video_id) {
      return res
        .status(400)
        .json({ data: null, error: "Missing video_id parameter" });
    }

    const range = req.headers.range;

    const host = process.env.YOUTUBE_HOST || "http://localhost:3005";
    const url = `${host}/stream_audio?video_id=${video_id}`;

    const response = await fetch(url, {
      headers: {
        Range: range || "",
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch audio stream" });
    }

    // Setting headers from youtube service to client
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    res.status(response.status);

    // Set headers (important for stream)
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Transfer-Encoding", "chunked");

    const nodeStream = Readable.fromWeb(response.body);

    nodeStream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ data: null, error: err.message });
  }
}

router.get("/transcript", transcript);
router.get("/stream_audio", stream_audio);

module.exports = router;
