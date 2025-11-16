/**
 * Cosmic Animation Engine
 * Space theme with stars, nebula, and cosmic dust
 */

import type { AnimationEngine, CosmicConfig } from "../types/animation";

interface Star {
  x: number;
  y: number;
  size: number;
  twinkle: number;
  twinkleSpeed: number;
  layer: number;
  vx: number;
  vy: number;
  originalX: number;
  originalY: number;
}

interface NebulaCloud {
  x: number;
  y: number;
  radius: number;
  rotation: number;
  rotationSpeed: number;
}

export class CosmicEngine implements AnimationEngine<CosmicConfig> {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private config: CosmicConfig;
  private stars: Star[] = [];
  private nebulaClouds: NebulaCloud[] = [];
  private animationId: number | null = null;
  private lastFrameTime: number = 0;
  private frameInterval: number = 1000 / 60;
  private time: number = 0;
  private mousePosition: { x: number; y: number } | null = null;
  private mouseInteractionEnabled: boolean = false;

  constructor(config: CosmicConfig) {
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
    this.initStars();
    this.initNebulae();
  }

  private initStars(): void {
    if (!this.canvas) return;

    const starCount = Math.min(Math.max(this.config.starCount, 100), 2000);
    this.stars = [];

    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      this.stars.push({
        x,
        y,
        size: Math.random() * 2 + 0.5,
        twinkle: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        layer: Math.floor(Math.random() * 3), // 3 depth layers
        vx: 0,
        vy: 0,
        originalX: x,
        originalY: y,
      });
    }
  }

  private initNebulae(): void {
    if (!this.canvas) return;

    this.nebulaClouds = [];
    const cloudCount = 5;

    for (let i = 0; i < cloudCount; i++) {
      this.nebulaClouds.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 200 + 150,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.001,
      });
    }
  }

  updateConfig(config: Partial<CosmicConfig>): void {
    const oldStarCount = this.config.starCount;
    const oldFps = this.config.fps;

    this.config = { ...this.config, ...config };

    // Update frame interval if FPS changed
    if (oldFps !== this.config.fps) {
      this.frameInterval = 1000 / this.config.fps;
    }

    // Reinitialize stars if count changed significantly
    if (Math.abs(oldStarCount - this.config.starCount) > 100) {
      this.initStars();
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
    this.time += 0.01 * (this.config.speed / 50);

    // Update star twinkle and position
    for (const star of this.stars) {
      star.twinkle += star.twinkleSpeed;

      // Apply mouse interaction
      if (this.mouseInteractionEnabled && this.mousePosition) {
        const dx = this.mousePosition.x - star.x;
        const dy = this.mousePosition.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const attractionRadius = 300;

        if (distance < attractionRadius && distance > 0) {
          // Attraction force (stars move toward mouse)
          const force = (1 - distance / attractionRadius) * 0.3 * (star.layer + 1);
          const angle = Math.atan2(dy, dx);
          star.vx += Math.cos(angle) * force;
          star.vy += Math.sin(angle) * force;
        }

        // Return to original position when far from mouse
        const dxOrig = star.originalX - star.x;
        const dyOrig = star.originalY - star.y;
        star.vx += dxOrig * 0.01;
        star.vy += dyOrig * 0.01;

        // Apply velocity
        star.x += star.vx;
        star.y += star.vy;

        // Friction
        star.vx *= 0.95;
        star.vy *= 0.95;
      } else if (star.vx !== 0 || star.vy !== 0) {
        // Return to original position when interaction disabled
        const dxOrig = star.originalX - star.x;
        const dyOrig = star.originalY - star.y;
        star.x += dxOrig * 0.05;
        star.y += dyOrig * 0.05;

        // Gradually stop velocity
        star.vx *= 0.9;
        star.vy *= 0.9;

        if (Math.abs(dxOrig) < 0.1 && Math.abs(dyOrig) < 0.1) {
          star.x = star.originalX;
          star.y = star.originalY;
          star.vx = 0;
          star.vy = 0;
        }
      }
    }

    // Update nebula rotation
    for (const cloud of this.nebulaClouds) {
      cloud.rotation += cloud.rotationSpeed * (this.config.speed / 50);
    }
  }

  private draw(): void {
    if (!this.canvas || !this.ctx) return;

    // Deep space background
    const bgGradient = this.ctx.createRadialGradient(
      this.canvas.width / 2,
      this.canvas.height / 2,
      0,
      this.canvas.width / 2,
      this.canvas.height / 2,
      Math.max(this.canvas.width, this.canvas.height) / 2
    );

    bgGradient.addColorStop(0, "#0a0a2e");
    bgGradient.addColorStop(1, "#000000");

    this.ctx.fillStyle = bgGradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw nebulae
    if (this.config.nebulaIntensity > 0) {
      this.drawNebulae();
    }

    // Draw stars in layers (back to front)
    for (let layer = 2; layer >= 0; layer--) {
      this.drawStarLayer(layer);
    }
  }

  private drawNebulae(): void {
    if (!this.ctx || !this.canvas) return;

    const intensity = this.config.nebulaIntensity / 100;

    for (const cloud of this.nebulaClouds) {
      const r1 = parseInt(this.config.color1.slice(1, 3), 16);
      const g1 = parseInt(this.config.color1.slice(3, 5), 16);
      const b1 = parseInt(this.config.color1.slice(5, 7), 16);

      const r2 = parseInt(this.config.color2.slice(1, 3), 16);
      const g2 = parseInt(this.config.color2.slice(3, 5), 16);
      const b2 = parseInt(this.config.color2.slice(5, 7), 16);

      // Create nebula gradient
      const gradient = this.ctx.createRadialGradient(
        cloud.x,
        cloud.y,
        0,
        cloud.x,
        cloud.y,
        cloud.radius
      );

      gradient.addColorStop(0, `rgba(${r1}, ${g1}, ${b1}, ${intensity * 0.6})`);
      gradient.addColorStop(0.4, `rgba(${r2}, ${g2}, ${b2}, ${intensity * 0.4})`);
      gradient.addColorStop(1, `rgba(${r2}, ${g2}, ${b2}, 0)`);

      this.ctx.fillStyle = gradient;
      this.ctx.globalCompositeOperation = "lighter";

      this.ctx.save();
      this.ctx.translate(cloud.x, cloud.y);
      this.ctx.rotate(cloud.rotation);
      this.ctx.scale(1, 0.7); // Make it elliptical
      this.ctx.beginPath();
      this.ctx.arc(0, 0, cloud.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    this.ctx.globalCompositeOperation = "source-over";
  }

  private drawStarLayer(layer: number): void {
    if (!this.ctx) return;

    const layerStars = this.stars.filter((s) => s.layer === layer);

    for (const star of layerStars) {
      // Calculate twinkle brightness
      const brightness = (Math.sin(star.twinkle) + 1) / 2;
      const alpha = 0.4 + brightness * 0.6;

      // Layer affects size and brightness
      const layerMultiplier = 1 - layer * 0.3;
      const size = star.size * layerMultiplier;
      const finalAlpha = alpha * layerMultiplier;

      this.ctx.fillStyle = `rgba(255, 255, 255, ${finalAlpha})`;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
      this.ctx.fill();

      // Add glow for larger stars
      if (size > 1.5 && brightness > 0.7) {
        this.ctx.fillStyle = `rgba(255, 255, 255, ${finalAlpha * 0.2})`;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, size * 2, 0, Math.PI * 2);
        this.ctx.fill();
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

    this.initStars();
    this.initNebulae();
  }

  destroy(): void {
    this.stop();
    this.stars = [];
    this.nebulaClouds = [];
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
      // Return stars to original positions
      for (const star of this.stars) {
        star.vx = 0;
        star.vy = 0;
      }
    }
  }
}
