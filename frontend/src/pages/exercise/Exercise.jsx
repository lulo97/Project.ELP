import { useMemo, useState } from "react";
import { FillInBank } from "./FillInBank";
import { MultipleChoice } from "./MultipleChoice";

export function Exercise() {
  const [tick, setTick] = useState(0);

  // choose which type of exercise to render
  const choice = useMemo(() => {
    return Math.random() < 0.5 ? "fill" : "multi";
  }, [tick]);

  return (
    <>
      {choice === "fill" ? (
        <FillInBank key={tick} reset={() => setTick(t => t + 1)} />
      ) : (
        <MultipleChoice key={tick} reset={() => setTick(t => t + 1)} />
      )}
    </>
  );
}
