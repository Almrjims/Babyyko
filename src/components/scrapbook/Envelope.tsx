import { AnimatePresence, motion } from "framer-motion";
import { letters } from "@/content";

export function Envelope({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/50 p-4 backdrop-blur-[2px] md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, rotate: -1.5 }}
            animate={{ scale: 1, rotate: -0.5 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="paper relative my-auto w-full max-w-lg rounded-xl p-5 md:rounded-2xl md:p-8"
          >
            <span className="tape -top-2.5 left-10 -rotate-4" style={{ width: 70 }} />
            <p className="font-hand text-lg text-primary md:text-xl">to: you ✿</p>
            <div className="mt-5 space-y-6 md:mt-6 md:space-y-8">
              {letters.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.2, duration: 0.5 }}
                >
                  <p className="font-display text-2xl text-ink -rotate-0.5 md:text-3xl">{l.title}</p>
                  <pre className="mt-3 whitespace-pre-wrap font-serif text-sm leading-relaxed text-ink/90 md:text-base">
{l.body}
                  </pre>
                  <p className="mt-3 text-right font-hand text-base text-primary/80 md:text-lg">{l.sign}</p>
                </motion.div>
              ))}
            </div>
            <button onClick={onClose} className="btn-close mt-6">
              fold it back ✉
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
