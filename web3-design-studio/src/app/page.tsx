"use client";

import { useStudioStore } from "@/lib/store/studio";
import { MatrixBackground } from "@/components/animations/MatrixBackground";
import { FluidBackground } from "@/components/animations/FluidBackground";
import { AuroraBackground } from "@/components/animations/AuroraBackground";
import { ParticleBackground } from "@/components/animations/ParticleBackground";
import { GlitchBackground } from "@/components/animations/GlitchBackground";
import { NeonTrailsBackground } from "@/components/animations/NeonTrailsBackground";
import { MorphBlobBackground } from "@/components/animations/MorphBlobBackground";
import { CosmicBackground } from "@/components/animations/CosmicBackground";
import { DNAHelixBackground } from "@/components/animations/DNAHelixBackground";
import { WaveInterferenceBackground } from "@/components/animations/WaveInterferenceBackground";
import { PlasmaBackground } from "@/components/animations/PlasmaBackground";
import { ControlPanel } from "@/components/studio/ControlPanel";
import { AnimationSelector } from "@/components/studio/AnimationSelector";
import { PresetManager } from "@/components/studio/PresetManager";
import { GlobalControls } from "@/components/studio/GlobalControls";
import { PerformanceMonitor } from "@/components/studio/PerformanceMonitor";
import { KeyboardShortcutsGuide } from "@/components/studio/KeyboardShortcutsGuide";
import { useKeyboardShortcuts } from "@/lib/hooks/useKeyboardShortcuts";

export default function Home() {
  // Enable keyboard shortcuts
  useKeyboardShortcuts();

  const {
    activeAnimation,
    matrixConfig,
    fluidConfig,
    auroraConfig,
    particleConfig,
    glitchConfig,
    neonTrailsConfig,
    morphBlobConfig,
    cosmicConfig,
    dnaHelixConfig,
    waveInterferenceConfig,
    plasmaConfig,
  } = useStudioStore();

  return (
    <main className="relative min-h-screen bg-matrix-bg overflow-hidden">
      {/* Animated Background - Conditionally render based on active animation */}
      {activeAnimation === "matrix" && <MatrixBackground config={matrixConfig} />}
      {activeAnimation === "fluid" && <FluidBackground config={fluidConfig} />}
      {activeAnimation === "aurora" && <AuroraBackground config={auroraConfig} />}
      {activeAnimation === "particle" && <ParticleBackground config={particleConfig} />}
      {activeAnimation === "glitch" && <GlitchBackground config={glitchConfig} />}
      {activeAnimation === "neonTrails" && <NeonTrailsBackground config={neonTrailsConfig} />}
      {activeAnimation === "morphBlob" && <MorphBlobBackground config={morphBlobConfig} />}
      {activeAnimation === "cosmic" && <CosmicBackground config={cosmicConfig} />}
      {activeAnimation === "dnaHelix" && <DNAHelixBackground config={dnaHelixConfig} />}
      {activeAnimation === "waveInterference" && <WaveInterferenceBackground config={waveInterferenceConfig} />}
      {activeAnimation === "plasma" && <PlasmaBackground config={plasmaConfig} />}

      {/* Animation Selector */}
      <AnimationSelector />

      {/* Control Panel */}
      <ControlPanel />

      {/* Preset Manager */}
      <PresetManager />

      {/* Global Controls */}
      <GlobalControls />

      {/* Performance Monitor */}
      <PerformanceMonitor />

      {/* Keyboard Shortcuts Guide */}
      <KeyboardShortcutsGuide />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-heading text-matrix-accent glow animate-fade-in">
            Web3 Design Studio
          </h1>
          <p className="text-xl text-matrix-text/70 animate-slide-in">
            Visual playground for building animated Web3 interfaces
          </p>
          <div className="pt-8">
            <div className="inline-block px-6 py-3 bg-matrix-accent/10 border border-matrix-accent/30 rounded-lg backdrop-blur-sm">
              <p className="text-matrix-accent font-mono text-sm">
                ✅ Phase 5.3: Interactive Features + Keyboard Shortcuts
              </p>
            </div>
          </div>
          <div className="pt-4 space-y-2">
            <p className="text-matrix-text/50 text-sm font-mono">
              ← 11 Animations • Keyboard Shortcuts • Surprise Me! →
            </p>
            <div className="flex items-center justify-center gap-1 text-xs text-matrix-text/30 font-mono flex-wrap">
              <span>🟢 Matrix</span>
              <span>•</span>
              <span>🟣 Fluid</span>
              <span>•</span>
              <span>🔵 Aurora</span>
              <span>•</span>
              <span>💠 Particle</span>
              <span>•</span>
              <span>🌈 Glitch</span>
              <span>•</span>
              <span>✨ Neon</span>
              <span>•</span>
              <span>💜 Morph</span>
              <span>•</span>
              <span>🌌 Cosmic</span>
              <span>•</span>
              <span>🧬 DNA</span>
              <span>•</span>
              <span>〰️ Waves</span>
              <span>•</span>
              <span>🔥 Plasma</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
