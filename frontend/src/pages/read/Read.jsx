import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Popup } from "./Popup";
import { getAllWords } from "../../services/word";
import { getStandardizeWord } from "../../utils/getStandardizeWord";

export function Read() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const source_name = queryParams.get("source_name");

  if (!source_name) return <div>No source selected!</div>;

  const [currentSource, setCurrentSources] = useState(null);
  const [currentWord, setCurrentWord] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [existWords, setExistWords] = useState([]);

  async function fetchSource() {
    const result = await fetch(`/api/sources?name=${source_name}`);
    const result_json = await result.json();
    setCurrentSources(result_json.data[0]);
  }

  async function fetchAllWords() {
    const result = await getAllWords();
    setExistWords(result);
  }

  useEffect(() => {
    fetchSource();
    fetchAllWords();
  }, []);

  function handleClose() {
    setCurrentWord("");
    setShowPopup(false);
  }

  function openPopup({ word, action }) {
    setCurrentWord(word);
    setShowPopup(true);
  }

  if (!currentSource) return <div>Can't find source = {source_name}</div>;

  return (
    <div>
      <div style={{ fontWeight: "bold", fontSize: "2rem" }}>
        Title: {currentSource.name}
      </div>
      <div
        style={{
          wordWrap: "break-word",
        }}
      >
        {currentSource.source.split(" ").map((word, index) => {
          const exist_word = existWords
            .map((ele) => ele.word)
            .find((ele) => {
              return (
                getStandardizeWord({ word: ele }) ==
                getStandardizeWord({ word: word })
              );
            });

          const color = exist_word ? "blue" : "black";

          return (
            <span
              key={index}
              style={{
                cursor: "pointer",
                marginRight: "4px",
                color: color,
                whiteSpace: "nowrap",
              }}
              onClick={() => {
                const standardize_word = getStandardizeWord({ word: word });
                setCurrentWord(standardize_word);
                openPopup({ word: standardize_word, action: "ADD" });
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      <Popup
        show={showPopup}
        title={"Add"}
        word={currentWord}
        handleClose={handleClose}
      />
    </div>
  );
}
