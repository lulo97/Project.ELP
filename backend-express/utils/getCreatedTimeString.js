function getCreatedTimeString() {
  return `
substr(id, 9, 2) || ':' ||  -- HH
substr(id, 11, 2) || ':' || -- MM
substr(id, 13, 2) || ' ' || -- SS
substr(id, 7, 2) || '/' ||  -- DD
substr(id, 5, 2) || '/' ||  -- MM
substr(id, 1, 4)            -- YYYY
AS created_time
    `;
}

module.exports = {
    getCreatedTimeString
}