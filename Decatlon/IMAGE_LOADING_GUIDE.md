# 📸 Image Loading Guide - Complete Reference

## 🎯 Where Images Are Loaded in the Code

### Location 1: Exercise Database (Lines 9-90 in script.js)

```javascript
const EXERCISE_DATABASE = {
    'burpees': {
        image: 'muscle-burpees.jpg',  // ← IMAGE FILENAME HERE
        productLink: '...',
        productName: '...'
    },
    // ... more exercises
}
```

**This is where you define which image file to use for each exercise.**

---

### Location 2: Image Loading in HTML (Line 407 in script.js)

```javascript
function createExerciseCard(exercise, index) {
    card.innerHTML = `
        <div class="exercise-image">
            <img src="images/${exercise.image}"     ← LOADS FROM /images/ FOLDER
                 alt="${exercise.name}"
                 onerror="this.parentElement.innerHTML='<span>💪</span>'">
                          ↑ FALLBACK EMOJI IF IMAGE NOT FOUND
        </div>
    `;
}
```

**This is where the image is actually loaded into the HTML.**

---

## 📂 Folder Structure - EXACT Locations

```
Decatlon/
├── index.html
├── script.js
├── styles.css
├── config.js
└── images/                           ← CREATE THIS FOLDER
    ├── muscle-burpees.jpg            ← PLACE IMAGES HERE
    ├── jump-rope.jpg
    ├── mountain-climbers.png
    ├── high-knees.png
    ├── pompes.png
    ├── squats.png
    ├── planche.png
    ├── dips.png
    ├── course-a-pied.png
    ├── jumping-jacks.png
    ├── sprint-intervals.png
    ├── velo.png
    ├── yoga.png
    ├── etirements-jambes.png
    ├── pigeon-pose.png
    ├── cat-cow-stretch.png
    └── products/                     ← OPTIONAL SUBFOLDER
        └── (product images here)
```

---

## 🔍 Image Loading Flow - Step by Step

### Step 1: User completes QCM
```
User selects: "Perte de poids" (weight loss)
```

### Step 2: AI generates exercise
```javascript
AI returns: {
    name: "Burpees complets",
    description: "...",
    // ...
}
```

### Step 3: Name matching (Lines 427-507)
```javascript
matchExerciseName("Burpees complets")
    ↓
Returns: 'burpees'  // matched key
```

### Step 4: Get exercise data (Lines 509-528)
```javascript
getExerciseData('burpees')
    ↓
Looks up EXERCISE_DATABASE['burpees']
    ↓
Returns: {
    image: 'muscle-burpees.jpg',  // ← THIS FILENAME
    productLink: '...',
    productName: '...'
}
```

### Step 5: Create card with image (Line 407)
```javascript
<img src="images/muscle-burpees.jpg" ...>
         ↑         ↑
      folder    filename from database
```

### Step 6: Browser loads image
```
Browser requests: /images/muscle-burpees.jpg
                   ↑
              Relative to index.html location
```

---

## 📝 Your Current Image Filenames (from script.js)

Based on your code, here are the **EXACT** filenames you need:

| Exercise Key | Image Filename | Format |
|-------------|----------------|--------|
| burpees | **muscle-burpees.jpg** | JPG |
| jump rope | **jump-rope.jpg** | JPG |
| mountain climbers | **mountain-climbers.png** | PNG |
| high knees | **high-knees.png** | PNG |
| pompes | **pompes.png** | PNG |
| squats | **squats.png** | PNG |
| planche | **planche.png** | PNG |
| dips | **dips.png** | PNG |
| course à pied | **course-a-pied.png** | PNG |
| jumping jacks | **jumping-jacks.png** | PNG |
| sprint intervals | **sprint-intervals.png** | PNG |
| vélo | **velo.png** | PNG |
| yoga | **yoga.png** | PNG |
| étirements jambes | **etirements-jambes.png** | PNG |
| pigeon pose | **pigeon-pose.png** | PNG |
| cat-cow stretch | **cat-cow-stretch.png** | PNG |

---

## 🛠️ How to Add Images - Step by Step

### Method 1: Create the folder and add images

```bash
# In your Decatlon folder, create the images directory
mkdir images

# Place your images in the images folder with the exact names above
# For example:
cp ~/Downloads/burpees.jpg images/muscle-burpees.jpg
cp ~/Downloads/squats.png images/squats.png
# etc...
```

### Method 2: Via File Explorer (Windows/Mac/Linux)

1. **Navigate to your Decatlon folder**
   - Location: `/home/madjou/Documents/Decatlon/`

2. **Create new folder called `images`**
   - Right-click → New Folder → Name it `images`

3. **Copy your image files into the `images` folder**
   - Make sure filenames match EXACTLY (case-sensitive!)

4. **Verify the structure:**
   ```
   Decatlon/
   ├── index.html
   └── images/
       ├── muscle-burpees.jpg
       ├── jump-rope.jpg
       └── ... (other images)
   ```

---

## ✅ Testing if Images Load Correctly

