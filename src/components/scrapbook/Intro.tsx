import { motion } from "framer-motion";
import { intro } from "@/content";
import { Confetti } from "./Confetti";
import { useState } from "react";

export function Intro({ onOpen }: { onOpen: () => void }) {
  const [pop, setPop] = useState(0);
  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6 py-20 text-center">
      {/* Subtle paper decorations - cleaner positioning */}
      <motion.div
        initial={{ opacity: 0, rotate: -4, y: 24 }}
        animate={{ opacity: 1, rotate: -2.5, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="paper absolute left-6 top-24 hidden h-36 w-52 rounded-lg md:block lg:left-12"
      >
        <span className="tape -top-2.5 left-8 -rotate-6" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, rotate: 5, y: 24 }}
        animate={{ opacity: 1, rotate: 3, y: 0 }}
        transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
        className="paper absolute bottom-20 right-6 hidden h-28 w-44 rounded-lg md:block lg:right-12"
      >
        <span className="tape -top-2.5 right-8 rotate-6" />
      </motion.div>

      <Confetti trigger={pop} />

      <div className="relative max-w-2xl px-4">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="font-hand text-xl text-ink/60 md:text-2xl"
        >
          {intro.small}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mt-5 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {intro.title},
          <span className="mt-3 block -rotate-1.5 px-2 font-display text-5xl text-primary underline-wave sm:text-6xl md:text-7xl lg:text-8xl">
            {intro.highlight}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.5 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.03, rotate: -0.5 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setPop((p) => p + 1);
              setTimeout(onOpen, 600);
            }}
            className="btn-scrapbook text-base md:text-lg"
          >
            <span>🎁</span>
            <span>{intro.button}</span>
          </motion.button>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="max-w-xs font-hand text-base text-ink/50 -rotate-1 md:text-lg"
          >
            {intro.scribble}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
