# MCP Tailwind Gemini Server - AI-Powered Tailwind CSS Assistant

**GitHub**: https://github.com/Tai-DT/mcp-tailwind-gemini
**Type**: Model Context Protocol (MCP) Server
**Author**: Tai-DT
**License**: MIT
**Version**: 1.0.0
**Tech Stack**: TypeScript, Node.js 18+, Gemini AI, Puppeteer, Sharp
**Prerequisites**: Node.js 18+, Docker (optional), Gemini API key (optional)

---

## 🎯 Purpose

Advanced Model Context Protocol server for Tailwind CSS with **Gemini AI integration** and **cross-platform support** for intelligent design assistance across all major development environments.

## ⚡ Key Capabilities

### 🤖 AI-Powered Design
- **Intelligent Component Generation**: Create sophisticated Tailwind components using Gemini AI
- **Smart Optimization**: AI-driven class optimization and conflict resolution
- **Design Analysis**: Comprehensive design quality assessment with improvement suggestions
- **Theme Creation**: Generate cohesive design systems with AI assistance

### 🎨 Tailwind CSS Tools
- **Component Generator**: Create buttons, cards, forms, navigation, modals, and custom components
- **Class Optimizer**: Clean up redundant classes and resolve conflicts
- **CSS Converter**: Transform existing CSS/SCSS to Tailwind classes
- **Layout Generator**: Build responsive layouts for dashboards, landing pages, blogs, and more
- **Theme Creator**: Generate custom color palettes, typography, and design tokens
- **Preview Generator**: Visual component previews with screenshot capability

### 🌐 Cross-Platform Integration
- **Multi-Framework Support**: React, Vue, Svelte, Angular with automatic component conversion
- **Build Tool Integration**: Vite, Webpack, Next.js, Nuxt, SvelteKit project generation
- **IDE Extensions**: VS Code, WebStorm plugins with live assistance
- **Design Tool Sync**: Figma plugin for design-to-code conversion
- **Universal Deployment**: CLI tools, browser extensions, and API integrations

### 🚀 Advanced Capabilities
- **Framework Adapters**: Automatic component conversion between frameworks
- **Universal Project Generation**: Create full-stack applications with any tech stack
- **Multi-Platform Deployment**: Deploy to development environments, production, and design tools
- **External API Integration**: Gemini, OpenAI, Claude, Figma for enhanced AI capabilities
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Accessibility**: WCAG compliance checking and enhancement suggestions
- **Performance**: Bundle size optimization and render performance analysis
- **Visual Preview**: Screenshot generation for component visualization

## 📦 Installation

### Quick Start with Docker

```bash
# 1. Clone repository
git clone https://github.com/Tai-DT/mcp-tailwind-gemini.git
cd mcp-tailwind-gemini

# 2. Set up environment
cp env.example .env
# Edit .env file with your API key
# GEMINI_API_KEY=your_actual_api_key_here

# 3. Deploy with Docker
docker-compose -f docker-compose.prod.yml up -d

# 4. Check status
docker ps | grep mcp-tailwind-server
```

### Local Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Build the project
npm run build

# 3. Set up environment
cp env.example .env
# Edit with your API key

# 4. Run development server
npm run dev
```

## 🔌 Editor Integrations

### Claude Desktop

Add to `claude_desktop_config.json`:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
**Linux**: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "tailwind-gemini": {
      "command": "npx",
      "args": ["mcp-gemini-cli", "--allow-npx"],
      "env": {
        "GEMINI_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

**Alternative Configuration (using npm)**:
```json
{
  "mcpServers": {
    "mcp-tailwind-gemini": {
      "command": "npm",
      "args": ["run", "start"],
      "cwd": "/path/to/your/mcp-tailwind-gemini",
      "env": {
        "GEMINI_API_KEY": "your_gemini_api_key_here"
      }
    }
  }
}
```

### Cursor IDE

Add to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "mcp-tailwind-gemini": {
      "command": "node",
      "args": ["/path/to/your/mcp-tailwind-gemini/dist/index.js"],
      "env": {
        "GEMINI_API_KEY": "your_gemini_api_key_here"
      }
    }
  }
}
```

## 🛠️ Available Tools

### Component Generation

**Tool**: `generate_component`

```javascript
{
  "tool": "generate_component",
  "description": "Create a responsive button component",
  "type": "button",
  "variant": "primary",
  "size": "lg",
  "framework": "react",
  "responsive": true,
  "accessibility": true
}
```

**Returns**:
```json
{
  "code": "// Complete React component code",
  "tailwind_classes": ["bg-blue-500", "hover:bg-blue-600", "..."],
  "props": {},
  "accessibility_features": ["aria-label", "role", "..."]
}
```

### Class Optimization

**Tool**: `optimize_classes`

