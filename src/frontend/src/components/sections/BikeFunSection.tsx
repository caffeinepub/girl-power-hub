import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ============================================================
// 1. BIKE ACTIVITIES LIST
// ============================================================

const WITH_FRIENDS_ACTIVITIES = [
  {
    emoji: "🏁",
    title: "Neighborhood Bike Race",
    desc: "Mark a start and finish line with chalk, pick a fair route, and race your friends. First one back wins bragging rights!",
  },
  {
    emoji: "🎨",
    title: "Bike Decoration Contest",
    desc: "Everyone decorates their bike with streamers, stickers, and ribbons, then vote on the most creative ride!",
  },
  {
    emoji: "🌙",
    title: "Night Glow Ride",
    desc: "Clip on LED lights, wear reflective gear, and cruise the neighborhood after sunset for a magical glowing adventure.",
  },
  {
    emoji: "🔍",
    title: "Bike Scavenger Hunt",
    desc: "Make a list of 10 things to spot while riding — a red door, a dog, a rainbow flag — first team to find them all wins!",
  },
  {
    emoji: "🎪",
    title: "Bike Parade",
    desc: "Dress up your bikes and yourselves in a theme (unicorns! superheroes!), then ride through your street in formation.",
  },
  {
    emoji: "🎯",
    title: "Obstacle Course Challenge",
    desc: "Use cones, chalk lines, and hula hoops on the ground to create a wild course. Time each other and compare scores!",
  },
  {
    emoji: "🎵",
    title: "Bike Bingo",
    desc: "Print a bingo card of things to find on your route — a yellow car, a cat, a fire hydrant. Shout BINGO when you win!",
  },
  {
    emoji: "🍦",
    title: "Ice Cream Ride",
    desc: "Pick a destination like a park or ice cream shop and ride there together. The journey is the adventure!",
  },
  {
    emoji: "📸",
    title: "Photography Ride",
    desc: "Bring a phone or camera and challenge everyone to snap the most creative nature photo along the route.",
  },
  {
    emoji: "🚦",
    title: "Red Light Dance Party",
    desc: "Every time you stop at a light or stop sign, everyone does a 5-second dance move. Sillier = better!",
  },
  {
    emoji: "🏆",
    title: "Trick Practice Session",
    desc: "Take turns practicing slow-ride, balance on the line, and figure-8 turns. Cheer each other on as you master tricks!",
  },
  {
    emoji: "🗺️",
    title: "Map Your Neighborhood",
    desc: "Each person draws a map of a different street, then piece them all together for a neighborhood atlas you made yourselves.",
  },
];

const SOLO_ACTIVITIES = [
  {
    emoji: "🌿",
    title: "Nature Trail Meditation",
    desc: "Ride slowly through a park or trail and notice every color, sound, and smell. It's like a moving mindfulness session!",
  },
  {
    emoji: "🎧",
    title: "Power Playlist Ride",
    desc: "Build a playlist of your most energizing songs and ride to the beat. Fast songs = fast pedaling, slow songs = coast.",
  },
  {
    emoji: "📓",
    title: "Exploration Journal Ride",
    desc: "Bring a small notebook and stop at interesting spots to sketch or write about what you discover.",
  },
  {
    emoji: "🌅",
    title: "Sunrise or Sunset Ride",
    desc: "Plan a solo ride timed to catch the sunrise or sunset. Those colors from a bike seat are something truly special.",
  },
  {
    emoji: "⏱️",
    title: "Personal Speed Challenge",
    desc: "Time yourself on a set route and try to beat your own record each week. Track your progress in a notebook!",
  },
  {
    emoji: "🦋",
    title: "Wildlife Spotting Ride",
    desc: "Keep a tally of every bird, squirrel, butterfly, or dog you spot. See if you can beat your record from last ride!",
  },
  {
    emoji: "🎤",
    title: "Podcast Ride",
    desc: "Queue up a favorite podcast or audiobook, hit play, and just ride. Learning while moving is a total superpower.",
  },
  {
    emoji: "🧘",
    title: "Mindful Slow Ride",
    desc: "Challenge yourself to ride as slowly as possible without stopping. It's harder than it sounds and great for balance!",
  },
  {
    emoji: "🌧️",
    title: "Puddle Splash Route",
    desc: "After a rain, find the best puddles on a safe route and ride through every single one. Splash level: maximum.",
  },
  {
    emoji: "🏡",
    title: "Dream Neighborhood Tour",
    desc: "Ride through different streets and imagine: if I lived here, what would my life be like? Let your imagination run wild.",
  },
  {
    emoji: "💌",
    title: "Neighborhood Kindness Ride",
    desc: "Leave chalk messages or post-it notes on mailboxes as you ride by — little surprises that make neighbors smile.",
  },
  {
    emoji: "🗓️",
    title: "100-Day Ride Challenge",
    desc: "Commit to riding at least 10 minutes every day for 100 days. Mark a calendar and feel the momentum build!",
  },
];

