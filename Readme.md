# 💒 Jagruti Weds Ankit — Wedding Invitation Website

A beautiful, fully responsive Indian wedding invitation website.  
**Live date:** Tuesday, 5 May 2026 · 7:00 PM

---

## 📁 Folder Structure

```
wedding-invite/
├── index.html          ← Main HTML (all sections)
├── style.css           ← All styles (variables, animations, responsive)
├── script.js           ← JS: loader, language toggle, petals, countdown, music
├── images/
│   ├── ganesh.png      ← Replace with your Ganesh image
│   ├── bride.jpg       ← Replace with bride photo
│   └── groom.jpg       ← Replace with groom photo
├── audio/
│   └── wedding-music.mp3  ← Add background music file here
└── README.md
```

---

## 🚀 Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `jagruti-weds-ankit`)
2. Upload all files maintaining the folder structure above
3. Go to **Settings → Pages → Source → main branch / root**
4. Your site will be live at `https://yourusername.github.io/jagruti-weds-ankit/`

---

## ✏️ Customisation Guide

### Replace Images
- Drop your files into the `images/` folder with matching names
- Or update `src` attributes in `index.html`

### Change Names / Dates
- Search `index.html` for `data-hi` and `data-en` attributes to update text
- Countdown target date is in `script.js` line ~90: `WEDDING_DATE`

### Add Music
- Place your MP3 at `audio/wedding-music.mp3`
- Update `MUSIC_SRC` constant in `script.js` if using a different path

### Change Colors
- Edit CSS variables at the top of `style.css` (`:root { }` block)

---

## ✨ Features

- 🌸 Floating flower petals animation  
- 🔁 Hindi ↔ English language toggle  
- ⏳ Live countdown to wedding date  
- 🎵 Background music play/pause  
- 📱 Fully mobile responsive  
- 🎞️ Scroll reveal animations  
- 🖼️ Gallery with 3D tilt hover  
- 🗺️ Google Maps venue button  
- 💫 Loading screen with progress bar