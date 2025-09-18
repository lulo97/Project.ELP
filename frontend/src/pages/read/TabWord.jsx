export function TabWord({ word, wordData, fetchWordData }) {
  async function handleAdd() {
    const result = await fetch("/api/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word: word }),
    });
    fetchWordData()
  }

  return (
    <div style={{ flexGrow: "1" }}>
      <button
        disabled={wordData && Object.keys(wordData).length > 0}
        onClick={() => handleAdd()}
      >
        Add
      </button>
      <div>
        <label>Word: </label>
        <input disabled value={word} />
      </div>
    </div>
  );
}
