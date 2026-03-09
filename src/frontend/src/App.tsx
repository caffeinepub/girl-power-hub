import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/sonner";
import { useRef, useState } from "react";

// ===== Challenge Zone Imports =====
import {
  BFFCompatibilityTest,
  BucketListBuilder,
  CreateYourSuperhero,
  DesignYourDreamBedroom,
  EmojiMoodDanceParty,
  GlowStickDanceChallenge,
  SpinTheDareWheel,
  StarGirlAwards,
  TalentShowBuzzer,
  UltimateTrivia,
} from "@/components/sections/ChallengeZoneSection";

// ===== Glow Up Imports =====
import {
  BFFBondTest,
  ComplimentCannon,
  ConfidenceKaraoke,
  DreamDayPlanner,
  GirlPowerRadio,
  GlowUpGoals,
  SuperpowerSelector,
} from "@/components/sections/GlowUpSection";

// ===== Wellness Imports =====
import {
  AnxietyToolkit,
  BoundariesSection,
  BullyProofing,
  ConfidenceBoosting,
  FeelingHappyCorner,
  GirlPowerHairstyles,
  MindfulMinute,
  MorningMantra,
  RainbowNailArt,
  SelfCareSunday,
  YogaForKids,
} from "@/components/sections/WellnessSection";

// ===== Journal Imports =====
import {
  ArtJournaling,
  DreamDiary,
  GratitudeJournal,
  JournalSection,
  JournalingIdeas,
  LetterToFutureSelf,
  MoodTracker,
  PoetryCorner,
  SecretDiaryPrompts,
  WritingFairyTales,
} from "@/components/sections/JournalSection";

// ===== Games Imports =====
import {
  BrainGames,
  ColorByNumber,
  DetectiveCodes,
  EmojiStory,
  FutureCareerQuiz,
  MadLibsGame,
  MatchingGame,
  RiddleChallenge,
  TriviaGame,
  WordSearch,
} from "@/components/sections/GamesSection";

// ===== Science Imports =====
import {
  BakingSodaVolcano,
  DinosaurDig,
  GrowCrystals,
  InvisibleInk,
  MagicMilkExperiment,
  PrincessScience,
  RainInAGlass,
  ScienceMagic,
  SlimeLab,
  SpaceSchool,
} from "@/components/sections/ScienceSection";

// ===== Crafts Imports =====
import {
  ArtGallery,
  BackpackDecorating,
  BalloonAnimals,
  DIYBathBombs,
  DecoratingYourJournal,
  DollhouseDecorating,
  FlowerCrownCrafting,
  FriendshipScrapbooking,
  JewelryMaking,
  KindnessRockPainting,
  OrigamiSection,
  PuppetShowTheater,
  SoapCarving,
  StickerMaking,
  TieDyeTips,
  VisionBoardSection,
} from "@/components/sections/CraftsSection";

// ===== History Imports =====
import {
  AsianHeritageMonth,
  BlackHistoryMonth,
  CommunityService,
  DreamJobsSection,
  EarthDayHistory,
  GirlHeroHistory,
  HeroInterviews,
  RealGirlsWhoRock,
  WallOfFame,
  WomensHistoryMonth,
} from "@/components/sections/HistorySection";

// ===== Nature Imports =====
import {
  BirdWatching,
  DreamHouseDesign,
  EarthDayActivities,
  LeafRubbings,
  MiniGarden,
  NatureExplorers,
  NatureScavengerHunt,
  RockCollecting,
  SaveTheBees,
  TreeHousePlans,
} from "@/components/sections/NatureSection";

// ===== Life Skills Imports =====
import {
  BudgetPartyPlanning,
  CodingCoolness,
  DisagreeRespectfully,
  FriendshipFixers,
  GoalSetting,
  HelpingAnimals,
  IndoorPartyIdeas,
  JumpRopePro,
  LearningFrench,
  LearningUkulele,
  MiddleSchoolGuide,
  PublicSpeakingTips,
} from "@/components/sections/LifeSkillsSection";

// ===== Recipes Imports =====
import {
  BakingBoss,
  BakingCookies,
  EnergyBites,
  FancyTeaParty,
  HealthySmoothieBowls,
  HealthySnackHacks,
  MagicPotions,
  MovieNightSnacks,
  NoGlutenRecipes,
  RecipesSection,
} from "@/components/sections/RecipesSection";

// ===== More Fun Imports =====
import {
  BackyardCamping,
  BookClub,
  BookNook,
  DancePartyPlaylist,
  FacePainting,
  FashionFun,
  GirlScoutMagic,
  LearningSignLanguage,
  MagicTricks,
  MiniOlympics,
  MovieNightPopcorn,
  MusicMakers,
  PhotographyClub,
  PositivePostIts,
  PuddleJumping,
  SecretHandshakes,
  SpaNight,
  SportyStars,
  StuffedAnimalTeaParty,
  WriteYourOwnComic,
} from "@/components/sections/MoreFunSection";

// ===== Empowerment Imports =====
import {
  ArtJournalEmpowerment,
  CommunityChallenge,
  DailyHighFives,
  FashionForChange,
  FutureLeaders,
  GirlPowerWallOfFame,
  GoalTracker,
  IdeaBox,
  SpeakUp,
  VisionBoardBuilder,
} from "@/components/sections/EmpowermentSection";

// ===== Mindset Imports =====
import {
  AffirmationGenerator,
  FearCrusher,
  GrowthMindsetQuiz,
  MistakeJournal,
  PowerWordsWall,
} from "@/components/sections/MindsetSection";

