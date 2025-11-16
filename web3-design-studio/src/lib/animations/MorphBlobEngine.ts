/**
 * Morph Blob Animation Engine
 * Organic shape-shifting blob with smooth morphing
 */

import type { AnimationEngine, MorphBlobConfig } from "../types/animation";

interface BlobPoint {
  baseAngle: number;
  baseRadius: number;
  targetRadius: number;
  speed: number;
}

export class MorphBlobEngine implements AnimationEngine<MorphBlobConfig> {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private config: MorphBlobConfig;
  private points: BlobPoint[] = [];
  private animationId: number | null = null;
  private lastFrameTime: number = 0;
  private frameInterval: number = 1000 / 60;
  private time: number = 0;
  private centerX: number = 0;
  private centerY: number = 0;
  private targetCenterX: number = 0;
  private targetCenterY: number = 0;
  private mousePosition: { x: number; y: number } | null = null;
  private mouseInteractionEnabled: boolean = false;

  constructor(config: MorphBlobConfig) {
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
    this.initPoints();
  }

  private initPoints(): void {
    if (!this.canvas) return;

    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.targetCenterX = this.centerX;
    this.targetCenterY = this.centerY;

    const pointCount = Math.floor(this.config.complexity);
    this.points = [];

    for (let i = 0; i < pointCount; i++) {
      const angle = (i / pointCount) * Math.PI * 2;
      this.points.push({
        baseAngle: angle,
        baseRadius: this.config.size,
        targetRadius: this.config.size + Math.random() * 50 - 25,
        speed: Math.random() * 0.02 + 0.01,
      });
    }
  }

  updateConfig(config: Partial<MorphBlobConfig>): void {
    const oldComplexity = this.config.complexity;
    const oldFps = this.config.fps;

    this.config = { ...this.config, ...config };

    // Update frame interval if FPS changed
    if (oldFps !== this.config.fps) {
      this.frameInterval = 1000 / this.config.fps;
    }

    // Reinitialize points if complexity changed
    if (Math.abs(oldComplexity - this.config.complexity) > 2) {
      this.initPoints();
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
    this.time += 0.01 * (this.config.speed / 50);

    // Update target center based on mouse position
    if (this.mouseInteractionEnabled && this.mousePosition) {
      this.targetCenterX = this.mousePosition.x;
      this.targetCenterY = this.mousePosition.y;
    } else if (this.canvas) {
      // Return to canvas center when mouse interaction is disabled
      this.targetCenterX = this.canvas.width / 2;
      this.targetCenterY = this.canvas.height / 2;
    }

    // Smoothly interpolate center position
    const lerpFactor = 0.05;
    this.centerX += (this.targetCenterX - this.centerX) * lerpFactor;
    this.centerY += (this.targetCenterY - this.centerY) * lerpFactor;

    // Update point radii for morphing effect
    for (const point of this.points) {
      const noise = Math.sin(this.time * point.speed + point.baseAngle) * 30;
      point.targetRadius = this.config.size + noise;
    }
  }

  private draw(): void {
    if (!this.canvas || !this.ctx) return;

    // Dark background
    this.ctx.fillStyle = "#0a0a1a";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Calculate blob points
    const smoothPoints: { x: number; y: number }[] = [];

    for (let i = 0; i < this.points.length; i++) {
      const point = this.points[i];
      const radius = point.targetRadius;
      const angle = point.baseAngle + this.time * 0.1;

      const x = this.centerX + Math.cos(angle) * radius;
      const y = this.centerY + Math.sin(angle) * radius;

      smoothPoints.push({ x, y });
    }

    // Draw blob with glow
    if (this.config.glow > 0) {
      this.ctx.shadowBlur = (this.config.glow / 100) * 40;
      this.ctx.shadowColor = this.config.color;
    } else {
      this.ctx.shadowBlur = 0;
    }

    // Create gradient
    const gradient = this.ctx.createRadialGradient(
      this.centerX,
      this.centerY,
      0,
      this.centerX,
      this.centerY,
      this.config.size * 1.5
    );

    const r = parseInt(this.config.color.slice(1, 3), 16);
    const g = parseInt(this.config.color.slice(3, 5), 16);
    const b = parseInt(this.config.color.slice(5, 7), 16);

    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.9)`);
    gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.6)`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.2)`);

    this.ctx.fillStyle = gradient;

    // Draw smooth blob using quadratic curves
    this.ctx.beginPath();

    for (let i = 0; i < smoothPoints.length; i++) {
      const current = smoothPoints[i];
      const next = smoothPoints[(i + 1) % smoothPoints.length];
      const nextNext = smoothPoints[(i + 2) % smoothPoints.length];

      // Calculate control point
      const cpX = (next.x + nextNext.x) / 2;
      const cpY = (next.y + nextNext.y) / 2;

      if (i === 0) {
        this.ctx.moveTo(current.x, current.y);
      }

      this.ctx.quadraticCurveTo(next.x, next.y, cpX, cpY);
    }

    this.ctx.closePath();
    this.ctx.fill();

    // Add inner highlight
    const highlightGradient = this.ctx.createRadialGradient(
      this.centerX - this.config.size * 0.2,
      this.centerY - this.config.size * 0.2,
      0,
      this.centerX,
      this.centerY,
      this.config.size * 0.8
    );

    highlightGradient.addColorStop(0, `rgba(255, 255, 255, 0.3)`);
    highlightGradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

    this.ctx.fillStyle = highlightGradient;
    this.ctx.fill();

    this.ctx.shadowBlur = 0;
  }

  resize(): void {
    if (!this.canvas) return;

    // Set canvas size to match container
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;

    if (this.ctx) {
      this.ctx.scale(dpr, dpr);
    }

    // Update canvas style size
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;

    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;

    this.initPoints();
  }

  destroy(): void {
    this.stop();
    this.points = [];
    this.canvas = null;
    this.ctx = null;
  }

  setMousePosition(x: number, y: number): void {
    if (!this.canvas) return;
    const dpr = window.devicePixelRatio || 1;
    this.mousePosition = { x: x * dpr, y: y * dpr };
  }

  setMouseInteraction(enabled: boolean): void {
    this.mouseInteractionEnabled = enabled;
    if (!enabled) {
      this.mousePosition = null;
    }
  }
}
