import { Button } from "./Button";

export function CommonPopup({
  show,
  title,
  children,
  overWrittenBoxStyle = {},
  handleConfirm = () => {},
  handleClose = () => {},
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div
        className="bg-white w-[90%] md:w-[600px] max-h-[90%] rounded-lg shadow-lg flex flex-col"
        style={overWrittenBoxStyle}
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
          <Button text="Confirm" onClick={handleConfirm} />
        </div>
      </div>
    </div>
  );
}
