import { useState, useEffect } from "react";
import { getAllWords } from "../services/word";
import { getAllPhrases } from "../services/phrases";
import { getAllIdioms } from "../services/idioms";
import { getMeaningsForTooltip } from "../services/meaning";

/**
 * Custom React hook for fetching and managing data required for reading sources.
 *
 * Responsibilities:
 * - Fetches a single source by its `source_name` (from backend `/api/sources`).
 * - Loads all known words, phrases, idioms, and meanings used for tooltips.
 * - Keeps the fetched data in local state and exposes it to consuming components.
 * - Provides a `reset()` function to refetch everything on demand.
 *
 * Usage:
 * ```jsx
 * const {
 *   currentSource,
 *   existWords,
 *   existPhrases,
 *   existIdioms,
 *   meaningsForTooltip,
 *   reset,
 * } = useSourceDataForRead(source_name);
 *
 * if (!currentSource) return <div>Loading...</div>;
 *
 * return (
 *   <ClickableWordParagraph
 *     currentSource={currentSource}
 *     existWords={existWords}
 *     existPhrases={existPhrases}
 *     existIdioms={existIdioms}
 *     meaningsForTooltip={meaningsForTooltip}
 *   />
 * );
 * ```
 *
 * @param {string} source_name - The unique name of the source to fetch.
 *
 * @returns {object} An object containing:
 * - `currentSource`: The fetched source object (or `null` if not loaded).
 * - `existWords`: Array of all existing words from the system.
 * - `existPhrases`: Array of all existing phrases.
 * - `existIdioms`: Array of all existing idioms.
 * - `meaningsForTooltip`: Array of meanings for tooltip display.
 * - `reset`: A function that refetches all the above data.
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

  function reset() {
    fetchSource();
    fetchAll();
  }

  useEffect(() => {
    if (source_name) reset();
  }, [source_name]);

  return {
    currentSource,
    existWords,
    existPhrases,
    existIdioms,
    meaningsForTooltip,
    reset,
  };
}
