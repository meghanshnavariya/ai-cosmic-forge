import { motion } from "framer-motion";
import { HiOutlineBriefcase, HiOutlineBadgeCheck } from "react-icons/hi";
import { Section } from "./Section";
import { timeline, experience, certifications } from "@/lib/site";

export function Journey() {
  return (
    <Section
      id="journey"
      eyebrow="Flight Path"
      title="Student → Developer → AI/ML Engineer"
      intro="A three-phase trajectory: master the fundamentals, build real systems, then go deep into applied artificial intelligence."
    >
      <ol className="relative grid gap-6 md:grid-cols-3">
        <span
          className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px md:block"
          style={{ background: "var(--gradient-energy)", opacity: 0.4 }}
          aria-hidden="true"
        />
        {timeline.map((t, i) => (
          <motion.li
            key={t.phase}
            data-cursor="card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="glass relative rounded-3xl p-6"
          >
            <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 font-display text-xs font-semibold text-primary-glow ring-1 ring-primary/40">
              0{i + 1}
            </span>
            <p className="mt-5 font-display text-[10px] uppercase tracking-[0.32em] text-primary/80">{t.phase}</p>
            <h3 className="mt-2 font-display text-lg font-semibold">{t.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
          </motion.li>
        ))}
      </ol>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="glass rounded-3xl p-6" data-cursor="card">
          <h3 className="flex items-center gap-2 font-display text-sm font-semibold">
            <HiOutlineBriefcase aria-hidden className="h-4 w-4 text-primary" /> Experience
          </h3>
          <ul className="mt-4 space-y-4">
            {experience.map((e) => (
              <li key={e.title} className="rounded-2xl bg-muted/25 p-4 ring-1 ring-border">
                <p className="text-sm text-foreground/90">{e.title}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{e.org}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-3xl p-6" data-cursor="card">
          <h3 className="flex items-center gap-2 font-display text-sm font-semibold">
            <HiOutlineBadgeCheck aria-hidden className="h-4 w-4 text-primary" /> Certifications
          </h3>
          <ul className="mt-4 space-y-4">
            {certifications.map((c) => (
              <li key={c.title} className="rounded-2xl bg-muted/25 p-4 ring-1 ring-border">
                <p className="text-sm text-foreground/90">{c.title}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{c.org}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
