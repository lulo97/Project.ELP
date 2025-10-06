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
      .map(ele => ele.word)
      .find(ele => compareStandardize(ele, word.value));
    return exist_word ? getConsts().WORD_COLOR : "black";
  }
  return "black";
}

function getTooltipContent(word, existWords, existPhrases, existIdioms, meaningsForTooltip) {
  if (word.type === "idiom") {
    return existIdioms.find(ele => ele.idiom === word.value)?.meaning || "";
  }
  if (word.type === "phrase") {
    return existPhrases.find(ele => ele.phrase === word.value)?.meaning || "";
  }
  if (word.type === "word") {
    const currentMeaningTooltip = meaningsForTooltip.find(ele =>
      compareStandardize(ele.word, word.value)
    );
    if (currentMeaningTooltip) {
      return (
        <ul>
          {currentMeaningTooltip.meanings.map(ele => (
            <li>{`${ele.meaning} (${ele.part_of_speech})`}</li>
          ))}
        </ul>
      );
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
  const selectedText = useSelectedText();

  return (
    <div style={{ wordWrap: "break-word" }}>
      {currentSource.map((word, index) => {
        if (word.value === NEW_LINE_CHARACTER) return <br key={index} />;

        const color = getWordColor(word, existWords);
        const tooltipContent = getTooltipContent(word, existWords, existPhrases, existIdioms, meaningsForTooltip);

        return (
          <Tooltip key={index} isDisable={selectedText.length !== 0} content={tooltipContent}>
            {getConsts().SPECIAL_CHARACTERS.includes(word.value) ? null : <>&nbsp;</>}
            <span
              style={{
                cursor: "pointer",
                marginRight: "0px",
                color: color,
                whiteSpace: "nowrap",
              }}
              onDoubleClick={() => handleDoubleClick(word, setCurrentWord, openPopup)}
            >
              {word.value}
            </span>
          </Tooltip>
        );
      })}
    </div>
  );
}

