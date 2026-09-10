import { motion } from "framer-motion";
import { Section } from "./Section";
import { skills } from "@/lib/site";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Ship Systems"
      title="Skill modules currently online"
      intro="Each module represents a tool actively in use — languages, foundations and the AI/ML stack being trained on."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => (
          <motion.article
            key={s.name}
            data-cursor="card"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="glass group relative overflow-hidden rounded-2xl p-5 transition-shadow duration-500 hover:glow-ring"
          >
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
              style={{ background: s.hue }}
              aria-hidden="true"
            />
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-xs font-semibold ring-1 ring-border"
                style={{ background: `color-mix(in oklab, ${s.hue} 22%, transparent)` }}
              >
                {s.short}
              </span>
              <h3 className="font-display text-sm font-semibold">{s.name}</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.note}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
