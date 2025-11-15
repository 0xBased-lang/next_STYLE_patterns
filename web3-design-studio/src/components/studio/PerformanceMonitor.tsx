"use client";

import { useEffect, useState, useRef } from "react";
import { useStudioStore } from "@/lib/store/studio";
import { Activity } from "lucide-react";

export function PerformanceMonitor() {
  const { showPerformance } = useStudioStore();
  const [fps, setFps] = useState(60);
  const [frameTime, setFrameTime] = useState(16.67);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!showPerformance) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    let frames = 0;
    let lastFpsUpdate = performance.now();
    let frameTimes: number[] = [];

    const measurePerformance = (currentTime: number) => {
      // Calculate frame time
      const deltaTime = currentTime - lastTimeRef.current;
      frameTimes.push(deltaTime);
      if (frameTimes.length > 60) frameTimes.shift();

      frames++;
      frameCountRef.current++;
      lastTimeRef.current = currentTime;

      // Update FPS every 500ms
      if (currentTime - lastFpsUpdate >= 500) {
        const actualFps = Math.round((frames / (currentTime - lastFpsUpdate)) * 1000);
        const avgFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;

        setFps(actualFps);
        setFrameTime(Number(avgFrameTime.toFixed(2)));

        frames = 0;
        lastFpsUpdate = currentTime;
      }

      animationFrameRef.current = requestAnimationFrame(measurePerformance);
    };

    animationFrameRef.current = requestAnimationFrame(measurePerformance);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [showPerformance]);

  if (!showPerformance) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 glass rounded-lg px-4 py-2 animate-fade-in z-50">
      <div className="flex items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-matrix-accent" />
          <span className="text-matrix-text/60">Performance</span>
        </div>

        <div className="h-4 w-px bg-matrix-accent/20" />

        <div className="flex items-center gap-1.5">
          <span className="text-matrix-text/60">FPS:</span>
          <span
            className={
              fps >= 55
                ? "text-green-400 font-semibold"
                : fps >= 30
                ? "text-yellow-400 font-semibold"
                : "text-red-400 font-semibold"
            }
          >
            {fps}
          </span>
        </div>

        <div className="h-4 w-px bg-matrix-accent/20" />

        <div className="flex items-center gap-1.5">
          <span className="text-matrix-text/60">Frame:</span>
          <span className="text-matrix-accent font-semibold">{frameTime}ms</span>
        </div>

        <div className="h-4 w-px bg-matrix-accent/20" />

        <div className="flex items-center gap-1.5">
          <span className="text-matrix-text/60">Total:</span>
          <span className="text-matrix-text/50">{frameCountRef.current.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
