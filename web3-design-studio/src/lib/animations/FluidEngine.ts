/**
 * Fluid Animation Engine
 * Metaball-based fluid dynamics with organic flowing shapes
 */

import type { AnimationEngine, FluidConfig } from "../types/animation";

interface FluidBlob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
}

export class FluidEngine implements AnimationEngine<FluidConfig> {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private config: FluidConfig;
  private blobs: FluidBlob[] = [];
  private animationId: number | null = null;
  private lastFrameTime: number = 0;
  private frameInterval: number = 1000 / 60;
  private time: number = 0;

  constructor(config: FluidConfig) {
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
    this.initBlobs();
  }

  private initBlobs(): void {
    if (!this.canvas) return;

    const blobCount = Math.floor((this.config.complexity / 100) * 15) + 3;
    this.blobs = [];

    for (let i = 0; i < blobCount; i++) {
      this.blobs.push(this.createBlob());
    }
  }

  private createBlob(): FluidBlob {
    if (!this.canvas) {
      throw new Error("Canvas not initialized");
    }

    const speed = (this.config.speed / 100) * 2;

    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      radius: (Math.random() * 80 + 40) * (this.canvas.width / 1920),
      phase: Math.random() * Math.PI * 2,
    };
  }

  updateConfig(config: Partial<FluidConfig>): void {
    const oldComplexity = this.config.complexity;
    const oldFps = this.config.fps;

    this.config = { ...this.config, ...config };

    // Update frame interval if FPS changed
    if (oldFps !== this.config.fps) {
      this.frameInterval = 1000 / this.config.fps;
    }

    // Reinitialize blobs if complexity changed significantly
    if (Math.abs(oldComplexity - this.config.complexity) > 10) {
      this.initBlobs();
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
    if (!this.canvas) return;

    this.time += 0.01 * (this.config.speed / 50);

    for (const blob of this.blobs) {
      // Update position
      blob.x += blob.vx;
      blob.y += blob.vy;

      // Add some organic movement
      blob.x += Math.sin(this.time + blob.phase) * 0.5;
      blob.y += Math.cos(this.time + blob.phase * 1.3) * 0.5;

      // Bounce off edges
      if (blob.x < -blob.radius) blob.x = this.canvas.width + blob.radius;
      if (blob.x > this.canvas.width + blob.radius) blob.x = -blob.radius;
      if (blob.y < -blob.radius) blob.y = this.canvas.height + blob.radius;
      if (blob.y > this.canvas.height + blob.radius) blob.y = -blob.radius;

      // Occasionally change direction slightly
      if (Math.random() < 0.01) {
        const speed = (this.config.speed / 100) * 2;
        blob.vx += (Math.random() - 0.5) * 0.2 * speed;
        blob.vy += (Math.random() - 0.5) * 0.2 * speed;

        // Clamp velocity
        const maxSpeed = speed * 1.5;
        const currentSpeed = Math.sqrt(blob.vx ** 2 + blob.vy ** 2);
        if (currentSpeed > maxSpeed) {
          blob.vx = (blob.vx / currentSpeed) * maxSpeed;
          blob.vy = (blob.vy / currentSpeed) * maxSpeed;
        }
      }
    }
  }

  private draw(): void {
    if (!this.canvas || !this.ctx) return;

    // Clear canvas
    this.ctx.fillStyle = "#0d0221";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Apply blur if needed
    if (this.config.blur > 0) {
      this.ctx.filter = `blur(${this.config.blur}px)`;
    } else {
      this.ctx.filter = "none";
    }

    // Create gradient for blobs
    const gradient = this.ctx.createRadialGradient(
      this.canvas.width / 2,
      this.canvas.height / 2,
      0,
      this.canvas.width / 2,
      this.canvas.height / 2,
      Math.max(this.canvas.width, this.canvas.height) / 2
    );
    gradient.addColorStop(0, this.config.color1);
    gradient.addColorStop(1, this.config.color2);

    // Draw metaballs using radial gradients
    this.ctx.globalCompositeOperation = "lighter";

    for (const blob of this.blobs) {
      const blobGradient = this.ctx.createRadialGradient(
        blob.x,
        blob.y,
        0,
        blob.x,
        blob.y,
        blob.radius
      );

      // Animate between colors
      const t = (Math.sin(this.time * 0.5 + blob.phase) + 1) / 2;
      const color = this.interpolateColor(this.config.color1, this.config.color2, t);

      blobGradient.addColorStop(0, color);
      blobGradient.addColorStop(0.5, this.addAlpha(color, 0.5));
      blobGradient.addColorStop(1, this.addAlpha(color, 0));

      this.ctx.fillStyle = blobGradient;
      this.ctx.beginPath();
      this.ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Reset composite operation
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.filter = "none";
  }

  private interpolateColor(color1: string, color2: string, t: number): string {
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);

    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);

    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);

    return `rgb(${r}, ${g}, ${b})`;
  }

  private addAlpha(color: string, alpha: number): string {
    if (color.startsWith("#")) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    // Assume rgb format
    return color.replace("rgb", "rgba").replace(")", `, ${alpha})`);
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

    this.initBlobs();
  }

  destroy(): void {
    this.stop();
    this.blobs = [];
    this.canvas = null;
    this.ctx = null;
  }
}
