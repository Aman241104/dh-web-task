"use client";

import { useEffect, useRef } from "react";

export function OrbCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    let disposed = false;
    let scene: { dispose: () => void } | undefined;

    import("@/lib/three-scenes").then(({ initOrbScene }) => {
      if (disposed || !canvasRef.current) return;
      scene = initOrbScene(canvasRef.current, {});
    });

    return () => {
      disposed = true;
      scene?.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
