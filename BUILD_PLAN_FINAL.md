# Web3 Design Studio - Complete Build Plan
## Ready to Build: Comprehensive Implementation Guide

**Date:** 2025-11-14
**Status:** READY TO START
**Goal:** Build a flexible, playful Web3 interface design playground

---

## 🎯 What We're Building (Final Vision)

### The Product

**Name:** Web3 Design Studio (working title)

**One-Line Description:**
A visual playground where you build animated Web3 trading interfaces by dragging components, adjusting sliders, and seeing instant results - then export production-ready code.

**Core Experience:**
```
User opens studio
→ Sees Matrix rain animation
→ Drags "Swap Widget" onto canvas
→ Moves slider: Matrix speed changes instantly
→ Changes color: Green → Purple, updates in real-time
→ Adjusts swap widget: glass effect, border radius, colors
→ Clicks "Export Code"
→ Downloads working Next.js project
→ Deploys to Vercel in 1 click
```

### Key Innovation

**What makes this special:**
- ✨ **Real-time visual feedback** (not code-first)
- 🎮 **Playful experimentation** (not rigid templates)
- 🔗 **Data-driven animations** (link speed to trading volume)
- 📤 **Production code export** (not just mockups)
- 🌐 **Actual Web3 functionality** (real swaps, real data)

---

## 🏗️ Technical Architecture (Locked)

### Stack Decision Matrix

| Technology | Choice | Why |
|------------|--------|-----|
| **Framework** | Next.js 15 (App Router) | Latest, best DX, Vercel deployment |
| **Language** | TypeScript (strict) | Type safety, better DX, catches bugs early |
| **Styling** | Tailwind CSS 4 | Fastest for prototyping, excellent with animations |
| **Animations** | Framer Motion 12 | Best React animation library, great performance |
| **Canvas** | HTML5 Canvas API | Best for psychedelic backgrounds, 60 FPS |
| **State** | Zustand | Simple, no boilerplate, performant |
| **DnD** | @dnd-kit/core | Modern, accessible, performant |
| **Resize** | re-resizable | Simple, works well with React |
| **Web3** | @solana/web3.js | Starting with Solana (faster, cheaper) |
| **Charts** | lightweight-charts | TradingView quality, free, performant |
| **Icons** | lucide-react | Beautiful, tree-shakeable, free |

### Project Structure (Final)

