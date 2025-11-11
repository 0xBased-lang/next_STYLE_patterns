# shadcn/ui v4 MCP Server - AI-Powered Component Access

**GitHub**: https://github.com/Jpisnice/shadcn-ui-mcp-server
**npm**: @jpisnice/shadcn-ui-mcp-server
**Type**: Model Context Protocol (MCP) Server
**Author**: Janardhan Polle (@Jpisnice)
**License**: MIT
**Version**: 1.1.4

---

## 🎯 What is shadcn-ui-mcp-server?

shadcn-ui-mcp-server is a **Model Context Protocol (MCP) server** that provides AI assistants (like Claude, ChatGPT, etc.) with comprehensive access to [shadcn/ui v4](https://ui.shadcn.com/) components, blocks, demos, and metadata across **multiple frameworks**.

### Revolutionary Concept

> "🚀 The fastest way to integrate shadcn/ui components into your AI workflow"

**Core Innovation**:
- **AI-Powered Development**: AI assistants can directly access and generate shadcn/ui components
- **Multi-Framework Support**: React, Svelte, Vue, and React Native implementations
- **MCP Protocol**: Uses Anthropic's Model Context Protocol for AI integration
- **Production Ready**: SSE transport, Docker support, health checks

**Why This Matters**:
- AI can build entire UIs using shadcn/ui components
- Consistent component implementations across frameworks
- Instant access to latest component source code
- No manual copy-pasting from documentation
- AI learns from real component examples

---

## ✨ Complete Feature Set

### 1. Multi-Framework Support

**Supported Frameworks**:

| Framework | Repository | Maintainer | Components |
|-----------|------------|------------|------------|
| **React** (default) | [shadcn/ui](https://ui.shadcn.com/) | [shadcn](https://github.com/shadcn) | 40+ components |
| **Svelte** | [shadcn-svelte](https://www.shadcn-svelte.com/) | [huntabyte](https://github.com/huntabyte) | Svelte ports |
| **Vue** | [shadcn-vue](https://www.shadcn-vue.com/) | [unovue](https://github.com/unovue) | Vue ports |
| **React Native** | [react-native-reusables](https://github.com/founded-labs/react-native-reusables) | [Founded Labs](https://github.com/founded-labs) | Mobile components |

**Framework Switching**:
```bash
# React (default)
npx @jpisnice/shadcn-ui-mcp-server

# Svelte
npx @jpisnice/shadcn-ui-mcp-server --framework svelte

# Vue
npx @jpisnice/shadcn-ui-mcp-server --framework vue

# React Native
npx @jpisnice/shadcn-ui-mcp-server --framework react-native
```

---

### 2. Component Access Features

**What AI Can Retrieve**:
- ✅ **Component Source Code**: Latest TypeScript/JSX implementations
- ✅ **Component Demos**: Example implementations and usage patterns
- ✅ **Blocks**: Complete implementations (dashboards, calendars, forms)
- ✅ **Metadata**: Dependencies, descriptions, configuration details
- ✅ **Directory Browsing**: Explore repository structures
- ✅ **Registry Files**: Component registry JSON data

**Component Categories**:
- UI Components (Button, Card, Dialog, etc.)
- Form Components (Input, Select, Checkbox, etc.)
- Layout Components (Accordion, Tabs, etc.)
- Data Components (Table, Calendar, etc.)
- Feedback Components (Toast, Alert, etc.)

---

### 3. Transport Modes

**Three Transport Options**:

| Mode | Use Case | Connections | Deployment |
|------|----------|-------------|------------|
| **stdio** (default) | CLI usage | Single | Local development |
| **sse** | Production | Multiple concurrent | Docker/Cloud |
| **dual** | Hybrid | Both stdio and SSE | Development + Testing |

**SSE (Server-Sent Events)**:
```bash
# Start SSE server
node build/index.js --mode sse --port 7423

# Docker deployment
docker-compose up -d

# Connect with Claude Code
claude mcp add --scope user --transport sse shadcn-mcp-server http://localhost:7423/sse
```

**Port Selection**: 7423 (SHADCN on phone keypad!)

---

### 4. GitHub API Integration

**Rate Limits**:
- **Without Token**: 60 requests/hour
- **With Token**: 5,000 requests/hour (Recommended)

**Token Setup** (2 minutes):
1. Visit https://github.com/settings/tokens
2. Generate new token (classic)
3. **No scopes needed** - public access only
4. Use token with server

**Usage**:
```bash
# Environment variable
export GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_token_here
npx @jpisnice/shadcn-ui-mcp-server

# Command line flag
npx @jpisnice/shadcn-ui-mcp-server --github-api-key ghp_your_token_here
```

**Smart Caching**:
- Efficient GitHub API integration
- Rate limit handling
- Automatic retry logic
- Cache invalidation

---

### 5. Docker & Production Deployment

**Docker Support**:
```bash
# Basic container
docker run -p 7423:7423 shadcn-ui-mcp-server

# With GitHub token
docker run -p 7423:7423 \
  -e GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_token \
  shadcn-ui-mcp-server

# Docker Compose (recommended)
docker-compose up -d

# Health check
curl http://localhost:7423/health
```

**Docker Compose Configuration**:
```yaml
version: '3.8'
services:
  shadcn-mcp-server:
    build: .
    ports:
      - "7423:7423"
    environment:
      - MCP_TRANSPORT_MODE=sse
      - MCP_PORT=7423
      - GITHUB_PERSONAL_ACCESS_TOKEN=${GITHUB_TOKEN}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:7423/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

**Environment Variables**:
- `MCP_TRANSPORT_MODE`: stdio | sse | dual
- `MCP_PORT`: Server port (default: 7423)
- `MCP_HOST`: Host binding (default: 0.0.0.0)
- `MCP_CORS_ORIGINS`: CORS origins (comma-separated)
- `GITHUB_PERSONAL_ACCESS_TOKEN`: GitHub API token

---

## 📖 Installation & Setup

### Quick Start

**Basic Usage**:
```bash
# Fastest way - no installation
npx @jpisnice/shadcn-ui-mcp-server
```

**Global Installation**:
```bash
# Install globally (optional)
npm install -g @jpisnice/shadcn-ui-mcp-server

# Run
shadcn-mcp
```

**Local Installation**:
```bash
# Clone repository
git clone https://github.com/Jpisnice/shadcn-ui-mcp-server.git
cd shadcn-ui-mcp-server

# Install dependencies
npm install

# Build
npm run build

# Run
npm start
```

---

### Configuration

**Command Line Options**:
```bash
--framework <name>      # Framework: react, svelte, vue, react-native
--github-api-key <key>  # GitHub personal access token
--mode <mode>           # Transport mode: stdio, sse, dual
--port <number>         # SSE server port (default: 7423)
--host <address>        # Host binding (default: 0.0.0.0)
--cors-origins <list>   # CORS origins (comma-separated)
```

**Examples**:
```bash
# React with GitHub token
npx @jpisnice/shadcn-ui-mcp-server \
  --framework react \
  --github-api-key ghp_your_token

# Svelte with SSE transport
npx @jpisnice/shadcn-ui-mcp-server \
  --framework svelte \
  --mode sse \
  --port 8080

# Vue with custom CORS
npx @jpisnice/shadcn-ui-mcp-server \
  --framework vue \
  --mode sse \
  --cors-origins "http://localhost:3000,https://myapp.com"
```

---

## 🔌 Editor & Tool Integration

### Claude Code

**SSE Transport Integration**:
```bash
# Start server
node build/index.js --mode sse --port 7423

# Add to Claude Code
claude mcp add --scope user --transport sse \
  shadcn-mcp-server \
  http://localhost:7423/sse
```

### Claude Desktop

**Configuration** (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "shadcn-ui": {
      "command": "npx",
      "args": [
        "@jpisnice/shadcn-ui-mcp-server",
        "--github-api-key",
        "ghp_your_token_here"
      ]
    }
  }
}
```

### VS Code

**MCP Extension Configuration**:
```json
{
  "mcp.servers": {
    "shadcn-ui": {
      "command": "npx",
      "args": ["@jpisnice/shadcn-ui-mcp-server"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token"
      }
    }
  }
}
```

### Cursor

**Integration Steps**:
1. Open Cursor Settings
2. Navigate to MCP Servers
3. Add new server with npx command
4. Configure GitHub token (optional)

### Continue.dev

**Configuration** (`.continue/config.json`):
```json
{
  "experimental": {
    "modelContextProtocol": {
      "servers": {
        "shadcn-ui": {
          "command": "npx",
          "args": ["@jpisnice/shadcn-ui-mcp-server"]
        }
      }
    }
  }
}
```

---

## 🚀 Use Cases

### 1. AI-Powered UI Development

**Scenario**: Ask AI to build a login form with shadcn/ui

**AI Workflow**:
1. AI accesses shadcn-ui-mcp-server
2. Retrieves Button, Input, Card components
3. Fetches Login form demo/block
4. Generates complete implementation
5. Includes proper dependencies and imports

**Result**: Production-ready login form with validation

### 2. Multi-Framework Component Learning

**Scenario**: Compare how Button component works across frameworks

**Workflow**:
```bash
# Get React implementation
npx @jpisnice/shadcn-ui-mcp-server --framework react
# AI: "Show me Button component"

# Get Svelte implementation
npx @jpisnice/shadcn-ui-mcp-server --framework svelte
# AI: "Show me Button component"

# Compare implementations
```

**Result**: Side-by-side comparison of Button in React vs Svelte

### 3. Rapid Prototyping

**Scenario**: Build dashboard quickly

**AI Prompt**: "Create a dashboard with sidebar, data table, and charts using shadcn/ui"

**AI Actions**:
1. Fetches dashboard block from shadcn/ui
2. Retrieves Table, Card, Chart components
3. Gets sidebar navigation component
4. Generates complete dashboard layout

**Time Saved**: Hours → Minutes

### 4. Component Discovery

**Scenario**: Explore available components

**Workflow**:
- AI: "What shadcn/ui components are available?"
- Server: Returns complete component list with descriptions
- AI: "Show me how to use Calendar component"
- Server: Returns Calendar source + demo

### 5. Multi-Client Deployments

**Scenario**: Team using various AI tools

**Setup**:
```bash
# Deploy SSE server
docker-compose up -d

# Team members connect
# Claude Code: http://localhost:7423/sse
# VS Code: http://localhost:7423/sse
# Cursor: http://localhost:7423/sse
```

**Benefit**: Single server, multiple concurrent connections

---

## 🎨 Framework-Specific Features

### React

**Component Access**:
- 40+ shadcn/ui v4 components
- Latest TypeScript implementations
- React 18+ with hooks
- Radix UI primitives

**Example Request**:
```
AI: "Get me the Dialog component implementation"
Server: Returns dialog.tsx with full source code
```

### Svelte

**Component Access**:
- shadcn-svelte components
- Svelte-specific patterns
- Runes API support
- Melt UI primitives

**Example**:
```
AI: "Show me Svelte Button component"
Server: Returns button.svelte implementation
```

### Vue

**Component Access**:
- shadcn-vue components
- Vue 3 Composition API
- TypeScript support
- Radix Vue primitives

**Example**:
```
AI: "Get Vue Select component"
Server: Returns Select.vue with script setup
```

### React Native

**Component Access**:
- react-native-reusables components
- Mobile-optimized implementations
- NativeWind styling
- Cross-platform support

**Example**:
```
AI: "Show me React Native Button"
Server: Returns mobile Button component
```

---

## 🔧 MCP Tools & API

### Available Tools

**Component Tools**:
- `get_component`: Fetch component source code
- `get_component_demo`: Retrieve component demo/example
- `get_component_metadata`: Get dependencies and config
- `list_components`: List all available components

**Block Tools**:
- `get_block`: Fetch complete block implementation
- `list_blocks`: List all available blocks

**Utility Tools**:
- `browse_directory`: Explore repository structure
- `get_file`: Retrieve specific file from repository

### Tool Usage Examples

**Get Component**:
```typescript
// MCP Tool Call
{
  "name": "get_component",
  "arguments": {
    "component": "button",
    "framework": "react"
  }
}

// Response: Complete button.tsx source code
```

**List Components**:
```typescript
// MCP Tool Call
{
  "name": "list_components",
  "arguments": {
    "framework": "react"
  }
}

// Response: Array of all available components with metadata
```

**Get Block**:
```typescript
// MCP Tool Call
{
  "name": "get_block",
  "arguments": {
    "block": "authentication-01",
    "framework": "react"
  }
}

// Response: Complete authentication block code
```

---

## 📊 Architecture & Technical Details

### System Architecture

```
┌─────────────────────┐
│   AI Assistant      │
│ (Claude, ChatGPT)   │
└──────────┬──────────┘
           │ MCP Protocol
           │
┌──────────▼──────────┐
│  shadcn-ui-mcp      │
│      Server         │
│                     │
│  ┌───────────────┐  │
│  │  Transport    │  │
│  │  (stdio/SSE)  │  │
│  └───────────────┘  │
│                     │
│  ┌───────────────┐  │
│  │  Framework    │  │
│  │  Selector     │  │
│  └───────────────┘  │
│                     │
│  ┌───────────────┐  │
│  │  GitHub API   │  │
│  │  Client       │  │
│  └───────────────┘  │
└──────────┬──────────┘
           │ GitHub API
           │
┌──────────▼──────────┐
│   GitHub Repos      │
│  - shadcn/ui        │
│  - shadcn-svelte    │
│  - shadcn-vue       │
│  - RN-reusables     │
└─────────────────────┘
```

### Technology Stack

**Core**:
- **TypeScript**: 5.7.2
- **Node.js**: >=18.0.0
- **MCP SDK**: @modelcontextprotocol/sdk 1.16.0

**HTTP & API**:
- **Express**: 4.21.2 (SSE server)
- **Axios**: 1.8.4 (GitHub API)
- **CORS**: 2.8.5 (Cross-origin support)

**Validation & Parsing**:
- **Zod**: 3.24.2 (Schema validation)
- **Joi**: 17.13.3 (Input validation)
- **Cheerio**: 1.0.0 (HTML parsing)

**Logging & Utilities**:
- **Winston**: 3.15.0 (Structured logging)
- **UUID**: 10.0.0 (Unique identifiers)

**Security**:
- **Snyk**: Security scanning
- **npm audit**: Vulnerability checks
- **License checker**: Dependency validation

---

## 🔒 Security Features

### Security Measures

**GitHub Token**:
- Read-only access (no write scopes)
- Public repositories only
- Token stored in environment variables
- No token = anonymous access (60 req/hr)

**Input Validation**:
- Zod schema validation
- Joi input sanitization
- Framework name validation
- Path traversal prevention

**Security Scanning**:
```bash
# Automated security checks
npm run security:audit         # npm audit
npm run security:licenses      # License compliance
npm run security:snyk          # Snyk vulnerability scan
npm run security:all           # All checks
```

**Docker Security**:
- Non-root user in container
- Minimal base image
- Environment variable injection
- Health check endpoints

---

## 🎯 Best Practices

### DO

- ✅ Use GitHub token for better rate limits
- ✅ Use SSE transport for production
- ✅ Deploy with Docker Compose
- ✅ Monitor health endpoints
- ✅ Cache component fetches
- ✅ Use specific framework flag
- ✅ Enable CORS for web deployments

### DON'T

- ❌ Share GitHub tokens publicly
- ❌ Use stdio for multi-client scenarios
- ❌ Skip health checks in production
- ❌ Ignore rate limit warnings
- ❌ Deploy without monitoring
- ❌ Mix framework contexts

---

## 🆚 Comparison with Alternatives

| Feature | shadcn-ui-mcp-server | Manual Docs | Other MCP Servers |
|---------|---------------------|-------------|-------------------|
| **AI Integration** | ✅ Native MCP | ❌ Manual search | ⚠️ Limited |
| **Multi-Framework** | ✅ 4 frameworks | ❌ React only | ❌ Single |
| **Live Updates** | ✅ Latest from GitHub | ❌ Static docs | ⚠️ Varies |
| **Production Ready** | ✅ Docker + SSE | N/A | ⚠️ Varies |
| **Component Metadata** | ✅ Dependencies included | ❌ Manual | ⚠️ Limited |
| **Block Access** | ✅ Complete blocks | ❌ No blocks | ❌ No |

---

## 🐛 Troubleshooting

### Rate Limit Issues

**Problem**: "API rate limit exceeded"

**Solutions**:
```bash
# 1. Add GitHub token
export GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_token

# 2. Check rate limit status
curl https://api.github.com/rate_limit

# 3. Use caching effectively
# Server automatically caches responses
```

### Connection Issues

**Problem**: SSE connection fails

**Solutions**:
```bash
# 1. Check server is running
curl http://localhost:7423/health

# 2. Verify firewall settings
# Allow port 7423

# 3. Check CORS configuration
--cors-origins "http://localhost:*"
```

### Framework Not Found

**Problem**: "Framework not supported"

**Solutions**:
```bash
# Valid framework names:
--framework react          # ✅
--framework svelte         # ✅
--framework vue            # ✅
--framework react-native   # ✅
--framework reactjs        # ❌ Wrong name
```

---

## 📚 Additional Resources

### Official Documentation

- **Full Docs**: [GitHub README](https://github.com/Jpisnice/shadcn-ui-mcp-server)
- **Getting Started**: [docs/getting-started/](https://github.com/Jpisnice/shadcn-ui-mcp-server/tree/main/docs/getting-started)
- **Configuration**: [docs/configuration/](https://github.com/Jpisnice/shadcn-ui-mcp-server/tree/main/docs/configuration)
- **Integration Guides**: [docs/integration/](https://github.com/Jpisnice/shadcn-ui-mcp-server/tree/main/docs/integration)
- **API Reference**: [docs/api/](https://github.com/Jpisnice/shadcn-ui-mcp-server/tree/main/docs/api)
- **Troubleshooting**: [docs/troubleshooting/](https://github.com/Jpisnice/shadcn-ui-mcp-server/tree/main/docs/troubleshooting)

### Related Projects

- **shadcn/ui**: https://ui.shadcn.com/
- **shadcn-svelte**: https://www.shadcn-svelte.com/
- **shadcn-vue**: https://www.shadcn-vue.com/
- **react-native-reusables**: https://github.com/founded-labs/react-native-reusables
- **MCP Protocol**: https://modelcontextprotocol.io/

### Community

- **GitHub Issues**: https://github.com/Jpisnice/shadcn-ui-mcp-server/issues
- **GitHub Discussions**: https://github.com/Jpisnice/shadcn-ui-mcp-server/discussions
- **MCP Discord**: Model Context Protocol community

---

## 🚀 Roadmap

**Planned Features**:
- [ ] Component search by functionality
- [ ] Diff tool for comparing framework implementations
- [ ] Component dependency graph
- [ ] Custom component templates
- [ ] Offline mode with local cache
- [ ] Plugin system for custom frameworks
- [ ] Analytics dashboard
- [ ] Component usage statistics

**Completed**:
- [x] Multi-framework support
- [x] SSE transport
- [x] Docker deployment
- [x] Health checks
- [x] GitHub API caching
- [x] Security scanning

---

**Last Updated**: 2025-10-24
**Purpose**: Complete reference for shadcn-ui-mcp-server
**Maintainer**: Janardhan Polle (@Jpisnice)
**License**: MIT - Free for commercial use
**Trust Score**: High quality on Archestra MCP Catalog
