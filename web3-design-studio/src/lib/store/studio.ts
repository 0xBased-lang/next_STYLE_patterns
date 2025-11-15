/**
 * Web3 Design Studio Store
 * Global state management using Zustand
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  MatrixConfig,
  FluidConfig,
  AuroraConfig,
  ParticleConfig,
  GlitchConfig,
  NeonTrailsConfig,
  MorphBlobConfig,
  CosmicConfig,
  DNAHelixConfig,
  WaveInterferenceConfig,
  PlasmaConfig,
  FractalConfig,
  LightningConfig,
  TessellationConfig,
  FireConfig,
  AnimationType,
  AnimationConfig
} from "../types/animation";
import {
  defaultMatrixConfig,
  defaultFluidConfig,
  defaultAuroraConfig,
  defaultParticleConfig,
  defaultGlitchConfig,
  defaultNeonTrailsConfig,
  defaultMorphBlobConfig,
  defaultCosmicConfig,
  defaultDNAHelixConfig,
  defaultWaveInterferenceConfig,
  defaultPlasmaConfig,
  defaultFractalConfig,
  defaultLightningConfig,
  defaultTessellationConfig,
  defaultFireConfig
} from "../types/animation";
import type { Preset } from "../types/preset";
import { allDefaultPresets } from "../presets/defaultPresets";

interface StudioState {
  // Current active animation
  activeAnimation: AnimationType;
  setActiveAnimation: (animation: AnimationType) => void;

  // Matrix configuration
  matrixConfig: MatrixConfig;
  updateMatrixConfig: (config: Partial<MatrixConfig>) => void;
  resetMatrixConfig: () => void;

  // Fluid configuration
  fluidConfig: FluidConfig;
  updateFluidConfig: (config: Partial<FluidConfig>) => void;
  resetFluidConfig: () => void;

  // Aurora configuration
  auroraConfig: AuroraConfig;
  updateAuroraConfig: (config: Partial<AuroraConfig>) => void;
  resetAuroraConfig: () => void;

  // Particle configuration
  particleConfig: ParticleConfig;
  updateParticleConfig: (config: Partial<ParticleConfig>) => void;
  resetParticleConfig: () => void;

  // Glitch configuration
  glitchConfig: GlitchConfig;
  updateGlitchConfig: (config: Partial<GlitchConfig>) => void;
  resetGlitchConfig: () => void;

  // Neon Trails configuration
  neonTrailsConfig: NeonTrailsConfig;
  updateNeonTrailsConfig: (config: Partial<NeonTrailsConfig>) => void;
  resetNeonTrailsConfig: () => void;

  // Morph Blob configuration
  morphBlobConfig: MorphBlobConfig;
  updateMorphBlobConfig: (config: Partial<MorphBlobConfig>) => void;
  resetMorphBlobConfig: () => void;

  // Cosmic configuration
  cosmicConfig: CosmicConfig;
  updateCosmicConfig: (config: Partial<CosmicConfig>) => void;
  resetCosmicConfig: () => void;

  // DNA Helix configuration
  dnaHelixConfig: DNAHelixConfig;
  updateDNAHelixConfig: (config: Partial<DNAHelixConfig>) => void;
  resetDNAHelixConfig: () => void;

  // Wave Interference configuration
  waveInterferenceConfig: WaveInterferenceConfig;
  updateWaveInterferenceConfig: (config: Partial<WaveInterferenceConfig>) => void;
  resetWaveInterferenceConfig: () => void;

  // Plasma configuration
  plasmaConfig: PlasmaConfig;
  updatePlasmaConfig: (config: Partial<PlasmaConfig>) => void;
  resetPlasmaConfig: () => void;

  // Fractal configuration
  fractalConfig: FractalConfig;
  updateFractalConfig: (config: Partial<FractalConfig>) => void;
  resetFractalConfig: () => void;

  // Lightning configuration
  lightningConfig: LightningConfig;
  updateLightningConfig: (config: Partial<LightningConfig>) => void;
  resetLightningConfig: () => void;

  // Tessellation configuration
  tessellationConfig: TessellationConfig;
  updateTessellationConfig: (config: Partial<TessellationConfig>) => void;
  resetTessellationConfig: () => void;

  // Fire configuration
  fireConfig: FireConfig;
  updateFireConfig: (config: Partial<FireConfig>) => void;
  resetFireConfig: () => void;

  // UI state
  showControls: boolean;
  toggleControls: () => void;

  // Global animation controls
  isPaused: boolean;
  togglePause: () => void;
  globalSpeed: number;
  setGlobalSpeed: (speed: number) => void;

  // Performance monitoring
  showPerformance: boolean;
  togglePerformance: () => void;

  // Mouse interaction
  mouseInteraction: boolean;
  toggleMouseInteraction: () => void;

  // Preset management
  userPresets: Preset[];
  savePreset: (name: string, description: string) => void;
  loadPreset: (preset: Preset) => void;
  deletePreset: (presetId: string) => void;
  getPresetsForCurrentAnimation: () => Preset[];
  exportPreset: (preset: Preset) => string;
  importPreset: (jsonString: string) => void;
}

export const useStudioStore = create<StudioState>()(
  persist(
    (set, get) => ({
  // Active animation
  activeAnimation: "matrix",
  setActiveAnimation: (animation) => set({ activeAnimation: animation }),

  // Matrix configuration
  matrixConfig: defaultMatrixConfig,
  updateMatrixConfig: (config) =>
    set((state) => ({
      matrixConfig: { ...state.matrixConfig, ...config },
    })),
  resetMatrixConfig: () => set({ matrixConfig: defaultMatrixConfig }),

  // Fluid configuration
  fluidConfig: defaultFluidConfig,
  updateFluidConfig: (config) =>
    set((state) => ({
      fluidConfig: { ...state.fluidConfig, ...config },
    })),
  resetFluidConfig: () => set({ fluidConfig: defaultFluidConfig }),

  // Aurora configuration
  auroraConfig: defaultAuroraConfig,
  updateAuroraConfig: (config) =>
    set((state) => ({
      auroraConfig: { ...state.auroraConfig, ...config },
    })),
  resetAuroraConfig: () => set({ auroraConfig: defaultAuroraConfig }),

  // Particle configuration
  particleConfig: defaultParticleConfig,
  updateParticleConfig: (config) =>
    set((state) => ({
      particleConfig: { ...state.particleConfig, ...config },
    })),
  resetParticleConfig: () => set({ particleConfig: defaultParticleConfig }),

  // Glitch configuration
  glitchConfig: defaultGlitchConfig,
  updateGlitchConfig: (config) =>
    set((state) => ({
      glitchConfig: { ...state.glitchConfig, ...config },
    })),
  resetGlitchConfig: () => set({ glitchConfig: defaultGlitchConfig }),

  // Neon Trails configuration
  neonTrailsConfig: defaultNeonTrailsConfig,
  updateNeonTrailsConfig: (config) =>
    set((state) => ({
      neonTrailsConfig: { ...state.neonTrailsConfig, ...config },
    })),
  resetNeonTrailsConfig: () => set({ neonTrailsConfig: defaultNeonTrailsConfig }),

  // Morph Blob configuration
  morphBlobConfig: defaultMorphBlobConfig,
  updateMorphBlobConfig: (config) =>
    set((state) => ({
      morphBlobConfig: { ...state.morphBlobConfig, ...config },
    })),
  resetMorphBlobConfig: () => set({ morphBlobConfig: defaultMorphBlobConfig }),

  // Cosmic configuration
  cosmicConfig: defaultCosmicConfig,
  updateCosmicConfig: (config) =>
    set((state) => ({
      cosmicConfig: { ...state.cosmicConfig, ...config },
    })),
  resetCosmicConfig: () => set({ cosmicConfig: defaultCosmicConfig }),

  // DNA Helix configuration
  dnaHelixConfig: defaultDNAHelixConfig,
  updateDNAHelixConfig: (config) =>
    set((state) => ({
      dnaHelixConfig: { ...state.dnaHelixConfig, ...config },
    })),
  resetDNAHelixConfig: () => set({ dnaHelixConfig: defaultDNAHelixConfig }),

  // Wave Interference configuration
  waveInterferenceConfig: defaultWaveInterferenceConfig,
  updateWaveInterferenceConfig: (config) =>
    set((state) => ({
      waveInterferenceConfig: { ...state.waveInterferenceConfig, ...config },
    })),
  resetWaveInterferenceConfig: () => set({ waveInterferenceConfig: defaultWaveInterferenceConfig }),

  // Plasma configuration
  plasmaConfig: defaultPlasmaConfig,
  updatePlasmaConfig: (config) =>
    set((state) => ({
      plasmaConfig: { ...state.plasmaConfig, ...config },
    })),
  resetPlasmaConfig: () => set({ plasmaConfig: defaultPlasmaConfig }),

  // Fractal configuration
  fractalConfig: defaultFractalConfig,
  updateFractalConfig: (config) =>
    set((state) => ({
      fractalConfig: { ...state.fractalConfig, ...config },
    })),
  resetFractalConfig: () => set({ fractalConfig: defaultFractalConfig }),

  // Lightning configuration
  lightningConfig: defaultLightningConfig,
  updateLightningConfig: (config) =>
    set((state) => ({
      lightningConfig: { ...state.lightningConfig, ...config },
    })),
  resetLightningConfig: () => set({ lightningConfig: defaultLightningConfig }),

  // Tessellation configuration
  tessellationConfig: defaultTessellationConfig,
  updateTessellationConfig: (config) =>
    set((state) => ({
      tessellationConfig: { ...state.tessellationConfig, ...config },
    })),
  resetTessellationConfig: () => set({ tessellationConfig: defaultTessellationConfig }),

  // Fire configuration
  fireConfig: defaultFireConfig,
  updateFireConfig: (config) =>
    set((state) => ({
      fireConfig: { ...state.fireConfig, ...config },
    })),
  resetFireConfig: () => set({ fireConfig: defaultFireConfig }),

  // UI state
  showControls: true,
  toggleControls: () => set((state) => ({ showControls: !state.showControls })),

  // Global animation controls
  isPaused: false,
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  globalSpeed: 1.0,
  setGlobalSpeed: (speed: number) => set({ globalSpeed: Math.max(0.1, Math.min(2.0, speed)) }),

  // Performance monitoring
  showPerformance: false,
  togglePerformance: () => set((state) => ({ showPerformance: !state.showPerformance })),

  // Mouse interaction
  mouseInteraction: false,
  toggleMouseInteraction: () => set((state) => ({ mouseInteraction: !state.mouseInteraction })),

  // Preset management
  userPresets: [],

  savePreset: (name: string, description: string) =>
    set((state) => {
      const config = getCurrentConfig(state);
      const newPreset: Preset = {
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name,
        description,
        animationType: state.activeAnimation,
        config,
        createdAt: Date.now(),
        isDefault: false,
      };
      return { userPresets: [...state.userPresets, newPreset] };
    }),

  loadPreset: (preset: Preset) =>
    set((state) => {
      const updates: Partial<StudioState> = {};

      switch (preset.animationType) {
        case "matrix":
          updates.matrixConfig = preset.config as MatrixConfig;
          break;
        case "fluid":
          updates.fluidConfig = preset.config as FluidConfig;
          break;
        case "aurora":
          updates.auroraConfig = preset.config as AuroraConfig;
          break;
        case "particle":
          updates.particleConfig = preset.config as ParticleConfig;
          break;
        case "glitch":
          updates.glitchConfig = preset.config as GlitchConfig;
          break;
        case "neonTrails":
          updates.neonTrailsConfig = preset.config as NeonTrailsConfig;
          break;
        case "morphBlob":
          updates.morphBlobConfig = preset.config as MorphBlobConfig;
          break;
        case "cosmic":
          updates.cosmicConfig = preset.config as CosmicConfig;
          break;
        case "dnaHelix":
          updates.dnaHelixConfig = preset.config as DNAHelixConfig;
          break;
        case "waveInterference":
          updates.waveInterferenceConfig = preset.config as WaveInterferenceConfig;
          break;
        case "plasma":
          updates.plasmaConfig = preset.config as PlasmaConfig;
          break;
        case "fractal":
          updates.fractalConfig = preset.config as FractalConfig;
          break;
        case "lightning":
          updates.lightningConfig = preset.config as LightningConfig;
          break;
        case "tessellation":
          updates.tessellationConfig = preset.config as TessellationConfig;
          break;
        case "fire":
          updates.fireConfig = preset.config as FireConfig;
          break;
      }

      updates.activeAnimation = preset.animationType;
      return updates;
    }),

  deletePreset: (presetId: string) =>
    set((state) => ({
      userPresets: state.userPresets.filter((p) => p.id !== presetId),
    })),

  getPresetsForCurrentAnimation: () => {
    const state = get();
    const defaultPresets = allDefaultPresets[state.activeAnimation];
    const userPresetsForAnim = state.userPresets.filter(
      (p) => p.animationType === state.activeAnimation
    );
    return [...defaultPresets, ...userPresetsForAnim];
  },

  exportPreset: (preset: Preset) => {
    return JSON.stringify(preset, null, 2);
  },

  importPreset: (jsonString: string) =>
    set((state) => {
      try {
        const preset: Preset = JSON.parse(jsonString);
        // Validate preset structure
        if (!preset.id || !preset.name || !preset.animationType || !preset.config) {
          throw new Error("Invalid preset format");
        }
        // Add as user preset
        return { userPresets: [...state.userPresets, { ...preset, isDefault: false }] };
      } catch (error) {
        console.error("Failed to import preset:", error);
        return state;
      }
    }),
    }),
    {
      name: "web3-design-studio-storage",
      partialize: (state) => ({
        userPresets: state.userPresets,
        matrixConfig: state.matrixConfig,
        fluidConfig: state.fluidConfig,
        auroraConfig: state.auroraConfig,
        particleConfig: state.particleConfig,
        glitchConfig: state.glitchConfig,
        neonTrailsConfig: state.neonTrailsConfig,
        morphBlobConfig: state.morphBlobConfig,
        cosmicConfig: state.cosmicConfig,
        dnaHelixConfig: state.dnaHelixConfig,
        waveInterferenceConfig: state.waveInterferenceConfig,
        plasmaConfig: state.plasmaConfig,
        fractalConfig: state.fractalConfig,
        lightningConfig: state.lightningConfig,
        tessellationConfig: state.tessellationConfig,
        fireConfig: state.fireConfig,
        activeAnimation: state.activeAnimation,
        globalSpeed: state.globalSpeed,
        showPerformance: state.showPerformance,
        mouseInteraction: state.mouseInteraction,
      }),
    }
  )
);

// Helper function to get current configuration based on active animation
function getCurrentConfig(state: StudioState): AnimationConfig {
  switch (state.activeAnimation) {
    case "matrix":
      return state.matrixConfig;
    case "fluid":
      return state.fluidConfig;
    case "aurora":
      return state.auroraConfig;
    case "particle":
      return state.particleConfig;
    case "glitch":
      return state.glitchConfig;
    case "neonTrails":
      return state.neonTrailsConfig;
    case "morphBlob":
      return state.morphBlobConfig;
    case "cosmic":
      return state.cosmicConfig;
    case "dnaHelix":
      return state.dnaHelixConfig;
    case "waveInterference":
      return state.waveInterferenceConfig;
    case "plasma":
      return state.plasmaConfig;
    case "fractal":
      return state.fractalConfig;
    case "lightning":
      return state.lightningConfig;
    case "tessellation":
      return state.tessellationConfig;
    case "fire":
      return state.fireConfig;
    default:
      return state.matrixConfig;
  }
}
