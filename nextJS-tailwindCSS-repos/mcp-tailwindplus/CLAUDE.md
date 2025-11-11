# TailwindPlus MCP Server - Premium TailwindUI Components Access

**GitHub**: https://github.com/richardkmichael/mcp-tailwindplus
**Related**: [TailwindPlus Downloader](https://github.com/richardkmichael/tailwindplus-downloader)
**Type**: Model Context Protocol (MCP) Server
**Author**: richardkmichael
**License**: MIT
**Language**: Python
**Tech Stack**: Python, FastMCP, `uv` package manager

---

## 🎯 Purpose

AI-powered access to TailwindPlus (premium TailwindUI) components through Model Context Protocol. Provides AI assistants with component discovery, source code retrieval, and preview capabilities for professional UI development.

**Note**: Requires TailwindPlus components JSON file obtained via [TailwindPlus Downloader](https://github.com/richardkmichael/tailwindplus-downloader).

## ⚡ Key Capabilities

### Core Features
- **Component Access**: Browse and retrieve premium TailwindUI components
- **Multi-Framework Support**: HTML, React, Vue implementations
- **Version Control**: Support for Tailwind CSS v3 and v4
- **Smart Search**: Find components by keyword across categories
- **Preview Generation**: Get component preview HTML
- **Resource Templates**: Direct URI access to components (MCP-compliant clients)
- **Fast Performance**: Python-based server with efficient data handling

### Supported Frameworks
- **HTML**: Pure HTML with Tailwind classes
- **React**: JSX components with TypeScript support
- **Vue**: Vue 3 components with Composition API

### Supported Tailwind Versions
- **Version 3**: Tailwind CSS v3.x compatible
- **Version 4**: Tailwind CSS v4.x compatible

## 📦 Installation

### Prerequisites

```bash
# Install uv (Python package manager)
# macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Verify installation
uv --version
```

### Quick Start

1. **Obtain TailwindPlus Components JSON**:
   ```bash
   # Use TailwindPlus Downloader
   git clone https://github.com/richardkmichael/tailwindplus-downloader
   cd tailwindplus-downloader
   # Follow README to download components
   ```

2. **Install MCP Server with Claude Code**:
   ```bash
   claude mcp add tailwindplus uvx -- \
     git+https://git@github.com/richardkmichael/mcp-tailwindplus@latest \
     --tailwindplus-data /path/to/tailwindplus-components.json
   ```

3. **Configure Claude Settings**:
   ```
   # Store in Claude's memory
   > Use TailwindPlus react for TailwindCSS v4
   ⎿ Got it.
   ```

### Shared Config (Team)

Add with project scope and set environment variable:

```bash
claude mcp add tailwindplus -s project uvx -- \
  git+https://git@github.com/richardkmichael/mcp-tailwindplus@latest

# Set environment variable
export MCP_TAILWINDPLUS_DATA=/path/to/tailwindplus-components.json
```

This allows `.mcp.json` to be committed to repository, while different component files can be used if necessary.

## 🔌 Editor Integrations

### Other MCP Clients

Configure in MCP client settings:

```json
{
  "mcpServers": {
    "mcp-tailwindplus": {
      "command": "uvx",
      "args": [
        "git+https://github.com/richardkmichael/mcp-tailwindplus@latest",
        "--tailwindplus-data",
        "/path/to/tailwindplus-components.json"
      ]
    }
  }
}
```

### Direct Execution

```bash
uvx git+https://github.com/richardkmichael/mcp-tailwindplus@latest \
  --tailwindplus-data /path/to/tailwindplus-components.json
```

## 🛠️ Available MCP Tools

### `list_component_names`
List all available components.

**Parameters**: None

**Returns**:
```json
{
  "components": [
    "Application UI.Forms.Input Groups.Input with leading icon",
    "Marketing.Hero Sections.Simple centered",
    "E-commerce.Product Lists.Product grid"
  ],
  "total": 500
}
```

### `get_component_by_full_name`
Get component code (HTML/React/Vue).

**Parameters**:
- `full_name` (required): Dot-separated path (e.g., `Application UI.Forms.Input Groups.Label with leading icon`)
- `framework` (required): `html`, `react`, or `vue`
- `version` (required): `3` or `4` (Tailwind CSS version)

**Example**:
```json
{
  "full_name": "Application UI.Forms.Input Groups.Input with leading icon",
  "framework": "react",
  "version": "4"
}
```

**Returns**:
```json
{
  "version": "2025-07-15-002529",
  "full_name": "Application UI.Forms.Input Groups.Input with leading icon",
  "framework": "react",
  "tailwind_version": "4",
  "code": "// Complete React component code",
  "dependencies": ["@heroicons/react"]
}
```

### `get_component_preview_by_full_name`
Get component preview HTML.

**Parameters**:
- `full_name` (required): Component path
- `framework` (required): `html`, `react`, or `vue`
- `version` (required): `3` or `4`

**Returns**:
```json
{
  "preview_html": "<!DOCTYPE html>...",
  "component_name": "Input with leading icon"
}
```

### `search_component_names`
Search components by keyword.

**Parameters**:
- `search_term` (required): Keyword to search for

**Returns**:
```json
{
  "results": [
    "Application UI.Forms.Input Groups.Input with leading icon",
    "Application UI.Forms.Input Groups.Input with overlapping label"
  ],
  "count": 15
}
```

## 📚 Available MCP Resources

MCP resources provide direct URI access to components:

### Component Code
**URI Format**: `twplus://{component_full_name}/{framework}/{version}`

**Example**: `twplus://Application UI.Forms.Input Groups.Input with leading icon/react/4`

### Component Preview
**URI Format**: `twplus://{component_full_name}/{framework}/{version}/preview`

**Example**: `twplus://Application UI.Forms.Input Groups.Input with leading icon/react/4/preview`

⚠️ **Note**: Resources require MCP clients that support "resource templates". Not all clients support this feature.

### Parameters
- `framework`: `html`, `react`, or `vue`
- `version`: `3` or `4` (Tailwind CSS version)
- `component_full_name`: Dot-separated path (e.g., `Application UI.Forms.Input Groups.Label with leading icon`)

## 🎨 Component Organization

### Hierarchical Structure

Components are organized by category:

- **Marketing**
  - Hero Sections
  - Feature Sections
  - CTA Sections
  - Pricing
  - Testimonials

- **Application UI**
  - Forms
    - Input Groups
    - Select Menus
    - Textareas
  - Navigation
  - Layout
  - Headings
  - Lists
  - Feedback
  - Overlays

- **E-commerce**
  - Product Lists
  - Product Overviews
  - Shopping Carts
  - Checkout Forms
  - Order Summaries

### Full Name Format

Components use dot-separated paths:
```
Category.Subcategory.Component Name
```

**Examples**:
- `Marketing.Hero Sections.Simple centered`
- `Application UI.Forms.Input Groups.Input with leading icon`
- `E-commerce.Product Lists.Product grid`

## 💻 Usage Examples

### Example 1: Simple Search Input

```
User: I need a simple one-line search input to put in the app header.

AI: mcp-tailwindplus - Get Component by Full Name
    (full_name: "Application UI.Forms.Input Groups.Input with leading icon",
     framework: "react",
     tailwind_version: "4")

AI: Perfect! Here are two ideal options for a header search input:

    1. Input with Leading Icon
       - Simple search input with magnifying glass icon
       - Just swap the EnvelopeIcon for MagnifyingGlassIcon
       - Clean, compact design perfect for headers

    2. Input with Keyboard Shortcut
       - Shows "⌘K" shortcut hint
       - Modern search UX that users expect
       - Great for power users

    For a header, I'd recommend the first one with a search icon.
```

### Example 2: URL Input Component

```
User: Show me the code for an input component we can use for a URL with
      the schema, e.g., `https:// [INPUT]`

AI: I'll search for a TailwindPlus input component that would work well
    for URL input with a schema prefix.

AI: mcp-tailwindplus - Search Component Names
    (search_term: "input")

AI: Perfect! Let me get the "Input with inline leading add-on" component,
    which would be ideal for showing a URL schema prefix like "https://".

AI: mcp-tailwindplus - Get Component by Full Name
    (full_name: "Application UI.Forms.Input Groups.Input with inline add-on",
     framework: "react",
     tailwind_version: "4")

AI: Here's a TailwindPlus React component for URL input with the "https://"
    schema prefix:
    [Shows React code]
```

## 💡 Tips & Best Practices

### Component Versioning

The TailwindPlus components JSON file has a `__version__` field.

**Recommendation**: Tell Claude to add the component `__name__` and `__version__` as a comment in source code for easy maintenance:

```javascript
// Start: Application UI > Forms > Input Groups > Input with leading icon | v.2025-07-15-002529

// component code here

// End: Application UI > Forms > Input Groups > Input with leading icon | v.2025-07-15-002529
```

This makes future markup maintenance much easier.

### Framework Selection

**Referring to "component" means TailwindPlus component:**
```
> Referring to "component" means TailwindPlus component.
⎿ Got it.
```

**Set default framework:**
```
> Use TailwindPlus react for TailwindCSS v4
⎿ Got it.
```

## 🔧 Development

### Setup

```bash
# Clone repository
git clone https://github.com/richardkmichael/mcp-tailwindplus
cd mcp-tailwindplus

# Sync dependencies with uv
uv sync

# Run server
uv run mcp-tailwindplus --tailwindplus-data /path/to/data.json
```

### Testing

```bash
# Run tests
uv run pytest tests/ -v

# Format code
uv run ruff format .

# Check code
uv run ruff check . --fix
```

### Running in Development

This project has an `.mcp.json` to run itself.

Set `MCP_TAILWINDPLUS_DATA=/path/to/file.json` prior to running your agent:

```bash
export MCP_TAILWINDPLUS_DATA=/path/to/data.json
claude
```

The data file is not specified in MCP settings to provide flexibility in the local development environment. Use a "short" (`--debug-short-test`) file from the downloader for testing.

### Inspecting the Server

Use the [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) to execute MCP commands interactively:

```bash
MCP_TAILWINDPLUS_DATA=/path/to/data.json \
  npx @modelcontextprotocol/inspector \
  uv run mcp-tailwindplus
```

## 📊 Technical Details

### Project Structure

```
mcp-tailwindplus/
├── src/
│   └── mcp_tailwindplus/
│       ├── __init__.py          # Main entrypoint
│       ├── server.py            # FastMCP MCP server
│       └── tailwind_plus.py     # Core functionality
├── tests/                       # Test suite
├── pyproject.toml               # Project configuration
├── uv.lock                      # Dependency lock file
├── .mcp.json                    # MCP configuration
├── CLAUDE.md                    # Project notes
└── README.md
```

### Implementation Notes

- **Not using FastMCP decorator methods**
- **Main entrypoint**: `src/mcp_tailwindplus/__init__.py`
- **FastMCP MCP server created in**: `src/mcp_tailwindplus/server.py`
- **Functionality provided by**: `src/mcp_tailwindplus/tailwind_plus.py` (wrapped by server)

### Environment Variables

- `MCP_TAILWINDPLUS_DATA`: Path to TailwindPlus component data file (alternative to `--tailwindplus-data`)

## 🎯 Use Cases

### Rapid Prototyping
- Quickly access premium TailwindUI components
- Build professional UIs without manual component construction
- Test different component variations

### Production Development
- Use production-ready components with proper accessibility
- Maintain consistency with TailwindUI design system
- Reduce development time with pre-built patterns

### Learning & Reference
- Study professional component implementations
- Learn Tailwind CSS best practices
- Understand responsive design patterns

### Team Collaboration
- Share component library across team
- Maintain version consistency
- Reference components by standardized naming

## 📚 Resources

### Official Resources
- **GitHub**: https://github.com/richardkmichael/mcp-tailwindplus
- **TailwindPlus Downloader**: https://github.com/richardkmichael/tailwindplus-downloader
- **TailwindUI**: https://tailwindui.com

### MCP Resources
- **MCP Specification**: https://modelcontextprotocol.io/specification/latest
- **FastMCP Documentation**: https://gofastmcp.com/llms.txt
- **MCP Inspector**: https://modelcontextprotocol.io/docs/tools/inspector

### Python Tools
- **uv Package Manager**: https://docs.astral.sh/uv
- **Python Help**: Run `uv help` for assistance

## 🔐 Security & Licensing

### License Considerations
- **MCP Server**: MIT Licensed
- **TailwindPlus Components**: Requires valid TailwindUI license
- **Usage**: Respect TailwindUI licensing terms

### Best Practices
- Only use with valid TailwindUI subscription
- Don't share components JSON file publicly
- Keep component data private within team

## 🐛 Troubleshooting

### Common Issues

**Issue**: "Data file not found"
```bash
# Solution: Set environment variable or pass as argument
export MCP_TAILWINDPLUS_DATA=/absolute/path/to/data.json

# Or pass directly
uv run mcp-tailwindplus --tailwindplus-data /path/to/data.json
```

**Issue**: "uv command not found"
```bash
# Solution: Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# Add to PATH
export PATH="$HOME/.cargo/bin:$PATH"
```

**Issue**: "Component not found"
```bash
# Solution: Use exact full name from component list
# List all components first
mcp-tailwindplus list_component_names

# Use exact dot-separated path
```

## 🤝 Contributing

Contributions welcome! Areas for enhancement:
- Additional framework support (Angular, Svelte)
- Component metadata extraction
- Enhanced search capabilities
- Performance optimizations
- Documentation improvements

### Development Workflow
```bash
# Format code before committing
uv run ruff format .
uv run ruff check . --fix

# Run tests
uv run pytest
```

---

**Last Updated**: 2025-10-24
**Status**: Active Development
**Python Version**: 3.8+
**Package Manager**: uv (required)
**License**: MIT (Server), TailwindUI License (Components)
