import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
};

type Mode = "idle" | "button" | "card" | "link";

const BLUE = 225;
const PURPLE = 275;

/**
 * Futuristic anime energy-blade cursor.
 * Desktop / fine-pointer only. Fully disabled for touch and reduced motion.
 */
export function AnimeCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    document.documentElement.classList.add("no-cursor");
    document.body.classList.add("no-cursor");

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const core = { x: target.x, y: target.y, vx: 0, vy: 0 };
    const trail: { x: number; y: number }[] = [];
    const particles: Particle[] = [];
    const ripples: { x: number; y: number; r: number; life: number }[] = [];
    let mode: Mode = "idle";
    let radius = 7;
    let rotation = 0;
    let lastMove = performance.now();
    let magnetEl: HTMLElement | null = null;

    const clearMagnet = () => {
      if (magnetEl) {
        magnetEl.style.transform = "";
        magnetEl.style.transition = "transform 400ms cubic-bezier(0.22,1,0.36,1)";
        magnetEl = null;
      }
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      lastMove = performance.now();

      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const card = el?.closest<HTMLElement>("[data-cursor='card']");
      const btn = el?.closest<HTMLElement>("[data-cursor='button'], button");
      const link = el?.closest<HTMLElement>("a[href]");

      if (card) mode = "card";
      else if (btn) mode = "button";
      else if (link) mode = "link";
      else mode = "idle";

      const magnetTarget = btn ?? card ?? null;
      if (magnetTarget !== magnetEl) clearMagnet();
      if (magnetTarget) {
        magnetEl = magnetTarget;
        const r = magnetTarget.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / Math.max(r.width, 1);
        const dy = (e.clientY - (r.top + r.height / 2)) / Math.max(r.height, 1);
        magnetEl.style.transition = "transform 180ms ease-out";
        if (mode === "card") {
          magnetEl.style.transform = `perspective(900px) rotateY(${dx * 9}deg) rotateX(${-dy * 9}deg) translateZ(6px)`;
        } else {
          magnetEl.style.transform = `translate(${dx * 8}px, ${dy * 8}px)`;
        }
      }
    };

    const spawnBurst = (x: number, y: number, count: number, power: number) => {
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = (0.4 + Math.random()) * power;
        particles.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          life: 0,
          maxLife: 380 + Math.random() * 320,
          size: 0.8 + Math.random() * 1.8,
          hue: Math.random() > 0.5 ? BLUE : PURPLE,
        });
      }
    };

    const onDown = (e: PointerEvent) => {
      spawnBurst(e.clientX, e.clientY, 22, 2.6);
      ripples.push({ x: e.clientX, y: e.clientY, r: 4, life: 0 });
      radius += 8;
    };

    const onLeave = () => {
      mode = "idle";
      clearMagnet();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerout", onLeave);
    window.addEventListener("resize", resize);

    let raf = 0;
    let prev = performance.now();

    const draw = (now: number) => {
      const dt = Math.min(now - prev, 48);
      prev = now;

      // elastic follow
      const stiffness = 0.16;
      const damping = 0.72;
      core.vx = (core.vx + (target.x - core.x) * stiffness) * damping;
      core.vy = (core.vy + (target.y - core.y) * stiffness) * damping;
      core.x += core.vx;
      core.y += core.vy;

      const speed = Math.hypot(core.vx, core.vy);
      const idle = now - lastMove > 380;

      trail.unshift({ x: core.x, y: core.y });
      const trailLen = Math.round(8 + Math.min(speed * 2.4, 30));
      while (trail.length > trailLen) trail.pop();

      const targetRadius =
        mode === "card" ? 20 : mode === "button" ? 15 : mode === "link" ? 11 : idle ? 7 + Math.sin(now / 420) * 1.2 : 8;
      radius += (targetRadius - radius) * 0.14;
      rotation += (speed * 0.012 + 0.004) * dt * 0.06;

      if (speed > 3 && Math.random() > 0.45) {
        particles.push({
          x: core.x,
          y: core.y,
          vx: -core.vx * 0.12 + (Math.random() - 0.5) * 0.6,
          vy: -core.vy * 0.12 + (Math.random() - 0.5) * 0.6,
          life: 0,
          maxLife: 420 + Math.random() * 280,
          size: 0.7 + Math.random() * 1.4,
          hue: Math.random() > 0.5 ? BLUE : PURPLE,
        });
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = "lighter";

      // katana-style energy trail
      if (trail.length > 2) {
        for (let i = trail.length - 1; i > 0; i--) {
          const p = trail[i];
          const n = trail[i - 1];
          const t = 1 - i / trail.length;
          ctx.strokeStyle = `hsla(${BLUE + (PURPLE - BLUE) * (1 - t)}, 95%, ${58 + t * 20}%, ${t * 0.5})`;
          ctx.lineWidth = Math.max(0.4, t * (radius * 0.55));
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }

      // particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);
        p.vx *= 0.975;
        p.vy *= 0.975;
        const a = 1 - p.life / p.maxLife;
        ctx.fillStyle = `hsla(${p.hue}, 95%, 70%, ${a * 0.7})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * a, 0, Math.PI * 2);
        ctx.fill();
      }

      // ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.life += dt;
        r.r += dt * 0.22;
        const a = 1 - r.life / 520;
        if (a <= 0) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `hsla(${BLUE}, 95%, 72%, ${a * 0.5})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // soft glow halo
      const glow = ctx.createRadialGradient(core.x, core.y, 0, core.x, core.y, radius * 3.4);
      glow.addColorStop(0, `hsla(${BLUE}, 100%, 76%, 0.32)`);
      glow.addColorStop(0.5, `hsla(${PURPLE}, 100%, 70%, 0.14)`);
      glow.addColorStop(1, "hsla(0,0%,0%,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(core.x, core.y, radius * 3.4, 0, Math.PI * 2);
      ctx.fill();

      // blade core
      ctx.save();
      ctx.translate(core.x, core.y);
      ctx.rotate(rotation + Math.atan2(core.vy, core.vx) * 0.25);
      const bladeLen = radius * (1.5 + Math.min(speed * 0.09, 1.5));
      const gradient = ctx.createLinearGradient(-bladeLen, 0, bladeLen, 0);
      gradient.addColorStop(0, `hsla(${PURPLE}, 100%, 72%, 0.05)`);
      gradient.addColorStop(0.5, "hsla(0, 0%, 100%, 0.95)");
      gradient.addColorStop(1, `hsla(${BLUE}, 100%, 74%, 0.05)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(-bladeLen, 0);
      ctx.lineTo(0, -radius * 0.42);
      ctx.lineTo(bladeLen, 0);
      ctx.lineTo(0, radius * 0.42);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // inner core dot
      ctx.fillStyle = "hsla(0, 0%, 100%, 0.96)";
      ctx.beginPath();
      ctx.arc(core.x, core.y, Math.max(1.4, radius * 0.2), 0, Math.PI * 2);
      ctx.fill();

      // energy ring for button / lock reticle for link / orbiters for card
      if (mode === "button" || mode === "card") {
        ctx.strokeStyle = `hsla(${mode === "card" ? PURPLE : BLUE}, 96%, 74%, 0.55)`;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.arc(core.x, core.y, radius * 1.7, 0, Math.PI * 2);
        ctx.stroke();
        const orbits = mode === "card" ? 5 : 3;
        for (let i = 0; i < orbits; i++) {
          const a = now / 480 + (i * Math.PI * 2) / orbits;
          const ox = core.x + Math.cos(a) * radius * 2.1;
          const oy = core.y + Math.sin(a) * radius * 2.1;
          ctx.fillStyle = `hsla(${i % 2 ? PURPLE : BLUE}, 96%, 78%, 0.85)`;
          ctx.beginPath();
          ctx.arc(ox, oy, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (mode === "link") {
        ctx.strokeStyle = `hsla(${BLUE}, 96%, 78%, 0.75)`;
        ctx.lineWidth = 1.2;
        const s = radius * 1.9;
        const c = s * 0.55;
        const corners = [
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
        ];
        for (const [sx, sy] of corners) {
          ctx.beginPath();
          ctx.moveTo(core.x + sx * s, core.y + sy * s - sy * c);
          ctx.lineTo(core.x + sx * s, core.y + sy * s);
          ctx.lineTo(core.x + sx * s - sx * c, core.y + sy * s);
          ctx.stroke();
        }
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerout", onLeave);
      window.removeEventListener("resize", resize);
      clearMagnet();
      document.documentElement.classList.remove("no-cursor");
      document.body.classList.remove("no-cursor");
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] hidden [@media(pointer:fine)]:block"
    />
  );
}
