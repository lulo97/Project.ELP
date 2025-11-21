const { execute } = require("../../database/execute");

async function updateEvent({ event_id, status, data }) {
  if (!event_id) return;

  await execute({
    sql: `UPDATE events SET status = $1, data = $2 WHERE id = $3`,
    params: [status, data, event_id],
  });
}

module.exports = {
  updateEvent,
};