```
web3-design-studio/
├── src/
│   ├── app/                          # Next.js 15 App Router
│   │   ├── layout.tsx                # Root layout with providers
│   │   ├── page.tsx                  # Main studio page
│   │   ├── globals.css               # Global styles
│   │   └── api/                      # API routes (if needed)
│   │
│   ├── components/
│   │   ├── studio/                   # Studio UI components
│   │   │   ├── StudioLayout.tsx     # Main 3-panel layout
│   │   │   ├── Canvas.tsx           # Center canvas area
│   │   │   ├── ComponentLibrary.tsx # Left panel
│   │   │   ├── ControlPanel.tsx     # Right panel
│   │   │   ├── Header.tsx           # Top header
│   │   │   └── Toolbar.tsx          # Bottom toolbar
│   │   │
│   │   ├── animations/               # Psychedelic backgrounds
│   │   │   ├── MatrixBackground.tsx
│   │   │   ├── FluidBackground.tsx
│   │   │   ├── AuroraBackground.tsx
│   │   │   ├── NeonBackground.tsx
│   │   │   ├── GlitchBackground.tsx
│   │   │   ├── BlobBackground.tsx
│   │   │   ├── ParticleBackground.tsx
│   │   │   └── types.ts             # Shared animation types
│   │   │
│   │   ├── trading/                  # Trading components
│   │   │   ├── SwapWidget.tsx
│   │   │   ├── PriceChart.tsx
│   │   │   ├── WalletButton.tsx
│   │   │   ├── TokenList.tsx
│   │   │   ├── PortfolioCard.tsx
│   │   │   └── types.ts
│   │   │
│   │   ├── controls/                 # Parameter controls
│   │   │   ├── Slider.tsx
│   │   │   ├── ColorPicker.tsx
│   │   │   ├── Toggle.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── NumberInput.tsx
│   │   │   └── ControlSection.tsx
│   │   │
│   │   └── ui/                       # Base UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── Label.tsx
│   │       ├── Separator.tsx
│   │       └── Tooltip.tsx
│   │
│   ├── lib/
│   │   ├── store/                    # Zustand stores
│   │   │   ├── studio.ts            # Main studio state
│   │   │   ├── animation.ts         # Animation configs
│   │   │   ├── components.ts        # Canvas components
│   │   │   └── theme.ts             # Theme state
│   │   │
│   │   ├── hooks/                    # Custom React hooks
│   │   │   ├── useAnimation.ts
│   │   │   ├── useCanvas.ts
│   │   │   ├── useDebounce.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   └── usePerformance.ts
│   │   │
│   │   ├── animations/               # Animation engines
│   │   │   ├── MatrixEngine.ts      # Matrix animation logic
│   │   │   ├── FluidEngine.ts       # Fluid dynamics
│   │   │   ├── BaseEngine.ts        # Shared animation base
│   │   │   └── utils.ts             # Animation utilities
│   │   │
│   │   ├── export/                   # Code generation
│   │   │   ├── generator.ts         # Main code generator
│   │   │   ├── templates.ts         # Code templates
│   │   │   └── utils.ts             # Export utilities
│   │   │
│   │   ├── web3/                     # Web3 integration
│   │   │   ├── solana.ts            # Solana utilities
│   │   │   ├── jupiter.ts           # Jupiter aggregator
│   │   │   └── wallet.ts            # Wallet connection
│   │   │
│   │   ├── api/                      # API clients
│   │   │   ├── dexscreener.ts       # DEX Screener API
│   │   │   ├── coingecko.ts         # CoinGecko API
│   │   │   └── types.ts             # API types
│   │   │
│   │   ├── types/                    # TypeScript types
│   │   │   ├── studio.ts            # Studio types
│   │   │   ├── animation.ts         # Animation types
│   │   │   ├── component.ts         # Component types
│   │   │   └── theme.ts             # Theme types
│   │   │
│   │   └── utils/                    # Utility functions
│   │       ├── cn.ts                # Class name utility
│   │       ├── colors.ts            # Color utilities
│   │       ├── performance.ts       # Performance utils
│   │       └── validation.ts        # Validation helpers
│   │
│   └── styles/
│       └── globals.css               # Global CSS + Tailwind
│
├── public/
│   ├── presets/                      # Saved preset configs
│   ├── exports/                      # Generated code exports
│   └── assets/                       # Static assets
│
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── README.md
```

---

## 📋 Phase-by-Phase Implementation Plan

### PHASE 0: Project Setup (Today - 2-3 hours)

#### Goal
Get the development environment ready with all dependencies installed and basic structure in place.

#### Tasks

**1. Create Next.js Project**
```bash
npx create-next-app@latest web3-design-studio \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-git

cd web3-design-studio
```

**2. Install Core Dependencies**
```bash
# State management & animations
npm install zustand framer-motion

# Drag & drop
npm install @dnd-kit/core @dnd-kit/utilities

# Resize
npm install re-resizable

# Utilities
npm install clsx tailwind-merge lucide-react

# Date handling
npm install date-fns

# Color manipulation
npm install colord

# Dev dependencies
npm install -D @types/node
```

**3. Install Web3 Dependencies (Solana)**
```bash
npm install \
  @solana/web3.js \
  @solana/wallet-adapter-base \
  @solana/wallet-adapter-react \
  @solana/wallet-adapter-react-ui \
  @solana/wallet-adapter-wallets \
  @solana/spl-token
```

**4. Install Chart Library**
```bash
npm install lightweight-charts
```

**5. Set Up Git**
```bash
git init
git add .
git commit -m "Initial setup: Next.js 15 + TypeScript + dependencies"
```

**6. Configure TypeScript (strict mode)**

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    },
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**7. Configure Tailwind**

`tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Matrix theme
        matrix: {
          bg: "#0a0e0a",
          surface: "#1a1f1a",
          accent: "#00ff41",
          text: "#00ff41",
        },
        // Cosmic theme
        cosmic: {
          bg: "#0d0221",
          surface: "#1a0437",
          accent: "#b565d8",
          text: "#f5f5f5",
        },
        // Neon theme
        neon: {
          bg: "#0a0a1a",
          surface: "#1a1a2e",
          accent: "#00d9ff",
          accent2: "#ff00d9",
          text: "#ffffff",
        },
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-in": "slideIn 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

**8. Create Utility Functions**

`src/lib/utils/cn.ts`:
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**9. Set Up Basic Layout**

`src/app/layout.tsx`:
```typescript
import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: "Web3 Design Studio",
  description: "Visual playground for building animated Web3 interfaces",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

