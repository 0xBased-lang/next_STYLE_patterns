# TOON Format Integration

This repository now uses **TOON (Token-Oriented Object Notation)** for AI/LLM optimization, achieving **33.6% token reduction** compared to JSON.

## Overview

TOON is a data format designed specifically for efficient LLM consumption:
- **33.6% smaller** than equivalent JSON
- **~1,612 fewer tokens** per registry read
- **$1,765.14 annual savings** (at 1000 reads/day, $3/M tokens)
- **Lossless round-trip** conversion with JSON
- **Human-readable** YAML-like syntax

## Files

### Core Files

- **component-registry.toon** - Complete component registry (12.7KB)
  - 6 animation components
  - 3 GIF templates
  - Semantic tags, use cases, presets
  - Performance metrics, framework compatibility

- **test-toon-parser.mjs** - Validation and testing
  - TOON parsing verification
  - Round-trip conversion testing
  - Size/token comparison
  - Semantic search simulation

- **convert-toon.mjs** - Conversion utilities
  - JSON ↔ TOON conversion
  - Registry validation
  - Format comparison
  - Cost analysis

### MCP Server

- **mcp-server/** - Model Context Protocol server
  - AI/LLM integration via MCP
  - Semantic component search
  - Use case recommendations
  - Direct TOON format access

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Test TOON Parser

```bash
node test-toon-parser.mjs
```

**Expected output:**
```
✅ Successfully parsed TOON!
📦 Components found: 6
🎬 GIF Templates found: 3
📊 Savings: 33.6%
🎯 Token savings: ~1,612 (33.6%)
```

### 3. Validate Registry

```bash
node convert-toon.mjs validate-toon component-registry.toon
```

### 4. Convert Formats

```bash
# TOON to JSON
node convert-toon.mjs toon-to-json component-registry.toon output.json

# JSON to TOON
node convert-toon.mjs json-to-toon input.json output.toon

# Compare formats
node convert-toon.mjs compare data.json data.toon
```

### 5. Run MCP Server

```bash
cd mcp-server
npm install
npm start
```

## TOON Format Examples

### Simple Arrays

```toon
frameworks[4]: react,nextjs,astro,vue
```

**vs JSON:**
```json
{
  "frameworks": ["react", "nextjs", "astro", "vue"]
}
```

### Structured Arrays

```toon
useCases[4]{name,confidence}:
  Hero section background,0.95
  Meditation app background,0.9
  Luxury brand website,0.85
  Ambient experience,0.9
```

**vs JSON:**
```json
{
  "useCases": [
    { "name": "Hero section background", "confidence": 0.95 },
    { "name": "Meditation app background", "confidence": 0.9 },
    { "name": "Luxury brand website", "confidence": 0.85 },
    { "name": "Ambient experience", "confidence": 0.9 }
  ]
}
```

### Nested Objects

```toon
performance:
  fps:
    min: 55
    max: 60
    avg: 58
  bundleSize: 4KB gzipped
  cpuUsage: medium
  mobileCompatible: true
```

**vs JSON:**
```json
{
  "performance": {
    "fps": {
      "min": 55,
      "max": 60,
      "avg": 58
    },
    "bundleSize": "4KB gzipped",
    "cpuUsage": "medium",
    "mobileCompatible": true
  }
}
```

## Component Registry Structure

The `component-registry.toon` file contains:

### Animation Components (6)

Each component includes:
- **Metadata**: ID, name, category, type, description
- **Semantic Tags**: 8-12 tags for AI discovery
- **Use Cases**: 3-4 cases with confidence scores (0-1)
- **Themes**: 4-5 visual themes with descriptions
- **Versions**: Standard/Ultra implementations
- **Performance**: FPS, bundle size, CPU usage, mobile support
- **Frameworks**: React, Next.js, Astro, Vue support
- **Presets**: Pre-configured settings (subtle, hero, energetic, etc.)
- **AI Prompt Examples**: 3 example prompts for each component

Example components:
1. **Aurora Flow: Ethereal** - Northern Lights effect
2. **Holographic Glitch: Cyberpunk** - RGB split glitch
3. **Matrix: Conspiracy** - Falling digital rain
4. **Morphing Blob: Organic** - Metaball animation
5. **Neon Trails: Tron** - Light trail particles
6. **Particle Explosion: Cosmic** - Physics-based burst

### GIF Templates (3)

Platform-specific templates:
- **Twitter Demo** - 1200x675, 15MB max, 15 FPS
- **Instagram Square** - 1080x1080, 15MB max, 15 FPS
- **LinkedIn Header** - 1584x396, 8MB max, 12 FPS

Each template includes:
- Platform specifications (dimensions, size, FPS, duration)
- Use cases with confidence scores
- Quality presets (quick, balanced, quality)
- AI prompt examples

## MCP Server Tools

The MCP server provides 5 tools for AI/LLM integration:

### 1. search_components

Find components by keywords, tags, or categories.

```javascript
{
  query: "cyberpunk glitch",
  category: "animation",
  minConfidence: 0.9
}
```

### 2. get_component

Get complete component details by ID.

```javascript
{
  componentId: "aurora-flow"
}
```

### 3. list_components

List all components with optional filters.

```javascript
{
  category: "animation",
  includePresets: true
}
```

### 4. get_gif_template

Get platform-specific GIF specifications.

```javascript
{
  platform: "twitter"
}
```

### 5. recommend_component

Get recommendations based on use case.

```javascript
{
  useCase: "hero section background",
  minConfidence: 0.85
}
```

## Performance Comparison

| Metric | JSON | TOON | Savings |
|--------|------|------|---------|
| File Size | 19,167 bytes | 12,719 bytes | 33.6% |
| Tokens | ~4,792 | ~3,180 | ~1,612 |
| Cost/Read | $0.014376 | $0.009540 | $0.004836 |
| Annual Cost* | $5,247.24 | $3,482.10 | $1,765.14 |

*Assuming 1000 reads/day at $3/M tokens (Claude Sonnet pricing)

## Use Case Examples

### Example 1: Finding a Component

**Prompt**: "I need a cyberpunk glitch effect for my gaming website"

**MCP Call**: `search_components({ query: "cyberpunk glitch" })`

**Result**: Returns "Holographic Glitch: Cyberpunk" with:
- 12 semantic tags (glitch, cyberpunk, holographic, rgb-split, etc.)
- 98% confidence for "Cyberpunk themed site"
- 4 themes (minimal, intense, matrix, vhs)
- 3 presets (subtle, intense, matrix)
- Performance: 57 FPS avg, 6KB gzipped

### Example 2: Getting Recommendations

**Prompt**: "What's the best animation for a meditation app background?"

**MCP Call**: `recommend_component({ useCase: "meditation app" })`

**Result**: Returns "Aurora Flow: Ethereal" with:
- 90% confidence for "Meditation app background"
- Recommended preset: "subtle" theme
- 58 FPS avg, mobile compatible
- Example prompt: "Create a calming aurora background for a meditation app"

### Example 3: Social Media GIF

**Prompt**: "I need to create a demo GIF for Twitter"

**MCP Call**: `get_gif_template({ platform: "twitter" })`

**Result**: Returns Twitter template with:
- Dimensions: 1200x675
- Max size: 15MB
- Duration: 5-15s
- FPS: 15
- 3 quality presets (quick, balanced, quality)

## Benefits

### For AI/LLM Integration

1. **Token Efficiency**: 33.6% fewer tokens = faster processing & lower costs
2. **Semantic Search**: Rich tag system for accurate component discovery
3. **Confidence Scores**: ML-ready use case recommendations
4. **Structured Data**: Consistent schema for reliable parsing
5. **Human-Readable**: Easy to understand and modify

### For Developers

1. **Smaller Files**: 33.6% size reduction vs JSON
2. **Fast Parsing**: Optimized TOON parser
3. **Type Safety**: Well-defined schema with validation
4. **Round-Trip**: Lossless JSON ↔ TOON conversion
5. **Tooling**: Conversion utilities and validators

### For Cost Optimization

1. **Lower API Costs**: $1,765/year savings (1000 reads/day)
2. **Reduced Bandwidth**: Smaller file transfers
3. **Faster Processing**: Fewer tokens = quicker responses
4. **Scalable**: Savings increase with usage

## Technical Details

### TOON Syntax Rules

- **No comments**: TOON doesn't support comments (intentional design)
- **Arrays**: Declare count and fields: `items[3]{id,name}:`
- **Inline arrays**: `tags[5]: tag1,tag2,tag3,tag4,tag5`
- **List arrays**: Use hyphens for complex items:
  ```toon
  items[2]:
    - First item
    - Second item
  ```
- **Indentation**: 2 spaces per level (YAML-like)
- **Keys**: Letters, digits, underscores, dots (no leading digit)

### Validation

The `convert-toon.mjs` utility validates:
- Required fields (version, format, components)
- Component structure (id, name, category)
- Semantic tags presence and format
- Use case confidence scores (0-1 range)
- Performance metrics (FPS, bundle size)
- Framework compatibility lists
- GIF template specifications

### Error Handling

Common issues and solutions:

**Issue**: "Missing colon after key"
- **Cause**: Comments (`#`) in TOON file
- **Solution**: Remove all comments

**Issue**: "Expected N list array items, but got 0"
- **Cause**: Missing hyphens in list arrays
- **Solution**: Add `-` prefix to each list item

**Issue**: "Component not found"
- **Cause**: Invalid component ID
- **Solution**: Use `list_components` tool to see available IDs

## Migration Guide

### From JSON to TOON

1. Create JSON registry:
```json
{
  "version": "1.0.0",
  "components": { ... }
}
```

2. Convert to TOON:
```bash
node convert-toon.mjs json-to-toon registry.json registry.toon
```

3. Validate:
```bash
node convert-toon.mjs validate-toon registry.toon
```

4. Compare savings:
```bash
node convert-toon.mjs compare registry.json registry.toon
```

## Resources

- **TOON Specification**: https://github.com/toon-format/spec
- **MCP Protocol**: https://modelcontextprotocol.io
- **Component Registry**: `component-registry.toon`
- **MCP Server**: `mcp-server/README.md`
- **Test Suite**: `test-toon-parser.mjs`

## Next Steps

1. ✅ TOON format integration (Phase 1 complete)
2. ⏳ Deploy MCP server for production use
3. ⏳ Create LangChain integration (Python)
4. ⏳ Build component preview system
5. ⏳ Add real-time registry updates
6. ⏳ Integrate with design tools (Figma, Sketch)

## Support

For issues or questions:
1. Check `test-toon-parser.mjs` output for validation errors
2. Review `convert-toon.mjs` for conversion utilities
3. See `mcp-server/README.md` for MCP integration
4. Validate TOON syntax: https://github.com/toon-format/spec

---

**Token Savings**: 33.6% | **Annual Cost Savings**: $1,765.14 | **Components**: 6 | **GIF Templates**: 3
