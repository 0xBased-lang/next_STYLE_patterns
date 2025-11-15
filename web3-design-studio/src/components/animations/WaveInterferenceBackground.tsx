"use client";

import { useEffect, useRef } from "react";
import { WaveInterferenceEngine } from "@/lib/animations/WaveInterferenceEngine";
import type { WaveInterferenceConfig } from "@/lib/types/animation";
import { useStudioStore } from "@/lib/store/studio";
import { useMousePosition } from "@/lib/hooks/useMousePosition";

interface WaveInterferenceBackgroundProps {
  config: WaveInterferenceConfig;
  className?: string;
}

export function WaveInterferenceBackground({ config, className = "" }: WaveInterferenceBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<WaveInterferenceEngine | null>(null);
  const { isPaused, globalSpeed, mouseInteraction } = useStudioStore();
  const mousePosition = useMousePosition(mouseInteraction);

  // Initialize engine
  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new WaveInterferenceEngine(config);
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

  // Handle clicks to add wave sources
  useEffect(() => {
    if (!mouseInteraction) return;

    const lastClick = mousePosition.clicks[mousePosition.clicks.length - 1];
    if (lastClick && engineRef.current) {
      engineRef.current.handleClick(lastClick.x, lastClick.y);
    }
  }, [mousePosition.clicks, mouseInteraction]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
