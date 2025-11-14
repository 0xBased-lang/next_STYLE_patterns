/**
 * Particle Animation Engine
 * Network of connected particles with constellation effect
 */

import type { AnimationEngine, ParticleConfig } from "../types/animation";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export class ParticleEngine implements AnimationEngine<ParticleConfig> {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private config: ParticleConfig;
  private particles: Particle[] = [];
  private animationId: number | null = null;
  private lastFrameTime: number = 0;
  private frameInterval: number = 1000 / 60;

  constructor(config: ParticleConfig) {
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
    this.initParticles();
  }

  private initParticles(): void {
    if (!this.canvas) return;

    const count = Math.min(Math.max(this.config.count, 50), 1000);
    this.particles = [];

    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle());
    }
  }

  private createParticle(): Particle {
    if (!this.canvas) {
      throw new Error("Canvas not initialized");
    }

    const speed = (this.config.speed / 100) * 2;

    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      radius: this.config.size * 0.5,
    };
  }

  updateConfig(config: Partial<ParticleConfig>): void {
    const oldCount = this.config.count;
    const oldFps = this.config.fps;
    const oldSize = this.config.size;

    this.config = { ...this.config, ...config };

    // Update frame interval if FPS changed
    if (oldFps !== this.config.fps) {
      this.frameInterval = 1000 / this.config.fps;
    }

    // Reinitialize particles if count changed significantly
    if (Math.abs(oldCount - this.config.count) > 20) {
      this.initParticles();
    } else if (oldSize !== this.config.size) {
      // Update particle sizes
      for (const particle of this.particles) {
        particle.radius = this.config.size * 0.5;
      }
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

    for (const particle of this.particles) {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
    }
  }

  private draw(): void {
    if (!this.canvas || !this.ctx) return;

    // Clear canvas with dark background
    this.ctx.fillStyle = "#0a0a1a";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const r = parseInt(this.config.color.slice(1, 3), 16);
    const g = parseInt(this.config.color.slice(3, 5), 16);
    const b = parseInt(this.config.color.slice(5, 7), 16);

    // Draw connections first (so they appear behind particles)
    this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.3)`;
    this.ctx.lineWidth = 1;

    const maxDistance = this.config.connectionDistance;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          // Fade out line as distance increases
          const alpha = (1 - distance / maxDistance) * 0.5;
          this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;

          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }

    // Draw particles
    this.ctx.fillStyle = this.config.color;
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = this.config.color;

    for (const particle of this.particles) {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }

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

    this.initParticles();
  }

  destroy(): void {
    this.stop();
    this.particles = [];
    this.canvas = null;
    this.ctx = null;
  }
}
