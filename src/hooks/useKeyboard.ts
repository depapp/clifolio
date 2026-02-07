import { useInput } from "ink";
import open from "open";

interface UseKeyboardOptions {
  sectionCount: number;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  urls?: string[];
  onQuit: () => void;
}

export function useKeyboard({
  sectionCount,
  activeIndex,
  setActiveIndex,
  urls,
  onQuit,
}: UseKeyboardOptions) {
  useInput((input, key) => {
    if (input === "q") {
      onQuit();
      return;
    }

    if (input === "o" && urls && urls.length > 0) {
      const url = urls[0];
      if (url) void open(url);
      return;
    }

    if (key.rightArrow || input === "l") {
      setActiveIndex((activeIndex + 1) % sectionCount);
      return;
    }

    if (key.leftArrow || input === "h") {
      setActiveIndex((activeIndex - 1 + sectionCount) % sectionCount);
      return;
    }
  });
}
