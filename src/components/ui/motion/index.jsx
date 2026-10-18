import { m, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/**
 * Section-level scroll reveal: fade + 24px rise, once. With
 * prefers-reduced-motion the content renders in its final state.
 */
export function Reveal({ as = "div", delay = 0, children, ...props }) {
  const reduce = useReducedMotion();
  const Tag = m[as];
  if (reduce) return <Tag {...props}>{children}</Tag>;
  return (
    <Tag
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={fadeUp}
      transition={{ delay }}
      {...props}
    >
      {children}
    </Tag>
  );
}

/** Parent that reveals its <StaggerItem> children one after another. */
export function Stagger({ as = "div", gap = 0.08, children, ...props }) {
  const reduce = useReducedMotion();
  const Tag = m[as];
  if (reduce) return <Tag {...props}>{children}</Tag>;
  return (
    <Tag
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({ as = "div", children, ...props }) {
  const reduce = useReducedMotion();
  const Tag = m[as];
  return (
    <Tag variants={reduce ? undefined : fadeUp} {...props}>
      {children}
    </Tag>
  );
}