```javascript
{
  "tool": "optimize_classes",
  "html": "<div class=\"p-4 px-4 py-4 text-blue-500 text-blue-600\">Content</div>",
  "removeRedundant": true,
  "mergeConflicts": true
}
```

**Returns**:
```json
{
  "optimized_html": "<div class=\"p-4 text-blue-600\">Content</div>",
  "removed_classes": ["px-4", "py-4", "text-blue-500"],
  "improvements": "Removed 3 redundant classes, merged 1 conflict"
}
```

### Theme Creation

**Tool**: `create_theme`

```javascript
{
  "tool": "create_theme",
  "brandColor": "#3B82F6",
  "style": "modern",
  "colorCount": 9,
  "includeConfig": true
}
```

**Returns**:
```json
{
  "colors": {
    "primary-50": "#eff6ff",
    "primary-500": "#3b82f6",
    "primary-900": "#1e3a8a"
  },
  "tailwind_config": "module.exports = {...}",
  "css_variables": ":root { --primary: #3b82f6; }"
}
```

### Design Analysis

**Tool**: `analyze_design`

```javascript
{
  "tool": "analyze_design",
  "html": "<div>...</div>",
  "checkAccessibility": true,
  "checkResponsive": true,
  "checkPerformance": true
}
```

**Returns**:
```json
{
  "accessibility_score": 8.5,
  "responsive_score": 9.0,
  "performance_score": 7.5,
  "issues": ["Missing alt text", "Not mobile optimized"],
  "suggestions": ["Add alt attributes", "Use responsive classes"]
}
```

### Preview Generation

**Tool**: `generate_preview`

```javascript
{
  "tool": "generate_preview",
  "html": "<button class=\"bg-blue-500 text-white px-4 py-2 rounded\">Button</button>",
  "width": 800,
  "height": 600
}
```

**Returns**:
```json
{
  "screenshot_path": "/tmp/preview_12345.png",
  "screenshot_base64": "data:image/png;base64,...",
  "dimensions": {"width": 800, "height": 600}
}
```

### CSS Conversion

**Tool**: `convert_to_tailwind`

```javascript
{
  "tool": "convert_to_tailwind",
  "code": ".button { padding: 1rem; background: #3B82F6; }",
  "format": "css",
  "optimize": true
}
```

**Returns**:
```json
{
  "tailwind_classes": "p-4 bg-blue-500",
  "converted_selectors": {".button": "p-4 bg-blue-500"},
  "optimization_notes": "Converted 2 CSS properties to Tailwind"
}
```

### AI Suggestions

**Tool**: `suggest_improvements`

```javascript
{
  "tool": "suggest_improvements",
  "html": "<div>...</div>",
  "context": "E-commerce product card",
  "focusAreas": ["accessibility", "performance", "ux"]
}
```

**Returns**:
```json
{
  "suggestions": [
    {
      "category": "accessibility",
      "priority": "high",
      "issue": "Missing semantic HTML",
      "fix": "Use <article> instead of <div>"
    }
  ],
  "improved_html": "// Optimized version"
}
```

### Layout Generation

**Tool**: `create_layout`

```javascript
{
  "tool": "create_layout",
  "type": "dashboard",
  "sections": ["header", "sidebar", "main", "footer"],
  "complexity": "medium",
  "framework": "react"
}
```

**Returns**:
```json
{
  "layout_code": "// Complete React layout component",
  "sections": {},
  "responsive_breakpoints": {"sm": "640px", "md": "768px", "lg": "1024px"}
}
```

## 🎯 Use Cases

### Creating Components
Generate production-ready components with AI assistance:
- Modern button variants with accessibility features
- Responsive card layouts with proper spacing
- Form components with validation styling
- Navigation menus with mobile-first design

### Design Optimization
Improve existing designs with intelligent analysis:
- Remove redundant Tailwind classes
- Resolve conflicting utility classes
- Optimize for performance and maintainability
- Enhance accessibility compliance

### Theme Development
Build comprehensive design systems:
- Generate cohesive color palettes
- Create typography scales
- Design spacing systems
- Export Tailwind configuration files

### Code Migration
Convert existing CSS to Tailwind:
- Transform legacy CSS to utility classes
- Migrate from other frameworks
- Optimize class usage patterns
- Maintain visual consistency

## 🌐 Cross-Platform Usage

### Multi-Framework Development

```javascript
// Convert HTML component to any framework
{
  "tool": "generate_component",
  "description": "Modern button component",
  "framework": "react", // or "vue", "svelte", "angular"
  "typescript": true,
  "features": ["loading-state", "variant-support"]
}
```

### Universal Project Generation

```javascript
// Create full-stack project with any tech stack
{
  "tool": "create_project",
  "name": "My App",
  "framework": "react",
  "buildTool": "vite", // or "webpack", "nextjs", "nuxt"
  "features": ["typescript", "tailwind", "testing", "deployment"]
}
```

### Platform Integration

