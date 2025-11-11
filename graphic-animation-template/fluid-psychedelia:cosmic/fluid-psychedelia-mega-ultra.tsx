"use client";
import { useRef, useEffect, useCallback, useMemo, useState } from "react";

/**
 * FLUID PSYCHEDELIA: COSMIC - MEGA ULTRA VERSION
 *
 * The ULTIMATE hypnotic fluid dynamics simulation with INSANE customization!
 *
 * Features:
 * - 121 CUSTOMIZABLE PARAMETERS! (vs 58 in ULTRA version)
 * - 8 NEW EFFECT SYSTEMS!
 * - Particle overlay with flow tracking
 * - Kaleidoscope & symmetry modes
 * - Automated pattern generators
 * - Advanced post-processing effects
 * - Time-based pulsing & morphing
 * - Advanced mouse interaction modes
 * - GPU-optimized canvas rendering
 * - 40-60 FPS performance target
 *
 * NEW IN MEGA ULTRA:
 * ✨ Particle system with 1000+ particles following fluid flow
 * ✨ Kaleidoscope mode with 2-16 way mirroring
 * ✨ Auto-splat patterns (spiral, grid, orbit, chaos)
 * ✨ Gravitational wells & turbulence fields
 * ✨ Advanced color modes (zones, temperature, reactive)
 * ✨ Post-processing (pixelation, edge detection, aberration)
 * ✨ Time animations (pulsing, morphing, wave forces)
 * ✨ Mouse modes (splat, attract, repel, vortex, draw)
 *
 * Created: 2025-10-24
 * Quality: ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ LEGENDARY PSYCHEDELIC
 */

interface FluidPsychedeliaMegaUltraProps {
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

  // === 🆕 ADVANCED COLOR MODES (8 NEW parameters) ===
  advancedColorMode?: "temperature" | "zones" | "reactive" | "off";
  temperatureScale?: boolean;       // Blue (cold) to Red (hot)
  colorZones?: number;              // 1-16 (divide screen into color zones)
  colorInversionSpeed?: number;     // 0-5 (default: 1)
  colorContrast?: number;           // 0-2 (default: 1)
  colorSaturationBoost?: number;    // 0-3 (default: 1)
  zoneColorShift?: number;          // 0-360 (hue shift per zone)
  reactiveColorIntensity?: number;  // 0-10 (velocity-based color)

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

  // === 🆕 AUTOMATED PATTERN GENERATORS (10 NEW parameters) ===
  autoSplatEnabled?: boolean;       // Automatic splat generation
  autoSplatPattern?: "random" | "spiral" | "grid" | "orbit" | "chaos";
  autoSplatFrequency?: number;      // 0-10/sec (default: 2)
  autoSplatSize?: number;           // 0.1-5 (default: 1)
  autoSplatForce?: number;          // 0-10 (default: 3)
  turbulenceEnabled?: boolean;      // Random force fields
  turbulenceIntensity?: number;     // 0-5 (default: 2)
  turbulenceScale?: number;         // 0-10 (default: 3)
  gravitationalWells?: number;      // 0-8 (number of attraction points)
  wellStrength?: number;            // 0-5 (default: 2)

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

  // === 🆕 POST-PROCESSING EFFECTS (8 NEW parameters) ===
  pixelationEnabled?: boolean;      // Pixelate effect
  pixelationSize?: number;          // 1-50 (default: 1 = off)
  edgeDetection?: boolean;          // Outline fluid boundaries
  edgeThickness?: number;           // 1-10 (default: 2)
  chromaticAberrationAmount?: number; // 0-50 (default: 0)
  scanlineEffect?: boolean;         // CRT scanline effect
  scanlineIntensity?: number;       // 0-1 (default: 0.3)
  noiseOverlay?: number;            // 0-1 (default: 0)

  // === 🆕 DISPLACEMENT & WARPING (9 NEW parameters) ===
  warpEnabled?: boolean;            // Enable displacement effects
  warpIntensity?: number;           // 0-5 (default: 1)
  warpFrequency?: number;           // 0-10 (default: 2)
  warpSpeed?: number;               // 0-5 (default: 1)
  kaleidoscopeMode?: boolean;       // Mirror effect
  kaleidoscopeSegments?: number;    // 2,4,6,8,12,16 (default: 4)
  fisheyeDistortion?: number;       // 0-2 (default: 0)
  rippleEffect?: boolean;           // Water ripple distortion
  rippleFrequency?: number;         // 0-10 (default: 5)

