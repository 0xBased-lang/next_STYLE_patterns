"use client";

import { useStudioStore } from "@/lib/store/studio";
import { Slider } from "@/components/controls/Slider";
import { Play, Pause, Activity, MousePointer } from "lucide-react";
import { cn } from "@/lib/utils/cn";

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
  } = useStudioStore();

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
      </div>
    </div>
  );
}
