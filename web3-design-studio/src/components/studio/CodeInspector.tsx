"use client";

import { useState } from "react";
import { useStudioStore } from "@/lib/store/studio";
import { Code, Copy, Check, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function CodeInspector() {
  const { showCodeInspector, toggleCodeInspector, activeAnimation, exportCurrentConfig } = useStudioStore();
  const [copiedSection, setCopiedSection] = useState<'install' | 'code' | 'config' | null>(null);
  const [activeTab, setActiveTab] = useState<'usage' | 'config'>('usage');

  if (!showCodeInspector) return null;

  const animationNameMap: Record<string, string> = {
    matrix: "Matrix",
    fluid: "Fluid",
    aurora: "Aurora",
    particle: "Particle",
    glitch: "Glitch",
    neonTrails: "NeonTrails",
    morphBlob: "MorphBlob",
    cosmic: "Cosmic",
    dnaHelix: "DNAHelix",
    waveInterference: "WaveInterference",
    plasma: "Plasma",
    fractal: "Fractal",
    lightning: "Lightning",
    tessellation: "Tessellation",
    fire: "Fire",
  };

  const animationName = animationNameMap[activeAnimation] || "Matrix";

  const installCode = `npm install @web3-design-studio/animations
# or
yarn add @web3-design-studio/animations`;

  const usageCode = `import { ${animationName}Background } from '@web3-design-studio/animations';

export function MyComponent() {
  return (
    <div className="relative h-screen">
      <${animationName}Background
        config={{
          // Your configuration here
        }}
      />
      <div className="relative z-10">
        {/* Your content */}
      </div>
    </div>
  );
}`;

  const handleCopy = async (section: 'install' | 'code' | 'config', text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 glass rounded-xl p-4 space-y-4 animate-slide-in w-[600px] max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-matrix-accent" />
          <h3 className="text-sm font-heading font-semibold text-matrix-text">
            Code Inspector
          </h3>
        </div>
        <button
          onClick={toggleCodeInspector}
          className="p-1 rounded-lg hover:bg-matrix-surface/50 transition-colors"
        >
          <X className="w-4 h-4 text-matrix-text/60" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-matrix-accent/20">
        <button
          onClick={() => setActiveTab('usage')}
          className={cn(
            "px-3 py-2 text-sm font-mono transition-all border-b-2",
            activeTab === 'usage'
              ? "border-matrix-accent text-matrix-accent"
              : "border-transparent text-matrix-text/60 hover:text-matrix-text/80"
          )}
        >
          Usage
        </button>
        <button
          onClick={() => setActiveTab('config')}
          className={cn(
            "px-3 py-2 text-sm font-mono transition-all border-b-2",
            activeTab === 'config'
              ? "border-matrix-accent text-matrix-accent"
              : "border-transparent text-matrix-text/60 hover:text-matrix-text/80"
          )}
        >
          Configuration
        </button>
      </div>

      {/* Usage Tab */}
      {activeTab === 'usage' && (
        <div className="space-y-4">
          {/* Installation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-matrix-text/60">Installation</label>
              <button
                onClick={() => handleCopy('install', installCode)}
                className="flex items-center gap-1 px-2 py-1 rounded text-xs font-mono text-matrix-accent hover:bg-matrix-accent/10 transition-colors"
              >
                {copiedSection === 'install' ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-matrix-bg border border-matrix-accent/20 text-xs font-mono text-matrix-text/80 overflow-x-auto">
              {installCode}
            </pre>
          </div>

          {/* Usage Code */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-matrix-text/60">React Component</label>
              <button
                onClick={() => handleCopy('code', usageCode)}
                className="flex items-center gap-1 px-2 py-1 rounded text-xs font-mono text-matrix-accent hover:bg-matrix-accent/10 transition-colors"
              >
                {copiedSection === 'code' ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-matrix-bg border border-matrix-accent/20 text-xs font-mono text-matrix-text/80 overflow-x-auto max-h-64 overflow-y-auto">
              {usageCode}
            </pre>
          </div>

          {/* Info */}
          <div className="p-3 rounded-lg bg-matrix-accent/5 border border-matrix-accent/20">
            <p className="text-xs text-matrix-text/60 leading-relaxed">
              <span className="font-semibold text-matrix-accent">Note:</span> This package
              is currently in development. Use the configuration tab to see your current
              settings and export them for later use.
            </p>
          </div>
        </div>
      )}

      {/* Configuration Tab */}
      {activeTab === 'config' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-matrix-text/60">
                Current Configuration (JSON)
              </label>
              <button
                onClick={() => handleCopy('config', exportCurrentConfig())}
                className="flex items-center gap-1 px-2 py-1 rounded text-xs font-mono text-matrix-accent hover:bg-matrix-accent/10 transition-colors"
              >
                {copiedSection === 'config' ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-matrix-bg border border-matrix-accent/20 text-xs font-mono text-matrix-text/80 overflow-x-auto max-h-96 overflow-y-auto">
              {exportCurrentConfig()}
            </pre>
          </div>

          <div className="p-3 rounded-lg bg-matrix-accent/5 border border-matrix-accent/20">
            <p className="text-xs text-matrix-text/60 leading-relaxed">
              Copy this configuration and use it directly in your React component's config prop.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
