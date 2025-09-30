import { useLocation } from "react-router-dom";
import { ClickableWordParagraph } from "./ClickableWordParagraph";
import { Popup } from "./Popup";
import { useSourceDataForRead } from "../../hooks/useSourceDataForRead";
import { usePopupForRead } from "../../hooks/usePopupForRead";

export function Read() {
  const location = useLocation();
  const source_name = new URLSearchParams(location.search).get("source_name");

  const {
    currentSource,
    existWords,
    existPhrases,
    existIdioms,
    meaningsForTooltip,
    resetAll,
  } = useSourceDataForRead(source_name);

  const { currentWord, showPopup, openPopup, handleClose, setCurrentWord } =
    usePopupForRead(resetAll);

  if (!source_name) return <div>No source selected!</div>;
  if (!currentSource) return <div>Can't find source = {source_name}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Title: {currentSource.name}</h1>

      <ClickableWordParagraph
        currentSource={currentSource}
        existWords={existWords}
        existPhrases={existPhrases}
        existIdioms={existIdioms}
        meaningsForTooltip={meaningsForTooltip}
        setCurrentWord={setCurrentWord}
        openPopup={openPopup}
      />

      <Popup
        show={showPopup}
        title="Add"
        word={currentWord}
        handleClose={handleClose}
      />
    </div>
  );
}
