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
    <section ref={ref} className="relative px-5 py-20 md:px-8 md:py-28">
      <Confetti trigger={pop} />
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="locked"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-md text-center"
          >
            <p className="font-hand text-lg text-primary md:text-xl">one last thing…</p>
            <p className="mt-2 font-hand text-sm text-ink/50 md:text-base">
              {unlocked ? "you opened everything ♡" : "(open the things above first)"}
            </p>
            <motion.button
              disabled={!unlocked}
              onClick={() => {
                setOpened(true);
                setPop((p) => p + 1);
              }}
              whileHover={unlocked ? { scale: 1.02 } : undefined}
              whileTap={unlocked ? { scale: 0.98 } : undefined}
              className={`mt-8 transition-all ${
                unlocked
                  ? "btn-scrapbook"
                  : "cursor-not-allowed rounded-full bg-muted px-7 py-3.5 font-serif text-base text-muted-foreground opacity-60"
              }`}
            >
              <span>🎀</span>
              <span>open the last gift</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="paper relative mx-auto max-w-2xl rounded-xl p-6 md:rounded-2xl md:p-10 lg:p-12"
          >
            <span className="tape -top-2.5 left-8 -rotate-4" style={{ width: 70 }} />
            <span className="tape -top-2.5 right-8 rotate-4" style={{ width: 70 }} />
            <p className="font-hand text-xl text-primary md:text-2xl">a letter, just for you</p>
            <pre className="mt-5 whitespace-pre-wrap font-serif text-sm leading-relaxed text-ink/90 md:mt-6 md:text-base md:leading-7 lg:text-lg">
{text}
<motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.85, repeat: Infinity }}>|</motion.span>
            </pre>
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
              className="mt-10 -rotate-1 text-center font-display text-4xl text-primary md:mt-12 md:text-5xl lg:text-6xl"
            >
              Happy Birthday my love ❤️
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
