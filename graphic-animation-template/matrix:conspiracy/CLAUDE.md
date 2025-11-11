# CLAUDE.md - Matrix/Conspiracy Animation Template

**Instructions for Claude Code when working with this Matrix-style animation template**

---

## 🎯 TEMPLATE OVERVIEW

**Name**: Matrix/Conspiracy Falling Characters Animation
**Purpose**: Reusable Matrix-style animated background with conspiracy aesthetic
**Versions**: Standard (6 params) + ULTRA (22 params)
**Status**: Production Ready ✅

**Visual Description**:
- Falling/rising characters (Matrix effect)
- Multiple color modes and character sets
- Glow effects and wavy motion
- 4-directional movement
- Fully customizable parameters

---

## 📁 FILE STRUCTURE

### Components (2)

**`falling-glitch.tsx`** (5.4KB) - Standard Version
- 6 basic parameters
- Simple implementation
- Good for quick setups
- 60 FPS performance

**`falling-glitch-ultra.tsx`** (7.9KB) - ULTRA Version
- 22 advanced parameters
- Maximum customization
- All features included
- Optimized for 45-60 FPS

### Demos (2)

**`demo.html`** (9.8KB) - Basic Demo
- 3 sliders (speed, glitch, font size)
- 5 preset buttons
- No dependencies
- Quick preview

**`demo-ultra.html`** (37KB) - ULTRA Demo ⭐
- 20+ live controls
- 8 presets + random generator
- Export as React code/JSON
- Save/load custom presets
- FPS monitoring
- Fully interactive

### Documentation (8 files, 80KB total)

1. **CLAUDE.md** (This file) - Claude Code instructions
2. **START_HERE.md** (8.2KB) - User quick start guide
3. **INDEX.md** (8.9KB) - Package overview
4. **README.md** (4.5KB) - Standard documentation
5. **README_ULTRA.md** (10KB) - ULTRA quick start
6. **TEMPLATE_FALLING_GLITCH.md** (15KB) - Standard parameters
7. **ULTRA_PARAMETERS_GUIDE.md** (16KB) - All 22 parameters
8. **COPY_PASTE_EXAMPLES.md** (11KB) - Ready code snippets
9. **ULTRA_SUMMARY.md** (11KB) - Enhancement summary

---

## 🔧 COMPONENT ARCHITECTURE

### Standard Component (`falling-glitch.tsx`)

**Parameters** (6):
```typescript
interface FallingGlitchProps {
  glitchColors?: string[];        // Array of hex colors
  fontSize?: number;              // Character size (px)
  backgroundColor?: string;       // Background rgba
  glitchSpeed?: number;           // ms between glitches
  glitchIntensity?: number;       // 0-1 probability
  fallSpeed?: number;             // Speed multiplier
  children?: React.ReactNode;
}
```

**Defaults**:
```tsx
glitchColors: ["#00ff41", "#06b6d4", "#9333ea", "#f59e0b"]
fontSize: 14
backgroundColor: "rgba(0, 0, 0, 0.05)"
glitchSpeed: 50
glitchIntensity: 0.05
fallSpeed: 1
```

---

### ULTRA Component (`falling-glitch-ultra.tsx`)

**Parameters** (22):

**Category 1: Basic Properties** (3)
- `glitchColors` - Color array
- `fontSize` - Character size
- `backgroundColor` - Background

**Category 2: Speed & Motion** (3)
- `fallSpeed` - Base speed (0.1-5)
- `speedVariation` - Random variance (0-100%)
- `direction` - Movement direction (↓↑←→)

**Category 3: Visual Effects** (6)
- `glitchIntensity` - Color change rate
- `glitchSpeed` - Reserved for future
- `trailFade` - Trail fade speed
- `glowEffect` - Enable/disable glow
- `glowIntensity` - Glow strength (0-20)
- `blurAmount` - Gaussian blur (0-5px)

**Category 4: Typography** (3)
- `characterSet` - 7 options (full/letters/numbers/binary/symbols/katakana/custom)
- `customCharacters` - Custom string
- `columnDensity` - Column spacing (25-200%)

