# ⚡ Neon Light Trails: Tron - Quick Start

**Epic light cycle effects with flowing neon trails!**

---

## ⚡ 30-Second Start

```tsx
import NeonTrailsUltra from './neon-trails-ultra'

export default function Page() {
  return (
    <NeonTrailsUltra
      trailCount={8}
      colors={['#00D4FF', '#FF0080', '#00FF88']}
      showGrid={true}
      glowRadius={20}
    >
      <div style={{ position: 'relative', zIndex: 10 }}>
        <h1>TRON://ONLINE</h1>
      </div>
    </NeonTrailsUltra>
  )
}
```

---

## 🎨 Quick Presets

### Tron Blue ⚡
```tsx
<NeonTrailsUltra
  colors={['#00D4FF', '#0099FF']}
  showGrid={true}
  gridSize={50}
  trailCount={6}
  pathType="curved"
/>
```

### Neon Pink 💗
```tsx
<NeonTrailsUltra
  colors={['#FF0080', '#FF1493', '#FFD700']}
  glowRadius={30}
  bloomIntensity={25}
  trailCount={10}
/>
```

### Multi-Color Rainbow 🌈
```tsx
<NeonTrailsUltra
  colors={['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#9400D3']}
  trailCount={12}
  pathType="chaotic"
/>
```

---

## 🎯 Common Use Cases

### 1. Tron Hero Section
```tsx
<NeonTrailsUltra
  showGrid={true}
  colors={['#00D4FF']}
  pathType="circular"
  trailCount={4}
>
  <Hero />
</NeonTrailsUltra>
```

### 2. Loading Animation
```tsx
<NeonTrailsUltra
  trailCount={3}
  pathType="circular"
  glowRadius={30}
  motionBlur={true}
/>
```

### 3. Interactive Background
```tsx
<NeonTrailsUltra
  mouseTrails={true}
  clickBurst={true}
  trailCount={5}
/>
```

---

⚡ **Enter the grid!** 🎮
