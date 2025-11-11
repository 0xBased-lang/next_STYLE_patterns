# Manim MCP Server - Mathematical Animation Engine Integration

**GitHub**: https://github.com/abhiemj/manim-mcp-server
**Type**: Model Context Protocol (MCP) Server
**Author**: abhiemj (https://github.com/abhiemj)
**License**: MIT
**Category**: Animation & Video
**Language**: Python
**Prerequisites**: Python 3.8+, Manim Community Edition, MCP

---

## 🎯 Purpose

AI-powered mathematical animation creation using Manim Community library through Model Context Protocol integration. Allows AI assistants to execute Manim Python scripts and return rendered animations.

## ⚡ Key Capabilities

### Core Features
- **Manim Script Execution**: Run Manim Python animation code through MCP
- **Video Generation**: Automatically render animations to video format
- **Portable Configuration**: Environment variable-based setup
- **Media Management**: Save outputs to visible media folder
- **Cleanup Tools**: Remove temporary files after execution
- **Claude Integration**: Direct connection to Claude Desktop and AI assistants

### Animation Types Supported
- **Mathematical Visualizations**: Graphs, equations, geometric transformations
- **Educational Content**: Math/science explanations with animated diagrams
- **Data Visualization**: Animated charts and statistical graphics
- **3D Graphics**: Three-dimensional mathematical objects and transformations
- **Text Animations**: Equation writing, text transformations, LaTeX rendering

## 📦 Installation

### Prerequisites

```bash
# Install Python 3.8+
python --version

# Install Manim Community Edition
pip install manim

# Install MCP
pip install mcp
```

### Setup

```bash
# Clone repository
git clone https://github.com/abhiemj/manim-mcp-server.git
cd manim-mcp-server
```

### Integration with Claude Desktop

Add to `claude_desktop_config.json`:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
**Linux**: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "manim-server": {
      "command": "/absolute/path/to/python",
      "args": [
        "/absolute/path/to/manim-mcp-server/src/manim_server.py"
      ],
      "env": {
        "MANIM_EXECUTABLE": "/Users/[Your_username]/anaconda3/envs/manim2/Scripts/manim.exe"
      }
    }
  }
}
```

### Finding Your Python Path

**Windows (PowerShell)**:
```powershell
(Get-Command python).Source
```

**Windows (Command Prompt)**:
```cmd
where python
```

**Linux/macOS (Terminal)**:
```bash
which python
```

## 🎬 Usage Examples

### Example 1: Simple Mathematical Animation
```python
from manim import *

class SquareToCircle(Scene):
    def construct(self):
        circle = Circle()
        square = Square()
        square.flip(RIGHT)
        square.rotate(-3 * TAU / 8)
        circle.set_fill(PINK, opacity=0.5)

        self.play(Create(square))
        self.play(Transform(square, circle))
        self.play(FadeOut(square))
```

**AI Prompt**: "Create an animation that transforms a square into a circle with a pink fill"

### Example 2: Mathematical Equation
```python
from manim import *

class WriteFormula(Scene):
    def construct(self):
        formula = MathTex(r"e^{i\pi} + 1 = 0")
        self.play(Write(formula))
        self.wait(2)
```

**AI Prompt**: "Animate writing Euler's identity formula"

### Example 3: Graph Plotting
```python
from manim import *

class PlotFunction(Scene):
    def construct(self):
        axes = Axes(x_range=[-3, 3, 1], y_range=[-3, 3, 1])
        graph = axes.plot(lambda x: x**2, color=BLUE)

        self.play(Create(axes), Create(graph))
        self.wait()
