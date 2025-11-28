import { useEffect, useState, useRef } from "react";
import { animate, stagger } from "animejs";

export function Test() {
  const [rows, setRows] = useState([]);
  const listRef = useRef(null);

  // Simulate fetching data
  useEffect(() => {
    setTimeout(() => {
      setRows([
        { id: 1, text: "Row 1" },
        { id: 2, text: "Row 2" },
        { id: 3, text: "Row 3" },
        { id: 4, text: "Row 4" },
      ]);
    }, 10); // simulate 1s fetch
  }, []);

  // Animate whenever rows are updated
  useEffect(() => {
    if (rows.length === 0) return;

    const items = listRef.current.querySelectorAll(".row");
    animate(items, {
      translateY: [20, 0], // slide up from below
      opacity: [0, 1], // fade in
      easing: "easeOutQuad",
      duration: 200,
      delay: stagger(100), // <-- use stagger imported from animejs
    });
  }, [rows]);

  return (
    <div ref={listRef}>
      {rows.map((row) => (
        <div
          key={row.id}
          className="row"
          style={{
            padding: "10px",
            margin: "5px 0",
            backgroundColor: "#f0f0f0",
            borderRadius: "6px",
          }}
        >
          {row.text}
        </div>
      ))}
    </div>
  );
}
