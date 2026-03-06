# Girl Power Hub

## Current State
A large empowerment website for girls with many categories (Wellness, Journaling, Games, Science, Crafts, Nature, History, Life Skills, Recipes, More Fun, Empowerment). Each category has clickable section cards that open an interactive activity component.

## Requested Changes (Diff)

### Add
- A new category: **Get Off Your Phone** -- activities and challenges to help girls put down their phone and enjoy real life. Fun, age-appropriate ideas.
- A new category: **Stop Doom Scrolling** -- tips, activities, and games specifically designed to break the doom-scrolling habit and replace it with healthy alternatives.
- New section components for each category in a new file: `src/frontend/src/components/sections/ScreenTimeSection.tsx`

### Modify
- `App.tsx` -- import and register the two new categories and their section items in SECTION_CATEGORIES.

### Remove
- Nothing removed.

## Implementation Plan
1. Create `ScreenTimeSection.tsx` with components for "Get Off Your Phone" category items (e.g., Phone-Free Challenge, Phone Jar Game, Outdoor Adventure List, Boredom Buster Cards, Unplug & Doodle, Stretch Break Timer, Gratitude Walk, Real-Life Scavenger Hunt, etc.)
2. Add components for "Stop Doom Scrolling" category items (e.g., Scroll Swap Challenge, 5-4-3-2-1 Grounding, Feelings Check-In, Positive Feed Reset, Screen Time Tracker, Bedtime Wind-Down, Doom Scroll Detox Plan, Social Media Break Ideas, etc.)
3. Update `App.tsx` to import all new components and register both new SECTION_CATEGORIES entries with their items.
