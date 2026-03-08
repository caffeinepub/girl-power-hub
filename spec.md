# Girl Power Hub

## Current State
The app has 13 section categories with 100+ interactive activities, organized into a grid layout with search, sidebar navigation, and individual section views. Each section is a React component in its own file under `src/frontend/src/components/sections/`.

## Requested Changes (Diff)

### Add
- A new section category: **"Make Bike Riding Fun"** (emoji: 🚲) with 6 activities:
  1. **Fun Things to Do on Your Bike** – A rich, scrollable list of fun bike activities to do with friends and alone (solo rides, races, scavenger hunts, decorating your bike, night rides, trick practice, etc.)
  2. **Bike Scavenger Hunt** – An interactive outdoor scavenger hunt checklist designed for bike riders
  3. **Decorate Your Bike** – A creative guide with ideas for personalizing your bike (streamers, stickers, bells, paint, baskets, lights)
  4. **Bike Safety Star** – An interactive safety quiz/checklist covering helmet fit, hand signals, road rules, and gear
  5. **Bike Ride Playlist Builder** – Let girls pick a mood and get a curated playlist theme + activity idea to match their ride vibe
  6. **Ride Log & Goals** – A localStorage-powered ride tracker where girls can log rides and set distance/time goals

### Modify
- `App.tsx` – Import the new section components and add a new `SECTION_CATEGORIES` entry for "Make Bike Riding Fun"

### Remove
- Nothing removed

## Implementation Plan
1. Create `/src/frontend/src/components/sections/BikeFunSection.tsx` with 6 exported components
2. Update `App.tsx` to import all 6 components and register the new "bike-fun" category in `SECTION_CATEGORIES`
