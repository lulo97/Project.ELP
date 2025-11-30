const express = require("express");
const { getUsernameFromToken } = require("../../utils/getUsernameFromToken.js");

const router = express.Router();

const AI_HOST = process.env.AI_HOST || "http://localhost:8001";

// -------------------- POST /api/ai --------------------
router.post("/", async (req, res) => {
  try {
    const body = req.body;

    if (!body) {
      return res.status(400).json({ error: "Request body null!", data: null });
    }

    const response = await fetch(`${AI_HOST}/api`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error(`AI API error: ${response.statusText}`);

    const result = await response.json();
    res.json(result);
  } catch (err) {
    console.error("POST /api/ai error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
});

// -------------------- GET /api/ai/events --------------------
router.get("/events", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "Parameter 'id' is required", data: null });

    const url = new URL(`${AI_HOST}/events`);
    url.searchParams.append("id", id);

    const response = await fetch(url);
    if (!response.ok) throw new Error(`AI API error: ${response.statusText}`);

    const result = await response.json();
    res.json(result);
  } catch (err) {
    console.error("GET /api/ai/events error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
});

// -------------------- GET /api/ai/events_poll --------------------
router.get("/events_poll", async (req, res) => {
  try {
    const { old_event, id, second_delay } = req.query;

    console.log("Run /events_poll with query =", req.query)

    if (!second_delay) return res.status(400).json({ error: "second_delay is null!", data: null });
    if (!old_event) return res.status(400).json({ error: "old_event is null!", data: null });

    let oldEventJson;
    try {
      oldEventJson = JSON.parse(old_event);
    } catch (err) {
      return res.status(400).json({ error: "Invalid JSON in old_event", data: null });
    }

    const delayMs = parseInt(second_delay) * 1000;
    const maxTry = 20;
    let count = 0;

    const getCurrentEvent = async () => {
      const url = new URL(`${AI_HOST}/events`);
      url.searchParams.append("id", id);

      const response = await fetch(url);
      if (!response.ok) throw new Error(`AI API error: ${response.statusText}`);
      return await response.json();
    };

    let currentEvent = await getCurrentEvent();

    let oldDataString = JSON.stringify(oldEventJson.data);
    let newDataString = JSON.stringify(currentEvent.data);

    while (oldDataString === newDataString) {
      count += 1;
      if (count >= maxTry) {
        return res.status(408).json({ error: `Max try = ${maxTry} polling reached!`, data: null });
      }

      await new Promise((r) => setTimeout(r, delayMs));

      currentEvent = await getCurrentEvent();
      newDataString = JSON.stringify(currentEvent.data);
    }

    res.json(currentEvent);
  } catch (err) {
    console.error("GET /api/ai/events_poll error:", err);
    res.status(500).json({ error: err.message, data: null });
  }
});

module.exports = router;
