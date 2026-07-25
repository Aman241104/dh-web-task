"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_VALUES = [180, 210, 195, 240, 260, 300, 340, 310, 360, 400, 430, 460, 500, 540];

export function BarChartCanvas({
  className,
  label,
  values = DEFAULT_VALUES,
}: {
  className?: string;
  label: string;
  values?: number[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !canvasRef.current) return;
    let disposed = false;
    let scene: { dispose: () => void } | undefined;

    import("@/lib/three-scenes").then(({ initBarChartScene }) => {
      if (disposed || !canvasRef.current) return;
      scene = initBarChartScene(canvasRef.current, { values });
    });

    return () => {
      disposed = true;
      scene?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return <canvas ref={canvasRef} role="img" aria-label={label} className={className} />;
}
