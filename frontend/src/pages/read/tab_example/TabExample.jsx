import { getExamplesByWord } from "../../../services/example";
import { getPartOfSpeechs } from "../../../services/part_of_speech";
import { useState, useEffect } from "react";
import { Example } from "./Example";

export function TabExample({ word }) {
  const [partOfSpeechs, setPartOfSpeechs] = useState([]);
  const [existExamples, setExistExamples] = useState([]);

  async function fetchPartOfSpeechs() {
    const result = await getPartOfSpeechs();
    setPartOfSpeechs(result);
  }

  async function fetchExistExamples() {
    const result = await getExamplesByWord({ word: word });
    setExistExamples(result);
  }

  useEffect(() => {
    fetchPartOfSpeechs();
    fetchExistExamples();
  }, []);

  if (!word) {
    return null;
  }

  return (
    <div style={{ flexGrow: "1" }}>
      <Example
        existingRows={existExamples}
        fetchExistingRows={fetchExistExamples}
        word={word}
        partOfSpeechs={partOfSpeechs}
      />
    </div>
  );
}
