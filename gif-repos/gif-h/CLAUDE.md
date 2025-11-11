# gif-h - Single-Header GIF Encoder Library

## Overview

**Purpose**: Minimal, single-header C/C++ library for programmatic GIF encoding
**Language**: C/C++ (compatible with both)
**Type**: Header-only library
**Size**: 864 lines (28 KB)
**License**: Public Domain
**Author**: Charlie Tangora (ctangora@gmail.com)
**Philosophy**: "Simple, very limited, straight-ahead implementation of GIF format"

## Key Features

- 📦 **Single Header**: Entire library in one file - just #include and compile
- 🎨 **K-D Tree Color Matching**: Spatial indexing for fast nearest-color lookup
- 🖼️ **Floyd-Steinberg Dithering**: Optional dithering for smooth gradients
- ⚡ **Delta Encoding**: Only saves changed pixels between frames
- 🔧 **Memory Hooks**: Customizable memory allocation
- 🔄 **OpenGL Support**: Optional vertical flip for OpenGL buffers
- 🚫 **Zero Dependencies**: No external libraries required
- ⚙️ **Simple API**: Just 3 functions to create a GIF

## Architecture

### Directory Structure

```
gif-h/
├── gif.h              # Complete library (864 lines, 28 KB)
├── gif-h-demo.cpp    # Usage example (80 lines)
├── LICENSE           # Public domain notice
└── README.md         # Documentation
```

### Core Components

#### Public API (3 Functions)

```c
// 1. Start writing a GIF
bool GifBegin(
    GifWriter* writer,
    const char* filename,
    uint32_t width,
    uint32_t height,
    uint32_t delay,         // Frame delay in hundredths of second
    int32_t bitDepth = 8,   // Color depth (1-8)
    bool dither = false     // Enable Floyd-Steinberg dithering
);

// 2. Write a frame
bool GifWriteFrame(
    GifWriter* writer,
    const uint8_t* image,   // RGBA8 pixel data
    uint32_t width,
    uint32_t height,
    uint32_t delay,
    int32_t bitDepth = 8,
    bool dither = false
);

// 3. Finish and close the GIF
bool GifEnd(GifWriter* writer);
```

#### Internal Data Structures

```c
// Color palette with K-D tree indexing
typedef struct {
    int bitDepth;
    uint8_t r[256];
    uint8_t g[256];
    uint8_t b[256];

    // K-D tree for fast color matching
    uint8_t treeSplitElt[256];
    uint8_t treeSplit[256];
} GifPalette;

// Opaque writer structure
typedef struct {
    FILE* f;
    uint8_t* oldImage;
    // ... internal state
} GifWriter;
```

#### Key Algorithms

1. **GifMakePalette()**: K-D tree-based median-cut color quantization
2. **GifGetClosestPaletteColor()**: Fast nearest-color lookup using K-D tree
3. **GifDitherImage()**: Floyd-Steinberg error diffusion dithering
4. **GifWriteLzwImage()**: LZW compression with variable-bit-width encoding

## Technical Stack

### Language
- **C/C++ Compatible**: Works with both C and C++ compilers
- **Standard**: ANSI C/C99/C++11
- **Platform**: Cross-platform (Unix, Windows, macOS)

### Dependencies
**None** - Only standard library headers:
- `<stdio.h>` - FILE operations
- `<string.h>` - memory operations (memcpy, memset)
- `<stdint.h>` - fixed-width integer types
- `<stdbool.h>` - boolean type (C99)

### Build System
- **Header-only**: No build system required
- **Compilation**: Just #include "gif.h" and compile

## Usage Examples

### Basic Usage (C++)

```cpp
#include "gif.h"
#include <vector>
#include <cstdint>

int main() {
    int width = 100;
    int height = 200;
    std::vector<uint8_t> pixels(width * height * 4, 0);

    // Fill pixels with RGBA data
    for (int i = 0; i < width * height; ++i) {
        pixels[i * 4 + 0] = 255;  // R
        pixels[i * 4 + 1] = 0;    // G
        pixels[i * 4 + 2] = 0;    // B
        pixels[i * 4 + 3] = 255;  // A (ignored)
    }

    GifWriter g;
    GifBegin(&g, "output.gif", width, height, 10);
    GifWriteFrame(&g, pixels.data(), width, height, 10);
    GifEnd(&g);

    return 0;
}
```

### Animation Example

```cpp
#include "gif.h"
#include <cmath>
#include <vector>

int main() {
    const int width = 256;
    const int height = 256;
    const int frameCount = 256;

    std::vector<uint8_t> image(width * height * 4);

    GifWriter g;
    GifBegin(&g, "animation.gif", width, height, 2, 8, true);

    for (int frame = 0; frame < frameCount; ++frame) {
        for (int y = 0; y < height; ++y) {
            for (int x = 0; x < width; ++x) {
                int index = (y * width + x) * 4;

                // Procedural animation using sine waves
                float t = frame / 256.0f;
                image[index + 0] = (uint8_t)(128 + 127 * sin(x * 0.05f + t * 6.28f));
                image[index + 1] = (uint8_t)(128 + 127 * sin(y * 0.05f + t * 6.28f));
                image[index + 2] = (uint8_t)(128 + 127 * sin((x + y) * 0.05f + t * 6.28f));
                image[index + 3] = 255;
            }
        }

        GifWriteFrame(&g, image.data(), width, height, 2, 8, true);
    }

    GifEnd(&g);
    return 0;
}
```

