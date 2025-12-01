import React, { useEffect, useRef, useState } from "react";

export function Dropdown({
  children,
  menu = [{ key: "key", content: "content", onClick: () => {} }],
  closeOnSelect = true,
  className = "",
  panelClassName = "",
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function toggle(e) {
    e?.preventDefault();
    setOpen((v) => !v);
  }

  function onItemActivate(item, idx, e) {
    if (!item.onClick) throw Error("Item doesn't have onClick!");
    item.onClick(e);
    if (closeOnSelect) setOpen(false);
  }

  return (
    <div ref={rootRef} className={`relative inline-block ${className}`}>
      <div
        className="inline-flex items-center cursor-pointer"
        onClick={toggle}
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {children}
      </div>

      {open && (
        <div
          ref={panelRef}
          aria-orientation="vertical"
          className={`absolute z-50 mt-2 w-48 right-0 shadow-lg border-2 border-solid bg-white rounded-md py-1 ${panelClassName}`}
        >
          {menu.map((it, i) => (
            <button
              key={it.key ?? i}
              tabIndex={-1}
              onClick={(e) => onItemActivate(it, i, e)}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:bg-indigo-50"
            >
              {it.content}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
