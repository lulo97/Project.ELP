const { execute } = require("../../database/execute");

async function initEvent(event_id) {
  await execute({
    sql: `INSERT INTO events (id, timestamp, status, data) VALUES ($1, $2, $3, $4)`,
    params: [event_id, Date.now(), "INIT", ""],
  });
}

module.exports = {
  initEvent,
};
