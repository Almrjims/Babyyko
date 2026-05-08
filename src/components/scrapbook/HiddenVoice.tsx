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
        whileHover={{ scale: 1.2, rotate: 8 }}
        whileTap={{ scale: 0.85 }}
        className="absolute right-5 top-3 z-20 select-none text-xl text-primary/70"
        aria-label="heart sticker"
      >
        ♡
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/70 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-2xl bg-[oklch(0.96_0.02_85)] p-6 shadow-[0_0_60px_-10px_oklch(0.85_0.10_350/0.7)]"
            >
              <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" />
              <p className="font-hand text-xl text-primary">{hiddenVoice.caption}</p>
              <p className="mt-1 font-hand text-sm text-ink/60">{hiddenVoice.timestamp}</p>

              {/* cassette-ish */}
              <div className="mt-5 rounded-lg bg-ink/90 p-4">
                <div className="flex items-center justify-around">
                  {[0, 1].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ rotate: playing ? 360 : 0 }}
                      transition={{ duration: 2, repeat: playing ? Infinity : 0, ease: "linear" }}
                      className="h-8 w-8 rounded-full border-2 border-primary/60 bg-ink"
                    >
                      <div className="m-auto mt-2 h-3 w-3 rounded-full bg-primary/60" />
                    </motion.div>
                  ))}
                </div>
                <div className="mt-3 rounded bg-cream/90 p-2">
                  <Waveform active={playing} />
                </div>
              </div>

              <button
                onClick={togglePlay}
                className="mt-4 w-full rounded-full bg-primary py-2 font-serif text-primary-foreground"
              >
                {playing ? "pause ♡" : "play ▶"}
              </button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-5 text-center font-hand text-lg text-ink"
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
