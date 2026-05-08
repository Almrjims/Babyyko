import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Confetti({ trigger, count = 28 }: { trigger: number; count?: number }) {
  const [items, setItems] = useState<{ x: number; r: number; c: string; d: number; e: string }[]>([]);
  useEffect(() => {
    if (!trigger) return;
    // Simplified, more cohesive color palette
    const colors = ["var(--blush)", "var(--peach)", "var(--primary)", "var(--primary)"];
    const emojis = ["♡", "✿", "✦", "♡", "✿"];
    setItems(
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 500,
        r: Math.random() * 300,
        c: colors[Math.floor(Math.random() * colors.length)],
        d: 1.6 + Math.random() * 1,
        e: emojis[Math.floor(Math.random() * emojis.length)],
      })),
    );
  }, [trigger, count]);

  if (!trigger) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-visible">
      {items.map((it, i) => (
        <motion.span
          key={`${trigger}-${i}`}
          className="absolute left-1/2 top-1/2 select-none"
          style={{ color: it.c, fontSize: "1rem" }}
          initial={{ x: 0, y: 0, opacity: 0.9, rotate: 0 }}
          animate={{ x: it.x, y: 350 + Math.random() * 60, opacity: 0, rotate: it.r }}
          transition={{ duration: it.d, ease: "easeOut" }}
        >
          {it.e}
        </motion.span>
      ))}
    </div>
  );
}