// ===== Bike Fun Imports =====
import {
  BikeActivitiesList,
  BikePlaylistBuilder,
  BikeRideLog,
  BikeSafetyStar,
  BikeScavengerHunt,
  DecorateYourBike,
} from "@/components/sections/BikeFunSection";

// ===== Screen Time Imports =====
import {
  BedtimeWindDown,
  BoredomBusterCards,
  DigitalDetoxPlan,
  DoomScrollDetox,
  FeelingsCheckIn,
  GratitudeWalk,
  GroundingExercise,
  MindfulScrollingQuiz,
  NaturePhotoChallenge,
  OutdoorAdventureList,
  PhoneFreeChallenge,
  PhoneFreeHobbies,
  PhoneJarGame,
  PositiveFeedReset,
  RealLifeScavengerHunt,
  ScreenTimeTracker,
  ScrollSwapChallenge,
  SocialMediaBreakIdeas,
  StretchBreakTimer,
  UnplugAndDoodle,
} from "@/components/sections/ScreenTimeSection";

// ===== SECTION REGISTRY =====
interface SectionItem {
  id: string;
  label: string;
  emoji: string;
  component: React.ComponentType;
}

interface SectionCategory {
  id: string;
  label: string;
  emoji: string;
  color: string;
  badgeClass: string;
  items: SectionItem[];
}

