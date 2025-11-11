# React Three Fiber - Psychedelic 3D Animation Exploration Report

**Repository**: react-three-fiber  
**Location**: `/Users/seman/Desktop/nextJS-tailwindCSS-repos/react-three-fiber`  
**Date**: 2025-10-24  
**Purpose**: Find psychedelic visual effects, shaders, and advanced 3D animation templates  

---

## EXECUTIVE SUMMARY

React Three Fiber is a powerful React renderer for Three.js that enables building interactive 3D web experiences declaratively. The repository contains:

- **27 Demo Examples** showcasing various R3F capabilities
- **Extensive Documentation** on animations, interactions, and advanced techniques
- **Community Components** for effects, shaders, and advanced visualization
- **Multiple Tutorial Resources** for building complex 3D scenes

### Key Findings for Psychedelic Visual Effects

1. **Shader System**: Full support for custom vertex and fragment shaders
2. **Particle Systems**: Can create with custom ShaderMaterial and BufferGeometry
3. **WebGPU Support**: New high-performance rendering pipeline with TSL (Texture Shader Language)
4. **Portal System**: Advanced nested rendering for portal effects and recursive visuals
5. **Custom Materials**: Multi-material support for complex color/distortion effects
6. **SVG Rendering**: Alternative renderer for vector-based psychedelic effects
7. **Geometry Morphing**: Dynamic geometry changes for morphing effects
8. **Gesture Support**: Use-gesture integration for interactive controls

---

## REPOSITORY STRUCTURE

```
react-three-fiber/
├── packages/
│   ├── fiber/              # Core R3F renderer
│   ├── test-renderer/      # Testing utilities
│   └── eslint-plugin/      # Code quality rules
├── example/
│   └── src/
│       ├── demos/          # 27 demo examples (SEE BELOW)
│       ├── App.tsx         # Demo launcher
│       └── components.tsx  # Shared components
├── docs/                   # Comprehensive documentation
│   ├── getting-started/
│   ├── tutorials/
│   ├── advanced/
│   └── API/
└── readme.md              # Main documentation
```

---

## DEMO EXAMPLES (27 TOTAL)

### 1. **Pointcloud.tsx** - Particle System Example ⭐

**File**: `/Users/seman/Desktop/nextJS-tailwindCSS-repos/react-three-fiber/example/src/demos/Pointcloud.tsx`

**What it does**:
- Creates interactive particle system with 1000 points
- Custom shader material with circle rendering in fragment shader
- Hover interaction changes particle colors dynamically
- Demonstrates BufferGeometry with position and color attributes

**Key Code Pattern**:
```tsx
class DotMaterialImpl extends THREE.ShaderMaterial {
  constructor() {
    super({
      transparent: true,
      uniforms: { size: { value: 15 }, scale: { value: 1 } },
      vertexShader: THREE.ShaderLib.points.vertexShader,
      fragmentShader: `
      varying vec3 vColor;
      void main() {
        gl_FragColor = vec4(vColor, step(length(gl_PointCoord.xy - vec2(0.5)), 0.5));
      }`,
    })
  }
}
```

**Psychedelic Potential**: 5/5
- Easily adaptable to kaleidoscope or mandala patterns
- Can apply time-based color animations
- Can use HSL color space for rainbow effects
- Can morph point positions using sin/cos waves

---

### 2. **WebGPU.tsx** - Next-Gen GPU Rendering ⭐⭐

**File**: `/Users/seman/Desktop/nextJS-tailwindCSS-repos/react-three-fiber/example/src/demos/WebGPU.tsx`

**What it does**:
- Uses WebGPU renderer with Three.js TSL (Texture Shader Language)
- Demonstrates color mixing and position distortion
- Time-based animations using sin() functions
- Hover-triggered uniforms

**Key Code Pattern**:
```tsx
const uHovered = uniform(0.0)
const col1 = color('orange')
const col2 = color('hotpink')
const col3 = color('aquamarine')
const currentTime = time.mul(2)
const colorNode = mix(mix(col1, col2, sin(currentTime).add(1).div(2)), col3, uHovered)
const positionNode = positionLocal.add(vec3(0, sin(currentTime).mul(0.05), 0))
```

