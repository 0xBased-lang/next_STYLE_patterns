/**
 * Fire Animation Engine
 * Particle-based fire and smoke simulation
 */

import type { AnimationEngine } from "../types/animation";

export interface FireConfig {
  speed: number; // Animation speed (0.1-2.0)
  color1: string; // Fire core color (hot)
  color2: string; // Fire middle color
  color3: string; // Fire edge color (cool)
  particleCount: number; // Number of particles (100-2000)
  intensity: number; // Fire intensity (1-100)
  windSpeed: number; // Horizontal wind (-100 to 100)
  smokeAmount: number; // Smoke density (0-100)
  fps: number; // Target FPS (30-60)
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  isSmoke: boolean;
}

export class FireEngine implements AnimationEngine<FireConfig> {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private config: FireConfig;
  private animationId: number | null = null;
  private lastFrameTime: number = 0;
  private frameInterval: number = 1000 / 60;
  private particles: Particle[] = [];
  private mousePosition: { x: number; y: number } | null = null;
  private mouseInteractionEnabled: boolean = false;

  constructor(config: FireConfig) {
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
    this.generateParticles();
  }

  updateConfig(config: Partial<FireConfig>): void {
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
  }

  destroy(): void {
    this.stop();
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
    }
  }

  private generateParticles(): void {
    if (!this.canvas) return;

    const width = this.canvas.getBoundingClientRect().width;
    const height = this.canvas.getBoundingClientRect().height;

    this.particles = [];

    // Initialize particles at the bottom
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push(this.createParticle(width, height));
    }
  }

  private createParticle(width: number, height: number): Particle {
    const isSmoke = Math.random() * 100 < this.config.smokeAmount;

    // Start from bottom third of screen
    const x = width * 0.3 + Math.random() * width * 0.4;
    const y = height - Math.random() * height * 0.2;

    // Upward velocity with some randomness
    const baseVy = -(1 + Math.random() * 2) * (this.config.intensity / 50);
    const vx = (Math.random() - 0.5) * 0.5 + (this.config.windSpeed / 100);
    const vy = baseVy + (Math.random() - 0.5) * 0.5;

    const maxLife = isSmoke ? 80 + Math.random() * 40 : 60 + Math.random() * 40;
    const size = isSmoke ? 10 + Math.random() * 30 : 5 + Math.random() * 15;

    return {
      x,
      y,
      vx,
      vy,
      life: 0,
      maxLife,
      size,
      isSmoke,
    };
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

    // Calculate wind from mouse position if interaction is enabled
    let windForce = this.config.windSpeed / 100;
    if (this.mouseInteractionEnabled && this.mousePosition) {
      const centerX = width / 2;
      const mouseOffsetX = this.mousePosition.x - centerX;
      // Map mouse position to wind range (-1 to 1)
      windForce = Math.max(-1, Math.min(1, mouseOffsetX / (width / 2)));
    }

    // Update existing particles
    this.particles.forEach((particle) => {
      // Apply mouse-controlled wind force
      particle.vx += (windForce - particle.vx) * 0.1;

      particle.x += particle.vx * this.config.speed;
      particle.y += particle.vy * this.config.speed;
      particle.life += this.config.speed;

      // Apply turbulence
      particle.vx += (Math.random() - 0.5) * 0.1;
      particle.vy -= 0.02; // Slight upward acceleration

      // Smoke rises slower and spreads more
      if (particle.isSmoke) {
        particle.vx += (Math.random() - 0.5) * 0.2;
        particle.size += 0.1 * this.config.speed; // Smoke expands
      }
    });

    // Remove dead particles and create new ones
    this.particles = this.particles.filter((particle) => {
      if (particle.life >= particle.maxLife || particle.y < -100) {
        // Replace with new particle
        this.particles.push(this.createParticle(width, height));
        return false;
      }
      return true;
    });
  }

  private draw(): void {
    if (!this.canvas || !this.ctx) return;

    const width = this.canvas.getBoundingClientRect().width;
    const height = this.canvas.getBoundingClientRect().height;

    // Clear canvas
    this.ctx.clearRect(0, 0, width, height);

    // Sort particles by y position (back to front)
    const sortedParticles = [...this.particles].sort((a, b) => b.y - a.y);

    // Draw particles
    sortedParticles.forEach((particle) => {
      this.drawParticle(particle);
    });
  }

  private drawParticle(particle: Particle): void {
    if (!this.ctx) return;

    const lifeRatio = particle.life / particle.maxLife;
    const alpha = 1 - lifeRatio;

    if (particle.isSmoke) {
      // Smoke - gray gradient
      const grayValue = Math.floor(50 + lifeRatio * 100);
      this.ctx.fillStyle = `rgba(${grayValue}, ${grayValue}, ${grayValue}, ${alpha * 0.4})`;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    } else {
      // Fire - color gradient based on life
      const c1 = this.hexToRgb(this.config.color1);
      const c2 = this.hexToRgb(this.config.color2);
      const c3 = this.hexToRgb(this.config.color3);

      let r: number, g: number, b: number;

      if (lifeRatio < 0.33) {
        // Hot core (color1 to color2)
        const t = lifeRatio / 0.33;
        r = Math.floor(c1.r + (c2.r - c1.r) * t);
        g = Math.floor(c1.g + (c2.g - c1.g) * t);
        b = Math.floor(c1.b + (c2.b - c1.b) * t);
      } else if (lifeRatio < 0.66) {
        // Middle (color2 to color3)
        const t = (lifeRatio - 0.33) / 0.33;
        r = Math.floor(c2.r + (c3.r - c2.r) * t);
        g = Math.floor(c2.g + (c3.g - c2.g) * t);
        b = Math.floor(c2.b + (c3.b - c2.b) * t);
      } else {
        // Cool edge (color3 fading)
        const t = (lifeRatio - 0.66) / 0.34;
        r = Math.floor(c3.r * (1 - t));
        g = Math.floor(c3.g * (1 - t));
        b = Math.floor(c3.b * (1 - t));
      }

      // Glow effect
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;

      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();

      // Reset shadow
      this.ctx.shadowBlur = 0;
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
}
