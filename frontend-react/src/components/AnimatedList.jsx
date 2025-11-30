import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

export function AnimatedList({ children, trigger = 0 }) {
  const listRef = useRef(null);
  const oldListRef = useRef(null);

  function refToKeys(ref_list) {
    return Array.from(ref_list).map((e, idx) => children[idx].key);
  }

  /*
  Only run animation when:
  - Input data is changed (detect by compare every element)
  - Force animation by parent trigger (for example a fetch data button clicked)
  - Do not run animation blindly by rerender
  */
  function runAnimation(items) {
    animate(items, {
      translateY: [20, 0], // slide up
      opacity: [0, 1], // fade in
      easing: "easeOutQuad",
      duration: 300,
      delay: stagger(100), // stagger animation for each item
    });
  }

  useEffect(() => {
    if (!children) return;

    const items = listRef.current.querySelectorAll(".animated-item");

    if (
      JSON.stringify(refToKeys(items)) == JSON.stringify(oldListRef.current)
    ) {
     // console.log("Same");
      return;
    }

    runAnimation(items);

    oldListRef.current = refToKeys(items);
  }, [children]);

  useEffect(() => {
    if (!children) return;
    const items = listRef.current.querySelectorAll(".animated-item");

    runAnimation(items);
    //console.log("Run by trigger");
  }, [trigger]);

  return (
    <div ref={listRef}>
      {children.map((child, index) => (
        // Wrap each child in a div with the animation class
        <div key={child.key || index} className="animated-item">
          {child}
        </div>
      ))}
    </div>
  );
}
