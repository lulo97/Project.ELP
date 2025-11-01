const express = require("express");
const { executeSelect } = require("../../database/execute");
const router = express.Router();

function handleEvents(req, res) {
  // Set proper SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // (Optional) immediately flush headers so client starts receiving data
  res.flushHeaders?.();

  // Helper to send messages
  const send = (data) => {
    res.write(`data: ${JSON.stringify(data.events_table)}\n\n`);
  };

  // Send a message every 2 seconds
  const interval = setInterval(async () => {
    const events_table = await executeSelect({ sql: "SELECT * FROM events" });
    send({ events_table });
  }, 1000);

  // Clean up when the client disconnects
  req.on("close", () => {
    clearInterval(interval);
    res.end();
    console.log("🔴 Client disconnected from /api/events");
  });

  console.log("🟢 Client connected to /api/events");
}

// Register route
router.get("/", handleEvents);

module.exports = router;
