import { Textarea } from "../../components/Textarea";
import { getTranslation } from "../../utils/getTranslation";
import { translation } from "./Read.Translate";

export function TranslateDetail({ translate, idx, handleSaveTranslateChunk }) {
  return (
    <details className="pl-1" open={!!translate}>
      <summary className="text-gray-500">{getTranslation("Translate", translation)}</summary>
      <Textarea
        isFitContent={true}
        value={translate}
        onChange={(event) =>
          handleSaveTranslateChunk({ idx: idx, translate: event.target.value })
        }
        className="w-full h-fit"
        placeholder="Enter translate..."
      />{" "}
    </details>
  );
}
