# ReactBits MCP Server - 135+ Animated React Components Access

**GitHub**: https://github.com/ceorkm/reactbits-mcp-server
**npm**: reactbits-dev-mcp-server
**Type**: Model Context Protocol (MCP) Server
**Author**: ReactBits MCP
**License**: MIT
**Version**: 1.1.2
**Tech Stack**: TypeScript, Node.js 18+, MCP SDK

---

## 🎯 Purpose

AI-powered access to 135+ animated React components from [ReactBits.dev](https://reactbits.dev). Provides AI assistants with component discovery, source code retrieval, and demo generation capabilities.

**⚠️ Important Note**: Some ReactBits components (buttons, forms, loaders) currently have incomplete implementations. See [Component Quality Status](#component-quality-status) below.

## ⚡ Key Capabilities

### Core Features
- **Component Discovery**: Browse and search through all 135+ ReactBits components
- **Smart Search**: Find components by name, category, or description
- **Style Options**: Access both CSS and Tailwind versions of components
- **Category Navigation**: Filter components by categories (animations, backgrounds, buttons, etc.)
- **Fast Performance**: Built-in caching for optimal response times
- **Demo Generation**: Get usage examples and demo code for any component
- **GitHub Integration**: Smart caching with rate limit handling (60/hr anonymous, 5000/hr with token)

### Supported Component Categories
- **Animations** (9.5/10): BlobCursor, SplashCursor, Magnet, etc.
- **Backgrounds** (9.8/10): Aurora, Beams, Particles, etc.
- **Text Animations** (9.0/10): BlurText, CountUp, CircularText, etc.
- **Buttons** ⚠️ (2.0/10): Incomplete implementations
- **Cards**: Card components with hover effects and animations
- **Forms** ⚠️ (2.0/10): Incomplete implementations
- **Loaders** ⚠️ (2.0/10): Incomplete implementations
- **Navigation**: Navigation menus and interfaces
- **Components**: General UI components and layouts

## 📦 Installation

### Global Installation
```bash
# Install globally
npm install -g reactbits-dev-mcp-server

# Or run directly with npx (no installation required)
npx reactbits-dev-mcp-server

# Or install as dependency
npm install reactbits-dev-mcp-server
```

### From Source
```bash
# Clone repository
git clone https://github.com/ceorkm/reactbits-mcp-server
cd reactbits-mcp-server

# Install dependencies
npm install

# Build project
npm run build

# Run server
npm start
```

## 🔌 Editor Integrations

### Claude Desktop

Add to your Claude Desktop configuration:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
**Linux**: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "reactbits": {
      "command": "npx",
      "args": ["reactbits-dev-mcp-server"],
      "env": {
        "GITHUB_TOKEN": "your_github_token_here"
      }
    }
  }
}
```

### VS Code (with Continue extension)

```json
{
  "continue.server": {
    "mcpServers": {
      "reactbits": {
        "command": "npx",
        "args": ["reactbits-dev-mcp-server"]
      }
    }
  }
}
```

### Cursor

```json
{
  "mcpServers": {
    "reactbits": {
      "command": "npx",
      "args": ["reactbits-dev-mcp-server"],
      "env": {
        "GITHUB_TOKEN": "your_github_token_here"
      }
    }
  }
}
```

## 🛠️ Available MCP Tools

### `list_components`
List all available ReactBits components with optional filtering.

**Parameters**:
- `category` (optional): Filter by category (e.g., "animations", "backgrounds", "buttons")
- `style` (optional): Filter by styling method ("css", "tailwind", "default")
- `limit` (optional): Maximum number of components to return

**Example Usage**:
```
"List all animation components with Tailwind support"
```

**Returns**:
```json
{
  "components": [
    {
      "name": "splash-cursor",
      "category": "animations",
      "description": "Interactive cursor with splash effect",
      "styles": ["css", "tailwind"],
      "dependencies": ["gsap"],
      "quality_score": 9.5
    }
  ],
  "total": 15
}
```

### `get_component`
Get the source code for a specific ReactBits component.

**Parameters**:
- `name` (required): Name of the component (e.g., "splash-cursor", "pixel-card")
- `style` (optional): Preferred styling method ("css", "tailwind", "default")

**Example Usage**:
```
"Show me the source code for the splash cursor component"
```

**Returns**:
```json
{
  "name": "splash-cursor",
  "code": "// Complete React component code",
  "dependencies": ["react", "gsap"],
  "usage_example": "// How to use this component",
  "style": "tailwind"
}
```

### `search_components`
Search for ReactBits components by name or description.

**Parameters**:
- `query` (required): Search query
- `category` (optional): Filter by category
- `limit` (optional): Maximum number of results

**Example Usage**:
```
"Find all components related to cards"
```

**Returns**:
```json
{
  "results": [
    {
      "name": "pixel-card",
      "relevance_score": 0.95,
      "category": "cards",
      "description": "Card with pixel art style"
    }
  ]
}
```

### `get_component_demo`
Get usage example and demo code for a ReactBits component.

**Parameters**:
- `name` (required): Name of the component

**Example Usage**:
```
"Show me how to use the glow button component"
```

**Returns**:
```json
{
  "component": "glow-button",
  "demo_code": "// Complete demo implementation",
  "props_documentation": {},
  "integration_notes": "Installation and setup instructions"
}
```

### `list_categories`
List all available component categories.

**Example Usage**:
```
"What categories of components are available?"
```

**Returns**:
```json
{
  "categories": [
    {
      "name": "animations",
      "count": 15,
      "quality_score": 9.5,
      "description": "Dynamic cursor effects and interactive animations"
    },
    {
      "name": "backgrounds",
      "count": 12,
      "quality_score": 9.8,
      "description": "Animated and static background patterns"
    }
  ]
}
```

## 🎨 Component Quality Status

Based on comprehensive testing, here's the current quality status:

### ✅ Excellent Quality (9.0-10/10)

**Backgrounds (9.8/10)**: Production-ready WebGL effects
- Aurora
- Beams
- Particles
- Animated gradients
- Pattern backgrounds

**Dependencies**: three.js, @react-three/fiber, ogl

**Animations (9.5/10)**: Professional animations
- BlobCursor
- SplashCursor
- Magnet
- Interactive hover effects
- Cursor followers

**Dependencies**: gsap, framer-motion

**Text Animations (9.0/10)**: Complete Framer Motion implementations
- BlurText
- CountUp
- CircularText
- Typing effects
- Text reveals

**Dependencies**: framer-motion

### ⚠️ Incomplete Components (2.0/10)

**Buttons**: All 8 button components return placeholder code
- Glow Button
- Ripple Button
- Magnetic Button
- Others...

**Forms**: All 3 form components are incomplete
- Input fields
- Text areas
- Selectors

**Loaders**: All 9 loader components are incomplete
- Spinner variants
- Progress indicators
- Loading animations

## 💻 Usage Examples

### With AI Assistants

Once configured, you can ask your AI assistant questions like:

- "Show me all the background animation components from ReactBits"
- "I need a glowing button component - what's available?"
- "How do I implement the particle background effect?"
- "Find all text animation components that support Tailwind"
- "Show me the code for the glass morphism card component"

### Example Conversation

```
User: I need an animated background for my landing page

