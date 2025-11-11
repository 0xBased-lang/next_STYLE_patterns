# UI/UX MCP Server - Comprehensive Design & Development Workflow Automation

**GitHub**: https://github.com/willem4130/ui-ux-mcp-server
**Type**: Model Context Protocol (MCP) Server
**Author**: willem4130
**License**: MIT
**Version**: 1.0.0
**Tech Stack**: TypeScript, Node.js 18+, Storybook, Tailwind, Framer Motion, GSAP, Playwright

---

## 🎯 Purpose

Comprehensive MCP server that integrates **5 powerful tools** for complete UI/UX development workflows. Combines component development, styling systems, animation, testing, and workflow automation into a single unified MCP server.

## ⚡ Key Capabilities

### 📚 Component Development (Storybook)
- Get and manage stories
- Run visual regression tests
- Accessibility testing
- Component documentation

### 💅 Styling System (Tailwind CSS)
- Generate configurations from design tokens
- Optimize and deduplicate classes
- Create custom design systems
- CSS variable generation

### 🎬 Animation (Framer Motion + GSAP)
- Create complex animation timelines
- Generate animation code
- Preview animations
- Multiple easing options

### 🧪 Testing & Automation (Playwright)
- Cross-browser UI testing
- Visual regression testing
- Screenshot capture across viewports
- Automated user flow testing

### 🧩 Component Library Management
- Generate components in React/Vue/Svelte
- Analyze component performance
- Accessibility compliance checking
- Auto-generate tests and documentation

### 🔄 Workflow Automation
- UX optimization analysis
- Design system generation from Storybook or code
- End-to-end workflow automation

## 📦 Installation

```bash
# Clone repository
cd ~/KenKaiBuildMCP/design-ui-mcps/ui-ux-mcp-server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables
# Edit .env with your settings (STORYBOOK_URL, etc.)

# Build server
npm run build
```