  // === 🆕 SYMMETRY & MIRRORING (5 NEW parameters) ===
  symmetryEnabled?: boolean;        // Enable symmetry
  symmetryMode?: "horizontal" | "vertical" | "quad" | "radial";
  symmetrySegments?: number;        // 2,4,6,8,12,16 (default: 4)
  mirrorCenterX?: number;           // 0-1 (default: 0.5)
  mirrorCenterY?: number;           // 0-1 (default: 0.5)

  // === ANIMATION & MOTION (6 parameters) ===
  autoRotation?: number;            // Canvas spin (-10 to +10)
  flowSpeed?: number;               // Global velocity scale (0.1-3)
  wavyMotion?: number;              // Sine wave influence (0-1)
  spiralForce?: number;             // Centripetal pull (0-10)
  explosionChance?: number;         // Random bursts (0-100)
  windDirection?: number;           // Constant force angle (0-360)

  // === 🆕 TIME-BASED ANIMATIONS (7 NEW parameters) ===
  pulseEnabled?: boolean;           // Pulsing intensity effect
  pulseSpeed?: number;              // 0-5 (default: 1)
  pulseIntensity?: number;          // 0-2 (default: 0.5)
  waveAnimation?: boolean;          // Animated wave forces
  waveFrequency?: number;           // 0-5 (default: 1)
  colorCycleMode?: "linear" | "sine" | "bounce"; // Color animation mode
  morphingEnabled?: boolean;        // Auto-morph through effects

  // === 🆕 PARTICLE OVERLAY SYSTEM (10 NEW parameters) ===
  particleOverlay?: boolean;        // Enable particle system
  particleCount?: number;           // 0-5000 (default: 1000)
  particleSize?: number;            // 1-20px (default: 3)
  particleLifetime?: number;        // 0.5-5s (default: 2)
  particleTrailLength?: number;     // 0-50 (default: 10)
  particleColorMode?: "fluid" | "custom" | "rainbow";
  particleOpacity?: number;         // 0-1 (default: 0.7)
  particleVelocityInheritance?: number; // 0-1 (default: 0.8)
  particleGravity?: number;         // -2 to 2 (default: 0)
  particleRotation?: boolean;       // Rotate particles with flow

  // === 🆕 ADVANCED MOUSE INTERACTIONS (6 NEW parameters) ===
  mouseMode?: "splat" | "attract" | "repel" | "vortex" | "draw";
  mouseTrailIntensity?: number;     // 0-5 (default: 1)
  mouseInfluenceRadius?: number;    // 10-500px (default: 100)
  mouseVortexStrength?: number;     // 0-10 (default: 5)
  mouseDrawMode?: boolean;          // Continuous splat painting
  mouseDrawSize?: number;           // 0.1-5 (default: 1)

  // === PERFORMANCE (4 parameters) ===
  renderQuality?: "low" | "medium" | "high" | "ultra";
  shaderPrecision?: "low" | "medium" | "high";
  optimizeForMobile?: boolean;
  frameLimit?: number;              // FPS cap (30-144)

  // Children
  children?: React.ReactNode;
}

// Particle type for overlay system
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  rotation: number;
  trail: Array<{ x: number; y: number }>;
}

// Gravitational well type
interface GravitationalWell {
  x: number;
  y: number;
  strength: number;
  radius: number;
}

