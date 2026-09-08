import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 ${
          scrolled ? "glass glow-ring" : "border border-transparent"
        }`}
      >
        <a href="#hero" className="group flex items-center gap-3">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
            <span className="h-3 w-3 rounded-full bg-primary shadow-[0_0_18px_var(--primary)]" />
          </span>
          <span className="font-display text-sm font-semibold tracking-[0.28em] uppercase">Meghansh</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          data-cursor="button"
          className="hidden rounded-full bg-primary/15 px-4 py-2 text-sm font-medium text-primary-glow ring-1 ring-primary/40 transition-colors hover:bg-primary/25 md:inline-flex"
        >
          Mission Control
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-border md:hidden"
        >
          {open ? <HiX aria-hidden className="h-5 w-5" /> : <HiOutlineMenuAlt3 aria-hidden className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl p-2 md:hidden"
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.header>
  );
}
