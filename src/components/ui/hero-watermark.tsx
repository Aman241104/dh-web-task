export function HeroWatermark({ children }: { children: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -top-[0.12em] left-6 select-none whitespace-nowrap text-[clamp(100px,26vw,340px)] font-black leading-none tracking-tighter text-white/[0.025] sm:left-16"
    >
      {children}
    </span>
  );
}
