/**
 * Animation Configuration Types
 * Defines the configuration interfaces for all background animations
 */

export interface MatrixConfig {
  speed: number; // 1-100 (how fast characters fall)
  color: string; // Hex color for characters
  density: number; // 1-100 (number of columns)
  glow: number; // 0-100 (glow intensity)
  fontSize: number; // 10-40 (character size)
  fps: number; // 30-60 (frames per second)
}

export interface FluidConfig {
  speed: number; // 1-100
  color1: string; // Primary color
  color2: string; // Secondary color
  complexity: number; // 1-100 (number of fluid nodes)
  blur: number; // 0-50 (blur amount)
  fps: number; // 30-60
}

export interface AuroraConfig {
  speed: number; // 1-100
  color1: string; // Primary aurora color
  color2: string; // Secondary aurora color
  color3: string; // Tertiary aurora color
  intensity: number; // 1-100
  waves: number; // 1-10 (number of aurora waves)
  fps: number; // 30-60
}

export interface ParticleConfig {
  speed: number; // 1-100
  color: string; // Particle color
  count: number; // 100-5000 (number of particles)
  size: number; // 1-10 (particle size)
  connectionDistance: number; // 50-300 (max distance for connections)
  fps: number; // 30-60
}

export interface GlitchConfig {
  intensity: number; // 1-100 (glitch strength)
  color1: string; // RGB shift color 1
  color2: string; // RGB shift color 2
  frequency: number; // 1-100 (how often glitches occur)
  blockSize: number; // 10-100 (size of glitch blocks)
  fps: number; // 30-60
}

export interface MorphBlobConfig {
  speed: number; // 1-100
  color: string; // Blob color
  complexity: number; // 3-20 (number of blob points)
  size: number; // 50-400 (blob size)
  glow: number; // 0-100
  fps: number; // 30-60
}

export interface NeonTrailsConfig {
  speed: number; // 1-100
  color: string; // Trail color
  trailLength: number; // 10-200 (length of trails)
  count: number; // 5-50 (number of trails)
  width: number; // 1-10 (trail width)
  fps: number; // 30-60
}

export interface CosmicConfig {
  speed: number; // 1-100 (rotation/movement speed)
  color1: string; // Primary cosmic color
  color2: string; // Secondary cosmic color
  starCount: number; // 100-1000
  nebulaIntensity: number; // 1-100
  fps: number; // 30-60
}

/**
 * Union type of all animation configs
 */
export type AnimationConfig =
  | MatrixConfig
  | FluidConfig
  | AuroraConfig
  | ParticleConfig
  | GlitchConfig
  | MorphBlobConfig
  | NeonTrailsConfig
  | CosmicConfig;

/**
 * Animation type identifier
 */
export type AnimationType =
  | "matrix"
  | "fluid"
  | "aurora"
  | "particle"
  | "glitch"
  | "morphBlob"
  | "neonTrails"
  | "cosmic";

/**
 * Animation Engine Interface
 * All animation engines must implement these methods
 */
export interface AnimationEngine<T extends AnimationConfig> {
  /**
   * Initialize the animation engine with canvas context
   */
  init(canvas: HTMLCanvasElement): void;

  /**
   * Update animation configuration
   */
  updateConfig(config: Partial<T>): void;

  /**
   * Start the animation loop
   */
  start(): void;

  /**
   * Stop the animation loop
   */
  stop(): void;

  /**
   * Cleanup resources
   */
  destroy(): void;

  /**
   * Resize handler
   */
  resize(): void;
}

/**
 * Default Matrix Configuration
 */
export const defaultMatrixConfig: MatrixConfig = {
  speed: 50,
  color: "#00ff41",
  density: 50,
  glow: 30,
  fontSize: 16,
  fps: 60,
};

/**
 * Default Fluid Configuration
 */
export const defaultFluidConfig: FluidConfig = {
  speed: 30,
  color1: "#b565d8",
  color2: "#7b2cbf",
  complexity: 50,
  blur: 20,
  fps: 60,
};

/**
 * Default Aurora Configuration
 */
export const defaultAuroraConfig: AuroraConfig = {
  speed: 40,
  color1: "#00ff87",
  color2: "#60efff",
  color3: "#ff00ff",
  intensity: 70,
  waves: 5,
  fps: 60,
};

/**
 * Default Particle Configuration
 */
export const defaultParticleConfig: ParticleConfig = {
  speed: 50,
  color: "#00d9ff",
  count: 150,
  size: 3,
  connectionDistance: 150,
  fps: 60,
};

/**
 * Default Glitch Configuration
 */
export const defaultGlitchConfig: GlitchConfig = {
  intensity: 50,
  color1: "#ff0080",
  color2: "#00ffff",
  frequency: 30,
  blockSize: 50,
  fps: 60,
};

/**
 * Default Neon Trails Configuration
 */
export const defaultNeonTrailsConfig: NeonTrailsConfig = {
  speed: 60,
  color: "#ff00d9",
  trailLength: 100,
  count: 15,
  width: 3,
  fps: 60,
};

/**
 * Default Morph Blob Configuration
 */
export const defaultMorphBlobConfig: MorphBlobConfig = {
  speed: 40,
  color: "#b565d8",
  complexity: 12,
  size: 200,
  glow: 50,
  fps: 60,
};

/**
 * Default Cosmic Configuration
 */
export const defaultCosmicConfig: CosmicConfig = {
  speed: 30,
  color1: "#b565d8",
  color2: "#7b2cbf",
  starCount: 500,
  nebulaIntensity: 60,
  fps: 60,
};