`src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --font-inter: "Inter", sans-serif;
    --font-space-grotesk: "Space Grotesk", sans-serif;
    --font-jetbrains-mono: "JetBrains Mono", monospace;
  }

  body {
    @apply bg-matrix-bg text-matrix-text;
  }
}

@layer utilities {
  .glass {
    @apply bg-white/5 backdrop-blur-lg border border-white/10;
  }

  .glow {
    box-shadow: 0 0 20px theme('colors.matrix.accent');
  }
}
```

**10. Deploy to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to your Vercel account
# - Create new project
# - Deploy
```

#### Deliverable
✅ Next.js 15 project with all dependencies
✅ TypeScript configured (strict mode)
✅ Tailwind configured with custom themes
✅ Font setup (Inter, Space Grotesk, JetBrains Mono)
✅ Utility functions ready
✅ Deployed to Vercel (empty but working)

#### Time Estimate
2-3 hours (including setup, config, and deployment)

---

### PHASE 1: Matrix Background + Controls (Days 1-3)

#### Goal
Build ONE complete animation (Matrix) with full parameter controls and real-time updates.

#### What We're Building

**Visual Result:**
```
┌────────────────────────────────────────────────────┐
│  Web3 Design Studio                     [Settings] │
├─────────────────────────┬──────────────────────────┤
│                         │                          │
│  MATRIX BACKGROUND      │  ANIMATION CONTROLS      │
│  (Full canvas)          │                          │
│                         │  🎭 Matrix Conspiracy    │
│  Green characters       │                          │
│  falling vertically     │  ⚡ Performance          │
│  in real-time          │  Speed: [━━━○─] 45       │
│                         │  FPS: [━━━━━○] 60        │
│  Instantly updates      │                          │
│  as you adjust →        │  🎨 Appearance           │
│                         │  Color: [🎨] #00ff41     │
│                         │  Density: [━━○──] 0.02   │
│                         │  Glow: [━━━━○] 0.7       │
│                         │  Font: [━━○──] 14px      │
│                         │                          │
│                         │  💾 Actions              │
│                         │  [Save Preset]           │
│                         │  [Export Code]           │
│                         │  [Reset Defaults]        │
└─────────────────────────┴──────────────────────────┘
```

#### Implementation Steps

**Step 1: Create Animation Types**

`src/lib/types/animation.ts`:
```typescript
export interface MatrixConfig {
  speed: number; // 0-100
  color: string; // hex color
  density: number; // 0-1
  glowIntensity: number; // 0-1
  fontSize: number; // 10-40
  fps: number; // 30 | 60 | 120
}

export interface AnimationEngine {
  start: () => void;
  stop: () => void;
  updateConfig: (config: Partial<MatrixConfig>) => void;
  getConfig: () => MatrixConfig;
}

export const DEFAULT_MATRIX_CONFIG: MatrixConfig = {
  speed: 45,
  color: "#00ff41",
  density: 0.02,
  glowIntensity: 0.7,
  fontSize: 14,
  fps: 60,
};
```

**Step 2: Build Matrix Animation Engine**

`src/lib/animations/MatrixEngine.ts`:
```typescript
import type { MatrixConfig, AnimationEngine } from "@/lib/types/animation";

export class MatrixEngine implements AnimationEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private config: MatrixConfig;
  private columns: number[] = [];
  private animationId: number | null = null;
  private lastFrame: number = 0;

  constructor(canvas: HTMLCanvasElement, config: MatrixConfig) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context");
    this.ctx = ctx;
    this.config = config;
    this.initialize();
  }

  private initialize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    const columnCount = Math.floor(this.canvas.width / this.config.fontSize);
    this.columns = new Array(columnCount).fill(1);
  }

  start() {
    this.lastFrame = performance.now();
    this.animate();
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private animate = () => {
    const now = performance.now();
    const elapsed = now - this.lastFrame;
    const frameTime = 1000 / this.config.fps;

    if (elapsed > frameTime) {
      this.draw();
      this.lastFrame = now - (elapsed % frameTime);
    }

    this.animationId = requestAnimationFrame(this.animate);
  };

  private draw() {
    // Semi-transparent black background (creates trail effect)
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Set text properties
    this.ctx.fillStyle = this.config.color;
    this.ctx.font = `${this.config.fontSize}px monospace`;

    // Add glow effect if enabled
    if (this.config.glowIntensity > 0) {
      this.ctx.shadowBlur = this.config.glowIntensity * 20;
      this.ctx.shadowColor = this.config.color;
    }

    // Draw falling characters
    for (let i = 0; i < this.columns.length; i++) {
      // Random character (Katakana range)
      const char = String.fromCharCode(0x30a0 + Math.random() * 96);
      const x = i * this.config.fontSize;
      const y = this.columns[i] * this.config.fontSize;

      this.ctx.fillText(char, x, y);

      // Reset column randomly based on density
      if (y > this.canvas.height && Math.random() > 1 - this.config.density) {
        this.columns[i] = 0;
      }

      // Move column down based on speed
      this.columns[i] += this.config.speed / 50;
    }
  }

  updateConfig(newConfig: Partial<MatrixConfig>) {
    this.config = { ...this.config, ...newConfig };

    // Reinitialize if font size changed
    if (newConfig.fontSize) {
      this.initialize();
    }
  }

  getConfig(): MatrixConfig {
    return { ...this.config };
  }
}
```

**Step 3: Create React Component**

`src/components/animations/MatrixBackground.tsx`:
```typescript
"use client";

