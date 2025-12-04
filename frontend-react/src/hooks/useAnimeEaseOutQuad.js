import { useEffect } from "react";
import { animate, stagger } from "animejs";

/**
 * Custom hook to animate elements by selector
 * @param {string} selector - CSS selector, e.g. ".my_class" or "#my_id"
 * @param {object} options - AnimeJS animation options
 * @param {array} deps - Dependency array to re-run animation
 */
export function useAnimeEaseOutQuad(selector, options = {}, deps = []) {
  useEffect(() => {
    if (!selector) return;

    if (selector[0] !== "." && selector[0] !== "#") {
      console.warn(
        `useAnimejs: selector should start with '.' or '#'. Received "${selector}"`
      );
      return;
    }
    
    animate(selector, {
      // eslint-disable-next-line no-magic-numbers
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 500,
      easing: "easeOutQuad",
      delay: stagger(100), // default stagger
      ...options, // allow overriding defaults
    });
  }, deps);
}
