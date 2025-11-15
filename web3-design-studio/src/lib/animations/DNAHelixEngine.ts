/**
 * DNA Helix Animation Engine
 * Rotating double helix with glowing base pairs
 */

import type { AnimationEngine, DNAHelixConfig } from "../types/animation";

interface HelixPoint {
  angle: number;
  y: number;
  z: number; // Depth for 3D effect
}

interface BasePair {
  point1: HelixPoint;
  point2: HelixPoint;
  type: number; // 0-3 for A-T, G-C, etc.
}

export class DNAHelixEngine implements AnimationEngine<DNAHelixConfig> {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private config: DNAHelixConfig;
  private animationId: number | null = null;
  private lastFrameTime: number = 0;
  private frameInterval: number = 1000 / 60;
  private rotation: number = 0;

  // Base pair colors (A-T, G-C pairs)
  private readonly basePairColors = ["#ff6b9d", "#c44569", "#4a69bd", "#0c2461"];

  constructor(config: DNAHelixConfig) {
    this.config = { ...config };
    this.frameInterval = 1000 / this.config.fps;
  }

  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: false });

    if (!this.ctx) {
      throw new Error("Failed to get canvas 2D context");
    }

    this.resize();
  }

  updateConfig(config: Partial<DNAHelixConfig>): void {
    const oldFps = this.config.fps;
    this.config = { ...this.config, ...config };

    // Update frame interval if FPS changed
    if (oldFps !== this.config.fps) {
      this.frameInterval = 1000 / this.config.fps;
    }
  }

  start(): void {
    if (this.animationId !== null) return;

    this.lastFrameTime = performance.now();
    this.animate(this.lastFrameTime);
  }

  stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  resize(): void {
    if (!this.canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;

    if (this.ctx) {
      this.ctx.scale(dpr, dpr);
    }
  }

  destroy(): void {
    this.stop();
    this.canvas = null;
    this.ctx = null;
  }

  private animate = (currentTime: number): void => {
    this.animationId = requestAnimationFrame(this.animate);

    // FPS throttling
    const elapsed = currentTime - this.lastFrameTime;
    if (elapsed < this.frameInterval) return;

    this.lastFrameTime = currentTime - (elapsed % this.frameInterval);

    this.update();
    this.draw();
  };

  private update(): void {
    // Update rotation based on speed
    this.rotation += (this.config.speed / 1000) * 0.5;
    if (this.rotation > Math.PI * 2) {
      this.rotation -= Math.PI * 2;
    }
  }

  private draw(): void {
    if (!this.canvas || !this.ctx) return;

    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear canvas
    this.ctx.fillStyle = "rgba(10, 14, 10, 1)";
    this.ctx.fillRect(0, 0, width, height);

    // Calculate helix parameters
    const helixRadius = this.config.helixRadius;
    const helixHeight = Math.min(height * 0.8, 600);
    const turns = this.config.turns;
    const segments = Math.floor(this.config.segments);

    // Generate base pairs
    const basePairs: BasePair[] = [];

    for (let i = 0; i < segments; i++) {
      const t = i / segments;
      const y = centerY - helixHeight / 2 + t * helixHeight;
      const angle = t * turns * Math.PI * 2 + this.rotation;

      // First strand (right helix)
      const x1 = centerX + Math.cos(angle) * helixRadius;
      const z1 = Math.sin(angle) * helixRadius;

      // Second strand (left helix, 180° offset)
      const angle2 = angle + Math.PI;
      const x2 = centerX + Math.cos(angle2) * helixRadius;
      const z2 = Math.sin(angle2) * helixRadius;

      basePairs.push({
        point1: { angle, y, z: z1 },
        point2: { angle: angle2, y, z: z2 },
        type: Math.floor(Math.random() * 4),
      });
    }

    // Sort by depth (z) for proper rendering
    basePairs.sort((a, b) => (a.point1.z + a.point2.z) - (b.point1.z + b.point2.z));

    // Draw base pairs (connecting lines)
    for (const pair of basePairs) {
      const x1 = centerX + Math.cos(pair.point1.angle) * helixRadius;
      const x2 = centerX + Math.cos(pair.point2.angle) * helixRadius;
      const y = pair.point1.y;

      // Depth-based opacity
      const depth = (pair.point1.z + pair.point2.z) / 2;
      const opacity = 0.3 + (depth / helixRadius) * 0.4;

      // Draw connecting line (base pair)
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y);
      this.ctx.lineTo(x2, y);
      this.ctx.strokeStyle = this.hexToRGBA(
        this.basePairColors[pair.type],
        opacity * (this.config.glowIntensity / 100)
      );
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      // Draw base pair nodes with glow
      if (this.config.glowIntensity > 0) {
        const glowAmount = (this.config.glowIntensity / 100) * 15;
        this.ctx.shadowBlur = glowAmount;
        this.ctx.shadowColor = this.basePairColors[pair.type];
      }

      this.ctx.fillStyle = this.hexToRGBA(this.basePairColors[pair.type], opacity);
      this.ctx.beginPath();
      this.ctx.arc(x1, y, 3, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.arc(x2, y, 3, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.shadowBlur = 0;
    }

    // Draw helix strands
    this.drawHelixStrand(basePairs, centerX, helixRadius, 0, this.config.color1);
    this.drawHelixStrand(basePairs, centerX, helixRadius, Math.PI, this.config.color2);
  }

  private drawHelixStrand(
    basePairs: BasePair[],
    centerX: number,
    helixRadius: number,
    angleOffset: number,
    color: string
  ): void {
    if (!this.ctx) return;

    this.ctx.beginPath();
    let started = false;

    // Sort by y position for smooth line
    const sortedPairs = [...basePairs].sort((a, b) => a.point1.y - b.point1.y);

    for (const pair of sortedPairs) {
      const point = angleOffset === 0 ? pair.point1 : pair.point2;
      const x = centerX + Math.cos(point.angle) * helixRadius;
      const y = point.y;

      // Depth-based opacity
      const opacity = 0.5 + (point.z / helixRadius) * 0.5;

      if (!started) {
        this.ctx.moveTo(x, y);
        started = true;
      } else {
        this.ctx.lineTo(x, y);
      }
    }

    // Glow effect
    if (this.config.glowIntensity > 0) {
      const glowAmount = (this.config.glowIntensity / 100) * 20;
      this.ctx.shadowBlur = glowAmount;
      this.ctx.shadowColor = color;
    }

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.ctx.stroke();

    this.ctx.shadowBlur = 0;
  }

  private hexToRGBA(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