```

**AI Prompt**: "Create an animation plotting y=x² on coordinate axes"

## 🔧 Technical Details

### Architecture

```
manim-mcp-server/
├── src/
│   └── manim_server.py     # Main MCP server script
├── media/                  # Output directory for rendered videos
├── LICENSE.txt
├── README.md
└── Demo-manim-mcp.gif      # Demo showcase
```

### Workflow Process

1. **Script Reception**: MCP server receives Manim Python code from AI
2. **Execution**: Server executes code in isolated Python environment
3. **Rendering**: Manim renders animation to video (MP4/GIF)
4. **Return**: Server returns video file path or content to AI
5. **Cleanup**: Optional cleanup of temporary files

### Environment Variables

- `MANIM_EXECUTABLE`: Path to Manim executable (required for some environments)
- `OUTPUT_DIR`: Custom output directory for rendered videos (optional)
- `QUALITY`: Render quality setting (low, medium, high, 4k) (optional)

## 📝 Available MCP Tools

### `execute_manim_script`
Execute a Manim Python animation script and return the rendered video.

**Parameters**:
- `script` (string, required): Complete Manim Python code
- `quality` (string, optional): Render quality (default: "medium")
- `format` (string, optional): Output format - "mp4", "gif", "mov" (default: "mp4")
- `cleanup` (boolean, optional): Remove temporary files after render (default: true)

**Returns**:
- `video_path`: Absolute path to rendered animation
- `duration`: Animation duration in seconds
- `file_size`: Output file size
- `render_time`: Time taken to render

### `cleanup_media`
Remove temporary files and old renders from media directory.

**Parameters**:
- `older_than_days` (number, optional): Remove files older than N days (default: 7)
- `keep_recent` (number, optional): Keep N most recent files (default: 10)

**Returns**:
- `files_removed`: Number of files removed
- `space_freed`: Disk space freed in MB

## 🎨 Use Cases

### Educational Content Creation
- **Math Tutorials**: Visualize calculus, linear algebra, geometry concepts
- **Physics Simulations**: Animated demonstrations of physics principles
- **Statistics**: Data visualization with animated charts and graphs
- **Computer Science**: Algorithm visualization, data structures

### Professional Applications
- **Research Presentations**: Academic presentations with animated diagrams
- **Technical Documentation**: Animated examples for technical concepts
- **Marketing**: Eye-catching mathematical/technical animations
- **Training Materials**: Educational content with visual explanations

### Creative Projects
- **Art**: Generative art using mathematical patterns
- **Music Videos**: Math-based visualizations synchronized to music
- **Social Media**: Short educational clips for platforms
- **Interactive Exhibits**: Museum/gallery mathematical installations

## 🌟 Advanced Features

### Custom Rendering Options

```python
# High quality 4K render
config.pixel_height = 2160
config.pixel_width = 3840
config.frame_rate = 60

# Fast preview quality
config.quality = "low_quality"
config.preview = True
```

### Multiple Scenes

```python
from manim import *

class Scene1(Scene):
    def construct(self):
        # First animation
        pass

class Scene2(Scene):
    def construct(self):
        # Second animation
        pass

# Render specific scene
# manim -pql script.py Scene1
```

### 3D Animations

```python
from manim import *

class ThreeDExample(ThreeDScene):
    def construct(self):
        axes = ThreeDAxes()
        sphere = Sphere()

        self.set_camera_orientation(phi=75 * DEGREES, theta=30 * DEGREES)
        self.play(Create(axes), Create(sphere))
```

## 🔌 Editor Integrations

### Claude Desktop
Primary integration (configuration shown above)

### VS Code
Use with Continue extension:
```json
{
  "continue.mcpServers": {
    "manim": {
      "command": "python",
      "args": ["/path/to/manim-mcp-server/src/manim_server.py"]
    }
  }
}
```

### Cursor
Add to Cursor settings:
```json
{
  "mcpServers": {
    "manim": {
      "command": "python",
      "args": ["/path/to/manim-mcp-server/src/manim_server.py"],
      "env": {
        "MANIM_EXECUTABLE": "/path/to/manim"
      }
    }
  }
}
```

## 📊 Performance Considerations

### Rendering Times
- **Low Quality (480p)**: 5-30 seconds per scene
- **Medium Quality (720p)**: 15-60 seconds per scene
- **High Quality (1080p)**: 30-120 seconds per scene
- **4K Quality (2160p)**: 60-300+ seconds per scene

### Optimization Tips
1. **Use Preview Mode**: Fast renders for testing (`-pl` flag)
2. **Lower Frame Rate**: 30fps instead of 60fps for faster renders
3. **Reduce Complexity**: Simplify animations for quicker iterations
4. **Cache Assets**: Reuse rendered components across scenes

## 🐛 Troubleshooting

### Common Issues

**Issue**: "Manim not found"
```bash
# Solution: Install Manim properly
pip install manim
which manim  # Verify installation
```

**Issue**: "LaTeX not found"
```bash
# Solution: Install LaTeX distribution
# macOS
brew install --cask mactex

