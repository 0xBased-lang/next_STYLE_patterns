"use client";

import { useEffect, useRef } from "react";
import { NeonTrailsEngine } from "@/lib/animations/NeonTrailsEngine";
import type { NeonTrailsConfig } from "@/lib/types/animation";

interface NeonTrailsBackgroundProps {
  config: NeonTrailsConfig;
  className?: string;
}

export function NeonTrailsBackground({ config, className = "" }: NeonTrailsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<NeonTrailsEngine | null>(null);

  // Initialize engine
  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new NeonTrailsEngine(config);
    engine.init(canvasRef.current);
    engine.start();

    engineRef.current = engine;

    // Handle window resize
    const handleResize = () => {
      engine.resize();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      engine.destroy();
      engineRef.current = null;
    };
  }, []); // Only run once on mount

  // Update config when it changes
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.updateConfig(config);
    }
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