```bash
# VS Code Extension
code --install-extension tailwind-mcp-assistant

# WebStorm Plugin
# Install from JetBrains Marketplace: "Tailwind MCP Assistant"

# Figma Plugin
# Search "Tailwind MCP" in Figma Community

# CLI Tool
npm install -g tailwind-mcp-cli
tmcp generate --framework react --description "Product card"

# Browser Extension
# Install from Chrome Web Store: "Tailwind MCP Assistant"
```

### Cross-Platform Workflow

```bash
# 1. Design in Figma → Extract with plugin
# 2. Convert to multiple frameworks
tmcp convert --from figma --to react,vue,svelte

# 3. Generate optimized projects
tmcp create-project --framework react --build vite
tmcp create-project --framework vue --build nuxt

# 4. Deploy to multiple platforms
tmcp deploy --platforms vercel,netlify,aws
```

## 🔧 Development

### Running Locally

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Testing MCP Server

```bash
# 1. Test with echo command
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}' | node dist/index.js

# 2. Test with a simple tool call
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "generate_component", "arguments": {"description": "A simple button", "type": "button"}}}' | node dist/index.js

# 3. Test with environment variable
GEMINI_API_KEY="your_key" node dist/index.js
```

### Environment Variables
- `GEMINI_API_KEY`: Your Google Gemini API key (optional)
- `NODE_ENV`: Environment mode (development/production)

### Project Structure

```
src/
├── index.ts                        # Main MCP server
├── tools/                          # MCP tool implementations
│   ├── component-generator.ts
│   ├── class-optimizer.ts
│   ├── theme-creator.ts
│   ├── design-analyzer.ts
│   ├── preview-generator.ts
│   ├── css-converter.ts
│   ├── ai-suggestions.ts
│   └── layout-generator.ts
└── utils/
    └── gemini.ts                   # Gemini AI integration
```

## 🐳 Docker Deployment

### Quick Docker Setup

```bash
# Build production image
docker build -f Dockerfile.runtime -t mcp-tailwind-runtime:latest .

# Run container
docker run -d \
  --name mcp-tailwind-server \
  --env-file .env \
  --restart unless-stopped \
  mcp-tailwind-runtime:latest
```

### Docker Compose (Recommended)

```bash
# Start production stack
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop services
docker-compose -f docker-compose.prod.yml down
```

### Security Best Practices

**1. Environment Variables:**
```bash
# Use .env file (never commit to Git)
cp env.example .env
# Edit .env with your actual API key
```

**2. Container Security:**
```bash
# Run with resource limits
docker run -d \
  --name mcp-tailwind-server \
  --env-file .env \
  --memory=512m \
  --cpus=1.0 \
  --restart unless-stopped \
  mcp-tailwind-runtime:latest
```

**3. Network Isolation:**
```bash
# Create isolated network
docker network create mcp-network

# Run with custom network
docker run -d \
  --name mcp-tailwind-server \
  --network mcp-network \
  --env-file .env \
  --restart unless-stopped \
  mcp-tailwind-runtime:latest
```

## 🐛 Troubleshooting

### Common Issues

**1. MCP Server not starting:**
- Ensure you've run `npm run build` first
- Check that `dist/index.js` exists
- Verify Node.js version is 18+

**2. Gemini API errors:**
- Set your `GEMINI_API_KEY` environment variable
- Verify the API key is valid and has proper permissions
- Check your internet connection

**3. Docker container issues:**
```bash
# Check container logs
docker logs mcp-tailwind-server

# Verify environment
docker exec mcp-tailwind-server env | grep GEMINI

# Restart container
docker restart mcp-tailwind-server
```

**4. Claude Desktop not connecting:**
- Restart Claude Desktop after updating config
- Check the config file path is correct
- Verify JSON syntax is valid

**5. Build errors:**
```bash
# Clean and rebuild
rm -rf dist/ node_modules/
npm install
npm run build
```

### Debug Mode

```bash
# Run with debug logging
DEBUG=mcp:* node dist/index.js

# Docker debug
docker run -it --rm \
  --env-file .env \
  mcp-tailwind-runtime:latest npm run dev
```

## 📚 Resources

### Documentation
- **GitHub**: https://github.com/Tai-DT/mcp-tailwind-gemini
- **Issues**: https://github.com/Tai-DT/mcp-tailwind-gemini/issues
- **Discussions**: https://github.com/Tai-DT/mcp-tailwind-gemini/discussions

### Related Tools
- **Tailwind CSS**: https://tailwindcss.com
- **Gemini AI**: https://ai.google.dev/gemini-api/docs
- **Puppeteer**: https://pptr.dev
- **Sharp**: https://sharp.pixelplumbing.com

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Last Updated**: 2025-10-24
**Status**: Active Development
**Node Version**: 18.0.0+
**AI Integration**: Google Gemini (Optional)
