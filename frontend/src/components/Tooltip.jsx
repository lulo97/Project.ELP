import { useState, useRef } from "react";

export function Tooltip({ children, content, placement = "top", delay = 500 }) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  const placements = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {visible && (
        <div
          className={`absolute z-50 px-2 py-1 text-sm rounded-md shadow-md
            bg-black text-white transition-opacity duration-200 whitespace-nowrap
            ${placements[placement]}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
