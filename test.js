(async () => {
  const redis = require("redis");
  const client = redis.createClient({ url: "redis://localhost:6379" });

  client.on("error", (err) => console.error("Redis error:", err));

  await client.connect();
  console.log("Connected!");

  console.log("PING:", await client.ping());
  await client.set("foo", "bar");
  console.log("GET foo:", await client.get("foo"));

  await client.quit();
})();
