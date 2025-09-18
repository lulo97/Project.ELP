import { getMeaningsByWord } from "../../../services/meaning";
import { getPartOfSpeechs } from "../../../services/part_of_speech";
import { useState, useEffect } from "react";
import { Meaning } from "./Meaning";

export function TabMeaning({ word }) {
  const [partOfSpeechs, setPartOfSpeechs] = useState([]);
  const [existMeanings, setExistMeanings] = useState([]);

  async function fetchPartOfSpeechs() {
    const result = await getPartOfSpeechs();
    setPartOfSpeechs(result);
  }

  async function fetchExistMeanings() {
    const result = await getMeaningsByWord({ word: word });
    setExistMeanings(result);
  }

  useEffect(() => {
    fetchPartOfSpeechs();
    fetchExistMeanings();
  }, []);

  if (!word) {
    return null;
  }

  return (
    <div style={{ flexGrow: "1" }}>
      <Meaning
        existingRows={existMeanings}
        fetchExistingRows={fetchExistMeanings}
        word={word}
        partOfSpeechs={partOfSpeechs}
      />
    </div>
  );
}
