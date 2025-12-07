import { mergeTailwindClasses } from "../utils/mergeTailwindClasses";
import { animate, spring } from "animejs";
import { useRef } from "react";

export function Button({
  text,
  onClick = () => {},
  disabled = false,
  className = "",
  ...props
}) {
  if (Object.keys(props).includes("disable")) {
    console.warn("Incorrect props = 'disable'!");
  }
  
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }

    animate(buttonRef.current, {
      scale: [
        { to: 0.5, duration: 100, easing: "easeInOutQuad" }, // shrink
        { to: 2, duration: 100, easing: spring({ bounce: 0.6 }) }, // bounce back
        { to: 1, duration: 100, easing: spring({ bounce: 0.6 }) }, // bounce back
      ],
    });
  };

  const _className = `
        rounded-lg shadow-md transition w-fit
        ${
          disabled
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }
        px-4 py-2
        ${className}
      `;
  const buttonRef = useRef(null);
  return (
    <button
      {...props}
      disabled={disabled}
      className={mergeTailwindClasses(_className)}
      onClick={handleClick}
      ref={buttonRef}
    >
      {text}
    </button>
  );
}
