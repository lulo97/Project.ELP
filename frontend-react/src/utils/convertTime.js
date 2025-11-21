/**
 * Input:  732
 * 
 * Output: "12:12"
 */
export function toMinutesSeconds(second_float) {
  const sec = parseFloat(second_float);
  if (isNaN(sec)) return "00:00";

  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/**
 * Input:  "12:12"
 * 
 * Output: 12 * 60 + 12 = 732
 */
export function toSeconds(minute_format = "12:12") {
  if (typeof minute_format !== "string") return 0;

  const [m, s] = minute_format.split(":").map(Number);

  if (isNaN(m) || isNaN(s)) return 0;

  return m * 60 + s;
}
