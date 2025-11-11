# Gifcurry - Video-to-GIF Converter

## Overview

**Purpose**: Comprehensive, open-source video-to-GIF converter and editor
**Language**: Haskell
**Version**: 6.0.1.0
**License**: BSD3
**Author**: David Lettier
**Tagline**: "The open-source, Haskell-built video editor for GIF makers"

## Key Features

- 🎬 **Video-to-GIF Conversion**: Convert most video formats (WebM, MP4, etc.) to animated GIFs
- ✂️ **Video Editing**: Trim/slice videos from specific start/end times
- 📝 **Text Overlays**: Advanced text overlay system with full customization
- 🖼️ **Cropping**: Precise crop control from all four edges
- ⚙️ **Output Control**: Width/height scaling, FPS adjustment, color count, dithering
- 🎨 **Text Customization**: Font family, style, weight, stretch, size, positioning, rotation, colors with transparency
- 📄 **Format Support**: YAML text overlays and SRT subtitles
- 🖥️ **Three Interfaces**: GUI, CLI, and Haskell library API
- ⚡ **100% Electron-free**: Lightweight, native application

## Architecture

### Directory Structure

```
gifcurry/
├── src/
│   ├── cli/          # Command-line interface (Main.hs)
│   ├── gui/          # Graphical interface (GTK+ 3)
│   │   ├── GuiCapabilities.hs
│   │   ├── GuiMisc.hs
│   │   ├── GuiStyle.hs
│   │   ├── GuiKeyboard.hs
│   │   ├── GuiPreview.hs
│   │   ├── GuiTextOverlays.hs
│   │   ├── GuiRecords.hs
│   │   └── Main.hs
│   ├── lib/          # Library API (Gifcurry.hs module)
│   ├── dev/          # Development files (Path generation)
│   └── data/         # UI resources (SVG icons, CSS, glade files)
├── lib/              # Additional Haskell helper libraries
├── docs/             # Documentation
├── icon/             # Application icons
├── logo/             # Logo assets
├── packaging/        # Platform-specific packaging
├── Gifcurry.cabal    # Cabal build configuration
├── stack.yaml        # Stack configuration
└── makefile          # Build automation
```

### Key Components

#### 1. Library API (`src/lib/Gifcurry.hs`)
- Core functionality exposed as Haskell module
- Programmatic access to all features
- Type-safe API design

#### 2. CLI (`src/cli/Main.hs`)
- Command-line interface for automation
- Full feature parity with GUI
- Script-friendly output

#### 3. GUI (`src/gui/`)
- GTK+ 3 based graphical interface
- Real-time preview with GStreamer
- Interactive text overlay editor
- Keyboard shortcuts support

## Technical Stack

### Build System
- **Primary**: Haskell Stack (LTS 12.14)
- **Compiler**: GHC 8.2.x
- **Package Manager**: Cabal

### Runtime Dependencies
- **GTK+** >= 3.10 (GUI)
- **FFmpeg** >= 2.8.15 (video processing)
- **GStreamer** >= 1.0 with plugins (preview)
- **ImageMagick** >= 6 (image manipulation)

### Haskell Dependencies
- `haskell-gi` (0.23.0) - GObject introspection bindings
- `gi-gtk` (3.0.32), `gi-gdk`, `gi-gdkpixbuf`, `gi-cairo` - GTK+ bindings
- `gi-gst` (1.0.22), `gi-gstbase`, `gi-gstvideo` - GStreamer bindings
- `cairo` (0.13.*) - Graphics library
- `pango` (0.13.*) - Text rendering
- `process` >= 1.6.2.0 - Process management
- `yaml` (0.8.26) - YAML parsing for text overlays/SRT
- `temporary`, `directory`, `text`, `filepath`, `filemanip` - File utilities
- `bytestring`, `pureMD5`, `transformers` - Standard utilities

## Usage Examples

### Command Line Interface

```bash
# Basic conversion
gifcurry_cli -i video.webm -o output.gif -s 150 -e 151 -w 800 -f 15

# With text overlay and dithering
gifcurry_cli -i video.mp4 -o output.gif -s 0 -e 5 -w 640 -f 24 -c 100 -d

# Full options
gifcurry_cli \
  --input-file video.webm \
  --output-file output.gif \
  --start-time 150 \
  --end-time 151 \
  --width 800 \
  --fps 15 \
  --color-count 100 \
  --dither
```

### Haskell Library API

```haskell
import qualified Gifcurry

main :: IO ()
main = do
  let params = Gifcurry.defaultParams {
    Gifcurry.inputFile = "video.webm",
    Gifcurry.outputFile = "output.gif",
    Gifcurry.startTime = 150.0,
    Gifcurry.endTime = 151.0,
    Gifcurry.width = 800,
    Gifcurry.fps = 15,
    Gifcurry.colorCount = 100,
    Gifcurry.dither = True
  }
  result <- Gifcurry.createGif params
  print result
```

## Installation

### Linux
```bash
# AppImage (recommended)
wget https://github.com/lettier/gifcurry/releases/download/6.0.1.0/gifcurry-linux-appimage.tar.gz
tar -zxvf gifcurry-linux-appimage.tar.gz
./gifcurry-linux-appimage

# Arch Linux (AUR)
yay -S gifcurry

# Ubuntu Snap
snap install gifcurry
```

