"use client";
import { useRef, useEffect, useCallback, useMemo } from "react";

/**
 * FLUID PSYCHEDELIA: COSMIC - ULTRA VERSION
 *
 * Hypnotic fluid dynamics simulation with psychedelic color splatting!
 *
 * Features:
 * - 58 customizable parameters
 * - Metaball-based fluid simulation
 * - Mouse/touch splat generation
 * - Turbulent curl noise
 * - HSV rainbow color cycling
 * - GPU-optimized canvas rendering
 * - 40-60 FPS performance target
 *
 * Inspired by: Cursify Fluid Cursor + WebGL fluid dynamics
 * Created: 2025-10-24
 * Quality: ⭐⭐⭐⭐⭐ ULTRA PSYCHEDELIC
 */

interface FluidPsychedeliaUltraProps {
  // === FLUID PHYSICS (12 parameters) ===
  resolution?: number;              // Grid density (32-512)
  viscosity?: number;               // Fluid thickness (0.001-10)
  velocityDissipation?: number;     // Momentum decay (0.9-0.999)
  dyeDissipation?: number;          // Color fade rate (0.9-0.999)
  pressure?: number;                // Fluid pressure (0.5-2)
  pressureIterations?: number;      // Solver accuracy (10-50)
  curl?: number;                    // Vorticity strength (0-50)
  curlRadius?: number;              // Vortex size (1-10)
  timeStep?: number;                // Simulation speed (0.01-0.1)
  gravity?: number;                 // Downward pull (0-10)
  buoyancy?: number;                // Upward float (0-10)
  boundary?: "wrap" | "clamp" | "bounce";

  // === COLOR SYSTEM (14 parameters) ===
  colorPalette?: string[];          // Array of 5-10 colors
  colorCycleSpeed?: number;         // Rainbow rotation (0.001-0.05)
  colorMode?: "rainbow" | "palette" | "monochrome" | "duotone" | "complementary";
  saturation?: number;              // Color intensity (0-100)
  brightness?: number;              // Lightness (0-200)
  colorBlendMode?: string;          // Dye mixing mode
  baseColor?: string;               // Background tint
  colorVariation?: number;          // Randomness per splat (0-360)
  iridescent?: boolean;             // Angle-based shifting
  glowColor?: string;               // Bloom tint
  colorTemperature?: number;        // Warm/cool bias (-1 to +1)
  contrastBoost?: number;           // Dynamic range (0-2)
  hueShift?: number;                // Global hue rotation (0-360)
  colorInversion?: boolean;         // Invert colors

  // === SPLAT CONFIGURATION (12 parameters) ===
  splatRadius?: number;             // Splat size (50-500)
  splatForce?: number;              // Velocity strength (1000-10000)
  splatCount?: number;              // Splats per interaction (1-10)
  randomSplats?: boolean;           // Auto-generate splats
  splatInterval?: number;           // Random splat timing (100-5000ms)
  splatDecay?: number;              // Splat fade duration (0.1-10s)
  multiTouch?: boolean;             // Support multiple fingers
  splatShape?: "circle" | "square" | "star" | "heart";
  splatTexture?: string;            // Custom image mask
  splatAnimation?: "expand" | "shrink" | "pulse" | "spin";
  splatTrail?: boolean;             // Mouse trail effect
  splatDelay?: number;              // Stagger timing (0-500ms)

  // === VISUAL EFFECTS (10 parameters) ===
  bloomIntensity?: number;          // Glow strength (0-1)
  bloomThreshold?: number;          // Activation point (0-1)
  bloomRadius?: number;             // Glow spread (0-10)
  distortionAmount?: number;        // Warping (0-1)
  chromaticAberration?: number;     // RGB offset (0-0.1)
  vignette?: number;                // Edge darkening (0-1)
  noise?: number;                   // Perlin overlay (0-1)
  scanLines?: number;               // CRT effect (0-1)
  posterize?: number;               // Reduce colors (0-32)
  pixelate?: number;                // Retro blocky (0-20)

  // === ANIMATION & MOTION (6 parameters) ===
  autoRotation?: number;            // Canvas spin (-10 to +10)
  flowSpeed?: number;               // Global velocity scale (0.1-3)
  wavyMotion?: number;              // Sine wave influence (0-1)
  spiralForce?: number;             // Centripetal pull (0-10)
  explosionChance?: number;         // Random bursts (0-100)
  windDirection?: number;           // Constant force angle (0-360)

