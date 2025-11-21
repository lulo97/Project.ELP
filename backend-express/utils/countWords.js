function countWords(text) {
  return text.trim().split(/\s+/).length;
}

module.exports = {
  countWords
}