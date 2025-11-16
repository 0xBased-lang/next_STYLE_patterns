/**
 * Fractal Animation Engine
 * Renders Mandelbrot and Julia sets with zoom and color animation
 */

import type { AnimationEngine } from "../types/animation";

export interface FractalConfig {
  speed: number; // Animation speed (0.1-2.0)
  color1: string; // Start color for gradient
  color2: string; // Mid color for gradient
  color3: string; // End color for gradient
  fractalType: "mandelbrot" | "julia"; // Fractal type
  maxIterations: number; // Detail level (50-500)
  zoom: number; // Zoom level (1-1000)
  centerX: number; // Center X coordinate (-2 to 2)
  centerY: number; // Center Y coordinate (-2 to 2)
  colorShift: number; // Color animation speed (0-100)
  fps: number; // Target FPS (30-60)
}

export class FractalEngine implements AnimationEngine<FractalConfig> {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private config: FractalConfig;
  private animationId: number | null = null;
  private lastFrameTime: number = 0;
  private frameInterval: number = 1000 / 60;
  private colorPalette: string[] = [];
  private timeOffset: number = 0;
  private mousePosition: { x: number; y: number } | null = null;
  private mouseInteractionEnabled: boolean = false;
  private currentCenterX: number = 0;
  private currentCenterY: number = 0;

  constructor(config: FractalConfig) {
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
    this.currentCenterX = this.config.centerX;
    this.currentCenterY = this.config.centerY;
    this.resize();
    this.generateColorPalette();
  }

  updateConfig(config: Partial<FractalConfig>): void {
    this.config = { ...this.config, ...config };
    this.frameInterval = 1000 / this.config.fps;
    this.generateColorPalette();
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
  }

  destroy(): void {
    this.stop();
    this.canvas = null;
    this.ctx = null;
  }

  private generateColorPalette(): void {
    const { color1, color2, color3, maxIterations } = this.config;

    // Parse colors
    const c1 = this.hexToRgb(color1);
    const c2 = this.hexToRgb(color2);
    const c3 = this.hexToRgb(color3);

    this.colorPalette = [];

    for (let i = 0; i < maxIterations; i++) {
      const t = i / maxIterations;

      let r: number, g: number, b: number;

      if (t < 0.5) {
        // Transition color1 to color2
        const t2 = t * 2;
        r = Math.floor(c1.r + (c2.r - c1.r) * t2);
        g = Math.floor(c1.g + (c2.g - c1.g) * t2);
        b = Math.floor(c1.b + (c2.b - c1.b) * t2);
      } else {
        // Transition color2 to color3
        const t2 = (t - 0.5) * 2;
        r = Math.floor(c2.r + (c3.r - c2.r) * t2);
        g = Math.floor(c2.g + (c3.g - c2.g) * t2);
        b = Math.floor(c2.b + (c3.b - c2.b) * t2);
      }

      this.colorPalette.push(`rgb(${r}, ${g}, ${b})`);
    }
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
    // Animate color shift
    this.timeOffset += this.config.speed * (this.config.colorShift / 100) * 0.1;

    // Update fractal center to follow mouse
    if (this.mouseInteractionEnabled && this.mousePosition && this.canvas) {
      const rect = this.canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Map mouse position to complex plane
      const aspectRatio = width / height;
      const viewHeight = 4 / this.config.zoom;
      const viewWidth = viewHeight * aspectRatio;

      const minRe = this.currentCenterX - viewWidth / 2;
      const maxRe = this.currentCenterX + viewWidth / 2;
      const minIm = this.currentCenterY - viewHeight / 2;
      const maxIm = this.currentCenterY + viewHeight / 2;

      const mouseX = this.mousePosition.x / (window.devicePixelRatio || 1);
      const mouseY = this.mousePosition.y / (window.devicePixelRatio || 1);

      const targetCenterX = minRe + (mouseX / width) * (maxRe - minRe);
      const targetCenterY = minIm + (mouseY / height) * (maxIm - minIm);

      // Smoothly interpolate to target
      const lerpFactor = 0.05;
      this.currentCenterX += (targetCenterX - this.currentCenterX) * lerpFactor;
      this.currentCenterY += (targetCenterY - this.currentCenterY) * lerpFactor;
    } else {
      // Return to config center when mouse interaction is disabled
      const lerpFactor = 0.05;
      this.currentCenterX += (this.config.centerX - this.currentCenterX) * lerpFactor;
      this.currentCenterY += (this.config.centerY - this.currentCenterY) * lerpFactor;
    }
  }

  private draw(): void {
    if (!this.canvas || !this.ctx) return;

    const width = this.canvas.width;
    const height = this.canvas.height;
    const { fractalType, maxIterations, zoom } = this.config;

    // Use current center (which follows mouse when interaction is enabled)
    const centerX = this.currentCenterX;
    const centerY = this.currentCenterY;

    // Julia set constant (for Julia mode)
    const juliaC = {
      re: -0.7,
      im: 0.27015,
    };

    // Calculate viewport bounds
    const aspectRatio = width / height;
    const viewHeight = 4 / zoom;
    const viewWidth = viewHeight * aspectRatio;

    const minRe = centerX - viewWidth / 2;
    const maxRe = centerX + viewWidth / 2;
    const minIm = centerY - viewHeight / 2;
    const maxIm = centerY + viewHeight / 2;

    // Create image data for faster pixel manipulation
    const imageData = this.ctx.createImageData(width, height);
    const data = imageData.data;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        // Map pixel to complex plane
        const cRe = minRe + (x / width) * (maxRe - minRe);
        const cIm = minIm + (y / height) * (maxIm - minIm);

        let zRe: number, zIm: number;
        let cReUse: number, cImUse: number;

        if (fractalType === "mandelbrot") {
          // Mandelbrot: z = z² + c, starting with z = 0
          zRe = 0;
          zIm = 0;
          cReUse = cRe;
          cImUse = cIm;
        } else {
          // Julia: z = z² + c, starting with z = pixel, c = constant
          zRe = cRe;
          zIm = cIm;
          cReUse = juliaC.re;
          cImUse = juliaC.im;
        }

        // Iterate the fractal equation
        let iteration = 0;
        let zReSq = 0;
        let zImSq = 0;

        while (iteration < maxIterations && zReSq + zImSq < 4) {
          zImSq = zIm * zIm;
          zReSq = zRe * zRe;

          // z² + c
          const newZRe = zReSq - zImSq + cReUse;
          const newZIm = 2 * zRe * zIm + cImUse;

          zRe = newZRe;
          zIm = newZIm;

          iteration++;
        }

        // Color based on iteration count
        const pixelIndex = (y * width + x) * 4;

        if (iteration === maxIterations) {
          // Inside the set - black
          data[pixelIndex] = 0;
          data[pixelIndex + 1] = 0;
          data[pixelIndex + 2] = 0;
          data[pixelIndex + 3] = 255;
        } else {
          // Outside the set - use color palette with smooth coloring
          const smoothIteration = iteration + 1 - Math.log(Math.log(zReSq + zImSq)) / Math.log(2);
          const colorIndex = Math.floor((smoothIteration + this.timeOffset) % this.colorPalette.length);
          const color = this.hexToRgb(this.colorPalette[colorIndex]);

          data[pixelIndex] = color.r;
          data[pixelIndex + 1] = color.g;
          data[pixelIndex + 2] = color.b;
          data[pixelIndex + 3] = 255;
        }
      }
    }

    this.ctx.putImageData(imageData, 0, 0);
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
