import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

export function PageTitle({ title, trigger = 0 }) {
  const ref = useRef(null);
  const oldTitleRef = useRef("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Only animate if title changed
    if (oldTitleRef.current === title) return;
    oldTitleRef.current = title;

    // Split text into spans
    const chars = title.split("");
    el.innerHTML = chars
      .map((c) =>
        c === " "
          ? `<span class="char inline-block w-[0.25em]">&nbsp;</span>` // keep space
          : `<span class="char inline-block mr-[0.05em]">${c}</span>`
      )
      .join("");
    const charEls = el.querySelectorAll(".char");

    // Animate left-to-right slide
    animate(charEls, {
      translateX: [-20, 0], // slide from left
      opacity: [0, 1],
      easing: "easeOutQuad",
      duration: 500,
      delay: stagger(40), // stagger left-to-right
    });
  }, [title, trigger]);

  return (
    <div
      ref={ref}
      className="mb-4 text-4xl font-extrabold tracking-tight text-gray-800 select-none"
    >
      {title}
    </div>
  );
}
