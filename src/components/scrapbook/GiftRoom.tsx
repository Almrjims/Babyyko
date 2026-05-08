import { motion } from "framer-motion";
import { useState } from "react";
import { GiftBox } from "./GiftBox";
import { Envelope } from "./Envelope";
import { PolaroidStack } from "./PolaroidStack";
import { Cake } from "./Cake";
import { HiddenHeart } from "./HiddenVoice";

type Key = "gift" | "envelope" | "polaroids" | "cake";

const items: { key: Key; label: string; emoji: string; note: string; tilt: number; pos: string }[] = [
  { key: "gift", label: "open this first", emoji: "🎁", note: "tap me!", tilt: -3, pos: "" },
  { key: "envelope", label: "short letter", emoji: "✉️", note: "for you ♡", tilt: 2, pos: "" },
  { key: "polaroids", label: "photo stack", emoji: "📸", note: "pitikks", tilt: -2, pos: "" },
  { key: "cake", label: "make a wish", emoji: "🎂", note: "🕯️🕯️🕯️", tilt: 3, pos: "" },
];

export function GiftRoom({ onAllOpened }: { onAllOpened: () => void }) {
  const [open, setOpen] = useState<Key | null>(null);
  const [seen, setSeen] = useState<Set<Key>>(new Set());

  const handleOpen = (k: Key) => {
    setOpen(k);
    setSeen((s) => {
      const next = new Set(s);
      next.add(k);
      if (next.size >= items.length) setTimeout(onAllOpened, 400);
      return next;
    });
  };

  return (
    <section className="relative px-5 py-20 md:px-8 md:py-24">
      {/* Section header - cleaner hierarchy */}
      <div className="mx-auto mb-12 max-w-lg text-center md:mb-14">
        <motion.p 
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-hand text-lg text-primary/80 md:text-xl"
        >
          Virtuel Gifts from your idolll ✿
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-2 inline-block -rotate-1 font-display text-3xl text-ink md:text-4xl lg:text-5xl"
        >
          Tap on items below♡
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-3 max-w-sm font-hand text-sm text-ink/50 md:text-base"
        >
          (Hehe ma uwaw mn ko uy i made this para sa imo hopefully ganahan ka huhu..)
        </motion.p>
      </div>

      {/* Gift grid - better spacing and alignment */}
      <div className="relative mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4 md:gap-6">
        {items.map((it, i) => (
          <motion.button
            key={it.key}
            onClick={() => handleOpen(it.key)}
            initial={{ opacity: 0, y: 24, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: it.tilt }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -4, rotate: 0, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 140, damping: 18 }}
            className="paper relative aspect-[4/5] rounded-xl p-3 text-center sm:p-4"
          >
            <span className="tape -top-2.5 left-1/2 -translate-x-1/2 -rotate-2" style={{ width: 56, height: 14 }} />
            {it.key === "gift" && <HiddenHeart />}
            <div className="flex h-full flex-col items-center justify-center gap-1.5 sm:gap-2">
              <motion.div
                animate={{ rotate: [0, -3, 3, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                className="text-5xl sm:text-6xl md:text-5xl lg:text-6xl"
              >
                {it.emoji}
              </motion.div>
              <p className="font-display text-lg text-ink sm:text-xl md:text-lg lg:text-xl">{it.label}</p>
              <p className="font-hand text-xs text-ink/50 sm:text-sm">{it.note}</p>
              {seen.has(it.key) && (
                <p className="mt-0.5 font-hand text-xs text-primary/70">opened ♡</p>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <GiftBox open={open === "gift"} onClose={() => setOpen(null)} />
      <Envelope open={open === "envelope"} onClose={() => setOpen(null)} />
      <PolaroidStack open={open === "polaroids"} onClose={() => setOpen(null)} />
      <Cake open={open === "cake"} onClose={() => setOpen(null)} />
    </section>
  );
}
