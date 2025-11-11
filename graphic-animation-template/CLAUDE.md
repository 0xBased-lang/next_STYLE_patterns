# CLAUDE.md - Graphic Animation Template Repository

**Instructions for Claude Code when working with this template repository**

---

## 🎯 REPOSITORY OVERVIEW

**Purpose**: Reusable animation templates collection for web projects

**Current Templates**:
1. **Matrix/Conspiracy** (`matrix:conspiracy/`) - Falling characters Matrix-style animation with 22 customizable parameters

**Structure**:
```
graphic-animation-template/
├── CLAUDE.md                    ← This file (main repo instructions)
├── START_HERE.md                ← User quick start guide
├── ULTRA_SUMMARY.md            ← Enhancement summary
└── matrix:conspiracy/           ← Matrix animation template
    ├── CLAUDE.md                ← Template-specific instructions
    ├── START_HERE.md            ← Template quick start
    ├── falling-glitch.tsx       ← Standard component
    ├── falling-glitch-ultra.tsx ← ULTRA component (22 params)
    ├── demo.html                ← Basic demo
    ├── demo-ultra.html          ← ULTRA demo (20+ controls)
    └── [8 documentation files]   ← Comprehensive docs
```

---

## 🎯 PRIMARY DIRECTIVES

### When Adding New Templates

1. **Create New Subdirectory**
   ```bash
   mkdir template-name
   ```

2. **Required Files Per Template**:
   - `CLAUDE.md` - Template-specific Claude instructions
   - `START_HERE.md` - User quick start guide
   - `README.md` - Basic documentation
   - Component file(s) (`.tsx`, `.jsx`, `.vue`, etc.)
   - Demo file (`.html` or live demo)
   - Parameter documentation

3. **Update Main Files**:
   - Update this `CLAUDE.md` with new template info
   - Update main `START_HERE.md` with new template link

### When Modifying Existing Templates

1. **Read Template's CLAUDE.md First**
   - Each subdirectory has template-specific instructions
   - Follow established patterns and conventions

2. **Maintain Backward Compatibility**
   - Keep original component versions
   - Create new versions with `-ultra` or version suffix
   - Update documentation to explain differences

3. **Update All Related Docs**
   - Component changes → Update parameter guides
   - New features → Update examples
   - Breaking changes → Update START_HERE.md with migration guide

---

## 📚 DOCUMENTATION STANDARDS

### Required Documentation Per Template

1. **CLAUDE.md** (This file for subdirectory)
   - Template purpose and use cases
   - File structure explanation
   - Parameter overview
   - Special considerations
   - Testing requirements

2. **START_HERE.md**
   - Quick start (30-second setup)
   - File overview
   - Common usage examples
   - Links to detailed docs

3. **README.md**
   - Comprehensive parameter reference
   - All customization options
   - Performance guidelines
   - Framework compatibility

4. **COPY_PASTE_EXAMPLES.md** (if applicable)
   - Ready-to-use code snippets
   - Common configurations
   - Integration examples for popular frameworks

5. **Parameter Guide** (for complex templates)
   - Each parameter explained in detail
   - Range, defaults, visual impact
   - Performance implications
   - Example configurations

---

## 🎨 TEMPLATE NAMING CONVENTIONS

### Directory Names
- Use kebab-case: `matrix-conspiracy`, `particle-explosion`
- Descriptive of visual effect
- Avoid version numbers in directory names

### Component File Names
- Standard version: `template-name.tsx`
- Advanced version: `template-name-ultra.tsx`
- Framework-specific: `template-name.vue`, `template-name.svelte`

### Demo File Names
- Basic demo: `demo.html`
- Advanced demo: `demo-ultra.html`
- Framework demos: `demo-next.tsx`, `demo-react.tsx`

---

## 🔧 COMPONENT STANDARDS

### TypeScript Components

```tsx
interface ComponentNameProps {
  // Basic Properties
  basicProp1?: type;
  basicProp2?: type;

  // Visual Effects
  visualProp1?: type;

  // Advanced
  advancedProp1?: type;

  // Children
  children?: React.ReactNode;
}

export function ComponentName({
  basicProp1 = defaultValue,
  // ... defaults for all props
  children,
}: ComponentNameProps) {
  // Implementation
}
```

**Requirements**:
- TypeScript with full type definitions
- Default values for all optional props
- Commented prop categories
- Performance-optimized (aim for 60 FPS)
- Canvas or WebGL based (avoid heavy DOM manipulation)

### Demo Files

**Required Features**:
- Live parameter controls
- Multiple preset configurations
- Export functionality (code + JSON)
- FPS monitoring
- Mobile responsive
- No build dependencies (pure HTML/JS)

---

## 📊 TESTING REQUIREMENTS

### Performance Testing

**Minimum Standards**:
- Desktop: 60 FPS (1920x1080)
- Desktop 4K: 45+ FPS
- Mobile: 45+ FPS (with optimized settings)
- Tablet: 50+ FPS

**Test Configurations**:
- Minimum settings (highest performance)
- Balanced settings (default)
- Maximum settings (visual priority)

### Browser Compatibility

**Must Test On**:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile Chrome (iOS & Android)
- ✅ Mobile Safari (iOS)

### Framework Compatibility

**Must Work With**:
- Next.js (App Router & Pages Router)
- React (Create React App, Vite)
- Vue 3
- Astro (with client directives)

---

## 🎯 TEMPLATE QUALITY CHECKLIST

Before marking a template as complete:

### Code Quality
- [ ] TypeScript types for all props
- [ ] Default values documented
- [ ] Performance optimized (60 FPS target)
- [ ] No console errors or warnings
- [ ] Clean, commented code

