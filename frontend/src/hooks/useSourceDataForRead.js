import { useState, useEffect } from "react";
import { getAllWords } from "../services/word";
import { getAllPhrases } from "../services/phrases";
import { getAllIdioms } from "../services/idioms";
import { getMeaningsForTooltip } from "../services/meaning";
import { getSourceTranslates } from "../services/source_translates";
import { splitParagraph } from "../utils/splitParagraph";

function getCompareString(arr = []) {
  const filtered = arr
    .map((ele) => ele.translate?.trim() || "")
    .filter((text) => text.length > 0);

  return JSON.stringify(filtered);
}

/**
 * Hook: useSourceDataForRead
 *
 * @param {string} source_name - Tên nguồn cần fetch.
 *
 * @returns {{
 *   currentSource: object|null,   // nguồn hiện tại
 *   existWords: object[],         // danh sách từ vựng
 *   existPhrases: object[],       // danh sách cụm từ
 *   existIdioms: object[],        // danh sách thành ngữ
 *   meaningsForTooltip: object[], // nghĩa để hiển thị tooltip
 *   resetAll: () => void,         // fetch lại source + dữ liệu
 *   refreshDataOnly: () => void,  // chỉ fetch lại dữ liệu
 * }}
 */

export function useSourceDataForRead(source_name) {
  const [currentSource, setCurrentSource] = useState(null);
  const [existWords, setExistWords] = useState([]);
  const [existPhrases, setExistPhrases] = useState([]);
  const [existIdioms, setExistIdioms] = useState([]);
  const [meaningsForTooltip, setMeaningsForTooltip] = useState([]);

  // Each item: { chunk: string, translate: string, split: <result of splitParagraph> }
  const [translatedChunks, setTranslatedChunks] = useState([]);
  const [existTranslatedChunks, setExistTranslatedChunks] = useState([]);

  async function fetchSource() {
    const result = await fetch(`/api/sources?name=${source_name}`);
    const json = await result.json();
    setCurrentSource(json.data[0]);
  }

  async function fetchExistTranslatedChunks() {
    if (!currentSource.id) return;

    const existingTranslatedChunks = await getSourceTranslates({
      source_id: currentSource.id,
    });

    setExistTranslatedChunks(existingTranslatedChunks || []);

    //setState() is not updated same time as async/await so I have to manually passing api result
    return existingTranslatedChunks || []
  }

  async function fetchTranslations(existingTranslatedChunks = existTranslatedChunks) {
    if (!currentSource?.id) return;

    try {
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
      
      const merged = newTranslatedChunks.map((ele, idx) => ({
        ...ele,
        translate: existingTranslatedChunks[idx]?.translate || "",
      }));

      setTranslatedChunks(merged);
    } catch (err) {
      console.error("Failed to fetch translations:", err);
    }
  };

  async function fetchAll() {
    const [words, phrases, idioms, meanings] = await Promise.all([
      getAllWords({ pageIndex: 1, pageSize: null }),
      getAllPhrases({ pageIndex: 1, pageSize: null }),
      getAllIdioms({ pageIndex: 1, pageSize: null }),
      getMeaningsForTooltip(),
    ]);
    setExistWords(words.data);
    setExistPhrases(phrases.data);
    setExistIdioms(idioms.data);
    setMeaningsForTooltip(meanings);
  }

  function resetAll() {
    fetchSource();
    fetchTranslations();
    fetchAll();
  }

  function refreshDataOnly() {
    fetchAll(); // không fetchSource
  }

  async function handleTranslatedChunks() {
    if (!currentSource || !currentSource.id) return;

    const existingTranslatedChunks = await fetchExistTranslatedChunks();

    const isEditTranslate = getCompareString(translatedChunks) != getCompareString(existTranslatedChunks);

    if (isEditTranslate) {
      return;
    }

    if (isEditTranslate) {
      return;
    }

    await fetchTranslations(existingTranslatedChunks);
  }

  useEffect(() => {
    handleTranslatedChunks()
  }, [currentSource])

  useEffect(() => {
    if (source_name) resetAll();
  }, [source_name]);

  return {
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
  };

}