**Category 5: Color Configuration** (3)
- `colorMode` - Transition mode (random/sequential/wave/pulse)
- `rainbow` - HSL spectrum cycling

**Category 6: Advanced** (4)
- `resetChance` - Drop reset probability (0.1-10%)
- `characterChangeSpeed` - Char cycling speed (10-200%)
- `wavyMotion` - Sine wave effect
- `waveAmplitude` - Wave strength (0-50px)

---

## 🎨 PRESETS SYSTEM

### Built-in Presets (8)

1. **Matrix** - Classic green rain
   ```tsx
   glitchColors={["#00ff41", "#00cc33", "#00aa22"]}
   fallSpeed={1}
   glitchIntensity={0.05}
   ```

2. **Cyberpunk** - Neon aesthetic
   ```tsx
   glitchColors={["#ff00ff", "#00ffff", "#ffff00", "#ff0080"]}
   fallSpeed={1.5}
   glitchIntensity={0.1}
   glowEffect={true}
   ```

3. **Conspiracy** - Purple/cyan (ZMart style)
   ```tsx
   glitchColors={["#9333ea", "#06b6d4", "#a855f7", "#22d3ee"]}
   fallSpeed={1.2}
   glitchIntensity={0.08}
   glowEffect={true}
   ```

4. **Fire** - Rising flames
   ```tsx
   glitchColors={["#ff0000", "#ff6600", "#ff9900", "#ffcc00"]}
   direction="up"
   characterSet="symbols"
   ```

5. **Ice** - Cool blues
6. **Vaporwave** - Aesthetic with wavy motion
7. **Binary** - 01010101 stream
8. **Chaos** - Maximum effects

---

## 🎯 MODIFICATION GUIDELINES

### When Adding New Parameters

1. **Add to Interface**:
   ```tsx
   interface FallingGlitchUltraProps {
     // ... existing props
     newParameter?: type;
   }
   ```

2. **Add Default**:
   ```tsx
   newParameter = defaultValue,
   ```

3. **Add to Dependencies**:
   ```tsx
   useCallback([..., newParameter])
   ```

4. **Update Documentation**:
   - `ULTRA_PARAMETERS_GUIDE.md` - Full parameter docs
   - `README_ULTRA.md` - Quick reference
   - `COPY_PASTE_EXAMPLES.md` - Examples using new param

5. **Add Demo Control**:
   - Update `demo-ultra.html` with new control
   - Add to appropriate section
   - Update export function

---

### When Adding New Presets

1. **Define Preset Object**:
   ```javascript
   presets.newPreset = {
     colors: [...],
     fontSize: 14,
     fallSpeed: 1,
     // ... all relevant params
   }
   ```

2. **Add Button**:
   ```html
   <button class="preset-btn" onclick="applyPreset('newPreset')">New Preset</button>
   ```

3. **Document**:
   - Add to `ULTRA_PARAMETERS_GUIDE.md`
   - Add to `COPY_PASTE_EXAMPLES.md`
   - Update `README_ULTRA.md`

---

### When Modifying Character Sets

**Location**: `charSets` object in component

```typescript
const charSets = {
  full: "ABC...".split("").concat([...]),
  newSet: "YOUR_CHARS".split("")
}
```

**Then Update**:
- TypeScript type definition
- Demo dropdown options
- Documentation

---

## 🧪 TESTING REQUIREMENTS

### Performance Benchmarks

**Desktop (1920x1080)**:
- Standard settings: 60 FPS minimum
- ULTRA settings: 45 FPS minimum
- Maximum chaos: 30 FPS acceptable

**Mobile**:
- Optimized settings: 45 FPS minimum
- Standard settings: 40 FPS minimum

**4K Desktop**:
- Standard settings: 50 FPS minimum

### Test Configurations

**High Performance** (Must hit 60 FPS):
```tsx
fontSize={18}
glitchIntensity={0.03}
glowEffect={false}
blurAmount={0}
glitchColors={["#00ff41", "#06b6d4"]}
```

