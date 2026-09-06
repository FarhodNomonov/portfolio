import { useEffect, useRef, useState } from "react";

/**
 * Lightweight scroll-reveal: watches its own element and flips `visible`
 * to true the first time it enters the viewport. Pair the returned ref
 * with the ".reveal" CSS class (see src/index.css) and toggle
 * "is-visible" from `visible` to animate it in.
 */
export default function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}
