import { useState, useEffect } from "react";
import { getAllWords } from "../services/word";
import { getAllPhrases } from "../services/phrases";
import { getAllIdioms } from "../services/idioms";
import { getMeaningsForTooltip } from "../services/meaning";

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

  async function fetchSource() {
    const result = await fetch(`/api/sources?name=${source_name}`);
    const json = await result.json();
    setCurrentSource(json.data[0]);
  }

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
    fetchAll();
  }

  function refreshDataOnly() {
    fetchAll(); // không fetchSource
  }


  useEffect(() => {
    if (source_name) resetAll();
  }, [source_name]);

  return {
    currentSource,
    existWords,
    existPhrases,
    existIdioms,
    meaningsForTooltip,
    resetAll,
    refreshDataOnly,
  };

}
