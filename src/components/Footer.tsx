import { profile } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative px-4 pb-12 pt-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 border-t border-border pt-8 text-center">
        <p className="font-display text-[11px] uppercase tracking-[0.42em] text-muted-foreground">
          Meghansh — Exploring the future
        </p>
        <p className="text-xs text-muted-foreground">
          {new Date().getFullYear()} · {profile.role} · {profile.location}
        </p>
        <a href={`mailto:${profile.email}`} className="text-xs text-primary-glow hover:underline">
          {profile.email}
        </a>
      </div>
    </footer>
  );
}
