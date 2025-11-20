import { useSelectedText } from "../hooks/useSelectedText";
import { getTranslation } from "../utils/getTranslation";
import { Button } from "./Button";
import { useRef } from "react";

export function CommonPopup({
  show,
  title,
  children,
  overWrittenBoxStyle = {},
  handleConfirm = () => {},
  handleClose = () => {},
  isShowConfirmButton = true,
  width = "",
  height = "",
  customButton = null,
}) {
  const selectedText = useSelectedText();

  if (!show) return null;

  let footerClassname = "px-6 py-3 border-t flex justify-end gap-2";
  if (isShowConfirmButton && !customButton) footerClassname = footerClassname.replace("justify-end", "justify-between")

  return (
    <div
      onClick={(e) => {
        if (selectedText && selectedText.length > 0) return;
        handleClose()
      }}
      className="fixed inset-0 flex items-center justify-center bg-black/30 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-lg flex flex-col"
        style={{
          width: width || "90%",
          maxWidth: "90%",
          height: height || "auto",
          maxHeight: "90%",
          ...overWrittenBoxStyle,
        }}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b font-semibold text-lg text-gray-800">
          {title}
        </div>

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto flex-1 text-gray-700">
          {children}
        </div>

        {/* Footer */}
        <div className={footerClassname}>
          <Button text={getTranslation("Close")} onClick={handleClose} />
          {isShowConfirmButton && (
            <Button text={getTranslation("Confirm")} onClick={handleConfirm} />
          )}
          {customButton}
        </div>
      </div>
    </div>
  );
}
