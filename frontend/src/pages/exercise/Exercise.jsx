import { useMemo, useState } from "react";
import { FillInBank } from "./FillInBank";
import { MultipleChoice } from "./MultipleChoice";
import { GivingExample } from "./GivingExample";

export function Exercise() {
  const [tick, setTick] = useState(0);

  // randomly choose one of three exercise types
  const choice = useMemo(() => {
    const types = ["fill", "multi", "example"];
    return types[Math.floor(Math.random() * types.length)];
  }, [tick]);

  return (
    <>
      {choice === "fill" && (
        <FillInBank key={tick} reset={() => setTick(t => t + 1)} />
      )}
      {choice === "multi" && (
        <MultipleChoice key={tick} reset={() => setTick(t => t + 1)} />
      )}
      {choice === "example" && (
        <GivingExample key={tick} reset={() => setTick(t => t + 1)} />
      )}
    </>
  );
}
