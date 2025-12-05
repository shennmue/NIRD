#!/bin/bash

echo "========================================"
echo "IMAGE STATUS CHECK"
echo "========================================"
echo ""

cd /home/madjou/Documents/Decatlon/images/

images=(
    "muscle-burpees.png"
    "jump-rope.png"
    "mountain-climbers.png"
    "high-knees.png"
    "pompes.png"
    "squats.png"
    "planche.png"
    "dips.png"
    "course-a-pied.png"
    "jumping-jacks.png"
    "sprint-intervals.png"
    "velo.png"
    "yoga.png"
    "etirements-jambes.png"
    "pigeon-pose.png"
    "cat-cow-stretch.png"
)

found=0
missing=0

for img in "${images[@]}"; do
    if [ -f "$img" ]; then
        echo "✅ $img"
        ((found++))
    else
        echo "❌ $img (MISSING)"
        ((missing++))
    fi
done

echo ""
echo "========================================"
echo "Summary: $found/16 images found"
echo "Missing: $missing images"
echo "========================================"

if [ $found -eq 16 ]; then
    echo "🎉 ALL IMAGES READY! Your app will show images instead of emojis."
else
    echo "⚠️  Add the missing images to make the app look better."
    echo "📍 Location: /home/madjou/Documents/Decatlon/images/"
fi