### Test 1: Open Developer Console (F12)

```javascript
// In browser console, check if image exists
const img = new Image();
img.onload = () => console.log('✅ Image loaded!');
img.onerror = () => console.log('❌ Image not found!');
img.src = 'images/muscle-burpees.jpg';
```

### Test 2: Direct URL Access

Open in browser:
```
file:///home/madjou/Documents/Decatlon/images/muscle-burpees.jpg
```

If you see the image → ✅ Correctly placed
If you see 404 error → ❌ Wrong location or filename

### Test 3: Check Network Tab

1. Open DevTools (F12)
2. Go to Network tab
3. Refresh the page
4. Look for image requests
5. Check if they're loading (200 status) or failing (404 status)

---

## 🔧 Troubleshooting

### Problem 1: Images don't show, only emojis appear

**Cause:** Image files not in the correct location or wrong filenames

**Solution:**
1. Check folder exists: `/home/madjou/Documents/Decatlon/images/`
2. Check filenames match EXACTLY (including .jpg vs .png)
3. Check file permissions (should be readable)

### Problem 2: Some images load, others don't

**Cause:** Inconsistent file extensions or typos in filenames

**Solution:**
1. Verify each filename in the EXERCISE_DATABASE matches the actual file
2. Check for typos (e.g., `muscle-burpees.jpg` vs `burpees.jpg`)
3. Use correct extensions (.jpg or .png as specified)

### Problem 3: Images load locally but not when deployed

**Cause:** Case-sensitivity on server vs local machine

**Solution:**
- Use all lowercase filenames
- Use hyphens instead of spaces
- Be consistent with file extensions

---

## 🎨 Changing Image Filenames

If you want to use different filenames, edit `script.js` lines 9-90:

### Example: Change from JPG to PNG

**Before:**
```javascript
'burpees': {
    image: 'muscle-burpees.jpg',
    // ...
}
```

**After:**
```javascript
'burpees': {
    image: 'my-burpees-image.png',  // ← Change here
    // ...
}
```

Then save a file named `my-burpees-image.png` in the `/images/` folder.

---

## 📊 Image Path Resolution

### How the browser finds images:

```
HTML file location:  /home/madjou/Documents/Decatlon/index.html
                                                      ↓
Image src attribute: images/muscle-burpees.jpg
                     ↓
Resolves to:        /home/madjou/Documents/Decatlon/images/muscle-burpees.jpg
```

### Absolute vs Relative Paths:

| Type | Example | When to Use |
|------|---------|-------------|
| **Relative** | `images/burpees.jpg` | ✅ Best for local development |
| **Absolute** | `/images/burpees.jpg` | Use when deploying to web server |
| **Full URL** | `https://cdn.com/burpees.jpg` | Use for external images |

---

## 💡 Pro Tips

### Tip 1: Use both JPG and PNG
- **JPG** for photos (better compression)
- **PNG** for illustrations/graphics (transparency support)

### Tip 2: Optimize image sizes
```bash
# Recommended dimensions: 800x600px
# Recommended file size: < 200KB per image

# Use online tools:
- TinyPNG.com (for PNG)
- Squoosh.app (for JPG/PNG)
- ImageOptim (Mac)
```

### Tip 3: Batch rename files
If your images have different names, use this bash script:

```bash
# Rename all images at once
cd images/
mv myburpees.jpg muscle-burpees.jpg
mv pushups.png pompes.png
# etc...
```

### Tip 4: Fallback emoji works!
Even without images, the app shows 💪 emoji. Your app is functional right now!

---

## 🚀 Quick Setup Script

Save this as `setup_images.sh`:

```bash
#!/bin/bash

# Create images folder
mkdir -p images

echo "Images folder created at: $(pwd)/images/"
echo ""
echo "Place your images here with these names:"
echo "  - muscle-burpees.jpg"
echo "  - jump-rope.jpg"
echo "  - mountain-climbers.png"
echo "  - high-knees.png"
echo "  - pompes.png"
echo "  - squats.png"
echo "  - planche.png"
echo "  - dips.png"
echo "  - course-a-pied.png"
echo "  - jumping-jacks.png"
echo "  - sprint-intervals.png"
echo "  - velo.png"
echo "  - yoga.png"
echo "  - etirements-jambes.png"
echo "  - pigeon-pose.png"
echo "  - cat-cow-stretch.png"
```

Run with: `bash setup_images.sh`

---

## 📖 Summary

**3 Key Locations to Remember:**

1. **Define filenames:** `script.js` lines 9-90 (EXERCISE_DATABASE)
2. **Load images:** `script.js` line 407 (`<img src="images/${exercise.image}">`)
3. **Store files:** `/images/` folder (next to index.html)

**Quick Checklist:**
- ✅ Create `/images/` folder
- ✅ Add 16 image files with correct names
- ✅ Use .jpg or .png as specified
- ✅ Keep filenames lowercase with hyphens
- ✅ Test by opening index.html in browser

---

*Your images are now ready to load! 🎉*
