/**
 * Tessellation Animation Engine
 * Generates animated Voronoi diagrams and geometric patterns
 */

import type { AnimationEngine } from "../types/animation";

export interface TessellationConfig {
  speed: number; // Animation speed (0.1-2.0)
  color1: string; // Primary cell color
  color2: string; // Secondary cell color
  cellCount: number; // Number of cells (10-100)
  cellMovement: number; // Cell movement speed (0-100)
  borderWidth: number; // Border thickness (0-10)
  borderColor: string; // Border color
  colorVariation: number; // Color variation (0-100)
  fps: number; // Target FPS (30-60)
}

interface Cell {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

export class TessellationEngine implements AnimationEngine<TessellationConfig> {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private config: TessellationConfig;
  private animationId: number | null = null;
  private lastFrameTime: number = 0;
  private frameInterval: number = 1000 / 60;
  private cells: Cell[] = [];
  private imageData: ImageData | null = null;

  constructor(config: TessellationConfig) {
    this.config = config;
    this.frameInterval = 1000 / config.fps;
  }

  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) {
      throw new Error("Could not get 2D context");
    }
    this.ctx = ctx;
    this.resize();
    this.generateCells();
  }

  updateConfig(config: Partial<TessellationConfig>): void {
    this.config = { ...this.config, ...config };
    this.frameInterval = 1000 / this.config.fps;

    // Regenerate cells if cell count changed
    if (config.cellCount !== undefined && config.cellCount !== this.cells.length) {
      this.generateCells();
    } else {
      // Update cell colors
      this.updateCellColors();
    }
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
      this.imageData = this.ctx.createImageData(
        this.canvas.width,
        this.canvas.height
      );
    }

    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;

    this.generateCells();
  }

  destroy(): void {
    this.stop();
    this.canvas = null;
    this.ctx = null;
  }

  private generateCells(): void {
    if (!this.canvas) return;

    const width = this.canvas.getBoundingClientRect().width;
    const height = this.canvas.getBoundingClientRect().height;

    this.cells = [];

    for (let i = 0; i < this.config.cellCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;

      // Random velocity
      const angle = Math.random() * Math.PI * 2;
      const speed = this.config.cellMovement * 0.02;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      // Generate color
      const color = this.generateCellColor(i);

      this.cells.push({ x, y, vx, vy, color });
    }
  }

  private updateCellColors(): void {
    this.cells.forEach((cell, i) => {
      cell.color = this.generateCellColor(i);
    });
  }

  private generateCellColor(index: number): string {
    const { color1, color2, colorVariation } = this.config;

    const c1 = this.hexToRgb(color1);
    const c2 = this.hexToRgb(color2);

    // Interpolate between two colors
    const t = (index / this.config.cellCount + Math.random() * (colorVariation / 100)) % 1;

    const r = Math.floor(c1.r + (c2.r - c1.r) * t);
    const g = Math.floor(c1.g + (c2.g - c1.g) * t);
    const b = Math.floor(c1.b + (c2.b - c1.b) * t);

    return `rgb(${r}, ${g}, ${b})`;
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  }

  private animate = (currentTime: number): void => {
    this.animationId = requestAnimationFrame(this.animate);

    const deltaTime = currentTime - this.lastFrameTime;

    if (deltaTime < this.frameInterval) {
      return;
    }

    this.lastFrameTime = currentTime - (deltaTime % this.frameInterval);

    this.update();
    this.draw();
  };

  private update(): void {
    if (!this.canvas) return;

    const width = this.canvas.getBoundingClientRect().width;
    const height = this.canvas.getBoundingClientRect().height;

    // Update cell positions
    this.cells.forEach((cell) => {
      cell.x += cell.vx * this.config.speed;
      cell.y += cell.vy * this.config.speed;

      // Bounce off edges
      if (cell.x < 0 || cell.x > width) {
        cell.vx *= -1;
        cell.x = Math.max(0, Math.min(width, cell.x));
      }
      if (cell.y < 0 || cell.y > height) {
        cell.vy *= -1;
        cell.y = Math.max(0, Math.min(height, cell.y));
      }
    });
  }

  private draw(): void {
    if (!this.canvas || !this.ctx || !this.imageData) return;

    const width = this.canvas.width;
    const height = this.canvas.height;
    const data = this.imageData.data;

    const displayWidth = this.canvas.getBoundingClientRect().width;
    const displayHeight = this.canvas.getBoundingClientRect().height;
    const dpr = window.devicePixelRatio || 1;

    // For each pixel, find the closest cell
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const pixelX = x / dpr;
        const pixelY = y / dpr;

        let closestDist = Infinity;
        let closestCell: Cell | null = null;
        let secondClosestDist = Infinity;

        // Find closest and second closest cells
        for (const cell of this.cells) {
          const dx = pixelX - cell.x;
          const dy = pixelY - cell.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < closestDist) {
            secondClosestDist = closestDist;
            closestDist = dist;
            closestCell = cell;
          } else if (dist < secondClosestDist) {
            secondClosestDist = dist;
          }
        }

        const pixelIndex = (y * width + x) * 4;

        if (closestCell) {
          const color = this.hexToRgb(closestCell.color);

          // Draw border if close to edge
          const edgeDistance = secondClosestDist - closestDist;
          const isBorder = edgeDistance < this.config.borderWidth;

          if (isBorder && this.config.borderWidth > 0) {
            const borderColor = this.hexToRgb(this.config.borderColor);
            data[pixelIndex] = borderColor.r;
            data[pixelIndex + 1] = borderColor.g;
            data[pixelIndex + 2] = borderColor.b;
          } else {
            data[pixelIndex] = color.r;
            data[pixelIndex + 1] = color.g;
            data[pixelIndex + 2] = color.b;
          }

          data[pixelIndex + 3] = 255; // Alpha
        }
      }
    }

    this.ctx.putImageData(this.imageData, 0, 0);
  }
}
