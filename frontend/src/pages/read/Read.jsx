import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Popup } from "./Popup";
import { getAllWords } from "../../services/word";
import { compareStandardize, getStandardizeWord } from "../../utils/standardizeWord";
import { Tooltip } from "../../components/Tooltip";
import { getMeaningsForTooltip } from "../../services/meaning";

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

  useEffect(() => {
    fetchSource();
    fetchAllWords();
    fetchAllMeaningsForTooltip();
  }, []);

  function handleClose() {
    setCurrentWord("");
    setShowPopup(false);
    fetchSource();
    fetchAllWords();
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
                compareStandardize(ele, word)
              );
            });

          const color = exist_word ? "blue" : "black";

          const currentMeaningTooltip = meaningsForTooltip.find((ele) => {
            return compareStandardize(ele.word, word);
          });

          const tooltipContent = [null, undefined, ""].includes(
            currentMeaningTooltip
          )
            ? "Unknown meaning!"
            : <ul>
              {currentMeaningTooltip.meanings.map(ele => {
                return <li>{`${ele.meaning} (${ele.part_of_speech})`}</li>
              })}
            </ul>;

          return (
            <Tooltip content={tooltipContent}>
              <span
                key={index}
                style={{
                  cursor: "pointer",
                  marginRight: "4px",
                  color: color,
                  whiteSpace: "nowrap",
                }}
                onDoubleClick={() => {
                  const standardize_word = getStandardizeWord({ word: word });
                  setCurrentWord(standardize_word);
                  openPopup({ word: standardize_word, action: "ADD" });
                }}
              >
                {word}
              </span>
            </Tooltip>
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
