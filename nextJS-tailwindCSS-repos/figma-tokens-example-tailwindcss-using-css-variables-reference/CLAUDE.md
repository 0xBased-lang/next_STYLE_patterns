# Figma Tokens → Tailwind CSS Workflow Example

**GitHub**: https://github.com/mirahi-io/figma-tokens-example-tailwindcss-using-css-variables-reference
**Blog Post**: https://garden.mirahi.io/how-to-use-the-color-tokens-from-your-design-system-directly-in-tailwind-css/
**Type**: Design Token Workflow Example
**Author**: Mathieu Laurent @ [Mirahi](https://mirahi.io)
**License**: MIT
**Framework**: NuxtJS 3 + Tailwind CSS

---

## 🎯 What is This Project?

This repository is a **complete workflow example** demonstrating how to transform design tokens from **Figma Tokens** into **Tailwind CSS** using **CSS variables with references**. It bridges the gap between design systems in Figma and CSS frameworks in code.

### Core Problem Solved

> "How do you keep your design system in sync between Figma and code?"

**The Challenge**:
- Designers create design tokens in Figma (colors, spacing, typography)
- Developers need these tokens in Tailwind CSS
- Manual synchronization is error-prone and time-consuming
- Changes in Figma require manual code updates

**The Solution**:
- **Automated Pipeline**: Figma Tokens → Style Dictionary → CSS Variables → Tailwind CSS
- **Theme Support**: Multiple themes (light/dark) from single token source
- **Reference Preservation**: Token references maintained through transformation
- **Single Source of Truth**: Figma as the authoritative design system

---

## ✨ Complete Workflow Architecture

### Design Token Pipeline

```
┌─────────────────┐
│  Figma Tokens   │  ← Design tokens defined in Figma
│  (JSON export)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ token-transformer│ ← Transform tokens per theme
│  (Token sets)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Style Dictionary│ ← Build CSS variables
│ (CSS variables) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  CSS Variables  │ ← Generated theme files
│  (light/dark)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Tailwind CSS   │ ← Reference CSS vars in config
│  (config.js)    │
└─────────────────┘
```

---

## 🛠 Technology Stack

### Core Dependencies

**Token Processing**:
- **Figma Tokens**: Design token management in Figma
- **token-transformer**: Transform tokens by theme/set
- **Style Dictionary**: Build system for design tokens

**Framework & Styling**:
- **NuxtJS**: 3.0.0-rc.10 (Vue 3 framework)
- **TailwindCSS**: @nuxtjs/tailwindcss 5.3.3
- **nuxt-icon**: 0.1.5 (Icon integration)

**Development Tools**:
- **ESLint**: Code linting (@antfu/eslint-config)
- **TypeScript**: Type safety

---

## 📖 Complete Workflow Breakdown

### Step 1: Define Tokens in Figma

**Figma Tokens Plugin**:
- Install Figma Tokens plugin in Figma
- Define design tokens in Figma
- Organize into token sets (global, light, dark)
- Export tokens to `tokens.json`

**Token Structure** (`tokens.json`):
```json
{
  "global": {
    "colors": {
      "primary": {
        "value": "#007bff",
        "type": "color"
      },
      "spacing": {
        "sm": {
          "value": "8px",
          "type": "spacing"
        }
      }
    }
  },
  "light": {
    "background": {
      "value": "{global.colors.white}",
      "type": "color"
    }
  },
  "dark": {
    "background": {
      "value": "{global.colors.black}",
      "type": "color"
    }
  }
}
```

---

### Step 2: Transform Tokens by Theme

**token-transformer** separates tokens into theme-specific files:

```bash
# Transform global tokens
npx token-transformer tokens.json styles/tokens/global.json global

# Transform light theme (preserve references)
npx token-transformer tokens.json styles/tokens/light.json global,light,theme --resolveReferences=false

# Transform dark theme (preserve references)
npx token-transformer tokens.json styles/tokens/dark.json global,dark,theme --resolveReferences=false
```

**Why `--resolveReferences=false`?**
- Keeps token references intact: `{global.colors.primary}`
- Style Dictionary resolves references in next step
- Maintains token relationships through pipeline

**Output Files**:
- `styles/tokens/global.json`: Base tokens
- `styles/tokens/light.json`: Light theme tokens
- `styles/tokens/dark.json`: Dark theme tokens

---

### Step 3: Build CSS Variables with Style Dictionary

**Style Dictionary Configuration** (`style-token.js`):

```javascript
const StyleDictionary = require('style-dictionary')

// Custom transform to create CSS variable references
StyleDictionary.registerTransform({
  name: 'css/variables',
  type: 'value',
  matcher: (token) => token.type === 'color',
  transformer: (token) => {
    // Transform color tokens to CSS variables
    return `var(--${token.path.join('-')})`
  }
})

// Build configuration
const buildConfig = {
  source: ['styles/tokens/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'styles/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: {
            outputReferences: true
          }
        }
      ]
    }
  }
}

// Build
StyleDictionary.extend(buildConfig).buildAllPlatforms()
```

**Generated CSS Variables** (`styles/variables.css`):
```css
:root {
  /* Global tokens */
  --color-primary: #007bff;
  --spacing-sm: 8px;
}

[data-theme="light"] {
  /* Light theme */
  --background: var(--color-white);
  --foreground: var(--color-black);
}

[data-theme="dark"] {
  /* Dark theme */
  --background: var(--color-black);
  --foreground: var(--color-white);
}
```

---

### Step 4: Integrate with Tailwind CSS

**Tailwind Configuration** (`tailwind.config.js`):

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Reference CSS variables in Tailwind
        primary: 'var(--color-primary)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      spacing: {
        sm: 'var(--spacing-sm)',
      }
    }
  }
}
```

**Usage in Components**:
```vue
<template>
  <div class="bg-background text-foreground">
    <button class="bg-primary">Primary Button</button>
    <div class="p-sm">Small padding</div>
  </div>
