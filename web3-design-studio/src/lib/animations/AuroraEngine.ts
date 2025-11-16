/**
 * Aurora Animation Engine
 * Northern lights effect with flowing waves and gradient colors
 */

import type { AnimationEngine, AuroraConfig } from "../types/animation";

interface AuroraWave {
  amplitude: number;
  frequency: number;
  phase: number;
  yOffset: number;
  speed: number;
  color: string;
}

export class AuroraEngine implements AnimationEngine<AuroraConfig> {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private config: AuroraConfig;
  private waves: AuroraWave[] = [];
  private animationId: number | null = null;
  private lastFrameTime: number = 0;
  private frameInterval: number = 1000 / 60;
  private time: number = 0;
  private mousePosition: { x: number; y: number } | null = null;
  private mouseInteractionEnabled: boolean = false;

  constructor(config: AuroraConfig) {
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
    this.initWaves();
  }

  private initWaves(): void {
    if (!this.canvas) return;

    const waveCount = Math.min(Math.max(this.config.waves, 1), 10);
    const colors = [this.config.color1, this.config.color2, this.config.color3];

    this.waves = [];

    for (let i = 0; i < waveCount; i++) {
      const colorIndex = i % colors.length;
      this.waves.push({
        amplitude: (Math.random() * 60 + 40) * (this.config.intensity / 100),
        frequency: Math.random() * 0.002 + 0.001,
        phase: Math.random() * Math.PI * 2,
        yOffset: (this.canvas.height / (waveCount + 1)) * (i + 1),
        speed: (Math.random() * 0.5 + 0.5) * (this.config.speed / 50),
        color: colors[colorIndex],
      });
    }
  }

  updateConfig(config: Partial<AuroraConfig>): void {
    const oldWaves = this.config.waves;
    const oldFps = this.config.fps;

    this.config = { ...this.config, ...config };

    // Update frame interval if FPS changed
    if (oldFps !== this.config.fps) {
      this.frameInterval = 1000 / this.config.fps;
    }

    // Reinitialize waves if wave count changed
    if (oldWaves !== this.config.waves) {
      this.initWaves();
    } else {
      // Update existing wave properties
      const colors = [this.config.color1, this.config.color2, this.config.color3];
      this.waves.forEach((wave, i) => {
        wave.color = colors[i % colors.length];
        wave.amplitude = (wave.amplitude / (oldFps / 100)) * (this.config.intensity / 100);
        wave.speed = (wave.speed / ((config.speed || 1) / 50)) * (this.config.speed / 50);
      });
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

    for (const wave of this.waves) {
      wave.phase += wave.speed * 0.02;

      // Waves gravitate towards mouse Y position
      if (this.mouseInteractionEnabled && this.mousePosition && this.canvas) {
        const targetY = this.mousePosition.y;
        const currentY = wave.yOffset;
        const diff = targetY - currentY;
        // Smoothly interpolate towards mouse Y position
        wave.yOffset += diff * 0.02;
      }
    }
  }

  private draw(): void {
    if (!this.canvas || !this.ctx) return;

    // Create dark starry background
    this.ctx.fillStyle = "#0a0e1a";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Add stars
    this.drawStars();

    // Draw aurora waves
    this.ctx.globalCompositeOperation = "lighter";

    for (const wave of this.waves) {
      this.drawWave(wave);
    }

    this.ctx.globalCompositeOperation = "source-over";
  }

  private drawStars(): void {
    if (!this.ctx || !this.canvas) return;

    // Deterministic stars based on canvas size
    const starCount = 200;
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.3)";

    for (let i = 0; i < starCount; i++) {
      // Use deterministic positions based on index
      const x = ((i * 137.5) % this.canvas.width);
      const y = ((i * 73.3) % this.canvas.height) * 0.6; // Upper 60% of canvas

      const size = ((i % 3) + 1) * 0.5;
      const brightness = 0.2 + ((i % 10) / 10) * 0.3;

      this.ctx.globalAlpha = brightness;
      this.ctx.beginPath();
      this.ctx.arc(x, y, size, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.globalAlpha = 1;
  }

  private drawWave(wave: AuroraWave): void {
    if (!this.canvas || !this.ctx) return;

    const points: { x: number; y: number }[] = [];
    const segments = 200;

    // Generate wave points
    for (let i = 0; i <= segments; i++) {
      const x = (this.canvas.width / segments) * i;
      const y =
        wave.yOffset +
        Math.sin(x * wave.frequency + wave.phase) * wave.amplitude +
        Math.sin(x * wave.frequency * 2 + wave.phase * 1.5) * (wave.amplitude * 0.3);

      points.push({ x, y });
    }

    // Create gradient for wave
    const gradient = this.ctx.createLinearGradient(
      0,
      wave.yOffset - wave.amplitude,
      0,
      wave.yOffset + wave.amplitude
    );

    const r = parseInt(wave.color.slice(1, 3), 16);
    const g = parseInt(wave.color.slice(3, 5), 16);
    const b = parseInt(wave.color.slice(5, 7), 16);

    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
    gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${this.config.intensity / 150})`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

    // Draw filled wave
    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i].x, points[i].y);
    }

    // Complete the shape
    this.ctx.lineTo(this.canvas.width, this.canvas.height);
    this.ctx.lineTo(0, this.canvas.height);
    this.ctx.closePath();

    this.ctx.fillStyle = gradient;
    this.ctx.fill();

    // Draw glow line on top
    this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${this.config.intensity / 100})`;
    this.ctx.lineWidth = 2;
    this.ctx.shadowBlur = 20;
    this.ctx.shadowColor = wave.color;

    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i].x, points[i].y);
    }

    this.ctx.stroke();
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

    this.initWaves();
  }

  destroy(): void {
    this.stop();
    this.waves = [];
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
      // Reset wave positions when interaction is disabled
      this.initWaves();
    }
  }
}
