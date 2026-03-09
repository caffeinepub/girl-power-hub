# Girl Power Hub

## Current State
The app has 15 sections with 100+ interactive activities across all categories. The most notable is "Glow Up Your World" (7 activities) as the flagship section.

## Requested Changes (Diff)

### Add
- A brand new section called **"Ultimate Girl Challenge Zone"** with exactly 10 activities -- designed to be the most fun, engaging, and exciting section of the entire app. Activities should be highly interactive, game-like, and deeply satisfying to complete.

### Modify
- App.tsx: Import and register the new section in SECTION_CATEGORIES
- The new section should appear near the top (after "Glow Up Your World") to emphasize it as a crown jewel section

### Remove
- Nothing

## Implementation Plan

1. Create `/src/frontend/src/components/sections/ChallengeZoneSection.tsx` with 10 top-tier activities:
   - **Spin the Dare Wheel** - An animated spinning wheel with 20 fun dares/challenges
   - **Emoji Mood Dance Party** - Pick your mood, get a dance move with animated emoji dancer
   - **Design Your Dream Bedroom** - Drag-and-drop room builder with furniture stickers
   - **Ultimate Trivia Showdown** - Fast-paced timed trivia with score streaks and confetti
   - **Create Your Own Superhero** - Costume/power/name generator with a hero card reveal
   - **BFF Compatibility Test** - A fun quiz that generates a friendship compatibility score + certificate
   - **Talent Show Buzzer** - An interactive buzzer game where you pick a talent and perform for a virtual crowd
   - **Bucket List Builder** - Check off dream activities from categories, unlock badges, get a shareable bucket list card
   - **Glow Stick Dance Challenge** - Animated glow stick visual with a timer-based freestyle challenge prompt
   - **Star Girl Awards** - Vote for yourself and friends across 10 fun award categories, generates a personalized award certificate

2. Update App.tsx to import all 10 components and add the new section to SECTION_CATEGORIES with a special rainbow/gold color theme
