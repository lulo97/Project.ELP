import { getExamplesByWord } from "../../../services/example";
import { getPartOfSpeechs } from "../../../services/part_of_speech";
import { useState, useEffect } from "react";
import { Example } from "./Example";

export function TabExample({ word }) {
  const [partOfSpeechs, setPartOfSpeechs] = useState([]);
  const [existExamples, setExistExamples] = useState([]);
  const [paginationData, setPaginationData] = useState({});

  async function fetchPartOfSpeechs() {
    const result = await getPartOfSpeechs({ word: word });
    setPartOfSpeechs(result);
  }

  async function fetchExistExamples(
    { pageIndex, pageSize } = { pageIndex: null, pageSize: 5 }
  ) {
    const result = await getExamplesByWord({ word: word, pageIndex, pageSize });
    setExistExamples(result.data);
    setPaginationData(result.pagination);
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
        paginationData={paginationData}
      />
    </div>
  );
}