**Balanced** (Target: 50-60 FPS):
```tsx
fontSize={14}
glitchIntensity={0.08}
glowEffect={true}
glowIntensity={8}
glitchColors={[...4 colors]}
```

**Visual Priority** (30-45 FPS acceptable):
```tsx
fontSize={10}
glitchIntensity={0.2}
glowEffect={true}
glowIntensity={15}
blurAmount={2}
wavyMotion={true}
glitchColors={[...8 colors]}
```

### Browser Testing Checklist

- [ ] Chrome Desktop (Windows/Mac)
- [ ] Firefox Desktop
- [ ] Safari Desktop (Mac)
- [ ] Edge Desktop
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)
- [ ] Samsung Internet (Android)

---

## 📝 DOCUMENTATION MAINTENANCE

### When Parameters Change

**Must Update**:
1. `falling-glitch-ultra.tsx` - Component code
2. `ULTRA_PARAMETERS_GUIDE.md` - Parameter documentation
3. `README_ULTRA.md` - Quick reference
4. `COPY_PASTE_EXAMPLES.md` - Code examples
5. `demo-ultra.html` - Demo controls
6. This `CLAUDE.md` - Development instructions

### When Adding Features

**Documentation Order**:
1. Implement feature in component
2. Add control to demo-ultra.html
3. Test thoroughly
4. Document in ULTRA_PARAMETERS_GUIDE.md
5. Add examples to COPY_PASTE_EXAMPLES.md
6. Update README_ULTRA.md
7. Update this CLAUDE.md

---

## 🎨 COLOR SYSTEM

### Color Arrays

**Rules**:
- Always use hex format: `#RRGGBB`
- Support 1-8 colors
- First color is default for all columns
- Colors cycle if more columns than colors

### Color Modes

**random** (default):
- Picks random color on glitch
- Most chaotic

**sequential**:
- Cycles through colors in order
- Smooth transitions

**wave**:
- Sine wave pattern across columns
- Flowing effect

**pulse**:
- Synchronized color switching
- Rhythmic feel

**rainbow**:
- HSL spectrum cycling
- Overrides color array

---

## ⚡ PERFORMANCE OPTIMIZATION

### Critical Factors

**Impact on FPS** (highest to lowest):
1. **fontSize** - Smaller = more characters = lower FPS
2. **glowEffect** - Shadowblur is expensive
3. **blurAmount** - Filter operations are slow
4. **glitchIntensity** - More calculations per frame
5. **colorCount** - More color switching logic
6. **wavyMotion** - Sin calculations per column

### Optimization Strategies

**For Mobile**:
```tsx
fontSize={18}           // Fewer characters
glitchIntensity={0.03}  // Less calculation
glowEffect={false}      // No shadowBlur
blurAmount={0}          // No filter
speedVariation={0}      // Uniform speed
```

**For Desktop**:
```tsx
fontSize={14}           // Balanced
glitchIntensity={0.08}  // Standard
glowEffect={true}       // Glow OK
blurAmount={0-1}        // Minimal blur
```

---

## 🐛 COMMON ISSUES & SOLUTIONS

### Issue: Low FPS

**Solutions**:
1. Increase `fontSize` (18-20)
2. Disable `glowEffect`
3. Remove `blurAmount`
4. Reduce `glitchIntensity`
5. Use fewer colors (2-3)

### Issue: Characters Not Visible

**Causes**:
- `backgroundColor` alpha too high (use <0.98)
- `trailFade` too high
- Z-index issues

**Solutions**:
- Lower background alpha
- Reduce `trailFade`
- Ensure background z-index is 0

### Issue: Colors Not Changing

**Causes**:
- `glitchIntensity` too low
- `colorMode` mismatch

**Solutions**:
- Increase `glitchIntensity` (try 0.1)
- Check `colorMode` is compatible

### Issue: Jerky Animation

**Causes**:
- Performance too low
- Speed variation too high

