import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiArrowDown, HiOutlineMail, HiOutlineDocumentDownload, HiOutlineSparkles } from "react-icons/hi";
import { LazyAICore } from "./Lazy3D";
import { MagneticButton } from "./MagneticButton";
import { profile, roles } from "@/lib/site";

function RoleRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % roles.length), 2400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="relative inline-flex h-8 items-center overflow-hidden align-bottom sm:h-10">
      <motion.span
        key={index}
        initial={{ y: 26, opacity: 0, filter: "blur(6px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ y: -26, opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-xl font-semibold text-energy sm:text-2xl"
      >
        {roles[index]}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pt-28 sm:px-6">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden="true"
      />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.28em] text-muted-foreground ring-1 ring-border">
            <HiOutlineSparkles aria-hidden className="h-3.5 w-3.5 text-primary" />
            {profile.location}
          </span>

          <h1 className="mt-6 font-display text-4xl leading-[1.05] font-semibold sm:text-6xl lg:text-7xl">
            Hi, I&apos;m <span className="text-energy">Meghansh.</span>
          </h1>

          <p className="mt-4 text-lg text-foreground/85 sm:text-xl">{profile.role}</p>

          <p className="mt-3 text-sm text-muted-foreground">
            <RoleRotator />
          </p>

          <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            Exploring artificial intelligence and machine learning at {profile.college} — building, breaking and
            learning systems that think.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <MagneticButton href="#projects">
              Explore My Work <HiArrowDown aria-hidden className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              <HiOutlineDocumentDownload aria-hidden className="h-4 w-4" /> Download Resume
            </MagneticButton>
            <MagneticButton href={`mailto:${profile.email}`} variant="ghost">
              <HiOutlineMail aria-hidden className="h-4 w-4" /> Contact Me
            </MagneticButton>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Resume file not uploaded yet — request it by email and it will be sent across.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-square w-full max-w-[26rem]"
        >
          <LazyAICore />
          <div className="pointer-events-none absolute inset-x-0 -bottom-2 text-center font-display text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            AI Core · Online
          </div>
        </motion.div>
      </div>
    </section>
  );
}