### C Usage

```c
#include "gif.h"
#include <stdlib.h>

int main() {
    int width = 100;
    int height = 100;
    uint8_t* image = (uint8_t*)malloc(width * height * 4);

    // Fill image with solid color
    for (int i = 0; i < width * height; ++i) {
        image[i * 4 + 0] = 0;    // R
        image[i * 4 + 1] = 255;  // G
        image[i * 4 + 2] = 0;    // B
        image[i * 4 + 3] = 255;  // A
    }

    GifWriter g;
    GifBegin(&g, "output.gif", width, height, 10, 8, false);
    GifWriteFrame(&g, image, width, height, 10, 8, false);
    GifEnd(&g);

    free(image);
    return 0;
}
```

### Custom Memory Allocation

```cpp
#define GIF_MALLOC my_malloc
#define GIF_FREE my_free
#define GIF_TEMP_MALLOC my_temp_malloc
#define GIF_TEMP_FREE my_temp_free

#include "gif.h"

void* my_malloc(size_t size) {
    return custom_allocator(size);
}

void my_free(void* ptr) {
    custom_deallocator(ptr);
}

// ... rest of code
```

### OpenGL Buffer Support

```cpp
// Flip vertically for OpenGL buffers
#define GIF_FLIP_VERT
#include "gif.h"

// Now GIF will be written bottom-to-top
// (matches OpenGL's coordinate system)
```

## Compilation

### GCC/Clang

```bash
# C compilation
gcc -o program program.c -std=c99

# C++ compilation
g++ -o program program.cpp -std=c++11

# With optimization
g++ -O3 -o program program.cpp
```

### Visual Studio

```bash
cl /EHsc /O2 program.cpp
```

### CMake Integration

```cmake
# Just add the header directory to include path
include_directories(${PROJECT_SOURCE_DIR}/external/gif-h)

# Or copy gif.h directly to your source directory
```

## Configuration Options

### Compile-Time Macros

```cpp
// Custom memory allocation (permanent)
#define GIF_MALLOC my_malloc
#define GIF_FREE my_free

// Custom temporary memory allocation (stack-style)
#define GIF_TEMP_MALLOC my_temp_malloc
#define GIF_TEMP_FREE my_temp_free

// Flip image vertically (for OpenGL)
#define GIF_FLIP_VERT

#include "gif.h"
```

### Runtime Parameters

```cpp
// Bit depth: 1-8 (controls color count)
// bitDepth=1: 2 colors
// bitDepth=8: 256 colors
int bitDepth = 8;

// Frame delay in centiseconds (1/100 second)
// delay=2:  50 FPS (very fast)
// delay=10: 10 FPS (standard)
// delay=100: 1 FPS (slow)
uint32_t delay = 10;

// Dithering: true for Floyd-Steinberg, false for none
bool dither = true;

GifBegin(&g, "output.gif", width, height, delay, bitDepth, dither);
```

## Technical Details

### Color Quantization

**K-D Tree Median-Cut Algorithm**:
1. Build histogram of all colors in image
2. Recursively split color space at median values
3. Create K-D tree for fast nearest-neighbor lookup
4. Complexity: O(log n) color matching

### Delta Encoding

- Only pixels that changed from previous frame are encoded
- Significantly reduces file size for animations
- Automatic transparent pixel handling for unchanged regions

### LZW Compression

- Variable-bit-width LZW encoding (9-12 bits)
- Standard GIF compression algorithm
- No external compression library needed

### Dithering

**Floyd-Steinberg Error Diffusion**:
```
      X   7/16
3/16 5/16 1/16
```
- Distributes quantization error to neighboring pixels
- Produces smooth gradients with limited color palettes

## Performance Characteristics

### Memory Usage
- **Writer State**: ~512 bytes
- **Previous Frame**: width × height × 1 byte (for delta encoding)
- **Working Buffer**: width × height × 4 bytes (temporary)
- **Total**: ~5 × width × height bytes

### Speed
- **Single Frame**: Milliseconds for typical sizes (256×256)
- **Animation**: Real-time capable for moderate resolutions
- **Bottleneck**: Color quantization (K-D tree build)

### File Size
- **No Optimization**: Larger than tools like gifsicle
- **Delta Encoding**: Helps with animations
- **Recommendation**: Post-process with gifsicle for production use

## Integration Patterns

### With Game Engines

```cpp
// Capture framebuffer each frame
void CaptureFrame(GifWriter* gif) {
    std::vector<uint8_t> pixels(screenWidth * screenHeight * 4);

    // Read framebuffer
    glReadPixels(0, 0, screenWidth, screenHeight,
                 GL_RGBA, GL_UNSIGNED_BYTE, pixels.data());

    // Write to GIF (vertical flip handled by GIF_FLIP_VERT)
    GifWriteFrame(gif, pixels.data(), screenWidth, screenHeight, 4);
}
```

