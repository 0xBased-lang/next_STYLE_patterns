"use client";

import { useStudioStore } from "@/lib/store/studio";
import type { AnimationType } from "@/lib/types/animation";
import { cn } from "@/lib/utils/cn";

const animations: { id: AnimationType; name: string; icon: string; description: string }[] = [
  {
    id: "matrix",
    name: "Matrix",
    icon: "🟢",
    description: "Falling characters",
  },
  {
    id: "fluid",
    name: "Fluid",
    icon: "🟣",
    description: "Organic blobs",
  },
  {
    id: "aurora",
    name: "Aurora",
    icon: "🔵",
    description: "Northern lights",
  },
  {
    id: "particle",
    name: "Particle",
    icon: "💠",
    description: "Connected network",
  },
  {
    id: "glitch",
    name: "Glitch",
    icon: "🌈",
    description: "Cyberpunk RGB",
  },
  {
    id: "neonTrails",
    name: "Neon",
    icon: "✨",
    description: "Tron trails",
  },
];

export function AnimationSelector() {
  const { activeAnimation, setActiveAnimation } = useStudioStore();

  return (
    <div className="fixed top-6 left-6 glass rounded-lg p-2 space-y-2">
      <div className="text-xs text-matrix-text/50 font-mono px-2 py-1">
        Animations
      </div>
      <div className="space-y-1">
        {animations.map((animation) => (
          <button
            key={animation.id}
            onClick={() => setActiveAnimation(animation.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group",
              activeAnimation === animation.id
                ? "bg-matrix-accent/20 border border-matrix-accent/50"
                : "hover:bg-white/5 border border-transparent"
            )}
          >
            <span className="text-2xl">{animation.icon}</span>
            <div className="flex-1 text-left">
              <div
                className={cn(
                  "text-sm font-medium transition-colors",
                  activeAnimation === animation.id
                    ? "text-matrix-accent"
                    : "text-matrix-text/70 group-hover:text-matrix-text"
                )}
              >
                {animation.name}
              </div>
              <div className="text-xs text-matrix-text/40">
                {animation.description}
              </div>
            </div>
            {activeAnimation === animation.id && (
              <div className="w-2 h-2 rounded-full bg-matrix-accent animate-pulse" />
            )}
          </button>
        ))}
      </div>
      <div className="border-t border-matrix-accent/20 pt-2 px-2">
        <div className="text-xs text-matrix-text/30 font-mono">
          Phase 3: 6 Animations
        </div>
      </div>
    </div>
  );
}
