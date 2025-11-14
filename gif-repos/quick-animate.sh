#!/bin/bash
# Quick Start Script for Animating Characters
# Makes it easy to get started with AnimatedDrawings

set -e

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "╔══════════════════════════════════════════════════════════════════════════╗"
echo "║          🎮 Character Animation Quick Start                              ║"
echo "╚══════════════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if conda is installed
if ! command -v conda &> /dev/null; then
    echo "${YELLOW}⚠ Conda not found. Please install Miniconda first:${NC}"
    echo "  https://docs.conda.io/en/latest/miniconda.html"
    exit 1
fi

echo "${BLUE}Step 1: Setting up AnimatedDrawings environment...${NC}"
cd "$SCRIPT_DIR/AnimatedDrawings"

# Check if environment already exists
if conda env list | grep -q "animated_drawings"; then
    echo "${GREEN}✓ Environment already exists${NC}"
else
    echo "Creating conda environment..."
    conda create --name animated_drawings python=3.8.13 -y
    echo "${GREEN}✓ Environment created${NC}"
fi

echo ""
echo "${BLUE}Step 2: Activating environment and installing...${NC}"
eval "$(conda shell.bash hook)"
conda activate animated_drawings

# Check if already installed
if python -c "import animated_drawings" 2>/dev/null; then
    echo "${GREEN}✓ AnimatedDrawings already installed${NC}"
else
    echo "Installing AnimatedDrawings..."
    pip install -e . --quiet
    echo "${GREEN}✓ AnimatedDrawings installed${NC}"
fi

echo ""
echo "${BLUE}Step 3: Testing with example...${NC}"
echo "This will open an interactive window with an animated character."
echo "Press SPACEBAR to pause/unpause, ARROW KEYS to scrub, Q to quit."
echo ""
echo "Starting in 3 seconds..."
sleep 3

python << EOF
from animated_drawings import render
render.start('./examples/config/mvc/interactive_window_example.yaml')
EOF

echo ""
echo "${GREEN}✓ Test complete!${NC}"
echo ""
echo "╔══════════════════════════════════════════════════════════════════════════╗"
echo "║                    🎉 SETUP COMPLETE!                                    ║"
echo "╚══════════════════════════════════════════════════════════════════════════╝"
echo ""
echo "${BLUE}What you just saw:${NC}"
echo "  • An animated character moving with realistic motion"
echo "  • This is what YOUR character will look like!"
echo ""
echo "${BLUE}Next steps:${NC}"
echo ""
echo "1. Save your Pepe image as PNG"
echo "   • Make sure character is centered"
echo "   • Clear background works best"
echo "   • Full body visible (arms, legs)"
echo ""
echo "2. Read the complete guide:"
echo "   ${GREEN}cat $SCRIPT_DIR/gif-generator/docs/ANIMATE_CHARACTER_GUIDE.md${NC}"
echo ""
echo "3. When ready to animate your character:"
echo "   ${GREEN}conda activate animated_drawings${NC}"
echo "   ${GREEN}cd $SCRIPT_DIR/AnimatedDrawings${NC}"
echo "   ${GREEN}python examples/image_to_annotations.py /path/to/your/pepe.png${NC}"
echo ""
echo "4. After annotation, generate animation:"
echo "   ${GREEN}python -c \"from animated_drawings import render; render.start('your_config.yaml')\"${NC}"
echo ""
echo "5. Add effects with gif-generator:"
echo "   ${GREEN}cd $SCRIPT_DIR/gif-generator${NC}"
echo "   ${GREEN}./gif-gen create creative-effects/glitch-effect -i input.gif -o output.gif${NC}"
echo ""
echo "╔══════════════════════════════════════════════════════════════════════════╗"
echo "║  💡 Pro tip: Check out the pre-made motions in:                         ║"
echo "║     AnimatedDrawings/examples/config/motion/                            ║"
echo "║                                                                          ║"
echo "║  Available: walking, running, jumping, dancing, zombie, dab, and more!  ║"
echo "╚══════════════════════════════════════════════════════════════════════════╝"
echo ""
echo "${GREEN}You're ready to animate! 🎬${NC}"
