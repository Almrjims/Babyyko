import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function FloatingHearts({ count = 12 }: { count?: number }) {
  const [items, setItems] = useState<{ x: number; d: number; s: number; e: string; o: number }[]>([]);
  useEffect(() => {
    // Simplified, more elegant set of elements
    const emojis = ["♡", "✿", "♡", "✦", "♡"];
    setItems(
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        d: 16 + Math.random() * 12, // Slower, more gentle
        s: 0.6 + Math.random() * 0.7, // Smaller range
        e: emojis[Math.floor(Math.random() * emojis.length)],
        o: 0.15 + Math.random() * 0.15, // Lower opacity range
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((it, i) => (
        <motion.span
          key={i}
          className="absolute select-none text-primary"
          style={{ left: `${it.x}%`, fontSize: `${it.s}rem`, bottom: -40, opacity: it.o }}
          animate={{ y: ["0vh", "-110vh"], x: [0, 12, -8, 0], rotate: [0, 8, -6, 0] }}
          transition={{ duration: it.d, repeat: Infinity, ease: "linear", delay: i * 0.8 }}
        >
          {it.e}
        </motion.span>
      ))}
    </div>
  );
}