export function BikeActivitiesList() {
  const [doneFriends, setDoneFriends] = useState<Set<number>>(new Set());
  const [doneSolo, setDoneSolo] = useState<Set<number>>(new Set());

  const toggleFriend = (i: number) => {
    setDoneFriends((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const toggleSolo = (i: number) => {
    setDoneSolo((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div data-ocid="bike-activities.section">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground mb-1">
          🚴‍♀️ Fun Things To Do on Your Bike
        </h2>
        <p className="text-muted-foreground text-sm">
          Tap any activity card to mark it as done! Collect them all. 🏆
        </p>
      </div>

      <Tabs defaultValue="friends" data-ocid="bike-activities.tab">
        <TabsList className="rounded-full bg-teal-light-gp mb-6 w-full sm:w-auto">
          <TabsTrigger
            value="friends"
            className="rounded-full font-bold data-[state=active]:bg-teal-gp data-[state=active]:text-white"
            data-ocid="bike-activities.tab"
          >
            🤝 With Friends ({doneFriends.size}/{WITH_FRIENDS_ACTIVITIES.length}
            )
          </TabsTrigger>
          <TabsTrigger
            value="solo"
            className="rounded-full font-bold data-[state=active]:bg-teal-gp data-[state=active]:text-white"
            data-ocid="bike-activities.tab"
          >
            🌟 On Your Own ({doneSolo.size}/{SOLO_ACTIVITIES.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="friends">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WITH_FRIENDS_ACTIVITIES.map((act, i) => (
              <button
                key={act.title}
                type="button"
                onClick={() => toggleFriend(i)}
                className={`text-left rounded-2xl border-2 p-4 transition-all cursor-pointer group ${
                  doneFriends.has(i)
                    ? "border-teal-gp bg-teal-light-gp"
                    : "border-border hover:border-teal-gp hover:bg-teal-light-gp/40"
                }`}
                data-ocid={`bike-activities.item.${i + 1}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    {act.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-display font-bold text-sm text-foreground">
                        {act.title}
                      </span>
                      {doneFriends.has(i) && (
                        <Badge className="bg-teal-gp text-white text-xs shrink-0">
                          Done ✓
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {act.desc}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="solo">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SOLO_ACTIVITIES.map((act, i) => (
              <button
                key={act.title}
                type="button"
                onClick={() => toggleSolo(i)}
                className={`text-left rounded-2xl border-2 p-4 transition-all cursor-pointer group ${
                  doneSolo.has(i)
                    ? "border-purple-gp bg-purple-light-gp"
                    : "border-border hover:border-purple-gp hover:bg-purple-light-gp/40"
                }`}
                data-ocid={`bike-activities.solo.item.${i + 1}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    {act.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-display font-bold text-sm text-foreground">
                        {act.title}
                      </span>
                      {doneSolo.has(i) && (
                        <Badge className="bg-purple-gp text-white text-xs shrink-0">
                          Done ✓
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {act.desc}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ============================================================
// 2. BIKE SCAVENGER HUNT
// ============================================================

const SCAVENGER_ITEMS = [
  { emoji: "📮", text: "Find a red mailbox" },
  { emoji: "👋", text: "Wave to a neighbor and get a wave back" },
  { emoji: "🌳", text: "Ride past a park or playground" },
  { emoji: "🐕", text: "Spot a dog being walked" },
  { emoji: "💧", text: "Find a puddle to ride through" },
  { emoji: "🌸", text: "Find a flower growing outside" },
  { emoji: "🚗", text: "Count 5 cars of the same color" },
  { emoji: "🐦", text: "Hear a bird singing" },
  { emoji: "⛽", text: "Ride past a gas station" },
  { emoji: "🏫", text: "Spot a school or library" },
  { emoji: "🌈", text: "Find something with all the rainbow colors" },
  { emoji: "🍃", text: "Collect one leaf that fell on the path" },
];

export function BikeScavengerHunt() {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [celebrated, setCelebrated] = useState(false);

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else {
        next.add(i);
        if (next.size === SCAVENGER_ITEMS.length) {
          setCelebrated(true);
          toast.success("🎉 You found EVERYTHING! Amazing explorer!");
        }
      }
      return next;
    });
  };

  const handleReset = () => {
    setChecked(new Set());
    setCelebrated(false);
  };

  const pct = Math.round((checked.size / SCAVENGER_ITEMS.length) * 100);

  return (
    <div className="max-w-xl mx-auto" data-ocid="scavenger.section">
      <h2 className="font-display text-2xl font-bold text-foreground mb-1">
        🔍 Bike Scavenger Hunt
      </h2>
      <p className="text-muted-foreground text-sm mb-4">
        Take this list on your next ride! Check off everything you find. 🚲
      </p>

      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-teal-gp">
          {checked.size} / {SCAVENGER_ITEMS.length} found
        </span>
        <span className="text-xs text-muted-foreground">{pct}% complete</span>
      </div>
      <Progress value={pct} className="h-3 rounded-full mb-6" />

      {celebrated && (
        <div className="bg-teal-light-gp border-2 border-teal-gp rounded-2xl p-5 mb-6 text-center">
          <div className="text-4xl mb-2">🏆</div>
          <p className="font-display font-bold text-lg text-foreground">
            You&apos;re a Scavenger Hunt Champion!
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            You found every single item on the list. You are amazing! 🌟
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2 mb-6">
        {SCAVENGER_ITEMS.map((item, i) => (
          <button
            key={item.text}
            type="button"
            onClick={() => toggle(i)}
            className={`flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-all cursor-pointer ${
              checked.has(i)
                ? "border-teal-gp bg-teal-light-gp"
                : "border-border hover:border-teal-gp"
            }`}
            data-ocid={`scavenger.item.${i + 1}`}
          >
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                checked.has(i)
                  ? "border-teal-gp bg-teal-gp text-white"
                  : "border-border"
              }`}
            >
              {checked.has(i) && <span className="text-xs font-bold">✓</span>}
            </div>
            <span className="text-xl">{item.emoji}</span>
            <span
              className={`text-sm font-medium ${checked.has(i) ? "line-through text-muted-foreground" : "text-foreground"}`}
            >
              {item.text}
            </span>
          </button>
        ))}
      </div>

      <Button
        variant="outline"
        className="w-full rounded-full border-teal-gp text-teal-gp font-bold"
        onClick={handleReset}
        data-ocid="scavenger.secondary_button"
      >
        Reset Hunt 🔄
      </Button>
    </div>
  );
}

// ============================================================
// 3. DECORATE YOUR BIKE
// ============================================================

const DECORATION_IDEAS = [
  {
    emoji: "🎀",
    title: "Colorful Streamers",
    tip: "Thread ribbon or crepe paper strips through your handlebar holes. Use 3–5 colors for a rainbow effect!",
    color: "bg-pink-light-gp",
  },
  {
    emoji: "✨",
    title: "Sticker Collage",
    tip: "Cover your frame, fenders, and helmet with stickers from your collection. Seal with clear tape for rain protection.",
    color: "bg-yellow-light-gp",
  },
  {
    emoji: "💡",
    title: "LED Spoke Lights",
    tip: "Clip battery-powered LED strips or spoke lights to your wheels for a glowing halo effect at night. Pure magic!",
    color: "bg-teal-light-gp",
  },
  {
    emoji: "🌸",
    title: "Front Basket with Flowers",
    tip: "Weave fake or dried flowers through a wire basket for a garden-fairy look. Add a bow for extra charm!",
    color: "bg-pink-light-gp",
  },
  {
    emoji: "🔔",
    title: "Fancy Bell",
    tip: "Swap your basic bell for a flower-shaped or star bell. It's functional AND adorable — safety with style!",
    color: "bg-coral-light-gp",
  },
  {
    emoji: "🪩",
    title: "Spoke Beads",
    tip: "Thread pony beads onto your spokes and slide them to the ends. They click and clatter as you ride — so satisfying!",
    color: "bg-purple-light-gp",
  },
  {
    emoji: "🚩",
    title: "Custom Flag",
    tip: "Tape a wooden dowel to your rear wheel and attach fabric or paper with your name or a cool design. Be seen AND fabulous!",
    color: "bg-yellow-light-gp",
  },
  {
    emoji: "🎨",
    title: "Chalkboard Paint Panel",
    tip: "Paint one fender with chalkboard paint so you can write new messages with chalk on every ride!",
    color: "bg-teal-light-gp",
  },
  {
    emoji: "🔵",
    title: "Reflector Art",
    tip: "Arrange colored reflectors in a pattern on your frame — hearts, stars, or rainbows. They glow when headlights hit them!",
    color: "bg-coral-light-gp",
  },
  {
    emoji: "🤜",
    title: "Custom Handlebar Grips",
    tip: "Replace boring black grips with ones in your favorite color, or wrap them in colorful tape for a totally new look.",
    color: "bg-pink-light-gp",
  },
];

export function DecorateYourBike() {
  const [saved, setSaved] = useState<Set<number>>(new Set());

  const toggleSave = (i: number) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
        toast("Idea removed from your list 💔");
      } else {
        next.add(i);
        toast.success("Idea saved to your list! 💖");
      }
      return next;
    });
  };

  return (
    <div data-ocid="decorate.section">
      <h2 className="font-display text-2xl font-bold text-foreground mb-1">
        ✨ Decorate Your Bike
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        10 ways to make your bike a rolling work of art! Save your favorites. 💖
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {DECORATION_IDEAS.map((idea, i) => (
          <Card
            key={idea.title}
            className={`rounded-2xl border-2 border-transparent hover:border-pink-gp transition-all ${idea.color}`}
            data-ocid={`decorate.item.${i + 1}`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{idea.emoji}</span>
                  <CardTitle className="font-display text-sm font-bold text-foreground">
                    {idea.title}
                  </CardTitle>
                </div>
                <button
                  type="button"
                  onClick={() => toggleSave(i)}
                  className="text-xl transition-transform hover:scale-125 active:scale-90"
                  aria-label={saved.has(i) ? "Unsave idea" : "Save idea"}
                  data-ocid={`decorate.toggle.${i + 1}`}
                >
                  {saved.has(i) ? "❤️" : "🤍"}
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-foreground leading-relaxed">
                {idea.tip}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {saved.size > 0 && (
        <div className="mt-6 p-4 bg-pink-light-gp rounded-2xl border-2 border-pink-gp/30">
          <p className="font-display font-bold text-pink-gp text-sm">
            💖 You saved {saved.size} {saved.size === 1 ? "idea" : "ideas"} to
            try!
          </p>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 4. BIKE SAFETY STAR QUIZ
// ============================================================

const SAFETY_QUESTIONS = [
  {
    question: "How should your helmet fit on your head?",
    options: [
      "Tilted back so your forehead shows",
      "Level and 2 fingers above your eyebrows",
      "Any way feels comfortable",
      "As loose as possible so it's comfy",
    ],
    correct: 1,
    explanation:
      "A helmet should sit level, covering your forehead, with just 2 fingers of space above your eyebrows. Straps should form a V under your ears!",
  },
  {
    question:
      "You want to turn left on your bike. What hand signal should you use?",
    options: [
      "Right arm pointing left",
      "Left arm extended straight out",
      "Both arms raised above head",
      "No signal needed — just turn",
    ],
    correct: 1,
    explanation:
      "Left turn = left arm straight out! Right turn = left arm bent up OR right arm straight out. Practice these before every ride!",
  },
  {
    question: "On a road, which side should you ride on?",
    options: [
      "Left side, facing traffic",
      "Middle of the road for visibility",
      "Right side, with traffic",
      "Any side — it doesn't matter",
    ],
    correct: 2,
    explanation:
      "Always ride on the RIGHT side of the road, in the same direction as cars. This keeps you predictable and safe!",
  },
  {
    question: "You're riding at dusk. What should you do to stay safe?",
    options: [
      "Ride faster to get home quicker",
      "Wear dark colors to look cool",
      "Wear bright or reflective clothing and use lights",
      "Ride on the sidewalk only",
    ],
    correct: 2,
    explanation:
      "Bright colors + reflective gear + front/rear lights = drivers can see you from far away. Be bright, be safe!",
  },
  {
    question: "Before every ride, you should always check your…",
    options: [
      "Outfit and accessories",
      "Brakes, tires, and helmet",
      "Music playlist",
      "The weather only",
    ],
    correct: 1,
    explanation:
      "ABCs of bike safety: A = Air in tires, B = Brakes working, C = Chain clean. Check these every time before you roll out!",
  },
  {
    question: "A car is parked ahead with someone sitting in it. You should…",
    options: [
      "Ride close by to save space",
      "Honk your bell and ride through",
      "Give extra space — the door might open suddenly",
      "Ride behind the car instead",
    ],
    correct: 2,
    explanation:
      "Getting hit by a suddenly opening car door is called 'getting doored' — it's a real danger! Always give parked cars at least 3 feet of space.",
  },
];

export function BikeSafetyStar() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const q = SAFETY_QUESTIONS[currentQ];

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplanation(true);
    if (idx === q.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentQ < SAFETY_QUESTIONS.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setShowExplanation(false);
  };

  const getScoreMessage = () => {
    if (score === 6)
      return {
        emoji: "⭐",
        msg: "PERFECT SCORE! You are a certified Bike Safety Superstar! The road is ready for you!",
      };
    if (score >= 4)
      return {
        emoji: "🌟",
        msg: "Great job! You know your bike safety basics. Review the ones you missed before your next ride!",
      };
    if (score >= 2)
      return {
        emoji: "🚲",
        msg: "Good effort! Read through the tips below and try again — safety is always worth learning!",
      };
    return {
      emoji: "🛡️",
      msg: "Bike safety is super important! Read each answer explanation and try the quiz again!",
    };
  };

  if (finished) {
    const result = getScoreMessage();
    return (
      <div className="max-w-xl mx-auto text-center" data-ocid="safety.section">
        <div className="text-6xl mb-4">{result.emoji}</div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          You scored {score}/{SAFETY_QUESTIONS.length}!
        </h2>
        <div className="bg-yellow-light-gp rounded-2xl p-5 mb-6 border-2 border-yellow-gp/30">
          <p className="text-foreground text-sm leading-relaxed">
            {result.msg}
          </p>
        </div>
        {score === SAFETY_QUESTIONS.length && (
          <div className="text-5xl mb-4">🏆⭐🏆</div>
        )}
        <Button
          className="rounded-full bg-yellow-gp text-foreground font-bold px-8"
          onClick={handleRestart}
          data-ocid="safety.primary_button"
        >
          Try Again 🔄
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto" data-ocid="safety.section">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-2xl font-bold text-foreground">
          ⭐ Bike Safety Star
        </h2>
        <Badge className="bg-yellow-gp text-foreground rounded-full font-bold">
          {currentQ + 1}/{SAFETY_QUESTIONS.length}
        </Badge>
      </div>

      <div className="w-full bg-border rounded-full h-2 mb-6">
        <div
          className="bg-yellow-gp h-2 rounded-full transition-all duration-500"
          style={{
            width: `${((currentQ + 1) / SAFETY_QUESTIONS.length) * 100}%`,
          }}
        />
      </div>

      <Card className="rounded-2xl border-2 border-border mb-4">
        <CardHeader>
          <CardTitle className="font-display text-base text-foreground leading-snug">
            {q.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {q.options.map((opt, idx) => {
            let btnClass =
              "w-full text-left rounded-xl border-2 p-3 text-sm font-medium transition-all cursor-pointer";
            if (selected === null) {
              btnClass +=
                " border-border hover:border-yellow-gp hover:bg-yellow-light-gp";
            } else if (idx === q.correct) {
              btnClass +=
                " border-teal-gp bg-teal-light-gp text-teal-gp font-bold";
            } else if (selected === idx && idx !== q.correct) {
              btnClass += " border-coral-gp bg-coral-light-gp text-coral-gp";
            } else {
              btnClass += " border-border opacity-40";
            }
            return (
              <button
                // biome-ignore lint/suspicious/noArrayIndexKey: quiz answers indexed by position
                key={idx}
                type="button"
                className={btnClass}
                onClick={() => handleAnswer(idx)}
                data-ocid={`safety.item.${idx + 1}`}
              >
                {opt}
              </button>
            );
          })}
        </CardContent>
      </Card>

      {showExplanation && (
        <div className="bg-yellow-light-gp rounded-2xl p-4 mb-4 border-2 border-yellow-gp/30">
          <p className="text-sm font-medium text-foreground">
            {selected === q.correct ? "✅" : "❌"} <strong>Safety Tip:</strong>{" "}
            {q.explanation}
          </p>
        </div>
      )}

      {selected !== null && (
        <Button
          className="w-full rounded-full bg-yellow-gp text-foreground font-bold"
          onClick={handleNext}
          data-ocid="safety.primary_button"
        >
          {currentQ < SAFETY_QUESTIONS.length - 1
            ? "Next Question →"
            : "See My Badge 🏆"}
        </Button>
      )}
    </div>
  );
}

// ============================================================
// 5. BIKE PLAYLIST BUILDER
// ============================================================

const RIDE_MOODS = [
  {
    id: "chill",
    label: "Chill & Breezy",
    emoji: "🌤️",
    color: "bg-teal-light-gp border-teal-gp",
    badge: "bg-teal-gp text-white",
    playlist: {
      title: "Float & Flow",
      vibe: "Laid-back indie pop and acoustic tunes to match the breeze in your hair",
      genres: [
        {
          emoji: "🎸",
          genre: "Acoustic indie folk",
          example: "Phoebe Bridgers vibes",
        },
        {
          emoji: "🎹",
          genre: "Soft piano pop",
          example: "gentle melodies, no rush",
        },
        {
          emoji: "🌊",
          genre: "Lo-fi chill beats",
          example: "study music but on wheels",
        },
        {
          emoji: "🌿",
          genre: "Nature ambient sounds",
          example: "birds + gentle bass",
        },
        { emoji: "☀️", genre: "Dreamy synth pop", example: "soft and floaty" },
        {
          emoji: "🪗",
          genre: "Breezy bossa nova",
          example: "jazzy and relaxed",
        },
      ],
      tip: "This ride is all about noticing your surroundings. Ride slowly, look up at the sky, breathe deeply.",
    },
  },
  {
    id: "fast",
    label: "Fast & Powerful",
    emoji: "⚡",
    color: "bg-coral-light-gp border-coral-gp",
    badge: "bg-coral-gp text-white",
    playlist: {
      title: "Speed Mode ON",
      vibe: "High-energy bangers to push your legs to go faster, harder, further",
      genres: [
        {
          emoji: "🔥",
          genre: "Upbeat pop anthems",
          example: "Olivia Rodrigo energy",
        },
        {
          emoji: "💥",
          genre: "EDM & electro-pop",
          example: "drop the beat, drop the mph limit",
        },
        {
          emoji: "🥊",
          genre: "Hip-hop hype tracks",
          example: "confidence in every pedal",
        },
        {
          emoji: "🎤",
          genre: "Girl-power rock",
          example: "Paramore, Hayley Williams",
        },
        {
          emoji: "🚀",
          genre: "Drum & bass",
          example: "relentless forward momentum",
        },
        {
          emoji: "🎵",
          genre: "100–130 BPM pop",
          example: "synced to your cadence",
        },
      ],
      tip: "Set a personal distance goal before you start. Turn up the volume at the halfway point and PUSH.",
    },
  },
  {
    id: "adventure",
    label: "Adventure Mode",
    emoji: "🗺️",
    color: "bg-purple-light-gp border-purple-gp",
    badge: "bg-purple-gp text-white",
    playlist: {
      title: "Expedition Soundtrack",
      vibe: "Epic, cinematic music that makes you feel like the hero of your own movie",
      genres: [
        {
          emoji: "🎬",
          genre: "Cinematic orchestral",
          example: "Hans Zimmer on a bike",
        },
        {
          emoji: "🌄",
          genre: "Epic indie anthems",
          example: "Imagine Dragons type energy",
        },
        {
          emoji: "🔮",
          genre: "Fantasy folk",
          example: "like riding through Middle Earth",
        },
        {
          emoji: "⚔️",
          genre: "Game soundtrack vibes",
          example: "boss fight on a trail",
        },
        {
          emoji: "🌍",
          genre: "World music fusion",
          example: "global rhythms, local roads",
        },
        {
          emoji: "🎻",
          genre: "Rising strings pop",
          example: "crescendo at every hill",
        },
      ],
      tip: "Take a route you've never ridden before. Stop at three spots to look around and really SEE where you are.",
    },
  },
  {
    id: "rainy",
    label: "Rainy Day Ride",
    emoji: "🌧️",
    color: "bg-pink-light-gp border-pink-gp",
    badge: "bg-pink-gp text-white",
    playlist: {
      title: "Storm Chaser Mix",
      vibe: "Moody, beautiful music that makes the gray sky feel like a cozy blanket",
      genres: [
        {
          emoji: "🌧️",
          genre: "Rainy day indie",
          example: "Bon Iver, sad girl autumn",
        },
        { emoji: "🕯️", genre: "Soul & R&B", example: "warm voices in the cold" },
        {
          emoji: "🎷",
          genre: "Jazz standards",
          example: "Charlie Parker in the rain",
        },
        {
          emoji: "🌫️",
          genre: "Ambient electronica",
          example: "misty and mysterious",
        },
        {
          emoji: "🧣",
          genre: "Cozy bedroom pop",
          example: "like a hug in audio form",
        },
        {
          emoji: "🎻",
          genre: "Classical strings",
          example: "Debussy in a raincoat",
        },
      ],
      tip: "Gear up in your brightest waterproof layer and ride through at least one big puddle. Own the rain!",
    },
  },
];

export function BikePlaylistBuilder() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const chosen = RIDE_MOODS.find((m) => m.id === selectedMood);

  return (
    <div data-ocid="playlist.section">
      <h2 className="font-display text-2xl font-bold text-foreground mb-1">
        🎵 Ride Playlist Builder
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        Pick your ride vibe and get a themed playlist + adventure tip! 🚲
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {RIDE_MOODS.map((mood) => (
          <button
            key={mood.id}
            type="button"
            onClick={() =>
              setSelectedMood(mood.id === selectedMood ? null : mood.id)
            }
            className={`rounded-2xl border-2 p-4 text-center transition-all cursor-pointer hover:scale-105 ${
              selectedMood === mood.id
                ? mood.color
                : "border-border hover:border-pink-gp bg-card"
            }`}
            data-ocid={`playlist.item.${RIDE_MOODS.indexOf(mood) + 1}`}
          >
            <div className="text-3xl mb-2">{mood.emoji}</div>
            <div className="font-display font-bold text-sm text-foreground">
              {mood.label}
            </div>
          </button>
        ))}
      </div>

      {chosen && (
        <div className={`rounded-2xl border-2 p-5 ${chosen.color}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{chosen.emoji}</span>
            <div>
              <h3 className="font-display font-bold text-lg text-foreground">
                {chosen.playlist.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {chosen.playlist.vibe}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {chosen.playlist.genres.map((g, i) => (
              <div
                key={g.genre}
                className="flex items-center gap-2 bg-white/60 rounded-xl p-3"
                data-ocid={`playlist.item.${i + 1}`}
              >
                <span className="text-lg">{g.emoji}</span>
                <div>
                  <p className="text-xs font-bold text-foreground">{g.genre}</p>
                  <p className="text-xs text-muted-foreground">{g.example}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/70 rounded-xl p-4">
            <p className="text-sm font-medium text-foreground">
              <strong>🎯 Ride Tip:</strong> {chosen.playlist.tip}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 6. BIKE RIDE LOG
// ============================================================

interface RideEntry {
  id: string;
  name: string;
  miles: string;
  mood: string;
  date: string;
}

interface RideGoal {
  id: string;
  text: string;
  done: boolean;
}

const MOOD_OPTIONS = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😄", label: "Excited" },
  { emoji: "🥵", label: "Tired but proud" },
  { emoji: "😎", label: "Cool & confident" },
];

export function BikeRideLog() {
  const [rides, setRides] = useState<RideEntry[]>([]);
  const [goals, setGoals] = useState<RideGoal[]>([]);
  const [rideName, setRideName] = useState("");
  const [rideMiles, setRideMiles] = useState("");
  const [rideMood, setRideMood] = useState<string>("😊");
  const [goalText, setGoalText] = useState("");

  useEffect(() => {
    try {
      const savedRides = localStorage.getItem("gph-bike-rides");
      const savedGoals = localStorage.getItem("gph-bike-goals");
      if (savedRides) setRides(JSON.parse(savedRides));
      if (savedGoals) setGoals(JSON.parse(savedGoals));
    } catch {
      /* ignore */
    }
  }, []);

  const saveRides = (updated: RideEntry[]) => {
    setRides(updated);
    localStorage.setItem("gph-bike-rides", JSON.stringify(updated));
  };

  const saveGoals = (updated: RideGoal[]) => {
    setGoals(updated);
    localStorage.setItem("gph-bike-goals", JSON.stringify(updated));
  };

  const handleLogRide = () => {
    if (!rideName.trim()) {
      toast.error("Give your ride a name! 🚲");
      return;
    }
    if (!rideMiles.trim() || Number.isNaN(Number(rideMiles))) {
      toast.error("Enter a valid distance in miles!");
      return;
    }
    const entry: RideEntry = {
      id: Date.now().toString(),
      name: rideName.trim(),
      miles: rideMiles.trim(),
      mood: rideMood,
      date: new Date().toLocaleDateString(),
    };
    saveRides([entry, ...rides].slice(0, 10));
    toast.success(`Ride logged! You rode ${rideMiles} miles! 🚴‍♀️`);
    setRideName("");
    setRideMiles("");
    setRideMood("😊");
  };

  const handleDeleteRide = (id: string) => {
    saveRides(rides.filter((r) => r.id !== id));
    toast("Ride removed 🗑️");
  };

  const handleAddGoal = () => {
    if (!goalText.trim()) {
      toast.error("Write your goal first!");
      return;
    }
    const goal: RideGoal = {
      id: Date.now().toString(),
      text: goalText.trim(),
      done: false,
    };
    saveGoals([...goals, goal]);
    setGoalText("");
    toast.success("Goal added! You got this! 🎯");
  };

  const toggleGoal = (id: string) => {
    const updated = goals.map((g) =>
      g.id === id ? { ...g, done: !g.done } : g,
    );
    saveGoals(updated);
  };

  const deleteGoal = (id: string) => {
    saveGoals(goals.filter((g) => g.id !== id));
  };

  const totalMiles = rides
    .reduce((sum, r) => sum + (Number.parseFloat(r.miles) || 0), 0)
    .toFixed(1);

  return (
    <div className="max-w-xl mx-auto" data-ocid="ridelog.section">
      <h2 className="font-display text-2xl font-bold text-foreground mb-1">
        📋 Ride Log & Goals
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        Track every ride and set goals to stay motivated! 🚲✨
      </p>

      {/* Log a Ride */}
      <Card className="rounded-2xl border-2 border-teal-gp/30 bg-teal-light-gp mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base font-bold text-foreground">
            🚴‍♀️ Log a New Ride
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div>
            <label
              htmlFor="ride-name"
              className="text-xs font-bold text-foreground mb-1 block"
            >
              Ride Name
            </label>
            <Input
              id="ride-name"
              value={rideName}
              onChange={(e) => setRideName(e.target.value)}
              placeholder="e.g., Park Loop, Neighborhood Cruise..."
              className="rounded-xl border-2 border-border bg-white focus:border-teal-gp"
              data-ocid="ridelog.input"
            />
          </div>
          <div>
            <label
              htmlFor="ride-miles"
              className="text-xs font-bold text-foreground mb-1 block"
            >
              Distance (miles)
            </label>
            <Input
              id="ride-miles"
              type="number"
              min="0"
              step="0.1"
              value={rideMiles}
              onChange={(e) => setRideMiles(e.target.value)}
              placeholder="e.g., 2.5"
              className="rounded-xl border-2 border-border bg-white focus:border-teal-gp"
              data-ocid="ridelog.input"
            />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground mb-2">
              How did you feel?
            </p>
            <div className="flex gap-2">
              {MOOD_OPTIONS.map((m) => (
                <button
                  key={m.emoji}
                  type="button"
                  onClick={() => setRideMood(m.emoji)}
                  title={m.label}
                  className={`text-2xl rounded-full w-10 h-10 flex items-center justify-center transition-all border-2 ${
                    rideMood === m.emoji
                      ? "border-teal-gp bg-white scale-110"
                      : "border-transparent hover:border-teal-gp hover:bg-white/60"
                  }`}
                  data-ocid="ridelog.toggle"
                >
                  {m.emoji}
                </button>
              ))}
            </div>
          </div>
          <Button
            className="w-full rounded-full bg-teal-gp text-white font-bold"
            onClick={handleLogRide}
            data-ocid="ridelog.primary_button"
          >
            Log This Ride 🚲
          </Button>
        </CardContent>
      </Card>

      {/* Stats */}
      {rides.length > 0 && (
        <div className="bg-yellow-light-gp border-2 border-yellow-gp/30 rounded-2xl p-4 mb-6 text-center">
          <div className="text-3xl font-display font-bold text-foreground">
            🏁 {totalMiles} miles
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Total miles ridden across {rides.length}{" "}
            {rides.length === 1 ? "ride" : "rides"}!
          </p>
        </div>
      )}

      {/* Ride History */}
      <div className="mb-6">
        <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wider mb-3">
          Ride History
        </h3>
        {rides.length === 0 ? (
          <div
            className="text-center py-8 border-2 border-dashed border-border rounded-2xl"
            data-ocid="ridelog.empty_state"
          >
            <div className="text-3xl mb-2">🚲</div>
            <p className="text-muted-foreground text-sm">
              No rides logged yet. Go explore!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2" data-ocid="ridelog.list">
            {rides.map((ride, i) => (
              <div
                key={ride.id}
                className="flex items-center gap-3 bg-card border-2 border-border rounded-xl p-3"
                data-ocid={`ridelog.item.${i + 1}`}
              >
                <span className="text-2xl">{ride.mood}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-foreground truncate">
                    {ride.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {ride.miles} miles · {ride.date}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteRide(ride.id)}
                  className="text-muted-foreground hover:text-coral-gp text-xs font-bold shrink-0 transition-colors"
                  data-ocid={`ridelog.delete_button.${i + 1}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Goals Section */}
      <div>
        <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wider mb-3">
          🎯 My Riding Goals
        </h3>
        <div className="flex gap-2 mb-4">
          <Input
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
            placeholder="e.g., Ride 10 miles this week..."
            className="flex-1 rounded-full border-2 border-border focus:border-pink-gp bg-card"
            onKeyDown={(e) => e.key === "Enter" && handleAddGoal()}
            data-ocid="ridelog.input"
          />
          <Button
            className="rounded-full bg-pink-gp text-white font-bold px-5 shrink-0"
            onClick={handleAddGoal}
            data-ocid="ridelog.primary_button"
          >
            Add 🎯
          </Button>
        </div>

        {goals.length === 0 ? (
          <div
            className="text-center py-6 border-2 border-dashed border-border rounded-2xl"
            data-ocid="ridelog.empty_state"
          >
            <p className="text-muted-foreground text-sm">
              Set your first riding goal above! 🌟
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {goals.map((goal, i) => (
              <div
                key={goal.id}
                className={`flex items-center gap-3 rounded-xl border-2 p-3 transition-all ${
                  goal.done
                    ? "border-teal-gp bg-teal-light-gp"
                    : "border-border bg-card"
                }`}
                data-ocid={`ridelog.item.${i + 1}`}
              >
                <button
                  type="button"
                  onClick={() => toggleGoal(goal.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    goal.done
                      ? "border-teal-gp bg-teal-gp text-white"
                      : "border-border hover:border-teal-gp"
                  }`}
                  data-ocid={`ridelog.toggle.${i + 1}`}
                >
                  {goal.done && <span className="text-xs font-bold">✓</span>}
                </button>
                <p
                  className={`flex-1 text-sm ${goal.done ? "line-through text-muted-foreground" : "text-foreground font-medium"}`}
                >
                  {goal.text}
                </p>
                <button
                  type="button"
                  onClick={() => deleteGoal(goal.id)}
                  className="text-muted-foreground hover:text-coral-gp text-xs font-bold shrink-0 transition-colors"
                  data-ocid={`ridelog.delete_button.${i + 1}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
