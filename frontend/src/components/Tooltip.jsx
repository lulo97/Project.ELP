import { useState, useRef, useEffect } from "react";

export function Tooltip({ children, content, placement = "top", delay = 500, isDisable=false }) {
  const [visible, setVisible] = useState(false);
  const [currentPlacement, setCurrentPlacement] = useState(placement);
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

  const tooltipRef = useRef(null);

  useEffect(() => {
    if (visible && tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();

      // Amount of overflow on the right
      const horizontal_bar_width = 12;
      const overflowRight = rect.right - window.innerWidth + horizontal_bar_width;
      // Amount of overflow on the left
      const overflowLeft = 0 - rect.left;

      if (overflowRight > 0) {
        // Shift left by the overflow amount
        //tooltipRef.current.style.left = `calc(50% - ${2*overflowRight}px)`;
        setCurrentPlacement('left')
      } else if (overflowLeft > 0) {
        // Shift right by the overflow amount
        tooltipRef.current.style.left = `calc(50% + ${overflowLeft}px)`;
      } else {
        // Reset to center
        tooltipRef.current.style.left = "";
      }
    }
  }, [visible]);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {visible && isDisable == false && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 px-2 py-1 text-sm rounded-md shadow-md
            bg-black text-white transition-opacity duration-200 whitespace-nowrap
            ${placements[currentPlacement]}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
