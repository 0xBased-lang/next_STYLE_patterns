/**
 * Matrix Animation Engine
 * High-performance Canvas-based falling character animation
 */

import type { AnimationEngine, MatrixConfig } from "../types/animation";

interface MatrixColumn {
  x: number;
  y: number;
  speed: number;
  chars: string[];
}

export class MatrixEngine implements AnimationEngine<MatrixConfig> {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private config: MatrixConfig;
  private columns: MatrixColumn[] = [];
  private animationId: number | null = null;
  private lastFrameTime: number = 0;
  private frameInterval: number = 1000 / 60;

  // Matrix characters to use
  private readonly matrixChars =
    "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  constructor(config: MatrixConfig) {
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
    this.initColumns();
  }

  private initColumns(): void {
    if (!this.canvas) return;

    const columnWidth = this.config.fontSize;
    const numColumns = Math.floor(
      (this.canvas.width / columnWidth) * (this.config.density / 100)
    );

    this.columns = [];

    for (let i = 0; i < numColumns; i++) {
      this.columns.push(this.createColumn());
    }
  }

  private createColumn(): MatrixColumn {
    if (!this.canvas) {
      throw new Error("Canvas not initialized");
    }

    const columnWidth = this.config.fontSize;
    const maxColumns = Math.floor(this.canvas.width / columnWidth);

    return {
      x: Math.floor(Math.random() * maxColumns) * columnWidth,
      y: Math.random() * this.canvas.height - this.canvas.height,
      speed: (Math.random() * 0.5 + 0.5) * (this.config.speed / 50),
      chars: Array(30)
        .fill(0)
        .map(() => this.getRandomChar()),
    };
  }

  private getRandomChar(): string {
    return this.matrixChars[
      Math.floor(Math.random() * this.matrixChars.length)
    ];
  }

  updateConfig(config: Partial<MatrixConfig>): void {
    const oldDensity = this.config.density;
    const oldFontSize = this.config.fontSize;
    const oldFps = this.config.fps;

    this.config = { ...this.config, ...config };

    // Update frame interval if FPS changed
    if (oldFps !== this.config.fps) {
      this.frameInterval = 1000 / this.config.fps;
    }

    // Reinitialize columns if density or fontSize changed
    if (oldDensity !== this.config.density || oldFontSize !== this.config.fontSize) {
      this.initColumns();
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

    this.draw();
    this.update();
  };

  private draw(): void {
    if (!this.canvas || !this.ctx) return;

    // Fade effect (creates trail)
    this.ctx.fillStyle = "rgba(10, 14, 10, 0.05)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Set font
    this.ctx.font = `${this.config.fontSize}px monospace`;
    this.ctx.fillStyle = this.config.color;

    // Apply glow if enabled
    if (this.config.glow > 0) {
      const glowAmount = (this.config.glow / 100) * 20;
      this.ctx.shadowBlur = glowAmount;
      this.ctx.shadowColor = this.config.color;
    } else {
      this.ctx.shadowBlur = 0;
    }

    // Draw columns
    for (const column of this.columns) {
      for (let i = 0; i < column.chars.length; i++) {
        const char = column.chars[i];
        const y = column.y + i * this.config.fontSize;

        // Skip if outside canvas
        if (y < 0 || y > this.canvas.height) continue;

        // Fade characters as they go down (head is brighter)
        const alpha = 1 - i / column.chars.length;
        const r = parseInt(this.config.color.slice(1, 3), 16);
        const g = parseInt(this.config.color.slice(3, 5), 16);
        const b = parseInt(this.config.color.slice(5, 7), 16);

        this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;

        this.ctx.fillText(char, column.x, y);
      }
    }
  }

  private update(): void {
    if (!this.canvas) return;

    for (let i = 0; i < this.columns.length; i++) {
      const column = this.columns[i];

      // Move column down
      column.y += column.speed;

      // Randomly change characters
      if (Math.random() < 0.05) {
        const charIndex = Math.floor(Math.random() * column.chars.length);
        column.chars[charIndex] = this.getRandomChar();
      }

      // Reset column if it's off screen
      if (column.y - column.chars.length * this.config.fontSize > this.canvas.height) {
        this.columns[i] = this.createColumn();
      }
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

    this.initColumns();
  }

  destroy(): void {
    this.stop();
    this.columns = [];
    this.canvas = null;
    this.ctx = null;
  }
}