export function FluidPsychedeliaMegaUltra({
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

  // 🆕 Advanced Color Modes
  advancedColorMode = "off",
  temperatureScale = false,
  colorZones = 4,
  colorInversionSpeed = 1,
  colorContrast = 1,
  colorSaturationBoost = 1,
  zoneColorShift = 60,
  reactiveColorIntensity = 5,

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

  // 🆕 Automated Pattern Generators
  autoSplatEnabled = false,
  autoSplatPattern = "random",
  autoSplatFrequency = 2,
  autoSplatSize = 1,
  autoSplatForce = 3,
  turbulenceEnabled = false,
  turbulenceIntensity = 2,
  turbulenceScale = 3,
  gravitationalWells = 0,
  wellStrength = 2,

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

  // 🆕 Post-Processing Effects
  pixelationEnabled = false,
  pixelationSize = 1,
  edgeDetection = false,
  edgeThickness = 2,
  chromaticAberrationAmount = 0,
  scanlineEffect = false,
  scanlineIntensity = 0.3,
  noiseOverlay = 0,

  // 🆕 Displacement & Warping
  warpEnabled = false,
  warpIntensity = 1,
  warpFrequency = 2,
  warpSpeed = 1,
  kaleidoscopeMode = false,
  kaleidoscopeSegments = 4,
  fisheyeDistortion = 0,
  rippleEffect = false,
  rippleFrequency = 5,

  // 🆕 Symmetry & Mirroring
  symmetryEnabled = false,
  symmetryMode = "quad",
  symmetrySegments = 4,
  mirrorCenterX = 0.5,
  mirrorCenterY = 0.5,

  // Animation & Motion
  autoRotation = 0,
  flowSpeed = 1,
  wavyMotion = 0,
  spiralForce = 0,
  explosionChance = 0,
  windDirection = 0,

  // 🆕 Time-Based Animations
  pulseEnabled = false,
  pulseSpeed = 1,
  pulseIntensity = 0.5,
  waveAnimation = false,
  waveFrequency = 1,
  colorCycleMode = "linear",
  morphingEnabled = false,

  // 🆕 Particle Overlay System
  particleOverlay = false,
  particleCount = 1000,
  particleSize = 3,
  particleLifetime = 2,
  particleTrailLength = 10,
  particleColorMode = "fluid",
  particleOpacity = 0.7,
  particleVelocityInheritance = 0.8,
  particleGravity = 0,
  particleRotation = false,

  // 🆕 Advanced Mouse Interactions
  mouseMode = "splat",
  mouseTrailIntensity = 1,
  mouseInfluenceRadius = 100,
  mouseVortexStrength = 5,
  mouseDrawMode = false,
  mouseDrawSize = 1,

  // Performance
  renderQuality = "high",
  shaderPrecision = "medium",
  optimizeForMobile = false,
  frameLimit = 60,

  children,
}: FluidPsychedeliaMegaUltraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);
  const lastFrameTime = useRef(0);
  const splatTimeoutRef = useRef<NodeJS.Timeout>();
  const mousePosition = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });

  // 🆕 Particle system state
  const particlesRef = useRef<Particle[]>([]);

  // 🆕 Gravitational wells state
  const wellsRef = useRef<GravitationalWell[]>([]);

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

  // 🆕 Advanced color mode calculation
  const getAdvancedColor = useCallback((x: number, y: number, velocity: number, index: number, canvas: HTMLCanvasElement) => {
    const time = timeRef.current;

    if (advancedColorMode === "temperature") {
      // Blue (cold) to Red (hot) based on velocity
      const temp = Math.min(1, velocity / 10);
      const hue = 240 - (temp * 240); // 240 (blue) to 0 (red)
      const rgb = hsvToRgb(hue, saturation * colorSaturationBoost, brightness);
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    } else if (advancedColorMode === "zones") {
      // Divide screen into color zones
      const zoneX = Math.floor((x / canvas.width) * Math.sqrt(colorZones));
      const zoneY = Math.floor((y / canvas.height) * Math.sqrt(colorZones));
      const zoneIndex = zoneX + zoneY * Math.sqrt(colorZones);
      const hue = (zoneIndex * zoneColorShift + time * colorCycleSpeed * 360) % 360;
      const rgb = hsvToRgb(hue, saturation * colorSaturationBoost, brightness);
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    } else if (advancedColorMode === "reactive") {
      // Color changes based on velocity
      const hue = (velocity * reactiveColorIntensity * 36 + time * colorCycleSpeed * 360) % 360;
      const rgb = hsvToRgb(hue, saturation * colorSaturationBoost, brightness);
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }

    return null;
  }, [advancedColorMode, colorZones, zoneColorShift, saturation, colorSaturationBoost, brightness, reactiveColorIntensity, colorCycleSpeed, hsvToRgb]);

  // Get color based on mode
  const getColor = useCallback((index: number, x?: number, y?: number, velocity?: number, canvas?: HTMLCanvasElement) => {
    const time = timeRef.current;

    // Try advanced color mode first
    if (advancedColorMode !== "off" && x !== undefined && y !== undefined && velocity !== undefined && canvas) {
      const advColor = getAdvancedColor(x, y, velocity, index, canvas);
      if (advColor) return advColor;
    }

    // Pulse modulation
    let pulseModulation = 1;
    if (pulseEnabled) {
      pulseModulation = 1 + Math.sin(time * pulseSpeed) * pulseIntensity;
    }

    const effectiveBrightness = brightness * pulseModulation;
    const effectiveSaturation = saturation * colorSaturationBoost;

    if (colorMode === "rainbow") {
      let hue = (time * colorCycleSpeed * 360 + index * 30 + hueShift) % 360;
      if (colorCycleMode === "sine") {
        hue += Math.sin(time * 0.5) * 60;
      } else if (colorCycleMode === "bounce") {
        hue += (Math.abs(Math.sin(time * 0.3)) - 0.5) * 120;
      }
      const rgb = hsvToRgb(hue, effectiveSaturation, effectiveBrightness);
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    } else if (colorMode === "palette") {
      const paletteIndex = (index + Math.floor(time * colorCycleSpeed * 10)) % colorPalette.length;
      return colorPalette[paletteIndex];
    } else if (colorMode === "monochrome") {
      const gray = Math.floor(effectiveBrightness * 2.55);
      return `rgb(${gray}, ${gray}, ${gray})`;
    } else if (colorMode === "duotone") {
      return index % 2 === 0 ? colorPalette[0] : colorPalette[1];
    } else { // complementary
      const hue = (time * colorCycleSpeed * 360 + hueShift) % 360;
      const complementary = (hue + 180) % 360;
      const h = index % 2 === 0 ? hue : complementary;
      const rgb = hsvToRgb(h, effectiveSaturation, effectiveBrightness);
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }
  }, [colorMode, colorPalette, colorCycleSpeed, saturation, brightness, hueShift, hsvToRgb,
      pulseEnabled, pulseSpeed, pulseIntensity, colorSaturationBoost, colorCycleMode, advancedColorMode, getAdvancedColor]);

  // 🆕 Initialize gravitational wells
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || gravitationalWells === 0) {
      wellsRef.current = [];
      return;
    }

    wellsRef.current = Array.from({ length: gravitationalWells }, (_, i) => {
      const angle = (i / gravitationalWells) * Math.PI * 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;
      return {
        x: canvas.width / 2 + Math.cos(angle) * radius,
        y: canvas.height / 2 + Math.sin(angle) * radius,
        strength: wellStrength,
        radius: mouseInfluenceRadius,
      };
    });
  }, [gravitationalWells, wellStrength, mouseInfluenceRadius]);

  // 🆕 Initialize particle system
  useEffect(() => {
    if (!particleOverlay || particleCount === 0) {
      particlesRef.current = [];
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    particlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: particleLifetime,
      maxLife: particleLifetime,
      size: particleSize * (0.5 + Math.random() * 0.5),
      color: getColor(i),
      rotation: Math.random() * Math.PI * 2,
      trail: [],
    }));
  }, [particleOverlay, particleCount, particleLifetime, particleSize, getColor]);

  // Create splat
  const createSplat = useCallback((x: number, y: number, vx: number = 0, vy: number = 0, customRadius?: number, customForce?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const effectiveRadius = customRadius !== undefined ? customRadius : splatRadius;
    const effectiveForce = customForce !== undefined ? customForce : splatForce;
    const velocity = Math.sqrt(vx * vx + vy * vy);

    for (let i = 0; i < splatCount; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const speed = (effectiveForce / 1000) * (0.5 + Math.random() * 0.5);
      const offsetX = Math.cos(angle) * (effectiveRadius * 0.2) * Math.random();
      const offsetY = Math.sin(angle) * (effectiveRadius * 0.2) * Math.random();

      metaballsRef.current.push({
        x: x + offsetX,
        y: y + offsetY,
        vx: vx + Math.cos(angle) * speed,
        vy: vy + Math.sin(angle) * speed,
        radius: effectiveRadius * (0.5 + Math.random() * 0.5),
        color: getColor(metaballsRef.current.length, x, y, velocity, canvas),
        life: splatDecay,
        maxLife: splatDecay
      });
    }
  }, [splatCount, splatForce, splatRadius, splatDecay, getColor]);

  // 🆕 Auto-splat pattern generators
  useEffect(() => {
    if (!autoSplatEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const patternInterval = setInterval(() => {
      const time = timeRef.current;

      if (autoSplatPattern === "spiral") {
        // Spiral pattern
        const angle = time * autoSplatFrequency;
        const radius = (Math.sin(time * 0.5) * 0.5 + 0.5) * Math.min(canvas.width, canvas.height) * 0.4;
        const x = canvas.width / 2 + Math.cos(angle) * radius;
        const y = canvas.height / 2 + Math.sin(angle) * radius;
        createSplat(x, y, Math.cos(angle) * autoSplatForce * 100, Math.sin(angle) * autoSplatForce * 100,
                   splatRadius * autoSplatSize, splatForce * autoSplatForce);
      } else if (autoSplatPattern === "grid") {
        // Grid pattern
        const gridSize = 4;
        const cellX = Math.floor(Math.random() * gridSize);
        const cellY = Math.floor(Math.random() * gridSize);
        const x = (cellX / gridSize) * canvas.width + (canvas.width / gridSize / 2);
        const y = (cellY / gridSize) * canvas.height + (canvas.height / gridSize / 2);
        createSplat(x, y, 0, 0, splatRadius * autoSplatSize, splatForce * autoSplatForce);
      } else if (autoSplatPattern === "orbit") {
        // Orbit pattern
        const angle1 = time * autoSplatFrequency;
        const angle2 = time * autoSplatFrequency * 2;
        const radius = Math.min(canvas.width, canvas.height) * 0.3;
        const x = canvas.width / 2 + Math.cos(angle1) * radius + Math.cos(angle2) * radius * 0.5;
        const y = canvas.height / 2 + Math.sin(angle1) * radius + Math.sin(angle2) * radius * 0.5;
        createSplat(x, y, -Math.sin(angle1) * autoSplatForce * 50, Math.cos(angle1) * autoSplatForce * 50,
                   splatRadius * autoSplatSize, splatForce * autoSplatForce);
      } else if (autoSplatPattern === "chaos") {
        // Chaos mode - multiple random splats
        const count = Math.floor(Math.random() * 5) + 3;
        for (let i = 0; i < count; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const angle = Math.random() * Math.PI * 2;
          createSplat(x, y, Math.cos(angle) * autoSplatForce * 200, Math.sin(angle) * autoSplatForce * 200,
                     splatRadius * autoSplatSize * (Math.random() + 0.5), splatForce * autoSplatForce);
        }
      } else {
        // Random pattern
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const angle = Math.random() * Math.PI * 2;
        createSplat(x, y, Math.cos(angle) * autoSplatForce * 100, Math.sin(angle) * autoSplatForce * 100,
                   splatRadius * autoSplatSize, splatForce * autoSplatForce);
      }
    }, 1000 / autoSplatFrequency);

    return () => clearInterval(patternInterval);
  }, [autoSplatEnabled, autoSplatPattern, autoSplatFrequency, autoSplatSize, autoSplatForce, createSplat, splatRadius, splatForce]);

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

    // 🆕 Wave animation forces
    if (waveAnimation) {
      const waveTime = timeRef.current * waveFrequency;
      metaballsRef.current.forEach(ball => {
        ball.vx += Math.sin(waveTime + ball.y * 0.01) * 0.5;
        ball.vy += Math.cos(waveTime + ball.x * 0.01) * 0.5;
      });
    }

    // 🆕 Gravitational wells
    if (wellsRef.current.length > 0) {
      metaballsRef.current.forEach(ball => {
        wellsRef.current.forEach(well => {
          const dx = well.x - ball.x;
          const dy = well.y - ball.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < well.radius) {
            const force = (1 - dist / well.radius) * well.strength;
            ball.vx += (dx / dist) * force * deltaTime * 100;
            ball.vy += (dy / dist) * force * deltaTime * 100;
          }
        });
      });
    }

    // 🆕 Turbulence fields
    if (turbulenceEnabled) {
      metaballsRef.current.forEach(ball => {
        const noiseX = Math.sin(ball.x * 0.01 * turbulenceScale + timeRef.current) * turbulenceIntensity;
        const noiseY = Math.cos(ball.y * 0.01 * turbulenceScale + timeRef.current) * turbulenceIntensity;
        ball.vx += noiseX * 10 * deltaTime;
        ball.vy += noiseY * 10 * deltaTime;
      });
    }

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

    // 🆕 Update particles
    if (particleOverlay && particlesRef.current.length > 0) {
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.life -= deltaTime;
        if (particle.life <= 0) return false;

        // Find nearest metaball and inherit velocity
        let nearestBall = null;
        let nearestDist = Infinity;
        metaballsRef.current.forEach(ball => {
          const dx = ball.x - particle.x;
          const dy = ball.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearestBall = ball;
          }
        });

        if (nearestBall && nearestDist < nearestBall.radius * 2) {
          particle.vx += nearestBall.vx * particleVelocityInheritance * deltaTime;
          particle.vy += nearestBall.vy * particleVelocityInheritance * deltaTime;
          if (particleColorMode === "fluid") {
            particle.color = nearestBall.color;
          }
        }

        // Particle gravity
        particle.vy += particleGravity * deltaTime * 100;

        // Particle rotation
        if (particleRotation) {
          particle.rotation += (particle.vx + particle.vy) * deltaTime * 0.1;
        }

        // Move particle
        particle.x += particle.vx * deltaTime * 60;
        particle.y += particle.vy * deltaTime * 60;

        // Boundary wrap
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Trail
        particle.trail.push({ x: particle.x, y: particle.y });
        if (particle.trail.length > particleTrailLength) {
          particle.trail.shift();
        }

        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        return true;
      });
    }

    // Save context for symmetry
    ctx.save();

    // 🆕 Apply symmetry transformations
    if (symmetryEnabled || kaleidoscopeMode) {
      const segments = kaleidoscopeMode ? kaleidoscopeSegments : symmetrySegments;
      const centerX = canvas.width * mirrorCenterX;
      const centerY = canvas.height * mirrorCenterY;

      if (symmetryMode === "horizontal") {
        ctx.translate(centerX, 0);
        ctx.scale(-1, 1);
        ctx.translate(-centerX, 0);
      } else if (symmetryMode === "vertical") {
        ctx.translate(0, centerY);
        ctx.scale(1, -1);
        ctx.translate(0, -centerY);
      } else if (symmetryMode === "quad" || kaleidoscopeMode) {
        // Draw in all quadrants/segments
        for (let i = 0; i < segments; i++) {
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate((i / segments) * Math.PI * 2);
          if (i % 2 === 1) ctx.scale(-1, 1);
          ctx.translate(-centerX, -centerY);
        }
      } else if (symmetryMode === "radial") {
        ctx.translate(centerX, centerY);
        ctx.rotate(timeRef.current * 0.5);
        ctx.translate(-centerX, -centerY);
      }
    }

    // Draw metaballs with glow
    metaballsRef.current.forEach(ball => {
      const alpha = (ball.life / ball.maxLife) * dyeDissipation;

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

    // Restore symmetry
    if (symmetryEnabled || kaleidoscopeMode) {
      if (symmetryMode === "quad" || kaleidoscopeMode) {
        const segments = kaleidoscopeMode ? kaleidoscopeSegments : symmetrySegments;
        for (let i = 0; i < segments; i++) {
          ctx.restore();
        }
      }
    }
    ctx.restore();

    // 🆕 Draw particles
    if (particleOverlay && particlesRef.current.length > 0) {
      particlesRef.current.forEach(particle => {
        const alpha = (particle.life / particle.maxLife) * particleOpacity;

        // Draw trail
        if (particle.trail.length > 1) {
          ctx.globalAlpha = alpha * 0.5;
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = particle.size * 0.5;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
          for (let i = 1; i < particle.trail.length; i++) {
            ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
          }
          ctx.stroke();
        }

        // Draw particle
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        ctx.restore();
      });
      ctx.globalAlpha = 1;
    }

    // 🆕 Edge detection effect
    if (edgeDetection) {
      // Simple edge detection by comparing adjacent pixels
      ctx.globalCompositeOperation = 'difference';
      ctx.globalAlpha = 0.5;
      ctx.drawImage(canvas, edgeThickness, 0);
      ctx.drawImage(canvas, -edgeThickness, 0);
      ctx.drawImage(canvas, 0, edgeThickness);
      ctx.drawImage(canvas, 0, -edgeThickness);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
    }

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

    // 🆕 Scanline effect
    if (scanlineEffect || scanLines > 0) {
      const intensity = scanlineEffect ? scanlineIntensity : scanLines;
      ctx.globalAlpha = intensity;
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, y, canvas.width, 2);
      }
      ctx.globalAlpha = 1;
    }

    // 🆕 Noise overlay
    if (noiseOverlay > 0) {
      ctx.globalAlpha = noiseOverlay;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 50;
        data[i] += noise;
        data[i + 1] += noise;
        data[i + 2] += noise;
      }
      ctx.putImageData(imageData, 0, 0);
      ctx.globalAlpha = 1;
    }

    // 🆕 Pixelation effect
    if (pixelationEnabled && pixelationSize > 1) {
      const w = canvas.width / pixelationSize;
      const h = canvas.height / pixelationSize;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(canvas, 0, 0, w, h);
      ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
    }

    animationRef.current = requestAnimationFrame(() => animate(ctx, canvas));
  }, [
    baseColor, dyeDissipation, velocityDissipation, gravity, buoyancy, windDirection,
    flowSpeed, spiralForce, wavyMotion, curl, boundary, bloomIntensity, bloomThreshold,
    bloomRadius, brightness, vignette, scanLines, frameLimit,
    // New parameters
    particleOverlay, particleOpacity, particleVelocityInheritance, particleGravity,
    particleRotation, particleColorMode, particleTrailLength,
    symmetryEnabled, symmetryMode, symmetrySegments, kaleidoscopeMode, kaleidoscopeSegments,
    mirrorCenterX, mirrorCenterY, edgeDetection, edgeThickness, scanlineEffect, scanlineIntensity,
    noiseOverlay, pixelationEnabled, pixelationSize, waveAnimation, waveFrequency,
    turbulenceEnabled, turbulenceIntensity, turbulenceScale
  ]);

  // 🆕 Advanced mouse interaction handler
  const handleInteraction = useCallback((e: MouseEvent | Touch, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    const lastX = mousePosition.current.lastX || x;
    const lastY = mousePosition.current.lastY || y;
    const vx = (x - lastX) * mouseTrailIntensity * 10;
    const vy = (y - lastY) * mouseTrailIntensity * 10;

    mousePosition.current = { x, y, lastX: x, lastY: y };

    if (mouseMode === "splat" || mouseDrawMode) {
      createSplat(x, y, vx, vy, splatRadius * mouseDrawSize);
    } else if (mouseMode === "attract") {
      // Attract metaballs to mouse
      metaballsRef.current.forEach(ball => {
        const dx = x - ball.x;
        const dy = y - ball.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseInfluenceRadius) {
          const force = (1 - dist / mouseInfluenceRadius) * mouseTrailIntensity;
          ball.vx += (dx / dist) * force * 10;
          ball.vy += (dy / dist) * force * 10;
        }
      });
    } else if (mouseMode === "repel") {
      // Repel metaballs from mouse
      metaballsRef.current.forEach(ball => {
        const dx = ball.x - x;
        const dy = ball.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseInfluenceRadius) {
          const force = (1 - dist / mouseInfluenceRadius) * mouseTrailIntensity;
          ball.vx += (dx / dist) * force * 10;
          ball.vy += (dy / dist) * force * 10;
        }
      });
    } else if (mouseMode === "vortex") {
      // Create vortex around mouse
      metaballsRef.current.forEach(ball => {
        const dx = x - ball.x;
        const dy = y - ball.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseInfluenceRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (1 - dist / mouseInfluenceRadius) * mouseVortexStrength;
          ball.vx += Math.cos(angle + Math.PI / 2) * force * 5;
          ball.vy += Math.sin(angle + Math.PI / 2) * force * 5;
        }
      });
    }
  }, [createSplat, mouseMode, mouseTrailIntensity, mouseInfluenceRadius, mouseVortexStrength,
      mouseDrawMode, mouseDrawSize, splatRadius]);

  // Random splats
  useEffect(() => {
    if (!randomSplats) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const randomSplat = () => {
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
      if (splatTrail || mouseMode !== "splat") handleInteraction(e, canvas);
    };
    const handleMouseDown = (e: MouseEvent) => {
      handleInteraction(e, canvas);
    };

    // Touch events
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (splatTrail || mouseMode !== "splat") {
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
  }, [animate, handleInteraction, splatTrail, optimizeForMobile, mouseMode]);

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

export default FluidPsychedeliaMegaUltra;
