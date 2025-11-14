"use client";

import { useStudioStore } from "@/lib/store/studio";
import { Slider } from "@/components/controls/Slider";
import { ColorPicker } from "@/components/controls/ColorPicker";
import { Settings, RotateCcw, X } from "lucide-react";

export function ControlPanel() {
  const {
    matrixConfig,
    updateMatrixConfig,
    resetMatrixConfig,
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

  return (
    <div className="fixed top-6 right-6 w-80 glass rounded-xl p-6 space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-matrix-accent" />
          <h2 className="text-lg font-heading font-semibold text-matrix-text">
            Matrix Controls
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetMatrixConfig}
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

      {/* Controls */}
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

      {/* Info */}
      <div className="pt-4 border-t border-matrix-accent/20">
        <p className="text-xs text-matrix-text/50 font-mono">
          Phase 1: Matrix Animation
        </p>
      </div>
    </div>
  );
}
