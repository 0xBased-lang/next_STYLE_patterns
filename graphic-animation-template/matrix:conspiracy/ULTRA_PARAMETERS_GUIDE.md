# 🌑 ULTRA Parameters Guide - Advanced Matrix Animation

**Complete reference for all 20+ customizable parameters in FallingGlitchUltra component**

---

## 📊 Parameter Categories

1. **Basic Properties** (3 params)
2. **Speed & Motion** (3 params)
3. **Visual Effects** (6 params)
4. **Typography** (3 params)
5. **Color Configuration** (3 params)
6. **Advanced** (4 params)

**Total**: 22 customizable parameters!

---

## 🎨 1. BASIC PROPERTIES

### `glitchColors` (string[])
**Default**: `["#00ff41", "#06b6d4", "#9333ea", "#f59e0b"]`
**Range**: 1-8 colors recommended
**Description**: Array of hex color codes that characters can display

**Examples**:
```tsx
// Single color (monochrome)
glitchColors={["#00ff41"]}

// Duo-tone
glitchColors={["#ff00ff", "#00ffff"]}

// Full spectrum (8 colors)
glitchColors={["#ff0000", "#ff7700", "#ffff00", "#00ff00", "#0000ff", "#9900ff", "#ff00ff", "#ffffff"]}
```

**Tips**:
- Use 2-4 colors for best visual balance
- More colors = more color variation but potentially chaotic
- Use complementary colors for better contrast

---

### `fontSize` (number)
**Default**: `14`
**Range**: `8-32` recommended (px)
**Description**: Size of falling characters in pixels

**Examples**:
```tsx
fontSize={10}  // Small, dense characters
fontSize={14}  // Standard (balanced)
fontSize={20}  // Large, dramatic
fontSize={32}  // Extra large (fewer characters)
```

**Performance Impact**:
- Smaller = MORE characters = LOWER performance
- Larger = FEWER characters = HIGHER performance

---

### `backgroundColor` (string)
**Default**: `"rgba(0, 0, 0, 0.05)"`
**Format**: rgba(r, g, b, alpha)
**Description**: Background color with opacity (controls trail fade)

**Examples**:
```tsx
// Short trails (fast fade)
backgroundColor="rgba(0, 0, 0, 0.2)"

// Long trails (slow fade)
backgroundColor="rgba(0, 0, 0, 0.02)"

// No trails (instant fade)
backgroundColor="rgba(0, 0, 0, 1)"

// Colored background
backgroundColor="rgba(0, 20, 40, 0.05)"  // Dark blue tint
```

**Tips**:
- Lower alpha = longer trails
- Higher alpha = shorter trails
- Alpha 1.0 = no trails at all

---

## 🚀 2. SPEED & MOTION

### `fallSpeed` (number)
**Default**: `1`
**Range**: `0.1-5` recommended
**Description**: Base speed multiplier for falling characters

**Examples**:
```tsx
fallSpeed={0.5}   // Slow, meditative
fallSpeed={1}     // Normal (default)
fallSpeed={2}     // Fast
fallSpeed={5}     // Ultra fast, chaotic
```

**Tips**:
- 0.5-0.8: Calm, professional
- 1.0-1.5: Standard Matrix feel
- 2.0-3.0: Energetic, cyberpunk
- 3.0+: Chaos mode

---

### `speedVariation` (number)
**Default**: `0`
**Range**: `0-100` (percentage)
**Description**: Random speed variance per column

**Examples**:
```tsx
speedVariation={0}     // All same speed (uniform)
speedVariation={20}    // Slight variation (subtle)
speedVariation={50}    // Medium variation (organic)
speedVariation={100}   // Max variation (chaotic)
```

**Visual Effect**:
- 0%: Synchronized, uniform movement
- 25%: Slight organic feel
- 50%: Natural, varied movement
- 100%: Each column moves independently

---

### `direction` ("down" | "up" | "left" | "right")
**Default**: `"down"`
**Options**: `"down"`, `"up"`, `"left"`, `"right"`
**Description**: Direction of character movement

