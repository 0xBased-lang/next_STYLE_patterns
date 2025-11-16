"use client";

import { useState, useEffect } from "react";
import { X, Keyboard } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function KeyboardShortcutsGuide() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Toggle with "?" key
      if (event.key === "?" && !event.shiftKey) {
        setIsOpen((prev) => !prev);
        event.preventDefault();
      }
      // Also toggle with Shift + /
      if (event.key === "?" && event.shiftKey) {
        setIsOpen((prev) => !prev);
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-3 glass rounded-lg hover:bg-white/10 transition-colors group z-40"
        aria-label="Show keyboard shortcuts"
        title="Keyboard Shortcuts (?)"
      >
        <Keyboard className="w-5 h-5 text-matrix-accent" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="glass rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Keyboard className="w-6 h-6 text-matrix-accent" />
            <h2 className="text-xl font-heading font-semibold text-matrix-text">
              Keyboard Shortcuts
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-matrix-surface rounded-lg transition-colors group"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-matrix-text/60 group-hover:text-matrix-accent transition-colors" />
          </button>
        </div>

        <div className="h-px bg-matrix-accent/20 mb-6" />

        {/* Shortcuts Grid */}
        <div className="space-y-6">
          {/* Animation Selection */}
          <div>
            <h3 className="text-sm font-semibold text-matrix-accent mb-3">Animation Selection</h3>
            <div className="grid grid-cols-2 gap-3">
              <ShortcutItem keyLabel="1" description="Matrix" />
              <ShortcutItem keyLabel="2" description="Fluid" />
              <ShortcutItem keyLabel="3" description="Aurora" />
              <ShortcutItem keyLabel="4" description="Particle" />
              <ShortcutItem keyLabel="5" description="Glitch" />
              <ShortcutItem keyLabel="6" description="Neon Trails" />
              <ShortcutItem keyLabel="7" description="Morph Blob" />
              <ShortcutItem keyLabel="8" description="Cosmic" />
              <ShortcutItem keyLabel="9" description="DNA Helix" />
              <ShortcutItem keyLabel="0" description="Wave Interference" />
              <ShortcutItem keyLabel="-" description="Plasma" />
              <ShortcutItem keyLabel="=" description="Fractal" />
              <ShortcutItem keyLabel="[" description="Lightning" />
              <ShortcutItem keyLabel="]" description="Tessellation" />
              <ShortcutItem keyLabel="\" description="Fire" />
            </div>
          </div>

          {/* Playback Controls */}
          <div>
            <h3 className="text-sm font-semibold text-matrix-accent mb-3">Playback Controls</h3>
            <div className="grid grid-cols-2 gap-3">
              <ShortcutItem keyLabel="Space" description="Pause/Resume animation" />
              <ShortcutItem keyLabel="R" description="Reset current animation" />
              <ShortcutItem keyLabel="↑" description="Increase global speed" />
              <ShortcutItem keyLabel="↓" description="Decrease global speed" />
            </div>
          </div>

          {/* UI Toggles */}
          <div>
            <h3 className="text-sm font-semibold text-matrix-accent mb-3">UI Toggles</h3>
            <div className="grid grid-cols-2 gap-3">
              <ShortcutItem keyLabel="P" description="Toggle performance stats" />
              <ShortcutItem keyLabel="M" description="Toggle mouse interaction" />
              <ShortcutItem keyLabel="C" description="Toggle control panel" />
              <ShortcutItem keyLabel="E" description="Toggle export/import panel" />
              <ShortcutItem keyLabel="I" description="Toggle code inspector" />
              <ShortcutItem keyLabel="Esc" description="Toggle control panel" />
              <ShortcutItem keyLabel="?" description="Toggle this guide" />
            </div>
          </div>
        </div>

        {/* Footer Tip */}
        <div className="mt-6 pt-6 border-t border-matrix-accent/20">
          <p className="text-xs text-matrix-text/50 font-mono text-center">
            Press <span className="text-matrix-accent">?</span> to toggle this guide anytime
          </p>
        </div>
      </div>
    </div>
  );
}

interface ShortcutItemProps {
  keyLabel: string;
  description: string;
}

function ShortcutItem({ keyLabel, description }: ShortcutItemProps) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <kbd className="px-2 py-1 bg-matrix-surface border border-matrix-accent/30 rounded text-matrix-accent font-mono text-xs min-w-[3rem] text-center">
        {keyLabel}
      </kbd>
      <span className="text-matrix-text/70">{description}</span>
    </div>
  );
}