**Solutions**:
- Optimize performance (see above)
- Reduce `speedVariation`
- Lower `fallSpeed`

---

## 🔄 BACKWARDS COMPATIBILITY

### Standard Component

**Never Break**:
- Original 6 parameters
- Default behavior
- Basic presets (Matrix, Cyberpunk, Conspiracy, Fire, Ice)

**Can Add**:
- New optional parameters (with defaults)
- New presets
- Performance optimizations

### ULTRA Component

**Can Change**:
- Add new parameters (with defaults)
- Modify advanced features
- Add new presets

**Document Breaking Changes**:
- Update version number
- Add migration guide to README_ULTRA.md
- Maintain old version as fallback

---

## 🎯 EXPORT FUNCTIONALITY

### React Code Export

**Format**:
```tsx
<FallingGlitchUltra
  glitchColors={["#9333ea", "#06b6d4"]}
  fontSize={14}
  fallSpeed={1.2}
  // ... all configured parameters
>
  <div />
</FallingGlitchUltra>
```

**Implementation**: See `exportAsCode()` in `demo-ultra.html`

### JSON Export

**Format**:
```json
{
  "glitchColors": ["#9333ea", "#06b6d4"],
  "fontSize": 14,
  "fallSpeed": 1.2,
  ...
}
```

**Implementation**: See `exportAsJSON()` in `demo-ultra.html`

---

## 📊 METRICS TO TRACK

### Performance Metrics
- FPS on desktop (target: 60)
- FPS on mobile (target: 45)
- Frame drops (target: <5% of frames)

### Usage Metrics
- Most used presets
- Most adjusted parameters
- Export usage frequency

### Quality Metrics
- Bug reports
- Feature requests
- User feedback

---

## 🌟 FUTURE ENHANCEMENTS

### Planned Features
- [ ] Sound sync (music reactive)
- [ ] Mouse interaction (particles on click)
- [ ] Layered depth (parallax effect)
- [ ] Custom fonts support
- [ ] WebGL acceleration option

### Potential Parameters
- [ ] Character rotation
- [ ] Opacity variation per column
- [ ] Multi-layer mode (2-3 layers)
- [ ] Impact effects (splash on bottom)
- [ ] Trail style (fade, solid, glow)

---

## 📝 NOTES FOR CLAUDE

### When User Requests:

**"Make it faster"**:
- Increase `fontSize`
- Disable `glowEffect`
- Remove `blurAmount`
- Suggest performance preset

**"More colors"**:
- Add to `glitchColors` array (max 8)
- Update demo color inputs
- Test performance

**"Different direction"**:
- Use `direction` prop (up/down/left/right)
- Update demo dropdown
- Test edge reset logic

**"New preset"**:
- Add to presets object
- Add button to demo
- Document in guides
- Test performance

**"Export isn't working"**:
- Check `exportAsCode()` function
- Verify clipboard API permission
- Test in different browsers

---

## ✅ QUALITY CHECKLIST

Before releasing changes:

- [ ] Components work in isolation
- [ ] Demos load without errors
- [ ] All presets render correctly
- [ ] Export functions work
- [ ] Documentation updated
- [ ] Performance benchmarked
- [ ] Browser compatibility verified
- [ ] Mobile tested
- [ ] Code commented
- [ ] TypeScript types complete

---

## 🎉 TEMPLATE STATUS

**Version**: 2.0 (ULTRA Edition)
**Components**: 2 (Standard + ULTRA)
**Parameters**: 6 + 22 = 28 total
**Presets**: 8+ built-in
**Documentation**: 80KB (12 files)
**Demos**: 2 (Basic + ULTRA)
**Performance**: 30-60 FPS
**Browser Support**: All modern browsers
**Framework Support**: React, Next.js, Vue, Astro
**Status**: Production Ready ✅

---

**Last Updated**: January 2025
**Created For**: ZMart Prediction Markets
**License**: MIT
**Maintainer**: ZMart Team

🌑 **Professional Matrix Animation Template!** 🚀
