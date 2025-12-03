import { useEffect, useRef } from "react";

export function useGlobalTripleClick(onTripleClick, interval = 400) {
  const clickCount = useRef(0);
  const lastClickTime = useRef(0);

  useEffect(() => {
    const handleClick = () => {
      const now = Date.now();

      if (now - lastClickTime.current > interval) {
        clickCount.current = 0; // reset if too much time has passed
      }

      clickCount.current += 1;
      lastClickTime.current = now;

      if (clickCount.current === 3) {
        onTripleClick();
        clickCount.current = 0; // reset after firing
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [onTripleClick, interval]);
}
