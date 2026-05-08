import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Confetti({ trigger, count = 36 }: { trigger: number; count?: number }) {
  const [items, setItems] = useState<{ x: number; r: number; c: string; d: number; e: string }[]>([]);
  useEffect(() => {
    if (!trigger) return;
    const colors = ["var(--blush)", "var(--peach)", "var(--lavender)", "var(--sage)", "var(--primary)"];
    const emojis = ["♥", "✿", "★", "✦", "❀"];
    setItems(
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 600,
        r: Math.random() * 360,
        c: colors[Math.floor(Math.random() * colors.length)],
        d: 1.4 + Math.random() * 1.2,
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
          style={{ color: it.c, fontSize: "1.1rem" }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: it.x, y: 400 + Math.random() * 80, opacity: 0, rotate: it.r }}
          transition={{ duration: it.d, ease: "easeOut" }}
        >
          {it.e}
        </motion.span>
      ))}
    </div>
  );
}
