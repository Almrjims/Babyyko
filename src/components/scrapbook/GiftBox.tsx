import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { giftNotes } from "@/content";
import { Confetti } from "./Confetti";

const tilts = [-3, 2, -1.5, 3, -2, 1.5];
const colorMap: Record<string, string> = {
  blush: "bg-[oklch(0.92_0.06_10)]",
  peach: "bg-[oklch(0.93_0.07_55)]",
  lavender: "bg-[oklch(0.90_0.05_300)]",
  sage: "bg-[oklch(0.88_0.05_145)]",
};

export function GiftBox({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [opened, setOpened] = useState(false);
  const [pop, setPop] = useState(0);

  const reset = () => {
    setOpened(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={reset}
        >
          <motion.div
            initial={{ scale: 0.85, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="paper relative w-full max-w-lg rounded-2xl p-6 md:p-8"
          >
            <span className="tape -top-3 left-10 -rotate-6" />
            <span className="tape -top-3 right-10 rotate-6" />

            {!opened ? (
              <div className="flex flex-col items-center py-6 text-center">
                <p className="font-hand text-2xl text-primary">a little box for you</p>
                <motion.button
                  onClick={() => {
                    setOpened(true);
                    setPop((p) => p + 1);
                  }}
                  whileHover={{ rotate: [-2, 2, -2, 0], transition: { duration: 0.4 } }}
                  whileTap={{ scale: 0.94 }}
                  className="relative mt-6 text-[7rem] leading-none"
                  aria-label="Open gift"
                >
                  🎁
                </motion.button>
                <p className="mt-4 font-hand text-lg text-ink/60">tap to open ↑</p>
                <Confetti trigger={pop} />
              </div>
            ) : (
              <div className="relative">
                <Confetti trigger={pop} />
                <p className="text-center font-hand text-2xl text-primary">surprise ♡</p>
                <p className="mt-1 text-center font-hand text-base text-ink/60">
                  Small notes for you
                </p>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {giftNotes.map((n, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20, rotate: 0 }}
                      animate={{ opacity: 1, y: 0, rotate: tilts[i % tilts.length] }}
                      transition={{ delay: 0.15 + i * 0.18, type: "spring", stiffness: 140 }}
                      className={`relative rounded-md p-4 shadow-md ${colorMap[n.color] ?? "bg-card"}`}
                    >
                      <span className="tape -top-2 left-1/2 -translate-x-1/2 -rotate-3" style={{ width: 50, height: 14 }} />
                      <p className="font-hand text-lg leading-snug text-ink">{n.text}</p>
                    </motion.div>
                  ))}
                </div>
                <button
                  onClick={reset}
                  className="mx-auto mt-6 block font-hand text-lg text-ink/60 underline-offset-4 hover:underline"
                >
                  close box ✿
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
