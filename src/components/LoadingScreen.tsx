import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;
    const id = window.setInterval(() => {
      value = Math.min(100, value + 6 + Math.random() * 12);
      setProgress(value);
      if (value >= 100) {
        window.clearInterval(id);
        window.setTimeout(() => setDone(true), 420);
      }
    }, 120);
    return () => window.clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="relative flex h-32 w-32 items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-primary/30 animate-pulse-glow" />
            <span className="absolute inset-4 rounded-full border border-secondary/40" />
            <motion.span
              className="absolute inset-0 rounded-full border-t-2 border-primary"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            />
            <span className="h-10 w-10 rounded-full bg-primary/70 blur-[6px]" />
          </div>
          <p className="mt-8 font-display text-xs uppercase tracking-[0.5em] text-muted-foreground">
            Initialising core
          </p>
          <div className="mt-4 h-px w-56 overflow-hidden bg-border">
            <div
              className="h-full bg-primary transition-[width] duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
