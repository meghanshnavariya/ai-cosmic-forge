import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlinePaperAirplane } from "react-icons/hi";
import { Section } from "./Section";
import { MagneticButton } from "./MagneticButton";
import { profile } from "@/lib/site";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <Section
      id="contact"
      eyebrow="Mission Control"
      title="Open a channel"
      intro="Open to internships, collaborations and AI/ML learning projects. Messages here open your mail app — social links will be added once available."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          data-cursor="card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.7 }}
          className="glass rounded-3xl p-6 sm:p-8"
        >
          <h3 className="font-display text-lg font-semibold">Direct link</h3>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <HiOutlineMail aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href={`mailto:${profile.email}`} className="break-all text-foreground/90 hover:text-primary-glow">
                {profile.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <HiOutlineLocationMarker aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="text-muted-foreground">{profile.location}</span>
            </li>
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            Social profiles (GitHub, LinkedIn) and a downloadable resume are placeholders for now — share the links and
            they will go live here.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass rounded-3xl p-6 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const data = new FormData(form);
            const subject = encodeURIComponent(`Portfolio message from ${String(data.get("name") ?? "")}`);
            const body = encodeURIComponent(String(data.get("message") ?? ""));
            window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
            setSent(true);
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="text-muted-foreground">Name</span>
              <input
                name="name"
                required
                autoComplete="name"
                className="mt-2 w-full rounded-xl bg-muted/25 px-4 py-3 text-sm text-foreground ring-1 ring-border outline-none transition focus:ring-primary/50"
              />
            </label>
            <label className="block text-sm">
              <span className="text-muted-foreground">Email</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="mt-2 w-full rounded-xl bg-muted/25 px-4 py-3 text-sm text-foreground ring-1 ring-border outline-none transition focus:ring-primary/50"
              />
            </label>
          </div>
          <label className="mt-4 block text-sm">
            <span className="text-muted-foreground">Message</span>
            <textarea
              name="message"
              rows={5}
              required
              className="mt-2 w-full resize-none rounded-xl bg-muted/25 px-4 py-3 text-sm text-foreground ring-1 ring-border outline-none transition focus:ring-primary/50"
            />
          </label>
          <div className="mt-6 flex items-center gap-4">
            <MagneticButton type="submit">
              Transmit <HiOutlinePaperAirplane aria-hidden className="h-4 w-4" />
            </MagneticButton>
            <p aria-live="polite" className="text-xs text-muted-foreground">
              {sent ? "Mail app opened — send it across." : "Opens your mail app."}
            </p>
          </div>
        </motion.form>
      </div>
    </Section>
  );
}
