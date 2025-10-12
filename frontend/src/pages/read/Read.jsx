import { useLocation } from "react-router-dom";
import { ClickableWordParagraph } from "./ClickableWordParagraph";
import { Popup } from "./Popup";
import { useSourceDataForRead } from "../../hooks/useSourceDataForRead";
import { usePopupForRead } from "../../hooks/usePopupForRead";
import { splitParagraph } from "../../utils/splitParagraph";
import { Textarea } from "../../components/Textarea";
import { Button } from "../../components/Button";
import { useEffect, useState, useCallback } from "react";
import { useMemo } from "react";
import { getStandardizeWord } from "../../utils/standardizeWord";
import {
  addSourceTranslates,
  getSourceTranslates,
} from "../../services/source_translates";

let STATE = [];

export function Read() {
  const location = useLocation();
  const source_name = new URLSearchParams(location.search).get("source_name");

  const {
    currentSource,
    existWords,
    existPhrases,
    existIdioms,
    meaningsForTooltip,
    translatedChunks,
    setTranslatedChunks,
    existTranslatedChunks,
    resetAll,
    refreshDataOnly,
  } = useSourceDataForRead(source_name);

  const currentSnapshot = {
    currentSource,
    existWords,
    existPhrases,
    existIdioms,
    meaningsForTooltip,
    translatedChunks,
    existTranslatedChunks,
    resetAll,
    refreshDataOnly,
  };

  // Push a *clone* of the snapshot for history
  STATE.push(JSON.parse(JSON.stringify(currentSnapshot)));

  // Compare with the previous render
  if (STATE.length > 1) {
    const prev = STATE[STATE.length - 2];
    const curr = STATE[STATE.length - 1];

    // Shallow comparison summary
    const diffKeys = Object.keys(curr).filter(
      (key) => JSON.stringify(curr[key]) !== JSON.stringify(prev[key])
    );

    if (diffKeys.length > 0) {
      console.log(
        `%c[State changed] ${diffKeys.join(", ")}`,
        "color: red; font-weight: bold;"
      );
    } else {
      console.log("%c[No state change detected]", "color: gray;");
    }
  }

  console.log("%cRender snapshot:", "color: orange;", currentSnapshot);

  const { currentWord, showPopup, openPopup, handleClose, setCurrentWord } =
    usePopupForRead(refreshDataOnly);

  const existWordSet = useMemo(() => {
    if (!existWords) return;
    return new Set(existWords.map((w) => getStandardizeWord({ word: w.word })));
  }, [existWords]);

  const idiomMap = useMemo(() => {
    if (!existIdioms) return;
    const m = new Map();
    existIdioms.forEach((i) => m.set(i.idiom, i.meaning));
    return m;
  }, [existIdioms]);

  const phraseMap = useMemo(() => {
    if (!existPhrases) return;
    const m = new Map();
    existPhrases.forEach((p) => m.set(p.phrase, p.meaning));
    return m;
  }, [existPhrases]);

  const meaningMap = useMemo(() => {
    if (!meaningsForTooltip) return;
    const m = new Map();
    meaningsForTooltip.forEach((mf) => {
      m.set(getStandardizeWord({ word: mf.word }), mf.meanings);
    });
    return m;
  }, [meaningsForTooltip]);

  if (!source_name) return <div>No source selected!</div>;
  if (!currentSource) return <div>Can't find source = {source_name}</div>;

  function getCompareString(arr = []) {
    const filtered = arr
      .map((ele) => ele.translate?.trim() || "")
      .filter((text) => text.length > 0);

    return JSON.stringify(filtered);
  }

  console.log("-----------------------------------");

  if (!translatedChunks) return <div>Loading...</div>

  const saveTranslateButtonDisable =
    !translatedChunks ||
    !existTranslatedChunks ||
    getCompareString(translatedChunks) ===
      getCompareString(existTranslatedChunks);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Title: {currentSource.name}</h1>
        <Button
          text={"Save translate"}
          disabled={saveTranslateButtonDisable}
          onClick={async () => {
            const body = {
              source_id: currentSource.id,
              translatedChunks: translatedChunks
                .filter((ele) => ele.translate)
                .map((ele) => ({
                  chunk: ele.chunk,
                  translate: ele.translate,
                })),
            };

            await addSourceTranslates({ body: body });
            resetAll();
          }}
        />
      </div>

      {translatedChunks.map((ele, idx) => {
        return (
          <div key={ele.chunk + "-" + idx}>
            <ClickableWordParagraph
              currentSource={ele.split}
              existWordSet={existWordSet}
              idiomMap={idiomMap}
              phraseMap={phraseMap}
              meaningMap={meaningMap}
              setCurrentWord={setCurrentWord}
              openPopup={openPopup}
            />
            <details>
              <summary>Translate</summary>
              <Textarea
                value={ele.translate}
                onChange={(event) => {
                  setTranslatedChunks((prev) => {
                    const next = prev.slice();
                    next[idx] = {
                      ...next[idx],
                      translate: event.target.value,
                    };
                    return next;
                  });
                }}
                className="w-full h-32"
                placeholder="Enter translate..."
              />
            </details>
            <br />
          </div>
        );
      })}

      <Popup
        show={showPopup}
        title="Add"
        word={currentWord}
        handleClose={handleClose}
      />
    </div>
  );
}
