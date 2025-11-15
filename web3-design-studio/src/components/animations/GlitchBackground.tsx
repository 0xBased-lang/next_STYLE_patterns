"use client";

import { useEffect, useRef } from "react";
import { GlitchEngine } from "@/lib/animations/GlitchEngine";
import type { GlitchConfig } from "@/lib/types/animation";
import { useStudioStore } from "@/lib/store/studio";

interface GlitchBackgroundProps {
  config: GlitchConfig;
  className?: string;
}

export function GlitchBackground({ config, className = "" }: GlitchBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GlitchEngine | null>(null);
  const { isPaused, globalSpeed } = useStudioStore();

  // Initialize engine
  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new GlitchEngine(config);
    engine.init(canvasRef.current);
    if (!isPaused) {
      engine.start();
    }

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

  // Handle pause/resume
  useEffect(() => {
    if (!engineRef.current) return;

    if (isPaused) {
      engineRef.current.stop();
    } else {
      engineRef.current.start();
    }
  }, [isPaused]);

  // Update config when it changes (including globalSpeed effect)
  useEffect(() => {
    if (engineRef.current) {
      // Glitch uses frequency instead of speed
      const adjustedConfig = {
        ...config,
        frequency: config.frequency * globalSpeed,
      };
      engineRef.current.updateConfig(adjustedConfig);
    }
  }, [config, globalSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
