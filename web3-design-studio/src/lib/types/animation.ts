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

export interface DNAHelixConfig {
  speed: number; // 1-100 (rotation speed)
  color1: string; // First strand color
  color2: string; // Second strand color
  helixRadius: number; // 50-200 (helix width)
  turns: number; // 1-5 (number of complete rotations)
  segments: number; // 50-300 (detail level)
  glowIntensity: number; // 0-100
  fps: number; // 30-60
}

export interface WaveInterferenceConfig {
  speed: number; // 1-100 (wave propagation speed)
  color1: string; // Wave color 1
  color2: string; // Wave color 2
  wavelength: number; // 20-200 (distance between peaks)
  amplitude: number; // 1-100 (wave strength)
  sourceCount: number; // 1-8 (number of wave sources)
  resolution: number; // 1-100 (detail level, higher = more detail)
  fps: number; // 30-60
}

export interface PlasmaConfig {
  speed: number; // 1-100 (animation speed)
  color1: string; // Plasma color 1
  color2: string; // Plasma color 2
  color3: string; // Plasma color 3
  intensity: number; // 1-100 (brightness)
  complexity: number; // 1-100 (pattern complexity)
  scale: number; // 10-200 (pattern scale)
  fps: number; // 30-60
}

export interface FractalConfig {
  speed: number; // 0.1-2.0 (animation speed)
  color1: string; // Start color for gradient
  color2: string; // Mid color for gradient
  color3: string; // End color for gradient
  fractalType: "mandelbrot" | "julia"; // Fractal type
  maxIterations: number; // 50-500 (detail level)
  zoom: number; // 1-1000 (zoom level)
  centerX: number; // -2 to 2 (center X coordinate)
  centerY: number; // -2 to 2 (center Y coordinate)
  colorShift: number; // 0-100 (color animation speed)
  fps: number; // 30-60
}

export interface LightningConfig {
  speed: number; // 0.1-2.0 (animation speed)
  color1: string; // Primary lightning color
  color2: string; // Secondary glow color
  boltCount: number; // 1-10 (number of lightning bolts)
  branchProbability: number; // 0-100 (branch chance)
  thickness: number; // 1-10 (bolt thickness)
  glowIntensity: number; // 0-100 (glow strength)
  segments: number; // 10-100 (segments per bolt)
  fps: number; // 30-60
}

export interface TessellationConfig {
  speed: number; // 0.1-2.0 (animation speed)
  color1: string; // Primary cell color
  color2: string; // Secondary cell color
  cellCount: number; // 10-100 (number of cells)
  cellMovement: number; // 0-100 (cell movement speed)
  borderWidth: number; // 0-10 (border thickness)
  borderColor: string; // Border color
  colorVariation: number; // 0-100 (color variation)
  fps: number; // 30-60
}

export interface FireConfig {
  speed: number; // 0.1-2.0 (animation speed)
  color1: string; // Fire core color (hot)
  color2: string; // Fire middle color
  color3: string; // Fire edge color (cool)
  particleCount: number; // 100-2000 (number of particles)
  intensity: number; // 1-100 (fire intensity)
  windSpeed: number; // -100 to 100 (horizontal wind)
  smokeAmount: number; // 0-100 (smoke density)
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
  | CosmicConfig
  | DNAHelixConfig
  | WaveInterferenceConfig
  | PlasmaConfig
  | FractalConfig
  | LightningConfig
  | TessellationConfig
  | FireConfig;

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
  | "cosmic"
  | "dnaHelix"
  | "waveInterference"
  | "plasma"
  | "fractal"
  | "lightning"
  | "tessellation"
  | "fire";

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

/**
 * Default DNA Helix Configuration
 */
export const defaultDNAHelixConfig: DNAHelixConfig = {
  speed: 40,
  color1: "#00ff87",
  color2: "#ff0080",
  helixRadius: 100,
  turns: 3,
  segments: 150,
  glowIntensity: 60,
  fps: 60,
};

/**
 * Default Wave Interference Configuration
 */
export const defaultWaveInterferenceConfig: WaveInterferenceConfig = {
  speed: 50,
  color1: "#0a0e0a",
  color2: "#00d9ff",
  wavelength: 80,
  amplitude: 50,
  sourceCount: 2,
  resolution: 50,
  fps: 60,
};

/**
 * Default Plasma Configuration
 */
export const defaultPlasmaConfig: PlasmaConfig = {
  speed: 50,
  color1: "#ff0080",
  color2: "#7b2cbf",
  color3: "#00d9ff",
  intensity: 80,
  complexity: 60,
  scale: 100,
  fps: 60,
};

/**
 * Default Fractal Configuration
 */
export const defaultFractalConfig: FractalConfig = {
  speed: 1.0,
  color1: "#00d9ff",
  color2: "#b565d8",
  color3: "#ff0080",
  fractalType: "mandelbrot",
  maxIterations: 200,
  zoom: 1.0,
  centerX: -0.5,
  centerY: 0.0,
  colorShift: 30,
  fps: 60,
};

/**
 * Default Lightning Configuration
 */
export const defaultLightningConfig: LightningConfig = {
  speed: 1.0,
  color1: "#00d9ff",
  color2: "#60efff",
  boltCount: 3,
  branchProbability: 40,
  thickness: 3,
  glowIntensity: 60,
  segments: 50,
  fps: 60,
};

/**
 * Default Tessellation Configuration
 */
export const defaultTessellationConfig: TessellationConfig = {
  speed: 1.0,
  color1: "#b565d8",
  color2: "#00d9ff",
  cellCount: 30,
  cellMovement: 30,
  borderWidth: 2,
  borderColor: "#0a0e0a",
  colorVariation: 50,
  fps: 60,
};

/**
 * Default Fire Configuration
 */
export const defaultFireConfig: FireConfig = {
  speed: 1.0,
  color1: "#ffff00",
  color2: "#ff6600",
  color3: "#ff0000",
  particleCount: 500,
  intensity: 70,
  windSpeed: 0,
  smokeAmount: 30,
  fps: 60,
};