</template>
```

**Theme Switching**:
```vue
<template>
  <button @click="toggleTheme">
    Toggle Light/Dark
  </button>
</template>

<script setup>
const toggleTheme = () => {
  const current = document.documentElement.dataset.theme
  document.documentElement.dataset.theme =
    current === 'dark' ? 'light' : 'dark'
}
</script>
```

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js 16+ and npm
- NuxtJS knowledge (Vue 3)
- Basic understanding of design tokens
- Figma account (for token management)

### Quick Start

**1. Clone Repository**:
```bash
git clone https://github.com/mirahi-io/figma-tokens-example-tailwindcss-using-css-variables-reference.git
cd figma-tokens-example-tailwindcss-using-css-variables-reference
```

**2. Install Dependencies**:
```bash
npm install
```

**3. Build Style Files**:
```bash
# Complete build: transform + generate CSS + Tailwind config
npm run build-styles

# Or step by step:
npm run build-transform    # Transform tokens
npm run build-tailwind     # Generate Tailwind config
```

**4. Start Development**:
```bash
npm run dev
# Opens http://localhost:3000
```

**5. Test Theme Switching**:
- Click the "dark-light" toggle button
- Watch colors change between themes

---

## 📁 Project Structure

```
project/
├── tokens.json                    # Source: Figma Tokens export
├── styles/
│   ├── tokens/
│   │   ├── global.json           # Generated: Global tokens
│   │   ├── light.json            # Generated: Light theme
│   │   └── dark.json             # Generated: Dark theme
│   ├── variables.css             # Generated: CSS variables
│   └── themes/
│       ├── light.css             # Generated: Light theme styles
│       └── dark.css              # Generated: Dark theme styles
├── style-token.js                # Style Dictionary config
├── tailwind.config.js            # Tailwind config (references CSS vars)
├── nuxt.config.ts                # Nuxt configuration
├── app.vue                       # Main application component
├── assets/                       # Static assets
└── package.json                  # Dependencies
```

---

## 🎨 Token Types & Examples

### Color Tokens

**Definition** (`tokens.json`):
```json
{
  "global": {
    "colors": {
      "brand": {
        "primary": { "value": "#007bff", "type": "color" },
        "secondary": { "value": "#6c757d", "type": "color" }
      }
    }
  },
  "light": {
    "background": {
      "value": "{global.colors.white}",
      "type": "color"
    }
  }
}
```

**Generated CSS**:
```css
:root {
  --color-brand-primary: #007bff;
  --color-brand-secondary: #6c757d;
}

