"use client";

import { useEffect, useRef } from "react";
import { GlitchEngine } from "@/lib/animations/GlitchEngine";
import type { GlitchConfig } from "@/lib/types/animation";

interface GlitchBackgroundProps {
  config: GlitchConfig;
  className?: string;
}

export function GlitchBackground({ config, className = "" }: GlitchBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GlitchEngine | null>(null);

  // Initialize engine
  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new GlitchEngine(config);
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
