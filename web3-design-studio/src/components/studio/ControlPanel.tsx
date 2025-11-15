"use client";

import { useStudioStore } from "@/lib/store/studio";
import { Slider } from "@/components/controls/Slider";
import { ColorPicker } from "@/components/controls/ColorPicker";
import { Settings, RotateCcw, X } from "lucide-react";

export function ControlPanel() {
  const {
    activeAnimation,
    matrixConfig,
    updateMatrixConfig,
    resetMatrixConfig,
    fluidConfig,
    updateFluidConfig,
    resetFluidConfig,
    auroraConfig,
    updateAuroraConfig,
    resetAuroraConfig,
    particleConfig,
    updateParticleConfig,
    resetParticleConfig,
    glitchConfig,
    updateGlitchConfig,
    resetGlitchConfig,
    neonTrailsConfig,
    updateNeonTrailsConfig,
    resetNeonTrailsConfig,
    morphBlobConfig,
    updateMorphBlobConfig,
    resetMorphBlobConfig,
    cosmicConfig,
    updateCosmicConfig,
    resetCosmicConfig,
    dnaHelixConfig,
    updateDNAHelixConfig,
    resetDNAHelixConfig,
    waveInterferenceConfig,
    updateWaveInterferenceConfig,
    resetWaveInterferenceConfig,
    plasmaConfig,
    updatePlasmaConfig,
    resetPlasmaConfig,
    fractalConfig,
    updateFractalConfig,
    resetFractalConfig,
    lightningConfig,
    updateLightningConfig,
    resetLightningConfig,
    tessellationConfig,
    updateTessellationConfig,
    resetTessellationConfig,
    fireConfig,
    updateFireConfig,
    resetFireConfig,
    showControls,
    toggleControls,
  } = useStudioStore();

  if (!showControls) {
    return (
      <button
        onClick={toggleControls}
        className="fixed top-6 right-6 p-3 glass rounded-lg hover:bg-white/10 transition-colors group"
        aria-label="Open controls"
      >
        <Settings className="w-6 h-6 text-matrix-accent group-hover:rotate-90 transition-transform duration-300" />
      </button>
    );
  }

  // Get animation-specific title and reset function
  const getAnimationTitle = () => {
    switch (activeAnimation) {
      case "matrix":
        return "Matrix Controls";
      case "fluid":
        return "Fluid Controls";
      case "aurora":
        return "Aurora Controls";
      case "particle":
        return "Particle Controls";
      case "glitch":
        return "Glitch Controls";
      case "neonTrails":
        return "Neon Trails Controls";
      case "morphBlob":
        return "Morph Blob Controls";
      case "cosmic":
        return "Cosmic Controls";
      case "dnaHelix":
        return "DNA Helix Controls";
      case "waveInterference":
        return "Wave Interference Controls";
      case "plasma":
        return "Plasma Controls";
      default:
        return "Controls";
    }
  };

  const handleReset = () => {
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
  };

  return (
    <div className="fixed top-6 right-6 w-80 glass rounded-xl p-6 space-y-6 animate-slide-in max-h-[calc(100vh-3rem)] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-matrix-accent" />
          <h2 className="text-lg font-heading font-semibold text-matrix-text">
            {getAnimationTitle()}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="p-2 hover:bg-matrix-surface rounded-lg transition-colors group"
            aria-label="Reset to defaults"
            title="Reset to defaults"
          >
            <RotateCcw className="w-4 h-4 text-matrix-text/60 group-hover:text-matrix-accent group-hover:rotate-180 transition-all duration-300" />
          </button>
          <button
            onClick={toggleControls}
            className="p-2 hover:bg-matrix-surface rounded-lg transition-colors group"
            aria-label="Close controls"
          >
            <X className="w-4 h-4 text-matrix-text/60 group-hover:text-matrix-accent transition-colors" />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-matrix-accent/20" />

      {/* Matrix Controls */}
      {activeAnimation === "matrix" && (
        <div className="space-y-4">
          <Slider
            label="Speed"
            value={matrixConfig.speed}
            min={1}
            max={100}
            onChange={(value) => updateMatrixConfig({ speed: value })}
          />

          <Slider
            label="Density"
            value={matrixConfig.density}
            min={1}
            max={100}
            onChange={(value) => updateMatrixConfig({ density: value })}
          />

          <Slider
            label="Font Size"
            value={matrixConfig.fontSize}
            min={10}
            max={40}
            unit="px"
            onChange={(value) => updateMatrixConfig({ fontSize: value })}
          />

          <Slider
            label="Glow"
            value={matrixConfig.glow}
            min={0}
            max={100}
            onChange={(value) => updateMatrixConfig({ glow: value })}
          />

          <Slider
            label="FPS"
            value={matrixConfig.fps}
            min={30}
            max={60}
            onChange={(value) => updateMatrixConfig({ fps: value })}
          />

          <ColorPicker
            label="Color"
            value={matrixConfig.color}
            onChange={(value) => updateMatrixConfig({ color: value })}
          />
        </div>
      )}

      {/* Fluid Controls */}
      {activeAnimation === "fluid" && (
        <div className="space-y-4">
          <Slider
            label="Speed"
            value={fluidConfig.speed}
            min={1}
            max={100}
            onChange={(value) => updateFluidConfig({ speed: value })}
          />

          <Slider
            label="Complexity"
            value={fluidConfig.complexity}
            min={1}
            max={100}
            onChange={(value) => updateFluidConfig({ complexity: value })}
          />

          <Slider
            label="Blur"
            value={fluidConfig.blur}
            min={0}
            max={50}
            unit="px"
            onChange={(value) => updateFluidConfig({ blur: value })}
          />

          <Slider
            label="FPS"
            value={fluidConfig.fps}
            min={30}
            max={60}
            onChange={(value) => updateFluidConfig({ fps: value })}
          />

          <ColorPicker
            label="Color 1"
            value={fluidConfig.color1}
            onChange={(value) => updateFluidConfig({ color1: value })}
          />

          <ColorPicker
            label="Color 2"
            value={fluidConfig.color2}
            onChange={(value) => updateFluidConfig({ color2: value })}
          />
        </div>
      )}

      {/* Aurora Controls */}
      {activeAnimation === "aurora" && (
        <div className="space-y-4">
          <Slider
            label="Speed"
            value={auroraConfig.speed}
            min={1}
            max={100}
            onChange={(value) => updateAuroraConfig({ speed: value })}
          />

          <Slider
            label="Intensity"
            value={auroraConfig.intensity}
            min={1}
            max={100}
            onChange={(value) => updateAuroraConfig({ intensity: value })}
          />

          <Slider
            label="Waves"
            value={auroraConfig.waves}
            min={1}
            max={10}
            onChange={(value) => updateAuroraConfig({ waves: value })}
          />

          <Slider
            label="FPS"
            value={auroraConfig.fps}
            min={30}
            max={60}
            onChange={(value) => updateAuroraConfig({ fps: value })}
          />

          <ColorPicker
            label="Color 1"
            value={auroraConfig.color1}
            onChange={(value) => updateAuroraConfig({ color1: value })}
          />

          <ColorPicker
            label="Color 2"
            value={auroraConfig.color2}
            onChange={(value) => updateAuroraConfig({ color2: value })}
          />

          <ColorPicker
            label="Color 3"
            value={auroraConfig.color3}
            onChange={(value) => updateAuroraConfig({ color3: value })}
          />
        </div>
      )}

      {/* Particle Controls */}
      {activeAnimation === "particle" && (
        <div className="space-y-4">
          <Slider
            label="Speed"
            value={particleConfig.speed}
            min={1}
            max={100}
            onChange={(value) => updateParticleConfig({ speed: value })}
          />

          <Slider
            label="Count"
            value={particleConfig.count}
            min={50}
            max={500}
            onChange={(value) => updateParticleConfig({ count: value })}
          />

          <Slider
            label="Size"
            value={particleConfig.size}
            min={1}
            max={10}
            unit="px"
            onChange={(value) => updateParticleConfig({ size: value })}
          />

          <Slider
            label="Connection Distance"
            value={particleConfig.connectionDistance}
            min={50}
            max={300}
            unit="px"
            onChange={(value) => updateParticleConfig({ connectionDistance: value })}
          />

          <Slider
            label="FPS"
            value={particleConfig.fps}
            min={30}
            max={60}
            onChange={(value) => updateParticleConfig({ fps: value })}
          />

          <ColorPicker
            label="Color"
            value={particleConfig.color}
            onChange={(value) => updateParticleConfig({ color: value })}
          />
        </div>
      )}

      {/* Glitch Controls */}
      {activeAnimation === "glitch" && (
        <div className="space-y-4">
          <Slider
            label="Intensity"
            value={glitchConfig.intensity}
            min={1}
            max={100}
            onChange={(value) => updateGlitchConfig({ intensity: value })}
          />

          <Slider
            label="Frequency"
            value={glitchConfig.frequency}
            min={1}
            max={100}
            onChange={(value) => updateGlitchConfig({ frequency: value })}
          />

          <Slider
            label="Block Size"
            value={glitchConfig.blockSize}
            min={10}
            max={100}
            unit="px"
            onChange={(value) => updateGlitchConfig({ blockSize: value })}
          />

          <Slider
            label="FPS"
            value={glitchConfig.fps}
            min={30}
            max={60}
            onChange={(value) => updateGlitchConfig({ fps: value })}
          />

          <ColorPicker
            label="Color 1"
            value={glitchConfig.color1}
            onChange={(value) => updateGlitchConfig({ color1: value })}
          />

          <ColorPicker
            label="Color 2"
            value={glitchConfig.color2}
            onChange={(value) => updateGlitchConfig({ color2: value })}
          />
        </div>
      )}

      {/* Neon Trails Controls */}
      {activeAnimation === "neonTrails" && (
        <div className="space-y-4">
          <Slider
            label="Speed"
            value={neonTrailsConfig.speed}
            min={1}
            max={100}
            onChange={(value) => updateNeonTrailsConfig({ speed: value })}
          />

          <Slider
            label="Trail Length"
            value={neonTrailsConfig.trailLength}
            min={10}
            max={200}
            onChange={(value) => updateNeonTrailsConfig({ trailLength: value })}
          />

          <Slider
            label="Count"
            value={neonTrailsConfig.count}
            min={5}
            max={50}
            onChange={(value) => updateNeonTrailsConfig({ count: value })}
          />

          <Slider
            label="Width"
            value={neonTrailsConfig.width}
            min={1}
            max={10}
            unit="px"
            onChange={(value) => updateNeonTrailsConfig({ width: value })}
          />

          <Slider
            label="FPS"
            value={neonTrailsConfig.fps}
            min={30}
            max={60}
            onChange={(value) => updateNeonTrailsConfig({ fps: value })}
          />

          <ColorPicker
            label="Color"
            value={neonTrailsConfig.color}
            onChange={(value) => updateNeonTrailsConfig({ color: value })}
          />
        </div>
      )}

      {/* Morph Blob Controls */}
      {activeAnimation === "morphBlob" && (
        <div className="space-y-4">
          <Slider
            label="Speed"
            value={morphBlobConfig.speed}
            min={1}
            max={100}
            onChange={(value) => updateMorphBlobConfig({ speed: value })}
          />

          <Slider
            label="Size"
            value={morphBlobConfig.size}
            min={50}
            max={400}
            unit="px"
            onChange={(value) => updateMorphBlobConfig({ size: value })}
          />

          <Slider
            label="Complexity"
            value={morphBlobConfig.complexity}
            min={3}
            max={20}
            onChange={(value) => updateMorphBlobConfig({ complexity: value })}
          />

          <Slider
            label="Glow"
            value={morphBlobConfig.glow}
            min={0}
            max={100}
            onChange={(value) => updateMorphBlobConfig({ glow: value })}
          />

          <Slider
            label="FPS"
            value={morphBlobConfig.fps}
            min={30}
            max={60}
            onChange={(value) => updateMorphBlobConfig({ fps: value })}
          />

          <ColorPicker
            label="Color"
            value={morphBlobConfig.color}
            onChange={(value) => updateMorphBlobConfig({ color: value })}
          />
        </div>
      )}

      {/* Cosmic Controls */}
      {activeAnimation === "cosmic" && (
        <div className="space-y-4">
          <Slider
            label="Speed"
            value={cosmicConfig.speed}
            min={1}
            max={100}
            onChange={(value) => updateCosmicConfig({ speed: value })}
          />

          <Slider
            label="Star Count"
            value={cosmicConfig.starCount}
            min={100}
            max={1000}
            onChange={(value) => updateCosmicConfig({ starCount: value })}
          />

          <Slider
            label="Nebula Intensity"
            value={cosmicConfig.nebulaIntensity}
            min={1}
            max={100}
            onChange={(value) => updateCosmicConfig({ nebulaIntensity: value })}
          />

          <Slider
            label="FPS"
            value={cosmicConfig.fps}
            min={30}
            max={60}
            onChange={(value) => updateCosmicConfig({ fps: value })}
          />

          <ColorPicker
            label="Color 1"
            value={cosmicConfig.color1}
            onChange={(value) => updateCosmicConfig({ color1: value })}
          />

          <ColorPicker
            label="Color 2"
            value={cosmicConfig.color2}
            onChange={(value) => updateCosmicConfig({ color2: value })}
          />
        </div>
      )}

      {/* DNA Helix Controls */}
      {activeAnimation === "dnaHelix" && (
        <div className="space-y-4">
          <Slider
            label="Speed"
            value={dnaHelixConfig.speed}
            min={1}
            max={100}
            onChange={(value) => updateDNAHelixConfig({ speed: value })}
          />

          <Slider
            label="Helix Radius"
            value={dnaHelixConfig.helixRadius}
            min={50}
            max={200}
            unit="px"
            onChange={(value) => updateDNAHelixConfig({ helixRadius: value })}
          />

          <Slider
            label="Turns"
            value={dnaHelixConfig.turns}
            min={1}
            max={5}
            onChange={(value) => updateDNAHelixConfig({ turns: value })}
          />

          <Slider
            label="Segments"
            value={dnaHelixConfig.segments}
            min={50}
            max={300}
            onChange={(value) => updateDNAHelixConfig({ segments: value })}
          />

          <Slider
            label="Glow Intensity"
            value={dnaHelixConfig.glowIntensity}
            min={0}
            max={100}
            onChange={(value) => updateDNAHelixConfig({ glowIntensity: value })}
          />

          <Slider
            label="FPS"
            value={dnaHelixConfig.fps}
            min={30}
            max={60}
            onChange={(value) => updateDNAHelixConfig({ fps: value })}
          />

          <ColorPicker
            label="Color 1"
            value={dnaHelixConfig.color1}
            onChange={(value) => updateDNAHelixConfig({ color1: value })}
          />

          <ColorPicker
            label="Color 2"
            value={dnaHelixConfig.color2}
            onChange={(value) => updateDNAHelixConfig({ color2: value })}
          />
        </div>
      )}

      {/* Wave Interference Controls */}
      {activeAnimation === "waveInterference" && (
        <div className="space-y-4">
          <Slider
            label="Speed"
            value={waveInterferenceConfig.speed}
            min={1}
            max={100}
            onChange={(value) => updateWaveInterferenceConfig({ speed: value })}
          />

          <Slider
            label="Wavelength"
            value={waveInterferenceConfig.wavelength}
            min={20}
            max={200}
            onChange={(value) => updateWaveInterferenceConfig({ wavelength: value })}
          />

          <Slider
            label="Amplitude"
            value={waveInterferenceConfig.amplitude}
            min={1}
            max={100}
            onChange={(value) => updateWaveInterferenceConfig({ amplitude: value })}
          />

          <Slider
            label="Source Count"
            value={waveInterferenceConfig.sourceCount}
            min={1}
            max={8}
            onChange={(value) => updateWaveInterferenceConfig({ sourceCount: value })}
          />

          <Slider
            label="Resolution"
            value={waveInterferenceConfig.resolution}
            min={1}
            max={100}
            onChange={(value) => updateWaveInterferenceConfig({ resolution: value })}
          />

          <Slider
            label="FPS"
            value={waveInterferenceConfig.fps}
            min={30}
            max={60}
            onChange={(value) => updateWaveInterferenceConfig({ fps: value })}
          />

          <ColorPicker
            label="Color 1"
            value={waveInterferenceConfig.color1}
            onChange={(value) => updateWaveInterferenceConfig({ color1: value })}
          />

          <ColorPicker
            label="Color 2"
            value={waveInterferenceConfig.color2}
            onChange={(value) => updateWaveInterferenceConfig({ color2: value })}
          />
        </div>
      )}

      {/* Plasma Controls */}
      {activeAnimation === "plasma" && (
        <div className="space-y-4">
          <Slider
            label="Speed"
            value={plasmaConfig.speed}
            min={1}
            max={100}
            onChange={(value) => updatePlasmaConfig({ speed: value })}
          />

          <Slider
            label="Intensity"
            value={plasmaConfig.intensity}
            min={1}
            max={100}
            onChange={(value) => updatePlasmaConfig({ intensity: value })}
          />

          <Slider
            label="Complexity"
            value={plasmaConfig.complexity}
            min={1}
            max={100}
            onChange={(value) => updatePlasmaConfig({ complexity: value })}
          />

          <Slider
            label="Scale"
            value={plasmaConfig.scale}
            min={10}
            max={200}
            onChange={(value) => updatePlasmaConfig({ scale: value })}
          />

          <Slider
            label="FPS"
            value={plasmaConfig.fps}
            min={30}
            max={60}
            onChange={(value) => updatePlasmaConfig({ fps: value })}
          />

          <ColorPicker
            label="Color 1"
            value={plasmaConfig.color1}
            onChange={(value) => updatePlasmaConfig({ color1: value })}
          />

          <ColorPicker
            label="Color 2"
            value={plasmaConfig.color2}
            onChange={(value) => updatePlasmaConfig({ color2: value })}
          />

          <ColorPicker
            label="Color 3"
            value={plasmaConfig.color3}
            onChange={(value) => updatePlasmaConfig({ color3: value })}
          />
        </div>
      )}

      {/* Fractal Controls */}
      {activeAnimation === "fractal" && (
        <div className="space-y-4">
          <Slider
            label="Speed"
            value={fractalConfig.speed}
            min={0.1}
            max={2.0}
            step={0.1}
            onChange={(value) => updateFractalConfig({ speed: value })}
          />

          <Slider
            label="Max Iterations"
            value={fractalConfig.maxIterations}
            min={50}
            max={500}
            onChange={(value) => updateFractalConfig({ maxIterations: value })}
          />

          <Slider
            label="Zoom"
            value={fractalConfig.zoom}
            min={1}
            max={1000}
            onChange={(value) => updateFractalConfig({ zoom: value })}
          />

          <Slider
            label="Center X"
            value={fractalConfig.centerX}
            min={-2}
            max={2}
            step={0.1}
            onChange={(value) => updateFractalConfig({ centerX: value })}
          />

          <Slider
            label="Center Y"
            value={fractalConfig.centerY}
            min={-2}
            max={2}
            step={0.1}
            onChange={(value) => updateFractalConfig({ centerY: value })}
          />

          <Slider
            label="Color Shift"
            value={fractalConfig.colorShift}
            min={0}
            max={100}
            onChange={(value) => updateFractalConfig({ colorShift: value })}
          />

          <Slider
            label="FPS"
            value={fractalConfig.fps}
            min={30}
            max={60}
            onChange={(value) => updateFractalConfig({ fps: value })}
          />

          <ColorPicker
            label="Color 1"
            value={fractalConfig.color1}
            onChange={(value) => updateFractalConfig({ color1: value })}
          />

          <ColorPicker
            label="Color 2"
            value={fractalConfig.color2}
            onChange={(value) => updateFractalConfig({ color2: value })}
          />

          <ColorPicker
            label="Color 3"
            value={fractalConfig.color3}
            onChange={(value) => updateFractalConfig({ color3: value })}
          />
        </div>
      )}

      {/* Lightning Controls */}
      {activeAnimation === "lightning" && (
        <div className="space-y-4">
          <Slider
            label="Speed"
            value={lightningConfig.speed}
            min={0.1}
            max={2.0}
            step={0.1}
            onChange={(value) => updateLightningConfig({ speed: value })}
          />

          <Slider
            label="Bolt Count"
            value={lightningConfig.boltCount}
            min={1}
            max={10}
            onChange={(value) => updateLightningConfig({ boltCount: value })}
          />

          <Slider
            label="Branch Probability"
            value={lightningConfig.branchProbability}
            min={0}
            max={100}
            onChange={(value) => updateLightningConfig({ branchProbability: value })}
          />

          <Slider
            label="Thickness"
            value={lightningConfig.thickness}
            min={1}
            max={10}
            onChange={(value) => updateLightningConfig({ thickness: value })}
          />

          <Slider
            label="Glow Intensity"
            value={lightningConfig.glowIntensity}
            min={0}
            max={100}
            onChange={(value) => updateLightningConfig({ glowIntensity: value })}
          />

          <Slider
            label="Segments"
            value={lightningConfig.segments}
            min={10}
            max={100}
            onChange={(value) => updateLightningConfig({ segments: value })}
          />

          <Slider
            label="FPS"
            value={lightningConfig.fps}
            min={30}
            max={60}
            onChange={(value) => updateLightningConfig({ fps: value })}
          />

          <ColorPicker
            label="Primary Color"
            value={lightningConfig.color1}
            onChange={(value) => updateLightningConfig({ color1: value })}
          />

          <ColorPicker
            label="Glow Color"
            value={lightningConfig.color2}
            onChange={(value) => updateLightningConfig({ color2: value })}
          />
        </div>
      )}

      {/* Tessellation Controls */}
      {activeAnimation === "tessellation" && (
        <div className="space-y-4">
          <Slider
            label="Speed"
            value={tessellationConfig.speed}
            min={0.1}
            max={2.0}
            step={0.1}
            onChange={(value) => updateTessellationConfig({ speed: value })}
          />

          <Slider
            label="Cell Count"
            value={tessellationConfig.cellCount}
            min={10}
            max={100}
            onChange={(value) => updateTessellationConfig({ cellCount: value })}
          />

          <Slider
            label="Cell Movement"
            value={tessellationConfig.cellMovement}
            min={0}
            max={100}
            onChange={(value) => updateTessellationConfig({ cellMovement: value })}
          />

          <Slider
            label="Border Width"
            value={tessellationConfig.borderWidth}
            min={0}
            max={10}
            onChange={(value) => updateTessellationConfig({ borderWidth: value })}
          />

          <Slider
            label="Color Variation"
            value={tessellationConfig.colorVariation}
            min={0}
            max={100}
            onChange={(value) => updateTessellationConfig({ colorVariation: value })}
          />

          <Slider
            label="FPS"
            value={tessellationConfig.fps}
            min={30}
            max={60}
            onChange={(value) => updateTessellationConfig({ fps: value })}
          />

          <ColorPicker
            label="Cell Color 1"
            value={tessellationConfig.color1}
            onChange={(value) => updateTessellationConfig({ color1: value })}
          />

          <ColorPicker
            label="Cell Color 2"
            value={tessellationConfig.color2}
            onChange={(value) => updateTessellationConfig({ color2: value })}
          />

          <ColorPicker
            label="Border Color"
            value={tessellationConfig.borderColor}
            onChange={(value) => updateTessellationConfig({ borderColor: value })}
          />
        </div>
      )}

      {/* Fire Controls */}
      {activeAnimation === "fire" && (
        <div className="space-y-4">
          <Slider
            label="Speed"
            value={fireConfig.speed}
            min={0.1}
            max={2.0}
            step={0.1}
            onChange={(value) => updateFireConfig({ speed: value })}
          />

          <Slider
            label="Particle Count"
            value={fireConfig.particleCount}
            min={100}
            max={2000}
            onChange={(value) => updateFireConfig({ particleCount: value })}
          />

          <Slider
            label="Intensity"
            value={fireConfig.intensity}
            min={1}
            max={100}
            onChange={(value) => updateFireConfig({ intensity: value })}
          />

          <Slider
            label="Wind Speed"
            value={fireConfig.windSpeed}
            min={-100}
            max={100}
            onChange={(value) => updateFireConfig({ windSpeed: value })}
          />

          <Slider
            label="Smoke Amount"
            value={fireConfig.smokeAmount}
            min={0}
            max={100}
            onChange={(value) => updateFireConfig({ smokeAmount: value })}
          />

          <Slider
            label="FPS"
            value={fireConfig.fps}
            min={30}
            max={60}
            onChange={(value) => updateFireConfig({ fps: value })}
          />

          <ColorPicker
            label="Core Color (Hot)"
            value={fireConfig.color1}
            onChange={(value) => updateFireConfig({ color1: value })}
          />

          <ColorPicker
            label="Middle Color"
            value={fireConfig.color2}
            onChange={(value) => updateFireConfig({ color2: value })}
          />

          <ColorPicker
            label="Edge Color (Cool)"
            value={fireConfig.color3}
            onChange={(value) => updateFireConfig({ color3: value })}
          />
        </div>
      )}

      {/* Info */}
      <div className="pt-4 border-t border-matrix-accent/20">
        <p className="text-xs text-matrix-text/50 font-mono">
          Phase 5.4: 15 Animation Library
        </p>
      </div>
    </div>
  );
}
