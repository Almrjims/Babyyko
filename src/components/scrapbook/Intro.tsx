import { motion } from "framer-motion";
import { intro } from "@/content";
import { Confetti } from "./Confetti";
import { useState } from "react";

export function Intro({ onOpen }: { onOpen: () => void }) {
  const [pop, setPop] = useState(0);
  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6 py-16 text-center">
      {/* paper layers */}
      <motion.div
        initial={{ opacity: 0, rotate: -4, y: 20 }}
        animate={{ opacity: 1, rotate: -3, y: 0 }}
        transition={{ duration: 0.8 }}
        className="paper absolute left-4 top-20 hidden h-40 w-56 rounded-md md:block"
      >
        <span className="tape -top-3 left-6 -rotate-12" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, rotate: 5, y: 20 }}
        animate={{ opacity: 1, rotate: 4, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="paper absolute bottom-16 right-6 hidden h-32 w-48 rounded-md md:block"
      >
        <span className="tape -top-3 right-6 rotate-12" />
      </motion.div>

      <Confetti trigger={pop} />

      <div className="relative max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-hand text-2xl text-ink/70"
        >
          {intro.small}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 font-serif text-5xl leading-tight text-ink md:text-7xl"
        >
          {intro.title},
          <span className="mt-2 block -rotate-2 px-2 font-display text-6xl text-primary underline-wave md:text-8xl">
            {intro.highlight}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              setPop((p) => p + 1);
              setTimeout(onOpen, 600);
            }}
            className="group relative rounded-full bg-primary px-9 py-4 font-serif text-lg text-primary-foreground shadow-[0_8px_30px_-10px_oklch(0.72_0.13_15/0.6)]"
          >
            🎁 {intro.button}
          </motion.button>
          <p className="font-hand text-lg text-ink/60 -rotate-1">{intro.scribble}</p>
        </motion.div>
      </div>
    </section>
  );
}
