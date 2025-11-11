# MCP-UI - Interactive Web Components for Model Context Protocol

**GitHub**: https://github.com/idosal/mcp-ui
**Documentation**: https://mcpui.dev
**npm (Server)**: @mcp-ui/server
**npm (Client)**: @mcp-ui/client
**Type**: Model Context Protocol UI SDK
**Authors**: [Ido Salomon](https://x.com/idosal1) & [Liad Yosef](https://x.com/liadyosef)
**License**: Apache 2.0
**Version**: 5.2.0

---

## 🎯 What is MCP-UI?

MCP-UI is a **groundbreaking SDK** that brings **interactive web components** to the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction). It enables MCP servers to deliver rich, dynamic UI resources that are securely rendered by AI clients, taking AI interactions beyond text to full interactive experiences.

### Revolutionary Concept

> "Deliver rich, dynamic UI resources directly from your MCP server to be rendered by the client. Take AI interaction to the next level!"

**Core Innovation**:
- **UI Over MCP**: Servers can return UI components, not just data
- **Interactive Widgets**: Buttons, forms, charts rendered in AI chat
- **Action Callbacks**: UI triggers tool calls, prompts, and AI actions
- **Multi-Language**: TypeScript, Ruby, Python server SDKs
- **Secure Rendering**: Sandboxed iframe execution
- **Platform Adapters**: Works with ChatGPT, Goose, LibreChat, etc.

**Use Cases**:
- Interactive forms in AI chat
- Data visualization charts
- Real-time dashboards
- Component configuration UIs
- Multi-step workflows
- Visual feedback and confirmations

---

## ✨ Complete Feature Set

### 1. Core Components

**Server SDKs** (Generate UI Resources):
- **`@mcp-ui/server`** (TypeScript): Create UIResources for Node.js servers
- **`mcp_ui_server`** (Ruby): Generate UIResources in Ruby environment
- **`mcp-ui-server`** (Python): Build UIResources with Python

**Client SDKs** (Render UI Resources):
- **`@mcp-ui/client`** (TypeScript): React component + Web Component
- **`<UIResourceRenderer />`**: Automatic resource type detection
- **Event Handling**: `onUIAction` callback for UI events

---

### 2. UI Resource Types

#### HTML Resources (`text/html`)

**Inline HTML**:
```typescript
import { createUIResource } from '@mcp-ui/server'

const htmlResource = createUIResource({
  uri: 'ui://greeting/1',
  content: {
    type: 'rawHtml',
    htmlString: '<p>Hello, MCP UI!</p>'
  },
  encoding: 'text',
})
```

**Features**:
- Renders in sandboxed iframe
- Full HTML/CSS/JS support
- PostMessage communication
- Auto-resize iframe option

#### External URL Resources (`text/uri-list`)

**Embed External Apps**:
```typescript
const externalUrlResource = createUIResource({
  uri: 'ui://external/1',
  content: {
    type: 'externalUrl',
    iframeUrl: 'https://example.com'
  },
  encoding: 'text',
})
```

**Features**:
- Embed any HTTPS URL
- Iframe security model
- Cross-origin communication
- First URL used (multi-URL format supported)

#### Remote DOM Resources (`application/vnd.mcp-ui.remote-dom`)

