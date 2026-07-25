"use client";

import { useEffect, useRef } from "react";

export function GlobeCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    let disposed = false;
    let scene: { dispose: () => void } | undefined;

    import("@/lib/three-scenes").then(({ initGlobeScene }) => {
      if (disposed || !canvasRef.current) return;
      scene = initGlobeScene(canvasRef.current, {});
    });

    return () => {
      disposed = true;
      scene?.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} role="img" aria-label="Globe showing Northline's Austin and Lisbon offices connected by an arc" className={className} />;
}
