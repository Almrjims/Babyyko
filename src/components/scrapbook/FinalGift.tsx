import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { finalLetter } from "@/content";
import { Confetti } from "./Confetti";

export function FinalGift({ unlocked }: { unlocked: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [opened, setOpened] = useState(false);
  const [text, setText] = useState("");
  const [pop, setPop] = useState(0);

  useEffect(() => {
    if (!opened) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setText(finalLetter.slice(0, i));
      if (i >= finalLetter.length) clearInterval(t);
    }, 28);
    return () => clearInterval(t);
  }, [opened]);

  return (
    <section ref={ref} className="relative px-4 py-24">
      <Confetti trigger={pop} />
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="locked"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0 }}
            className="mx-auto max-w-md text-center"
          >
            <p className="font-hand text-xl text-primary">one last thing…</p>
            <p className="mt-2 font-hand text-base text-ink/60">
              {unlocked ? "you opened everything ♡" : "(open the things above first)"}
            </p>
            <motion.button
              disabled={!unlocked}
              onClick={() => {
                setOpened(true);
                setPop((p) => p + 1);
              }}
              whileHover={unlocked ? { scale: 1.05, rotate: -1 } : undefined}
              whileTap={unlocked ? { scale: 0.96 } : undefined}
              className={`mt-6 rounded-full px-8 py-4 font-serif text-lg shadow-md transition ${
                unlocked
                  ? "bg-primary text-primary-foreground"
                  : "cursor-not-allowed bg-muted text-muted-foreground"
              }`}
            >
              🎀 open the last gift
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="paper relative mx-auto max-w-2xl rounded-md p-8 md:p-12"
          >
            <span className="tape -top-3 left-10 -rotate-6" />
            <span className="tape -top-3 right-10 rotate-6" />
            <p className="font-hand text-2xl text-primary">a letter, just for you</p>
            <pre className="mt-6 whitespace-pre-wrap font-serif text-lg leading-relaxed text-ink">
{text}
<motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.9, repeat: Infinity }}>|</motion.span>
            </pre>
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="mt-10 -rotate-2 text-center font-display text-5xl text-primary md:text-6xl"
            >
              Happy Birthday my love ❤️
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
