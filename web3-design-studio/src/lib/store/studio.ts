/**
 * Web3 Design Studio Store
 * Global state management using Zustand
 */

import { create } from "zustand";
import type { MatrixConfig, AnimationType } from "../types/animation";
import { defaultMatrixConfig } from "../types/animation";

interface StudioState {
  // Current active animation
  activeAnimation: AnimationType;
  setActiveAnimation: (animation: AnimationType) => void;

  // Matrix configuration
  matrixConfig: MatrixConfig;
  updateMatrixConfig: (config: Partial<MatrixConfig>) => void;
  resetMatrixConfig: () => void;

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

  // UI state
  showControls: true,
  toggleControls: () => set((state) => ({ showControls: !state.showControls })),
}));
