# Product Requirements & Technical Specification Document
## Project: Aishu & Sai's Wanderlust Journeys

---

## 1. Executive Summary & Goals

### 1.1 Overview
"Aishu & Sai's Wanderlust Journeys" is an interactive, highly visual travel journal web application hosted on **Vercel**. It brings to life a whimsical, vintage scrapbook/postcard page inspired directly by the design prototype image.

### 1.2 Key Objectives
* **Aesthetic Focus:** Replicate a physical scrapbook featuring perforated postage-stamp borders, curved ribbon banners, pastel watercolor gradients, and travel doodles (airplanes, passports, globes, cameras).
* **Interactive Grid:** Display a 3×3 gallery grid (maximum 9 items per view) with smooth arrow pagination to prevent overcrowding.
* **Smart Modals & Slideshow:** Provide seasonal sub-views for multi-season trips (Alaska, Florida) and a lightbox slideshow viewer with manual controls.
* **Maintainability:** Fully data-driven architecture using a single `destinations.json` file.

---

## 2. Aesthetic & Visual Specifications

### 2.1 Color Palette & Background
* **Background Gradient:** Soft pastel watercolor mix:
  `linear-gradient(135deg, #fceade 0%, #e8f5e9 35%, #e1f5fe 70%, #fff9c4 100%)`
* **Card Backings:** Warm parchment cream (`#ffffff` / `#faf6ee`) with subtle paper box-shadows (`0 8px 16px rgba(0, 0, 0, 0.12)`).

### 2.2 Typography
* **Headers & Banners:** Whimsical handwritten style (Google Fonts: `Caveat`, `Patrick Hand`, or `Architects Daughter`).
* **Captions & Dates:** Rounded sans-serif display font (Google Fonts: `Quicksand` or `Comfortaa`).

### 2.3 Page Layout & Inscriptions
* **Top Header:** Curved ribbon banner reading **"AISHU & SAI'S WANDERLUST JOURNEYS"**.
* **Left Inscriptions:**
  * *"OUR GREATEST ADVENTURE IS LOVING EACH OTHER."*
  * *"TWO HEARTS, ONE WORLD."*
* **Right Inscriptions:**
  * *"EXPLORING THE WORLD, TOGETHER."*
  * *"OUR JOURNEY, OUR STORY."*
* **Bottom Ribbon:** **"COLLECTING MOMENTS ONE MILE AT A TIME"**.
* **Doodles:** SVG/PNG graphics of vintage suitcases, passports, globes, cameras, paper airplanes with flight paths, and postage cancellation marks framing the grid.

---

## 3. Grid Layout, Order & Pagination Rules

### 3.1 Item Display Capacity & Order
The grid enforces a **3 columns × 3 rows (9 items max)** layout. Destinations strictly follow this sequence:

#### Page 1 (Initial Grid View):
1. **Alaska** (Aug 2024 / Feb 2026)
2. **Washington** (Sep 2026)
3. **Maine** (Aug 2025)
4. **New Hampshire** (Jun 2026)
5. **Florida** (Dec 2023 / Mar 2025)
6. **Nevada** (June 2024)
7. **Arizona** (June 2024)
8. **New York** (June 2025)
9. **Virginia** (May 2026)

#### Page 2 (Revealed via Right Arrow):
10. **Washington DC** (Oct 2025) *(and any future locations added to JSON)*

### 3.2 Pagination Controls
* A prominent **Right Arrow (`>`)** button on the right edge transitions smoothly to Page 2.
* A corresponding **Left Arrow (`<`)** button appears on Page 2 to return to Page 1.

---

## 4. Stamp Card Styling

Every destination card in the grid must replicate a vintage postage stamp:
* **Perforated Border:** Created using CSS mask/clip-path or white padded borders with radial cutouts.
* **Card Content:**
  * Destination thumbnail image.
  * Place name in handwritten font overlay.
  * Date badge displaying the specified month and year (e.g., "AUG 2024", "SEP 2026").
  * Decorative corner stickers (mini hearts, compasses, or airplanes).