**Most Powerful Option** (Shopify's remote-dom):
```typescript
const remoteDomResource = createUIResource({
  uri: 'ui://component/button',
  content: {
    type: 'remoteDom',
    script: `
      const button = document.createElement('ui-button');
      button.setAttribute('label', 'Click me!');
      button.addEventListener('press', () => {
        window.parent.postMessage({
          type: 'tool',
          payload: {
            toolName: 'handleClick',
            params: {}
          }
        }, '*');
      });
      root.appendChild(button);
    `,
    framework: 'react', // or 'webcomponents'
  },
  encoding: 'text',
})
```

**Features**:
- Matches host's look-and-feel
- Uses host's component library
- Secure sandboxed execution
- JSON communication protocol
- More flexible than iframes

---

### 3. UI Action Types

**Complete Action API**:

| Action Type | Payload | Description |
|-------------|---------|-------------|
| **tool** | `{ toolName, params }` | Trigger MCP tool call |
| **prompt** | `{ prompt }` | Send prompt to AI |
| **intent** | `{ intent, params }` | Express user intent |
| **notify** | `{ message }` | Show notification |
| **link** | `{ url }` | Open external link |

**Action Examples**:

```typescript
// Tool Call
window.parent.postMessage({
  type: 'tool',
  payload: { toolName: 'saveData', params: { data: 'value' } }
}, '*')

// Prompt
window.parent.postMessage({
  type: 'prompt',
  payload: { prompt: 'What should I do next?' }
}, '*')

// Notification
window.parent.postMessage({
  type: 'notify',
  payload: { message: 'Action completed!' }
}, '*')
```

---

### 4. Platform Adapters

**Apps SDK Adapter** (ChatGPT, etc.):

Automatically translates MCP-UI protocol to host-specific APIs.

```typescript
const htmlResource = createUIResource({
  uri: 'ui://widget/1',
  content: { type: 'rawHtml', htmlString: '<button>Click</button>' },
  encoding: 'text',
  // Enable adapter
  adapters: {
    appsSdk: {
      enabled: true,
      config: { /* optional config */ }
    }
  }
})
```

**Supported Actions**:
- ✅ Tool calls (`window.openai.invokeCustomFunction`)
- ✅ Prompts (`window.openai.sendUserMessage`)
- ✅ Intents (converted to prompts)
- ✅ Notifications
- ✅ Render data (`toolInput`, `toolOutput`, `widgetState`, `theme`, `locale`)
- ⚠️ Links (may not be supported)

**Auto-Injection**:
Adapter scripts automatically injected into HTML content.

---

## 📖 Installation & Setup

### TypeScript

```bash
# Server & Client
npm install @mcp-ui/server @mcp-ui/client

# Or pnpm
pnpm add @mcp-ui/server @mcp-ui/client

# Or yarn
yarn add @mcp-ui/server @mcp-ui/client
```

### Ruby

```bash
gem install mcp_ui_server
```

### Python

```bash
# pip
pip install mcp-ui-server

# uv
uv add mcp-ui-server
```

---

## 🚀 Quick Start Guide

### TypeScript - Complete Example

**Server Side** (Create UI Resource):

```typescript
// server.ts
import { createUIResource } from '@mcp-ui/server'

// In your MCP tool handler
const handleGetUI = () => {
  return createUIResource({
    uri: 'ui://form/user-input',
    content: {
      type: 'rawHtml',
      htmlString: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            input { padding: 8px; margin: 10px 0; width: 100%; }
            button {
              background: #007bff;
              color: white;
              padding: 10px 20px;
              border: none;
              cursor: pointer;
            }
          </style>
        </head>
        <body>
          <h2>User Input Form</h2>
          <input type="text" id="name" placeholder="Enter name" />
          <button onclick="submitForm()">Submit</button>

          <script>
            function submitForm() {
              const name = document.getElementById('name').value;
              window.parent.postMessage({
                type: 'tool',
                payload: {
                  toolName: 'saveUserName',
                  params: { name }
                }
              }, '*');
            }
          </script>
        </body>
        </html>
      `
    },
    encoding: 'text'
  })
}
```

**Client Side** (Render UI):

```tsx
// App.tsx
import React from 'react'
import { UIResourceRenderer } from '@mcp-ui/client'

function ChatMessage({ message }) {
  // Check if message contains UI resource
  if (
    message.type === 'resource' &&
    message.resource.uri?.startsWith('ui://')
  ) {
    return (
      <UIResourceRenderer
        resource={message.resource}
        onUIAction={(action) => {
          console.log('UI Action:', action)

          if (action.type === 'tool') {
            // Call MCP tool
            mcpClient.callTool(
              action.payload.toolName,
              action.payload.params
            )
          } else if (action.type === 'prompt') {
            // Send prompt to AI
            sendMessage(action.payload.prompt)
          }
        }}
      />
    )
  }

  // Regular text message
  return <p>{message.text}</p>
}
```

---

### Python Example

**Server Side**:

```python
from mcp_ui_server import create_ui_resource