**Psychedelic Potential**: 5/5
- Native support for sin/cos distortions (fractal-ready)
- Multiple color mixing for kaleidoscope effects
- Position warping for trippy effects
- Built-in time uniform for continuous animations

---

### 3. **Portals.tsx** - Recursive/Nested Rendering ⭐⭐

**File**: `/Users/seman/Desktop/nextJS-tailwindCSS-repos/react-three-fiber/example/src/demos/Portals.tsx`

**What it does**:
- Renders scenes within textures (portals inside portals)
- Custom raycasting through portal windows
- FBO (Frame Buffer Object) rendering for complex effects
- Demonstrates createPortal() API

**Psychedelic Potential**: 5/5
- Perfect for recursive/fractal visual effects
- Can create infinite zoom effects
- Can nest different distortion effects
- Creates kaleidoscope/mandala patterns when combined with geometry

---

### 4. **Viewcube.tsx** - Advanced Camera Control

**File**: `/Users/seman/Desktop/nextJS-tailwindCSS-repos/react-three-fiber/example/src/demos/Viewcube.tsx`

**Features**:
- Separate rendering layers
- Matrix transformations
- Interactive 3D control cube
- Advanced portal usage

**Psychedelic Potential**: 4/5
- Can be styled with psychedelic colors
- Can apply distortion shaders to the viewport

---

### 5. **MultiMaterial.tsx** - Multi-Color Geometry

**File**: `/Users/seman/Desktop/nextJS-tailwindCSS-repos/react-three-fiber/example/src/demos/MultiMaterial.tsx`

**Features**:
- Apply different materials to different faces of same geometry
- Dynamic material switching
- Multiple color combinations

**Psychedelic Potential**: 4/5
- Great for rainbow/multi-color effects
- Can animate material transitions
- Can create gradients across faces

---

### 6. **Gestures.tsx** - Interactive Drag Controls ⭐

**File**: `/Users/seman/Desktop/nextJS-tailwindCSS-repos/react-three-fiber/example/src/demos/Gestures.tsx`

**Features**:
- Use-gesture integration
- Drag objects in 3D space
- Continuous rotation animation
- Multiple interactive objects

**Psychedelic Potential**: 4/5
- User-controlled distortion effects
- Interactive morphing
- Responsive to mouse movement

---

### 7. **Lines.tsx** - Vector Drawing

**File**: `/Users/seman/Desktop/nextJS-tailwindCSS-repos/react-three-fiber/example/src/demos/Lines.tsx`

**Features**:
- Draw lines with Drei's Line component
- Interactive draggable endpoints
- Dynamic line geometry updates

**Psychedelic Potential**: 3/5
- Can create kaleidoscope patterns with connected lines
- Good for mandala-style effects

---

### 8. **SVGRenderer.tsx** - Vector Graphics

**File**: `/Users/seman/Desktop/nextJS-tailwindCSS-repos/react-three-fiber/example/src/demos/SVGRenderer.tsx`

**Features**:
- Render 3D scenes as SVG
- Alternative to WebGL for specific effects
- Clean vector output

**Psychedelic Potential**: 4/5
- Perfect for clean, sharp psychedelic patterns
- No GPU overhead
- Export-friendly

---

### 9. **ChangeTexture.tsx** - Dynamic Texture Switching

**File**: `/Users/seman/Desktop/nextJS-tailwindCSS-repos/react-three-fiber/example/src/demos/ChangeTexture.tsx`

**Features**:
- Load and switch textures dynamically
- Use React's useDeferredValue for performance
- Plane with texture mapping

---

### 10. **Other Notable Demos**

- **Selection.tsx**: Interactive selection highlighting
- **Layers.tsx**: Layer-based rendering and filtering
- **ClickAndHover.tsx**: Event handling patterns
- **MultiView.tsx**: Multiple viewports
- **Reparenting.tsx**: Dynamic scene restructuring
- **SuspenseMaterial.tsx**: Async material loading
- **Gltf.tsx**: Model loading