## 🔌 Claude Desktop Configuration

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "ui-ux-mcp": {
      "command": "node",
      "args": ["/Users/YOUR_USERNAME/KenKaiBuildMCP/design-ui-mcps/ui-ux-mcp-server/dist/index.js"]
    }
  }
}
```

## 🛠️ Available Tools

### Storybook Tools

**`storybook_get_stories`**
Get list of all Storybook stories.

**Parameters**:
- `storybookUrl` (optional): Storybook instance URL (default: from env)

**Returns**:
```json
{
  "stories": [
    {
      "id": "button--primary",
      "title": "Button/Primary",
      "kind": "Button"
    }
  ]
}
```

**`storybook_test_component`**
Run visual and accessibility tests.

**Parameters**:
- `storyId` (required): Story ID to test
- `tests` (array): Test types ["visual", "accessibility"]

**Returns**:
```json
{
  "visual": {"passed": true, "differences": []},
  "accessibility": {"violations": [], "score": 100}
}
```

### Tailwind Tools

**`tailwind_generate_config`**
Generate Tailwind config from design tokens.

**Parameters**:
- `tokens` (object, required): Design tokens (colors, spacing, typography)
- `includePlugins` (array): Plugins to include

**Returns**:
```json
{
  "config": "module.exports = {...}",
  "css_variables": ":root { --primary: ...; }"
}
```

**`tailwind_optimize_classes`**
Optimize and deduplicate Tailwind classes.

**Parameters**:
- `html` (string, required): HTML with Tailwind classes
- `removeRedundant` (boolean): Remove redundant classes

**Returns**:
```json
{
  "optimized_html": "...",
  "removed_classes": ["p-4", "px-4"],
  "savings": "Removed 15 redundant classes"
}
```

### Animation Tools

**`animation_create_timeline`**
Create animation timeline with Framer Motion or GSAP.

**Parameters**:
- `library` (required): "framer-motion" or "gsap"
- `animations` (array, required): Animation sequence

**Example**:
```javascript
{
  "library": "framer-motion",
  "animations": [
    {
      "target": ".hero-title",
      "properties": {"opacity": 1, "y": 0},
      "duration": 0.6,
      "delay": 0.2
    }
  ]
}
```

**Returns**:
```json
{
  "code": "// Complete animation code",
  "library": "framer-motion",
  "total_duration": 1.2
}
```

**`animation_preview`**
Generate preview of animation sequence.

**Parameters**:
- `animationCode` (required): Animation code to preview
- `library` (required): Animation library used

**Returns**:
```json
{
  "preview_url": "http://localhost:3000/preview",
  "thumbnail": "data:image/png;base64,..."
}
```

### Playwright Tools

**`playwright_test_ui`**
Run UI tests with Playwright.

**Parameters**:
- `url` (required): URL to test
- `browsers` (array): Browsers to test (["chromium", "firefox", "webkit"])
- `tests` (array): Test types to run

**Returns**:
```json
{
  "chromium": {"passed": 15, "failed": 0},
  "firefox": {"passed": 15, "failed": 0},
  "test_results": [...]
}
```

**`playwright_capture_screenshots`**
Capture screenshots across browsers.

**Parameters**:
- `url` (required): URL to screenshot
- `browsers` (array): Browsers to use
- `viewports` (array): Viewport sizes

**Returns**:
```json
{
  "screenshots": [
    {
      "browser": "chromium",
      "viewport": "1920x1080",
      "path": "/screenshots/chromium_1920x1080.png"
    }
  ]
}
```

### Component Tools

**`component_create`**
Create a new UI component with best practices.

**Parameters**:
- `name` (required): Component name
- `framework` (required): "react", "vue", or "svelte"
- `features` (array): Features to include
- `styling` (string): "tailwind", "css", or "styled-components"

**Returns**:
```json
{
  "code": "// Complete component code",
  "tests": "// Component tests",
  "story": "// Storybook story",
  "docs": "// Component documentation"
}
```

**`component_analyze`**
Analyze component for performance and accessibility.

**Parameters**:
- `componentPath` (required): Path to component file
- `checks` (array): Checks to run ["performance", "accessibility", "bestPractices"]

**Returns**:
```json
{
  "performance_score": 95,
  "accessibility_score": 100,
  "issues": [],
  "suggestions": [...]
}
```

### Workflow Tools

**`workflow_optimize_ux`**
Run comprehensive UX optimization analysis.

**Parameters**:
- `url` (required): URL to analyze
- `analyses` (array): Types ["performance", "accessibility", "mobile", "seo"]

**Returns**:
```json
{
  "performance": {"score": 92, "metrics": {...}},
  "accessibility": {"score": 98, "violations": []},
  "mobile": {"score": 95, "responsive": true},
  "seo": {"score": 88, "improvements": [...]}
}
```

**`workflow_build_design_system`**
Generate complete design system from Storybook or code.

**Parameters**:
- `source` (required): "storybook" or "code"
- `sourceId` (required): URL or directory path
- `includeTokens` (boolean): Include design tokens
- `includeComponents` (boolean): Include component library
- `includeDocumentation` (boolean): Generate documentation

**Returns**:
```json
{
  "design_tokens": {...},
  "components": [...],
  "documentation": "...",
  "tailwind_config": "...",
  "output_path": "/design-system/"
}
```

## 🎯 Use Cases

### Complete Workflow: From Storybook to Production

```javascript
// 1. Get all Storybook stories
await storybook_get_stories({storybookUrl: "http://localhost:6006"})

// 2. Test components
await storybook_test_component({
  storyId: "button--primary",
  tests: ["visual", "accessibility"]
})

// 3. Generate design system
await workflow_build_design_system({
  source: "storybook",
  sourceId: "http://localhost:6006",
  includeTokens: true,
  includeComponents: true
})

// 4. Run UX optimization
await workflow_optimize_ux({
  url: "https://your-site.com",
  analyses: ["performance", "accessibility", "mobile", "seo"]
})

