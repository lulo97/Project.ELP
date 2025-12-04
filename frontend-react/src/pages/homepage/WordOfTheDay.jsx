import React, { useEffect, useRef } from "react";
import { Card } from "../../components/Card";
import { translation } from "./HomePage.Translation";
import { getTranslation as _getTranslation } from "../../utils/getTranslation";
import { animate, stagger } from "animejs";
import { ANIMATION } from "./utils";

const getTranslation = (key) => _getTranslation(key, translation);

export function WordOfTheDay() {
  const word = {
    entity: "Serendipity",
    type: "word",
    meaning:
      "Sự may mắn - The occurrence of pleasant or valuable discoveries by chance.",
    partOfSpeech: "noun",
    level: "C2",
    example:
      "Finding my old friend in a café on the other side of the world was pure serendipity.",
    funFact:
      "The word was coined in 1754 by Horace Walpole, inspired by a Persian fairy tale called *The Three Princes of Serendip*, who were always making accidental discoveries.",
  };

  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // 1) Heading
    const heading = root.querySelector('[data-animate="heading"]');
    if (heading) {
      animate(heading, {
        translateY: [ANIMATION.heading.translateY, 0],
        opacity: [ANIMATION.heading.opacityFrom, ANIMATION.heading.opacityTo],
        easing: "easeOutQuad",
        duration: ANIMATION.heading.duration,
      });
    }

    // 2) Word entity letters
    const termEl = root.querySelector('[data-animate="term"]');
    if (termEl) {
      const text = termEl.textContent || "";
      termEl.innerHTML = text.replace(
        /\S/g,
        "<span class='inline-block'>$&</span>"
      );

      const letters = termEl.querySelectorAll("span");
      animate(letters, {
        translateY: [ANIMATION.term.translateY, 0],
        opacity: [ANIMATION.term.opacityFrom, ANIMATION.term.opacityTo],
        scale: [ANIMATION.term.scaleFrom, ANIMATION.term.scaleTo],
        easing: "easeOutBack",
        duration: ANIMATION.term.duration,
        delay: stagger(ANIMATION.term.stagger),
      });
    }

    // 3) Breadcrumb
    const breadcrumb = root.querySelectorAll('[data-animate="breadcrumb"]');
    if (breadcrumb.length) {
      animate(breadcrumb, {
        translateY: [ANIMATION.breadcrumb.translateY, 0],
        opacity: [
          ANIMATION.breadcrumb.opacityFrom,
          ANIMATION.breadcrumb.opacityTo,
        ],
        easing: "easeOutQuad",
        duration: ANIMATION.breadcrumb.duration,
        delay: stagger(ANIMATION.breadcrumb.staggerDelay, {
          start: ANIMATION.breadcrumb.start,
        }),
      });
    }

    // 4) Labels
    const labels = root.querySelectorAll('[data-animate="label"]');
    if (labels.length) {
      animate(labels, {
        translateX: [ANIMATION.label.translateX, 0],
        opacity: [ANIMATION.label.opacityFrom, ANIMATION.label.opacityTo],
        easing: "easeOutQuad",
        duration: ANIMATION.label.duration,
        delay: stagger(ANIMATION.label.staggerDelay, {
          start: ANIMATION.label.start,
        }),
      });
    }

    // 5) Content blocks
    const contents = root.querySelectorAll('[data-animate="content"]');
    if (contents.length) {
      animate(contents, {
        translateY: [ANIMATION.content.translateY, 0],
        opacity: [ANIMATION.content.opacityFrom, ANIMATION.content.opacityTo],
        easing: "easeOutQuad",
        duration: ANIMATION.content.duration,
        delay: stagger(ANIMATION.content.staggerDelay, {
          start: ANIMATION.content.start,
        }),
      });
    }

    // 6) Fun Fact Card
    const funCard = root.querySelectorAll('[data-animate="funcard"]');
    if (funCard.length) {
      animate(funCard, {
        scale: [ANIMATION.funCard.scaleFrom, ANIMATION.funCard.scaleTo],
        opacity: [ANIMATION.funCard.opacityFrom, ANIMATION.funCard.opacityTo],
        easing: "easeOutQuad",
        duration: ANIMATION.funCard.duration,
        delay: ANIMATION.funCard.delay,
      });
    }

    // 7) Footer
    const footer = root.querySelectorAll('[data-animate="footer"]');
    if (footer.length) {
      animate(footer, {
        translateY: [ANIMATION.footer.translateY, 0],
        opacity: [ANIMATION.footer.opacityFrom, ANIMATION.footer.opacityTo],
        easing: "easeOutQuad",
        duration: ANIMATION.footer.duration,
        delay: ANIMATION.footer.delay,
      });
    }
  }, []);

  return (
    <Card className="mb-6" ref={containerRef}>
      <h2
        data-animate="heading"
        className="text-3xl font-extrabold mb-2 text-center drop-shadow"
        aria-live="polite"
      >
        {getTranslation("WordOfTheDay")}
      </h2>

      <p data-animate="term" className="text-2xl font-bold leading-tight">
        {word.entity}
      </p>

      <p
        data-animate="breadcrumb"
        className="text-sm text-gray-500 italic mb-3"
      >
        <span className="mr-1">{word.level}</span>
        <span className="mx-1">•</span>
        <span>{word.partOfSpeech}</span>
      </p>

      <p className="mb-3">
        <span data-animate="label" className="font-semibold">
          {getTranslation("Meaning")}
        </span>
        : <span data-animate="content">{word.meaning}</span>
      </p>

      <p className="mb-3">
        <span data-animate="label" className="font-semibold">
          {getTranslation("Example")}
        </span>
        :{" "}
        <span data-animate="content" className="italic">
          “{word.example}”
        </span>
      </p>

      <div
        data-animate="funcard"
        className="bg-yellow-100 p-3 rounded-lg border border-yellow-300"
      >
        <p data-animate="label" className="font-semibold text-yellow-800">
          {getTranslation("FunFact")}
        </p>
        <p data-animate="content" className="text-yellow-900 text-sm">
          {word.funFact}
        </p>
      </div>

      <p
        data-animate="footer"
        className="mt-4 text-center text-sm opacity-90 italic"
      >
        {getTranslation("WordOfTheDayFooter")}
      </p>
    </Card>
  );
}
