const redis = require("redis");

let client = null;
let maximum_error_count = 10;
let current_error_count = 0;

const redisHost = process.env.REDIS_HOST || "redis://localhost:6379";

async function getConnection() {
  // Stop retrying if reached maximum consecutive errors
  if (current_error_count >= maximum_error_count) {
    console.error("Maximum Redis error count reached — aborting reconnection attempts.");
    return null;
  }

  // If already connected and healthy, reuse it
  if (client && client.isOpen) return client;

  // If client exists but was closed or errored — reset it
  if (client && !client.isOpen) {
    try {
      await client.quit();
    } catch (e) {}
    client = null;
  }

  // Create a new Redis client
  client = redis.createClient({
    url: redisHost,
    socket: {
      reconnectStrategy: (retries) => {
        if (retries > 5) {
          console.error("Too many Redis reconnection attempts — giving up.");
          return new Error("Redis reconnect failed");
        }
        console.log(`Redis reconnect attempt ${retries}`);
        return Math.min(retries * 100, 3000); // retry delay
      },
    },
  });

  // Handle errors
  client.on("error", (err) => {
    current_error_count += 1;
    console.error("Redis Client Error:", err.message);

    // If Redis connection dropped, mark as closed
    if (client && !client.isOpen) {
      console.log("Redis connection lost, will attempt reconnect...");
    }
  });

  client.on("connect", () => {
    console.log("Connecting to Redis...");
  });

  client.on("ready", () => {
    current_error_count = 0; // reset error counter
    console.log("Redis connection ready");
  });

  try {
    await client.connect();
  } catch (err) {
    console.error("Failed to connect to Redis:", err.message);
  }

  return client;
}

module.exports = { getConnection };
