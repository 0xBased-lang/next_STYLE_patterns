/**
 * Preset System Types
 * Defines types for saving and loading animation presets
 */

import type { AnimationType, AnimationConfig } from "./animation";

export interface Preset {
  id: string;
  name: string;
  description: string;
  animationType: AnimationType;
  config: AnimationConfig;
  createdAt: number;
  isDefault: boolean;
}

export interface PresetCollection {
  matrix: Preset[];
  fluid: Preset[];
  aurora: Preset[];
  particle: Preset[];
  glitch: Preset[];
  neonTrails: Preset[];
  morphBlob: Preset[];
  cosmic: Preset[];
}
