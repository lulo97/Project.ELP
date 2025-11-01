const { execute } = require("../../database/execute");

async function updateEvent({ event_id, status, data }) {
  if (!event_id) return;

  await execute({
    sql: `UPDATE events SET status = ?, data = ? WHERE id = ?`,
    params: [status, data, event_id],
  });
}

module.exports = {
  updateEvent,
};