```css
.stamp-card {
  position: relative;
  border: 10px solid #ffffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  background-color: #ffffff;
  overflow: hidden;
}

.stamp-perforated {
  background: radial-gradient(circle, transparent, transparent 50%, #ffffff 50%, #ffffff 100%);
  background-size: 12px 12px;
}
```

---

## 5. User Interaction Workflows & State Machine

```text
                        [ User Clicks Stamp Card ]
                                    |
                          Is hasSeasons true?
                                 /     \
                               YES     NO
                               /         \
              [ Open Season Modal ]   [ Open Slideshow Lightbox ]
                        |                          |
              User Selects Season                  |
                        |                          |
                        +------------>-------------+
                                     |
                          [ Slideshow Active ]
                          - Prev/Next controls
                          - Image counter
                          - Close button (X)
```

### Flow 1: Clicking a Stamp
* **For Multi-Season Destinations (Alaska, Florida):**
  * Opens a **Centered Popup Modal** styled like an open postcard or vintage frame.
  * Displays two seasonal cards side-by-side with date labels:
    * *Alaska:* Fall (Aug 2024) vs. Winter (Feb 2026)
    * *Florida:* Winter (Dec 2023) vs. Spring (Mar 2025)
  * Clicking either season opens the Slideshow Lightbox for that season.
* **For Single-Season Destinations (All others):**
  * Opens the **Slideshow Lightbox** directly.

### Flow 2: Slideshow Lightbox
* Displays full-screen/overlay images with manual `<` (Previous) and `>` (Next) buttons.
* Displays image index counter (e.g., "Photo 1 of 3").
* Includes a Close (`X`) button returning the user to the previous state.

---

## 6. Directory Structure & Asset Standard

### 6.1 Directory Map
```text
wanderlust-journeys/
├── public/
│   ├── images/
│   │   ├── Alaska_thumbnail.jpg
│   │   ├── Alaska_fall_1.jpg
│   │   ├── Alaska_winter_1.jpg
│   │   ├── Washington_thumbnail.jpg
│   │   ├── Washington_1.jpg
│   │   ├── Maine_thumbnail.jpg
│   │   ├── Maine_1.jpg
│   │   ├── NewHampshire_thumbnail.jpg
│   │   ├── NewHampshire_1.jpg
│   │   ├── Florida_thumbnail.jpg
│   │   ├── Florida_winter_1.jpg
│   │   ├── Florida_spring_1.jpg
│   │   ├── Nevada_thumbnail.jpg
│   │   ├── Nevada_1.jpg
│   │   ├── Arizona_thumbnail.jpg
│   │   ├── Arizona_1.jpg
│   │   ├── NewYork_thumbnail.jpg
│   │   ├── NewYork_1.jpg
│   │   ├── Virginia_thumbnail.jpg
│   │   ├── Virginia_1.jpg
│   │   ├── WashingtonDC_thumbnail.jpg
│   │   └── WashingtonDC_1.jpg
├── src/
│   ├── components/
│   │   ├── HeaderBanner.jsx
│   │   ├── SideQuotes.jsx
│   │   ├── StampGrid.jsx
│   │   ├── StampCard.jsx
│   │   ├── SeasonModal.jsx
│   │   └── SlideshowModal.jsx
│   ├── data/
│   │   └── destinations.json
│   ├── styles/
│   │   └── globals.css
│   └── pages/ or app/
│       └── index.jsx
├── package.json
└── tailwind.config.js
```

### 6.2 Asset Naming Standard
* **Thumbnails:** `<Place>_thumbnail.jpg`
* **Single-Season Destinations:** `<Place>_<number>.jpg`
* **Multi-Season Destinations:** `<Place>_<season>_<number>.jpg`

---

## 7. Complete Data Schema (`src/data/destinations.json`)

