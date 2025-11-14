#!/bin/bash
# Animate Pepe Character - Easy Script
# 100% FREE Animation System

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo "╔══════════════════════════════════════════════════════════════════════════╗"
echo "║          🎮 Animate Pepe 'GAME OVER' Character                           ║"
echo "║                    100% FREE System                                      ║"
echo "╚══════════════════════════════════════════════════════════════════════════╝"
echo ""

# Check if image provided
if [ -z "$1" ]; then
    echo -e "${YELLOW}Usage:${NC}"
    echo "  $0 /path/to/pepe-image.png [motion]"
    echo ""
    echo -e "${CYAN}Available motions:${NC}"
    echo "  zombie      - Walking animation (default)"
    echo "  jumping     - Jumping animation"
    echo "  wave_hello  - Waving hand animation"
    echo "  dab         - Dab pose animation"
    echo "  jesse_dance - Dance animation"
    echo ""
    echo -e "${CYAN}Examples:${NC}"
    echo "  $0 ~/Desktop/pepe.png"
    echo "  $0 ~/Desktop/pepe.png jumping"
    echo ""
    exit 1
fi

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

IMAGE_PATH="$1"
MOTION="${2:-zombie}"  # Default to walking (zombie)
CHARACTER_DIR="$SCRIPT_DIR/AnimatedDrawings/pepe_character"
OUTPUT_GIF="$SCRIPT_DIR/AnimatedDrawings/pepe_animated.gif"

echo -e "${BLUE}Configuration:${NC}"
echo "  Image: $IMAGE_PATH"
echo "  Motion: $MOTION"
echo "  Output: $OUTPUT_GIF"
echo ""

# Check if image exists
if [ ! -f "$IMAGE_PATH" ]; then
    echo -e "${YELLOW}⚠ Error: Image not found: $IMAGE_PATH${NC}"
    echo ""
    echo "Please save your Pepe image and provide the correct path."
    exit 1
fi

cd "$SCRIPT_DIR/AnimatedDrawings"

# Check if character already annotated
if [ ! -d "$CHARACTER_DIR" ]; then
    echo -e "${YELLOW}📋 First time setup: Need to annotate character joints${NC}"
    echo ""
    echo "This will open an interactive window."
    echo "Click to mark: head, torso, shoulders, elbows, hands, hips, knees, feet"
    echo ""
    echo "Press ENTER to continue..."
    read

    echo -e "${CYAN}🎯 Opening annotation tool...${NC}"
    ~/miniconda3/envs/animated_drawings/bin/python examples/image_to_annotations.py \
        "$IMAGE_PATH" \
        "$CHARACTER_DIR"

    echo -e "${GREEN}✅ Character annotated!${NC}"
    echo ""
fi

# Create animation config
echo -e "${CYAN}⚙️  Creating animation configuration...${NC}"
cat > pepe_temp_config.yaml << YAML
scene:
  ANIMATED_CHARACTERS:
    - character_cfg: $CHARACTER_DIR/char_cfg.yaml
      motion_cfg: examples/config/motion/${MOTION}.yaml
      retarget_cfg: examples/config/retarget/fair1_ppf.yaml
controller:
  MODE: video_render
  OUTPUT_VIDEO_PATH: $OUTPUT_GIF
YAML

echo -e "${GREEN}✅ Configuration created${NC}"
echo ""

# Generate animation
echo -e "${CYAN}🎬 Generating animation...${NC}"
echo "   This will take 10-30 seconds..."
echo ""

~/miniconda3/envs/animated_drawings/bin/python << 'EOF'
from animated_drawings import render
render.start('./pepe_temp_config.yaml')
EOF

echo ""
echo -e "${GREEN}✅ Animation complete!${NC}"
echo ""

# Check output
if [ -f "$OUTPUT_GIF" ]; then
    SIZE=$(ls -lh "$OUTPUT_GIF" | awk '{print $5}')
    echo "╔══════════════════════════════════════════════════════════════════════════╗"
    echo "║                        ✨ SUCCESS! ✨                                     ║"
    echo "╚══════════════════════════════════════════════════════════════════════════╝"
    echo ""
    echo -e "${GREEN}Animated GIF created:${NC}"
    echo "  Location: $OUTPUT_GIF"
    echo "  Size: $SIZE"
    echo ""
    echo -e "${CYAN}Next steps:${NC}"
    echo ""
    echo -e "${YELLOW}1. View your animation:${NC}"
    echo "   open $OUTPUT_GIF"
    echo ""
    echo -e "${YELLOW}2. Add glitch effect:${NC}"
    echo "   cd $SCRIPT_DIR/gif-generator"
    echo "   ./gif-gen create creative-effects/glitch-effect \\"
    echo "     --video $OUTPUT_GIF \\"
    echo "     --output ~/Desktop/pepe_glitchy.gif"
    echo ""
    echo -e "${YELLOW}3. Try different motions:${NC}"
    echo "   $0 $IMAGE_PATH jumping"
    echo "   $0 $IMAGE_PATH wave_hello"
    echo "   $0 $IMAGE_PATH dab"
    echo ""
    echo -e "${YELLOW}4. Optimize final GIF:${NC}"
    echo "   gifsicle -O3 $OUTPUT_GIF -o ~/Desktop/pepe_final.gif"
    echo ""

    # Offer to open
    echo -e "${CYAN}Would you like to open the GIF now? (y/n)${NC}"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        open "$OUTPUT_GIF"
    fi
else
    echo -e "${YELLOW}⚠ Warning: Output file not created${NC}"
    echo "Check for errors above."
fi

# Cleanup temp config
rm -f pepe_temp_config.yaml

echo ""
echo "═══════════════════════════════════════════════════════════════════════════"
echo "🎉 Done! Your Pepe is animated!"
echo "═══════════════════════════════════════════════════════════════════════════"
