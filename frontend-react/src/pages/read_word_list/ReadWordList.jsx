import { useLocation } from "react-router-dom";
import { ClickableWordParagraph } from "./ClickableWordParagraph";
import { Popup } from "../read/Popup";
import { useSourceDataForRead } from "../../hooks/useSourceDataForRead";
import { usePopupForRead } from "../../hooks/usePopupForRead";
import { NEW_LINE_CHARACTER, splitParagraph } from "../../utils/splitParagraph";
import { getConsts } from "../../utils/const";

function toWordList({ source = "", existPhrases = [], existIdioms = [] }) {
  let _source = source.toLowerCase();

  for (const character of getConsts().SPECIAL_CHARACTERS) {
    _source = _source.replaceAll(character, "");

    if (_source.includes(character)) {
      throw Error(character);
    }
  }

  const splited_source = splitParagraph({
    source: _source,
    existPhrases: existPhrases,
    existIdioms: existIdioms,
  });

  const uniqueMap = new Map();
  splited_source.forEach((item) => {
    if (!uniqueMap.has(item.value)) {
      uniqueMap.set(item.value, item);
    }
  });

  let filtered_source = Array.from(uniqueMap.values());

  filtered_source = filtered_source.filter((ele) => {
    //If word contains number then it's not word
    if (!isNaN(parseInt(ele.value))) return false;
    if (getConsts().SPECIAL_CHARACTERS.includes(ele.value)) return false;
    if (NEW_LINE_CHARACTER == ele.value) return false;
    return true;
  });

  const sorted_source = filtered_source.sort((a, b) => {
    if (a.value < b.value) return -1;
    if (a.value > b.value) return 1;
    return 0;
  });

  const word_list = sorted_source.flatMap((ele) => [
    ele,
    { value: NEW_LINE_CHARACTER, type: null },
  ]);

  return word_list;
}

export function ReadWordList() {
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

  const word_list = toWordList({
    source: currentSource.source,
    existPhrases: existPhrases,
    existIdioms: existIdioms,
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Title: {currentSource.name}</h1>

      <ClickableWordParagraph
        currentSource={word_list}
        existWords={existWords || []}
        existPhrases={existPhrases || []}
        existIdioms={existIdioms || []}
        meaningsForTooltip={meaningsForTooltip || []}
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