### With Image Processing

```cpp
#include "gif.h"
#include <opencv2/opencv.hpp>

void SaveAnimation(const std::vector<cv::Mat>& frames,
                   const std::string& filename) {
    GifWriter g;
    int width = frames[0].cols;
    int height = frames[0].rows;

    GifBegin(&g, filename.c_str(), width, height, 10, 8, true);

    for (const auto& frame : frames) {
        std::vector<uint8_t> rgba(width * height * 4);
        cv::cvtColor(frame, rgba, cv::COLOR_BGR2RGBA);
        GifWriteFrame(&g, rgba.data(), width, height, 10, 8, true);
    }

    GifEnd(&g);
}
```

### With Custom Renderers

```cpp
class GifRecorder {
    GifWriter gif;
    bool recording;

public:
    void StartRecording(const char* filename, int w, int h) {
        GifBegin(&gif, filename, w, h, 4, 8, true);
        recording = true;
    }

    void RecordFrame(const uint8_t* pixels, int w, int h) {
        if (recording) {
            GifWriteFrame(&gif, pixels, w, h, 4, 8, true);
        }
    }

    void StopRecording() {
        if (recording) {
            GifEnd(&gif);
            recording = false;
        }
    }
};
```

## Related Projects in Collection

### Complementary Tools

1. **gifsicle**: Optimize gif-h output
   ```bash
   # Generate with gif-h
   ./my_program  # Creates output.gif

   # Optimize with gifsicle
   gifsicle -O3 --colors 128 output.gif -o final.gif
   ```

2. **gifcurry**: Different use case (video conversion vs. programmatic generation)

### Workflow Patterns

```bash
# Pattern 1: Generate → Optimize
./gif_h_program          # Uses gif-h library
gifsicle -O3 output.gif -o optimized.gif

# Pattern 2: Programmatic animation
./animated_generator     # Create complex animations
gifsicle -O3 --lossy=80 animation.gif -o final.gif

# Pattern 3: Batch generation
for i in {1..10}; do
    ./generator $i       # Each uses gif-h
    gifsicle -O3 "output_$i.gif" -o "final_$i.gif"
done
```

## Limitations

### By Design
- **No Optimization**: Files larger than specialized tools
- **RGBA8 Only**: No other input formats supported
- **Basic Implementation**: Not production-optimized
- **No Reading**: Encoding only, no GIF reading/parsing

### Performance
- Slower than tools like gifsicle or ImageMagick
- Higher memory usage than streaming implementations
- No multi-threading support

### Use Cases
- ✅ Quick integration for small projects
- ✅ Demos and prototypes
- ✅ Educational purposes
- ✅ Embedded systems (small footprint)
- ❌ Production web applications (use gifsicle)
- ❌ High-performance video encoding
- ❌ Large-scale batch processing

## Best Practices

### File Size Management
1. Use moderate bit depth (6-7 for most use cases)
2. Enable dithering for smooth gradients
3. Post-process with gifsicle for optimization
4. Keep frame counts reasonable (<100 frames)

### Quality Optimization
1. Use bitDepth=8 for photographic content
2. Enable dithering for gradients
3. Avoid very low bit depths (<4) unless necessary
4. Test different dithering settings

### Performance Optimization
1. Reuse GifWriter across animations
2. Pre-allocate pixel buffers
3. Minimize color palette changes between frames
4. Use custom memory allocators for control

### Integration Guidelines
1. Include gif.h once per compilation unit
2. Use custom memory hooks for memory control
3. Wrap in namespace for C++ projects
4. Post-process with gifsicle for production

## Troubleshooting

### Compilation Errors

```bash
# C99 required for bool type
gcc -std=c99 program.c

# C++11 for nullptr
g++ -std=c++11 program.cpp
```

### Runtime Issues

**Large file sizes**
- Normal for gif-h (no optimization)
- Solution: Post-process with gifsicle

**Color banding**
- Enable dithering: `dither = true`
- Increase bit depth if possible

**Memory issues**
- Implement custom allocators with GIF_MALLOC
- Process frames in batches for large animations

## Documentation Links

- **Repository**: https://github.com/charlietangora/gif-h
- **Demo**: See `gif-h-demo.cpp` in repository
- **License**: Public Domain (UNLICENSE)

## Project Status

- ✅ **Complete**: Stable, feature-complete implementation
- ✅ **Public Domain**: Free for any use
- ✅ **Zero Dependencies**: Easy integration
- ⚠️ **Minimal Maintenance**: Stable but not actively developed
- ✅ **Production Ready**: For appropriate use cases

## License

Public Domain (UNLICENSE)
See LICENSE file in repository root

## Quick Start Checklist

- [ ] Download `gif.h` to your project
- [ ] Include `#include "gif.h"` in your source
- [ ] Create RGBA8 pixel buffer
- [ ] Call GifBegin(), GifWriteFrame(), GifEnd()
- [ ] Compile with C99/C++11 or later
- [ ] Optional: Optimize output with gifsicle
