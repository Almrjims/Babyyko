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
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => (zoom !== null ? setZoom(null) : onClose())}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="paper relative w-full max-w-2xl rounded-2xl p-6 md:p-8"
          >
            <span className="tape -top-3 left-10 -rotate-6" />
            <p className="text-center font-hand text-2xl text-primary">
              little photo stack ♡
            </p>
            <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3">
              {polaroids.map((p, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 20, rotate: 0 }}
                  animate={{ opacity: 1, y: 0, rotate: tilts[i % tilts.length] }}
                  transition={{ delay: i * 0.07, type: "spring", stiffness: 160 }}
                  whileHover={{ rotate: 0, scale: 1.06, zIndex: 10 }}
                  onClick={() => setZoom(i)}
                  className="polaroid"
                >
                  {i % 3 === 0 && (
                    <span
                      className="tape -top-3 left-4 -rotate-12"
                      style={{ width: 60, height: 18 }}
                    />
                  )}
                  <img
                    src={p.src}
                    alt={p.caption}
                    loading="lazy"
                    className="aspect-square w-full object-cover"
                  />
                  <p className="mt-2 text-center font-hand text-base text-ink">
                    {p.caption}
                  </p>
                </motion.button>
              ))}
            </div>
            <button
              onClick={onClose}
              className="mx-auto mt-6 block font-hand text-lg text-ink/60 hover:underline"
            >
              close stack
            </button>
          </motion.div>

          <AnimatePresence>
            {zoom !== null && (
              <motion.div
                className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/70 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setZoom(null)}
              >
                <motion.div
                  className="polaroid max-w-md"
                  initial={{ scale: 0.8, rotate: -3 }}
                  animate={{ scale: 1, rotate: -2 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                >
                  <img src={polaroids[zoom].src} alt="" className="w-full" />
                  <p className="mt-3 text-center font-hand text-2xl text-ink">
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
