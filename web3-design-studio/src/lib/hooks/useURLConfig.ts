/**
 * URL Configuration Loader Hook
 * Loads animation configuration from URL parameters on page load
 */

import { useEffect } from "react";
import { useStudioStore } from "../store/studio";
import type { AnimationType } from "../types/animation";

export function useURLConfig() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Parse URL parameters
    const params = new URLSearchParams(window.location.search);

    const animation = params.get("animation") as AnimationType | null;
    const configJSON = params.get("config");
    const speed = params.get("speed");
    const mouseInteraction = params.get("mouse");
    const transitionType = params.get("transition");
    const transitionDuration = params.get("transitionDuration");

    // If no parameters, skip
    if (!animation && !configJSON && !speed) return;

    const store = useStudioStore.getState();

    try {
      // Set animation type if provided
      if (animation) {
        const validAnimations: AnimationType[] = [
          "matrix", "fluid", "aurora", "particle", "glitch",
          "neonTrails", "morphBlob", "cosmic", "dnaHelix",
          "waveInterference", "plasma", "fractal", "lightning",
          "tessellation", "fire"
        ];

        if (validAnimations.includes(animation)) {
          store.setActiveAnimation(animation);
        }
      }

      // Parse and set configuration if provided
      if (configJSON) {
        const config = JSON.parse(configJSON);

        // Apply config based on animation type
        const currentAnimation = animation || store.activeAnimation;

        switch (currentAnimation) {
          case "matrix":
            store.updateMatrixConfig(config);
            break;
          case "fluid":
            store.updateFluidConfig(config);
            break;
          case "aurora":
            store.updateAuroraConfig(config);
            break;
          case "particle":
            store.updateParticleConfig(config);
            break;
          case "glitch":
            store.updateGlitchConfig(config);
            break;
          case "neonTrails":
            store.updateNeonTrailsConfig(config);
            break;
          case "morphBlob":
            store.updateMorphBlobConfig(config);
            break;
          case "cosmic":
            store.updateCosmicConfig(config);
            break;
          case "dnaHelix":
            store.updateDNAHelixConfig(config);
            break;
          case "waveInterference":
            store.updateWaveInterferenceConfig(config);
            break;
          case "plasma":
            store.updatePlasmaConfig(config);
            break;
          case "fractal":
            store.updateFractalConfig(config);
            break;
          case "lightning":
            store.updateLightningConfig(config);
            break;
          case "tessellation":
            store.updateTessellationConfig(config);
            break;
          case "fire":
            store.updateFireConfig(config);
            break;
        }
      }

      // Set global speed if provided
      if (speed) {
        const speedValue = parseFloat(speed);
        if (!isNaN(speedValue) && speedValue >= 0.1 && speedValue <= 2.0) {
          store.setGlobalSpeed(speedValue);
        }
      }

      // Set mouse interaction if provided
      if (mouseInteraction === "true" && !store.mouseInteraction) {
        store.toggleMouseInteraction();
      }

      // Set transition type if provided
      if (transitionType && (transitionType === "fade" || transitionType === "crossfade" || transitionType === "none")) {
        store.setTransitionType(transitionType);
      }

      // Set transition duration if provided
      if (transitionDuration) {
        const durationValue = parseInt(transitionDuration);
        if (!isNaN(durationValue)) {
          store.setTransitionDuration(durationValue);
        }
      }

      // Clean up URL after loading (optional - removes params from address bar)
      // window.history.replaceState({}, "", window.location.pathname);

    } catch (error) {
      console.error("Failed to load configuration from URL:", error);
      // Fail silently - don't break the app if URL params are invalid
    }
  }, []); // Only run once on mount
}
