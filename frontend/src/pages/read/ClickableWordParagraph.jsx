import {
  compareStandardize,
  getStandardizeWord,
} from "../../utils/standardizeWord";
import { Tooltip } from "../../components/Tooltip";
import { NEW_LINE_CHARACTER } from "../../utils/splitParagraph";
import { useSelectedText } from "../../hooks/useSelectedText";
import { getConsts } from "../../utils/const";

function getWordColor(word, existWordSet) {
  const consts = getConsts();
  if (word.type === "idiom") return consts.IDIOM_COLOR;
  if (word.type === "phrase") return consts.PHRASE_COLOR;
  if (word.type === "word") {
    const standardized = getStandardizeWord({ word: word.value });
    return existWordSet.has(standardized) ? consts.WORD_COLOR : "black";
  }
  return "black";
}

function getTooltipContent(word, idiomMap, phraseMap, meaningMap) {
  if (word.type === "idiom") {
    return idiomMap.get(word.value) || "";
  }
  if (word.type === "phrase") {
    return phraseMap.get(word.value) || "";
  }
  if (word.type === "word") {
    const standardized = getStandardizeWord({ word: word.value });
    const meanings = meaningMap.get(standardized);
    if (meanings) {
      return (
        <ul>
          {meanings.map((ele) => (
            <li
              key={ele.meaning}
            >{`${ele.meaning} (${ele.part_of_speech})`}</li>
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
  existWordSet,
  idiomMap,
  phraseMap,
  meaningMap,
  setCurrentWord = () => {},
  openPopup = () => {},
}) {
  const selectedText = useSelectedText();

  return (
    <div style={{ wordWrap: "break-word" }}>
      {currentSource.map((word, index) => {
        if (word.value === NEW_LINE_CHARACTER) return <br key={index} />;

        const color = getWordColor(word, existWordSet);
        const tooltipContent = getTooltipContent(
          word,
          idiomMap,
          phraseMap,
          meaningMap
        );

        //return <div>{word.value}</div>

        return (
          <Tooltip
            key={index}
            isDisable={selectedText.length !== 0}
            content={tooltipContent}
          >
            {getConsts().SPECIAL_CHARACTERS.includes(word.value) ? null : (
              <>&nbsp;</>
            )}
            <span
              style={{
                cursor: "pointer",
                marginRight: "0px",
                color: color,
                whiteSpace: "nowrap",
              }}
              onDoubleClick={() =>
                handleDoubleClick(word, setCurrentWord, openPopup)
              }
            >
              {word.value}
            </span>
          </Tooltip>
        );
      })}
    </div>
  );
}
