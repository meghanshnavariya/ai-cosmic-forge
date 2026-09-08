import type { ReactNode } from "react";

type Props = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  download?: boolean;
  ariaLabel?: string;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 font-display text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const styles = {
  primary:
    "bg-primary/20 text-primary-glow ring-1 ring-primary/50 hover:bg-primary/30 hover:shadow-[0_0_40px_-10px_var(--primary)]",
  ghost: "text-foreground/85 ring-1 ring-border hover:ring-primary/45 hover:text-foreground",
};

export function MagneticButton({
  href,
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
  ariaLabel,
}: Props) {
  const content = (
    <>
      <span className="absolute inset-0 -translate-x-full bg-[var(--gradient-energy)] opacity-20 transition-transform duration-700 group-hover:translate-x-0" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  const cls = `${base} ${styles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} data-cursor="button" aria-label={ariaLabel} className={cls}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} data-cursor="button" aria-label={ariaLabel} className={cls}>
      {content}
    </button>
  );
}
