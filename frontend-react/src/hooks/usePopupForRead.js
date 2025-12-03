import { useState } from "react";

export function usePopupForRead(refresh) {
  const [currentWord, setCurrentWord] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  function openPopup({ word }) {
    setCurrentWord(word);
    setShowPopup(true);
  }

  function handleClose() {
    setCurrentWord("");
    setShowPopup(false);
    refresh();
  }

  return { currentWord, showPopup, openPopup, handleClose, setCurrentWord };
}
