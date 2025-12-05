import { useState, useEffect } from "react";
import { CommonPopup } from "../../components/CommonPopup";
import { getWord } from "../../services/word.js";
import { VerticalTab } from "../../components/VerticalTab.jsx";
import { TabWord } from "./tab_word/TabWord.jsx";
import { TabMeaning } from "./tab_meaning/TabMeaning.jsx";
import { TabExample } from "./tab_example/TabExample.jsx";
import { EMPTY_STATE } from "./utils";
import { message } from "../../providers/MessageProvider.jsx";
import { getTranslation } from "../../utils/getTranslation.js";
import { translation } from "./Read.Translate.js";

export function Popup({
  state = EMPTY_STATE,
  setState = () => {},
  fetchData = () => {},
}) {
  const [currentTabId, setCurrentTabId] = useState("word");

  async function fetchWord() {
    const result = await getWord({
      word: state.word_row.word,
      where_options: [{ field: "word", comparison_operation: "=" }],
    });

    if (result.error) {
      message({ type: "error", text: result.error });
      return;
    }

    const existing_word = result.data.length === 0 ? null : result.data[0];

    if (existing_word) {
      setState((old_state) => {
        return {
          ...old_state,
          word_row: existing_word,
        };
      });
    }
  }

  useEffect(() => {
    fetchWord();
  }, []);

  const tabNames = [
    { id: "word", name: getTranslation("Word", translation), disable: false },
    { id: "meaning", name: getTranslation("Meaning", translation), disable: !state.word_row.id },
    { id: "example", name: getTranslation("Example", translation), disable: !state.word_row.id },
  ];

  async function handleClose() {
    await fetchData();
    setCurrentTabId("word");
    setState((old_state) => {
      return {
        ...old_state,
        open_popup: false,
        word_row: EMPTY_STATE.word_row,
        trigger: old_state.trigger + 1,
        selectedTextDoubleClick: "",
      };
    });
  }

  return (
    <CommonPopup
      show={state.open_popup}
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

        {currentTabId === "word" && (
          <TabWord state={state} fetchWord={fetchWord} />
        )}
        {currentTabId === "meaning" && <TabMeaning word={state.word_row.word} />}
        {currentTabId === "example" && <TabExample word={state.word_row.word} />}
      </div>
    </CommonPopup>
  );
}
