const redis = require("redis");

let client = null;

let maximum_error_count = 3
let current_error_count = 0

const redisHost = process.env.REDIS_HOST || "redis://localhost:6379";

async function getConnection() {
  if (current_error_count == maximum_error_count) return;

  if (!client) {
    client = redis.createClient({
      url: redisHost
    });

    client.on("error", (err) => {
      current_error_count += 1
      console.error("❌ Redis Client Error:", err);
    });

    try {
      await client.connect();
      console.log("✅ Connected to Redis");
    } catch (err) {
      console.error("❌ Failed to connect to Redis:", err);
    }
  }
  return client;
}

module.exports = {
  getConnection
};
