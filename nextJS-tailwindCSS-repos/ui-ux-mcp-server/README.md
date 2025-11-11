# UI/UX MCP Server

A comprehensive Model Context Protocol (MCP) server that integrates 5 powerful tools for complete UI/UX development workflows.

## Features

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

## Installation

1. Clone this repository:
```bash
cd ~/KenKaiBuildMCP/design-ui-mcps/ui-ux-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from the example:
```bash
cp .env.example .env
```

4. Configure your environment variables:
```env
STORYBOOK_URL=http://localhost:6006
# ... other configurations
```

5. Build the server:
```bash
npm run build
```

## Configuration

Add to your Claude Desktop MCP settings (`~/Library/Application Support/Claude/claude_desktop_config.json`):

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

## Available Tools

### Storybook Tools
- `storybook_get_stories` - Get list of all Storybook stories
- `storybook_test_component` - Run visual and accessibility tests

### Tailwind Tools
- `tailwind_generate_config` - Generate Tailwind config from design tokens
- `tailwind_optimize_classes` - Optimize and deduplicate Tailwind classes

### Animation Tools
- `animation_create_timeline` - Create animation timeline with Framer Motion or GSAP
- `animation_preview` - Generate preview of animation sequence

### Playwright Tools
- `playwright_test_ui` - Run UI tests with Playwright
- `playwright_capture_screenshots` - Capture screenshots across browsers

### Component Tools
- `component_create` - Create a new UI component with best practices
- `component_analyze` - Analyze component for performance and accessibility

### Workflow Tools
- `workflow_optimize_ux` - Run comprehensive UX optimization analysis
- `workflow_build_design_system` - Generate complete design system from Storybook or code

## Usage Examples

### Run UX Optimization Analysis
```javascript
await workflow_optimize_ux({
  url: "https://your-website.com",
  analyses: ["performance", "accessibility", "mobile", "seo"]
})
```

### Create Animation Timeline
```javascript
await animation_create_timeline({
  library: "framer-motion",
  animations: [
    {
      target: ".hero-title",
      properties: { opacity: 1, y: 0 },
      duration: 0.6,
      delay: 0.2
    }
  ]
})
```

### Generate Design System
```javascript
await workflow_build_design_system({
  source: "storybook",
  sourceId: "http://localhost:6006",
  includeTokens: true,
  includeComponents: true,
  includeDocumentation: true
})
```

## Development

### Run in development mode:
```bash
npm run dev
```

### Run tests:
```bash
npm test
```

### Lint code:
```bash
npm run lint
```

## Architecture

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

## Requirements

- Node.js 18+
- npm or yarn
- Running Storybook instance (for Storybook features)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT

## Support

For issues and questions, please open an issue in the repository.