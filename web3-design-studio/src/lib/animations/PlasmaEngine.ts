/**
 * Plasma Animation Engine
 * Classic demo-scene plasma effect with color cycling
 */

import type { AnimationEngine, PlasmaConfig } from "../types/animation";

export class PlasmaEngine implements AnimationEngine<PlasmaConfig> {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private config: PlasmaConfig;
  private animationId: number | null = null;
  private lastFrameTime: number = 0;
  private frameInterval: number = 1000 / 60;
  private time: number = 0;
  private colorPalette: string[] = [];

  constructor(config: PlasmaConfig) {
    this.config = { ...config };
    this.frameInterval = 1000 / this.config.fps;
    this.generateColorPalette();
  }

  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: false });

    if (!this.ctx) {
      throw new Error("Failed to get canvas 2D context");
    }

    this.resize();
  }

  private generateColorPalette(): void {
    // Generate 256 color palette
    this.colorPalette = [];

    const r1 = parseInt(this.config.color1.slice(1, 3), 16);
    const g1 = parseInt(this.config.color1.slice(3, 5), 16);
    const b1 = parseInt(this.config.color1.slice(5, 7), 16);

    const r2 = parseInt(this.config.color2.slice(1, 3), 16);
    const g2 = parseInt(this.config.color2.slice(3, 5), 16);
    const b2 = parseInt(this.config.color2.slice(5, 7), 16);

    const r3 = parseInt(this.config.color3.slice(1, 3), 16);
    const g3 = parseInt(this.config.color3.slice(3, 5), 16);
    const b3 = parseInt(this.config.color3.slice(5, 7), 16);

    for (let i = 0; i < 256; i++) {
      const t = i / 255;

      let r, g, b;

      if (t < 0.5) {
        // Transition from color1 to color2
        const t2 = t * 2;
        r = Math.floor(r1 + (r2 - r1) * t2);
        g = Math.floor(g1 + (g2 - g1) * t2);
        b = Math.floor(b1 + (b2 - b1) * t2);
      } else {
        // Transition from color2 to color3
        const t2 = (t - 0.5) * 2;
        r = Math.floor(r2 + (r3 - r2) * t2);
        g = Math.floor(g2 + (g3 - g2) * t2);
        b = Math.floor(b2 + (b3 - b2) * t2);
      }

      this.colorPalette.push(`rgb(${r}, ${g}, ${b})`);
    }
  }

  updateConfig(config: Partial<PlasmaConfig>): void {
    const oldFps = this.config.fps;
    const oldColor1 = this.config.color1;
    const oldColor2 = this.config.color2;
    const oldColor3 = this.config.color3;

    this.config = { ...this.config, ...config };

    // Update frame interval if FPS changed
    if (oldFps !== this.config.fps) {
      this.frameInterval = 1000 / this.config.fps;
    }

    // Regenerate palette if colors changed
    if (
      oldColor1 !== this.config.color1 ||
      oldColor2 !== this.config.color2 ||
      oldColor3 !== this.config.color3
    ) {
      this.generateColorPalette();
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
    // Update time based on speed
    this.time += (this.config.speed / 1000) * 0.05;
  }

  private draw(): void {
    if (!this.canvas || !this.ctx) return;

    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Adjust resolution for performance
    const resolution = Math.max(2, 8 - this.config.complexity / 20);
    const scale = this.config.scale / 100;

    // Classic plasma algorithm using sine waves
    for (let x = 0; x < width; x += resolution) {
      for (let y = 0; y < height; y += resolution) {
        // Multiple sine wave combinations for plasma effect
        const value =
          Math.sin((x * scale + this.time) / 16) +
          Math.sin((y * scale + this.time) / 8) +
          Math.sin(((x * scale + y * scale + this.time) / 16) * scale) +
          Math.sin((Math.sqrt(x * x * scale + y * y * scale + this.time) / 8) * scale);

        // Normalize to 0-255 range
        const colorIndex = Math.floor(((value + 4) / 8) * 255) % 256;

        // Apply intensity
        const intensity = this.config.intensity / 100;
        let color = this.colorPalette[colorIndex];

        // Adjust intensity if needed
        if (intensity < 1) {
          const rgb = color.match(/\d+/g);
          if (rgb) {
            const r = Math.floor(parseInt(rgb[0]) * intensity);
            const g = Math.floor(parseInt(rgb[1]) * intensity);
            const b = Math.floor(parseInt(rgb[2]) * intensity);
            color = `rgb(${r}, ${g}, ${b})`;
          }
        }

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, resolution, resolution);
      }
    }

    // Optional blur effect for smoother plasma
    if (this.config.complexity > 50) {
      this.ctx.filter = "blur(1px)";
      this.ctx.drawImage(this.canvas, 0, 0, width, height);
      this.ctx.filter = "none";
    }
  }
}
