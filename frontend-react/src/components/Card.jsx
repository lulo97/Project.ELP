/* eslint-disable no-magic-numbers */
import React, { forwardRef, useEffect, useRef } from "react";
import { animate } from "animejs";

export const Card = forwardRef(function Card({ children, className }, ref) {
  const localRef = useRef(null);
  const mergedRef = ref || localRef;

  useEffect(() => {
    if (!mergedRef.current) return;

    animate(mergedRef.current, {
      opacity: [0, 1],
      translateY: [16, 0],
      easing: "easeOutQuad",
      duration: 420,
    });
  }, [mergedRef]);

  return (
    <div
      ref={mergedRef}
      className={`
        bg-white text-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl 
        transition 
        ${className}
      `}
    >
      {children}
    </div>
  );
});
