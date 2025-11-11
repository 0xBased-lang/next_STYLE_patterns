# MCP for Next.js - Vercel MCP Adapter Template

**GitHub**: https://github.com/vercel-labs/mcp-for-next.js
**npm**: mcp-handler
**Type**: Next.js MCP Server Template
**Author**: Vercel Labs
**License**: MIT (assumed)
**Version**: 0.1.0
**Tech Stack**: Next.js 15.2.4, React 19, mcp-handler, Redis (optional), TypeScript

---

## 🎯 Purpose

Official Vercel template for building Model Context Protocol (MCP) servers using Next.js. Uses the **Vercel MCP Adapter** (`mcp-handler`) to drop in an MCP server on a group of routes in any Next.js project.

**Key Feature**: Allows you to build MCP servers that run serverless on Vercel infrastructure with optional Redis for SSE transport.

## ⚡ Key Capabilities

### Core Features
- **Next.js Integration**: Native MCP server in Next.js app directory
- **mcp-handler Adapter**: Simplified MCP server creation for Next.js
- **Dual Transport**: stdio and SSE (Server-Sent Events) support
- **Vercel Deployment**: Production-ready deployment on Vercel
- **Fluid Compute**: Efficient execution with Vercel Fluid compute
- **Redis Integration**: Optional Redis for SSE transport persistence
- **TypeScript Support**: Full TypeScript definitions
- **Sample Client**: Included test client for invocations

### Transport Modes
- **stdio**: Standard input/output transport (default MCP)
- **SSE**: Server-Sent Events for web-based connections (requires Redis)

## 📦 Installation

### Quick Start

```bash
# Clone repository
git clone https://github.com/vercel-labs/mcp-for-next.js
cd mcp-for-next.js

# Install dependencies
npm install

# Run development server
npm run dev
```

### Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/templates/next.js/model-context-protocol-mcp-with-next-js)