def get_chart_ui():
    return create_ui_resource({
        "uri": "ui://chart/sales",
        "content": {
            "type": "rawHtml",
            "htmlString": """
                <canvas id="chart"></canvas>
                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                <script>
                  const ctx = document.getElementById('chart');
                  new Chart(ctx, {
                    type: 'bar',
                    data: {
                      labels: ['Jan', 'Feb', 'Mar'],
                      datasets: [{
                        label: 'Sales',
                        data: [12, 19, 3]
                      }]
                    }
                  });
                </script>
            """
        },
        "encoding": "text"
    })
```

---

### Ruby Example

**Server Side**:

```ruby
require 'mcp_ui_server'

def get_interactive_button
  McpUiServer.create_ui_resource(
    uri: 'ui://button/action',
    content: {
      type: :raw_html,
      htmlString: '
        <button onclick="handleClick()"  style="padding: 10px 20px; font-size: 16px;">
          Click Me
        </button>
        <script>
          function handleClick() {
            window.parent.postMessage({
              type: "tool",
              payload: {
                toolName: "handleButtonClick",
                params: { timestamp: new Date().toISOString() }
              }
            }, "*");
          }
        </script>
      '
    },
    encoding: :text
  )
end
```

---

## 🎨 Advanced Features

### Auto-Resize Iframe

```tsx
<UIResourceRenderer
  resource={resource}
  htmlProps={{
    autoResizeIframe: true  // or { width: true, height: true }
  }}
/>
```

**How It Works**:
- Observes iframe content size
- Updates iframe dimensions automatically
- No scrollbars needed
- Smooth transitions

---

### Pass Data to Iframe

```tsx
<UIResourceRenderer
  resource={resource}
  htmlProps={{
    iframeRenderData: {
      userId: '123',
      theme: 'dark',
      locale: 'en-US'
    }
  }}
/>
```

**Access in Iframe**:
```javascript
// In your iframe
const data = window.mcpRenderData
console.log(data.userId)  // '123'
console.log(data.theme)   // 'dark'
```

---

### Custom Component Library (Remote DOM)

```tsx
import { customComponents } from './my-components'

<UIResourceRenderer
  resource={remoteDomResource}
  remoteDomProps={{
    library: customComponents
  }}
/>
```

---

### Async Response Handling

**Server Sends `messageId`**:
```typescript
const action = {
  type: 'tool',
  payload: { toolName: 'fetchData', params: {} },
  messageId: 'msg-123'
}
```

**Client Responds**:
```typescript
// Iframe receives response automatically
window.addEventListener('message', (event) => {
  if (event.data.messageId === 'msg-123') {
    console.log('Response:', event.data.result)
  }
})
```

---

## 🌐 Supported Hosts

| Host | Rendering | UI Actions | Notes |
|------|-----------|------------|-------|
| [Nanobot](https://www.nanobot.ai/) | ✅ | ✅ | Full support |
| [ChatGPT](https://chatgpt.com/) | ✅ | ⚠️ | Apps SDK adapter |
| [Postman](https://www.postman.com/) | ✅ | ⚠️ | Partial actions |
| [Goose](https://block.github.io/goose/) | ✅ | ⚠️ | Open source AI agent |
| [LibreChat](https://www.librechat.ai/) | ✅ | ⚠️ | ChatGPT clone |
| [Smithery](https://smithery.ai/playground) | ✅ | ❌ | Render only |
| [MCPJam](https://www.mcpjam.com/) | ✅ | ❌ | Render only |
| [fast-agent](https://fast-agent.ai/mcp/mcp-ui/) | ✅ | ❌ | Render only |
| VSCode | TBA | TBA | Coming soon |

**Legend**:
- ✅ Fully supported
- ⚠️ Partial support (see adapters)
- ❌ Not supported yet

---

## 🔒 Security Features

### Sandboxed Execution

**All Content Types**:
- Run in sandboxed `<iframe>`
- No direct DOM access
- PostMessage-only communication
- Isolated JavaScript context

**Iframe Sandbox Attributes**:
```html
<iframe
  sandbox="allow-scripts allow-same-origin"
  src="..."
