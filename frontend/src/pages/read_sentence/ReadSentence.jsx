import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PageTitle } from "../../components/PageTitle";
import { ClickableWordParagraph } from "../read/ClickableWordParagraph";
import { Popup } from "../read/Popup";
import { useSourceDataForRead } from "../../hooks/useSourceDataForRead";
import { usePopupForRead } from "../../hooks/usePopupForRead";
import { splitParagraph } from "../../utils/splitParagraph";

export function ReadSentence() {
  const location = useLocation();
  const source_name = new URLSearchParams(location.search).get("source_name");

  const {
    currentSource,
    existWords,
    existPhrases,
    existIdioms,
    meaningsForTooltip,
    resetAll,
    refreshDataOnly,
  } = useSourceDataForRead(source_name);

  const { currentWord, showPopup, openPopup, handleClose, setCurrentWord } =
    usePopupForRead(refreshDataOnly);

  const [sentences, setSentences] = useState([]);
  const [usedSentences, setUsedSentences] = useState([]);
  const [currentSentence, setCurrentSentence] = useState(null);

  useEffect(() => {
    if (!currentSource) return;
    const text = currentSource.source;
    const split = text
      .split(/(?<=[.?!])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
    setSentences(split);
    setUsedSentences([]);
  }, [currentSource]);

  const pickRandom = () => {
    if (usedSentences.length === sentences.length) return;
    let idx;
    do {
      idx = Math.floor(Math.random() * sentences.length);
    } while (usedSentences.includes(idx));
    setCurrentSentence(sentences[idx]);
    setUsedSentences((prev) => [...prev, idx]);
  };

  useEffect(() => {
    if (sentences.length > 0 && usedSentences.length === 0) {
      pickRandom();
    }
  }, [sentences]);

  if (!currentSentence) return <div>No sentence available</div>;

  return (
    <div className="p-4">
      <PageTitle title="Random Sentence Reader" />

      <ClickableWordParagraph
        currentSource={splitParagraph({
          source: currentSentence,
          existIdioms: existIdioms,
          existPhrases: existPhrases,
        })}
        existWords={existWords}
        existPhrases={existPhrases}
        existIdioms={existIdioms}
        meaningsForTooltip={meaningsForTooltip}
        setCurrentWord={setCurrentWord}
        openPopup={openPopup}
      />

      <div className="flex justify-end mt-4">
        <button
          onClick={pickRandom}
          disabled={usedSentences.length === sentences.length}
          className={`px-5 py-2 rounded-lg font-medium transition ${
            usedSentences.length === sentences.length
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 text-white shadow-sm"
          }`}
        >
          {usedSentences.length === sentences.length ? "All Done 🎉" : "Next"}
        </button>
      </div>

      <Popup
        show={showPopup}
        title="Add"
        word={currentWord}
        handleClose={handleClose}
      />
    </div>
  );
}