import { useEffect, useRef } from "react";
import type { MatrixConfig } from "@/lib/types/animation";
import { MatrixEngine } from "@/lib/animations/MatrixEngine";

interface MatrixBackgroundProps {
  config: MatrixConfig;
}

export function MatrixBackground({ config }: MatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<MatrixEngine | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize engine
    engineRef.current = new MatrixEngine(canvas, config);
    engineRef.current.start();

    // Handle resize
    const handleResize = () => {
      if (engineRef.current) {
        engineRef.current.stop();
        engineRef.current = new MatrixEngine(canvas, config);
        engineRef.current.start();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      engineRef.current?.stop();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Update config when it changes
  useEffect(() => {
    engineRef.current?.updateConfig(config);
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
```

**Step 4: Create Zustand Store**

`src/lib/store/studio.ts`:
```typescript
import { create } from "zustand";
import { DEFAULT_MATRIX_CONFIG, type MatrixConfig } from "@/lib/types/animation";

interface StudioState {
  matrixConfig: MatrixConfig;
  updateMatrixConfig: (key: keyof MatrixConfig, value: any) => void;
  resetMatrixConfig: () => void;
}

export const useStudio = create<StudioState>((set) => ({
  matrixConfig: DEFAULT_MATRIX_CONFIG,

  updateMatrixConfig: (key, value) =>
    set((state) => ({
      matrixConfig: { ...state.matrixConfig, [key]: value },
    })),

  resetMatrixConfig: () =>
    set({ matrixConfig: DEFAULT_MATRIX_CONFIG }),
}));
```

**Step 5: Create Control Components**

`src/components/controls/Slider.tsx`:
```typescript
"use client";

import { cn } from "@/lib/utils/cn";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  unit?: string;
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  unit,
}: SliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <label className="text-matrix-text">{label}</label>
        <span className="text-matrix-accent font-mono">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          "w-full h-2 bg-matrix-surface rounded-lg appearance-none cursor-pointer",
          "accent-matrix-accent"
        )}
      />
      <div className="flex justify-between text-xs text-matrix-text/50">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
```

`src/components/controls/ColorPicker.tsx`:
```typescript
"use client";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-matrix-text">{label}</label>
      <div className="flex gap-2 items-center">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-12 rounded cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-matrix-surface border border-matrix-accent/20 rounded px-3 py-2 text-matrix-text font-mono text-sm"
          placeholder="#00ff41"
        />
      </div>
    </div>
  );
}
```

**Step 6: Create Control Panel**

`src/components/studio/ControlPanel.tsx`:
```typescript
"use client";

import { useStudio } from "@/lib/store/studio";
import { Slider } from "@/components/controls/Slider";
import { ColorPicker } from "@/components/controls/ColorPicker";
import { Button } from "@/components/ui/Button";

