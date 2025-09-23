import React, { useRef, useState } from "react";

export function SplitPane({
  left,
  right,
  actions = null,
  initialLeftWidth = 50, // % width
  min = 10,
  max = 90,
  className = "",
  height = "300px",
}) {
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth);
  const containerRef = useRef(null);
  const isResizing = useRef(false);

  const onMouseDown = () => {
    isResizing.current = true;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    if (!isResizing.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let newLeftWidth =
      ((e.clientX - rect.left) / (rect.width)) *
      100;
    if (newLeftWidth < min) newLeftWidth = min;
    if (newLeftWidth > max) newLeftWidth = max;
    setLeftWidth(newLeftWidth);
  };

  const onMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      style={{ height }}
      className={`flex flex-row border rounded-lg shadow-md ${className}`}
    >
      {/* Split area fills remaining space */}
      <div ref={containerRef} className="flex flex-1 gap-2 py-4 pr-2 pl-4">
        {/* Left panel */}
        <div className="h-full" style={{ width: `${leftWidth}%` }}>
          {left}
        </div>

        {/* Divider */}
        <div
          className="w-1 bg-gray-300 hover:bg-gray-500 cursor-col-resize"
          onMouseDown={onMouseDown}
        />

        {/* Right panel */}
        <div className="h-full flex-1" style={{ width: `${100 - leftWidth}%` }}>
          {right}
        </div>
      </div>

      {/* Actions on the right */}
      {actions && <div className="border-l py-4 pr-4 pl-2">{actions}</div>}
    </div>
  );
}