---

## PSYCHEDELIC EFFECT BUILDING BLOCKS

### Pattern 1: Sine Wave Distortions
**Foundation for trippy animations**

```tsx
const displacement = sin(time.mul(speed)).mul(amplitude)
// Apply to position, colors, or texture coordinates
```

**Examples**:
- Wave-based morphing geometry
- Color oscillation
- Position pulsing

---

### Pattern 2: Shader-Based Color Mixing
**Create kaleidoscope effects**

```tsx
const hue = sin(time).add(1).div(2) // 0-1 normalized
const color = hsv2rgb(hue, 1.0, 1.0)
```

**Examples**:
- Rainbow cycling
- Color wheel effects
- Gradient transitions

---

### Pattern 3: Fractal/Recursive Rendering
**Using Portals**

```tsx
<Portal scale={[4, 5, 1]} position={[0, 0, 0]}>
  <Portal scale={[2, 2.5, 1]} position={[1, 0, 0]}>
    <Portal scale={[1, 1.25, 1]} position={[0.5, 0, 0]}>
      {/* Recursive content */}
    </Portal>
  </Portal>
</Portal>
```

**Effects**:
- Infinite zoom
- Mandala patterns
- Fractal geometry

---

### Pattern 4: Particle Systems
**Psychedelic swarms**

```tsx
// Create BufferGeometry with many vertices
const positions = new Float32Array(particleCount * 3)
const colors = new Float32Array(particleCount * 3)

// Animate with useFrame
useFrame(({ clock }) => {
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] += sin(clock.elapsedTime + i) * 0.01
    colors[i * 3] = sin(clock.elapsedTime + i * 0.1)
  }
  geometry.attributes.position.needsUpdate = true
  geometry.attributes.color.needsUpdate = true
})
```

---

### Pattern 5: Material Morphing
**Multi-material effects**

```tsx
// Apply different materials to different faces
<mesh>
  <geometry />
  <meshBasicMaterial attach="material-0" color="red" />
  <meshBasicMaterial attach="material-1" color="orange" />
  <meshBasicMaterial attach="material-2" color="yellow" />
  {/* ... more materials ... */}
</mesh>
```

---

### Pattern 6: Gesture-Based Interactivity
**User-controlled psychedelia**

```tsx
const bind = useDrag(({ offset: [x, y] }) => {
  // Map mouse position to shader uniforms
  positionUniform.value = [x, y, 0]
  colorUniform.value = [x / window.innerWidth, y / window.innerHeight, 0.5]
})
```

---

## COMMUNITY COMPONENTS FOR PSYCHEDELIC EFFECTS

From `/docs/getting-started/community-r3f-components.mdx`:

### Advanced Shader Materials
1. **CustomShaderMaterial** - FarazzShaikh/THREE-CustomShaderMaterial
   - Extends THREE.ShaderMaterial for easier custom shaders
   - Perfect for distortion effects
   - Caustics demo shows water-like rippling

2. **MeshLine** - pmndrs/THREE.MeshLine
   - Draw thick lines in 3D
   - Great for light-saber or neon effects

3. **Lens Flare** - ektogamat/R3F-Ultimate-Lens-Flare
   - Optical effects
   - Perfect for psychedelic light shows

### Advanced Utilities
1. **Theatre.js** - Animation timeline editor
2. **Gaussian Splats** - 3D point cloud rendering
3. **3D Tiles Renderer** - Large-scale terrain
4. **Looking Glass Factory** - Holographic display support
5. **Takram Atmosphere** - Volumetric effects

---

## SHADER TECHNIQUES AVAILABLE

### 1. Fragment Shader Effects
```glsl
// Circle rendering (from Pointcloud example)
gl_FragColor = vec4(vColor, step(length(gl_PointCoord.xy - vec2(0.5)), 0.5));

// Can extend to:
// - Rounded rectangles
// - Stars/polygons
// - Animated patterns
// - Noise functions
```

