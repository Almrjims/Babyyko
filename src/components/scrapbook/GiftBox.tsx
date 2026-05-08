import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { giftNotes } from "@/content";
import { Confetti } from "./Confetti";

const tilts = [-3, 2, -1.5, 3, -2, 1.5];
const colorMap: Record<string, string> = {
  blush: "bg-[oklch(0.94_0.04_12)]",
  peach: "bg-[oklch(0.95_0.04_55)]",
  lavender: "bg-[oklch(0.93_0.035_300)]",
  sage: "bg-[oklch(0.92_0.035_145)]",
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-[2px] md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={reset}
        >
          <motion.div
            initial={{ scale: 0.9, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="paper relative w-full max-w-lg rounded-xl p-5 md:rounded-2xl md:p-8"
          >
            <span className="tape -top-2.5 left-8 -rotate-4" style={{ width: 72 }} />
            <span className="tape -top-2.5 right-8 rotate-4" style={{ width: 72 }} />

            {!opened ? (
              <div className="flex flex-col items-center py-8 text-center">
                <p className="font-hand text-xl text-primary md:text-2xl">a little box for you</p>
                <motion.button
                  onClick={() => {
                    setOpened(true);
                    setPop((p) => p + 1);
                  }}
                  whileHover={{ rotate: [-1.5, 1.5, -1.5, 0], scale: 1.05, transition: { duration: 0.5 } }}
                  whileTap={{ scale: 0.95 }}
                  className="relative mt-8 text-[6rem] leading-none md:text-[7rem]"
                  aria-label="Open gift"
                >
                  🎁
                </motion.button>
                <p className="mt-5 font-hand text-base text-ink/50 md:text-lg">tap to open ↑</p>
                <Confetti trigger={pop} />
              </div>
            ) : (
              <div className="relative">
                <Confetti trigger={pop} />
                <p className="text-center font-hand text-xl text-primary md:text-2xl">surprise ♡</p>
                <p className="mt-1 text-center font-hand text-sm text-ink/50 md:text-base">
                  Small notes for you
                </p>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
                  {giftNotes.map((n, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16, rotate: 0 }}
                      animate={{ opacity: 1, y: 0, rotate: tilts[i % tilts.length] }}
                      transition={{ delay: 0.1 + i * 0.12, type: "spring", stiffness: 180, damping: 20 }}
                      className={`relative rounded-lg p-3.5 shadow-sm md:p-4 ${colorMap[n.color] ?? "bg-card"}`}
                    >
                      <span className="tape -top-2 left-1/2 -translate-x-1/2 -rotate-2" style={{ width: 44, height: 12 }} />
                      <p className="font-hand text-base leading-relaxed text-ink md:text-lg">{n.text}</p>
                    </motion.div>
                  ))}
                </div>
                <button onClick={reset} className="btn-close mt-6">
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
