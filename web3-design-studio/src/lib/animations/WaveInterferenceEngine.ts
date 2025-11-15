/**
 * Wave Interference Animation Engine
 * Concentric wave ripples with interference patterns
 */

import type { AnimationEngine, WaveInterferenceConfig } from "../types/animation";

interface WaveSource {
  x: number;
  y: number;
  phase: number;
  frequency: number;
}

export class WaveInterferenceEngine implements AnimationEngine<WaveInterferenceConfig> {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private config: WaveInterferenceConfig;
  private animationId: number | null = null;
  private lastFrameTime: number = 0;
  private frameInterval: number = 1000 / 60;
  private time: number = 0;
  private waveSources: WaveSource[] = [];
  private mouseInteractionEnabled: boolean = false;
  private userAddedSources: WaveSource[] = [];

  constructor(config: WaveInterferenceConfig) {
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
    this.initWaveSources();
  }

  private initWaveSources(): void {
    if (!this.canvas) return;

    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    this.waveSources = [];

    // Create wave sources based on sourceCount
    const count = Math.floor(this.config.sourceCount);

    if (count === 1) {
      // Single source in center
      this.waveSources.push({
        x: width / 2,
        y: height / 2,
        phase: 0,
        frequency: 0.05,
      });
    } else if (count === 2) {
      // Two sources (classic double-slit pattern)
      const spacing = width * 0.3;
      this.waveSources.push(
        {
          x: width / 2 - spacing / 2,
          y: height / 2,
          phase: 0,
          frequency: 0.05,
        },
        {
          x: width / 2 + spacing / 2,
          y: height / 2,
          phase: 0,
          frequency: 0.05,
        }
      );
    } else {
      // Multiple sources in circular pattern
      const radius = Math.min(width, height) * 0.3;
      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        this.waveSources.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          phase: 0,
          frequency: 0.05,
        });
      }
    }
  }

  updateConfig(config: Partial<WaveInterferenceConfig>): void {
    const oldFps = this.config.fps;
    const oldSourceCount = this.config.sourceCount;

    this.config = { ...this.config, ...config };

    // Update frame interval if FPS changed
    if (oldFps !== this.config.fps) {
      this.frameInterval = 1000 / this.config.fps;
    }

    // Reinitialize sources if count changed
    if (oldSourceCount !== this.config.sourceCount) {
      this.initWaveSources();
    }
  }

  setMouseInteraction(enabled: boolean): void {
    this.mouseInteractionEnabled = enabled;
    if (!enabled) {
      // Clear user-added sources when disabled
      this.userAddedSources = [];
    }
  }

  handleClick(x: number, y: number): void {
    if (!this.mouseInteractionEnabled || !this.canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();

    // Add new wave source at click position
    this.userAddedSources.push({
      x: x,
      y: y,
      phase: 0,
      frequency: 0.05,
    });

    // Limit to 10 user-added sources
    if (this.userAddedSources.length > 10) {
      this.userAddedSources.shift();
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

    this.initWaveSources();
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
    this.time += (this.config.speed / 1000) * 0.1;

    // Update wave source phases for default sources
    for (const source of this.waveSources) {
      source.phase = this.time;
    }

    // Update phases for user-added sources
    for (const source of this.userAddedSources) {
      source.phase = this.time;
    }
  }

  private draw(): void {
    if (!this.canvas || !this.ctx) return;

    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Clear canvas
    this.ctx.fillStyle = "rgba(10, 14, 10, 1)";
    this.ctx.fillRect(0, 0, width, height);

    // Calculate wave interference on a grid
    const resolution = Math.max(2, 10 - this.config.resolution / 20); // Lower = more detailed
    const wavelength = this.config.wavelength;
    const amplitude = this.config.amplitude;

    // Combine default and user-added sources
    const allSources = [...this.waveSources, ...this.userAddedSources];

    // Draw interference pattern
    for (let x = 0; x < width; x += resolution) {
      for (let y = 0; y < height; y += resolution) {
        // Calculate interference at this point
        let waveValue = 0;

        for (const source of allSources) {
          const dx = x - source.x;
          const dy = y - source.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Wave equation: sin(kx - ωt)
          const k = (Math.PI * 2) / wavelength; // Wave number
          const wave = Math.sin(k * distance - source.phase);

          // Damping with distance
          const damping = 1 / (1 + distance / 500);

          waveValue += wave * damping;
        }

        // Normalize and apply amplitude
        waveValue = (waveValue / allSources.length) * (amplitude / 100);

        // Map wave value to color intensity
        const intensity = (waveValue + 1) / 2; // Normalize to 0-1

        // Get colors
        const r1 = parseInt(this.config.color1.slice(1, 3), 16);
        const g1 = parseInt(this.config.color1.slice(3, 5), 16);
        const b1 = parseInt(this.config.color1.slice(5, 7), 16);

        const r2 = parseInt(this.config.color2.slice(1, 3), 16);
        const g2 = parseInt(this.config.color2.slice(3, 5), 16);
        const b2 = parseInt(this.config.color2.slice(5, 7), 16);

        // Interpolate between colors
        const r = Math.floor(r1 + (r2 - r1) * intensity);
        const g = Math.floor(g1 + (g2 - g1) * intensity);
        const b = Math.floor(b1 + (b2 - b1) * intensity);

        this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        this.ctx.fillRect(x, y, resolution, resolution);
      }
    }

    // Draw wave sources with glow
    if (this.config.amplitude > 30) {
      for (const source of this.waveSources) {
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = this.config.color2;
        this.ctx.fillStyle = this.config.color2;
        this.ctx.beginPath();
        this.ctx.arc(source.x, source.y, 5, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
      }
    }
  }
}
