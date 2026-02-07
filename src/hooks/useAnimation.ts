import { useState, useEffect, useRef } from "react";

export function useTypingAnimation(
  text: string,
  animate: boolean = true,
  speed: number = 8
): string {
  const [displayedLength, setDisplayedLength] = useState(
    animate ? 0 : text.length
  );
  const prevText = useRef(text);

  useEffect(() => {
    if (text !== prevText.current) {
      prevText.current = text;
      if (animate) {
        setDisplayedLength(0);
      } else {
        setDisplayedLength(text.length);
      }
    }
  }, [text, animate]);

  useEffect(() => {
    if (!animate || displayedLength >= text.length) return;

    const timer = setInterval(() => {
      setDisplayedLength((prev) => {
        const next = Math.min(prev + speed, text.length);
        if (next >= text.length) clearInterval(timer);
        return next;
      });
    }, 16);

    return () => clearInterval(timer);
  }, [text, animate, displayedLength, speed]);

  return text.slice(0, displayedLength);
}
