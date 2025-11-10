import { useState, useEffect } from "react";
import { CommonPopup } from "../../components/CommonPopup";
import { getWord } from "../../services/word.js";
import { VerticalTab } from "../../components/VerticalTab.jsx";
import { TabWord } from "./tab_word/TabWord.jsx";
import { TabMeaning } from "./tab_meaning/TabMeaning.jsx";
import { TabExample } from "./tab_example/TabExample.jsx";
import { EMPTY_STATE } from "./Read.jsx";
import { message } from "../../providers/MessageProvider.jsx";

export function Popup({ state = EMPTY_STATE, setState = () => {} }) {
  const [currentTabId, setCurrentTabId] = useState("word");

  async function fetchData() {
    const result = await getWord({
      word: state.word_row.word,
      where_options: [{ field: "word", comparison_operation: "=" }],
    });

    if (result.error) {
      message({ type: "error", text: result.error });
      return;
    }

    const existing_word = result.data.length == 0 ? null : result.data[0];

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
    fetchData();
  }, []);

  const tabNames = [
    { id: "word", name: "Word", disable: false },
    { id: "meaning", name: "Meaning", disable: !state.word_row.id },
    { id: "example", name: "Example", disable: !state.word_row.id },
  ];

  console.log(state.word_row, tabNames);

  return (
    <CommonPopup
      show={state.open_popup}
      title={"Add word details"}
      overWrittenBoxStyle={{ display: "flex", flexDirection: "column" }}
      handleClose={() => {
        setCurrentTabId("word");

        setState((old_state) => {
          return {
            ...old_state,
            open_popup: false,
          };
        });
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
            tabNames={tabNames}
            currentTabId={currentTabId}
            setCurrentTabId={setCurrentTabId}
          />

          {currentTabId == "word" && (
            <TabWord state={state} fetchData={fetchData} />
          )}

          {currentTabId == "meaning" && (
            <TabMeaning word={state.word_row.word} />
          )}

          {currentTabId == "example" && (
            <TabExample word={state.word_row.word} />
          )}
        </div>
      </div>
    </CommonPopup>
  );
}
