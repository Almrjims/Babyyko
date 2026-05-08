import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cake } from "@/content";
import { Confetti } from "./Confetti";

export function Cake({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [lit, setLit] = useState(false);
  const [wished, setWished] = useState(false);
  const [pop, setPop] = useState(0);

  const reset = () => {
    setLit(false);
    setWished(false);
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
            initial={{ scale: 0.9, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="paper relative w-full max-w-md rounded-2xl p-8 text-center"
          >
            <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" />
            <Confetti trigger={pop} />

            <div className="relative mx-auto mt-2 flex h-44 w-56 items-end justify-center">
              {/* candles */}
              <div className="absolute top-0 flex gap-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex flex-col items-center">
                    <AnimatePresence>
                      {lit && !wished && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                          className="h-3 w-3 rounded-full bg-[oklch(0.85_0.18_60)] shadow-[0_0_12px_oklch(0.85_0.18_60/0.9)]"
                        />
                      )}
                    </AnimatePresence>
                    <div className="mt-1 h-6 w-1.5 rounded-sm bg-[oklch(0.85_0.06_350)]" />
                  </div>
                ))}
              </div>
              {/* cake */}
              <div className="relative mt-8 w-full">
                <div className="mx-auto h-6 w-44 rounded-t-md bg-[oklch(0.92_0.05_350)]" />
                <div className="mx-auto h-16 w-52 rounded-md bg-[oklch(0.88_0.07_30)] shadow-inner" />
                <div className="mx-auto h-3 w-56 rounded-b-md bg-[oklch(0.78_0.08_30)]" />
              </div>
            </div>

            {!lit ? (
              <button
                onClick={() => setLit(true)}
                className="mt-6 rounded-full bg-primary px-6 py-2 font-serif text-primary-foreground"
              >
                light the candles 🕯️
              </button>
            ) : !wished ? (
              <>
                <p className="mt-4 font-display text-3xl text-primary">{cake.prompt}</p>
                <button
                  onClick={() => {
                    setWished(true);
                    setPop((p) => p + 1);
                  }}
                  className="mt-3 rounded-full bg-primary px-6 py-2 font-serif text-primary-foreground"
                >
                  blow them out ♡
                </button>
              </>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 font-hand text-xl text-ink"
              >
                {cake.reveal}
              </motion.p>
            )}

            <button
              onClick={reset}
              className="mx-auto mt-6 block font-hand text-base text-ink/60 hover:underline"
            >
              close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
