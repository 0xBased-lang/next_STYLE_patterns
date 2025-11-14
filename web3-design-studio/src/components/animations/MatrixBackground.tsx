"use client";

import { useEffect, useRef } from "react";
import { MatrixEngine } from "@/lib/animations/MatrixEngine";
import type { MatrixConfig } from "@/lib/types/animation";

interface MatrixBackgroundProps {
  config: MatrixConfig;
  className?: string;
}

export function MatrixBackground({ config, className = "" }: MatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<MatrixEngine | null>(null);

  // Initialize engine
  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new MatrixEngine(config);
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