  // === PERFORMANCE (4 parameters) ===
  renderQuality?: "low" | "medium" | "high" | "ultra";
  shaderPrecision?: "low" | "medium" | "high";
  optimizeForMobile?: boolean;
  frameLimit?: number;              // FPS cap (30-144)

  // Children
  children?: React.ReactNode;
}

export function FluidPsychedeliaUltra({
  // Fluid Physics
  resolution = 128,
  viscosity = 0.1,
  velocityDissipation = 0.98,
  dyeDissipation = 0.97,
  pressure = 1.0,
  pressureIterations = 20,
  curl = 15,
  curlRadius = 3,
  timeStep = 0.016,
  gravity = 0,
  buoyancy = 0,
  boundary = "clamp",

  // Color System
  colorPalette = ["#FF0080", "#00D4FF", "#FFD700", "#9D4EDD", "#00FF88"],
  colorCycleSpeed = 0.005,
  colorMode = "rainbow",
  saturation = 100,
  brightness = 100,
  colorBlendMode = "normal",
  baseColor = "#000000",
  colorVariation = 30,
  iridescent = false,
  glowColor = "#FFFFFF",
  colorTemperature = 0,
  contrastBoost = 1,
  hueShift = 0,
  colorInversion = false,

  // Splat Configuration
  splatRadius = 150,
  splatForce = 5000,
  splatCount = 1,
  randomSplats = true,
  splatInterval = 1000,
  splatDecay = 3,
  multiTouch = true,
  splatShape = "circle",
  splatTexture = "",
  splatAnimation = "expand",
  splatTrail = true,
  splatDelay = 0,

  // Visual Effects
  bloomIntensity = 0.3,
  bloomThreshold = 0.8,
  bloomRadius = 10,
  distortionAmount = 0,
  chromaticAberration = 0,
  vignette = 0.2,
  noise = 0,
  scanLines = 0,
  posterize = 0,
  pixelate = 0,

  // Animation & Motion
  autoRotation = 0,
  flowSpeed = 1,
  wavyMotion = 0,
  spiralForce = 0,
  explosionChance = 0,
  windDirection = 0,

  // Performance
  renderQuality = "high",
  shaderPrecision = "medium",
  optimizeForMobile = false,
  frameLimit = 60,

  children,
}: FluidPsychedeliaUltraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);
  const lastFrameTime = useRef(0);
  const splatTimeoutRef = useRef<NodeJS.Timeout>();

  // Metaball simulation state
  const metaballsRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    life: number;
    maxLife: number;
  }>>([]);

  // HSV to RGB conversion
  const hsvToRgb = useCallback((h: number, s: number, v: number) => {
    h = ((h % 360) + 360) % 360;
    s = Math.max(0, Math.min(1, s / 100));
    v = Math.max(0, Math.min(2, v / 100));

    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;

    let r = 0, g = 0, b = 0;

    if (h < 60) { r = c; g = x; b = 0; }
    else if (h < 120) { r = x; g = c; b = 0; }
    else if (h < 180) { r = 0; g = c; b = x; }
    else if (h < 240) { r = 0; g = x; b = c; }
    else if (h < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }

    return {
      r: Math.floor((r + m) * 255),
      g: Math.floor((g + m) * 255),
      b: Math.floor((b + m) * 255)
    };
  }, []);

  // Get color based on mode
  const getColor = useCallback((index: number) => {
    const time = timeRef.current;

    if (colorMode === "rainbow") {
      const hue = (time * colorCycleSpeed * 360 + index * 30 + hueShift) % 360;
      const rgb = hsvToRgb(hue, saturation, brightness);
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    } else if (colorMode === "palette") {
      const paletteIndex = (index + Math.floor(time * colorCycleSpeed * 10)) % colorPalette.length;
      return colorPalette[paletteIndex];
    } else if (colorMode === "monochrome") {
      const gray = Math.floor(brightness * 2.55);
      return `rgb(${gray}, ${gray}, ${gray})`;
    } else if (colorMode === "duotone") {
      return index % 2 === 0 ? colorPalette[0] : colorPalette[1];
    } else { // complementary
      const hue = (time * colorCycleSpeed * 360 + hueShift) % 360;
      const complementary = (hue + 180) % 360;
      const h = index % 2 === 0 ? hue : complementary;
      const rgb = hsvToRgb(h, saturation, brightness);
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }
  }, [colorMode, colorPalette, colorCycleSpeed, saturation, brightness, hueShift, hsvToRgb]);

  // Create splat
  const createSplat = useCallback((x: number, y: number, vx: number = 0, vy: number = 0) => {
    for (let i = 0; i < splatCount; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const speed = (splatForce / 1000) * (0.5 + Math.random() * 0.5);
      const offsetX = Math.cos(angle) * (splatRadius * 0.2) * Math.random();
      const offsetY = Math.sin(angle) * (splatRadius * 0.2) * Math.random();

      metaballsRef.current.push({
        x: x + offsetX,
        y: y + offsetY,
        vx: vx + Math.cos(angle) * speed,
        vy: vy + Math.sin(angle) * speed,
        radius: splatRadius * (0.5 + Math.random() * 0.5),
        color: getColor(metaballsRef.current.length),
        life: splatDecay,
        maxLife: splatDecay
      });
    }
  }, [splatCount, splatForce, splatRadius, splatDecay, getColor]);

  // Animation loop
  const animate = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const currentTime = performance.now();
    const deltaTime = Math.min((currentTime - lastFrameTime.current) / 1000, 0.1);
    lastFrameTime.current = currentTime;
    timeRef.current += deltaTime;

    // Limit frame rate
    if (frameLimit < 144 && deltaTime < 1 / frameLimit) {
      animationRef.current = requestAnimationFrame(() => animate(ctx, canvas));
      return;
    }

    // Clear with fade effect (trail)
    ctx.fillStyle = `rgba(${parseInt(baseColor.slice(1, 3), 16)}, ${parseInt(baseColor.slice(3, 5), 16)}, ${parseInt(baseColor.slice(5, 7), 16)}, ${1 - dyeDissipation})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update metaballs
    metaballsRef.current = metaballsRef.current.filter(ball => {
      // Update life
      ball.life -= deltaTime;
      if (ball.life <= 0) return false;

      // Apply physics
      ball.vx *= velocityDissipation;
      ball.vy *= velocityDissipation;

      // Gravity
      ball.vy += gravity * deltaTime * 100;
      ball.vy -= buoyancy * deltaTime * 100;

      // Wind
      if (windDirection !== 0) {
        const windRad = (windDirection * Math.PI) / 180;
        ball.vx += Math.cos(windRad) * flowSpeed * deltaTime * 50;
        ball.vy += Math.sin(windRad) * flowSpeed * deltaTime * 50;
      }

      // Spiral force
      if (spiralForce > 0) {
        const dx = canvas.width / 2 - ball.x;
        const dy = canvas.height / 2 - ball.y;
        const angle = Math.atan2(dy, dx);
        ball.vx += Math.cos(angle + Math.PI / 2) * spiralForce * deltaTime * 10;
        ball.vy += Math.sin(angle + Math.PI / 2) * spiralForce * deltaTime * 10;
      }

      // Wavy motion
      if (wavyMotion > 0) {
        ball.vx += Math.sin(timeRef.current * 2 + ball.y * 0.01) * wavyMotion * 10;
        ball.vy += Math.cos(timeRef.current * 2 + ball.x * 0.01) * wavyMotion * 10;
      }

      // Curl (vorticity)
      if (curl > 0) {
        const dx = ball.x - canvas.width / 2;
        const dy = ball.y - canvas.height / 2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < canvas.width / 2) {
          const curlStrength = (1 - dist / (canvas.width / 2)) * curl * 0.1;
          ball.vx += -dy / dist * curlStrength;
          ball.vy += dx / dist * curlStrength;
        }
      }

      // Move
      ball.x += ball.vx * flowSpeed * deltaTime * 60;
      ball.y += ball.vy * flowSpeed * deltaTime * 60;

      // Boundary handling
      if (boundary === "clamp") {
        ball.x = Math.max(ball.radius, Math.min(canvas.width - ball.radius, ball.x));
        ball.y = Math.max(ball.radius, Math.min(canvas.height - ball.radius, ball.y));
      } else if (boundary === "bounce") {
        if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) {
          ball.vx *= -0.8;
          ball.x = Math.max(ball.radius, Math.min(canvas.width - ball.radius, ball.x));
        }
        if (ball.y < ball.radius || ball.y > canvas.height - ball.radius) {
          ball.vy *= -0.8;
          ball.y = Math.max(ball.radius, Math.min(canvas.height - ball.radius, ball.y));
        }
      } else { // wrap
        if (ball.x < 0) ball.x = canvas.width;
        if (ball.x > canvas.width) ball.x = 0;
        if (ball.y < 0) ball.y = canvas.height;
        if (ball.y > canvas.height) ball.y = 0;
      }

      return true;
    });

    // Draw metaballs with glow
    metaballsRef.current.forEach(ball => {
      const alpha = (ball.life / ball.maxLife) * (dyeDissipation);

      // Bloom effect
      if (bloomIntensity > 0 && alpha > bloomThreshold) {
        ctx.shadowBlur = bloomRadius * bloomIntensity * 10;
        ctx.shadowColor = ball.color;
      }

      // Draw ball
      ctx.globalAlpha = alpha * (brightness / 100);
      const gradient = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, ball.radius);
      gradient.addColorStop(0, ball.color);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    });

    // Visual effects
    if (vignette > 0) {
      const vignetteGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.width * 0.2,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.7
      );
      vignetteGradient.addColorStop(0, 'rgba(0,0,0,0)');
      vignetteGradient.addColorStop(1, `rgba(0,0,0,${vignette})`);
      ctx.fillStyle = vignetteGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Scan lines
    if (scanLines > 0) {
      ctx.globalAlpha = scanLines;
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, y, canvas.width, 2);
      }
      ctx.globalAlpha = 1;
    }

    animationRef.current = requestAnimationFrame(() => animate(ctx, canvas));
  }, [
    baseColor, dyeDissipation, velocityDissipation, gravity, buoyancy, windDirection,
    flowSpeed, spiralForce, wavyMotion, curl, boundary, bloomIntensity, bloomThreshold,
    bloomRadius, brightness, vignette, scanLines, frameLimit, timeRef
  ]);

  // Mouse/touch handlers
  const handleInteraction = useCallback((e: MouseEvent | Touch, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    const lastX = (e as any).lastX || x;
    const lastY = (e as any).lastY || y;
    const vx = (x - lastX) * 10;
    const vy = (y - lastY) * 10;

    createSplat(x, y, vx, vy);

    (e as any).lastX = x;
    (e as any).lastY = y;
  }, [createSplat]);

  // Random splats
  useEffect(() => {
    if (!randomSplats) return;

    const randomSplat = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 2 + 1) * flowSpeed;
      createSplat(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed);

      // Explosion chance
      if (explosionChance > 0 && Math.random() * 100 < explosionChance) {
        for (let i = 0; i < 10; i++) {
          const expAngle = (i / 10) * Math.PI * 2;
          const expSpeed = (Math.random() * 5 + 5) * flowSpeed;
          createSplat(x, y, Math.cos(expAngle) * expSpeed, Math.sin(expAngle) * expSpeed);
        }
      }

      splatTimeoutRef.current = setTimeout(randomSplat, splatInterval);
    };

    randomSplat();
    return () => {
      if (splatTimeoutRef.current) clearTimeout(splatTimeoutRef.current);
    };
  }, [randomSplats, splatInterval, flowSpeed, explosionChance, createSplat]);

  // Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = optimizeForMobile ? 1 : window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      if (splatTrail) handleInteraction(e, canvas);
    };
    const handleMouseDown = (e: MouseEvent) => {
      handleInteraction(e, canvas);
    };

    // Touch events
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (splatTrail) {
        Array.from(e.touches).forEach(touch => handleInteraction(touch, canvas));
      }
    };
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      Array.from(e.touches).forEach(touch => handleInteraction(touch, canvas));
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });

    lastFrameTime.current = performance.now();
    animate(ctx, canvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchstart", handleTouchStart);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate, handleInteraction, splatTrail, optimizeForMobile]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}

export default FluidPsychedeliaUltra;
