import {
  compareStandardize,
  getStandardizeWord,
} from "../../utils/standardizeWord";
import { Tooltip } from "../../components/Tooltip";
import { NEW_LINE_CHARACTER } from "../../utils/splitParagraph";
import { useSelectedText } from "../../hooks/useSelectedText";
import { getConsts } from "../../utils/const";

function getWordColor(word, existWords) {
  if (word.type === "idiom") return getConsts().IDIOM_COLOR;
  if (word.type === "phrase") return getConsts().PHRASE_COLOR;
  if (word.type === "word") {
    const exist_word = existWords
      .map((ele) => ele.word)
      .find((ele) => compareStandardize(ele, word.value));
    return exist_word ? getConsts().WORD_COLOR : "black";
  }
  return "black";
}

function getTooltipContent(
  word,
  existWords,
  existPhrases,
  existIdioms,
  meaningsForTooltip
) {
  if (word.type === "idiom") {
    return existIdioms.find((ele) => ele.idiom === word.value)?.meaning || "";
  }
  if (word.type === "phrase") {
    return existPhrases.find((ele) => ele.phrase === word.value)?.meaning || "";
  }
  if (word.type === "word") {
    const currentMeaningTooltip = meaningsForTooltip.find((ele) =>
      compareStandardize(ele.word, word.value)
    );
    if (currentMeaningTooltip) {
      return (
        <ul>
          {currentMeaningTooltip.meanings.map((ele) => (
            <li>{`${ele.meaning} (${ele.part_of_speech})`}</li>
          ))}
        </ul>
      );
    } else {
      return <div>No meaning yet</div>;
    }
  }
  return "";
}

function handleDoubleClick(word, setCurrentWord, openPopup) {
  const standardize_word = getStandardizeWord({ word: word.value });
  setCurrentWord(standardize_word);
  openPopup({ word: standardize_word, action: "ADD" });
}

export function ClickableWordParagraph({
  currentSource = [{ value: null, type: null }],
  existWords = [],
  existPhrases = [],
  existIdioms = [],
  meaningsForTooltip = [],
  setCurrentWord = () => {},
  openPopup = () => {},
}) {
  const { selectedText } = useSelectedText();

  /**
   * Input: [ { value, type }, ... ]
   *
   * Output: { A: [ { value, type }, ... ], B: [], ... Z: [] }
   */
  const groupedWords = currentSource.reduce((acc, word) => {
    if (!word.value || word.value === NEW_LINE_CHARACTER) return acc;
    const firstLetter = word.value[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(word);
    return acc;
  }, {});

  const letters = Object.keys(groupedWords).sort();

  return (
    <div>
      {letters.map((letter) => {
        const words = groupedWords[letter];
        return (
          <div
            key={letter}
            className="mb-3 bg-white border border-gray-200 rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-semibold text-lg">
                  {letter}
                </div>
              </div>
              <div className="text-sm text-gray-400">{words.length} words</div>
            </div>

            <div className="flex flex-wrap gap-2">
              {words.map((word, index) => {
                if (word.value === NEW_LINE_CHARACTER) return null;

                const color = getWordColor(word, existWords);
                const tooltipContent = getTooltipContent(
                  word,
                  existWords,
                  existPhrases,
                  existIdioms,
                  meaningsForTooltip
                );

                return (
                  <Tooltip
                    content={tooltipContent}
                    isDisable={selectedText.length !== 0}
                    key={index}
                  >
                    <button
                      onDoubleClick={() =>
                        handleDoubleClick(word, setCurrentWord, openPopup)
                      }
                      className="px-3 py-1 rounded-full text-sm border border-transparent hover:border-gray-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      title={
                        typeof tooltipContent === "string"
                          ? tooltipContent
                          : undefined
                      }
                      style={{ color }}
                    >
                      {word.value}
                    </button>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
