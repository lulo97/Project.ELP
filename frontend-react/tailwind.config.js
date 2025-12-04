/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  safelist: [
    // explicit static classes
    "fixed",
    "z-50",
    "pointer-events-none",
    "pointer-events-auto",
    "px-4",
    "py-2",
    "rounded",
    "transform",
    "transition-all",
    "duration-300",
    "ease-out",

    // shadow variants you might want
    "shadow-lg",
    "shadow-2xl",
    "shadow-sm",

    // opacity / translate alternatives used by your code
    "opacity-100",
    "opacity-0",
    "translate-y-0",
    "-translate-y-4",

    // type styles
    "bg-green-500",
    "bg-red-500",
    "bg-blue-500",
    "bg-yellow-400",
    "bg-gray-500",
    "text-white",
    "text-black",

    // position helper (in case any are missed by patterns)
    "top-5",
    "bottom-5",
    "left-5",
    "right-5",
    "left-1/2",
    "-translate-x-1/2",
  ],

  theme: {
    extend: {},
  },
  plugins: [],
};