export function ControlPanel() {
  const { matrixConfig, updateMatrixConfig, resetMatrixConfig } = useStudio();

  return (
    <div className="w-96 h-full bg-matrix-surface/50 glass border-l border-matrix-accent/20 p-6 space-y-6 overflow-y-auto">
      <div>
        <h2 className="text-xl font-heading text-matrix-accent mb-2">
          🎭 Matrix Conspiracy
        </h2>
        <p className="text-sm text-matrix-text/70">
          Adjust animation parameters in real-time
        </p>
      </div>

      <div className="space-y-6">
        {/* Performance Section */}
        <section className="space-y-4">
          <h3 className="text-sm font-heading text-matrix-accent">⚡ Performance</h3>

          <Slider
            label="Speed"
            value={matrixConfig.speed}
            min={0}
            max={100}
            onChange={(value) => updateMatrixConfig("speed", value)}
          />

          <div className="space-y-2">
            <label className="text-sm text-matrix-text">FPS</label>
            <div className="grid grid-cols-3 gap-2">
              {[30, 60, 120].map((fps) => (
                <button
                  key={fps}
                  onClick={() => updateMatrixConfig("fps", fps)}
                  className={`px-3 py-2 rounded text-sm font-mono transition-colors ${
                    matrixConfig.fps === fps
                      ? "bg-matrix-accent text-black"
                      : "bg-matrix-surface text-matrix-text hover:bg-matrix-accent/20"
                  }`}
                >
                  {fps}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Appearance Section */}
        <section className="space-y-4">
          <h3 className="text-sm font-heading text-matrix-accent">🎨 Appearance</h3>

          <ColorPicker
            label="Color"
            value={matrixConfig.color}
            onChange={(value) => updateMatrixConfig("color", value)}
          />

          <Slider
            label="Density"
            value={matrixConfig.density}
            min={0}
            max={1}
            step={0.01}
            onChange={(value) => updateMatrixConfig("density", value)}
          />

          <Slider
            label="Glow Intensity"
            value={matrixConfig.glowIntensity}
            min={0}
            max={1}
            step={0.1}
            onChange={(value) => updateMatrixConfig("glowIntensity", value)}
          />

          <Slider
            label="Font Size"
            value={matrixConfig.fontSize}
            min={10}
            max={40}
            unit="px"
            onChange={(value) => updateMatrixConfig("fontSize", value)}
          />
        </section>

        {/* Actions Section */}
        <section className="space-y-3 pt-6 border-t border-matrix-accent/20">
          <Button variant="primary" className="w-full">
            💾 Save Preset
          </Button>
          <Button variant="secondary" className="w-full">
            📤 Export Code
          </Button>
          <Button variant="ghost" className="w-full" onClick={resetMatrixConfig}>
            🔄 Reset Defaults
          </Button>
        </section>
      </div>
    </div>
  );
}
```

**Step 7: Create Main Page**

`src/app/page.tsx`:
```typescript
"use client";

import { useStudio } from "@/lib/store/studio";
import { MatrixBackground } from "@/components/animations/MatrixBackground";
import { ControlPanel } from "@/components/studio/ControlPanel";

export default function StudioPage() {
  const { matrixConfig } = useStudio();

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Background Animation */}
      <MatrixBackground config={matrixConfig} />

      {/* Control Panel */}
      <div className="absolute top-0 right-0 h-full">
        <ControlPanel />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-96 p-6">
        <h1 className="text-3xl font-heading text-matrix-accent glow">
          Web3 Design Studio
        </h1>
        <p className="text-sm text-matrix-text/70 mt-1">
          Visual playground for building animated Web3 interfaces
        </p>
      </div>
    </main>
  );
}
```

#### Deliverable

✅ Working Matrix animation (60 FPS)
✅ Full parameter controls (speed, color, density, glow, fontSize, fps)
✅ Real-time updates (change slider → see instant result)
✅ Beautiful UI (glassmorphism, glow effects)
✅ Save/Export buttons (UI only, functionality in Phase 9)

#### Time Estimate
2-3 days (including testing and polish)

---

### Success Criteria

**Phase 0 Success:**
- [ ] Project created and dependencies installed
- [ ] TypeScript configured (strict mode, no errors)
- [ ] Tailwind configured with custom themes
- [ ] Deployed to Vercel (accessible URL)

**Phase 1 Success:**
- [ ] Matrix animation renders at 60 FPS
- [ ] All sliders work (instant visual feedback)
- [ ] Color picker changes Matrix color
- [ ] FPS selector works (30/60/120)
- [ ] No performance issues or lag
- [ ] UI looks polished (glassmorphism, shadows, glow)
- [ ] Responsive (works on different screen sizes)

---

## 🎯 Let's Start NOW

### Immediate Next Steps

**Right Now (Next 30 minutes):**
1. Create the Next.js project
2. Install all dependencies
3. Set up the basic structure
4. First commit

**Then (Next 2-3 hours):**
1. Build Matrix animation engine
2. Create Zustand store
3. Build control components
4. Wire everything together

**By End of Day:**
Working Matrix playground with sliders!

---

## 🚀 Ready?

I'm ready to start building. Just say the word and I'll:
1. Create the project structure
2. Set up all the files
3. Build the Matrix animation engine
4. Create the controls
5. Get you something working TODAY

**Shall we begin?** 🎨✨
