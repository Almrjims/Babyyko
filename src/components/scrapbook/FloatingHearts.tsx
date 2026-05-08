import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function FloatingHearts({ count = 14 }: { count?: number }) {
  const [items, setItems] = useState<{ x: number; d: number; s: number; e: string }[]>([]);
  useEffect(() => {
    const emojis = ["❤", "🌸", "✿", "★", "♡"];
    setItems(
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        d: 12 + Math.random() * 14,
        s: 0.7 + Math.random() * 1.1,
        e: emojis[Math.floor(Math.random() * emojis.length)],
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((it, i) => (
        <motion.span
          key={i}
          className="absolute text-primary/40 select-none"
          style={{ left: `${it.x}%`, fontSize: `${it.s}rem`, bottom: -40 }}
          animate={{ y: ["0vh", "-110vh"], x: [0, 20, -10, 0], rotate: [0, 15, -10, 0] }}
          transition={{ duration: it.d, repeat: Infinity, ease: "linear", delay: i * 0.6 }}
        >
          {it.e}
        </motion.span>
      ))}
    </div>
  );
}
