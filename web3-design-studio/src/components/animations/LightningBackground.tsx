"use client";

import { useRef, useEffect } from "react";
import { LightningEngine, type LightningConfig } from "@/lib/animations/LightningEngine";
import { useStudioStore } from "@/lib/store/studio";
import { useMousePosition } from "@/lib/hooks/useMousePosition";

interface LightningBackgroundProps {
  config: LightningConfig;
}

export function LightningBackground({ config }: LightningBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<LightningEngine | null>(null);
  const { isPaused, globalSpeed, mouseInteraction } = useStudioStore();
  const mousePosition = useMousePosition(mouseInteraction);

  // Initialize the animation engine
  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new LightningEngine(config);
    engineRef.current = engine;

    engine.init(canvasRef.current);
    if (!isPaused) {
      engine.start();
    }

    // Handle window resize
    const handleResize = () => {
      engine.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  // Handle pause/resume
  useEffect(() => {
    if (!engineRef.current) return;

    if (isPaused) {
      engineRef.current.stop();
    } else {
      engineRef.current.start();
    }
  }, [isPaused]);

  // Update config when it changes
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
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
