import { Textarea } from "../../components/Textarea";
import { getTranslation } from "../../utils/getTranslation";
import { translation } from "./Read.Translate";

export function TranslateDetail({ translate, idx, handleSaveTranslateChunk }) {
  return (
    <details className="pl-1" open={!!translate}>
      <summary
        style={{ userSelect: "none", cursor: "pointer" }}
        className="text-gray-500 mb-1 text-sm"
      >
        {getTranslation("Translate", translation)}
      </summary>
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