[data-theme="light"] {
  --background: var(--color-white);
}
```

**Tailwind Usage**:
```javascript
// tailwind.config.js
colors: {
  brand: {
    primary: 'var(--color-brand-primary)',
    secondary: 'var(--color-brand-secondary)',
  },
  background: 'var(--background)',
}
```

```html
<div class="bg-background text-brand-primary">
  Themed content
</div>
```

---

### Spacing Tokens

**Definition**:
```json
{
  "spacing": {
    "xs": { "value": "4px", "type": "spacing" },
    "sm": { "value": "8px", "type": "spacing" },
    "md": { "value": "16px", "type": "spacing" },
    "lg": { "value": "24px", "type": "spacing" },
    "xl": { "value": "32px", "type": "spacing" }
  }
}
```

**Tailwind Integration**:
```javascript
spacing: {
  xs: 'var(--spacing-xs)',
  sm: 'var(--spacing-sm)',
  md: 'var(--spacing-md)',
  lg: 'var(--spacing-lg)',
  xl: 'var(--spacing-xl)',
}
```

---

### Typography Tokens

**Definition**:
```json
{
  "typography": {
    "fontSize": {
      "sm": { "value": "14px", "type": "fontSize" },
      "base": { "value": "16px", "type": "fontSize" },
      "lg": { "value": "18px", "type": "fontSize" }
    },
    "fontWeight": {
      "normal": { "value": "400", "type": "fontWeight" },
      "bold": { "value": "700", "type": "fontWeight" }
    }
  }
}
```

**Tailwind Integration**:
```javascript
fontSize: {
  sm: 'var(--font-size-sm)',
  base: 'var(--font-size-base)',
  lg: 'var(--font-size-lg)',
},
fontWeight: {
  normal: 'var(--font-weight-normal)',
  bold: 'var(--font-weight-bold)',
}
```

---

## 🔧 NPM Scripts

### Available Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build           # Build for production
npm run generate        # Generate static site
npm run preview         # Preview production build

# Token Transformation
npm run build-transform-global  # Transform global tokens
npm run build-transform-light   # Transform light theme
npm run build-transform-dark    # Transform dark theme
npm run build-transform        # Transform all themes

# Style Building
npm run build-tailwind         # Build Tailwind config
npm run build-styles          # Complete build (transform + styles)

# Code Quality
npm run lint                  # Lint code
npm run lint:fix             # Fix linting issues

# Setup
npm run postinstall          # Prepare Nuxt
```

---

## 🎯 Use Cases & Benefits

### Use Case 1: Design-Dev Sync

**Scenario**: Designer updates brand colors in Figma

**Workflow**:
1. Designer updates primary color in Figma Tokens
2. Export updated `tokens.json`
3. Run `npm run build-styles`
4. All components using `text-brand-primary` automatically update
5. Commit changes to git

**Benefit**: 5-minute sync vs hours of manual updates

---

### Use Case 2: Multi-Theme Applications

**Scenario**: Support light, dark, and high-contrast themes

**Implementation**:
```json
// tokens.json
{
  "global": { /* shared tokens */ },
  "light": { /* light theme */ },
  "dark": { /* dark theme */ },
  "high-contrast": { /* accessibility theme */ }
}
```

**Benefit**: Add new themes without touching component code

---

### Use Case 3: Design System Documentation

**Scenario**: Maintain design system source of truth

**Workflow**:
- Figma Tokens = Design system specification
- Auto-generated CSS = Implementation
- NuxtJS app = Living documentation

**Benefit**: Always in sync, single source of truth

---

### Use Case 4: Component Library

**Scenario**: Build component library with themeable components

**Implementation**:
- All components use CSS variable references
- Themes switchable via data attribute
- No component code changes needed

**Benefit**: Flexible, maintainable component library

---

## 🆚 Comparison with Alternatives

