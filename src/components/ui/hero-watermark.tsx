export function HeroWatermark({ children }: { children: string }) {
  const widthRatio = children.length * 0.64;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${widthRatio * 100} 100"><text x="0" y="82" font-family="Arial, sans-serif" font-weight="900" font-size="92" letter-spacing="-2" fill="white" fill-opacity="0.025">${children}</text></svg>`;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -top-[0.12em] left-6 select-none sm:left-16"
      style={{
        height: "clamp(100px, 26vw, 340px)",
        aspectRatio: `${widthRatio} / 1`,
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left top",
        backgroundSize: "contain",
      }}
    />
  );
}
