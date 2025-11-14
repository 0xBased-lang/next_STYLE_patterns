"use client";

import { useStudioStore } from "@/lib/store/studio";
import { MatrixBackground } from "@/components/animations/MatrixBackground";
import { ControlPanel } from "@/components/studio/ControlPanel";

export default function Home() {
  const { matrixConfig } = useStudioStore();

  return (
    <main className="relative min-h-screen bg-matrix-bg overflow-hidden">
      {/* Animated Background */}
      <MatrixBackground config={matrixConfig} />

      {/* Control Panel */}
      <ControlPanel />

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
                ✅ Phase 1: Matrix Animation Complete
              </p>
            </div>
          </div>
          <div className="pt-4">
            <p className="text-matrix-text/50 text-sm font-mono">
              Adjust animation parameters in real-time using the controls →
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