| Approach | Figma Tokens Workflow | Manual CSS | CSS-in-JS Themes | Tailwind Themes |
|----------|----------------------|------------|------------------|-----------------|
| **Design Sync** | ✅ Automated | ❌ Manual | ❌ Manual | ⚠️ Semi-manual |
| **Theme Switching** | ✅ CSS vars | ⚠️ Class switching | ✅ JS runtime | ⚠️ Class switching |
| **Performance** | ✅ No JS overhead | ✅ No JS | ❌ JS bundle | ✅ No JS |
| **Maintainability** | ✅ Single source | ❌ Multiple sources | ⚠️ Code-based | ⚠️ Code-based |
| **Designer-Friendly** | ✅ Figma native | ❌ Code knowledge | ❌ Code knowledge | ❌ Code knowledge |
| **Type Safety** | ⚠️ Generated types | ❌ None | ✅ TypeScript | ⚠️ IntelliSense |

---

## 🎓 Advanced Techniques

### Custom Transformations

**Custom Style Dictionary Transform**:
```javascript
// style-token.js
StyleDictionary.registerTransform({
  name: 'size/px-to-rem',
  type: 'value',
  matcher: (token) => token.type === 'spacing',
  transformer: (token) => {
    // Convert px to rem
    const value = parseFloat(token.value)
    return `${value / 16}rem`
  }
})
```

### Token Validation

**Validate Before Build**:
```javascript
const validateTokens = (tokens) => {
  // Check all color tokens have valid hex values
  // Check spacing tokens are consistent scale
  // Validate font weights are standard values
}
```

### Multi-Brand Support

**Token Organization**:
```json
{
  "brand-a": {
    "colors": { /* Brand A colors */ }
  },
  "brand-b": {
    "colors": { /* Brand B colors */ }
  }
}
```

---

## 🐛 Troubleshooting

### Build Errors

**Problem**: "Token references not resolved"

**Solution**:
```bash
# Ensure --resolveReferences=false during token-transformer
# Let Style Dictionary resolve references

npx token-transformer tokens.json styles/tokens/light.json \
  global,light,theme --resolveReferences=false
```

### Theme Not Switching

**Problem**: Theme changes don't apply

**Solution**:
```html
<!-- Ensure data-theme attribute on root element -->
<html data-theme="light">
  <!-- Your app -->
</html>

<script>
// Toggle theme
document.documentElement.dataset.theme = 'dark'
</script>
```

### CSS Variables Not Working

**Problem**: Tailwind classes don't use CSS variables

**Solution**:
```javascript
// tailwind.config.js
// Ensure CSS variables are properly referenced
colors: {
  primary: 'var(--color-primary)',  // ✅ Correct
  // NOT: 'var(color-primary)'      // ❌ Wrong
}
```

---

## 📚 Additional Resources

### Official Documentation

- **Figma Tokens**: https://github.com/six7/figma-tokens
- **token-transformer**: https://github.com/six7/figma-tokens/tree/main/token-transformer
- **Style Dictionary**: https://amzn.github.io/style-dictionary/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **NuxtJS**: https://nuxt.com/docs

### Related Examples

- **More Examples**: https://github.com/six7/figma-tokens-examples (by Jan Six)
- **Mirahi Blog**: https://garden.mirahi.io/
- **Mirahi Agency**: https://mirahi.io

### Community

- **Figma Tokens Community**: Figma plugin community
- **Style Dictionary Slack**: Design tokens community
- **Tailwind Discord**: Tailwind CSS community

---

## 🔮 Future Enhancements

**Potential Additions**:
- TypeScript type generation from tokens
- Component Storybook with token docs
- Token visualization dashboard
- Automated Figma → Git workflow
- Multi-brand theme selector
- Accessibility compliance checker
- Token usage analytics

---

## 🌟 Learning Outcomes

**What You'll Learn**:
1. Design token workflow automation
2. Figma Tokens plugin usage
3. Style Dictionary configuration
4. CSS variables in Tailwind
5. Theme switching implementation
6. Build system integration
7. Design-dev collaboration

**Skills Gained**:
- Design system management
- Build tool configuration
- Token transformation pipelines
- CSS architecture
- Theme implementation

---

**Last Updated**: 2025-10-24
**Purpose**: Complete design token workflow reference
**Maintainer**: Mathieu Laurent @ Mirahi
**License**: MIT - Free for commercial use
**Blog Post**: https://garden.mirahi.io/how-to-use-the-color-tokens-from-your-design-system-directly-in-tailwind-css/