```json
[
  {
    "id": "alaska",
    "name": "Alaska",
    "thumbnail": "/images/Alaska_thumbnail.jpg",
    "hasSeasons": true,
    "seasons": [
      {
        "seasonName": "Fall",
        "date": "Aug 2024",
        "thumbnail": "/images/Alaska_fall_1.jpg",
        "images": [
          "/images/Alaska_fall_1.jpg"
        ]
      },
      {
        "seasonName": "Winter",
        "date": "Feb 2026",
        "thumbnail": "/images/Alaska_winter_1.jpg",
        "images": [
          "/images/Alaska_winter_1.jpg"
        ]
      }
    ]
  },
  {
    "id": "washington",
    "name": "Washington",
    "date": "Sep 2026",
    "hasSeasons": false,
    "thumbnail": "/images/Washington_thumbnail.jpg",
    "images": [
      "/images/Washington_1.jpg"
    ]
  },
  {
    "id": "maine",
    "name": "Maine",
    "date": "Aug 2025",
    "hasSeasons": false,
    "thumbnail": "/images/Maine_thumbnail.jpg",
    "images": [
      "/images/Maine_1.jpg"
    ]
  },
  {
    "id": "new_hampshire",
    "name": "New Hampshire",
    "date": "Jun 2026",
    "hasSeasons": false,
    "thumbnail": "/images/NewHampshire_thumbnail.jpg",
    "images": [
      "/images/NewHampshire_1.jpg"
    ]
  },
  {
    "id": "florida",
    "name": "Florida",
    "thumbnail": "/images/Florida_thumbnail.jpg",
    "hasSeasons": true,
    "seasons": [
      {
        "seasonName": "Winter",
        "date": "Dec 2023",
        "thumbnail": "/images/Florida_winter_1.jpg",
        "images": [
          "/images/Florida_winter_1.jpg"
        ]
      },
      {
        "seasonName": "Spring",
        "date": "Mar 2025",
        "thumbnail": "/images/Florida_spring_1.jpg",
        "images": [
          "/images/Florida_spring_1.jpg"
        ]
      }
    ]
  },
  {
    "id": "nevada",
    "name": "Nevada",
    "date": "June 2024",
    "hasSeasons": false,
    "thumbnail": "/images/Nevada_thumbnail.jpg",
    "images": [
      "/images/Nevada_1.jpg"
    ]
  },
  {
    "id": "arizona",
    "name": "Arizona",
    "date": "June 2024",
    "hasSeasons": false,
    "thumbnail": "/images/Arizona_thumbnail.jpg",
    "images": [
      "/images/Arizona_1.jpg"
    ]
  },
  {
    "id": "new_york",
    "name": "New York",
    "date": "June 2025",
    "hasSeasons": false,
    "thumbnail": "/images/NewYork_thumbnail.jpg",
    "images": [
      "/images/NewYork_1.jpg"
    ]
  },
  {
    "id": "virginia",
    "name": "Virginia",
    "date": "May 2026",
    "hasSeasons": false,
    "thumbnail": "/images/Virginia_thumbnail.jpg",
    "images": [
      "/images/Virginia_1.jpg"
    ]
  },
  {
    "id": "washington_dc",
    "name": "Washington DC",
    "date": "Oct 2025",
    "hasSeasons": false,
    "thumbnail": "/images/WashingtonDC_thumbnail.jpg",
    "images": [
      "/images/WashingtonDC_1.jpg"
    ]
  }
]
```

---

## 8. Coding Agent Prompt Instructions

When passing this document to your AI coding agent (Cursor, v0, Bolt, or Windsurf), use this prompt:

> *"Build a Next.js/React web application styled with Tailwind CSS according to this complete PRD specification. Replicate the vintage travel journal/scrapbook aesthetic from the spec: pastel watercolor background, ribbon banner header, and postage stamp cards with date badges. Implement the 3x3 grid pagination showing 9 items on Page 1 and Washington DC on Page 2 via arrow buttons. Build the two-stage modal system (seasonal selection popup for Alaska & Florida; lightbox slideshow viewer with manual previous/next controls for all destinations). Drive all content dynamically using `src/data/destinations.json`."*