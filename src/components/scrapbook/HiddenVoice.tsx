import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { hiddenVoice } from "@/content";

function Waveform({ active, bars = 26 }: { active: boolean; bars?: number }) {
  const heights = useRef<number[]>(
    Array.from({ length: bars }, () => 0.3 + Math.random() * 0.7),
  );
  return (
    <div className="flex h-10 items-center gap-[3px]">
      {heights.current.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-primary/70"
          animate={active ? { scaleY: [h * 0.4, h, h * 0.5] } : { scaleY: h * 0.4 }}
          transition={{ duration: 0.9 + (i % 5) * 0.12, repeat: active ? Infinity : 0, ease: "easeInOut" }}
          style={{ height: `${h * 100}%`, transformOrigin: "center" }}
        />
      ))}
    </div>
  );
}

export function HiddenHeart() {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleClick = () => {
    const next = count + 1;
    setCount(next);
    if (next >= 3) {
      setOpen(true);
      setCount(0);
    }
  };

  useEffect(() => {
    if (!open) {
      audioRef.current?.pause();
      setPlaying(false);
    }
  }, [open]);

  const togglePlay = () => {
    if (!hiddenVoice.audio) {
      setPlaying((p) => !p);
      return;
    }
    if (!audioRef.current) {
      audioRef.current = new Audio(hiddenVoice.audio);
    }
    if (playing) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setPlaying((p) => !p);
  };

  return (
    <>
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.15, rotate: 6 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-4 top-2.5 z-20 select-none text-lg text-primary/60 transition-colors hover:text-primary/80"
        aria-label="heart sticker"
      >
        ♡
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/55 p-4 backdrop-blur-[2px] md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="paper relative w-full max-w-xs rounded-xl p-5 md:max-w-sm md:rounded-2xl md:p-6"
            >
              <span className="tape -top-2.5 left-1/2 -translate-x-1/2 -rotate-2" style={{ width: 60 }} />
              <p className="font-hand text-lg text-primary md:text-xl">{hiddenVoice.caption}</p>
              <p className="mt-1 font-hand text-xs text-ink/50 md:text-sm">{hiddenVoice.timestamp}</p>

              {/* Cassette player - refined */}
              <div className="mt-4 rounded-lg bg-ink/85 p-3.5 md:mt-5 md:p-4">
                <div className="flex items-center justify-around">
                  {[0, 1].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ rotate: playing ? 360 : 0 }}
                      transition={{ duration: 2.5, repeat: playing ? Infinity : 0, ease: "linear" }}
                      className="h-7 w-7 rounded-full border-2 border-primary/50 bg-ink md:h-8 md:w-8"
                    >
                      <div className="m-auto mt-1.5 h-2.5 w-2.5 rounded-full bg-primary/50 md:mt-2 md:h-3 md:w-3" />
                    </motion.div>
                  ))}
                </div>
                <div className="mt-2.5 rounded bg-cream/85 p-2 md:mt-3">
                  <Waveform active={playing} />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={togglePlay}
                className="btn-scrapbook mt-4 w-full text-sm md:text-base"
              >
                {playing ? "pause ♡" : "play ▶"}
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-4 text-center font-hand text-base text-ink md:mt-5 md:text-lg"
              >
                {hiddenVoice.reveal}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
