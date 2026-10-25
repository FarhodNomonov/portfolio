import { useLayoutEffect, useRef, useState } from "react";

/**
 * Renders children on a fixed width×height canvas and scales it with a
 * transform to fit (contain) the box this element gets from `className`.
 * Mockups are drawn once at desktop size and stay pixel-consistent on phones.
 */
export default function Fit({ width, height, className = "", style, children }) {
  const ref = useRef(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const node = ref.current;
    const measure = () => {
      const { width: w, height: h } = node.getBoundingClientRect();
      setScale(Math.min(w / width, h > 0 ? h / height : Infinity));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [width, height]);

  return (
    <div ref={ref} className={className} style={style}>
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width,
          height,
          transform: `translate(-50%, -50%) scale(${scale})`,
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
