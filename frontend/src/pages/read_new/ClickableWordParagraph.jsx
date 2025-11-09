import {
  getStandardizeWord,
} from "../../utils/standardizeWord";
import { Tooltip } from "../../components/Tooltip";
import { NEW_LINE_CHARACTER, splitParagraph } from "../../utils/splitParagraph";
import { useSelectedText } from "../../hooks/useSelectedText";
import { getConsts } from "../../utils/const";
import { EMPTY_STATE } from "../read_new/Read";

function getWordColor({ unit, words }) {
  const consts = getConsts();
  if (unit.type === "idiom") return consts.IDIOM_COLOR;
  if (unit.type === "phrase") return consts.PHRASE_COLOR;
  if (unit.type === "word") {
    const standardized = getStandardizeWord({ word: unit.value });
    return words.map(ele => ele.word).includes(standardized) ? consts.WORD_COLOR : "black";
  }
  return "black";
}

function getTooltipContent({ unit, idioms, phrases, meanings }) {
  if (unit.type === "idiom") {
    return idioms.includes(word.value) || "";
  }
  if (unit.type === "phrase") {
    return phrases.includes(word.value) || "";
  }
  if (unit.type === "word") {
    const word_standardized = getStandardizeWord({ word: unit.value });
    const word_meanings = meanings.filter((ele) => ele.word == word_standardized);
    if (word_meanings && word_meanings.length > 0) {
      return (
        <ul>
          {word_meanings.map((ele) => (
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

function handleDoubleClick({ unit, setState }) {
  const standardize_word = getStandardizeWord({ word: unit.value });
  setState((state) => {
    return {
      ...state,
      word_row: {
        ...state.word_row,
        word: standardize_word,
      },
      open_popup: true,
      action: "ADD",
    };
  });
}

export function ClickableWordParagraph({
  state = EMPTY_STATE,
  setState = () => {},
}) {
  const selectedText = useSelectedText();

  const units = splitParagraph({
    source: state.source_row.source,
    existPhrases: state.phrases,
    existIdioms: state.idioms,
  });

  return (
    <div style={{ wordWrap: "break-word" }}>
      {units.map((unit, index) => {
        if (unit.value === NEW_LINE_CHARACTER) return <br key={index} />;

        const color = getWordColor({ unit: unit, words: state.words});
        const tooltipContent = getTooltipContent({
          unit: unit,
          idioms: state.idioms,
          phrases: state.phrases,
          meanings: state.meanings,
        });

        return (
          <Tooltip
            key={index}
            isDisable={selectedText.length !== 0}
            content={tooltipContent}
          >
            {getConsts().SPECIAL_CHARACTERS.includes(unit.value) ? null : (
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
                handleDoubleClick({ unit: unit, setState: setState })
              }
            >
              {unit.value}
            </span>
          </Tooltip>
        );
      })}
    </div>
  );
}
