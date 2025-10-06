import { useState, useEffect } from "react";
import { CommonPopup } from "../../components/CommonPopup";
import { getWord } from "../../services/word.js";
import { VerticalTab } from "../../components/VerticalTab.jsx";
import { TabWord } from "./tab_word/TabWord.jsx";
import { TabMeaning } from "./tab_meaning/TabMeaning.jsx";
import { TabExample } from "./tab_example/TabExample.jsx";

export function Popup({ show, title, word, handleClose }) {
  const [wordData, setWordData] = useState(null);
  const [currentTabId, setCurrentTabId] = useState("word");
  const [meaningData, setMeaningData] = useState({
    word: word,
    meaning: "",
    part_of_speech: "",
  });

  async function fetchWordData() {
    if ([null, undefined, ""].includes(word)) return;
    const result = await getWord({
      word: word,
      where_options: [{ field: "word", comparison_operation: "=" }],
    });
    setWordData(result);
  }

  useEffect(() => {
    fetchWordData();

    if (!meaningData.word) {
      setMeaningData({ ...meaningData, word: word });
    }
  }, [word]);

  if (!word) return null;

  return (
    <CommonPopup
      show={show}
      title={title}
      overWrittenBoxStyle={{ display: "flex", flexDirection: "column" }}
      handleClose={() => {
        setCurrentTabId("word");
        handleClose();
      }}
      isShowConfirmButton={false}
      height="90%"
    >
      <div
        style={{
          flexGrow: "1",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flexGrow: "1",
            display: "flex",
            gap: "10px",
          }}
        >
          <VerticalTab
            tabNames={[
              { id: "word", name: "Word" },
              { id: "meaning", name: "Meaning" },
              { id: "example", name: "Example" },
            ]}
            currentTabId={currentTabId}
            setCurrentTabId={setCurrentTabId}
          />

          {currentTabId == "word" && (
            <TabWord
              word={word}
              wordData={wordData}
              fetchWordData={fetchWordData}
            />
          )}

          {currentTabId == "meaning" && <TabMeaning word={word} />}

          {currentTabId == "example" && <TabExample word={word} />}
        </div>
      </div>
    </CommonPopup>
  );
}
