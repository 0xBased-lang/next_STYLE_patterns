# 🔮 Holographic Glitch: Cyberpunk - Quick Start

**The most insane glitch effect with RGB split, chromatic aberration, and digital corruption!**

---

## ⚡ 30-Second Start

### Option 1: Try the Demo
```bash
open demo-ultra.html
```
Play with **20+ glitch controls**, try **8 cyberpunk presets**!

### Option 2: Use in Your Project
```tsx
import HolographicGlitchUltra from './holographic-glitch-ultra'

export default function Page() {
  return (
    <HolographicGlitchUltra
      rgbSplitDistance={10}
      scanLineCount={150}
      glitchFrequency={1500}
      chromaticShift={5}
    >
      <div style={{ position: 'relative', zIndex: 10 }}>
        <h1>GLITCH://CONTENT</h1>
      </div>
    </HolographicGlitchUltra>
  )
}
```

---

## 🎨 Quick Presets

### Cyberpunk 🔮
```tsx
<HolographicGlitchUltra
  rgbSplitDistance={10}
  scanLineCount={150}
  chromaticShift={5}
  noiseIntensity={15}
  corruptionDensity={30}
/>
```

### Matrix 💚
```tsx
<HolographicGlitchUltra
  scanLineCount={200}
  codeOverlay={true}
  codeSpeed={2}
  codeDensity={50}
/>
```

### Vaporwave 🌸
```tsx
<HolographicGlitchUltra
  rgbSplitDistance={15}
  chromaticShift={8}
  aberrationAngle={45}
  scanLineOpacity={50}
/>
```

### Corrupted 💥
```tsx
<HolographicGlitchUltra
  rgbSplitDistance={25}
  glitchFrequency={500}
  distortionAmplitude={30}
  noiseIntensity={40}
  corruptionDensity={60}
/>
```

---

## 🎯 Common Use Cases

### 1. Error/Loading State
```tsx
<HolographicGlitchUltra
  glitchFrequency={300}
  rgbSplitDistance={20}
  corruptionDensity={70}
/>
```

### 2. Cyberpunk Hero Section
```tsx
<HolographicGlitchUltra
  rgbSplitDistance={10}
  scanLineCount={150}
  hologramFlicker={true}
>
  <Hero />
</HolographicGlitchUltra>
```

### 3. Hacker Terminal
```tsx
<HolographicGlitchUltra
  codeOverlay={true}
  codeSpeed={3}
  codeDensity={70}
  scanLineCount={120}
/>
```

---

## ⚙️ Key Parameters

| Parameter | Default | Range | Effect |
|-----------|---------|-------|--------|
| `rgbSplitDistance` | 5 | 0-50 | RGB color separation |
| `scanLineCount` | 100 | 10-200 | CRT scan lines |
| `glitchFrequency` | 2000 | 100-5000 | Glitch timing (ms) |
| `chromaticShift` | 3 | 0-20 | Chromatic aberration |
| `corruptionDensity` | 20 | 0-100 | Digital corruption |
| `noiseIntensity` | 10 | 0-100 | Static noise |

**Total**: 20+ parameters! Full cyberpunk control! 🔮

---

🔮 **Glitch the matrix!** 💥
