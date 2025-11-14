import React, { useRef, useState } from "react";

export function SplitPane({
  left,
  right,
  initialLeftWidth = 50, // percentage
  min = 20,
  max = 80,
  className = "",
  parent_component = "",
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
    let newLeftWidth = ((e.clientX - rect.left) / rect.width) * 100;

    // clamp
    newLeftWidth = Math.max(min, Math.min(max, newLeftWidth));
    setLeftWidth(newLeftWidth);
  };

  const onMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  if (parent_component == "YoutubeListening") {
    return (
      <div ref={containerRef} className={`${className}`}>
        {/* LEFT */}
        <div style={{ width: `${leftWidth}%` }} className="min-w-0">
          {left}
        </div>

        {/* DIVIDER */}
        <div
          className="w-1 bg-gray-300 hover:bg-gray-500 cursor-col-resize"
          onMouseDown={onMouseDown}
        />

        {/* RIGHT */}
        <div
          style={{ width: `${100 - leftWidth}%` }}
          className="min-w-0 flex-1"
        >
          {right}
        </div>
      </div>
    );
  }

  if (parent_component == "Answer") {
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
          <div
            className="h-full flex-1"
            style={{ width: `${100 - leftWidth}%` }}
          >
            {right}
          </div>
        </div>

        {/* Actions on the right */}
        {actions && <div className="border-l py-4 pr-4 pl-2">{actions}</div>}
      </div>
    );
  }
}
