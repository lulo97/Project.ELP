/**
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Possible output: [1, 3, 6]

// Possible output: [2, 8, 9]

// Possible output: [6, 8, 9]
*/

function selectRandomIncreasing(arr, total_question) {
  if (total_question >= arr.length) {
    return [...arr];
  }

  const indices = arr.map((_, idx) => idx);

  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  const selectedIndices = indices.slice(0, total_question);

  selectedIndices.sort((a, b) => a - b);

  console.log({ arr, out: selectedIndices.map((i) => arr[i]) });

  return selectedIndices.map((i) => arr[i]);
}

module.exports = {
  selectRandomIncreasing,
};
