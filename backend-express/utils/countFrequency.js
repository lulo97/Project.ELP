function countFrequency(context, word) {
  if (!word) return 0;
  const regex = new RegExp(`\\b${word}\\b`, "gi");
  return (context.match(regex) || []).length;
}

module.exports = {
  countFrequency,
};
