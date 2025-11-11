# 📋 Copy-Paste Examples - FallingGlitch Animation

**Quick reference for copy-paste implementation**

---

## 🚀 QUICKEST START (3 Steps)

### Step 1: Copy Component
Copy `falling-glitch.tsx` to your `components/` folder

### Step 2: Import & Use
```tsx
import { FallingGlitch } from "@/components/falling-glitch";

<div className="fixed inset-0 z-0">
  <FallingGlitch>
    <div />
  </FallingGlitch>
</div>
```

### Step 3: Add Content Layer
```tsx
<div className="relative z-10">
  {/* Your content goes here */}
</div>
```

**Done!** 🎉

---

## 📦 Complete Layout Examples

### Next.js App Router (app/layout.tsx)

```tsx
import { FallingGlitch } from "@/components/falling-glitch";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Matrix Background */}
        <div className="fixed inset-0 z-0">
          <FallingGlitch
            glitchColors={["#9333ea", "#06b6d4", "#a855f7", "#22d3ee"]}
            fallSpeed={1.2}
            glitchIntensity={0.08}
          >
            <div />
          </FallingGlitch>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
```

---

### React SPA (App.tsx)

```tsx
import { FallingGlitch } from "./components/falling-glitch";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen relative">
      {/* Matrix Background */}
      <div className="fixed inset-0 z-0">
        <FallingGlitch
          glitchColors={["#00ff41", "#06b6d4"]}
          fallSpeed={1}
          glitchIntensity={0.05}
        >
          <div />
        </FallingGlitch>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <BrowserRouter>
          <Routes>
            {/* Your routes */}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
```

---

### Vite + React (main.tsx)

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { FallingGlitch } from "./components/falling-glitch";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Matrix Background */}
    <div className="fixed inset-0 z-0">
      <FallingGlitch
        glitchColors={["#ff00ff", "#00ffff", "#ffff00"]}
        fallSpeed={1.5}
        glitchIntensity={0.1}
      >
        <div />
      </FallingGlitch>
    </div>

    {/* Content */}
    <div className="relative z-10">
      <App />
    </div>
  </React.StrictMode>
);
```

---

## 🎨 Ready-to-Use Presets

### 1️⃣ Classic Matrix (Green)
```tsx
<FallingGlitch
  glitchColors={["#00ff41", "#00cc33", "#00aa22"]}
  backgroundColor="rgba(0, 0, 0, 0.95)"
  fontSize={14}
  fallSpeed={1}
  glitchIntensity={0.05}
>
  <div />
</FallingGlitch>
```

---

### 2️⃣ Cyberpunk Neon
```tsx
<FallingGlitch
  glitchColors={["#ff00ff", "#00ffff", "#ffff00", "#ff0080"]}
  backgroundColor="rgba(0, 0, 0, 0.9)"
  fontSize={16}
  fallSpeed={1.5}
  glitchIntensity={0.1}
>
  <div />
</FallingGlitch>
```

---

### 3️⃣ Conspiracy Purple/Cyan (ZMart)
```tsx
<FallingGlitch
  glitchColors={["#9333ea", "#06b6d4", "#a855f7", "#22d3ee"]}
  backgroundColor="rgba(0, 0, 0, 0.95)"
  fontSize={14}
  fallSpeed={1.2}
  glitchIntensity={0.08}
>
  <div />
</FallingGlitch>
```

---

### 4️⃣ Hacker Terminal
```tsx
<FallingGlitch
  glitchColors={["#00ff00", "#00cc00", "#ffff00", "#cccc00"]}
  backgroundColor="rgba(0, 20, 0, 0.95)"
  fontSize={12}
  fallSpeed={2}
  glitchIntensity={0.15}
>
  <div />
</FallingGlitch>
```

---

### 5️⃣ Ice Blue
```tsx
<FallingGlitch
  glitchColors={["#00ffff", "#0099ff", "#66ccff", "#99ddff"]}
  backgroundColor="rgba(0, 10, 20, 0.95)"
  fontSize={14}
  fallSpeed={0.8}
  glitchIntensity={0.04}
>
  <div />
</FallingGlitch>
```

---

### 6️⃣ Fire & Danger
```tsx
<FallingGlitch
  glitchColors={["#ff0000", "#ff6600", "#ff9900", "#ffcc00"]}
  backgroundColor="rgba(20, 0, 0, 0.95)"
  fontSize={16}
  fallSpeed={1.5}
  glitchIntensity={0.12}
>
  <div />
</FallingGlitch>
```

---

### 7️⃣ Vaporwave
```tsx
<FallingGlitch
  glitchColors={["#ff71ce", "#01cdfe", "#05ffa1", "#b967ff"]}
  backgroundColor="rgba(30, 0, 50, 0.92)"
  fontSize={15}
  fallSpeed={1}
  glitchIntensity={0.1}
>
  <div />
</FallingGlitch>
```

---

### 8️⃣ Minimal Grayscale
```tsx
<FallingGlitch
  glitchColors={["#ffffff", "#cccccc", "#999999", "#666666"]}
  backgroundColor="rgba(0, 0, 0, 0.98)"
  fontSize={12}
  fallSpeed={1}
  glitchIntensity={0.03}
>
  <div />
</FallingGlitch>
```

---

## 🎯 Use Case Examples

### Landing Page Hero
```tsx
<section className="relative h-screen">
  {/* Matrix Background */}
  <div className="absolute inset-0 z-0">
    <FallingGlitch
      glitchColors={["#9333ea", "#06b6d4"]}
    >
      <div />
    </FallingGlitch>
  </div>

  {/* Hero Content */}
  <div className="relative z-10 flex items-center justify-center h-full">
    <div className="text-center">
      <h1 className="text-6xl font-bold mb-4">
        Welcome to the Matrix
      </h1>
      <p className="text-xl">
        The future is now
      </p>
    </div>
  </div>
