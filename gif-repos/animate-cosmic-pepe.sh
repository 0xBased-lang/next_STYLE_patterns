#!/bin/bash
# Animate Cosmic Purple Pepe - Complete Workflow
set -e

echo "🌌 COSMIC PURPLE PEPE ANIMATOR"
echo "══════════════════════════════════════════════════════════════"
echo ""

IMAGE_PATH="/Users/seman/Desktop/gif-repos/cosmic-purple-pepe.png"
CHARACTER_DIR="/Users/seman/Desktop/gif-repos/AnimatedDrawings/cosmic_pepe_character"
MOTION="${1:-zombie}"  # Default to walking

cd /Users/seman/Desktop/gif-repos/AnimatedDrawings

# Check if image exists
if [ ! -f "$IMAGE_PATH" ]; then
    echo "❌ Please save your cosmic purple Pepe image to:"
    echo "   $IMAGE_PATH"
    echo ""
    echo "You can drag the image from the conversation to your Desktop,"
    echo "then move it to: /Users/seman/Desktop/gif-repos/"
    echo "and rename it to: cosmic-purple-pepe.png"
    exit 1
fi

echo "✅ Found cosmic purple Pepe image!"
echo ""

# Check if already annotated
if [ ! -d "$CHARACTER_DIR" ]; then
    echo "📋 STEP 1: Annotate Character Joints (5 minutes, one-time!)"
    echo "═══════════════════════════════════════════════════════════"
    echo ""
    echo "An interactive window will open. Click to mark these points:"
    echo "  1. Head (top of purple head)"
    echo "  2. Neck (where head meets body)"
    echo "  3. Left Shoulder"
    echo "  4. Left Elbow"
    echo "  5. Left Hand"
    echo "  6. Right Shoulder"
    echo "  7. Right Elbow"
    echo "  8. Right Hand"
    echo "  9. Hip (center of body)"
    echo " 10. Left Hip"
    echo " 11. Left Knee"
    echo " 12. Left Foot"
    echo " 13. Right Hip"
    echo " 14. Right Knee"
    echo " 15. Right Foot"
    echo ""
    echo "Press ENTER to start annotation..."
    read
    
    echo "🎯 Opening annotation tool..."
    ~/miniconda3/envs/animated_drawings/bin/python examples/image_to_annotations.py \
        "$IMAGE_PATH" \
        "$CHARACTER_DIR"
    
    if [ $? -ne 0 ]; then
        echo "❌ Annotation failed. Please try again."
        exit 1
    fi
    
    echo ""
    echo "✅ Character annotated successfully!"
    echo ""
else
    echo "✅ Character already annotated (using existing setup)"
    echo ""
fi

# Create animation config
echo "📐 STEP 2: Creating Animation Configuration"
echo "═══════════════════════════════════════════════════════════"
OUTPUT_GIF="./cosmic_pepe_${MOTION}.gif"

cat > cosmic_pepe_temp.yaml << YAML
scene:
  ANIMATED_CHARACTERS:
    - character_cfg: $CHARACTER_DIR/char_cfg.yaml
      motion_cfg: examples/config/motion/${MOTION}.yaml
      retarget_cfg: examples/config/retarget/fair1_ppf.yaml
controller:
  MODE: video_render
  OUTPUT_VIDEO_PATH: $OUTPUT_GIF
YAML

echo "✅ Configuration created for: $MOTION motion"
echo ""

# Generate animation
echo "🎬 STEP 3: Generating Animation (10-30 seconds)"
echo "═══════════════════════════════════════════════════════════"
~/miniconda3/envs/animated_drawings/bin/python << 'EOF'
from animated_drawings import render
render.start('./cosmic_pepe_temp.yaml')
EOF

echo ""
echo "══════════════════════════════════════════════════════════════"
echo "✨ SUCCESS! Your Cosmic Purple Pepe is animated!"
echo "══════════════════════════════════════════════════════════════"
echo ""

if [ -f "$OUTPUT_GIF" ]; then
    SIZE=$(ls -lh "$OUTPUT_GIF" | awk '{print $5}')
    echo "📁 Output: $OUTPUT_GIF"
    echo "📊 Size: $SIZE"
    echo ""
    
    echo "🎯 Opening animation..."
    open "$OUTPUT_GIF"
    echo ""
    
    echo "🎨 NEXT STEPS:"
    echo "─────────────────────────────────────────────────────────"
    echo ""
    echo "1️⃣  Try different motions:"
    echo "   bash animate-cosmic-pepe.sh jumping"
    echo "   bash animate-cosmic-pepe.sh wave_hello"
    echo "   bash animate-cosmic-pepe.sh dab"
    echo "   bash animate-cosmic-pepe.sh jesse_dance"
    echo ""
    echo "2️⃣  Add glitch effect:"
    echo "   cd ../gif-generator"
    echo "   ./gif-gen create creative-effects/glitch-effect \\"
    echo "     --video ../AnimatedDrawings/$OUTPUT_GIF \\"
    echo "     --output ~/Desktop/cosmic_pepe_glitchy.gif"
    echo ""
    echo "3️⃣  Add VHS retro effect:"
    echo "   cd ../gif-generator"
    echo "   ./gif-gen create creative-effects/retro-vhs \\"
    echo "     --video ../AnimatedDrawings/$OUTPUT_GIF \\"
    echo "     --output ~/Desktop/cosmic_pepe_retro.gif"
    echo ""
fi

# Cleanup
rm -f cosmic_pepe_temp.yaml

echo "🎉 All done! Enjoy your animated cosmic purple Pepe! 🐸✨"
