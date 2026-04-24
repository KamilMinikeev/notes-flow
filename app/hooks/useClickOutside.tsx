import { useEffect } from "react";

type Handler = (event: MouseEvent) => void;

export const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  handler: Handler,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const el = ref.current;

      if (!el) return;

      if (!el.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};
