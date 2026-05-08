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
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-[2px] md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={reset}
        >
          <motion.div
            initial={{ scale: 0.92, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="paper relative w-full max-w-sm rounded-xl p-6 text-center md:max-w-md md:rounded-2xl md:p-8"
          >
            <span className="tape -top-2.5 left-1/2 -translate-x-1/2 -rotate-2" style={{ width: 70 }} />
            <Confetti trigger={pop} />

            {/* Cake illustration - slightly refined */}
            <div className="relative mx-auto mt-4 flex h-40 w-52 items-end justify-center md:h-44 md:w-56">
              {/* candles */}
              <div className="absolute top-0 flex gap-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex flex-col items-center">
                    <AnimatePresence>
                      {lit && !wished && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: [1, 1.15, 1], opacity: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
                          className="h-2.5 w-2.5 rounded-full bg-[oklch(0.88_0.15_55)] shadow-[0_0_10px_oklch(0.88_0.15_55/0.8)]"
                        />
                      )}
                    </AnimatePresence>
                    <div className="mt-1 h-5 w-1.5 rounded-sm bg-[oklch(0.88_0.05_350)]" />
                  </div>
                ))}
              </div>
              {/* cake layers */}
              <div className="relative mt-8 w-full">
                <div className="mx-auto h-5 w-40 rounded-t-md bg-[oklch(0.94_0.04_350)] md:h-6 md:w-44" />
                <div className="mx-auto h-14 w-48 rounded-md bg-[oklch(0.90_0.05_30)] shadow-inner md:h-16 md:w-52" />
                <div className="mx-auto h-2.5 w-52 rounded-b-md bg-[oklch(0.80_0.06_30)] md:h-3 md:w-56" />
              </div>
            </div>

            {!lit ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setLit(true)}
                className="btn-scrapbook mt-6"
              >
                light the candles 🕯️
              </motion.button>
            ) : !wished ? (
              <div className="mt-5">
                <p className="font-display text-2xl text-primary md:text-3xl">{cake.prompt}</p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setWished(true);
                    setPop((p) => p + 1);
                  }}
                  className="btn-scrapbook mt-4"
                >
                  blow them out ♡
                </motion.button>
              </div>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 font-hand text-lg text-ink md:text-xl"
              >
                {cake.reveal}
              </motion.p>
            )}

            <button onClick={reset} className="btn-close mt-6">
              close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
