import { useState } from "react";

export function usePopupForRead(refreshDataOnly) {
  const [currentWord, setCurrentWord] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  function openPopup({ word }) {
    setCurrentWord(word);
    setShowPopup(true);
  }

  function handleClose() {
    setCurrentWord("");
    setShowPopup(false);
    refreshDataOnly(); // không làm đổi currentSentence
  }

  return { currentWord, showPopup, openPopup, handleClose, setCurrentWord };
}

