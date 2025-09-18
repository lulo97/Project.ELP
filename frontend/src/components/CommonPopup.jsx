import { Button } from "./Button";

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
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div
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
        <div className="px-6 py-3 border-t flex justify-end gap-2">
          <Button text="Close" onClick={handleClose} />
          {isShowConfirmButton && (
            <Button text="Confirm" onClick={handleConfirm} />
          )}
        </div>
      </div>
    </div>
  );
}
