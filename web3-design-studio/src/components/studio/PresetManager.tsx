"use client";

import { useState } from "react";
import { useStudioStore } from "@/lib/store/studio";
import { Save, Download, Upload, Trash2, Star, User, X } from "lucide-react";

export function PresetManager() {
  const {
    getPresetsForCurrentAnimation,
    loadPreset,
    savePreset,
    deletePreset,
    exportPreset,
    importPreset,
    activeAnimation,
  } = useStudioStore();

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [presetDescription, setPresetDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const presets = getPresetsForCurrentAnimation();
  const defaultPresets = presets.filter((p) => p.isDefault);
  const userPresets = presets.filter((p) => !p.isDefault);

  const handleSave = () => {
    if (presetName.trim()) {
      savePreset(presetName, presetDescription);
      setPresetName("");
      setPresetDescription("");
      setShowSaveDialog(false);
    }
  };

  const handleExport = (preset: any) => {
    const json = exportPreset(preset);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${preset.name.replace(/\s+/g, "-").toLowerCase()}-preset.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          importPreset(content);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-6 right-6 p-3 glass rounded-lg hover:bg-white/10 transition-colors group"
        aria-label="Open presets"
      >
        <Star className="w-6 h-6 text-matrix-accent group-hover:scale-110 transition-transform" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 glass rounded-xl p-6 space-y-4 animate-slide-in max-h-[calc(100vh-3rem)] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-matrix-accent" />
          <h3 className="text-lg font-heading font-semibold text-matrix-text">
            Presets
          </h3>
        </div>
        <button
          onClick={() => setIsExpanded(false)}
          className="p-2 hover:bg-matrix-surface rounded-lg transition-colors group"
          aria-label="Close presets"
        >
          <X className="w-4 h-4 text-matrix-text/60 group-hover:text-matrix-accent transition-colors" />
        </button>
      </div>

      <div className="h-px bg-matrix-accent/20" />

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setShowSaveDialog(true)}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-matrix-accent/10 hover:bg-matrix-accent/20 border border-matrix-accent/30 rounded-lg transition-colors text-sm"
        >
          <Save className="w-4 h-4" />
          <span>Save</span>
        </button>
        <button
          onClick={handleImport}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-matrix-surface hover:bg-white/10 border border-matrix-accent/20 rounded-lg transition-colors text-sm"
        >
          <Upload className="w-4 h-4" />
          <span>Import</span>
        </button>
        <button
          onClick={() => presets.length > 0 && handleExport(presets[0])}
          disabled={presets.length === 0}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-matrix-surface hover:bg-white/10 border border-matrix-accent/20 rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="p-4 bg-matrix-surface/50 rounded-lg border border-matrix-accent/30 space-y-3">
          <div>
            <label className="text-xs text-matrix-text/70 block mb-1">
              Preset Name
            </label>
            <input
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="My Awesome Preset"
              className="w-full px-3 py-2 bg-matrix-bg border border-matrix-accent/30 rounded text-sm text-matrix-text focus:outline-none focus:border-matrix-accent/60"
            />
          </div>
          <div>
            <label className="text-xs text-matrix-text/70 block mb-1">
              Description (optional)
            </label>
            <input
              type="text"
              value={presetDescription}
              onChange={(e) => setPresetDescription(e.target.value)}
              placeholder="Perfect for evening vibes"
              className="w-full px-3 py-2 bg-matrix-bg border border-matrix-accent/30 rounded text-sm text-matrix-text focus:outline-none focus:border-matrix-accent/60"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={!presetName.trim()}
              className="flex-1 px-4 py-2 bg-matrix-accent text-matrix-bg rounded font-medium text-sm hover:bg-matrix-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Preset
            </button>
            <button
              onClick={() => {
                setShowSaveDialog(false);
                setPresetName("");
                setPresetDescription("");
              }}
              className="px-4 py-2 bg-matrix-surface hover:bg-white/10 rounded text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Default Presets */}
      {defaultPresets.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-matrix-text/50 font-mono">
            <Star className="w-3 h-3" />
            <span>Default Presets</span>
          </div>
          <div className="space-y-1">
            {defaultPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => loadPreset(preset)}
                className="w-full text-left p-3 bg-matrix-surface/30 hover:bg-matrix-surface/60 rounded-lg border border-transparent hover:border-matrix-accent/30 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-matrix-text group-hover:text-matrix-accent transition-colors">
                      {preset.name}
                    </div>
                    <div className="text-xs text-matrix-text/50">
                      {preset.description}
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-matrix-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* User Presets */}
      {userPresets.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-matrix-text/50 font-mono">
            <User className="w-3 h-3" />
            <span>Your Presets</span>
          </div>
          <div className="space-y-1">
            {userPresets.map((preset) => (
              <div
                key={preset.id}
                className="flex items-center gap-2 p-3 bg-matrix-accent/5 hover:bg-matrix-accent/10 rounded-lg border border-matrix-accent/20 transition-all group"
              >
                <button
                  onClick={() => loadPreset(preset)}
                  className="flex-1 text-left"
                >
                  <div className="text-sm font-medium text-matrix-text group-hover:text-matrix-accent transition-colors">
                    {preset.name}
                  </div>
                  <div className="text-xs text-matrix-text/50">
                    {preset.description || "Custom preset"}
                  </div>
                </button>
                <button
                  onClick={() => handleExport(preset)}
                  className="p-2 hover:bg-matrix-surface rounded transition-colors"
                  aria-label="Export preset"
                >
                  <Download className="w-3 h-3 text-matrix-text/60 hover:text-matrix-accent" />
                </button>
                <button
                  onClick={() => deletePreset(preset.id)}
                  className="p-2 hover:bg-red-500/20 rounded transition-colors"
                  aria-label="Delete preset"
                >
                  <Trash2 className="w-3 h-3 text-matrix-text/60 hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="pt-2 border-t border-matrix-accent/20">
        <p className="text-xs text-matrix-text/30 font-mono">
          {activeAnimation.charAt(0).toUpperCase() + activeAnimation.slice(1)} •{" "}
          {defaultPresets.length} default + {userPresets.length} custom
        </p>
      </div>
    </div>
  );
}
