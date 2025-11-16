"use client";

import { useState, useRef } from "react";
import { useStudioStore } from "@/lib/store/studio";
import { Download, Link, Copy, Check, X, FileJson, Upload, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { AnimationType } from "@/lib/types/animation";

export function ExportPanel() {
  const store = useStudioStore();
  const { showExportPanel, toggleExportPanel, exportCurrentConfig, getShareableURL, activeAnimation } = store;
  const [copied, setCopied] = useState<'url' | 'json' | null>(null);
  const [importJSON, setImportJSON] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!showExportPanel) return null;

  const handleCopyURL = async () => {
    const url = getShareableURL();
    await navigator.clipboard.writeText(url);
    setCopied('url');
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCopyJSON = async () => {
    const json = exportCurrentConfig();
    await navigator.clipboard.writeText(json);
    setCopied('json');
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownloadJSON = () => {
    const json = exportCurrentConfig();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeAnimation}-config-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (jsonString: string) => {
    setImportError(null);
    setImportSuccess(false);

    try {
      const data = JSON.parse(jsonString);

      // Validate the structure
      if (!data.animation || !data.config) {
        throw new Error("Invalid configuration format. Missing 'animation' or 'config' fields.");
      }

      // Validate animation type
      const validAnimations: AnimationType[] = [
        "matrix", "fluid", "aurora", "particle", "glitch",
        "neonTrails", "morphBlob", "cosmic", "dnaHelix",
        "waveInterference", "plasma", "fractal", "lightning",
        "tessellation", "fire"
      ];

      if (!validAnimations.includes(data.animation)) {
        throw new Error(`Invalid animation type: ${data.animation}`);
      }

      // Set the animation type
      store.setActiveAnimation(data.animation);

      // Apply the configuration
      switch (data.animation) {
        case "matrix":
          store.updateMatrixConfig(data.config);
          break;
        case "fluid":
          store.updateFluidConfig(data.config);
          break;
        case "aurora":
          store.updateAuroraConfig(data.config);
          break;
        case "particle":
          store.updateParticleConfig(data.config);
          break;
        case "glitch":
          store.updateGlitchConfig(data.config);
          break;
        case "neonTrails":
          store.updateNeonTrailsConfig(data.config);
          break;
        case "morphBlob":
          store.updateMorphBlobConfig(data.config);
          break;
        case "cosmic":
          store.updateCosmicConfig(data.config);
          break;
        case "dnaHelix":
          store.updateDNAHelixConfig(data.config);
          break;
        case "waveInterference":
          store.updateWaveInterferenceConfig(data.config);
          break;
        case "plasma":
          store.updatePlasmaConfig(data.config);
          break;
        case "fractal":
          store.updateFractalConfig(data.config);
          break;
        case "lightning":
          store.updateLightningConfig(data.config);
          break;
        case "tessellation":
          store.updateTessellationConfig(data.config);
          break;
        case "fire":
          store.updateFireConfig(data.config);
          break;
      }

      // Apply global settings if available
      if (data.globalSettings) {
        if (typeof data.globalSettings.speed === "number") {
          store.setGlobalSpeed(data.globalSettings.speed);
        }
        if (typeof data.globalSettings.mouseInteraction === "boolean" &&
            data.globalSettings.mouseInteraction !== store.mouseInteraction) {
          store.toggleMouseInteraction();
        }
        if (data.globalSettings.transitionType) {
          store.setTransitionType(data.globalSettings.transitionType);
        }
        if (typeof data.globalSettings.transitionDuration === "number") {
          store.setTransitionDuration(data.globalSettings.transitionDuration);
        }
      }

      setImportSuccess(true);
      setImportJSON("");
      setTimeout(() => setImportSuccess(false), 3000);

    } catch (error) {
      setImportError(error instanceof Error ? error.message : "Invalid JSON format");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      handleImportJSON(content);
    };
    reader.readAsText(file);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePasteImport = () => {
    if (importJSON.trim()) {
      handleImportJSON(importJSON);
    }
  };

  return (
    <div className="fixed top-6 right-6 glass rounded-xl p-4 space-y-4 animate-slide-in w-80 max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileJson className="w-4 h-4 text-matrix-accent" />
          <h3 className="text-sm font-heading font-semibold text-matrix-text">
            Export & Share
          </h3>
        </div>
        <button
          onClick={toggleExportPanel}
          className="p-1 rounded-lg hover:bg-matrix-surface/50 transition-colors"
        >
          <X className="w-4 h-4 text-matrix-text/60" />
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-matrix-accent/20" />

      {/* Shareable URL */}
      <div className="space-y-2">
        <label className="text-xs font-mono text-matrix-text/60">Shareable Link</label>
        <button
          onClick={handleCopyURL}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-sm border",
            copied === 'url'
              ? "bg-green-500/10 border-green-500/30"
              : "bg-matrix-surface/50 border-matrix-accent/20 hover:bg-matrix-surface hover:border-matrix-accent/40"
          )}
        >
          <span className="flex items-center gap-2 text-matrix-text/80">
            <Link className="w-4 h-4" />
            <span className="font-mono">Copy URL</span>
          </span>
          {copied === 'url' ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-matrix-accent" />
          )}
        </button>
        <p className="text-xs text-matrix-text/40 px-1">
          Share this URL to reproduce the current animation settings
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-matrix-accent/20" />

      {/* Export Configuration */}
      <div className="space-y-2">
        <label className="text-xs font-mono text-matrix-text/60">Configuration File</label>

        {/* Copy JSON */}
        <button
          onClick={handleCopyJSON}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-sm border",
            copied === 'json'
              ? "bg-green-500/10 border-green-500/30"
              : "bg-matrix-surface/50 border-matrix-accent/20 hover:bg-matrix-surface hover:border-matrix-accent/40"
          )}
        >
          <span className="flex items-center gap-2 text-matrix-text/80">
            <Copy className="w-4 h-4" />
            <span className="font-mono">Copy JSON</span>
          </span>
          {copied === 'json' ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <FileJson className="w-4 h-4 text-matrix-accent" />
          )}
        </button>

        {/* Download JSON */}
        <button
          onClick={handleDownloadJSON}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-sm border bg-matrix-accent/10 border-matrix-accent/30 hover:bg-matrix-accent/20"
        >
          <span className="flex items-center gap-2 text-matrix-accent">
            <Download className="w-4 h-4" />
            <span className="font-mono">Download JSON</span>
          </span>
        </button>

        <p className="text-xs text-matrix-text/40 px-1">
          Export the current configuration as a JSON file
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-matrix-accent/20" />

      {/* Import Configuration */}
      <div className="space-y-2">
        <label className="text-xs font-mono text-matrix-text/60">Import Configuration</label>

        {/* File Upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-sm border bg-matrix-surface/50 border-matrix-accent/20 hover:bg-matrix-surface hover:border-matrix-accent/40"
        >
          <span className="flex items-center gap-2 text-matrix-text/80">
            <Upload className="w-4 h-4" />
            <span className="font-mono">Upload JSON File</span>
          </span>
        </button>

        {/* Paste JSON */}
        <div className="space-y-2">
          <textarea
            value={importJSON}
            onChange={(e) => setImportJSON(e.target.value)}
            placeholder="Or paste JSON configuration here..."
            className="w-full h-24 px-3 py-2 rounded-lg bg-matrix-bg border border-matrix-accent/20 text-matrix-text/80 text-xs font-mono resize-none focus:outline-none focus:border-matrix-accent/40"
          />
          <button
            onClick={handlePasteImport}
            disabled={!importJSON.trim()}
            className={cn(
              "w-full px-3 py-2 rounded-lg transition-all text-sm font-mono",
              importJSON.trim()
                ? "bg-matrix-accent/10 border border-matrix-accent/30 hover:bg-matrix-accent/20 text-matrix-accent"
                : "bg-matrix-surface/30 border border-matrix-accent/10 text-matrix-text/40 cursor-not-allowed"
            )}
          >
            Import from Paste
          </button>
        </div>

        {/* Success Message */}
        {importSuccess && (
          <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/30 animate-slide-in">
            <p className="text-xs text-green-500 flex items-center gap-2">
              <Check className="w-3 h-3" />
              <span>Configuration imported successfully!</span>
            </p>
          </div>
        )}

        {/* Error Message */}
        {importError && (
          <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 animate-slide-in">
            <p className="text-xs text-red-500 flex items-start gap-2">
              <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span>{importError}</span>
            </p>
          </div>
        )}

        <p className="text-xs text-matrix-text/40 px-1">
          Import previously exported configurations
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-matrix-accent/20" />

      {/* Info Box */}
      <div className="p-3 rounded-lg bg-matrix-accent/5 border border-matrix-accent/20">
        <p className="text-xs text-matrix-text/60 leading-relaxed">
          <span className="font-semibold text-matrix-accent">Tip:</span> Use the exported
          configuration to save your settings or share them with others. Import them later
          by loading the JSON file or pasting the JSON directly.
        </p>
      </div>
    </div>
  );
}
