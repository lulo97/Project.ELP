import { useMemo, useState, useEffect } from "react";
import { FillInBank } from "./fill_in_blank/FillInBank";
import { MultipleChoice } from "./multiple_choice/MultipleChoice";
import { GivingExample } from "./giving_example/GivingExample";
import { Radio } from "../../components/Radio";
import { Button } from "../../components/Button";
import { PageTitle } from "../../components/PageTitle";
import { getTranslation as _getTranslation } from "../../utils/getTranslation";
import { translation } from "./Exercise.Translation";
import { useDeviceType } from "../../hooks/useDeviceType";
import { ExerciseMobile } from "./Exercise.Mobile";
import { CARD } from "../../ui_converntion/Card";
import { Heading1 } from "../../components/heading/Heading1";

const getTranslation = (key) => _getTranslation(key, translation, "Exercise");

const EXERCISE = {
  MCQ: "MCQ",
  RANDOM: "RANDOM",
  FILL_IN_BLANK: "FILL_IN_BLANK",
  EXAMPLE: "EXAMPLE",
};

export function Exercise() {
  const [tick, setTick] = useState(0);
  const device = useDeviceType();

  const [choice, setChoice] = useState(EXERCISE.MCQ);

  const cardStyle = `${CARD.PADDING} bg-white ${CARD.SHADOW} ${CARD.CORNER_RADIUS} ${CARD.BORDER}`;
  
  if (device == "mobile") {
    return (
      <ExerciseMobile
        tick={tick}
        setTick={setTick}
        choice={choice}
        setChoice={setChoice}
      />
    );
  }

  return (
    <div className="p-4 bg-gray-100 min-h-[90vh] flex flex-col">
      <PageTitle title={getTranslation("Title")} />

      <div className={`flex justify-between items-center mb-4 ${cardStyle}`}>
        <div className="">
          <Heading1
            className="mb-2"
            _children={getTranslation("PickYouType")}
          />

          <div className="flex flex-wrap gap-3 mb-2">
            <Radio
              value={EXERCISE.MCQ}
              checked={choice == EXERCISE.MCQ}
              onClick={(event) => {
                setChoice(EXERCISE.MCQ);
              }}
            >
              {getTranslation("MultipleChoice")}
            </Radio>

            <Radio
              value={EXERCISE.FILL_IN_BLANK}
              checked={choice == EXERCISE.FILL_IN_BLANK}
              onClick={(event) => {
                setChoice(EXERCISE.FILL_IN_BLANK);
              }}
            >
              {getTranslation("FillInBlank")}
            </Radio>

            <Radio
              value={EXERCISE.EXAMPLE}
              checked={choice == EXERCISE.EXAMPLE}
              onClick={(event) => {
                setChoice(EXERCISE.EXAMPLE);
              }}
            >
              {getTranslation("Example")}
            </Radio>

            <Radio
              value={EXERCISE.RANDOM}
              checked={choice == EXERCISE.RANDOM}
              onClick={(event) => {
                setChoice(EXERCISE.RANDOM);
              }}
            >
              {getTranslation("Random")}
            </Radio>
          </div>
        </div>

        <Button
          text="Go"
          className="h-fit px-8"
          onClick={() => {
            setTick((t) => t + 1);
          }}
        />
      </div>

      <div className={`${cardStyle} flex-1`}>
        {choice === EXERCISE.FILL_IN_BLANK && (
          <FillInBank key={tick} reset={() => setTick((t) => t + 1)} />
        )}
        {choice === EXERCISE.MCQ && (
          <MultipleChoice key={tick} reset={() => setTick((t) => t + 1)} />
        )}
        {choice === EXERCISE.EXAMPLE && (
          <GivingExample key={tick} reset={() => setTick((t) => t + 1)} />
        )}
        {choice === EXERCISE.RANDOM &&
          (() => {
            const exercises = [
              EXERCISE.FILL_IN_BLANK,
              EXERCISE.MCQ,
              EXERCISE.EXAMPLE,
            ];

            const randomExercise =
              exercises[Math.floor(Math.random() * exercises.length)];

            switch (randomExercise) {
              case EXERCISE.FILL_IN_BLANK:
                return (
                  <FillInBank key={tick} reset={() => setTick((t) => t + 1)} />
                );
              case EXERCISE.MCQ:
                return (
                  <MultipleChoice
                    key={tick}
                    reset={() => setTick((t) => t + 1)}
                  />
                );
              case EXERCISE.EXAMPLE:
                return (
                  <GivingExample
                    key={tick}
                    reset={() => setTick((t) => t + 1)}
                  />
                );
              default:
                return null;
            }
          })()}
      </div>
    </div>
  );
}