const SECTION_CATEGORIES: SectionCategory[] = [
  {
    id: "glow-up",
    label: "Glow Up Your World",
    emoji: "✨",
    color: "bg-pink-light-gp",
    badgeClass: "bg-pink-gp text-white",
    items: [
      {
        id: "confidence-karaoke",
        label: "Confidence Karaoke",
        emoji: "🎤",
        component: ConfidenceKaraoke,
      },
      {
        id: "superpower-selector",
        label: "Superpower Selector",
        emoji: "🦸‍♀️",
        component: SuperpowerSelector,
      },
      {
        id: "compliment-cannon",
        label: "Compliment Cannon",
        emoji: "🎉",
        component: ComplimentCannon,
      },
      {
        id: "dream-day-planner",
        label: "Dream Day Planner",
        emoji: "🌈",
        component: DreamDayPlanner,
      },
      {
        id: "glow-up-goals",
        label: "Glow-Up Goals",
        emoji: "🌸",
        component: GlowUpGoals,
      },
      {
        id: "bff-bond-test",
        label: "BFF Bond Test",
        emoji: "💖",
        component: BFFBondTest,
      },
      {
        id: "girl-power-radio",
        label: "Girl Power Radio",
        emoji: "🎵",
        component: GirlPowerRadio,
      },
    ],
  },
  {
    id: "challenge-zone",
    label: "Ultimate Girl Challenge Zone",
    emoji: "🏆",
    color: "bg-yellow-light-gp",
    badgeClass: "bg-pink-gp text-white",
    items: [
      {
        id: "spin-dare-wheel",
        label: "Spin the Dare Wheel",
        emoji: "🎡",
        component: SpinTheDareWheel,
      },
      {
        id: "emoji-dance-party",
        label: "Emoji Dance Party",
        emoji: "💃",
        component: EmojiMoodDanceParty,
      },
      {
        id: "dream-bedroom",
        label: "Design Your Bedroom",
        emoji: "🛋️",
        component: DesignYourDreamBedroom,
      },
      {
        id: "ultimate-trivia",
        label: "Ultimate Trivia",
        emoji: "⚡",
        component: UltimateTrivia,
      },
      {
        id: "create-superhero",
        label: "Create Your Superhero",
        emoji: "🦸‍♀️",
        component: CreateYourSuperhero,
      },
      {
        id: "bff-compatibility",
        label: "BFF Compatibility Test",
        emoji: "💕",
        component: BFFCompatibilityTest,
      },
      {
        id: "talent-show-buzzer",
        label: "Talent Show Buzzer",
        emoji: "🎤",
        component: TalentShowBuzzer,
      },
      {
        id: "bucket-list",
        label: "Bucket List Builder",
        emoji: "🌟",
        component: BucketListBuilder,
      },
      {
        id: "glow-stick-dance",
        label: "Glow Stick Dance",
        emoji: "🌈",
        component: GlowStickDanceChallenge,
      },
      {
        id: "star-girl-awards",
        label: "Star Girl Awards",
        emoji: "🏅",
        component: StarGirlAwards,
      },
    ],
  },
  {
    id: "wellness",
    label: "Wellness & Mindfulness",
    emoji: "🧘‍♀️",
    color: "bg-pink-light-gp",
    badgeClass: "bg-pink-gp text-white",
    items: [
      {
        id: "mindful-minute",
        label: "Mindful Minute",
        emoji: "🫁",
        component: MindfulMinute,
      },
      {
        id: "morning-mantra",
        label: "Morning Mantra",
        emoji: "☀️",
        component: MorningMantra,
      },
      {
        id: "anxiety-toolkit",
        label: "Anxiety Toolkit",
        emoji: "🧰",
        component: AnxietyToolkit,
      },
      {
        id: "yoga-kids",
        label: "Yoga for Kids",
        emoji: "🧘‍♀️",
        component: YogaForKids,
      },
      {
        id: "self-care",
        label: "Self-Care Sunday",
        emoji: "💆‍♀️",
        component: SelfCareSunday,
      },
      {
        id: "bully-proofing",
        label: "Bully-Proofing",
        emoji: "💪",
        component: BullyProofing,
      },
      {
        id: "boundaries",
        label: "Boundaries",
        emoji: "🌿",
        component: BoundariesSection,
      },
      {
        id: "nail-art",
        label: "Rainbow Nail Art",
        emoji: "💅",
        component: RainbowNailArt,
      },
      {
        id: "girl-power-hairstyles",
        label: "Girl Power Hairstyles",
        emoji: "🎀",
        component: GirlPowerHairstyles,
      },
      {
        id: "feeling-happy",
        label: "Feeling Happy Corner",
        emoji: "😊",
        component: FeelingHappyCorner,
      },
      {
        id: "confidence-boosting",
        label: "Confidence Boosting",
        emoji: "⭐",
        component: ConfidenceBoosting,
      },
    ],
  },
  {
    id: "journaling",
    label: "Journaling & Writing",
    emoji: "📔",
    color: "bg-purple-light-gp",
    badgeClass: "bg-purple-gp text-white",
    items: [
      {
        id: "journal",
        label: "My Journal",
        emoji: "📔",
        component: JournalSection,
      },
      {
        id: "journal-ideas",
        label: "Journaling Ideas",
        emoji: "💡",
        component: JournalingIdeas,
      },
      {
        id: "fairy-tales",
        label: "Write a Fairy Tale",
        emoji: "🧚‍♀️",
        component: WritingFairyTales,
      },
      {
        id: "gratitude-journal",
        label: "Gratitude Journal",
        emoji: "🙏",
        component: GratitudeJournal,
      },
      {
        id: "dream-diary",
        label: "Dream Diary",
        emoji: "🌙",
        component: DreamDiary,
      },
      {
        id: "letter-future-self",
        label: "Letter to Future Self",
        emoji: "💌",
        component: LetterToFutureSelf,
      },
      {
        id: "mood-tracker",
        label: "Mood Tracker",
        emoji: "🌈",
        component: MoodTracker,
      },
      {
        id: "poetry-corner",
        label: "Poetry Corner",
        emoji: "✍️",
        component: PoetryCorner,
      },
      {
        id: "secret-diary-prompts",
        label: "Secret Diary Prompts",
        emoji: "📔",
        component: SecretDiaryPrompts,
      },
      {
        id: "art-journaling",
        label: "Art Journaling",
        emoji: "🎨",
        component: ArtJournaling,
      },
    ],
  },
  {
    id: "games",
    label: "Games & Puzzles",
    emoji: "🎮",
    color: "bg-coral-light-gp",
    badgeClass: "bg-coral-gp text-white",
    items: [
      {
        id: "trivia",
        label: "Trivia Game",
        emoji: "🎯",
        component: TriviaGame,
      },
      {
        id: "mad-libs",
        label: "Mad Libs",
        emoji: "📖",
        component: MadLibsGame,
      },
      {
        id: "matching",
        label: "Matching Game",
        emoji: "🃏",
        component: MatchingGame,
      },
      {
        id: "brain-games",
        label: "Brain Games",
        emoji: "🧠",
        component: BrainGames,
      },
      {
        id: "career-quiz",
        label: "Future Career Quiz",
        emoji: "🔮",
        component: FutureCareerQuiz,
      },
      {
        id: "detective-codes",
        label: "Detective Codes",
        emoji: "🔍",
        component: DetectiveCodes,
      },
      {
        id: "word-search",
        label: "Word Search",
        emoji: "🔤",
        component: WordSearch,
      },
      {
        id: "emoji-story",
        label: "Emoji Story",
        emoji: "😄",
        component: EmojiStory,
      },
      {
        id: "riddle-challenge",
        label: "Riddle Challenge",
        emoji: "🤔",
        component: RiddleChallenge,
      },
      {
        id: "color-by-number",
        label: "Color By Number",
        emoji: "🎨",
        component: ColorByNumber,
      },
    ],
  },
  {
    id: "science",
    label: "Science & Experiments",
    emoji: "🔬",
    color: "bg-teal-light-gp",
    badgeClass: "bg-teal-gp text-white",
    items: [
      {
        id: "science-magic",
        label: "Science Magic Lab",
        emoji: "🧪",
        component: ScienceMagic,
      },
      {
        id: "princess-science",
        label: "Princess Science",
        emoji: "💎",
        component: PrincessScience,
      },
      {
        id: "space-school",
        label: "Space School",
        emoji: "🚀",
        component: SpaceSchool,
      },
      {
        id: "dinosaur-dig",
        label: "Dinosaur Dig",
        emoji: "🦴",
        component: DinosaurDig,
      },
      {
        id: "slime-lab",
        label: "Slime Lab",
        emoji: "🟢",
        component: SlimeLab,
      },
      {
        id: "baking-soda-volcano",
        label: "Baking Soda Volcano",
        emoji: "🌋",
        component: BakingSodaVolcano,
      },
      {
        id: "magic-milk",
        label: "Magic Milk Experiment",
        emoji: "🥛",
        component: MagicMilkExperiment,
      },
      {
        id: "rain-in-glass",
        label: "Rain in a Glass",
        emoji: "☁️",
        component: RainInAGlass,
      },
      {
        id: "grow-crystals",
        label: "Grow Crystals",
        emoji: "💎",
        component: GrowCrystals,
      },
      {
        id: "invisible-ink",
        label: "Invisible Ink",
        emoji: "✉️",
        component: InvisibleInk,
      },
    ],
  },
  {
    id: "crafts",
    label: "Arts & Crafts",
    emoji: "🎨",
    color: "bg-yellow-light-gp",
    badgeClass: "bg-yellow-gp text-foreground",
    items: [
      {
        id: "flower-crown",
        label: "Flower Crown",
        emoji: "🌸",
        component: FlowerCrownCrafting,
      },
      {
        id: "tie-dye",
        label: "Tie-Dye Tips",
        emoji: "🌈",
        component: TieDyeTips,
      },
      {
        id: "bath-bombs",
        label: "DIY Bath Bombs",
        emoji: "🛁",
        component: DIYBathBombs,
      },
      {
        id: "origami",
        label: "Origami Folding",
        emoji: "🦢",
        component: OrigamiSection,
      },
      {
        id: "vision-board",
        label: "Dream Board",
        emoji: "✨",
        component: VisionBoardSection,
      },
      {
        id: "backpack-decorating",
        label: "Backpack Decorating",
        emoji: "🎒",
        component: BackpackDecorating,
      },
      {
        id: "sticker-making",
        label: "Sticker Making",
        emoji: "🎨",
        component: StickerMaking,
      },
      {
        id: "balloon-animals",
        label: "Balloon Animals",
        emoji: "🎈",
        component: BalloonAnimals,
      },
      {
        id: "soap-carving",
        label: "Soap Carving",
        emoji: "🧼",
        component: SoapCarving,
      },
      {
        id: "kindness-rocks",
        label: "Kindness Rock Painting",
        emoji: "🪨",
        component: KindnessRockPainting,
      },
      {
        id: "jewelry-making",
        label: "Jewelry Making",
        emoji: "💍",
        component: JewelryMaking,
      },
      {
        id: "dollhouse-decorating",
        label: "Dollhouse Decorating",
        emoji: "🏠",
        component: DollhouseDecorating,
      },
      {
        id: "friendship-scrapbook",
        label: "Friendship Scrapbooking",
        emoji: "📸",
        component: FriendshipScrapbooking,
      },
      {
        id: "decorate-journal",
        label: "Decorate Your Journal",
        emoji: "📔",
        component: DecoratingYourJournal,
      },
      {
        id: "puppet-show",
        label: "Puppet Show Theater",
        emoji: "🎭",
        component: PuppetShowTheater,
      },
      {
        id: "art-gallery",
        label: "Art Gallery",
        emoji: "🎨",
        component: ArtGallery,
      },
    ],
  },
  {
    id: "nature",
    label: "Nature & Outdoors",
    emoji: "🌿",
    color: "bg-teal-light-gp",
    badgeClass: "bg-teal-gp text-white",
    items: [
      {
        id: "scavenger-hunt",
        label: "Scavenger Hunt",
        emoji: "🔍",
        component: NatureScavengerHunt,
      },
      {
        id: "mini-garden",
        label: "Mini Garden",
        emoji: "🌱",
        component: MiniGarden,
      },
      {
        id: "save-bees",
        label: "Save the Bees",
        emoji: "🐝",
        component: SaveTheBees,
      },
      {
        id: "bird-watching",
        label: "Bird Watching",
        emoji: "🐦",
        component: BirdWatching,
      },
      {
        id: "rock-collecting",
        label: "Rock Collecting",
        emoji: "🪨",
        component: RockCollecting,
      },
      {
        id: "leaf-rubbings",
        label: "Leaf Rubbings",
        emoji: "🍂",
        component: LeafRubbings,
      },
      {
        id: "dream-house",
        label: "Dream House Design",
        emoji: "🏡",
        component: DreamHouseDesign,
      },
      {
        id: "tree-house",
        label: "Tree House Plans",
        emoji: "🌳",
        component: TreeHousePlans,
      },
      {
        id: "nature-explorers",
        label: "Nature Explorers",
        emoji: "🐼",
        component: NatureExplorers,
      },
      {
        id: "earth-day-activities",
        label: "Earth Day Activities",
        emoji: "🌍",
        component: EarthDayActivities,
      },
    ],
  },
  {
    id: "history",
    label: "History & Culture",
    emoji: "👑",
    color: "bg-pink-light-gp",
    badgeClass: "bg-pink-gp text-white",
    items: [
      {
        id: "girl-heroes",
        label: "Girl Hero History",
        emoji: "👑",
        component: GirlHeroHistory,
      },
      {
        id: "real-girls",
        label: "Real Girls Who Rock",
        emoji: "🌟",
        component: RealGirlsWhoRock,
      },
      {
        id: "dream-jobs",
        label: "Dream Jobs",
        emoji: "💫",
        component: DreamJobsSection,
      },
      {
        id: "asian-heritage",
        label: "Asian Heritage Month",
        emoji: "🌸",
        component: AsianHeritageMonth,
      },
      {
        id: "wall-of-fame",
        label: "Wall of Fame",
        emoji: "🏆",
        component: WallOfFame,
      },
      {
        id: "hero-interviews",
        label: "Hero Interviews",
        emoji: "🎤",
        component: HeroInterviews,
      },
      {
        id: "earth-day-history",
        label: "Earth Day History",
        emoji: "🌱",
        component: EarthDayHistory,
      },
      {
        id: "womens-history-month",
        label: "Women's History Month",
        emoji: "♀️",
        component: WomensHistoryMonth,
      },
      {
        id: "black-history-month",
        label: "Black History Month",
        emoji: "✊",
        component: BlackHistoryMonth,
      },
      {
        id: "community-service",
        label: "Community Service",
        emoji: "🤝",
        component: CommunityService,
      },
    ],
  },
  {
    id: "life-skills",
    label: "Life Skills",
    emoji: "🎓",
    color: "bg-purple-light-gp",
    badgeClass: "bg-purple-gp text-white",
    items: [
      {
        id: "middle-school",
        label: "Middle School Guide",
        emoji: "🏫",
        component: MiddleSchoolGuide,
      },
      {
        id: "goal-setting",
        label: "Goal Setting",
        emoji: "🎯",
        component: GoalSetting,
      },
      {
        id: "public-speaking",
        label: "Public Speaking",
        emoji: "🎤",
        component: PublicSpeakingTips,
      },
      {
        id: "indoor-party",
        label: "Indoor Party Ideas",
        emoji: "🎉",
        component: IndoorPartyIdeas,
      },
      {
        id: "budget-party",
        label: "Budget Party Planning",
        emoji: "💰",
        component: BudgetPartyPlanning,
      },
      {
        id: "disagree",
        label: "Disagree Respectfully",
        emoji: "🤝",
        component: DisagreeRespectfully,
      },
      {
        id: "jump-rope",
        label: "Jump Rope Pro",
        emoji: "🪢",
        component: JumpRopePro,
      },
      {
        id: "learning-french",
        label: "Learning French",
        emoji: "🇫🇷",
        component: LearningFrench,
      },
      {
        id: "learning-ukulele",
        label: "Learning Ukulele",
        emoji: "🎸",
        component: LearningUkulele,
      },
      {
        id: "helping-animals",
        label: "Helping Animals",
        emoji: "🐾",
        component: HelpingAnimals,
      },
      {
        id: "friendship-fixers",
        label: "Friendship Fixers",
        emoji: "👭",
        component: FriendshipFixers,
      },
      {
        id: "coding-coolness",
        label: "Coding Coolness",
        emoji: "💻",
        component: CodingCoolness,
      },
    ],
  },
  {
    id: "recipes",
    label: "Recipes & Food",
    emoji: "🍳",
    color: "bg-coral-light-gp",
    badgeClass: "bg-coral-gp text-white",
    items: [
      {
        id: "recipes",
        label: "Recipes",
        emoji: "🍳",
        component: RecipesSection,
      },
      {
        id: "snack-hacks",
        label: "Healthy Snack Hacks",
        emoji: "⚡",
        component: HealthySnackHacks,
      },
      {
        id: "tea-party",
        label: "Fancy Tea Party",
        emoji: "☕",
        component: FancyTeaParty,
      },
      {
        id: "magic-potions",
        label: "Magic Potions",
        emoji: "🍹",
        component: MagicPotions,
      },
      {
        id: "baking-cookies",
        label: "Baking Cookies",
        emoji: "🍪",
        component: BakingCookies,
      },
      {
        id: "baking-boss",
        label: "Baking Boss",
        emoji: "🍪",
        component: BakingBoss,
      },
      {
        id: "healthy-smoothie-bowls",
        label: "Healthy Smoothie Bowls",
        emoji: "🍓",
        component: HealthySmoothieBowls,
      },
      {
        id: "movie-night-snacks",
        label: "Movie Night Snacks",
        emoji: "🍿",
        component: MovieNightSnacks,
      },
      {
        id: "no-gluten-recipes",
        label: "Gluten-Free Recipes",
        emoji: "🌾",
        component: NoGlutenRecipes,
      },
      {
        id: "energy-bites",
        label: "Energy Bites",
        emoji: "⚡",
        component: EnergyBites,
      },
    ],
  },
  {
    id: "more-fun",
    label: "More Fun!",
    emoji: "🎉",
    color: "bg-yellow-light-gp",
    badgeClass: "bg-yellow-gp text-foreground",
    items: [
      { id: "book-club", label: "Book Club", emoji: "📚", component: BookClub },
      {
        id: "positive-postits",
        label: "Positive Post-its",
        emoji: "📌",
        component: PositivePostIts,
      },
      {
        id: "comic",
        label: "Write Your Comic",
        emoji: "🦸‍♀️",
        component: WriteYourOwnComic,
      },
      {
        id: "magic-tricks",
        label: "Magic Tricks",
        emoji: "🪄",
        component: MagicTricks,
      },
      { id: "spa-night", label: "Spa Night", emoji: "🛁", component: SpaNight },
      {
        id: "mini-olympics",
        label: "Mini Olympics",
        emoji: "🏅",
        component: MiniOlympics,
      },
      {
        id: "stuffed-tea-party",
        label: "Stuffed Animal Tea Party",
        emoji: "🧸",
        component: StuffedAnimalTeaParty,
      },
      {
        id: "movie-popcorn",
        label: "Movie Night Popcorn",
        emoji: "🍿",
        component: MovieNightPopcorn,
      },
      {
        id: "sign-language",
        label: "Sign Language",
        emoji: "🤟",
        component: LearningSignLanguage,
      },
      {
        id: "photography-club",
        label: "Photography Club",
        emoji: "📸",
        component: PhotographyClub,
      },
      {
        id: "secret-handshakes",
        label: "Secret Handshakes",
        emoji: "🤝",
        component: SecretHandshakes,
      },
      {
        id: "backyard-camping",
        label: "Backyard Camping",
        emoji: "⛺",
        component: BackyardCamping,
      },
      {
        id: "face-painting",
        label: "Face Painting",
        emoji: "🦋",
        component: FacePainting,
      },
      {
        id: "puddle-jumping",
        label: "Puddle Jumping",
        emoji: "⛈️",
        component: PuddleJumping,
      },
      {
        id: "sporty-stars",
        label: "Sporty Stars",
        emoji: "⚽",
        component: SportyStars,
      },
      {
        id: "music-makers",
        label: "Music Makers",
        emoji: "🎸",
        component: MusicMakers,
      },
      {
        id: "fashion-fun",
        label: "Fashion Fun",
        emoji: "👗",
        component: FashionFun,
      },
      {
        id: "book-nook",
        label: "Book Nook",
        emoji: "📚",
        component: BookNook,
      },
      {
        id: "dance-party-playlist",
        label: "Dance Party Playlist",
        emoji: "💃",
        component: DancePartyPlaylist,
      },
      {
        id: "girl-scout-magic",
        label: "Girl Scout Magic",
        emoji: "🏅",
        component: GirlScoutMagic,
      },
    ],
  },
  {
    id: "empowerment",
    label: "Empowerment & Leadership",
    emoji: "👑",
    color: "bg-yellow-light-gp",
    badgeClass: "bg-yellow-gp text-foreground",
    items: [
      {
        id: "future-leaders",
        label: "Future Leaders",
        emoji: "👑",
        component: FutureLeaders,
      },
      {
        id: "daily-high-fives",
        label: "Daily High-Fives",
        emoji: "🖐️",
        component: DailyHighFives,
      },
      {
        id: "idea-box",
        label: "Idea Box",
        emoji: "💡",
        component: IdeaBox,
      },
      {
        id: "girl-power-wall-of-fame",
        label: "Girl Power Wall of Fame",
        emoji: "🌟",
        component: GirlPowerWallOfFame,
      },
      {
        id: "vision-board-builder",
        label: "Vision Board Builder",
        emoji: "✨",
        component: VisionBoardBuilder,
      },
      {
        id: "goal-tracker",
        label: "Goal Tracker",
        emoji: "🎯",
        component: GoalTracker,
      },
      {
        id: "community-challenge",
        label: "Community Challenge",
        emoji: "🤝",
        component: CommunityChallenge,
      },
      {
        id: "speak-up",
        label: "Speak Up!",
        emoji: "📢",
        component: SpeakUp,
      },
      {
        id: "fashion-for-change",
        label: "Fashion for Change",
        emoji: "👗",
        component: FashionForChange,
      },
      {
        id: "art-journal-empowerment",
        label: "Art Journal",
        emoji: "🖌️",
        component: ArtJournalEmpowerment,
      },
    ],
  },
  {
    id: "get-off-phone",
    label: "Get Off Your Phone",
    emoji: "📵",
    color: "bg-teal-light-gp",
    badgeClass: "bg-teal-gp text-white",
    items: [
      {
        id: "phone-free-challenge",
        label: "Phone-Free Challenge",
        emoji: "🏆",
        component: PhoneFreeChallenge,
      },
      {
        id: "phone-jar-game",
        label: "Phone Jar Game",
        emoji: "🫙",
        component: PhoneJarGame,
      },
      {
        id: "outdoor-adventure-list",
        label: "Outdoor Adventures",
        emoji: "🌳",
        component: OutdoorAdventureList,
      },
      {
        id: "boredom-buster-cards",
        label: "Boredom Busters",
        emoji: "🎴",
        component: BoredomBusterCards,
      },
      {
        id: "unplug-doodle",
        label: "Unplug & Doodle",
        emoji: "✏️",
        component: UnplugAndDoodle,
      },
      {
        id: "stretch-break-timer",
        label: "Stretch Break Timer",
        emoji: "🧘",
        component: StretchBreakTimer,
      },
      {
        id: "gratitude-walk",
        label: "Gratitude Walk",
        emoji: "🌸",
        component: GratitudeWalk,
      },
      {
        id: "real-life-scavenger-hunt",
        label: "Real-Life Scavenger Hunt",
        emoji: "🔍",
        component: RealLifeScavengerHunt,
      },
      {
        id: "nature-photo-challenge",
        label: "Nature Photo Challenge",
        emoji: "📸",
        component: NaturePhotoChallenge,
      },
      {
        id: "phone-free-hobbies",
        label: "Phone-Free Hobbies",
        emoji: "🌟",
        component: PhoneFreeHobbies,
      },
    ],
  },
  {
    id: "stop-doom-scrolling",
    label: "Stop Doom Scrolling",
    emoji: "🚫",
    color: "bg-coral-light-gp",
    badgeClass: "bg-coral-gp text-white",
    items: [
      {
        id: "scroll-swap-challenge",
        label: "Scroll Swap Challenge",
        emoji: "🔄",
        component: ScrollSwapChallenge,
      },
      {
        id: "grounding-exercise",
        label: "5-4-3-2-1 Grounding",
        emoji: "🌿",
        component: GroundingExercise,
      },
      {
        id: "feelings-check-in",
        label: "Feelings Check-In",
        emoji: "💛",
        component: FeelingsCheckIn,
      },
      {
        id: "screen-time-tracker",
        label: "Screen Time Tracker",
        emoji: "📊",
        component: ScreenTimeTracker,
      },
      {
        id: "bedtime-wind-down",
        label: "Bedtime Wind-Down",
        emoji: "🌙",
        component: BedtimeWindDown,
      },
      {
        id: "doom-scroll-detox",
        label: "7-Day Detox Plan",
        emoji: "✨",
        component: DoomScrollDetox,
      },
      {
        id: "social-media-break",
        label: "Social Media Break Ideas",
        emoji: "💡",
        component: SocialMediaBreakIdeas,
      },
      {
        id: "positive-feed-reset",
        label: "Positive Feed Reset",
        emoji: "💖",
        component: PositiveFeedReset,
      },
      {
        id: "digital-detox-plan",
        label: "Digital Detox Plan",
        emoji: "🌿",
        component: DigitalDetoxPlan,
      },
      {
        id: "mindful-scrolling-quiz",
        label: "Mindful Scrolling Quiz",
        emoji: "📱",
        component: MindfulScrollingQuiz,
      },
    ],
  },
  {
    id: "mindset-growth",
    label: "Mindset & Growth",
    emoji: "🌱",
    color: "bg-teal-light-gp",
    badgeClass: "bg-teal-gp text-white",
    items: [
      {
        id: "growth-mindset-quiz",
        label: "Growth Mindset Quiz",
        emoji: "🧠",
        component: GrowthMindsetQuiz,
      },
      {
        id: "affirmation-generator",
        label: "Affirmation Generator",
        emoji: "✨",
        component: AffirmationGenerator,
      },
      {
        id: "fear-crusher",
        label: "Fear Crusher",
        emoji: "💪",
        component: FearCrusher,
      },
      {
        id: "mistake-journal",
        label: "Mistake Journal",
        emoji: "📖",
        component: MistakeJournal,
      },
      {
        id: "power-words-wall",
        label: "Power Words Wall",
        emoji: "🌟",
        component: PowerWordsWall,
      },
    ],
  },
  {
    id: "bike-fun",
    label: "Make Bike Riding Fun",
    emoji: "🚲",
    color: "bg-teal-light-gp",
    badgeClass: "bg-teal-gp text-white",
    items: [
      {
        id: "bike-activities",
        label: "Fun Things To Do on Your Bike",
        emoji: "🚴‍♀️",
        component: BikeActivitiesList,
      },
      {
        id: "bike-scavenger-hunt",
        label: "Bike Scavenger Hunt",
        emoji: "🔍",
        component: BikeScavengerHunt,
      },
      {
        id: "decorate-bike",
        label: "Decorate Your Bike",
        emoji: "✨",
        component: DecorateYourBike,
      },
      {
        id: "bike-safety",
        label: "Bike Safety Star",
        emoji: "⭐",
        component: BikeSafetyStar,
      },
      {
        id: "bike-playlist",
        label: "Ride Playlist Builder",
        emoji: "🎵",
        component: BikePlaylistBuilder,
      },
      {
        id: "bike-log",
        label: "Ride Log & Goals",
        emoji: "📋",
        component: BikeRideLog,
      },
    ],
  },
];

