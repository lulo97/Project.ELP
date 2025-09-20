import {
  compareStandardize,
  getStandardizeWord,
} from "../../utils/standardizeWord";
import { Tooltip } from "../../components/Tooltip";
import {
  NEW_LINE_CHARACTER,
  splitParagraphContainsNewLines,
} from "../../utils/splitParagraphContainsNewLines";
import { useEffect, useState } from "react";
import { getWindowSelectedText } from "../../utils/getWindowSelectedText";
import { useSelectedText } from "../../hooks/useSelectedText";
import { getSplittedSourceWithType } from "../../utils/getSplittedSourceWithType";
import { splitParagraphContainsSpecialCharacters } from "../../utils/splitParagraphContainsSpecialCharacters";
import { SPECIAL_CHARACTERS } from "../../utils/const";

export function ClickableWordParagraph({
  currentSource,
  existWords = [],
  existPhrases = [],
  meaningsForTooltip = [],
  setCurrentWord = () => {},
  openPopup = () => {},
}) {
  const rawSource = currentSource.source.split(" ");
  const rawSourceWithNewLines = splitParagraphContainsNewLines(rawSource);
  const rawSourceWithSpecialCharaters = splitParagraphContainsSpecialCharacters(
    rawSourceWithNewLines
  );
  const rawSourceSplittedWithType = getSplittedSourceWithType({
    words: rawSourceWithSpecialCharaters,
    phrases: existPhrases.map((ele) => ele.phrase),
  });

  const selectedText = useSelectedText();

  return (
    <div
      style={{
        wordWrap: "break-word",
      }}
    >
      {rawSourceSplittedWithType.map((word, index) => {
        let color = "black";
        let tooltipContent = "";

        if (word.type == "phrase") {
          color = "red";

          tooltipContent = existPhrases.find((ele) => {
            return ele.phrase == word.value;
          }).meaning;
        }

        //Setting up for word color
        if (word.type == "word") {
          const exist_word = existWords
            .map((ele) => ele.word)
            .find((ele) => {
              return compareStandardize(ele, word.value);
            });

          color = exist_word ? "blue" : "black";

          //Setting up for tooltip content
          const currentMeaningTooltip = meaningsForTooltip.find((ele) => {
            return compareStandardize(ele.word, word.value);
          });

          if (currentMeaningTooltip) {
            tooltipContent = (
              <ul>
                {currentMeaningTooltip.meanings.map((ele) => {
                  return <li>{`${ele.meaning} (${ele.part_of_speech})`}</li>;
                })}
              </ul>
            );
          }
        }

        if (word.value == NEW_LINE_CHARACTER) {
          return <br />;
        }

        return (
          <Tooltip
            isDisable={selectedText.length != 0}
            content={tooltipContent}
          >
            {SPECIAL_CHARACTERS.includes(word.value) ? null : <>&nbsp;</>}

            <span
              key={index}
              style={{
                cursor: "pointer",
                marginRight: "0px",
                color: color,
                whiteSpace: "nowrap",
              }}
              onDoubleClick={() => {
                const standardize_word = getStandardizeWord({
                  word: word.value,
                });
                setCurrentWord(standardize_word);
                openPopup({ word: standardize_word, action: "ADD" });
              }}
            >
              {word.value}
            </span>
          </Tooltip>
        );
      })}
    </div>
  );
}
