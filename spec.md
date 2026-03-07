# Girl Power Hub

## Current State
The app has 13 section categories, each with 10-20 interactive activities. Categories include Wellness, Journaling, Games, Science, Crafts, Nature, History, Life Skills, Recipes, More Fun, Empowerment, Get Off Your Phone, and Stop Doom Scrolling.

## Requested Changes (Diff)

### Add
- A new section category called "Mindset & Growth" with 5 interactive activities:
  1. **Growth Mindset Quiz** - Interactive quiz about having a growth mindset vs fixed mindset with explanations
  2. **Affirmation Generator** - Generates daily positive affirmations the user can save/copy
  3. **Fear Crusher** - Name a fear, get tips and brave-girl stories to face it
  4. **Mistake Journal** - Log a mistake and reframe it as a learning moment
  5. **Power Words Wall** - Build a personal collection of words that make you feel powerful

### Modify
- App.tsx: Import the new MindsetSection components and add the new category to SECTION_CATEGORIES

### Remove
- Nothing removed

## Implementation Plan
1. Create `/src/frontend/src/components/sections/MindsetSection.tsx` with 5 exported components
2. Update `App.tsx` to import the new components and add the new category entry
