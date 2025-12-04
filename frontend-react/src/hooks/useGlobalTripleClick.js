import { useEffect, useRef } from "react";

const INTERVAL = 400;
const TRIPLE_CLICK_COUNT = 3;

export function useGlobalTripleClick(onTripleClick, interval = INTERVAL) {
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

      if (clickCount.current === TRIPLE_CLICK_COUNT) {
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