### macOS
```bash
# Install script
bash <(curl -sL https://git.io/fjVhY)
```

### From Source (Haskell Stack)
```bash
git clone https://github.com/lettier/gifcurry.git
cd gifcurry
stack setup
stack install
```

## Configuration

### Text Overlays (YAML)
```yaml
- text: "Hello World"
  fontFamily: "Sans"
  fontStyle: "normal"
  fontStretch: "normal"
  fontWeight: 700
  fontSize: 30
  origin: "NorthWest"
  xTranslation: 0.0
  yTranslation: 0.0
  rotation: 0.0
  startTime: 0.0
  endTime: 5.0
  outlineSize: 7
  outlineColor: [0, 0, 0, 1.0]
  fillColor: [255, 255, 255, 1.0]
```

### SRT Subtitles Support
Gifcurry can automatically parse and render SRT subtitle files as text overlays.

## Integration Patterns

### Workflow Integration
1. **Video Capture** → Gifcurry → GIF Output
2. **Screen Recording** → Gifcurry → Demo GIF
3. **Video Editing** → Gifcurry → Preview GIF
4. **Social Media** → Gifcurry → Optimized GIF

### Pipeline Integration
```bash
# FFmpeg → Gifcurry
ffmpeg -i input.mov -c:v libvpx output.webm
gifcurry_cli -i output.webm -o final.gif -s 0 -e 10 -w 640

# Gifcurry → Optimization
gifcurry_cli -i video.mp4 -o temp.gif -s 0 -e 5
gifsicle -O3 --colors 128 temp.gif -o optimized.gif
```

## Related Projects in Collection

### Complementary Tools
- **gifsicle**: Use for post-processing optimization of Gifcurry output
  - `gifsicle -O3 --colors 128 input.gif -o output.gif`
- **gif-h**: Integrate Gifcurry library in C/C++ projects via FFI

### Workflow Enhancement
1. **Gifcurry**: Convert video to GIF with text overlays
2. **gifsicle**: Optimize output GIF size
3. **Result**: High-quality, optimized GIF with custom branding

## Performance Considerations

### Optimization Tips
- Use WebM input format for faster processing
- Reduce frame rate (10-15 FPS) for smaller files
- Limit color count (64-128) for web usage
- Enable dithering for smoother gradients
- Crop unnecessary borders to reduce file size

### Resource Usage
- **Memory**: ~200-500 MB during conversion
- **CPU**: Multi-core FFmpeg encoding
- **Disk**: Temporary files cleaned automatically

## Troubleshooting

### Common Issues

**GTK+ Not Found**
```bash
# Ubuntu/Debian
sudo apt-get install libgtk-3-dev

# macOS
brew install gtk+3
```

**FFmpeg Not Found**
```bash
# Ubuntu/Debian
sudo apt-get install ffmpeg

# macOS
brew install ffmpeg
```

**GStreamer Issues**
```bash
# Ubuntu/Debian
sudo apt-get install gstreamer1.0-plugins-base \
                     gstreamer1.0-plugins-good

# macOS
brew install gstreamer gst-plugins-base gst-plugins-good
```

### Build Issues

**Stack Setup Fails**
```bash
# Clean and rebuild
stack clean
stack setup
stack build --extra-lib-dirs=/usr/local/lib --extra-include-dirs=/usr/local/include
```

## Best Practices

### Video-to-GIF Conversion
1. **Trim First**: Extract only the essential seconds
2. **Optimize Resolution**: Target 640-800px width for web
3. **Frame Rate**: 10-15 FPS is usually sufficient
4. **Color Reduction**: 128 colors balances quality and size
5. **Dithering**: Enable for smooth gradients

### Text Overlays
1. **Readability**: Use high-contrast colors with outlines
2. **Timing**: Sync text appearance with video content
3. **Positioning**: Avoid obscuring important video elements
4. **Font Size**: Scale with output resolution

### File Size Management
1. **Duration**: Keep GIFs under 10 seconds
2. **Resolution**: Balance visual quality with file size
3. **Post-Processing**: Use gifsicle for final optimization
4. **Format Choice**: Consider WebM for larger animations

## Development

### Building from Source
```bash
# Clone repository
git clone https://github.com/lettier/gifcurry.git
cd gifcurry

# Setup Haskell environment
stack setup

# Build
stack build

# Install
stack install

# Run tests
stack test
```

### Contributing
- Haskell experience recommended
- GTK+ knowledge helpful for GUI improvements
- FFmpeg understanding for video processing features

## Documentation Links

- **Official Repository**: https://github.com/lettier/gifcurry
- **Issue Tracker**: https://github.com/lettier/gifcurry/issues
- **Releases**: https://github.com/lettier/gifcurry/releases

## Project Status

- ✅ **Active Maintenance**: Regular updates and bug fixes
- ✅ **Production Ready**: Stable 6.0+ release
- ✅ **Cross-Platform**: Linux, macOS, Windows
- ✅ **Well Documented**: Comprehensive README and examples

## License

BSD3 License - See LICENSE file in repository root
