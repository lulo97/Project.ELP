import { useState, useRef, useEffect } from "react";
import { Button } from "./Button";

export function FloatingSettings({ children = null }) {
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

  return (
    <div
      ref={ref}
      className="fixed bottom-6 right-6 flex items-end flex-col gap-2"
    >
      {/* Popup */}
      {open && (
        <div className="mt-3 w-48 rounded-lg shadow-lg bg-white border border-gray-200 p-4">
          <h2 className="font-semibold text-gray-700 mb-2">Settings</h2>
          {children}
        </div>
      )}

      {/* Floating Button */}
      <Button
        text={"⚙️"}
        onClick={() => setOpen(!open)}
        className="px-2 py-1 rounded-md shadow-lg bg-gray-800 text-white hover:bg-gray-700 transition w-fit"
      />
    </div>
  );
}