**Requirements for SSE Transport**:
1. Redis attached to project (`process.env.REDIS_URL`)
2. Toggle `disableSse` flag to `false` in `app/mcp/route.ts`
3. [Fluid compute](https://vercel.com/docs/functions/fluid-compute) enabled
4. Adjust `maxDuration` to 800 for Pro/Enterprise accounts

## 🔧 Configuration

### Basic Setup

Update `app/[transport]/route.ts` with your tools, prompts, and resources following the [MCP TypeScript SDK documentation](https://github.com/modelcontextprotocol/typescript-sdk).

**Example Tool Definition**:

```typescript
import { MCPHandler } from 'mcp-handler'

const handler = new MCPHandler({
  tools: [
    {
      name: 'get_weather',
      description: 'Get weather for a location',
      inputSchema: {
        type: 'object',
        properties: {
          location: { type: 'string' }
        },
        required: ['location']
      }
    }
  ],

  toolHandlers: {
    get_weather: async (args) => {
      // Your tool logic
      return {
        temperature: 72,
        condition: 'sunny'
      }
    }
  }
})

export const GET = handler.GET
export const POST = handler.POST
```

### Vercel Configuration

**Enable Fluid Compute** (for efficient execution):

1. Go to your Vercel project settings
2. Enable Fluid compute
3. Open `app/route.ts`
4. Adjust `maxDuration` to 800 (Pro/Enterprise only)

**Redis Setup** (for SSE transport):

```env
# Add to Vercel environment variables
REDIS_URL=redis://your-redis-url
```

Update `app/mcp/route.ts`:
```typescript
const handler = new MCPHandler({
  disableSse: false,  // Enable SSE
  // ... other config
})
```

## 🛠️ Usage

### Sample Client

Test your MCP server with the included client:

```bash
node scripts/test-client.mjs https://mcp-for-next-js.vercel.app
```

### Local Development

```bash
# Start Next.js dev server
npm run dev

# Test MCP endpoint
curl http://localhost:3000/api/mcp
```

### Production Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

## 📁 Project Structure

```
mcp-for-next.js/
├── app/
│   ├── [transport]/
│   │   └── route.ts           # MCP server routes
│   └── page.tsx               # Landing page
├── scripts/
│   └── test-client.mjs        # Sample MCP client
├── public/
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## 🔌 MCP Handler API

### Creating a Handler

```typescript
import { MCPHandler } from 'mcp-handler'

const handler = new MCPHandler({
  // Tools
  tools: [...],
  toolHandlers: {...},

  // Prompts
  prompts: [...],
  promptHandlers: {...},

  // Resources
  resources: [...],
  resourceHandlers: {...},

  // Configuration
  disableSse: false,
  maxDuration: 800
})

// Export as Next.js route handlers
export const GET = handler.GET
export const POST = handler.POST
```

### Tool Definition

```typescript
{
  tools: [
    {
      name: 'tool_name',
      description: 'What the tool does',
      inputSchema: {
        type: 'object',
        properties: {
          param1: { type: 'string', description: '...' }
        },
        required: ['param1']
      }
    }
  ],

  toolHandlers: {
    tool_name: async (args, context) => {
      // Implementation
      return result
    }
  }
}
```

### Prompt Definition

```typescript
{
  prompts: [
    {
      name: 'prompt_name',
      description: 'What the prompt does',
      arguments: [
        {
          name: 'arg1',
          description: '...',
          required: true
        }
      ]
    }
  ],

  promptHandlers: {
    prompt_name: async (args, context) => {
      return {
        messages: [
          {
            role: 'user',
            content: { type: 'text', text: '...' }
          }
        ]
      }
    }
  }
}
```

### Resource Definition

```typescript
{
  resources: [
    {
      uri: 'resource://uri/path',
      name: 'Resource Name',
      description: 'What the resource provides',
      mimeType: 'text/plain'
    }
  ],

  resourceHandlers: {
    'resource://uri/path': async (uri, context) => {
      return {
        contents: [
          {
            uri: uri,
            mimeType: 'text/plain',
            text: '...'
          }
        ]
      }
    }
  }
}
```

## 🚀 Advanced Features

### SSE Transport

For real-time connections with web clients:

```typescript
// Enable SSE in handler
const handler = new MCPHandler({
  disableSse: false,
  // Requires Redis URL in environment
})
```

**Client Connection**:
```javascript
const eventSource = new EventSource('https://your-app.vercel.app/api/mcp')
eventSource.onmessage = (event) => {
  console.log('MCP event:', event.data)
}
```

### Fluid Compute Integration

Optimize for long-running operations:

```typescript
// In app/route.ts
export const maxDuration = 800 // Pro/Enterprise: 800s, Hobby: 10s
export const dynamic = 'force-dynamic'
```

### Environment Variables

```env
# Required for SSE transport
REDIS_URL=redis://your-redis-instance

# Optional
MCP_SERVER_NAME=my-mcp-server
MCP_SERVER_VERSION=1.0.0
```

## 🎯 Use Cases

### AI Function Calling
Expose Next.js API routes as MCP tools for AI assistants.

### Data Integration
Provide AI access to your Next.js application's data.

### Custom Workflows
Build specialized AI workflows using Next.js serverless functions.

### Multi-Modal AI
Combine text, images, and structured data in MCP responses.

## 📊 Technical Details

### Dependencies

```json
{
  "dependencies": {
    "mcp-handler": "^1.0.1",
    "next": "15.2.4",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "redis": "^4.7.0",
    "zod": "^3.24.2"
  }
}
```

### Performance

- **Serverless Functions**: Fast cold starts with Vercel
- **Fluid Compute**: Efficient resource allocation
- **Redis Caching**: Fast SSE transport with persistence
- **Edge-Ready**: Can deploy to Vercel Edge Runtime

## 🐛 Troubleshooting

### Common Issues

**Issue**: "Redis connection failed"
```bash
# Solution: Ensure Redis URL is set
vercel env add REDIS_URL
```

**Issue**: "SSE not working"
```typescript
// Solution: Enable SSE and ensure Redis is connected
const handler = new MCPHandler({
  disableSse: false  // Must be false
})
```

**Issue**: "Timeout errors"
```typescript
// Solution: Increase maxDuration
export const maxDuration = 800  // Requires Pro/Enterprise
```

## 📚 Resources

### Official Resources
- **GitHub**: https://github.com/vercel-labs/mcp-for-next.js
- **Vercel Template**: https://vercel.com/templates/next.js/model-context-protocol-mcp-with-next-js
- **mcp-handler**: https://www.npmjs.com/package/mcp-handler
- **MCP TypeScript SDK**: https://github.com/modelcontextprotocol/typescript-sdk

### Vercel Resources
- **Fluid Compute**: https://vercel.com/docs/functions/fluid-compute
- **Serverless Functions**: https://vercel.com/docs/functions
- **Edge Runtime**: https://vercel.com/docs/functions/edge-functions

### Next.js Resources
- **Next.js Documentation**: https://nextjs.org/docs
- **App Router**: https://nextjs.org/docs/app
- **Route Handlers**: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

## 🤝 Contributing

This is an official Vercel Labs template. Contributions welcome:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Submit a pull request

## 🎓 Learning Path

### Beginner
1. Clone template and run locally
2. Add a simple tool (calculator, weather)
3. Test with sample client
4. Deploy to Vercel

### Intermediate
1. Add multiple tools and resources
2. Implement SSE transport with Redis
3. Use Fluid compute for long operations
4. Build custom prompts

### Advanced
1. Integrate with external APIs
2. Build multi-modal responses
3. Optimize for Edge Runtime
4. Create reusable MCP modules

---

**Last Updated**: 2025-10-24
**Status**: Official Vercel Template
**Next.js Version**: 15.2.4
**React Version**: 19.1.0
**Deployment**: Vercel (Production-Ready)
