import { FillInBank } from "./fill_in_blank/FillInBank";
import { MultipleChoice } from "./multiple_choice/MultipleChoice";
import { GivingExample } from "./giving_example/GivingExample";
import { Radio } from "../../components/Radio";
import { Button } from "../../components/Button";
import { PageTitle } from "../../components/PageTitle";
import { getTranslation as _getTranslation } from "../../utils/getTranslation";
import { translation } from "./Exercise.Translation";
import { CARD } from "../../ui_converntion/Card";
import { Heading1 } from "../../components/heading/Heading1";
import { useMemo, useState, useEffect } from "react";
import { animate, stagger } from "animejs";
import { useAnimeEaseOutQuad } from "../../hooks/useAnimeEaseOutQuad";

const getTranslation = (key) => _getTranslation(key, translation, "Exercise");

const EXERCISE = {
  MCQ: "MCQ",
  RANDOM: "RANDOM",
  FILL_IN_BLANK: "FILL_IN_BLANK",
  EXAMPLE: "EXAMPLE",
};

export function ExerciseMobile({ choice, setChoice, tick, setTick }) {
  const cardStyle = `${CARD.PADDING} bg-white ${CARD.SHADOW} ${CARD.CORNER_RADIUS} ${CARD.BORDER}`;

  const startExercise = () => setTick((t) => t + 1);

  useAnimeEaseOutQuad(".my_radio");

  return (
    <div className="p-4 bg-gray-100 min-h-[90vh] flex flex-col md:hidden">
      {/* MOBILE ONLY */}
      <PageTitle title={getTranslation("Title")} />

      <div className={`flex flex-col gap-4 mb-4 ${cardStyle}`}>
        <Heading1 className="mb-2">{getTranslation("PickYouType")}</Heading1>

        <div className="flex flex-col gap-3">
          <Radio
            className="my_radio"
            value={EXERCISE.MCQ}
            checked={choice === EXERCISE.MCQ}
            onClick={() => setChoice(EXERCISE.MCQ)}
          >
            {getTranslation("MultipleChoice")}
          </Radio>

          <Radio
            className="my_radio"
            value={EXERCISE.FILL_IN_BLANK}
            checked={choice === EXERCISE.FILL_IN_BLANK}
            onClick={() => setChoice(EXERCISE.FILL_IN_BLANK)}
          >
            {getTranslation("FillInBlank")}
          </Radio>

          <Radio
            className="my_radio"
            value={EXERCISE.EXAMPLE}
            checked={choice === EXERCISE.EXAMPLE}
            onClick={() => setChoice(EXERCISE.EXAMPLE)}
          >
            {getTranslation("Example")}
          </Radio>

          <Radio
            className="my_radio"
            value={EXERCISE.RANDOM}
            checked={choice === EXERCISE.RANDOM}
            onClick={() => setChoice(EXERCISE.RANDOM)}
          >
            {getTranslation("Random")}
          </Radio>
        </div>

        <Button text="Go" className="w-full" onClick={startExercise} />
      </div>

      <div className={`${cardStyle} flex-1`}>
        {choice === EXERCISE.FILL_IN_BLANK && (
          <FillInBank key={tick} reset={startExercise} />
        )}

        {choice === EXERCISE.MCQ && (
          <MultipleChoice key={tick} reset={startExercise} />
        )}

        {choice === EXERCISE.EXAMPLE && (
          <GivingExample key={tick} reset={startExercise} />
        )}

        {choice === EXERCISE.RANDOM &&
          (() => {
            const exercises = [
              EXERCISE.FILL_IN_BLANK,
              EXERCISE.MCQ,
              EXERCISE.EXAMPLE,
            ];

            const randomPick =
              exercises[Math.floor(Math.random() * exercises.length)];

            switch (randomPick) {
              case EXERCISE.FILL_IN_BLANK:
                return <FillInBank key={tick} reset={startExercise} />;
              case EXERCISE.MCQ:
                return <MultipleChoice key={tick} reset={startExercise} />;
              case EXERCISE.EXAMPLE:
                return <GivingExample key={tick} reset={startExercise} />;
              default:
                return null;
            }
          })()}
      </div>
    </div>
  );
}