### Documentation
- [ ] CLAUDE.md (template-specific)
- [ ] START_HERE.md (quick start)
- [ ] README.md (comprehensive)
- [ ] Parameter guide (all options explained)
- [ ] COPY_PASTE_EXAMPLES.md (ready code)

### Demos
- [ ] Basic demo (HTML)
- [ ] Advanced demo with controls (HTML)
- [ ] All features demonstrated
- [ ] Export functionality working
- [ ] Mobile responsive

### Testing
- [ ] Works in all major browsers
- [ ] Mobile tested (iOS & Android)
- [ ] Framework compatibility verified
- [ ] Performance benchmarked
- [ ] Edge cases handled

### User Experience
- [ ] 30-second quick start possible
- [ ] Presets provided (5+ recommended)
- [ ] Clear error messages
- [ ] Helpful inline comments
- [ ] Progressive enhancement approach

---

## 🚀 DEVELOPMENT WORKFLOW

### Adding a New Template

1. **Create Directory Structure**
   ```bash
   mkdir new-template
   cd new-template
   ```

2. **Create Core Files**
   ```bash
   touch CLAUDE.md START_HERE.md README.md
   touch component-name.tsx component-name-ultra.tsx
   touch demo.html demo-ultra.html
   touch PARAMETERS_GUIDE.md COPY_PASTE_EXAMPLES.md
   ```

3. **Implement Component**
   - Start with basic version
   - Add ULTRA version with advanced features
   - Test performance at each stage

4. **Create Demos**
   - Basic demo with 3-5 controls
   - ULTRA demo with all controls
   - Add export functionality

5. **Write Documentation**
   - Component-specific CLAUDE.md
   - User-facing START_HERE.md
   - Comprehensive README.md
   - Parameter guide with examples

6. **Test Thoroughly**
   - All browsers
   - Mobile devices
   - Performance benchmarks
   - Framework integration

7. **Update Main Files**
   - Add to main CLAUDE.md
   - Update main START_HERE.md
   - Create SUMMARY.md for the template

---

## 🎨 CURRENT TEMPLATES DETAIL

### Matrix/Conspiracy Template

**Location**: `matrix:conspiracy/`
**Components**: 2 (standard + ULTRA)
**Parameters**: 6 (standard), 22 (ULTRA)
**Presets**: 8+ built-in
**Documentation**: 80KB+ (12 files)

**See**: `matrix:conspiracy/CLAUDE.md` for template-specific instructions

---

## 🔄 MAINTENANCE GUIDELINES

### Updating Existing Templates

1. **Version Management**:
   - Keep old versions for backward compatibility
   - Create new files with version suffix or `-ultra`
   - Document breaking changes

2. **Documentation Updates**:
   - Update parameter guides
   - Add migration guides if needed
   - Update examples

3. **Performance Optimization**:
   - Regular performance audits
   - Optimize for new browser features
   - Test on latest devices

### Adding Features to Templates

1. **Feature Requests**:
   - Document in template's CLAUDE.md
   - Assess performance impact
   - Ensure backward compatibility

2. **Implementation**:
   - Add to ULTRA version first
   - Test thoroughly
   - Update all documentation

---

## 📦 EXPORT STANDARDS

### Code Export

**Must Support**:
- React/TSX format
- JSON configuration format
- Preset export/import

**Format Example**:
```tsx
<ComponentName
  prop1={value1}
  prop2={value2}
  // ... all configured props
>
  <div />
</ComponentName>
```

### JSON Configuration

```json
{
  "version": "2.0",
  "component": "ComponentName",
  "props": {
    "prop1": "value1",
    "prop2": "value2"
  }
}
```

---

## 🌟 BEST PRACTICES

### Performance
- Use `requestAnimationFrame` for animations
- Optimize canvas operations
- Implement efficient rendering
- Provide performance modes (high/balanced/visual)

### User Experience
- Provide instant visual feedback
- Include helpful tooltips
- Offer preset configurations
- Enable export/save functionality

### Code Quality
- Use TypeScript
- Comment complex logic
- Follow React best practices
- Implement proper error handling

### Documentation
- Write for beginners
- Provide advanced examples
- Include troubleshooting
- Keep docs up-to-date

---

## 🎯 FUTURE TEMPLATE IDEAS

Potential templates to add:
- [ ] Particle systems (explosions, trails)
- [ ] Wave animations (sine, ripple)
- [ ] Glow effects (neon, aurora)
- [ ] Text effects (glitch, typing)
- [ ] Background patterns (geometric, organic)
- [ ] Transition effects (page, element)
- [ ] Loading animations (spinners, progress)
- [ ] Interactive effects (mouse follow, parallax)

---

## 📝 NOTES FOR CLAUDE

### When User Requests:

**"Add new template"**:
1. Create subdirectory
2. Follow structure above
3. Create all required files
4. Update main CLAUDE.md

**"Modify existing template"**:
1. Read template's CLAUDE.md first
2. Maintain backward compatibility
3. Update all related docs
4. Test thoroughly

**"Enhance template"**:
1. Create ULTRA version if needed
2. Add to existing ULTRA version if available
3. Update parameter guides
4. Add examples

**"Create demo"**:
1. Follow demo standards above
2. Include all controls
3. Add export functionality
4. Make mobile responsive

---

## 🎉 REPOSITORY STATUS

**Version**: 1.0
**Templates**: 1 (Matrix/Conspiracy)
**Total Size**: 164KB
**Documentation**: Comprehensive
**Status**: Production Ready ✅

---

**Last Updated**: January 2025
**Maintained By**: ZMart Team
**License**: MIT

🌑 **Quality Animation Templates for Modern Web Development!** 🚀