// 5. Cross-browser testing
await playwright_test_ui({
  url: "https://your-site.com",
  browsers: ["chromium", "firefox", "webkit"]
})
```

### Animation Development Workflow

```javascript
// 1. Create animation timeline
const animation = await animation_create_timeline({
  library: "framer-motion",
  animations: [
    {
      target: ".hero",
      properties: {opacity: 1, scale: 1},
      duration: 0.8
    }
  ]
})

// 2. Preview animation
await animation_preview({
  animationCode: animation.code,
  library: "framer-motion"
})

// 3. Test animation across browsers
await playwright_test_ui({
  url: "http://localhost:3000/animation-demo",
  browsers: ["chromium", "firefox"]
})
```

### Component Creation Workflow

```javascript
// 1. Create component
const component = await component_create({
  name: "ProductCard",
  framework: "react",
  features: ["responsive", "accessible", "animated"],
  styling: "tailwind"
})

// 2. Analyze component
await component_analyze({
  componentPath: "./components/ProductCard.tsx",
  checks: ["performance", "accessibility", "bestPractices"]
})

// 3. Optimize Tailwind classes
await tailwind_optimize_classes({
  html: component.code,
  removeRedundant: true
})
```

## 🔧 Development

### Running Locally

```bash
# Development mode
npm run dev

# Run tests
npm test

# Lint code
npm run lint
```

### Project Structure

```
ui-ux-mcp-server/
├── src/
│   ├── index.ts           # Main server entry point
│   └── tools/
│       ├── storybook.ts   # Storybook automation
│       ├── tailwind.ts    # Tailwind CSS management
│       ├── animation.ts   # Animation tools
│       ├── playwright.ts  # Browser automation
│       ├── components.ts  # Component management
│       └── workflows.ts   # Workflow automation
├── dist/                  # Compiled JavaScript
├── package.json
├── tsconfig.json
└── README.md
```

## ⚙️ Environment Variables

Create `.env` file with the following:

```env
STORYBOOK_URL=http://localhost:6006
PLAYWRIGHT_HEADLESS=true
ANIMATION_PREVIEW_PORT=3001
COMPONENT_OUTPUT_DIR=./components
DESIGN_SYSTEM_OUTPUT_DIR=./design-system
```

## 🎨 Integration Examples

### With Storybook
Automatically test all stories and generate design system from Storybook components.

### With Tailwind CSS
Generate Tailwind config from design tokens, optimize classes, and integrate with component library.

### With Framer Motion/GSAP
Create animation timelines visually and export to code with proper timing and easing.

### With Playwright
Run cross-browser tests, capture screenshots, and validate UI across different viewports.

## 📊 Technical Details

### Dependencies

```json
{
  "@modelcontextprotocol/sdk": "^1.0.0",
  "axios": "^1.6.0",
  "cheerio": "^1.0.0-rc.12",
  "dotenv": "^16.3.1",
  "playwright": "^1.40.0",
  "postcss": "^8.4.32",
  "tailwindcss": "^3.4.0",
  "zod": "^3.22.4"
}
```

### Requirements

- Node.js 18+
- npm or yarn
- Running Storybook instance (for Storybook features)
- Playwright browsers installed (`npx playwright install`)

## 🐛 Troubleshooting

### Common Issues

**Issue**: "Storybook not found"
```bash
# Ensure Storybook is running
npm run storybook
# Or set STORYBOOK_URL in .env
```

**Issue**: "Playwright browsers not installed"
```bash
# Install Playwright browsers
npx playwright install
```

**Issue**: "Build errors"
```bash
# Clean and rebuild
rm -rf dist/ node_modules/
npm install
npm run build
```

## 📚 Resources

- **GitHub**: https://github.com/willem4130/ui-ux-mcp-server
- **Storybook**: https://storybook.js.org
- **Tailwind CSS**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion/
- **GSAP**: https://greensock.com/gsap/
- **Playwright**: https://playwright.dev

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

**Last Updated**: 2025-10-24
**Status**: Active Development
**Node Version**: 18.0.0+
**Features**: 5 integrated tool suites (Storybook, Tailwind, Animation, Playwright, Workflows)
