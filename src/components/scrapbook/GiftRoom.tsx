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
  { key: "envelope", label: "a little letter", emoji: "✉️", note: "for you ♡", tilt: 2, pos: "" },
  { key: "polaroids", label: "photo stack", emoji: "📸", note: "cute ones", tilt: -2, pos: "" },
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
    <section className="relative px-4 py-16">
      <div className="mb-8 text-center">
        <p className="font-hand text-xl text-primary">Virtuel Gifts form your idolll ✿</p>
        <h2 className="mt-1 inline-block -rotate-1 font-display text-4xl text-ink md:text-5xl">
          Tap on items below♡
        </h2>
        <p className="mx-auto mt-2 max-w-md font-hand text-base text-ink/60">
          (Hehe ma uwaw mn ko uy i made this para sa imo hopefully ganahan ka huhu..)
        </p>
      </div>

      <div className="relative mx-auto grid max-w-4xl grid-cols-2 gap-5 md:grid-cols-4">
        {items.map((it, i) => (
          <motion.button
            key={it.key}
            onClick={() => handleOpen(it.key)}
            initial={{ opacity: 0, y: 20, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: it.tilt }}
            viewport={{ once: true }}
            whileHover={{ y: -6, rotate: 0, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 160 }}
            className="paper relative aspect-[4/5] rounded-2xl p-4 text-center"
          >
            <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" style={{ width: 60, height: 16 }} />
            {it.key === "gift" && <HiddenHeart />}
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: [0, -4, 4, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.4 }}
                className="text-6xl md:text-7xl"
              >
                {it.emoji}
              </motion.div>
              <p className="font-display text-2xl text-ink">{it.label}</p>
              <p className="font-hand text-base text-ink/60">{it.note}</p>
              {seen.has(it.key) && (
                <p className="font-hand text-xs text-primary">opened ♡</p>
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
