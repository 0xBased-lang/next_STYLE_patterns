# 💫 Morphing Blob: Organic - Quick Start

**Mesmerizing liquid/fluid effects with smooth morphing!**

---

## ⚡ 30-Second Start

```tsx
import MorphingBlobUltra from './morphing-blob-ultra'

export default function Page() {
  return (
    <MorphingBlobUltra
      blobCount={3}
      colors={['#FF0080', '#9D00FF', '#00D4FF']}
      blurAmount={30}
      morphSpeed={1}
    >
      <div style={{ position: 'relative', zIndex: 10 }}>
        <h1>FLUID DESIGN</h1>
      </div>
    </MorphingBlobUltra>
  )
}
```

---

## 🎨 Quick Presets

### Lava Lamp 🔴
```tsx
<MorphingBlobUltra
  blobCount={5}
  colors={['#FF0000', '#FF4500', '#FFD700']}
  morphSpeed={0.5}
  movementSpeed={0.5}
/>
```

### Liquid Metal 🌊
```tsx
<MorphingBlobUltra
  blobCount={2}
  colors={['#C0C0C0', '#E8E8E8', '#00D4FF']}
  blurAmount={20}
  gradientType="linear"
/>
```

### Cosmic Clouds 🌌
```tsx
<MorphingBlobUltra
  blobCount={4}
  colors={['#9D00FF', '#FF0080', '#00D4FF', '#00FF88']}
  blurAmount={40}
  blendMode="screen"
/>
```

---

💫 **Flow with it!** 🌊
