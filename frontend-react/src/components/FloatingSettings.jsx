import { useState, useRef, useEffect } from "react";
import { Button } from "./Button";

export function FloatingSettings({
  title = "Settings",
  button_icon = "⚙️",
  children = null,
  position = { bottom: "6", right: "6" },
  button_color = "bg-gray-800 text-white hover:bg-gray-700",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dynamically generate position classes
  const positionClasses = `fixed ${position.bottom ? `bottom-${position.bottom}` : ""} ${
    position.right ? `right-${position.right}` : ""
  } flex items-end flex-col gap-2`;

  return (
    <div ref={ref} className={`${positionClasses}`}>
      {/* Popup */}
      {open && (
        <div className="mt-3 min-w-48 rounded-lg shadow-lg bg-white border border-gray-200 p-4">
          <h2 className="font-semibold text-gray-700 mb-2">{title}</h2>
          {children}
        </div>
      )}

      {/* Floating Button */}
      <Button
        text={button_icon}
        onClick={() => setOpen(!open)}
        className={
          `px-2 py-1 rounded-md shadow-lg transition min-w-10 ${button_color}`
        }
      />
    </div>
  );
}