AI: mcp_tool: list_components(category="backgrounds", limit=5)

AI: I found several great options:
1. Aurora Background (9.8/10) - Stunning WebGL aurora effect
2. Particle Background (9.5/10) - Interactive particles
3. Animated Beams (9.7/10) - Moving light beams

Which style matches your design?

User: Show me the Aurora background code

AI: mcp_tool: get_component(name="aurora", style="tailwind")

AI: Here's the Aurora background component:
[Complete code with Tailwind CSS classes]

Dependencies needed:
- three.js
- @react-three/fiber
- ogl

Installation: npm install three @react-three/fiber ogl
```

## 🔧 Technical Details

### Project Structure

```
reactbits-mcp-server/
├── src/
│   ├── index.ts                    # Main server entry point
│   ├── services/
│   │   └── ReactBitsService.ts     # Component fetching logic
│   ├── types/
│   │   └── index.ts                # TypeScript type definitions
│   └── utils/
│       └── CacheManager.ts         # Caching utility
├── dist/                           # Compiled output
├── package.json
├── tsconfig.json
├── README.md
├── CHANGELOG.md
└── test-essential.js               # Testing utilities
```

### Dependencies Management

**Component Dependencies by Category**:

```typescript
{
  "animations": ["gsap"],
  "backgrounds": ["three.js", "@react-three/fiber", "ogl"],
  "text-animations": ["framer-motion"],
  "cards": ["framer-motion"],
  "navigation": ["framer-motion"]
}
```

### Caching Strategy

- **GitHub API Responses**: Cached for 1 hour
- **Component Code**: Cached for 24 hours
- **Category Lists**: Cached for 6 hours
- **Smart Invalidation**: Cache cleared on version updates

## 🔐 GitHub API Token (Optional but Recommended)

The server can work without a GitHub token but will be limited to **60 requests per hour**. With a token, you get up to **5,000 requests per hour**.

### Setting up a GitHub Token

1. Create a GitHub personal access token at https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - No special scopes needed (public repository access only)
   - Copy the generated token

2. Set it as an environment variable:

**Option 1: Export in your shell**
```bash
export GITHUB_TOKEN=your_token_here
```

**Option 2: Create a .env file**
```bash
cp .env.example .env
# Edit .env and add your token
```

**Option 3: Pass when running the server**
```bash
GITHUB_TOKEN=your_token_here npx reactbits-dev-mcp-server
```

**⚠️ Security Note**: Never commit your GitHub token to version control. Always use environment variables.

## 📊 Performance Metrics

### Response Times
- **Component List**: 50-200ms (cached) / 500-1000ms (uncached)
- **Component Source**: 100-300ms (cached) / 1000-2000ms (uncached)
- **Search**: 50-100ms (cached) / 300-500ms (uncached)

### Bundle Sizes
- **Server**: ~50KB
- **Average Component**: 5-15KB (code only)
- **With Dependencies**: Varies by component (10KB-500KB)

### Cache Hit Rates
- **Typical Usage**: 85-95% cache hit rate
- **First Run**: 0% (cold cache)
- **After Warmup**: 90%+ for frequently accessed components

## 🎯 Use Cases

### Rapid Prototyping
- Quickly find and integrate animated components
- Test different animation styles
- Build proof-of-concepts with production-ready components

### Learning & Education
- Study high-quality React component implementations
- Learn animation techniques with GSAP and Framer Motion
- Understand WebGL effects with Three.js examples

### Production Development
- Use excellent-quality backgrounds and animations
- Integrate professional cursor effects
- Add text animations to marketing pages

### Design System Building
- Curate components for your design system
- Study implementation patterns
- Adapt components to match your brand

## 🚀 Development

### Building

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev
```

