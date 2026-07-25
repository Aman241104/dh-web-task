"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_VALUES = [180, 210, 195, 240, 260, 300, 340, 310, 360, 400, 430, 460, 500, 540];

export type BarChartCanvasHandle = {
  hoveredIndex: number | null;
  pointer: { x: number; y: number };
};

export function BarChartCanvas({
  className,
  label,
  values = DEFAULT_VALUES,
  onHoverChange,
}: {
  className?: string;
  label: string;
  values?: number[];
  onHoverChange?: (state: { index: number | null; x: number; y: number }) => void;
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
    const canvas = canvasRef.current;

    function handlePointerMove(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      lastPointer.x = event.clientX - rect.left;
      lastPointer.y = event.clientY - rect.top;
    }
    const lastPointer = { x: 0, y: 0 };
    canvas.addEventListener("pointermove", handlePointerMove);

    import("@/lib/three-scenes").then(({ initBarChartScene }) => {
      if (disposed || !canvasRef.current) return;
      scene = initBarChartScene(canvasRef.current, {
        values,
        onHover: (index) => {
          onHoverChange?.({ index, x: lastPointer.x, y: lastPointer.y });
        },
      });
    });

    return () => {
      disposed = true;
      canvas.removeEventListener("pointermove", handlePointerMove);
      scene?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return <canvas ref={canvasRef} role="img" aria-label={label} className={className} />;
}
