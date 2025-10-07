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

export function Read() {
  const location = useLocation();
  const source_name = new URLSearchParams(location.search).get("source_name");

  // Each item: { chunk: string, translate: string, split: <result of splitParagraph> }
  const [translatedChunks, setTranslatedChunks] = useState([]);
  const [existTranslatedChunks, setExistTranslatedChunks] = useState([]);

  const {
    currentSource,
    existWords,
    existPhrases,
    existIdioms,
    meaningsForTooltip,
    resetAll,
  } = useSourceDataForRead(source_name);

  const { currentWord, showPopup, openPopup, handleClose, setCurrentWord } =
    usePopupForRead(resetAll);

  const fetchTranslations = useCallback(async () => {
    if (!currentSource?.id) return;

    try {
      const existingTranslatedChunks = await getSourceTranslates({
        source_id: currentSource.id,
      });

      setExistTranslatedChunks(existingTranslatedChunks || []);

      if (!existingTranslatedChunks) return;

      const merged = translatedChunks.map((ele, idx) => ({
        ...ele,
        translate: existingTranslatedChunks[idx]?.translate || "",
      }));

      setTranslatedChunks(merged);
    } catch (err) {
      console.error("Failed to fetch translations:", err);
    }
  }, [currentSource?.id, translatedChunks]);

  useEffect(() => {
    if (!currentSource?.source) return;

    const chunks = currentSource.source
      .split("\n")
      .filter((ele) => ele.trim().length > 0);

    let newTranslatedChunks = chunks.map((chunk) => ({
      chunk,
      translate: "",
      split: splitParagraph({
        source: chunk,
        existIdioms,
        existPhrases,
      }),
    }));

    setTranslatedChunks(newTranslatedChunks);

    fetchTranslations();
  }, [currentSource?.id, currentSource?.source, existIdioms, existPhrases]);

  const existWordSet = useMemo(() => {
    return new Set(existWords.map((w) => getStandardizeWord({ word: w.word })));
  }, [existWords]);

  const idiomMap = useMemo(() => {
    const m = new Map();
    existIdioms.forEach((i) => m.set(i.idiom, i.meaning));
    return m;
  }, [existIdioms]);

  const phraseMap = useMemo(() => {
    const m = new Map();
    existPhrases.forEach((p) => m.set(p.phrase, p.meaning));
    return m;
  }, [existPhrases]);

  const meaningMap = useMemo(() => {
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

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Title: {currentSource.name}</h1>
        <Button
          text={"Save translate"}
          disabled={
            getCompareString(translatedChunks) ==
            getCompareString(existTranslatedChunks)
          }
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
            fetchTranslations();
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
