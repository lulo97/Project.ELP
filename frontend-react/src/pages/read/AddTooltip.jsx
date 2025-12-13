import { useEffect, useRef, useState } from "react";
import { EMPTY_STATE } from "./utils";

export function AddTooltip({
  state = EMPTY_STATE,
  setState = () => {},
}) {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const targets = document.querySelectorAll(".WORD, .IDIOM, .PHRASE");
    function show(e) {
      const innerText = e.target.innerText;
      const _text = innerText;

      setText(_text);
      setVisible(true);
    }
    function hide() {
      setVisible(false);
    }
    function move(e) {
      // if (pos.x !== 0) return;

      let padX = 0;
      let padY = 0;
      
      // if (ref.current) {
      //   padX = ref.current.offsetWidth;
      //   padY = ref.current.offsetHeight;
      // }

      const x = Math.min(
        Math.max(e.clientX - padX / 2, 0),
        window.innerWidth - padX
      );

      const MAGIC_NUMBER = 1.5;
      const y = Math.min(
        Math.max(e.clientY - MAGIC_NUMBER * padY, 0),
        window.innerHeight - padY
      );
      
      console.log(e.clientX, e.clientY)

      setPos({ x: e.clientX, y: e.clientY });
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
  }, [state.trigger]);

  return (
    <>
      {state.selectedPhraseDoubleClick && (
        <div
          ref={ref}
          className="fixed z-50 px-2 py-1 text-sm rounded bg-black text-white shadow-lg pointer-events-none transition-opacity"
          style={{ left: pos.x, top: pos.y }}
        >
          {123}
        </div>
      )}
    </>
  );
}
