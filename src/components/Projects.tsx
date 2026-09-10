import { motion } from "framer-motion";
import { HiOutlineCube, HiOutlineExternalLink } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { Section } from "./Section";
import { projects } from "@/lib/site";

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Mission Log"
      title="Projects in the hangar"
      intro="Live project data has not been uploaded yet — these bays are reserved and will fill up as builds are completed."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            data-cursor="card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            className="glass group relative flex flex-col overflow-hidden rounded-3xl p-6 transition-shadow duration-500 hover:glow-ring"
          >
            <div
              className="pointer-events-none absolute inset-x-0 -top-24 h-40 opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
              style={{ background: "var(--gradient-energy)" }}
              aria-hidden="true"
            />
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                <HiOutlineCube aria-hidden className="h-5 w-5 text-primary-glow" />
              </span>
              {p.placeholder && (
                <span className="rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground ring-1 ring-border">
                  Reserved
                </span>
              )}
            </div>

            <h3 className="mt-5 font-display text-lg font-semibold">{p.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-muted/30 px-2.5 py-1 text-[11px] text-foreground/80 ring-1 ring-border"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-2">
              {p.github ? (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-foreground/85 ring-1 ring-border transition-colors hover:text-foreground hover:ring-primary/40"
                >
                  <FaGithub aria-hidden className="h-3.5 w-3.5" /> Code
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground ring-1 ring-border">
                  <FaGithub aria-hidden className="h-3.5 w-3.5" /> Link pending
                </span>
              )}
              {p.demo && (
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-primary-glow ring-1 ring-primary/40 transition-colors hover:bg-primary/15"
                >
                  <HiOutlineExternalLink aria-hidden className="h-3.5 w-3.5" /> Live
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
