// useDeviceType.js
import { useState, useEffect } from "react";

export function useDeviceType() {
  const getType = (width) => {
    if (width <= 767) return "mobile";
    if (width <= 1024) return "tablet";
    return "desktop";
  };

  const [device, setDevice] = useState(() =>
    typeof window === "undefined" ? "desktop" : getType(window.innerWidth)
  );

  useEffect(() => {
    function onResize() {
      setDevice(getType(window.innerWidth));
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return device; // "mobile" | "tablet" | "desktop"
}
