"use client";

import { useEffect, useRef } from "react";
import { MorphBlobEngine } from "@/lib/animations/MorphBlobEngine";
import type { MorphBlobConfig } from "@/lib/types/animation";
import { useStudioStore } from "@/lib/store/studio";
import { useMousePosition } from "@/lib/hooks/useMousePosition";

interface MorphBlobBackgroundProps {
  config: MorphBlobConfig;
  className?: string;
}

export function MorphBlobBackground({ config, className = "" }: MorphBlobBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<MorphBlobEngine | null>(null);
  const { isPaused, globalSpeed, mouseInteraction } = useStudioStore();
  const mousePosition = useMousePosition(mouseInteraction);

  // Initialize engine
  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new MorphBlobEngine(config);
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

  // Handle mouse interaction toggle
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setMouseInteraction(mouseInteraction);
    }
  }, [mouseInteraction]);

  // Update mouse position
  useEffect(() => {
    if (engineRef.current && mouseInteraction) {
      engineRef.current.setMousePosition(mousePosition.x, mousePosition.y);
    }
  }, [mousePosition, mouseInteraction]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
