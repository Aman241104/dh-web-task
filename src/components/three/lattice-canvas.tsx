"use client";

import { useEffect, useRef } from "react";

export function LatticeCanvas({
  className,
  count = 46,
  spread = 4.4,
}: {
  className?: string;
  count?: number;
  spread?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    let disposed = false;
    let scene: { dispose: () => void } | undefined;

    import("@/lib/three-scenes").then(({ initLatticeScene }) => {
      if (disposed || !canvasRef.current) return;
      scene = initLatticeScene(canvasRef.current, { count, spread });
    });

    return () => {
      disposed = true;
      scene?.dispose();
    };
  }, [count, spread]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