</section>
```

---

### Loading Screen
```tsx
function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* Matrix Background */}
      <div className="absolute inset-0 z-0">
        <FallingGlitch
          glitchColors={["#00ff41"]}
          fallSpeed={2}
        >
          <div />
        </FallingGlitch>
      </div>

      {/* Loading Content */}
      <div className="relative z-10 text-center">
        <div className="text-2xl mb-4">LOADING...</div>
        <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-green-400 animate-pulse" style={{width: "60%"}} />
        </div>
      </div>
    </div>
  );
}
```

---

### 404 Error Page
```tsx
export default function NotFound() {
  return (
    <div className="min-h-screen relative">
      {/* Matrix Background */}
      <div className="fixed inset-0 z-0">
        <FallingGlitch
          glitchColors={["#ff0000", "#ff6600"]}
          fallSpeed={1.5}
          glitchIntensity={0.15}
        >
          <div />
        </FallingGlitch>
      </div>

      {/* Error Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-9xl font-bold mb-4">404</h1>
          <p className="text-2xl mb-8">Page Not Found</p>
          <a href="/" className="px-6 py-3 bg-red-600 rounded">
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
```

---

### Sidebar Background
```tsx
<aside className="relative w-64 h-screen overflow-hidden">
  {/* Matrix Background */}
  <div className="absolute inset-0 z-0">
    <FallingGlitch
      glitchColors={["#06b6d4"]}
      fontSize={10}
      fallSpeed={0.5}
    >
      <div />
    </FallingGlitch>
  </div>

  {/* Sidebar Content */}
  <nav className="relative z-10 p-4">
    {/* Your navigation */}
  </nav>
</aside>
```

---

## 📱 Responsive Examples

### Desktop Only
```tsx
"use client";
import { useState, useEffect } from "react";
import { FallingGlitch } from "@/components/falling-glitch";

export default function Layout({ children }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isDesktop && (
        <div className="fixed inset-0 z-0">
          <FallingGlitch>
            <div />
          </FallingGlitch>
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </>
  );
}
```

---

### Mobile-Optimized Settings
```tsx
"use client";
import { useState, useEffect } from "react";
import { FallingGlitch } from "@/components/falling-glitch";

export default function Layout({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0">
        <FallingGlitch
          fontSize={isMobile ? 18 : 14}
          fallSpeed={isMobile ? 2 : 1}
          glitchIntensity={isMobile ? 0.03 : 0.08}
          glitchColors={isMobile
            ? ["#00ff41", "#06b6d4"]  // 2 colors on mobile
            : ["#00ff41", "#06b6d4", "#9333ea", "#f59e0b"]  // 4 on desktop
          }
        >
          <div />
        </FallingGlitch>
      </div>
      <div className="relative z-10">{children}</div>
    </>
  );
}
```

---

## 🎨 Color Combinations

### Tech/Cyberpunk
```tsx
["#00ff41", "#06b6d4", "#9333ea", "#f59e0b"] // Green, cyan, purple, amber
["#ff00ff", "#00ffff", "#ffff00", "#ff0080"] // Magenta, cyan, yellow, pink
["#ff0000", "#00ff00", "#0000ff", "#ffff00"] // RGB + yellow
```

### Professional
```tsx
["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"] // Blues, purple, cyan, green
["#1e40af", "#7c3aed", "#0891b2", "#059669"] // Darker professional tones
```

### Warm/Fire
```tsx
["#ff0000", "#ff6600", "#ff9900", "#ffcc00"] // Red to yellow gradient
["#dc2626", "#ea580c", "#f59e0b", "#fbbf24"] // Tailwind warm
```

### Cool/Ice
```tsx
["#00ffff", "#0099ff", "#66ccff", "#99ddff"] // Cyan to light blue
["#06b6d4", "#0ea5e9", "#3b82f6", "#60a5fa"] // Tailwind blues
```

---

## 🔧 Quick Customization

### Slow & Smooth
```tsx
<FallingGlitch
  fallSpeed={0.5}
  glitchIntensity={0.02}
  fontSize={16}
/>
```

### Fast & Chaotic
```tsx
<FallingGlitch
  fallSpeed={3}
  glitchIntensity={0.2}
  fontSize={12}
/>
```

### Minimal Performance Impact
```tsx
<FallingGlitch
  fontSize={20}  // Fewer characters
  glitchIntensity={0.01}  // Less calculation
  glitchColors={["#00ff41"]}  // Single color
/>
```

---

## ✅ Checklist for Implementation

- [ ] Copy `falling-glitch.tsx` to `components/` folder
- [ ] Import component in your layout/page
- [ ] Wrap in `fixed inset-0 z-0` div for background
- [ ] Add content in `relative z-10` div
- [ ] Choose a preset or customize colors
- [ ] Test on different screen sizes
- [ ] Optimize for mobile if needed
- [ ] Adjust performance settings if laggy

---

## 🚀 One-Liners

**Simplest possible use**:
```tsx
<FallingGlitch><div /></FallingGlitch>
```

**With custom colors**:
```tsx
<FallingGlitch glitchColors={["#ff00ff", "#00ffff"]}><div /></FallingGlitch>
```

**Fast version**:
```tsx
<FallingGlitch fallSpeed={2}><div /></FallingGlitch>
```

**Slow version**:
```tsx
<FallingGlitch fallSpeed={0.5}><div /></FallingGlitch>
```

---

**Need more examples?** See `TEMPLATE_FALLING_GLITCH.md` for complete documentation!

🌑 **Copy. Paste. Ship.** 🚀
