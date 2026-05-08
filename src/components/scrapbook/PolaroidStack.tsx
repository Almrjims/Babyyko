import { AnimatePresence, motion } from "framer-motion";
import { polaroids } from "@/content";
import { useState } from "react";

const tilts = [-6, 4, -3, 5, -2, 3];

export function PolaroidStack({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [zoom, setZoom] = useState<number | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/50 p-4 backdrop-blur-[2px] md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => (zoom !== null ? setZoom(null) : onClose())}
        >
          <motion.div
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="paper relative my-auto w-full max-w-2xl rounded-xl p-5 md:rounded-2xl md:p-8"
          >
            <span className="tape -top-2.5 left-10 -rotate-4" style={{ width: 70 }} />
            <p className="text-center font-hand text-xl text-primary md:text-2xl">
              little photo stack ♡
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:mt-6 md:gap-5">
              {polaroids.map((p, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 16, rotate: 0 }}
                  animate={{ opacity: 1, y: 0, rotate: tilts[i % tilts.length] }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 180, damping: 20 }}
                  whileHover={{ rotate: 0, scale: 1.04, zIndex: 10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setZoom(i)}
                  className="polaroid"
                >
                  {i % 3 === 0 && (
                    <span
                      className="tape -top-2.5 left-3 -rotate-8"
                      style={{ width: 48, height: 14 }}
                    />
                  )}
                  <img
                    src={p.src}
                    alt={p.caption}
                    loading="lazy"
                    className="aspect-square w-full rounded-[1px] object-cover"
                  />
                  <p className="mt-1.5 text-center font-hand text-sm text-ink md:mt-2 md:text-base">
                    {p.caption}
                  </p>
                </motion.button>
              ))}
            </div>
            <button onClick={onClose} className="btn-close mt-6">
              close stack
            </button>
          </motion.div>

          {/* Zoomed polaroid view */}
          <AnimatePresence>
            {zoom !== null && (
              <motion.div
                className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 p-5 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setZoom(null)}
              >
                <motion.div
                  className="polaroid max-w-sm md:max-w-md"
                  initial={{ scale: 0.85, rotate: -2 }}
                  animate={{ scale: 1, rotate: -1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <img src={polaroids[zoom].src} alt="" className="w-full rounded-[1px]" />
                  <p className="mt-2.5 text-center font-hand text-xl text-ink md:mt-3 md:text-2xl">
                    {polaroids[zoom].caption}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
