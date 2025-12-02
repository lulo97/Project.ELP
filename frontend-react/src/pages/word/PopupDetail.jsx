import { useState, useEffect } from "react";
import { CommonPopup } from "../../components/CommonPopup";
import { getWord } from "../../services/word.js";
import { VerticalTab } from "../../components/VerticalTab.jsx";
import { TabWord } from "../read/tab_word/TabWord.jsx";
import { TabMeaning } from "../read/tab_meaning/TabMeaning.jsx";
import { TabExample } from "../read/tab_example/TabExample.jsx";
import { message } from "../../providers/MessageProvider.jsx";
import { getTranslation } from "../../utils/getTranslation.js";
import { translation } from "../read/Read.Translate.js";

export function PopupDetail({ show, word, handleClose }) {
  const [currentTabId, setCurrentTabId] = useState("word");
  const [existingWord, setExistingWord] = useState({
    id: "",
    word: "",
    user_id: "",
  });

  async function fetchWord() {
    const result = await getWord({
      word: word,
      where_options: [{ field: "word", comparison_operation: "=" }],
    });

    // if (result.error) {
    //   message({ type: "error", text: result.error });
    //   return;
    // }

    const existing_word = result.data.length == 0 ? null : result.data[0];

    if (existing_word) {
      setExistingWord((old_state) => {
        return {
          ...old_state,
          ...existing_word,
        };
      });
    }
  }

  useEffect(() => {
    fetchWord();
  }, []);

  const tabNames = [
    { id: "word", name: getTranslation("Word", translation), disable: false },
    {
      id: "meaning",
      name: getTranslation("Meaning", translation),
      disable: !existingWord.id,
    },
    {
      id: "example",
      name: getTranslation("Example", translation),
      disable: !existingWord.id,
    },
  ];

  return (
    <CommonPopup
      show={show}
      title={getTranslation("WordDetail", translation)}
      overWrittenBoxStyle={{ display: "flex", flexDirection: "column" }}
      handleClose={handleClose}
      isShowConfirmButton={false}
      height="90%"
    >
      <div
        style={{
          flexGrow: "1",
          display: "flex",
          gap: "10px",
        }}
      >
        <VerticalTab
          tabNames={tabNames}
          currentTabId={currentTabId}
          setCurrentTabId={setCurrentTabId}
        />

        {currentTabId == "word" && (
          <TabWord
            state={{
              word_row: existingWord,
            }}
            fetchWord={fetchWord}
          />
        )}
        {currentTabId == "meaning" && <TabMeaning word={word} />}
        {currentTabId == "example" && <TabExample word={word} />}
      </div>
    </CommonPopup>
  );
}
