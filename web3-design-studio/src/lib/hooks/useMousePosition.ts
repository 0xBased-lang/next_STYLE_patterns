/**
 * Mouse Position Hook
 * Tracks mouse position and click events for interactive animations
 */

import { useState, useEffect } from "react";

export interface MousePosition {
  x: number;
  y: number;
  isDown: boolean;
  clicks: { x: number; y: number; timestamp: number }[];
}

export function useMousePosition(enabled: boolean = true): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    isDown: false,
    clicks: [],
  });

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition((prev) => ({
        ...prev,
        x: event.clientX,
        y: event.clientY,
      }));
    };

    const handleMouseDown = (event: MouseEvent) => {
      setMousePosition((prev) => ({
        ...prev,
        isDown: true,
        clicks: [
          ...prev.clicks,
          { x: event.clientX, y: event.clientY, timestamp: Date.now() },
        ].slice(-10), // Keep last 10 clicks
      }));
    };

    const handleMouseUp = () => {
      setMousePosition((prev) => ({
        ...prev,
        isDown: false,
      }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [enabled]);

  return mousePosition;
}