**Examples**:
```tsx
direction="down"   // ⬇️ Classic Matrix (falling)
direction="up"     // ⬆️ Rising (reverse)
direction="left"   // ⬅️ Scrolling left
direction="right"  // ➡️ Scrolling right
```

**Use Cases**:
- `down`: Traditional Matrix effect
- `up`: Fire/energy rising effect
- `left/right`: Sidebars, scrolling text

---

## ✨ 3. VISUAL EFFECTS

### `glitchIntensity` (number)
**Default**: `0.05` (5%)
**Range**: `0.0-0.5` (0%-50%)
**Description**: Probability of character changing color per frame

**Examples**:
```tsx
glitchIntensity={0.01}  // Subtle (1% - rare glitches)
glitchIntensity={0.05}  // Standard (5% - noticeable)
glitchIntensity={0.15}  // Aggressive (15% - frequent)
glitchIntensity={0.3}   // Chaos (30% - constant glitching)
```

**Visual Impact**:
- 0.01-0.03: Subtle, professional
- 0.05-0.08: Classic Matrix feel
- 0.1-0.2: Cyberpunk, energetic
- 0.2+: Maximum chaos

---

### `glitchSpeed` (number)
**Default**: `50`
**Range**: `10-200` (milliseconds)
**Description**: Interval between glitch calculations (lower = faster)

**Note**: Currently used for future enhancements. Use `glitchIntensity` for glitch frequency.

---

### `trailFade` (number)
**Default**: `0.05` (5%)
**Range**: `0.01-0.2` (1%-20%)
**Description**: How quickly trails fade (alternative to backgroundColor alpha)

**Examples**:
```tsx
trailFade={0.02}   // Long trails (slow fade)
trailFade={0.05}   // Standard trails
trailFade={0.1}    // Short trails
trailFade={0.2}    // Very short trails
```

**Tips**:
- Lower = longer trails = more ethereal
- Higher = shorter trails = more crisp

---

### `glowEffect` (boolean)
**Default**: `false`
**Description**: Enable/disable glow effect around characters

**Examples**:
```tsx
glowEffect={false}  // No glow (crisp)
glowEffect={true}   // Glowing characters (cyberpunk)
```

**Performance**:
- `false`: Better performance
- `true`: Slight performance hit but dramatic visual

---

### `glowIntensity` (number)
**Default**: `5`
**Range**: `0-20`
**Description**: Strength of glow effect (requires glowEffect={true})

**Examples**:
```tsx
glowIntensity={3}   // Subtle glow
glowIntensity={5}   // Standard glow
glowIntensity={10}  // Strong glow
glowIntensity={20}  // Maximum glow (bloom effect)
```

**Tips**:
- 3-5: Subtle, professional
- 5-10: Noticeable cyberpunk feel
- 10-20: Dramatic, neon aesthetic

---

### `blurAmount` (number)
**Default**: `0`
**Range**: `0-5` (pixels)
**Description**: Gaussian blur applied to entire canvas

**Examples**:
```tsx
blurAmount={0}     // No blur (sharp)
blurAmount={1}     // Subtle blur (dreamy)
blurAmount={2.5}   // Medium blur (ethereal)
blurAmount={5}     // Heavy blur (abstract)
```

**Use Cases**:
- 0: Sharp, clear (best for readability)
- 1-2: Soft, atmospheric background
- 3-5: Abstract, artistic effect

---

## 🔤 4. TYPOGRAPHY

### `characterSet` ("full" | "letters" | "numbers" | "binary" | "symbols" | "katakana" | "custom")
**Default**: `"full"`
**Options**: See below
**Description**: Which set of characters to display

**Character Sets**:

