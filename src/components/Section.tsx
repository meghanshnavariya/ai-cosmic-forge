import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary/80">{eyebrow}</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">{title}</h2>
          {intro && <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">{intro}</p>}
        </motion.div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