### Testing

```bash
# Run the MCP inspector for debugging
npx @modelcontextprotocol/inspector

# Test essential components
npm test
```

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## ⚠️ Known Limitations

### Incomplete Components
- **Buttons**: All 8 components have placeholder implementations
- **Forms**: All 3 components need completion
- **Loaders**: All 9 components are incomplete

### Rate Limits
- **Without Token**: 60 requests/hour
- **With Token**: 5,000 requests/hour
- **Recommendation**: Always use GitHub token for production

### Browser Compatibility
- **WebGL Components**: Require modern browsers with WebGL support
- **Animation Libraries**: Check individual component compatibility

## 🐛 Troubleshooting

### Common Issues

**Issue**: "Rate limit exceeded"
```bash
# Solution: Add GitHub token
export GITHUB_TOKEN=your_token_here
```

**Issue**: "Component not found"
```bash
# Solution: List all components first
# Use exact component name from list
npx reactbits-dev-mcp-server
```

**Issue**: "Build errors"
```bash
# Solution: Clean and rebuild
npm run clean
npm install
npm run build
```

## 📚 Resources

### Official Resources
- **ReactBits.dev**: https://reactbits.dev
- **GitHub**: https://github.com/ceorkm/reactbits-mcp-server
- **Issues**: https://github.com/ceorkm/reactbits-mcp-server/issues
- **Discussions**: https://github.com/ceorkm/reactbits-mcp-server/discussions

### Component Libraries
- **Framer Motion**: https://www.framer.com/motion/
- **GSAP**: https://greensock.com/gsap/
- **Three.js**: https://threejs.org/
- **React Three Fiber**: https://docs.pmnd.rs/react-three-fiber

### MCP Resources
- **Anthropic MCP**: https://anthropic.com
- **MCP Specification**: https://modelcontextprotocol.io
- **MCP Community**: https://github.com/modelcontextprotocol

## 🎓 Learning Path

### Beginner
1. Install and configure the server
2. List all available components
3. Get source code for simple components
4. Integrate a background animation

### Intermediate
1. Search for specific component types
2. Compare CSS vs Tailwind implementations
3. Understand component dependencies
4. Build custom combinations

### Advanced
1. Contribute missing component implementations
2. Optimize caching strategies
3. Extend server with custom tools
4. Build automated component testing

## 🏆 Acknowledgments

- **ReactBits.dev**: For the amazing component collection
- **Anthropic**: For the Model Context Protocol specification
- **MCP Community**: For inspiration and examples

---

**Last Updated**: 2025-10-24
**Status**: Active Development
**Node Version**: 18.0.0+
**Components**: 135+ (Quality varies by category)