></iframe>
```

### Content Security Policy

**Recommended CSP Headers**:
```html
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline'
```

### Input Validation

**Server SDKs Validate**:
- URI format
- Content type
- Encoding method
- Framework selection

---

## 🎯 Real-World Use Cases

### 1. Data Visualization

**Problem**: AI returns table data, hard to interpret

**Solution**: Return chart UI resource

```typescript
const chartResource = createUIResource({
  uri: 'ui://chart/sales-data',
  content: {
    type: 'rawHtml',
    htmlString: `
      <canvas id="myChart"></canvas>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <script>
        new Chart(document.getElementById('myChart'), {
          type: 'line',
          data: {
            labels: ${JSON.stringify(labels)},
            datasets: [{
              label: 'Sales',
              data: ${JSON.stringify(data)}
            }]
          }
        });
      </script>
    `
  },
  encoding: 'text'
})
```

---

### 2. Form Collection

**Problem**: Need structured input from user

**Solution**: Interactive form UI

```typescript
const formResource = createUIResource({
  uri: 'ui://form/preferences',
  content: {
    type: 'rawHtml',
    htmlString: `
      <form id="prefsForm">
        <label>Email: <input name="email" type="email" required /></label>
        <label>Theme:
          <select name="theme">
            <option>Light</option>
            <option>Dark</option>
          </select>
        </label>
        <button type="submit">Save</button>
      </form>
      <script>
        document.getElementById('prefsForm').onsubmit = (e) => {
          e.preventDefault();
          const data = new FormData(e.target);
          window.parent.postMessage({
            type: 'tool',
            payload: {
              toolName: 'savePreferences',
              params: Object.fromEntries(data)
            }
          }, '*');
        };
      </script>
    `
  },
  encoding: 'text'
})
```

---

### 3. Real-Time Dashboard

**Problem**: Show live updating metrics

**Solution**: Dashboard with auto-refresh

```typescript
const dashboardResource = createUIResource({
  uri: 'ui://dashboard/metrics',
  content: {
    type: 'externalUrl',
    iframeUrl: 'https://metrics.example.com/dashboard'
  },
  encoding: 'text'
})
```

---

### 4. Multi-Step Wizard

**Problem**: Guide user through complex workflow

**Solution**: Step-by-step UI with state management

```typescript
const wizardResource = createUIResource({
  uri: 'ui://wizard/onboarding',
  content: {
    type: 'remoteDom',
    script: `
      let step = 1;
      const renderStep = () => {
        const container = document.getElementById('wizard');
        container.innerHTML = \`
          <h2>Step \${step} of 3</h2>
          <button onclick="nextStep()">Next</button>
        \`;
      };

      window.nextStep = () => {
        step++;
        if (step > 3) {
          window.parent.postMessage({
            type: 'tool',
            payload: { toolName: 'completeOnboarding', params: {} }
          }, '*');
        } else {
          renderStep();
        }
      };

      renderStep();
    `,
    framework: 'react'
  },
  encoding: 'text'
})
```

---

## 🔧 API Reference

### Server API (`@mcp-ui/server`)

**`createUIResource(options)`**:

```typescript
interface CreateUIResourceOptions {
  uri: string;                    // Unique identifier
  content: {
    type: 'rawHtml' | 'externalUrl' | 'remoteDom';
    htmlString?: string;          // For rawHtml
    iframeUrl?: string;           // For externalUrl
    script?: string;              // For remoteDom
    framework?: 'react' | 'webcomponents';
  };
  encoding: 'text' | 'blob';      // text or base64
  adapters?: {
    appsSdk?: {
      enabled: boolean;
      config?: object;
    }
  };
}
```

**Returns**: `UIResource` object

---

### Client API (`@mcp-ui/client`)

**React Component**:

```typescript
interface UIResourceRendererProps {
  resource: {
    uri: string;
    mimeType: string;
    text?: string;
    blob?: string;
  };
  onUIAction?: (action: UIAction) => void;
  supportedContentTypes?: ('rawHtml' | 'externalUrl' | 'remoteDom')[];
  htmlProps?: {
    style?: React.CSSProperties;
    iframeProps?: React.IframeHTMLAttributes<HTMLIFrameElement>;
    iframeRenderData?: Record<string, unknown>;
    autoResizeIframe?: boolean | { width?: boolean; height?: boolean };
  };
  remoteDomProps?: {
    library?: ComponentLibrary;
    remoteElements?: RemoteElement[];
  };
}
```

**Web Component**:

```html
<ui-resource-renderer
  resource='{ "mimeType": "text/html", "text": "<h1>Hello</h1>" }'
