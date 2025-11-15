"use client";

import { useEffect, useRef } from "react";
import { AuroraEngine } from "@/lib/animations/AuroraEngine";
import type { AuroraConfig } from "@/lib/types/animation";
import { useStudioStore } from "@/lib/store/studio";

interface AuroraBackgroundProps {
  config: AuroraConfig;
  className?: string;
}

export function AuroraBackground({ config, className = "" }: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<AuroraEngine | null>(null);
  const { isPaused, globalSpeed } = useStudioStore();

  // Initialize engine
  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new AuroraEngine(config);
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
      const adjustedConfig = {
        ...config,
        speed: config.speed * globalSpeed,
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
