import { Textarea } from "../../components/Textarea";

export function TranslateDetail({ translate, idx, handleSaveTranslateChunk }) {
  return (
    <details className="pl-1" open={!!translate}>
      <summary className="text-gray-500">Translate</summary>
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
