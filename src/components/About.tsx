import { motion } from "framer-motion";
import { HiAcademicCap, HiOutlineLocationMarker, HiOutlineChip, HiOutlineCode } from "react-icons/hi";
import { Section } from "./Section";
import { profile, timeline } from "@/lib/site";

const facts = [
  { icon: HiAcademicCap, label: "Degree", value: profile.degree },
  { icon: HiOutlineChip, label: "College", value: profile.college },
  { icon: HiOutlineCode, label: "Status", value: profile.status },
  { icon: HiOutlineLocationMarker, label: "Base", value: profile.location },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="Crew Profile"
      title="A student engineer learning to build intelligent systems"
      intro="Currently deep in the fundamentals — languages, algorithms and the mathematics behind machine learning — while building interfaces that make technology feel alive."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <motion.div
          data-cursor="card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl"
            aria-hidden="true"
          />
          <h3 className="font-display text-lg font-semibold">Holographic profile</h3>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {facts.map((f) => (
              <div key={f.label} className="rounded-2xl bg-muted/25 p-4 ring-1 ring-border">
                <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  <f.icon aria-hidden className="h-3.5 w-3.5 text-primary" />
                  {f.label}
                </dt>
                <dd className="mt-2 text-sm text-foreground/90">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              <span className="text-foreground/90">Learning journey:</span> strengthening C++ and Python, solving data
              structures and algorithms problems daily, and moving step by step into applied machine learning.
            </p>
            <p>
              <span className="text-foreground/90">Interests:</span> artificial intelligence, machine learning models,
              intelligent interfaces, and clean, performant front-end engineering.
            </p>
            <p>
              <span className="text-foreground/90">Goal:</span> become an AI engineer who ships thoughtful, useful
              systems — not just demos.
            </p>
          </div>
        </motion.div>

        <ol className="relative space-y-4">
          <span className="absolute left-[22px] top-4 bottom-4 w-px bg-gradient-to-b from-primary/60 via-secondary/50 to-transparent" />
          {timeline.map((step, i) => (
            <motion.li
              key={step.phase}
              data-cursor="card"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="glass relative rounded-3xl p-5 pl-14 sm:p-6 sm:pl-16"
            >
              <span className="absolute left-4 top-6 flex h-4 w-4 items-center justify-center rounded-full bg-primary/25 ring-1 ring-primary/60 sm:left-5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
              </span>
              <p className="font-display text-[10px] uppercase tracking-[0.32em] text-primary/80">{step.phase}</p>
              <h3 className="mt-2 font-display text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
