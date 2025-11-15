/**
 * Keyboard Shortcuts Hook
 * Global keyboard shortcuts for animation control
 */

import { useEffect } from "react";
import { useStudioStore } from "../store/studio";
import type { AnimationType } from "../types/animation";

const ANIMATION_KEYS: Record<string, AnimationType> = {
  "1": "matrix",
  "2": "fluid",
  "3": "aurora",
  "4": "particle",
  "5": "glitch",
  "6": "neonTrails",
  "7": "morphBlob",
  "8": "cosmic",
  "9": "dnaHelix",
  "0": "waveInterference",
  "-": "plasma", // Extra key for 11th animation
};

export function useKeyboardShortcuts() {
  const {
    setActiveAnimation,
    togglePause,
    togglePerformance,
    toggleMouseInteraction,
    toggleControls,
    activeAnimation,
    resetMatrixConfig,
    resetFluidConfig,
    resetAuroraConfig,
    resetParticleConfig,
    resetGlitchConfig,
    resetNeonTrailsConfig,
    resetMorphBlobConfig,
    resetCosmicConfig,
    resetDNAHelixConfig,
    resetWaveInterferenceConfig,
    resetPlasmaConfig,
    setGlobalSpeed,
    globalSpeed,
  } = useStudioStore();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = event.key.toLowerCase();

      // Number keys: Switch animations (1-9, 0, -)
      if (key in ANIMATION_KEYS) {
        setActiveAnimation(ANIMATION_KEYS[key]);
        event.preventDefault();
        return;
      }

      // Space: Pause/Resume
      if (key === " " || key === "spacebar") {
        togglePause();
        event.preventDefault();
        return;
      }

      // R: Reset current animation config
      if (key === "r") {
        switch (activeAnimation) {
          case "matrix":
            resetMatrixConfig();
            break;
          case "fluid":
            resetFluidConfig();
            break;
          case "aurora":
            resetAuroraConfig();
            break;
          case "particle":
            resetParticleConfig();
            break;
          case "glitch":
            resetGlitchConfig();
            break;
          case "neonTrails":
            resetNeonTrailsConfig();
            break;
          case "morphBlob":
            resetMorphBlobConfig();
            break;
          case "cosmic":
            resetCosmicConfig();
            break;
          case "dnaHelix":
            resetDNAHelixConfig();
            break;
          case "waveInterference":
            resetWaveInterferenceConfig();
            break;
          case "plasma":
            resetPlasmaConfig();
            break;
        }
        event.preventDefault();
        return;
      }

      // P: Toggle performance monitor
      if (key === "p") {
        togglePerformance();
        event.preventDefault();
        return;
      }

      // M: Toggle mouse interaction
      if (key === "m") {
        toggleMouseInteraction();
        event.preventDefault();
        return;
      }

      // C or Escape: Toggle control panel
      if (key === "c" || key === "escape" || key === "esc") {
        toggleControls();
        event.preventDefault();
        return;
      }

      // Arrow Up/Down: Adjust global speed
      if (key === "arrowup") {
        const newSpeed = Math.min(2.0, globalSpeed + 0.1);
        setGlobalSpeed(Number(newSpeed.toFixed(1)));
        event.preventDefault();
        return;
      }

      if (key === "arrowdown") {
        const newSpeed = Math.max(0.1, globalSpeed - 0.1);
        setGlobalSpeed(Number(newSpeed.toFixed(1)));
        event.preventDefault();
        return;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    activeAnimation,
    setActiveAnimation,
    togglePause,
    togglePerformance,
    toggleMouseInteraction,
    toggleControls,
    resetMatrixConfig,
    resetFluidConfig,
    resetAuroraConfig,
    resetParticleConfig,
    resetGlitchConfig,
    resetNeonTrailsConfig,
    resetMorphBlobConfig,
    resetCosmicConfig,
    resetDNAHelixConfig,
    resetWaveInterferenceConfig,
    resetPlasmaConfig,
    setGlobalSpeed,
    globalSpeed,
  ]);
}
