"use client";
import { useRef, useEffect, useCallback, useMemo } from "react";

interface FallingGlitchUltraProps {
  // Basic Properties
  glitchColors?: string[];
  fontSize?: number;
  backgroundColor?: string;

  // Speed & Motion
  fallSpeed?: number;
  speedVariation?: number;
  direction?: "down" | "up" | "left" | "right";

  // Visual Effects
  glitchIntensity?: number;
  glitchSpeed?: number;
  trailFade?: number;
  glowEffect?: boolean;
  glowIntensity?: number;
  blurAmount?: number;

  // Typography
  characterSet?: "full" | "letters" | "numbers" | "binary" | "symbols" | "katakana" | "custom";
  customCharacters?: string;
  columnDensity?: number;

  // Color Configuration
  colorMode?: "random" | "sequential" | "wave" | "pulse";
  rainbow?: boolean;

  // Advanced
  resetChance?: number;
  characterChangeSpeed?: number;
  wavyMotion?: boolean;
  waveAmplitude?: number;

  // Children
  children?: React.ReactNode;
}

export function FallingGlitchUltra({
  // Basic
  glitchColors = ["#00ff41", "#06b6d4", "#9333ea", "#f59e0b"],
  fontSize = 14,
  backgroundColor = "rgba(0, 0, 0, 0.05)",

  // Speed & Motion
  fallSpeed = 1,
  speedVariation = 0,
  direction = "down",

  // Visual Effects
  glitchIntensity = 0.05,
  glitchSpeed = 50,
  trailFade = 0.05,
  glowEffect = false,
  glowIntensity = 5,
  blurAmount = 0,

  // Typography
  characterSet = "full",
  customCharacters = "",
  columnDensity = 100,

  // Color Configuration
  colorMode = "random",
  rainbow = false,

  // Advanced
  resetChance = 2.5,
  characterChangeSpeed = 100,
  wavyMotion = false,
  waveAmplitude = 10,

  children,
}: FallingGlitchUltraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCountRef = useRef(0);
  const waveOffsetsRef = useRef<number[]>([]);

  // Character sets
  const charSets = useMemo(() => ({
    full: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`"
      .split("")
      .concat(["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ"]),
    letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    numbers: "0123456789".split(""),
    binary: "01".split(""),
    symbols: "@#$%^&*()_+-=[]{}|;:,.<>?/~`".split(""),
    katakana: "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン".split(""),
    custom: customCharacters ? customCharacters.split("") : []
  }), [customCharacters]);

  const chars = useMemo(() => {
    return charSets[characterSet] || charSets.full;
  }, [characterSet, charSets]);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      const effectiveFontSize = fontSize * (columnDensity / 100);
      const columns = Math.floor(canvas.width / effectiveFontSize);

      const drops: number[] = Array(columns).fill(1);
      const colors: string[] = Array(columns)
        .fill(0)
        .map((_, i) => glitchColors[i % glitchColors.length]);

      // Speed variation per column
      const speeds: number[] = Array(columns)
        .fill(0)
        .map(() => fallSpeed * (1 + (Math.random() - 0.5) * (speedVariation / 100)));

      // Wave offsets for wavy motion
      waveOffsetsRef.current = Array(columns)
        .fill(0)
        .map((_, i) => i * 0.1);

      let animationId: number;

      const animate = () => {
        frameCountRef.current++;

        // Background with trail fade
        ctx.fillStyle = backgroundColor.includes('rgba')
          ? backgroundColor
          : `rgba(0, 0, 0, ${trailFade})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Apply blur if enabled
        if (blurAmount > 0) {
          ctx.filter = `blur(${blurAmount}px)`;
        } else {
          ctx.filter = "none";
        }

        for (let i = 0; i < drops.length; i++) {
          // Character selection (affected by characterChangeSpeed)
          const charIndex = characterChangeSpeed === 100
            ? Math.floor(Math.random() * chars.length)
            : Math.floor((frameCountRef.current * characterChangeSpeed / 100) + i) % chars.length;
          const char = chars[charIndex] || chars[0];

          // Position calculation
          let x = i * effectiveFontSize;
          let y = drops[i] * fontSize;

          // Wavy motion
          if (wavyMotion) {
            x += Math.sin((frameCountRef.current * 0.05) + waveOffsetsRef.current[i]) * waveAmplitude;
          }

          // Direction handling
          switch (direction) {
            case "up":
              y = canvas.height - y;
              break;
            case "left":
              [x, y] = [canvas.width - y, x];
              break;
            case "right":
              [x, y] = [y, x];
              break;
          }

          // Color handling
          if (rainbow) {
            const hue = (frameCountRef.current + i * 10) % 360;
            colors[i] = `hsl(${hue}, 100%, 50%)`;
          } else if (Math.random() < glitchIntensity) {
            switch (colorMode) {
              case "sequential":
                const currentIndex = glitchColors.indexOf(colors[i]);
                colors[i] = glitchColors[(currentIndex + 1) % glitchColors.length];
                break;
              case "wave":
                const waveIndex = Math.floor(
                  ((Math.sin((frameCountRef.current * 0.01) + i * 0.1) + 1) / 2) * glitchColors.length
                );
                colors[i] = glitchColors[waveIndex % glitchColors.length];
                break;
              case "pulse":
                const pulse = Math.sin(frameCountRef.current * 0.05) > 0 ? 0 : 1;
                colors[i] = glitchColors[pulse % glitchColors.length];
                break;
              default: // random
                colors[i] = glitchColors[Math.floor(Math.random() * glitchColors.length)];
            }
          }

          // Apply glow effect
          if (glowEffect) {
            ctx.shadowBlur = glowIntensity;
            ctx.shadowColor = colors[i];
          } else {
            ctx.shadowBlur = 0;
          }

          // Draw character
          ctx.fillStyle = colors[i];
          ctx.font = `${fontSize}px monospace`;
          ctx.fillText(char, x, y);

          // Reset drop
          const resetThreshold = 1 - (resetChance / 100);
          const maxPos = direction === "left" || direction === "right"
            ? canvas.width
            : canvas.height;

          if (y > maxPos && Math.random() > resetThreshold) {
            drops[i] = 0;
            // Reset speed variation
            speeds[i] = fallSpeed * (1 + (Math.random() - 0.5) * (speedVariation / 100));
          }

          drops[i] += speeds[i];
        }

        animationId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    },
    [
      chars,
      fontSize,
      backgroundColor,
      glitchSpeed,
      glitchIntensity,
      fallSpeed,
      glitchColors,
      speedVariation,
      direction,
      trailFade,
      glowEffect,
      glowIntensity,
      blurAmount,
      columnDensity,
      colorMode,
      rainbow,
      resetChance,
      characterChangeSpeed,
      wavyMotion,
      waveAmplitude,
    ]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const cleanup = draw(ctx, canvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cleanup();
    };
  }, [draw]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      {children}
    </div>
  );
}

// Export original component as well for backward compatibility
export { FallingGlitch } from "./falling-glitch";
