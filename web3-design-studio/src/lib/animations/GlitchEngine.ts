/**
 * Glitch Animation Engine
 * Cyberpunk RGB chromatic aberration and block displacement effects
 */

import type { AnimationEngine, GlitchConfig } from "../types/animation";

interface GlitchBlock {
  x: number;
  y: number;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  lifetime: number;
}

export class GlitchEngine implements AnimationEngine<GlitchConfig> {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private config: GlitchConfig;
  private animationId: number | null = null;
  private lastFrameTime: number = 0;
  private frameInterval: number = 1000 / 60;
  private time: number = 0;
  private glitchBlocks: GlitchBlock[] = [];
  private baseImageData: ImageData | null = null;

  constructor(config: GlitchConfig) {
    this.config = { ...config };
    this.frameInterval = 1000 / this.config.fps;
  }

  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: false, willReadFrequently: true });

    if (!this.ctx) {
      throw new Error("Failed to get canvas 2D context");
    }

    this.resize();
    this.generateBasePattern();
  }

  private generateBasePattern(): void {
    if (!this.canvas || !this.ctx) return;

    // Create a base pattern with gradients and shapes
    const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    gradient.addColorStop(0, "#1a0a2e");
    gradient.addColorStop(0.5, "#16213e");
    gradient.addColorStop(1, "#0f3460");

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Add some geometric shapes for glitch effect
    this.ctx.strokeStyle = this.config.color1;
    this.ctx.lineWidth = 2;

    for (let i = 0; i < 10; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      const size = Math.random() * 100 + 50;

      this.ctx.strokeRect(x, y, size, size);
    }

    // Store the base pattern
    this.baseImageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  updateConfig(config: Partial<GlitchConfig>): void {
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
    this.time += 0.01;

    // Update existing glitch blocks
    for (let i = this.glitchBlocks.length - 1; i >= 0; i--) {
      this.glitchBlocks[i].lifetime--;
      if (this.glitchBlocks[i].lifetime <= 0) {
        this.glitchBlocks.splice(i, 1);
      }
    }

    // Randomly create new glitch blocks based on frequency
    const glitchChance = (this.config.frequency / 100) * 0.1;

    if (Math.random() < glitchChance) {
      const count = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < count; i++) {
        this.glitchBlocks.push(this.createGlitchBlock());
      }
    }
  }

  private createGlitchBlock(): GlitchBlock {
    if (!this.canvas) {
      throw new Error("Canvas not initialized");
    }

    const blockSize = this.config.blockSize;
    const intensity = (this.config.intensity / 100) * 50;

    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      width: Math.random() * blockSize + blockSize / 2,
      height: Math.random() * blockSize + blockSize / 2,
      offsetX: (Math.random() - 0.5) * intensity,
      offsetY: (Math.random() - 0.5) * intensity,
      lifetime: Math.floor(Math.random() * 10) + 5,
    };
  }

  private draw(): void {
    if (!this.canvas || !this.ctx || !this.baseImageData) return;

    // Restore base pattern
    this.ctx.putImageData(this.baseImageData, 0, 0);

    // Apply RGB shift effect
    const rgbShift = (this.config.intensity / 100) * 10;

    if (Math.random() < this.config.frequency / 200) {
      this.drawRGBShift(rgbShift);
    }

    // Draw glitch blocks
    for (const block of this.glitchBlocks) {
      this.drawGlitchBlock(block);
    }

    // Add scanlines
    this.drawScanlines();
  }

  private drawRGBShift(shift: number): void {
    if (!this.canvas || !this.ctx || !this.baseImageData) return;

    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const pixels = imageData.data;
    const basePixels = this.baseImageData.data;

    const shiftR = Math.floor(shift);
    const shiftB = -Math.floor(shift);

    for (let y = 0; y < this.canvas.height; y++) {
      for (let x = 0; x < this.canvas.width; x++) {
        const idx = (y * this.canvas.width + x) * 4;

        // Red channel shifted
        const rX = Math.max(0, Math.min(this.canvas.width - 1, x + shiftR));
        const rIdx = (y * this.canvas.width + rX) * 4;
        pixels[idx] = basePixels[rIdx];

        // Green channel normal
        pixels[idx + 1] = basePixels[idx + 1];

        // Blue channel shifted
        const bX = Math.max(0, Math.min(this.canvas.width - 1, x + shiftB));
        const bIdx = (y * this.canvas.width + bX) * 4;
        pixels[idx + 2] = basePixels[bIdx + 2];
      }
    }

    this.ctx.putImageData(imageData, 0, 0);
  }

  private drawGlitchBlock(block: GlitchBlock): void {
    if (!this.ctx || !this.canvas) return;

    // Get the image data from the source block
    try {
      const imageData = this.ctx.getImageData(
        Math.max(0, block.x),
        Math.max(0, block.y),
        Math.min(block.width, this.canvas.width - block.x),
        Math.min(block.height, this.canvas.height - block.y)
      );

      // Put it at the offset position
      this.ctx.putImageData(
        imageData,
        Math.max(0, block.x + block.offsetX),
        Math.max(0, block.y + block.offsetY)
      );

      // Add colored overlay
      this.ctx.fillStyle = Math.random() > 0.5 ? this.config.color1 + "20" : this.config.color2 + "20";
      this.ctx.fillRect(block.x + block.offsetX, block.y + block.offsetY, block.width, block.height);
    } catch (e) {
      // Ignore errors from invalid coordinates
    }
  }

  private drawScanlines(): void {
    if (!this.ctx || !this.canvas) return;

    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    this.ctx.lineWidth = 1;

    for (let y = 0; y < this.canvas.height; y += 4) {
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

    this.generateBasePattern();
  }

  destroy(): void {
    this.stop();
    this.glitchBlocks = [];
    this.baseImageData = null;
    this.canvas = null;
    this.ctx = null;
  }
}
