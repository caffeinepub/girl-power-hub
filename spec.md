# Girl Power Hub

## Current State
A multi-section empowerment website for girls with categories: Wellness & Mindfulness, Journaling & Writing, Games & Puzzles, Science & Experiments, Arts & Crafts, Nature & Outdoors, History & Culture, Life Skills, Recipes & Food, and More Fun. Each section has interactive components. App.tsx imports and registers all sections in SECTION_CATEGORIES.

## Requested Changes (Diff)

### Add
17 new interactive section components to be added across the app:

**Science & Experiments:**
- `ScienceMagicExtra` (already exists as ScienceMagic, skip — already present)

**Wellness category (new items):**
- `FeelingHappyCorner` – Tips on staying positive and brave
- `ConfidenceBoosting` – Cool poems to feel like a superstar
- `YogaForKids` – Already exists, skip

**New category: "Empowerment & Leadership" (or add to existing categories):**
- `FutureLeaders` – How to be a great leader in your classroom
- `DailyHighFives` – A new happy goal to try every single day (interactive daily goals)
- `IdeaBox` – A place for girls to send in their own big ideas (submission form saved to state)

**History / Culture (new items):**
- `HeroInterviews` – Prompts for interviewing your mom or teacher about their dreams

**More Fun (new items):**
- `SportyStars` – Stories about girls who love soccer, dance, or gymnastics
- `MusicMakers` – Learning about cool instruments and singing
- `FashionFun` – How to express your own style and be yourself
- `BookNook` – Recommendations for the best books with brave girl heroes

**Nature (new items):**
- `NatureExplorers` – Fun ways to help save the Earth and the animals

**Recipes (new items):**
- `BakingBoss` – Easy recipes for snacks that make you strong

**Life Skills (new items):**
- `FriendshipFixers` – How to be the bestest friend ever
- `CodingCoolness` – Learning how to make your own games

**Arts & Crafts (new items):**
- `ArtGallery` – A place to show off your beautiful drawings (draw/upload doodles, save to local state)

### Modify
- `App.tsx`: Import all new components and add them to the appropriate SECTION_CATEGORIES items arrays
- Existing section files: Add new components as named exports

### Remove
- Nothing removed

## Implementation Plan
1. Add new components to relevant section files (WellnessSection, HistorySection, MoreFunSection, NatureSection, RecipesSection, LifeSkillsSection, CraftsSection)
2. Create a new `EmpowermentSection.tsx` for FutureLeaders, DailyHighFives, IdeaBox
3. Update App.tsx to import all new components and add them to SECTION_CATEGORIES
4. Add a new "Empowerment & Leadership" category (or fold into existing categories if it makes more sense)
