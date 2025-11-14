/**
 * Web3 Design Studio Store
 * Global state management using Zustand
 */

import { create } from "zustand";
import type { MatrixConfig, FluidConfig, AuroraConfig, AnimationType } from "../types/animation";
import { defaultMatrixConfig, defaultFluidConfig, defaultAuroraConfig } from "../types/animation";

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

  // UI state
  showControls: boolean;
  toggleControls: () => void;
}

export const useStudioStore = create<StudioState>((set) => ({
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

  // UI state
  showControls: true,
  toggleControls: () => set((state) => ({ showControls: !state.showControls })),
}));
