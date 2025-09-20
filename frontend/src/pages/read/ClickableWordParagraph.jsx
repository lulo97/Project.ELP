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

export function ClickableWordParagraph({
  currentSource,
  existWords = [],
  meaningsForTooltip = [],
  setCurrentWord = () => {},
  openPopup = () => {},
}) {
  const rawSource = currentSource.source.split(" ");
  const rawSourceWithNewLines = splitParagraphContainsNewLines(rawSource);

  const selectedText = useSelectedText();

  return (
    <div
      style={{
        wordWrap: "break-word",
      }}
    >
      {rawSourceWithNewLines.map((word, index) => {
        if (word == NEW_LINE_CHARACTER) {
          return <br />;
        }

        const exist_word = existWords
          .map((ele) => ele.word)
          .find((ele) => {
            return compareStandardize(ele, word);
          });

        const color = exist_word ? "blue" : "black";

        const currentMeaningTooltip = meaningsForTooltip.find((ele) => {
          return compareStandardize(ele.word, word);
        });

        const tooltipContent = [null, undefined, ""].includes(
          currentMeaningTooltip
        ) ? (
          "Unknown meaning!"
        ) : (
          <ul>
            {currentMeaningTooltip.meanings.map((ele) => {
              return <li>{`${ele.meaning} (${ele.part_of_speech})`}</li>;
            })}
          </ul>
        );

        return (
          <Tooltip isDisable={selectedText.length != 0} content={tooltipContent}>
            <span
              key={index}
              style={{
                cursor: "pointer",
                marginRight: "0px",
                color: color,
                whiteSpace: "nowrap",
              }}
              onDoubleClick={() => {
                const standardize_word = getStandardizeWord({ word: word });
                setCurrentWord(standardize_word);
                openPopup({ word: standardize_word, action: "ADD" });
              }}
            >
              {word}
            </span>
            &nbsp;
          </Tooltip>
        );
      })}
    </div>
  );
}
