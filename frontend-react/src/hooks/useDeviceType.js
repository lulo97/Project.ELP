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

/**
 * Returns device type based on a given width.
 * @param {number} width - Screen width in pixels
 * @returns {"mobile" | "tablet" | "desktop"}
 */
export function getDeviceType(width) {
  if (width <= 767) return "mobile";
  if (width <= 1024) return "tablet";
  return "desktop";
}

/**
 * Returns current device type based on `window.innerWidth`.
 * Works in browser only.
 * @returns {"mobile" | "tablet" | "desktop"}
 */
export function getCurrentDeviceType() {
  if (typeof window === "undefined") {
    return "desktop"; // default for SSR or non-browser environments
  }
  return getDeviceType(window.innerWidth);
}