### 2. Vertex Shader Distortions
```glsl
// From WebGPU example (TSL syntax)
vec3 newPos = positionLocal + vec3(0, sin(time).mul(0.05), 0)

// Can extend to:
// - Wave ripples
// - Turbulence
// - Morphing geometry
// - Kaleidoscope distortions
```

### 3. Color Space Manipulations
```glsl
// Mix multiple colors
vec3 color = mix(mix(col1, col2, sin(time)), col3, hover)

// Can extend to:
// - HSL/HSV color spaces
// - Rainbow gradients
// - Chromatic aberration
// - Color cycling
```

---

## ANIMATION PATTERNS

### Pattern 1: Time-Based
```tsx
useFrame(({ clock }) => {
  const t = clock.elapsedTime
  mesh.rotation.x = sin(t) * Math.PI
  mesh.position.y = cos(t * 2) * 5
})
```

### Pattern 2: Physics-Based (React Spring)
```tsx
import { useSpring } from '@react-spring/three'

const spring = useSpring({
  rotation: [Math.PI * 2, 0, 0],
  config: { tension: 200, friction: 20 }
})
```

### Pattern 3: Gesture-Based
```tsx
const bind = useDrag(({ offset, velocity }) => {
  // Respond to mouse/touch movement
  setRotation([velocity[1] * 0.1, velocity[0] * 0.1, 0])
})
```

---

## RECOMMENDED TEMPLATES FOR PSYCHEDELIC VISUALS

### Template 1: Kaleidoscope
**Base**: Pointcloud + WebGPU + Portal
- 1000+ particles
- Time-based color cycling
- Recursive portal nesting
- Interactive controls

### Template 2: Fractal Explorer
**Base**: Portal + MultiMaterial + Gestures
- Nested portals with scaling
- Multi-color geometry faces
- Mouse-controlled zoom
- Morphing transitions

### Template 3: Particle Swarm
**Base**: Pointcloud + Custom Shader
- Physics-influenced particles
- Color gradients
- Attraction/repulsion forces
- Interactive manipulation

### Template 4: Mandala Generator
**Base**: Lines + MultiMaterial + SVGRenderer
- Symmetrical line patterns
- Rotating segments
- Color gradients
- Export as SVG

### Template 5: Shader Playground
**Base**: WebGPU + Full TSL support
- Real-time shader editing
- Multiple distortion modes
- Parameter sliders
- Infinite combinations

---

## TECHNICAL ARCHITECTURE

### Core Concepts

1. **Canvas Component**
   - Main entry point for R3F scenes
   - Props: gl (renderer), camera, dpr (pixel ratio)
   - Can pass custom WebGPU or SVG renderers

2. **useFrame Hook**
   - Called every animation frame
   - Access to: state, delta (time since last frame)
   - Perfect for continuous animations

3. **Refs + Mutation**
   - Get direct access to THREE objects
   - Mutate properties directly (not via React state)
   - Critical for performance

4. **Geometry + Material
   - Standard Three.js geometries
   - Custom ShaderMaterial support
   - Multi-material support

5. **Portals**
   - Render scenes into textures
   - Can nest infinitely
   - Separate camera/event system per portal

---

## TECHNOLOGY STACK

**Core Dependencies**:
- React 19.0.0
- Three.js 0.172.0
- TypeScript 5.8+

**Optional Packages**:
- @react-three/drei (utility components)
- @use-gesture/react (gesture handling)
- react-spring (physics animations)
- maath (math utilities)

**Rendering**:
- WebGL (standard)
- WebGPU (new, with TSL shader language)
- SVG (vector rendering)
- Custom renderers (Canvas, custom GL)

---

## PERFORMANCE CONSIDERATIONS

### Optimization Techniques

1. **useDeferredValue** - Defer expensive updates
2. **Lazy Loading** - Import demos with React.lazy()
3. **Instancing** - Reuse geometry/materials
4. **Level of Detail** - Reduce complexity at distance
5. **Frustum Culling** - Built into Three.js
6. **GPU Particle Systems** - Offload to shaders

