# Next Style Patterns MCP Server

Model Context Protocol (MCP) server providing AI/LLM access to the Next Style Patterns component registry.

## Features

- **TOON Format**: Uses TOON format for 33.6% token reduction vs JSON
- **Semantic Search**: Find components by keywords, tags, or use cases
- **Component Discovery**: Browse all available animations and GIF templates
- **Recommendations**: Get component suggestions based on use case descriptions
- **Resource Access**: Direct access to component metadata and specifications

## Installation

```bash
cd mcp-server
npm install
```

## Usage

### Running the Server

```bash
npm start
```

### Configuring in Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "next-style-patterns": {
      "command": "node",
      "args": ["/path/to/next_STYLE_patterns/mcp-server/server.mjs"]
    }
  }
}
```

## Available Tools

### 1. `search_components`

Search for components using semantic tags, keywords, or categories.

**Parameters:**
- `query` (required): Search query (e.g., "cyberpunk glitch", "aurora")
- `category` (optional): Filter by category ("animation" or "gif")
- `minConfidence` (optional): Minimum confidence score for use cases (0-1)

**Example:**
```json
{
  "query": "cyberpunk glitch",
  "category": "animation",
  "minConfidence": 0.9
}
```

### 2. `get_component`

Get complete details for a specific component by ID.

**Parameters:**
- `componentId` (required): Component ID (e.g., "aurora-flow", "holographic-glitch")

**Example:**
```json
{
  "componentId": "aurora-flow"
}
```

### 3. `list_components`

List all available components with basic information.

**Parameters:**
- `category` (optional): Filter by category ("animation" or "gif")
- `includePresets` (optional): Include preset configurations (default: false)

**Example:**
```json
{
  "category": "animation",
  "includePresets": true
}
```

### 4. `get_gif_template`

Get GIF template specifications for social media platforms.

**Parameters:**
- `platform` (required): Platform name ("twitter", "instagram", or "linkedin")

**Example:**
```json
{
  "platform": "twitter"
}
```

### 5. `recommend_component`

Get component recommendations based on use case description.

**Parameters:**
- `useCase` (required): Description of the use case
- `minConfidence` (optional): Minimum confidence threshold (default: 0.8)

**Example:**
```json
{
  "useCase": "hero section background",
  "minConfidence": 0.85
}
```

## Available Resources

### 1. `toon://registry/full`

Complete component registry in TOON format (33.6% smaller than JSON).

### 2. `toon://registry/statistics`

High-level statistics about the component registry.

### 3. `toon://component/{id}`

Individual component details by ID.

## Example Queries

### Finding a Component

**User**: "I need a cyberpunk glitch effect for my gaming website"

**Assistant** (uses MCP):
```
search_components({
  query: "cyberpunk glitch",
  category: "animation",
  minConfidence: 0.9
})
```

**Result**: Returns "Holographic Glitch: Cyberpunk" component with presets and usage examples.

### Getting Recommendations

**User**: "What's best for a hero section background?"

**Assistant** (uses MCP):
```
recommend_component({
  useCase: "hero section background",
  minConfidence: 0.9
})
```

**Result**: Returns "Aurora Flow: Ethereal" with 0.95 confidence score.

### Checking GIF Specs

**User**: "What are the Twitter GIF requirements?"

**Assistant** (uses MCP):
```
get_gif_template({
  platform: "twitter"
})
```

**Result**: Returns dimensions (1200x675), max size (15MB), FPS (15), and duration specs.

## Performance Benefits

### Token Efficiency

Using TOON format vs JSON:
- **Size**: 12,719 bytes (TOON) vs 19,167 bytes (JSON)
- **Tokens**: ~3,180 (TOON) vs ~4,792 (JSON)
- **Savings**: 33.6% fewer tokens per registry read

### Cost Savings

At $3/M input tokens (Claude Sonnet pricing):
- **Per read**: $0.004836 savings
- **Annual** (1000 reads/day): $1,765.14 savings

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   LLM (Claude)                      │
└───────────────────┬─────────────────────────────────┘
                    │ MCP Protocol
┌───────────────────▼─────────────────────────────────┐
│              MCP Server (Node.js)                   │
│  - search_components                                │
│  - get_component                                    │
│  - list_components                                  │
│  - get_gif_template                                 │
│  - recommend_component                              │
└───────────────────┬─────────────────────────────────┘
                    │ TOON Parser
┌───────────────────▼─────────────────────────────────┐
│          component-registry.toon                    │
│  - 6 Animation Components                           │
│  - 3 GIF Templates                                  │
│  - Semantic tags + Use cases                        │
│  - Performance metrics + Presets                    │
└─────────────────────────────────────────────────────┘
```

## Component Registry Structure

```toon
components:
  aurora-flow:
    id: aurora-flow
    name: Aurora Flow: Ethereal
    category: animation
    semanticTags[10]: aurora,northern-lights,waves,...
    useCases[4]{name,confidence}:
      Hero section background,0.95
      Meditation app background,0.9
    frameworks[4]: react,nextjs,astro,vue
    performance:
      fps{min,max,avg}: 55,60,58
    presets:
      subtle: {...}
      hero: {...}
```

## Development

### Testing

Create a test client:

```javascript
import { Client } from '@modelcontextprotocol/sdk/client/index.js'

const client = new Client({
  name: 'test-client',
  version: '1.0.0'
})

// Connect to server
await client.connect(transport)

// Call tool
const result = await client.request({
  method: 'tools/call',
  params: {
    name: 'search_components',
    arguments: {
      query: 'aurora'
    }
  }
})

console.log(result)
```

## Roadmap

- [ ] Add caching for frequently accessed components
- [ ] Implement real-time registry updates
- [ ] Add component preview generation
- [ ] Support for custom component plugins
- [ ] Integration with design tools (Figma, Sketch)
- [ ] Performance benchmarking tools
- [ ] A/B testing recommendations

## License

MIT