# Ubuntu/Debian
sudo apt-get install texlive-full

# Windows
# Download and install MiKTeX from miktex.org
```

**Issue**: "Permission denied"
```bash
# Solution: Make script executable
chmod +x src/manim_server.py
```

**Issue**: "Module not found"
```bash
# Solution: Install in correct Python environment
pip install manim mcp
```

## 📚 Resources

### Manim Documentation
- **Official Docs**: https://docs.manim.community/
- **Tutorial**: https://docs.manim.community/en/stable/tutorials.html
- **Reference**: https://docs.manim.community/en/stable/reference.html
- **Examples**: https://docs.manim.community/en/stable/examples.html

### Community Resources
- **Manim Community**: https://www.manim.community/
- **YouTube Tutorials**: 3Blue1Brown channel
- **Discord**: Manim Community Discord server
- **Reddit**: r/manim

### Related Tools
- **ManimGL**: Grant Sanderson's original version
- **ManimCE**: Community Edition (this project uses this)
- **ManimPango**: Text rendering library for Manim

## 🎓 Learning Path

### Beginner
1. Install Manim and MCP server
2. Run basic shape animations (squares, circles)
3. Learn text and equation animations
4. Experiment with transformations

### Intermediate
1. Create graph plotting animations
2. Build multi-scene presentations
3. Use custom colors and styling
4. Implement camera movements

### Advanced
1. 3D scene creation and manipulation
2. Complex mathematical visualizations
3. Custom animation classes and utilities
4. Integration with external data sources

## 🌐 Integration Examples

### With Claude
```
User: Create an animation showing the Pythagorean theorem with a right triangle

Claude: [Uses manim-mcp-server to generate animation code]
[Server executes Manim script]
[Returns rendered video of theorem visualization]
```

### With ChatGPT (via MCP bridge)
```javascript
// Configure ChatGPT to use Manim MCP
const mcpClient = new MCPClient('manim-server')
const result = await mcpClient.execute_manim_script({
  script: manimCode,
  quality: 'high'
})
```

### Batch Processing
```bash
# Process multiple animations
for script in scripts/*.py; do
  python src/manim_server.py "$script" --quality high
done
```

## 🔒 Security Considerations

### Code Execution Safety
- **Sandboxing**: Consider running in isolated environment/container
- **Input Validation**: Validate Manim scripts before execution
- **Resource Limits**: Set memory and CPU limits for rendering
- **File Access**: Restrict file system access to necessary directories

### Best Practices
```python
# Use virtual environment
python -m venv manim-env
source manim-env/bin/activate

# Run with resource limits (Linux)
ulimit -v 4000000  # 4GB memory limit
```

## 🏆 Featured In

**Awesome MCP Servers**: Listed in the official [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) repository under **Animation & Video** category.

## 🤝 Contributing

Contributions welcome! Areas for enhancement:
- Additional output formats (WebM, AVI)
- Real-time preview capabilities
- Batch rendering support
- Enhanced error reporting
- Template library integration

### Development Setup
```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/manim-mcp-server.git

# Create feature branch
git checkout -b add-feature

# Make changes and test
python src/manim_server.py

# Commit and push
git commit -m "Added feature"
git push origin add-feature

# Open pull request
```

## 📧 Support & Contact

- **Issues**: https://github.com/abhiemj/manim-mcp-server/issues
- **Author**: [@abhiemj](https://github.com/abhiemj)
- **Instagram**: [@aiburner_official](https://www.instagram.com/aiburner_official)

## 🎁 Acknowledgments

- **Manim Community**: For the amazing animation library
- **Grant Sanderson (3Blue1Brown)**: Creator of original Manim
- **MCP Ecosystem**: For the open-source protocol

---

**Last Updated**: 2025-10-24
**Status**: Active Development
**Python Version**: 3.8+
**Manim Version**: Community Edition (Latest)
