# Girl Power Hub

## Current State
A multi-section empowerment web app for girls with 14+ categories and 100+ interactive activities. Each activity is a self-contained React component. New sections are added as new files and registered in App.tsx's SECTION_CATEGORIES array.

## Requested Changes (Diff)

### Add
- New section: **"Glow Up Your World"** (id: `glow-up`) with 7 high-quality, deeply interactive activities:
  1. **Confidence Karaoke** – Pick a girl-power anthem lyric and "perform" it with animated stage lights, a mic drop button, crowd cheers, and a score
  2. **Superpower Selector** – An animated quiz that reveals your unique superpower with a custom hero badge you can "unlock" and display
  3. **Compliment Cannon** – Fire compliments at yourself or a friend with animated confetti, customizable compliment packs (funny, heartfelt, brave), and a saved gallery
  4. **Dream Day Planner** – Build your perfect dream day hour-by-hour, pick activities, meals, people, and moods, then generate a beautiful "Day Card" to save
  5. **Glow-Up Goals** – A visual 30-day challenge tracker where you pick a glow-up goal (kindness, fitness, creativity, courage), check off daily wins, and watch a progress flower bloom
  6. **BFF Bond Test** – A fun friendship quiz with personality matchups, a compatibility score, and a friendship "certificate" you can name and display
  7. **Girl Power Radio** – Build your ultimate girl-power playlist by picking songs by mood/vibe, get a custom playlist name generated, and "air guitar" along with animated music visualizer

### Modify
- `App.tsx` – Import all 7 new components from `GlowUpSection.tsx` and register the new `glow-up` category in `SECTION_CATEGORIES` with a hot-pink/gold gradient badge, positioned as the first section (top of the list)

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/components/sections/GlowUpSection.tsx` with all 7 components exported
2. Update `App.tsx` to import and register the new section at the top of SECTION_CATEGORIES
