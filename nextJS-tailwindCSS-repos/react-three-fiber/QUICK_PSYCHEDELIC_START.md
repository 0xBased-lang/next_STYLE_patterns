# Quick Start: Psychedelic Visual Effects with React Three Fiber

## TL;DR - 5 Best Demos to Study

1. **Pointcloud.tsx** - Particle system with custom shaders
2. **WebGPU.tsx** - Modern shader language with color mixing
3. **Portals.tsx** - Recursive nested rendering
4. **MultiMaterial.tsx** - Multi-color geometry effects
5. **Gestures.tsx** - Interactive user controls

## Instant Recipe: Kaleidoscope

```tsx
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function KaleidoscopeParticles() {
  const particleCount = 1000
  const ref = useRef(null)
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const col = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
      
      col[i * 3] = Math.random()
      col[i * 3 + 1] = Math.random()
      col[i * 3 + 2] = Math.random()
    }
    return [pos, col]
  }, [])
  
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const positions = ref.current.geometry.attributes.position.array
    const colors = ref.current.geometry.attributes.color.array
    
    for (let i = 0; i < particleCount; i++) {
      // Animate positions
      positions[i * 3] += Math.sin(t + i) * 0.01
      positions[i * 3 + 1] += Math.cos(t + i) * 0.01
      
      // Animate colors with sin/cos for rainbow effect
      colors[i * 3] = Math.sin(t + i * 0.1) * 0.5 + 0.5
      colors[i * 3 + 1] = Math.sin(t + i * 0.1 + Math.PI * 0.66) * 0.5 + 0.5
      colors[i * 3 + 2] = Math.sin(t + i * 0.1 + Math.PI * 1.33) * 0.5 + 0.5
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.geometry.attributes.color.needsUpdate = true
  })
  
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors={true} sizeAttenuation={true} />
    </points>
  )
}

export default function App() {
  return (
    <Canvas>
      <KaleidoscopeParticles />
    </Canvas>
  )
}
```

## Key Techniques

### 1. Color Cycling (Rainbow Effect)
```tsx
// Use sin wave to cycle through hues
const hue = (Math.sin(time + index) * 0.5 + 0.5) // 0-1 range
const saturation = 1.0
const lightness = 0.5

// Then convert HSL to RGB for pure colors
```

### 2. Position Distortion (Trippy Waves)
```tsx
// Apply sin/cos to positions
position.x += Math.sin(time * speed + position.y * frequency) * amplitude
position.y += Math.cos(time * speed + position.x * frequency) * amplitude
```

### 3. Particle Swarm (Interactive)
```tsx
// Update particle positions every frame
useFrame(({ clock, mouse }) => {
  const t = clock.elapsedTime
  for (let i = 0; i < count; i++) {
    // Attract toward mouse
    const dx = mouse.x - positions[i * 3]
    const dy = mouse.y - positions[i * 3 + 1]
    positions[i * 3] += dx * 0.01
    positions[i * 3 + 1] += dy * 0.01
    
    // Add oscillation
    positions[i * 3] += Math.sin(t + i) * 0.001
  }
  geometry.attributes.position.needsUpdate = true
})
```

### 4. Multi-Color Faces (Rainbow Cube)
```tsx
<mesh>
  <boxGeometry />
  <meshBasicMaterial attach="material-0" color="red" />
  <meshBasicMaterial attach="material-1" color="orange" />
  <meshBasicMaterial attach="material-2" color="yellow" />
  <meshBasicMaterial attach="material-3" color="green" />
  <meshBasicMaterial attach="material-4" color="blue" />
  <meshBasicMaterial attach="material-5" color="violet" />
</mesh>
```

### 5. Recursive Portals (Fractal Effect)
```tsx
function RecursivePortal({ depth = 0, maxDepth = 3 }) {
  if (depth >= maxDepth) return null
  
  return (
    <Portal scale={[2 - depth * 0.3, 2 - depth * 0.3, 1]} position={[0, 0, 0]}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={`hsl(${depth * 60}, 100%, 50%)`} />
      </mesh>
      <RecursivePortal depth={depth + 1} maxDepth={maxDepth} />
    </Portal>
  )
}
```

## File Locations (Copy These!)

| Demo | Path | What to Copy |
|------|------|------------|
| Particles | `example/src/demos/Pointcloud.tsx` | ShaderMaterial pattern, BufferGeometry setup |
| Shaders | `example/src/demos/WebGPU.tsx` | Time-based distortion, color mixing |
| Portals | `example/src/demos/Portals.tsx` | Recursive rendering, FBO setup |
| Multi-Material | `example/src/demos/MultiMaterial.tsx` | Multi-face coloring |
| Interactive | `example/src/demos/Gestures.tsx` | Drag controls, mouse input |

## Parameter Tweaking Ideas

### For Kaleidoscope Effect
```tsx
// Easy to adjust
const particleCount = 5000 // More particles = denser pattern
const size = 0.15 // Particle size
const speed = 2.0 // Animation speed multiplier
const amplitude = 0.05 // Oscillation intensity
const frequency = 1.0 // Wave frequency
```

### For Color Cycling
```tsx
const colorSpeed = 1.0 // How fast colors shift
const colorOffset = [0, 0.33, 0.66] // Phase shift for R,G,B
const saturation = 1.0 // 0=grey, 1=vivid
const brightness = 0.5 // 0=black, 1=white
```

### For Geometry Morphing
```tsx
const morphSpeed = 1.0
const morphAmount = 0.5 // How much positions change
const geometry1 = new BoxGeometry()
const geometry2 = new SphereGeometry()
// Lerp between them based on time
```

## Next Steps

1. Copy `Pointcloud.tsx` as your base
2. Modify the fragment shader for custom shapes
3. Add `sin(time)` to positions and colors
4. Wrap in `<Canvas>` and run!
5. Tweak parameters until it looks CRAZY

## Performance Tips

- Start with 1000 particles, increase slowly
- Use WebGPU for 10000+ particles (faster)
- Use `useDeferredValue` for expensive updates
- Lazy-load non-critical demo files

## Ultra-Advanced: WebGPU Shader Language

```tsx
import { uniform, color, mix, sin, time, positionLocal, vec3 } from 'three/tsl'

const uHovered = uniform(0.0)
const col1 = color('red')
const col2 = color('cyan')
const currentTime = time.mul(speed)

// Automatic sin/cos available!
const colorNode = mix(col1, col2, sin(currentTime))
const positionNode = positionLocal.add(
  vec3(0, sin(currentTime.mul(2)).mul(0.1), 0)
)
```

## Common Mistakes to Avoid

- Don't use React state for continuous updates (use refs!)
- Don't forget `needsUpdate = true` after modifying buffers
- Don't render 100k particles on mobile
- Don't mix THREE code outside Canvas
- Don't forget to unmount/cleanup effects

## Resources

- Full Guide: `/PSYCHEDELIC_VISUAL_EFFECTS_GUIDE.md`
- Docs: `/docs/tutorials/basic-animations.mdx`
- Examples: `/example/src/demos/`
- Community: https://github.com/pmndrs/react-three-fiber

---

**Ready to build something CRAZY?** Start with the recipe above and tweak away!