**`"full"`** - Mixed characters (default)
- English letters (A-Z)
- Numbers (0-9)
- Symbols (@#$%^&*()...)
- Japanese Katakana (アイウエオ...)

**`"letters"`** - Letters only
- A-Z uppercase

**`"numbers"`** - Numbers only
- 0-9

**`"binary"`** - Binary only
- 0 and 1

**`"symbols"`** - Symbols only
- @#$%^&*()_+-=[]{}|;:,.<>?/~`

**`"katakana"`** - Japanese only
- Full Katakana set

**`"custom"`** - Your custom characters
- Use with `customCharacters` prop

**Examples**:
```tsx
characterSet="full"       // All characters mixed
characterSet="binary"     // Only 01010101
characterSet="numbers"    // Only 0123456789
characterSet="katakana"   // Japanese aesthetic
characterSet="custom"     // Use customCharacters
```

---

### `customCharacters` (string)
**Default**: `""`
**Description**: Custom character string (requires characterSet="custom")

**Examples**:
```tsx
// DNA sequence
characterSet="custom"
customCharacters="ATCG"

// Block characters
characterSet="custom"
customCharacters="▓▒░█"

// Arrows
characterSet="custom"
customCharacters="←↑→↓↖↗↘↙"

// Your brand
characterSet="custom"
customCharacters="YOURBRAND"
```

**Tips**:
- Keep it short (4-20 chars) for good variety
- Mix similar-width characters for best visuals
- Test with different font sizes

---

### `columnDensity` (number)
**Default**: `100`
**Range**: `25-200` (percentage)
**Description**: Spacing between character columns

**Examples**:
```tsx
columnDensity={50}    // Wide spacing (sparse)
columnDensity={100}   // Standard spacing
columnDensity={150}   // Tight spacing (dense)
columnDensity={200}   // Very tight (chaotic)
```

**Visual Effect**:
- 25-75%: Sparse, open feel
- 100%: Balanced (default)
- 125-200%: Dense, claustrophobic feel

---

## 🎨 5. COLOR CONFIGURATION

### `colorMode` ("random" | "sequential" | "wave" | "pulse")
**Default**: `"random"`
**Description**: How colors change/transition

**Modes**:

**`"random"`** - Random color switching
- Each glitch picks random color
- Most chaotic and unpredictable
- Best for: Matrix, cyberpunk themes

**`"sequential"`** - Sequential color cycling
- Colors cycle in order
- Smooth, predictable transitions
- Best for: Gradual color shifts

**`"wave"`** - Wave pattern
- Colors flow in wave pattern
- Smooth, organic transitions
- Best for: Vaporwave, ambient themes

**`"pulse"`** - Pulse effect
- Colors alternate based on timing
- Rhythmic, synchronized
- Best for: Music sync, heartbeat effects

**Examples**:
```tsx
colorMode="random"      // Classic Matrix chaos
colorMode="sequential"  // Smooth color cycle
colorMode="wave"        // Flowing color waves
colorMode="pulse"       // Synchronized pulsing
```

---

### `rainbow` (boolean)
**Default**: `false`
**Description**: Enable dynamic rainbow effect (overrides glitchColors)

**Examples**:
```tsx
rainbow={false}  // Use glitchColors
rainbow={true}   // Full spectrum rainbow (HSL cycling)
```

**Effect**:
- When enabled, colors cycle through full HSL spectrum
- Each column has different hue offset
- Creates psychedelic rainbow effect
- Overrides `glitchColors` and `colorMode`

---

## 🔬 6. ADVANCED

### `resetChance` (number)
**Default**: `2.5`
**Range**: `0.1-10` (percentage)
**Description**: Probability of drop resetting to top per frame

**Examples**:
```tsx
resetChance={0.5}   // Rare resets (long drops)
resetChance={2.5}   // Standard (balanced)
resetChance={5}     // Frequent resets (short drops)
resetChance={10}    // Very frequent (choppy)
```

**Visual Effect**:
- Lower = fewer resets = longer continuous streams
- Higher = more resets = more "rain drop" effect

---

### `characterChangeSpeed` (number)
**Default**: `100`
**Range**: `10-200` (percentage)
**Description**: How fast characters cycle/change

**Examples**:
```tsx
characterChangeSpeed={50}   // Slow character cycling
characterChangeSpeed={100}  // Normal (default)
characterChangeSpeed={150}  // Fast cycling
characterChangeSpeed={200}  // Ultra fast (blur effect)
```

**Effect**:
- 50%: Slow, readable characters
- 100%: Standard Matrix feel
- 150-200%: Fast-changing, more abstract

---

### `wavyMotion` (boolean)
**Default**: `false`
**Description**: Enable horizontal sine wave motion

**Examples**:
```tsx
wavyMotion={false}  // Straight vertical lines
wavyMotion={true}   // Wavy, flowing motion
```

**Effect**:
- Adds horizontal sine wave to character positions
- Creates flowing, organic movement
- Best for: Vaporwave, dreamy aesthetics

---

### `waveAmplitude` (number)
**Default**: `10`
**Range**: `0-50` (pixels)
**Description**: Strength of wavy motion (requires wavyMotion={true})

**Examples**:
```tsx
waveAmplitude={5}    // Subtle wave
waveAmplitude={10}   // Standard wave
waveAmplitude={20}   // Strong wave
waveAmplitude={40}   // Extreme wave
```

**Visual Effect**:
- 5-10: Subtle flowing effect
- 15-25: Noticeable wave motion
- 30-50: Dramatic, disorienting effect

---

## 📊 PARAMETER COMBINATIONS

### 🎯 Performance-Optimized
```tsx
<FallingGlitchUltra
  fontSize={18}              // Fewer characters
  glitchIntensity={0.03}     // Less calculation
  glowEffect={false}         // No glow rendering
  blurAmount={0}             // No blur filter
  speedVariation={0}         // Uniform speed
  characterSet="letters"     // Simple charset
  colorCount={2}             // Minimal colors
/>
```

### 🔥 Maximum Chaos
```tsx
<FallingGlitchUltra
  fontSize={20}
  fallSpeed={3}
  speedVariation={100}
  glitchIntensity={0.3}
  glowEffect={true}
  glowIntensity={20}
  wavyMotion={true}
  waveAmplitude={40}
  rainbow={true}
  direction="down"
  characterSet="full"
/>
```

### 💎 Professional & Subtle
```tsx
<FallingGlitchUltra
  fontSize={12}
  fallSpeed={0.8}
  glitchIntensity={0.02}
  glowEffect={true}
  glowIntensity={3}
  trailFade={0.03}
  glitchColors={["#3b82f6", "#8b5cf6"]}
  colorMode="sequential"
  characterSet="letters"
/>
```

### 🌊 Vaporwave Aesthetic
```tsx
<FallingGlitchUltra
  fontSize={15}
  fallSpeed={1}
  glitchIntensity={0.1}
  glowEffect={true}
  glowIntensity={12}
  wavyMotion={true}
  waveAmplitude={15}
  glitchColors={["#ff71ce", "#01cdfe", "#05ffa1", "#b967ff"]}
  colorMode="wave"
  characterSet="katakana"
  trailFade={0.08}
/>
```

### 🔥 Fire Effect
```tsx
<FallingGlitchUltra
  fontSize={16}
  fallSpeed={1.5}
  direction="up"              // Rising effect
  glitchIntensity={0.12}
  glowEffect={true}
  glowIntensity={15}
  glitchColors={["#ff0000", "#ff6600", "#ff9900", "#ffcc00"]}
  colorMode="pulse"
  characterSet="symbols"
  trailFade={0.1}
/>
```

### 💻 Terminal Hacker
```tsx
<FallingGlitchUltra
  fontSize={12}
  fallSpeed={2}
  glitchIntensity={0.15}
  glowEffect={false}
  glitchColors={["#00ff00", "#00cc00", "#ffff00"]}
  colorMode="random"
  characterSet="full"
  backgroundColor="rgba(0, 20, 0, 0.05)"
  trailFade={0.02}
/>
```

### 🎮 Binary Code Stream
```tsx
<FallingGlitchUltra
  fontSize={14}
  fallSpeed={2}
  glitchIntensity={0.2}
  glowEffect={true}
  glowIntensity={8}
  glitchColors={["#00ff00", "#00cc00"]}
  characterSet="binary"
  columnDensity={80}
/>
```

---

## 🎨 COLOR PALETTE IDEAS

### Tech/Cyberpunk
```tsx
["#00ff41", "#06b6d4", "#9333ea", "#f59e0b"]  // Matrix green, cyan, purple, amber
["#ff00ff", "#00ffff", "#ffff00", "#ff0080"]  // Neon magenta, cyan, yellow, pink
["#ff0000", "#00ff00", "#0000ff", "#ffff00"]  // RGB primary + yellow
```

### Professional
```tsx
["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"]  // Blue, purple, cyan, green
["#1e40af", "#7c3aed", "#0891b2", "#059669"]  // Darker professional tones
```

### Warm/Fire
```tsx
["#ff0000", "#ff6600", "#ff9900", "#ffcc00"]  // Red to yellow gradient
["#dc2626", "#ea580c", "#f59e0b", "#fbbf24"]  // Tailwind warm colors
```

### Cool/Ice
```tsx
["#00ffff", "#0099ff", "#66ccff", "#99ddff"]  // Cyan to light blue
["#06b6d4", "#0ea5e9", "#3b82f6", "#60a5fa"]  // Tailwind blues
```

### Vaporwave
```tsx
["#ff71ce", "#01cdfe", "#05ffa1", "#b967ff"]  // Pink, cyan, mint, purple
["#ffeee6", "#ff9ff3", "#54a0ff", "#00d2d3"]  // Pastel vaporwave
```

---

## ⚡ PERFORMANCE TIPS

### High Performance (60 FPS)
- `fontSize`: 16-20 (fewer characters)
- `glitchIntensity`: ≤0.05
- `glowEffect`: false
- `blurAmount`: 0
- `speedVariation`: 0
- `colorCount`: 2-3

### Balanced (45-60 FPS)
- `fontSize`: 14-16
- `glitchIntensity`: 0.05-0.08
- `glowEffect`: true, `glowIntensity`: 5-8
- `blurAmount`: 0-1
- `colorCount`: 3-4

### Visual Priority (30-45 FPS)
- `fontSize`: 10-14
- `glitchIntensity`: 0.1-0.2
- `glowEffect`: true, `glowIntensity`: 10-15
- `blurAmount`: 1-3
- `wavyMotion`: true
- `colorCount`: 4-8

---

## 🎯 QUICK REFERENCE TABLE

| Parameter | Type | Default | Range | Impact |
|-----------|------|---------|-------|--------|
| `glitchColors` | string[] | 4 colors | 1-8 | Visual |
| `fontSize` | number | 14 | 8-32 | Visual + Perf |
| `fallSpeed` | number | 1 | 0.1-5 | Visual |
| `speedVariation` | number | 0 | 0-100 | Visual |
| `direction` | string | "down" | 4 options | Visual |
| `glitchIntensity` | number | 0.05 | 0-0.5 | Visual + Perf |
| `trailFade` | number | 0.05 | 0.01-0.2 | Visual |
| `glowEffect` | boolean | false | true/false | Visual + Perf |
| `glowIntensity` | number | 5 | 0-20 | Visual |
| `blurAmount` | number | 0 | 0-5 | Visual + Perf |
| `characterSet` | string | "full" | 7 options | Visual |
| `customCharacters` | string | "" | any | Visual |
| `columnDensity` | number | 100 | 25-200 | Visual + Perf |
| `colorMode` | string | "random" | 4 options | Visual |
| `rainbow` | boolean | false | true/false | Visual |
| `resetChance` | number | 2.5 | 0.1-10 | Visual |
| `characterChangeSpeed` | number | 100 | 10-200 | Visual |
| `wavyMotion` | boolean | false | true/false | Visual |
| `waveAmplitude` | number | 10 | 0-50 | Visual |

---

**Total Customization Options**: 20+ parameters
**Preset Combinations**: 8+ built-in presets
**Possible Variations**: Millions!

🌑 **ULTRA FLEXIBILITY ACHIEVED!** 🚀