// ===== ALL SECTIONS FLAT =====
const ALL_SECTIONS = SECTION_CATEGORIES.flatMap((cat) =>
  cat.items.map((item) => ({
    ...item,
    categoryId: cat.id,
    categoryLabel: cat.label,
    badgeClass: cat.badgeClass,
  })),
);

export default function App() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  const activeSectionData = ALL_SECTIONS.find((s) => s.id === activeSection);
  const ActiveComponent = activeSectionData?.component;

  const filteredCategories = SECTION_CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        search === "" ||
        item.label.toLowerCase().includes(search.toLowerCase()) ||
        item.emoji.includes(search),
    ),
  })).filter((cat) => cat.items.length > 0);

  const handleSectionSelect = (id: string) => {
    setActiveSection(id);
    setSidebarOpen(false);
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToSections = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Toaster position="top-right" />

      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl float-animation">👑</span>
            <h1 className="font-display text-xl font-bold">
              <span className="text-pink-gp">Girl</span>{" "}
              <span className="text-purple-gp">Power</span>{" "}
              <span className="text-teal-gp">Hub</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-pink-gp text-pink-gp hidden sm:flex"
              onClick={scrollToSections}
              data-ocid="nav.link"
            >
              Explore 🌟
            </Button>
            <Button
              size="sm"
              className="rounded-full bg-pink-gp text-white sm:hidden"
              onClick={() => setSidebarOpen(true)}
              data-ocid="nav.open_modal_button"
            >
              ☰ Menu
            </Button>
          </div>
        </div>
      </header>

      {/* ===== MOBILE SIDEBAR OVERLAY ===== */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <button
            type="button"
            className="absolute inset-0 bg-black/40 w-full h-full border-0"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          />
          <div
            className="relative w-80 max-w-full bg-background h-full overflow-y-auto shadow-2xl p-4"
            data-ocid="nav.modal"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-pink-gp">
                All Sections
              </h2>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSidebarOpen(false)}
                data-ocid="nav.close_button"
              >
                ✕
              </Button>
            </div>
            <input
              placeholder="Search sections... 🔍"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 rounded-full border border-border text-sm mb-4 focus:border-pink-gp outline-none"
              data-ocid="nav.search_input"
            />
            <div className="flex flex-col gap-2">
              {filteredCategories.map((cat) => (
                <div key={cat.id}>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    {cat.emoji} {cat.label}
                  </p>
                  {cat.items.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors hover:bg-pink-light-gp ${activeSection === item.id ? "bg-pink-light-gp font-bold text-pink-gp" : ""}`}
                      onClick={() => handleSectionSelect(item.id)}
                      data-ocid="nav.link"
                    >
                      {item.emoji} {item.label}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== HERO BANNER ===== */}
      {!activeSection && (
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/assets/generated/hero-banner.dim_1200x400.jpg"
              alt="Girl Power Hub Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-background" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:py-24 text-center">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-lg">
              <span className="text-xl">👑</span>
              <span className="font-display font-bold text-foreground text-sm">
                GIRL POWER HUB
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-white drop-shadow-lg mb-4 leading-tight">
              You Are
              <br />
              <span className="shimmer bg-clip-text text-transparent block">
                Amazing!
              </span>
            </h2>
            <p className="text-white/90 text-lg sm:text-xl max-w-xl mx-auto mb-8 drop-shadow">
              Your all-in-one hub for wellness, creativity, science, history,
              recipes, and SO much more! ✨
            </p>
            <Button
              size="lg"
              onClick={scrollToSections}
              className="bg-white text-pink-gp font-display font-bold text-lg rounded-full px-10 py-6 shadow-glow hover:shadow-lg transition-all hover:scale-105"
              data-ocid="hero.primary_button"
            >
              Explore Everything! 🌟
            </Button>
          </div>
        </section>
      )}

      <main
        className="flex-1 max-w-7xl mx-auto w-full px-4 py-6"
        ref={contentRef}
      >
        {/* ===== ACTIVE SECTION VIEW ===== */}
        {activeSection && ActiveComponent ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-muted-foreground hover:text-pink-gp"
                onClick={() => setActiveSection(null)}
                data-ocid="nav.link"
              >
                ← Back to All Sections
              </Button>
              <Badge
                className={`section-badge ${ALL_SECTIONS.find((s) => s.id === activeSection)?.badgeClass}`}
              >
                {
                  SECTION_CATEGORIES.find(
                    (c) =>
                      c.id ===
                      ALL_SECTIONS.find((s) => s.id === activeSection)
                        ?.categoryId,
                  )?.emoji
                }{" "}
                {
                  ALL_SECTIONS.find((s) => s.id === activeSection)
                    ?.categoryLabel
                }
              </Badge>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <ActiveComponent />
            </div>

            {/* Related sections */}
            <div className="mt-8">
              <h3 className="font-display font-bold text-muted-foreground text-sm uppercase tracking-wider mb-3">
                More from this category
              </h3>
              <div className="flex flex-wrap gap-2">
                {SECTION_CATEGORIES.find(
                  (c) =>
                    c.id ===
                    ALL_SECTIONS.find((s) => s.id === activeSection)
                      ?.categoryId,
                )
                  ?.items.filter((item) => item.id !== activeSection)
                  .map((item) => (
                    <Button
                      key={item.id}
                      variant="outline"
                      size="sm"
                      className="rounded-full hover:border-pink-gp hover:text-pink-gp"
                      onClick={() => handleSectionSelect(item.id)}
                      data-ocid="nav.link"
                    >
                      {item.emoji} {item.label}
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          /* ===== MAIN SECTIONS GRID ===== */
          <div>
            {/* QUICK ACCESS STRIP */}
            <div className="mb-8 flex flex-col sm:flex-row items-center gap-3">
              <h2 className="font-display text-2xl font-bold text-foreground shrink-0">
                What do you want to do? 💖
              </h2>
              <input
                placeholder="Search any activity... 🔍"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:max-w-xs px-4 py-2 rounded-full border-2 border-border text-sm focus:border-pink-gp outline-none bg-card"
                data-ocid="home.search_input"
              />
            </div>

            {/* ALL SECTIONS QUICK JUMP */}
            <div className="mb-8 bg-card rounded-2xl border-2 border-border p-4">
              <h3 className="font-display font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">
                Jump to Any Section ✨
              </h3>
              <div className="flex flex-wrap gap-2">
                {SECTION_CATEGORIES.map((cat) => (
                  <Button
                    key={cat.id}
                    size="sm"
                    className={`rounded-full ${cat.badgeClass} text-xs font-bold`}
                    onClick={() => {
                      document
                        .getElementById(`cat-${cat.id}`)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    data-ocid="nav.link"
                  >
                    {cat.emoji} {cat.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* CATEGORIES WITH SECTION CARDS */}
            <div className="flex flex-col gap-8">
              {filteredCategories.map((cat) => (
                <section key={cat.id} id={`cat-${cat.id}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${cat.badgeClass} font-display font-bold text-sm`}
                    >
                      {cat.emoji} {cat.label}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {cat.items.length} activities
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                    {cat.items.map((item, i) => (
                      <button
                        type="button"
                        key={item.id}
                        className={`${cat.color} border-2 border-transparent hover:border-current rounded-2xl p-4 text-center cursor-pointer card-hover transition-all group text-left`}
                        onClick={() => handleSectionSelect(item.id)}
                        data-ocid={`${cat.id}.item.${i + 1}`}
                      >
                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                          {item.emoji}
                        </div>
                        <div className="font-display font-bold text-xs leading-tight">
                          {item.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border bg-card mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xl">👑</span>
            <span className="font-display font-bold text-pink-gp">
              Girl Power Hub
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}. Built with 💖 using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noreferrer"
              className="text-pink-gp hover:underline font-bold"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            You are amazing! Never forget that. ✨
          </p>
        </div>
      </footer>
    </div>
  );
}
