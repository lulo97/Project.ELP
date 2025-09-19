import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Popup } from "./Popup";
import { getAllWords } from "../../services/word";
import { getMeaningsForTooltip } from "../../services/meaning";
import { ClickableWordParagraph } from "./ClickableWordParagraph";

export function Read() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const source_name = queryParams.get("source_name");

  if (!source_name) return <div>No source selected!</div>;

  const [currentSource, setCurrentSources] = useState(null);
  const [currentWord, setCurrentWord] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [existWords, setExistWords] = useState([]);
  const [meaningsForTooltip, setMeaningsForTooltip] = useState([]);

  async function fetchSource() {
    const result = await fetch(`/api/sources?name=${source_name}`);
    const result_json = await result.json();
    setCurrentSources(result_json.data[0]);
  }

  async function fetchAllWords() {
    const result = await getAllWords({ pageIndex: 1, pageSize: null });
    setExistWords(result.data);
  }

  async function fetchAllMeaningsForTooltip() {
    const result = await getMeaningsForTooltip();
    setMeaningsForTooltip(result);
  }

  function reset() {
    fetchSource();
    fetchAllWords();
    fetchAllMeaningsForTooltip();
  }

  useEffect(() => {
    reset();
  }, []);

  function handleClose() {
    setCurrentWord("");
    setShowPopup(false);
    reset();
  }

  function openPopup({ word, action }) {
    setCurrentWord(word);
    setShowPopup(true);
  }

  if (!currentSource) return <div>Can't find source = {source_name}</div>;

  return (
    <div style={{ margin: "10px" }}>
      <div
        style={{ fontWeight: "bold", fontSize: "2rem", marginBottom: "10px" }}
      >
        Title: {currentSource.name}
      </div>

      <ClickableWordParagraph
        currentSource={currentSource}
        existWords={existWords}
        meaningsForTooltip={meaningsForTooltip}
        setCurrentWord={setCurrentWord}
        openPopup={openPopup}
      />

      <Popup
        show={showPopup}
        title={"Add"}
        word={currentWord}
        handleClose={handleClose}
      />
    </div>
  );
}