></ui-resource-renderer>

<script>
const renderer = document.querySelector('ui-resource-renderer');
renderer.addEventListener('onUIAction', (e) => {
  console.log(e.detail);
});
</script>
```

---

## 🛣 Roadmap

**Completed**:
- [x] TypeScript SDK
- [x] Ruby SDK
- [x] Python SDK
- [x] Web Components support
- [x] Remote-DOM support
- [x] Online playground
- [x] UI Action API expansion

**In Progress**:
- [ ] Component libraries
- [ ] More programming language SDKs
- [ ] Additional frontend frameworks

**Planned**:
- [ ] Declarative UI content type
- [ ] Generative UI support
- [ ] Enhanced security features
- [ ] Performance optimizations

---

## 🧪 Examples & Resources

### Live Examples

**Server Examples**:
- **TypeScript**: Full-featured server (Cloudflare Workers)
  - HTTP Streaming: `https://remote-mcp-server-authless.idosalomon.workers.dev/mcp`
  - SSE: `https://remote-mcp-server-authless.idosalomon.workers.dev/sse`
- **Ruby**: [Demo server](/examples/ruby-server-demo)
- **Python**: [Demo server](/examples/python-server-demo)

**Client Examples**:
- **Goose**: Open source AI agent with mcp-ui support
- **LibreChat**: Enhanced ChatGPT clone
- **ui-inspector**: Inspect local mcp-ui servers
- **MCP-UI Chat**: Interactive chat ([hosted version](https://scira-mcp-chat-git-main-idosals-projects.vercel.app/))
- **RemoteDOM Playground**: Test RemoteDOM resources
- **Web Component Demo**: Test Web Component integration

---

### Walkthroughs

**Comprehensive Guides**:
- [TypeScript Server Walkthrough](https://mcpui.dev/guide/server/typescript/walkthrough)
- [Ruby Server Walkthrough](https://mcpui.dev/guide/server/ruby/walkthrough)
- [Python Server Walkthrough](https://mcpui.dev/guide/server/python/walkthrough)

---

## 📚 Additional Resources

### Official Links

- **Documentation**: https://mcpui.dev
- **GitHub**: https://github.com/idosal/mcp-ui
- **Discord**: https://discord.gg/CEAG4KW7ZH
- **GitMCP**: https://gitmcp.io/idosal/mcp-ui

### Related Projects

- **ui-inspector**: https://github.com/idosal/ui-inspector
- **Goose**: https://github.com/block/goose
- **LibreChat**: https://github.com/danny-avila/LibreChat
- **XMCP**: https://github.com/basementstudio/xmcp

### MCP Resources

- **MCP Specification**: https://modelcontextprotocol.io
- **MCP SDK**: https://github.com/anthropics/model-context-protocol

---

## 🤝 Contributing

**Contribution Areas**:
- New platform adapters
- Language SDKs (Go, Java, C#, etc.)
- Component libraries
- Example implementations
- Documentation improvements
- Bug fixes and features

**Get Started**:
1. Read [contribution guidelines](https://github.com/idosal/mcp-ui/blob/main/.github/CONTRIBUTING.md)
2. Fork the repository
3. Create feature branch
4. Submit pull request

---

## ⚠️ Disclaimer

This project is provided "as is", without warranty of any kind. The mcp-ui authors and contributors shall not be held liable for any damages, losses, or issues arising from the use of this software. Use at your own risk.

---

## 🌟 Core Team

- **Ido Salomon**: [@idosal1](https://x.com/idosal1)
- **Liad Yosef**: [@liadyosef](https://x.com/liadyosef)

---

**Last Updated**: 2025-10-24
**Purpose**: Complete reference for MCP-UI SDK
**License**: Apache 2.0 - Open source
**Version**: 5.2.0
**Status**: Experimental community playground
