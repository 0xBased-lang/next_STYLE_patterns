/**
 * Neon Trails Animation Engine
 * Tron-style glowing light trails with grid movement
 */

import type { AnimationEngine, NeonTrailsConfig } from "../types/animation";

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

interface Runner {
  x: number;
  y: number;
  vx: number;
  vy: number;
  trail: TrailPoint[];
  nextDirectionChange: number;
}

export class NeonTrailsEngine implements AnimationEngine<NeonTrailsConfig> {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private config: NeonTrailsConfig;
  private runners: Runner[] = [];
  private animationId: number | null = null;
  private lastFrameTime: number = 0;
  private frameInterval: number = 1000 / 60;
  private gridSize: number = 20;

  constructor(config: NeonTrailsConfig) {
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
    this.initRunners();
  }

  private initRunners(): void {
    if (!this.canvas) return;

    const count = Math.min(Math.max(this.config.count, 3), 50);
    this.runners = [];

    for (let i = 0; i < count; i++) {
      this.runners.push(this.createRunner());
    }
  }

  private createRunner(): Runner {
    if (!this.canvas) {
      throw new Error("Canvas not initialized");
    }

    const speed = (this.config.speed / 100) * 3;

    // Start on grid-aligned position
    const x = Math.floor(Math.random() * (this.canvas.width / this.gridSize)) * this.gridSize;
    const y = Math.floor(Math.random() * (this.canvas.height / this.gridSize)) * this.gridSize;

    // Random cardinal direction
    const directions = [
      { vx: speed, vy: 0 },
      { vx: -speed, vy: 0 },
      { vx: 0, vy: speed },
      { vx: 0, vy: -speed },
    ];

    const direction = directions[Math.floor(Math.random() * directions.length)];

    return {
      x,
      y,
      vx: direction.vx,
      vy: direction.vy,
      trail: [],
      nextDirectionChange: Math.floor(Math.random() * 100) + 50,
    };
  }

  updateConfig(config: Partial<NeonTrailsConfig>): void {
    const oldCount = this.config.count;
    const oldFps = this.config.fps;

    this.config = { ...this.config, ...config };

    // Update frame interval if FPS changed
    if (oldFps !== this.config.fps) {
      this.frameInterval = 1000 / this.config.fps;
    }

    // Reinitialize runners if count changed
    if (Math.abs(oldCount - this.config.count) > 5) {
      this.initRunners();
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

    for (const runner of this.runners) {
      // Add current position to trail
      runner.trail.push({
        x: runner.x,
        y: runner.y,
        age: 0,
      });

      // Update trail ages and remove old points
      for (let i = runner.trail.length - 1; i >= 0; i--) {
        runner.trail[i].age++;
        if (runner.trail[i].age > this.config.trailLength) {
          runner.trail.splice(i, 1);
        }
      }

      // Move runner
      runner.x += runner.vx;
      runner.y += runner.vy;

      // Check for direction change
      runner.nextDirectionChange--;

      if (runner.nextDirectionChange <= 0 || this.shouldChangeDirection(runner)) {
        this.changeDirection(runner);
        runner.nextDirectionChange = Math.floor(Math.random() * 100) + 50;
      }

      // Wrap around edges
      if (runner.x < 0) {
        runner.x = this.canvas.width;
        runner.trail = [];
      }
      if (runner.x > this.canvas.width) {
        runner.x = 0;
        runner.trail = [];
      }
      if (runner.y < 0) {
        runner.y = this.canvas.height;
        runner.trail = [];
      }
      if (runner.y > this.canvas.height) {
        runner.y = 0;
        runner.trail = [];
      }
    }
  }

  private shouldChangeDirection(runner: Runner): boolean {
    if (!this.canvas) return false;

    // Check if approaching edge
    const margin = 100;
    if (
      runner.x < margin ||
      runner.x > this.canvas.width - margin ||
      runner.y < margin ||
      runner.y > this.canvas.height - margin
    ) {
      return Math.random() < 0.3;
    }

    return false;
  }

  private changeDirection(runner: Runner): void {
    const speed = (this.config.speed / 100) * 3;

    // Choose a new perpendicular direction
    if (runner.vx !== 0) {
      // Currently moving horizontally, switch to vertical
      runner.vx = 0;
      runner.vy = Math.random() < 0.5 ? speed : -speed;
    } else {
      // Currently moving vertically, switch to horizontal
      runner.vy = 0;
      runner.vx = Math.random() < 0.5 ? speed : -speed;
    }
  }

  private draw(): void {
    if (!this.canvas || !this.ctx) return;

    // Dark grid background
    this.ctx.fillStyle = "#0a0a1a";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw grid
    this.drawGrid();

    const r = parseInt(this.config.color.slice(1, 3), 16);
    const g = parseInt(this.config.color.slice(3, 5), 16);
    const b = parseInt(this.config.color.slice(5, 7), 16);

    // Draw trails for each runner
    for (const runner of this.runners) {
      if (runner.trail.length < 2) continue;

      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = this.config.color;
      this.ctx.strokeStyle = this.config.color;
      this.ctx.lineWidth = this.config.width;
      this.ctx.lineCap = "round";
      this.ctx.lineJoin = "round";

      for (let i = 0; i < runner.trail.length - 1; i++) {
        const point = runner.trail[i];
        const nextPoint = runner.trail[i + 1];

        // Fade trail based on age
        const alpha = 1 - point.age / this.config.trailLength;
        this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;

        this.ctx.beginPath();
        this.ctx.moveTo(point.x, point.y);
        this.ctx.lineTo(nextPoint.x, nextPoint.y);
        this.ctx.stroke();
      }

      // Draw runner head (brighter)
      this.ctx.fillStyle = this.config.color;
      this.ctx.shadowBlur = 20;
      this.ctx.beginPath();
      this.ctx.arc(runner.x, runner.y, this.config.width * 1.5, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.shadowBlur = 0;
  }

  private drawGrid(): void {
    if (!this.ctx || !this.canvas) return;

    this.ctx.strokeStyle = "rgba(100, 100, 255, 0.1)";
    this.ctx.lineWidth = 0.5;

    // Vertical lines
    for (let x = 0; x < this.canvas.width; x += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y < this.canvas.height; y += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
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

    this.initRunners();
  }

  destroy(): void {
    this.stop();
    this.runners = [];
    this.canvas = null;
    this.ctx = null;
  }
}
