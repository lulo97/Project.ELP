/* eslint-disable no-magic-numbers */
export function getTimeFromId(id, return_type = "String") {
  if (!id || id.length < 14) return null; // invalid ID

  const year = parseInt(id.slice(0, 4));
  const month = parseInt(id.slice(4, 6)) - 1; // months are 0-indexed
  const day = parseInt(id.slice(6, 8));
  const hour = parseInt(id.slice(8, 10));
  const minute = parseInt(id.slice(10, 12));
  const second = parseInt(id.slice(12, 14));

  const date = new Date(year, month, day, hour, minute, second);

  if (return_type === "Date") return date;

  // 🕒 Format as "HH:MM:SS DD/MM/YYYY"
  const hh = String(hour).padStart(2, "0");
  const mm = String(minute).padStart(2, "0");
  const ss = String(second).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  const mo = String(month + 1).padStart(2, "0"); // convert back to 1–12
  const yyyy = year;

  return `${hh}:${mm}:${ss} ${dd}/${mo}/${yyyy}`;
}
