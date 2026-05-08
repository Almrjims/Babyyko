import { AnimatePresence, motion } from "framer-motion";
import { letters } from "@/content";

export function Envelope({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, rotate: -2 }}
            animate={{ scale: 1, rotate: -1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="paper relative w-full max-w-lg rounded-md p-6 md:p-8"
          >
            <span className="tape -top-3 left-12 -rotate-6" />
            <p className="font-hand text-xl text-primary">to: you ✿</p>
            <div className="mt-4 space-y-6">
              {letters.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.2 }}
                >
                  <p className="font-display text-3xl text-ink -rotate-1">{l.title}</p>
                  <pre className="mt-2 whitespace-pre-wrap font-serif text-base leading-relaxed text-ink">
{l.body}
                  </pre>
                  <p className="mt-2 text-right font-hand text-lg text-primary">{l.sign}</p>
                </motion.div>
              ))}
            </div>
            <button
              onClick={onClose}
              className="mx-auto mt-6 block font-hand text-lg text-ink/60 hover:underline"
            >
              fold it back ✉
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
