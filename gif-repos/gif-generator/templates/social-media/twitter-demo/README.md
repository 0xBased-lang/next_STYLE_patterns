# Twitter Product Demo Template

Generate optimized 5-second product demo GIFs for Twitter.

## Features

- ✅ Automatically optimized for Twitter (<5MB)
- ✅ Customizable text overlay
- ✅ Three quality presets (quick/balanced/quality)
- ✅ 5-second duration (Twitter optimal)
- ✅ 600px width (Twitter recommended)

## Usage

### Basic

```bash
python -m generator.cli create social-media/twitter-demo \
  --video path/to/demo.mp4 \
  --output demo.gif
```

### With Custom Text

```bash
python -m generator.cli create social-media/twitter-demo \
  --video demo.mp4 \
  --var product_name="Amazing Product" \
  --output twitter-demo.gif
```

### With Preset

```bash
# Quick (smallest file, fastest)
python -m generator.cli create social-media/twitter-demo \
  --video demo.mp4 \
  --preset quick \
  --output demo-quick.gif

# Quality (best quality, larger file)
python -m generator.cli create social-media/twitter-demo \
  --video demo.mp4 \
  --preset quality \
  --output demo-quality.gif
```

## Presets

| Preset | FPS | Colors | Lossy | File Size | Quality | Speed |
|--------|-----|--------|-------|-----------|---------|-------|
| **quick** | 10 | 64 | 100 | Smallest | Good | Fastest |
| **balanced** (default) | 15 | 128 | 80 | Medium | Better | Fast |
| **quality** | 20 | 256 | 40 | Larger | Best | Slower |

## Requirements

- Input video (any format)
- gifcurry_cli installed
- gifsicle installed

## Output

- Format: GIF
- Duration: 5 seconds (max 5.5s)
- Size: <5MB (Twitter limit)
- Width: 600px (recommended for Twitter)
- FPS: 15 (balanced preset)

## Examples

See `examples/` directory for sample inputs and outputs.

## Tips

1. **File size too large?** Use `--preset quick`
2. **Want better quality?** Use `--preset quality`
3. **Custom duration?** Edit template.yaml `end_time`
4. **Different text position?** Edit `text_overlay.position` in template
