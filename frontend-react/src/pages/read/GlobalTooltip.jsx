import { useEffect, useRef, useState } from "react";

export function GlobalTooltip({
  meanings = [],
  idioms = [],
  phrases = [],
  trigger = 0,
}) {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const targets = document.querySelectorAll(".WORD, .IDIOM, .PHRASE");

    function show(e) {
      const innerText = e.target.innerText;
      let _text = innerText;

      if (e.target.classList.contains("WORD")) {
        const founds = meanings.filter((ele) => ele.word === innerText);
        if (founds.length > 0) {
          _text = founds
            .map((ele) => `(${ele.part_of_speech}) ${ele.meaning}`)
            .join("\n");
        }
      }

      if (e.target.classList.contains("IDIOM")) {
        const found = idioms.find((ele) => ele.idiom === innerText);
        if (found) {
          _text = found.meaning;
        }
      }

      if (e.target.classList.contains("PHRASE")) {
        const found = phrases.find((ele) => ele.phrase === innerText);
        if (found) {
          _text = found.meaning;
        }
      }

      setText(_text);
      setVisible(true);
    }
    function hide() {
      setVisible(false);
    }
    function move(e) {
      let padX = 0;
      let padY = 0;
      
      if (ref.current) {
        padX = ref.current.offsetWidth;
        padY = ref.current.offsetHeight;
      }

      const x = Math.min(
        Math.max(e.clientX - padX / 2, 0),
        window.innerWidth - padX
      );

      const MAGIC_NUMBER = 1.5;
      const y = Math.min(
        Math.max(e.clientY - MAGIC_NUMBER * padY, 0),
        window.innerHeight - padY
      );

      setPos({ x: x, y: y });
    }

    targets.forEach((el) => {
      el.addEventListener("mouseenter", show);
      el.addEventListener("mouseleave", hide);
      el.addEventListener("mousemove", move);
    });

    return () => {
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", show);
        el.removeEventListener("mouseleave", hide);
        el.removeEventListener("mousemove", move);
      });
    };
  }, [trigger]);

  return (
    <>
      {visible && (
        <div
          ref={ref}
          className="fixed z-50 px-2 py-1 text-sm rounded bg-black text-white shadow-lg pointer-events-none transition-opacity"
          style={{ left: pos.x, top: pos.y }}
        >
          {text}
        </div>
      )}
    </>
  );
}
