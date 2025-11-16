"use client";

import { useState } from "react";
import { useStudioStore } from "@/lib/store/studio";
import { Download, Link, Copy, Check, X, FileJson } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function ExportPanel() {
  const { showExportPanel, toggleExportPanel, exportCurrentConfig, getShareableURL, activeAnimation } = useStudioStore();
  const [copied, setCopied] = useState<'url' | 'json' | null>(null);

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

      {/* Info Box */}
      <div className="p-3 rounded-lg bg-matrix-accent/5 border border-matrix-accent/20">
        <p className="text-xs text-matrix-text/60 leading-relaxed">
          <span className="font-semibold text-matrix-accent">Tip:</span> Use the exported
          configuration to save your settings or share them with others. Import them later
          by loading the JSON file.
        </p>
      </div>
    </div>
  );
}
