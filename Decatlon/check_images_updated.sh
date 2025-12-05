#!/bin/bash

echo "========================================"
echo "IMAGE STATUS CHECK"
echo "========================================"
echo ""

cd /home/madjou/Documents/Decatlon/images/

images=(
    "muscle-burpees.jpg"
    "Jump_Rope.gif"
    "mountain_climber.gif"
    "high_knee.jpeg"
    "pompe.gif"
    "squat.gif"
    "planche.gif"
    "dips.gif"
    "course.gif"
    "jumping_jack.gif"
    "sprint_intervals.gif"
    "velo.gif"
    "yoga.jpeg"
    "ischio-jambiers.jpeg"
    "pigeon_pose.gift"
    "cat-cow-stretch.jpeg"
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
    echo "🎉 ALL IMAGES READY! Your app will show animated GIFs and images."
else
    echo "⚠️  Add the missing images."
    echo "📍 Location: /home/madjou/Documents/Decatlon/images/"
fi