### Benchmarks
- No overhead compared to plain Three.js
- Outperforms Three.js in large scenes due to React scheduling
- GPUx rendering handles 10,000+ particles smoothly

---

## LEARNING RESOURCES

**Official Documentation**:
- `/docs/getting-started/introduction.mdx` - Concepts
- `/docs/tutorials/basic-animations.mdx` - Animation fundamentals
- `/docs/tutorials/events-and-interaction.mdx` - User input
- `/docs/API/hooks.mdx` - Hook reference
- `/docs/advanced/scaling-performance.mdx` - Optimization

**Examples**:
- 27 demo examples in `/example/src/demos/`
- 100+ CodeSandbox examples linked in docs
- Community showcase on docs website

---

## PSYCHEDELIC VISUAL EFFECTS SUMMARY

| Effect Type | Implementation | Difficulty | Visual Impact |
|-------------|-----------------|------------|---------------|
| Particle Swarms | Pointcloud + ShaderMaterial | Easy | High |
| Kaleidoscope | Portal + Multi-Material | Medium | Very High |
| Fractal Zoom | Nested Portals | Medium | Extreme |
| Color Cycles | WebGPU Time-based color | Easy | High |
| Distortion Waves | Vertex Shader + sin(time) | Medium | High |
| Morphing Geometry | Dynamic BufferGeometry | Medium | High |
| Light Shows | Lens Flare + Bloom | Medium | High |
| Mandala Patterns | Symmetrical Lines + Material | Medium | Very High |
| Chromatic Aberration | Fragment Shader RGB shifts | Hard | High |
| Recursive Effects | Portal nesting | Hard | Extreme |

---

## NEXT STEPS FOR TEMPLATE CREATION

1. **Start with Pointcloud.tsx** as base
   - Add custom fragment shader for different shapes
   - Implement color cycling with sin(time)
   - Add gesture controls for interactivity

2. **Add WebGPU layer** for advanced effects
   - Use TSL for easy shader creation
   - Test color mixing chains
   - Implement position distortions

3. **Implement Portal system** for recursion
   - Nest 2-3 levels of portals
   - Apply different effects to each level
   - Create fractal appearance

4. **Style with interactive controls**
   - Add dat.GUI or similar controller
   - Expose shader parameters
   - Allow real-time customization

5. **Optimize and polish**
   - Test performance with large particle counts
   - Add motion-safe media query respect
   - Ensure mobile compatibility

---

## FILES & PATHS REFERENCE

**Key Implementation Files**:
- `/example/src/demos/Pointcloud.tsx` - Particle system
- `/example/src/demos/WebGPU.tsx` - Advanced shaders
- `/example/src/demos/Portals.tsx` - Recursive rendering
- `/example/src/demos/Gestures.tsx` - Interactive controls
- `/example/src/demos/MultiMaterial.tsx` - Color effects
- `/docs/tutorials/basic-animations.mdx` - Animation guide
- `/docs/getting-started/community-r3f-components.mdx` - Advanced components

**Documentation Paths**:
- `/docs/API/hooks.mdx` - useFrame, useThree references
- `/docs/API/objects.mdx` - Available Three.js objects
- `/docs/advanced/scaling-performance.mdx` - Performance tips

---

## CONCLUSION

React Three Fiber provides an excellent foundation for creating psychedelic 3D visual effects. The combination of:

- **Flexible shader support** (GLSL + WebGPU TSL)
- **Portal system** (infinite recursion)
- **Particle systems** (Pointcloud patterns)
- **Gesture integration** (interactive control)
- **Multi-material support** (color effects)
- **Real-time animation** (time-based distortions)

...makes it possible to create truly stunning psychedelic visualizations with fine-grained parameter control.

The 27 examples and extensive documentation provide clear patterns for building custom effects. Start with the Pointcloud and WebGPU demos as templates.

