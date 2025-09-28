const redis = require("redis");

let client = null;

const redisHost = process.env.REDIS_HOST || "redis://localhost:6379";

async function getConnection() {
  if (!client) {
    client = redis.createClient({
      url: redisHost
    });

    client.on("error", (err) => {
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
