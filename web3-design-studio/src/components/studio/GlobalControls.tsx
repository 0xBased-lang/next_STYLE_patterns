"use client";

import { useStudioStore } from "@/lib/store/studio";
import { Slider } from "@/components/controls/Slider";
import { Play, Pause, Activity, MousePointer, Sparkles, RotateCw, Shuffle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { allDefaultPresets } from "@/lib/presets/defaultPresets";
import type { AnimationType } from "@/lib/types/animation";

export function GlobalControls() {
  const {
    isPaused,
    togglePause,
    globalSpeed,
    setGlobalSpeed,
    showPerformance,
    togglePerformance,
    mouseInteraction,
    toggleMouseInteraction,
    transitionDuration,
    setTransitionDuration,
    transitionType,
    setTransitionType,
    autoRotate,
    toggleAutoRotate,
    autoRotateInterval,
    setAutoRotateInterval,
    setActiveAnimation,
    loadPreset,
  } = useStudioStore();

  const handleSurpriseMe = () => {
    // Get all animation types
    const animationTypes: AnimationType[] = [
      "matrix",
      "fluid",
      "aurora",
      "particle",
      "glitch",
      "neonTrails",
      "morphBlob",
      "cosmic",
      "dnaHelix",
      "waveInterference",
      "plasma",
    ];

    // Pick random animation
    const randomAnimation = animationTypes[Math.floor(Math.random() * animationTypes.length)];

    // Get presets for this animation
    const presetsForAnimation = allDefaultPresets[randomAnimation];

    // Pick random preset
    const randomPreset = presetsForAnimation[Math.floor(Math.random() * presetsForAnimation.length)];

    // Load it
    loadPreset(randomPreset);
  };

  return (
    <div className="fixed bottom-6 left-6 glass rounded-xl p-4 space-y-4 animate-slide-in w-72">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Activity className="w-4 h-4 text-matrix-accent" />
        <h3 className="text-sm font-heading font-semibold text-matrix-text">
          Global Controls
        </h3>
      </div>

      {/* Divider */}
      <div className="h-px bg-matrix-accent/20" />

      {/* Pause/Play Button */}
      <button
        onClick={togglePause}
        className={cn(
          "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all font-medium text-sm",
          isPaused
            ? "bg-matrix-accent/20 hover:bg-matrix-accent/30 text-matrix-accent border border-matrix-accent/40"
            : "bg-matrix-surface hover:bg-matrix-accent/10 text-matrix-text/80 border border-matrix-accent/20"
        )}
      >
        {isPaused ? (
          <>
            <Play className="w-4 h-4" />
            <span>Resume Animation</span>
          </>
        ) : (
          <>
            <Pause className="w-4 h-4" />
            <span>Pause Animation</span>
          </>
        )}
      </button>

      {/* Surprise Me Button */}
      <button
        onClick={handleSurpriseMe}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all font-medium text-sm bg-gradient-to-r from-matrix-accent/20 to-purple-500/20 hover:from-matrix-accent/30 hover:to-purple-500/30 border border-matrix-accent/40 text-matrix-accent group"
      >
        <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        <span>Surprise Me!</span>
      </button>

      {/* Speed Multiplier Slider */}
      <div className="space-y-2">
        <Slider
          label="Global Speed"
          value={globalSpeed}
          min={0.1}
          max={2.0}
          step={0.1}
          unit="x"
          onChange={(value) => setGlobalSpeed(value)}
        />
        <div className="flex justify-between text-xs text-matrix-text/40 font-mono px-1">
          <span>0.1x</span>
          <span>1.0x</span>
          <span>2.0x</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-matrix-accent/20" />

      {/* Toggle Buttons */}
      <div className="space-y-2">
        {/* Performance Monitor Toggle */}
        <button
          onClick={togglePerformance}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-sm",
            showPerformance
              ? "bg-matrix-accent/10 border border-matrix-accent/30"
              : "bg-matrix-surface/50 border border-matrix-accent/10 hover:bg-matrix-surface"
          )}
        >
          <span className="flex items-center gap-2 text-matrix-text/80">
            <Activity className="w-4 h-4" />
            <span className="font-mono">Performance Stats</span>
          </span>
          <div
            className={cn(
              "w-10 h-5 rounded-full transition-all relative",
              showPerformance ? "bg-matrix-accent" : "bg-matrix-surface"
            )}
          >
            <div
              className={cn(
                "absolute top-0.5 w-4 h-4 rounded-full bg-matrix-text transition-all",
                showPerformance ? "left-5" : "left-0.5"
              )}
            />
          </div>
        </button>

        {/* Mouse Interaction Toggle */}
        <button
          onClick={toggleMouseInteraction}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-sm",
            mouseInteraction
              ? "bg-matrix-accent/10 border border-matrix-accent/30"
              : "bg-matrix-surface/50 border border-matrix-accent/10 hover:bg-matrix-surface"
          )}
        >
          <span className="flex items-center gap-2 text-matrix-text/80">
            <MousePointer className="w-4 h-4" />
            <span className="font-mono">Mouse Interaction</span>
          </span>
          <div
            className={cn(
              "w-10 h-5 rounded-full transition-all relative",
              mouseInteraction ? "bg-matrix-accent" : "bg-matrix-surface"
            )}
          >
            <div
              className={cn(
                "absolute top-0.5 w-4 h-4 rounded-full bg-matrix-text transition-all",
                mouseInteraction ? "left-5" : "left-0.5"
              )}
            />
          </div>
        </button>

        {/* Auto-Rotate Toggle */}
        <button
          onClick={toggleAutoRotate}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-sm",
            autoRotate
              ? "bg-matrix-accent/10 border border-matrix-accent/30"
              : "bg-matrix-surface/50 border border-matrix-accent/10 hover:bg-matrix-surface"
          )}
        >
          <span className="flex items-center gap-2 text-matrix-text/80">
            <RotateCw className="w-4 h-4" />
            <span className="font-mono">Auto-Rotate</span>
          </span>
          <div
            className={cn(
              "w-10 h-5 rounded-full transition-all relative",
              autoRotate ? "bg-matrix-accent" : "bg-matrix-surface"
            )}
          >
            <div
              className={cn(
                "absolute top-0.5 w-4 h-4 rounded-full bg-matrix-text transition-all",
                autoRotate ? "left-5" : "left-0.5"
              )}
            />
          </div>
        </button>
      </div>

      {/* Auto-Rotate Interval (only show when enabled) */}
      {autoRotate && (
        <div className="space-y-2 animate-slide-in">
          <Slider
            label="Rotate Interval"
            value={autoRotateInterval / 1000}
            min={3}
            max={60}
            step={1}
            unit="s"
            onChange={(value) => setAutoRotateInterval(value * 1000)}
          />
          <div className="flex justify-between text-xs text-matrix-text/40 font-mono px-1">
            <span>3s</span>
            <span>30s</span>
            <span>60s</span>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-matrix-accent/20" />

      {/* Transition Controls */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <Shuffle className="w-4 h-4 text-matrix-accent" />
          <span className="text-sm font-heading font-semibold text-matrix-text">
            Transitions
          </span>
        </div>

        {/* Transition Type */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-matrix-text/60">Type</label>
          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={() => setTransitionType("none")}
              className={cn(
                "px-2 py-1.5 rounded text-xs font-mono transition-all",
                transitionType === "none"
                  ? "bg-matrix-accent text-matrix-bg"
                  : "bg-matrix-surface/50 text-matrix-text/60 hover:bg-matrix-surface"
              )}
            >
              None
            </button>
            <button
              onClick={() => setTransitionType("fade")}
              className={cn(
                "px-2 py-1.5 rounded text-xs font-mono transition-all",
                transitionType === "fade"
                  ? "bg-matrix-accent text-matrix-bg"
                  : "bg-matrix-surface/50 text-matrix-text/60 hover:bg-matrix-surface"
              )}
            >
              Fade
            </button>
            <button
              onClick={() => setTransitionType("crossfade")}
              className={cn(
                "px-2 py-1.5 rounded text-xs font-mono transition-all",
                transitionType === "crossfade"
                  ? "bg-matrix-accent text-matrix-bg"
                  : "bg-matrix-surface/50 text-matrix-text/60 hover:bg-matrix-surface"
              )}
            >
              Cross
            </button>
          </div>
        </div>

        {/* Transition Duration (only show when not "none") */}
        {transitionType !== "none" && (
          <div className="space-y-2 animate-slide-in">
            <Slider
              label="Duration"
              value={transitionDuration}
              min={100}
              max={2000}
              step={100}
              unit="ms"
              onChange={(value) => setTransitionDuration(value)}
            />
            <div className="flex justify-between text-xs text-matrix-text/40 font-mono px-1">
              <span>100ms</span>
              <span>1000ms</span>
              <span>2000ms</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
