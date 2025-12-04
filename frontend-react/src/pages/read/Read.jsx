import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReadData } from "../../services/read";
import { message } from "../../providers/MessageProvider";
import { PageTitle } from "../../components/PageTitle";
import { Button } from "../../components/Button";
import { addSourceTranslates } from "../../services/source_translates";
import { TranslateDetail } from "./TranslateDetail";
import { Popup } from "./Popup";
import { getTranslation as _getTranslation } from "../../utils/getTranslation";
import { translation } from "./Read.Translate";
import { HighlightHtmlText } from "./HighlightHtmlText";
import { useSelectedText } from "../../hooks/useSelectedText";
import { AnimatedList } from "../../components/AnimatedList";
import {
  EMPTY_STATE,
  transformSourceRawIntoChunks,
  compareObjects,
} from "./utils";
import { FloatingSettings } from "../../components/FloatingSettings";
import { SplitPane } from "../../components/SplitPane";
import { GlobalTooltip } from "./GlobalTooltip";
import { useGlobalTripleClick } from "../../hooks/useGlobalTripleClick";

const getTranslation = (key) => _getTranslation(key, translation);

export function Read() {
  const source_id = new URLSearchParams(useLocation().search).get("source_id");

  const { selectedText } = useSelectedText();

  const [state, setState] = useState(EMPTY_STATE);

  const [selectedTextDoubleClick, setSelectedTextDoubleClick] = useState("");

  async function fetchData() {
    const result = await getReadData({ source_id: source_id });

    if (result.error) {
      message({ type: "error", text: result.error });
      return;
    }

    const chunks = transformSourceRawIntoChunks(result.data);

    setState((state) => {
      return {
        ...state,
        ...result.data,
        chunks: chunks,
        original_chunks: chunks,
      };
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  useGlobalTripleClick(() => {
    if (!selectedTextDoubleClick) {
      throw Error("Selected text null!");
    }

    // Open popup
    setState((state) => {
      return {
        ...state,
        open_popup: true,
        word_row: {
          ...state.word_row,
          word: selectedTextDoubleClick,
        },
      };
    });

    // Clear paragraph selected by triple click
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
    }
  });

  useEffect(() => {
    // console.log(selectedText)

    if (selectedText.length === 0) return;

    if (state.open_popup) return;

    const _word = selectedText.trim();

    if (!_word || _word.length === 0 || _word.includes(" ")) return;

    const symbols = ["+", "-", "*", "/", "=", "<", ">", ".", ",", "'", '"'];

    if (symbols.includes(_word)) return;

    // Remember word selected by double click
    setSelectedTextDoubleClick(_word);
  }, [selectedText]);

  function isChunksEdit() {
    return !compareObjects(state.original_chunks, state.chunks);
  }

  async function handleSaveChunksInDatabase() {
    const body = {
      source_id: state.source_row.id,
      chunks: state.chunks
        // Remove all empty translate
        .filter((ele) => ele.translate)
        .map((ele) => ({
          chunk: ele.chunk,
          translate: ele.translate,
        })),
    };

    const result = await addSourceTranslates({ body: body });
    if (result.error) {
      message({ type: "error", text: result.error });
      return;
    }
    await fetchData();
  }

  function handleSaveTranslateChunk({ idx, translate }) {
    const new_chunks = [...state.chunks];

    new_chunks[idx] = {
      ...new_chunks[idx],
      translate: translate,
    };

    setState((old_state) => {
      return {
        ...old_state,
        chunks: new_chunks,
      };
    });
  }

  useEffect(() => {
    document.documentElement.classList.add("overflow-y-scroll");
    return () => {
      document.documentElement.classList.remove("overflow-y-scroll");
    };
  }, []);

  if (!state.source_row.id) return <div>Loading...</div>;

  const title = getTranslation("Title").replace(
    "{name}",
    state.source_row.name
  );

  function getHighlightHtmlText(chunk) {
    return (
      <HighlightHtmlText
        htmlString={chunk}
        words={state.words.map((ele) => ele.word)}
        idioms={state.idioms.map((ele) => ele.idiom)}
        phrases={state.phrases.map((ele) => ele.phrase)}
      />
    );
  }

  return (
    <div className="p-4 min-h-[90vh]">
      <div className="flex justify-between mb-4">
        <PageTitle title={title} />
        {isChunksEdit() && (
          <div className="fixed top-[60px] right-0 p-4 z-10">
            <Button
              className="opacity-75"
              text={getTranslation("SaveTranslate")}
              onClick={handleSaveChunksInDatabase}
            />
          </div>
        )}
      </div>

      {state.horizontal_layout && (
        <AnimatedList>
          {state.chunks.map((ele, idx) => {
            if (!state.show_translate) {
              return (
                <div key={idx}>
                  {getHighlightHtmlText(ele.chunk)}
                  <br />
                </div>
              );
            };

            return (
              <div key={idx}>
                <SplitPane
                  right={
                    <TranslateDetail
                      translate={ele.translate}
                      idx={idx}
                      handleSaveTranslateChunk={handleSaveTranslateChunk}
                    />
                  }
                  left={getHighlightHtmlText(ele.chunk)}
                  initialLeftWidth={60}
                  className={"flex flex-1 gap-2 min-h-0"}
                  parent_component="YoutubeListening"
                  divider_width="w-2"
                />{" "}
                <br />{" "}
              </div>
            );
          })}
        </AnimatedList>
      )}

      {!state.horizontal_layout && (
        <AnimatedList>
          {state.chunks.map((ele, idx) => {
            return (
              <div key={idx}>
                {getHighlightHtmlText(ele.chunk)}
                {state.show_translate && (
                  <TranslateDetail
                    translate={ele.translate}
                    idx={idx}
                    handleSaveTranslateChunk={handleSaveTranslateChunk}
                  />
                )}
                <br />
              </div>
            );
          })}
        </AnimatedList>
      )}

      {state.open_popup && (
        <Popup state={state} setState={setState} fetchData={fetchData} />
      )}

      <FloatingSettings>
        <SettingsList
          settings={[
            {
              id: "showTranslate",
              label: "Show translate",
              onClick: () => {
                localStorage.setItem("show_translate", !state.show_translate);
                setState((old_state) => ({
                  ...old_state,
                  show_translate: !old_state.show_translate,
                  trigger: old_state.trigger + 1,
                }));
              },
              checked: state.show_translate,
            },
            {
              id: "horizontalLayout",
              label: "Horizontal layout",
              onClick: () => {
                localStorage.setItem(
                  "horizontal_layout",
                  !state.horizontal_layout
                );
                setState((old_state) => ({
                  ...old_state,
                  horizontal_layout: !old_state.horizontal_layout,
                  trigger: old_state.trigger + 1,
                }));
              },
              checked: state.horizontal_layout,
            },
          ]}
        />
      </FloatingSettings>

      <FloatingSettings
        title="Guide"
        button_icon="💡"
        position={{ bottom: "6", right: "20" }}
        button_color="bg-indigo-500 text-white hover:bg-indigo-600"
      >
        {[
          {
            icon: "💡",
            iconColor: "text-indigo-500",
            text: "Triple click to show popup to insert word",
          },
          {
            icon: "🔵",
            iconColor: "text-blue-500",
            text: "Text with color BLUE is saved words",
          },
          {
            icon: "🔴",
            iconColor: "text-red-500",
            text: "Text with color RED is saved phrases",
          },
          {
            icon: "🟢",
            iconColor: "text-green-500",
            text: "Text with color GREEN is saved idioms",
          },
          {
            icon: "ℹ️",
            iconColor: "text-gray-400",
            text: "Hover on saved items to show their meanings",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-gray-700 mb-2"
          >
            <span className={`w-5 flex-shrink-0 text-center ${item.iconColor}`}>
              {item.icon}
            </span>
            <span>{item.text}</span>
          </div>
        ))}
      </FloatingSettings>

      <GlobalTooltip
        meanings={state.meanings}
        idioms={state.idioms}
        phrases={state.phrases}
        trigger={state.trigger}
      />
    </div>
  );
}

function SettingsList({
  settings = [
    { id: "darkMode", label: "Enable Dark Mode" },
    { id: "notifications", label: "Show Notifications" },
    { id: "autoSave", label: "Auto Save Drafts" },
    { id: "beta", label: "Join Beta Features" },
  ],
}) {
  return (
    <div className="space-y-3">
      {settings.map((s) => (
        <label
          key={s.id}
          className="flex items-center justify-between cursor-pointer"
        >
          <span className="text-gray-700">{s.label}</span>
          <input
            checked={s.checked}
            onClick={() => s.onClick()}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </label>
      ))}
    </div>
  );
}
