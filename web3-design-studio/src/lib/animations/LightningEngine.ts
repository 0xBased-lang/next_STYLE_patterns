/**
 * Lightning Animation Engine
 * Generates electric lightning bolts with recursive branching
 */

import type { AnimationEngine } from "../types/animation";

export interface LightningConfig {
  speed: number; // Animation speed (0.1-2.0)
  color1: string; // Primary lightning color
  color2: string; // Secondary glow color
  boltCount: number; // Number of lightning bolts (1-10)
  branchProbability: number; // Branch chance (0-100)
  thickness: number; // Bolt thickness (1-10)
  glowIntensity: number; // Glow strength (0-100)
  segments: number; // Segments per bolt (10-100)
  fps: number; // Target FPS (30-60)
}

interface Point {
  x: number;
  y: number;
}

interface LightningBolt {
  startPoint: Point;
  endPoint: Point;
  segments: Point[];
  branches: LightningBolt[];
  lifetime: number;
  maxLifetime: number;
}

export class LightningEngine implements AnimationEngine<LightningConfig> {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private config: LightningConfig;
  private animationId: number | null = null;
  private lastFrameTime: number = 0;
  private frameInterval: number = 1000 / 60;
  private bolts: LightningBolt[] = [];

  constructor(config: LightningConfig) {
    this.config = config;
    this.frameInterval = 1000 / config.fps;
  }

  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) {
      throw new Error("Could not get 2D context");
    }
    this.ctx = ctx;
    this.resize();
    this.generateBolts();
  }

  updateConfig(config: Partial<LightningConfig>): void {
    this.config = { ...this.config, ...config };
    this.frameInterval = 1000 / this.config.fps;
  }

  start(): void {
    if (this.animationId === null) {
      this.lastFrameTime = performance.now();
      this.animate(this.lastFrameTime);
    }
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

    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;

    this.generateBolts();
  }

  destroy(): void {
    this.stop();
    this.canvas = null;
    this.ctx = null;
  }

  private generateBolts(): void {
    if (!this.canvas) return;

    this.bolts = [];

    const width = this.canvas.getBoundingClientRect().width;
    const height = this.canvas.getBoundingClientRect().height;

    for (let i = 0; i < this.config.boltCount; i++) {
      // Random start point (top of screen)
      const startX = Math.random() * width;
      const startY = 0;

      // Random end point (bottom of screen)
      const endX = startX + (Math.random() - 0.5) * width * 0.3;
      const endY = height;

      const bolt = this.createBolt(
        { x: startX, y: startY },
        { x: endX, y: endY },
        0
      );

      this.bolts.push(bolt);
    }
  }

  private createBolt(
    start: Point,
    end: Point,
    depth: number
  ): LightningBolt {
    const segments: Point[] = [start];
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const numSegments = this.config.segments;

    // Generate jagged path
    for (let i = 1; i < numSegments; i++) {
      const t = i / numSegments;
      const baseX = start.x + dx * t;
      const baseY = start.y + dy * t;

      // Add randomness perpendicular to the bolt direction
      const angle = Math.atan2(dy, dx) + Math.PI / 2;
      const offset = (Math.random() - 0.5) * 50 * (1 - t);

      const x = baseX + Math.cos(angle) * offset;
      const y = baseY + Math.sin(angle) * offset;

      segments.push({ x, y });
    }

    segments.push(end);

    // Create branches
    const branches: LightningBolt[] = [];
    const maxDepth = 3;

    if (depth < maxDepth && Math.random() * 100 < this.config.branchProbability) {
      const numBranches = 1 + Math.floor(Math.random() * 2);

      for (let i = 0; i < numBranches; i++) {
        // Branch from a random segment
        const branchIndex = Math.floor(Math.random() * segments.length * 0.7);
        const branchStart = segments[branchIndex];

        // Branch endpoint
        const branchLength = Math.sqrt(dx * dx + dy * dy) * (0.3 + Math.random() * 0.4);
        const branchAngle = Math.atan2(dy, dx) + (Math.random() - 0.5) * Math.PI;

        const branchEnd = {
          x: branchStart.x + Math.cos(branchAngle) * branchLength,
          y: branchStart.y + Math.sin(branchAngle) * branchLength,
        };

        const branch = this.createBolt(branchStart, branchEnd, depth + 1);
        branches.push(branch);
      }
    }

    return {
      startPoint: start,
      endPoint: end,
      segments,
      branches,
      lifetime: 0,
      maxLifetime: 0.1 + Math.random() * 0.15, // Random lifetime between 0.1-0.25s
    };
  }

  private animate = (currentTime: number): void => {
    this.animationId = requestAnimationFrame(this.animate);

    const deltaTime = currentTime - this.lastFrameTime;

    if (deltaTime < this.frameInterval) {
      return;
    }

    this.lastFrameTime = currentTime - (deltaTime % this.frameInterval);

    this.update(deltaTime / 1000);
    this.draw();
  };

  private update(deltaTime: number): void {
    // Update bolt lifetimes
    this.bolts.forEach((bolt) => {
      this.updateBoltLifetime(bolt, deltaTime * this.config.speed);
    });

    // Regenerate bolts that have expired
    this.bolts = this.bolts.filter((bolt) => {
      if (bolt.lifetime >= bolt.maxLifetime) {
        // Regenerate this bolt
        const width = this.canvas!.getBoundingClientRect().width;
        const height = this.canvas!.getBoundingClientRect().height;

        const startX = Math.random() * width;
        const startY = 0;
        const endX = startX + (Math.random() - 0.5) * width * 0.3;
        const endY = height;

        const newBolt = this.createBolt(
          { x: startX, y: startY },
          { x: endX, y: endY },
          0
        );

        this.bolts.push(newBolt);
        return false;
      }
      return true;
    });
  }

  private updateBoltLifetime(bolt: LightningBolt, deltaTime: number): void {
    bolt.lifetime += deltaTime;
    bolt.branches.forEach((branch) => this.updateBoltLifetime(branch, deltaTime));
  }

  private draw(): void {
    if (!this.canvas || !this.ctx) return;

    const width = this.canvas.getBoundingClientRect().width;
    const height = this.canvas.getBoundingClientRect().height;

    // Clear canvas
    this.ctx.clearRect(0, 0, width, height);

    // Draw all bolts
    this.bolts.forEach((bolt) => {
      this.drawBolt(bolt);
    });
  }

  private drawBolt(bolt: LightningBolt): void {
    if (!this.ctx) return;

    // Calculate alpha based on lifetime
    const alpha = 1 - bolt.lifetime / bolt.maxLifetime;

    if (alpha <= 0) return;

    // Draw glow
    if (this.config.glowIntensity > 0) {
      this.ctx.shadowBlur = this.config.glowIntensity * 0.5;
      this.ctx.shadowColor = this.config.color2;
      this.ctx.strokeStyle = this.config.color2;
      this.ctx.lineWidth = this.config.thickness * 3;
      this.ctx.globalAlpha = alpha * 0.3;

      this.ctx.beginPath();
      this.ctx.moveTo(bolt.segments[0].x, bolt.segments[0].y);
      for (let i = 1; i < bolt.segments.length; i++) {
        this.ctx.lineTo(bolt.segments[i].x, bolt.segments[i].y);
      }
      this.ctx.stroke();
    }

    // Draw main bolt
    this.ctx.shadowBlur = this.config.glowIntensity * 0.2;
    this.ctx.shadowColor = this.config.color1;
    this.ctx.strokeStyle = this.config.color1;
    this.ctx.lineWidth = this.config.thickness;
    this.ctx.globalAlpha = alpha;

    this.ctx.beginPath();
    this.ctx.moveTo(bolt.segments[0].x, bolt.segments[0].y);
    for (let i = 1; i < bolt.segments.length; i++) {
      this.ctx.lineTo(bolt.segments[i].x, bolt.segments[i].y);
    }
    this.ctx.stroke();

    // Reset shadow
    this.ctx.shadowBlur = 0;
    this.ctx.globalAlpha = 1;

    // Draw branches
    bolt.branches.forEach((branch) => this.drawBolt(branch));
  }
}
