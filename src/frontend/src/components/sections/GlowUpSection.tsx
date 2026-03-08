import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ============================================================
// SHARED STYLES & HELPERS
// ============================================================

const sectionHeader = (
  emoji: string,
  title: string,
  subtitle: string,
  accentClass = "text-pink-gp",
) => (
  <div className="text-center mb-8">
    <div className="text-5xl mb-3">{emoji}</div>
    <h2 className={`font-display text-3xl font-bold mb-2 ${accentClass}`}>
      {title}
    </h2>
    <p className="text-muted-foreground text-base max-w-lg mx-auto">
      {subtitle}
    </p>
  </div>
);

// ============================================================
// 1. CONFIDENCE KARAOKE
// ============================================================
const KARAOKE_LYRICS = [
  "Who run the world? Girls! 👑",
  "She believed she could, so she did ✨",
  "I am fierce, I am brave, I am ME! 🦁",
  "Brave enough to dream, bold enough to do it! 🚀",
  "I'm not just a girl — I'm a FORCE! ⚡",
  "Kind heart. Fierce mind. Brave spirit. 💖",
  "The future belongs to girls who dare! 🌟",
  "She is strength, she is grace, she is unstoppable! 🎯",
];

const SCORE_LABELS = [
  "LEGENDARY! 🏆",
  "ICONIC! 👑",
  "SUPERSTAR! 🌟",
  "BLAZING HOT! 🔥",
  "ABSOLUTELY ELECTRIC! ⚡",
];

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  size: number;
}

function Confetti({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }
    const colors = [
      "#ff69b4",
      "#da70d6",
      "#20b2aa",
      "#ffd700",
      "#ff6347",
      "#9370db",
      "#87ceeb",
    ];
    const newParticles: Particle[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      size: 6 + Math.random() * 8,
    }));
    setParticles(newParticles);
  }, [active]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-bounce"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            transform: `rotate(${p.rotation}deg)`,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animation: `confettiFall ${1.5 + Math.random() * 2}s ease-in forwards`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}

export function ConfidenceKaraoke() {
  const [currentLyric, setCurrentLyric] = useState(KARAOKE_LYRICS[0]);
  const [customLyric, setCustomLyric] = useState("");
  const [performing, setPerforming] = useState(false);
  const [micDrop, setMicDrop] = useState(false);
  const [lightColor, setLightColor] = useState("#ff69b4");
  const [scoreLabel] = useState(
    SCORE_LABELS[Math.floor(Math.random() * SCORE_LABELS.length)],
  );
  const lightRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stageLyric = customLyric.trim() || currentLyric;

  const performIt = () => {
    setPerforming(true);
    setMicDrop(false);
    const colors = [
      "#ff69b4",
      "#9370db",
      "#20b2aa",
      "#ffd700",
      "#ff6347",
      "#87ceeb",
    ];
    let idx = 0;
    lightRef.current = setInterval(() => {
      setLightColor(colors[idx % colors.length]);
      idx++;
    }, 200);
    setTimeout(() => {
      if (lightRef.current) clearInterval(lightRef.current);
      setLightColor("#ff69b4");
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (lightRef.current) clearInterval(lightRef.current);
    };
  }, []);

  const handleMicDrop = () => {
    setMicDrop(true);
    setPerforming(false);
    toast.success("🎤 MIC DROP! You absolutely SLAYED!");
  };

  if (micDrop) {
    return (
      <div
        className="relative min-h-96 flex flex-col items-center justify-center text-center p-8 overflow-hidden rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, #1a0025 0%, #2d0047 50%, #001a33 100%)",
        }}
      >
        <Confetti active={true} />
        <div className="relative z-20">
          <div className="text-8xl mb-4 animate-bounce">🎤</div>
          <h3 className="font-display text-4xl font-bold text-white mb-3">
            MIC DROP!
          </h3>
          <div className="text-6xl mb-4">💥</div>
          <p className="text-2xl font-bold text-yellow-300 mb-2">
            ABSOLUTE LEGEND!
          </p>
          <p className="text-white/80 mb-6">
            The crowd goes WILD for you! 🔥🔥🔥
          </p>
          <Button
            className="bg-white text-pink-700 font-bold text-lg rounded-full px-8 py-3"
            onClick={() => {
              setMicDrop(false);
              setPerforming(false);
            }}
            data-ocid="karaoke.button"
          >
            🎤 Perform Again!
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {sectionHeader(
        "🎤",
        "Confidence Karaoke",
        "Step onto the stage and OWN it! Sing your power lyric and become a LEGEND!",
        "text-pink-gp",
      )}

      {/* Stage */}
      <div
        className="relative rounded-2xl overflow-hidden mb-6 min-h-64 flex flex-col items-center justify-center p-8"
        style={{
          background: performing
            ? `radial-gradient(ellipse at center, ${lightColor}44 0%, #1a0025 70%)`
            : "linear-gradient(135deg, #1a0025 0%, #2d0047 50%, #001a33 100%)",
          transition: "background 0.2s ease",
          boxShadow: performing ? `0 0 40px ${lightColor}66` : "none",
        }}
      >
        <Confetti active={performing} />
        {/* Stars */}
        {(["⭐", "✨", "💫", "🌟", "⚡"] as const).map((star, i) => (
          <span
            key={star}
            className="absolute text-2xl opacity-60"
            style={{
              top: `${10 + i * 15}%`,
              left: `${5 + i * 18}%`,
              animation: `float ${2 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {star}
          </span>
        ))}
        {(["✨-right", "💖-right", "🌟-right"] as const).map((starKey, i) => {
          const star = starKey.replace("-right", "");
          return (
            <span
              key={starKey}
              className="absolute text-xl opacity-50"
              style={{
                top: `${20 + i * 20}%`,
                right: `${5 + i * 15}%`,
                animation: `float ${1.8 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${0.5 + i * 0.4}s`,
              }}
            >
              {star}
            </span>
          );
        })}

        <div className="relative z-10 text-center">
          {performing && (
            <div className="mb-3">
              <Badge className="bg-yellow-400 text-black font-bold text-lg px-4 py-1 animate-pulse">
                100/100 — {scoreLabel}
              </Badge>
            </div>
          )}
          <p className="font-display text-2xl sm:text-3xl font-bold text-white drop-shadow-lg leading-tight max-w-md">
            {stageLyric}
          </p>
          {performing && <div className="text-3xl mt-3">🎤🎵🎤🎵🎤</div>}
        </div>
      </div>

      {/* Lyric Picker */}
      <div className="mb-4">
        <p className="font-bold text-sm text-muted-foreground uppercase tracking-wide mb-2">
          ✨ Choose a Power Lyric
        </p>
        <div className="flex flex-wrap gap-2">
          {KARAOKE_LYRICS.map((lyric) => (
            <button
              key={lyric}
              type="button"
              className={`px-3 py-2 rounded-full text-sm font-bold transition-all border-2 ${
                currentLyric === lyric && !customLyric
                  ? "bg-pink-gp text-white border-transparent"
                  : "bg-pink-light-gp border-transparent hover:border-pink-gp"
              }`}
              onClick={() => {
                setCurrentLyric(lyric);
                setCustomLyric("");
              }}
              data-ocid="karaoke.toggle"
            >
              {lyric.slice(0, 30)}…
            </button>
          ))}
        </div>
      </div>

      {/* Custom Lyric */}
      <div className="mb-6">
        <p className="font-bold text-sm text-muted-foreground uppercase tracking-wide mb-2">
          💖 Or Write Your OWN Power Lyric
        </p>
        <Textarea
          placeholder="I am brave because..."
          value={customLyric}
          onChange={(e) => setCustomLyric(e.target.value)}
          className="rounded-xl border-2 border-pink-gp/30 focus:border-pink-gp resize-none"
          rows={2}
          data-ocid="karaoke.textarea"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          size="lg"
          className="bg-pink-gp hover:opacity-90 text-white font-display font-bold text-xl rounded-full px-10 py-6 shadow-lg flex-1"
          onClick={performIt}
          disabled={performing}
          data-ocid="karaoke.primary_button"
        >
          {performing ? "🔥 YOU'RE ON FIRE!" : "🎤 PERFORM!"}
        </Button>
        {performing && (
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-yellow-400 text-yellow-600 font-display font-bold text-lg rounded-full px-8 py-6"
            onClick={handleMicDrop}
            data-ocid="karaoke.secondary_button"
          >
            🎤 MIC DROP!
          </Button>
        )}
      </div>
    </div>
  );
}

// ============================================================
// 2. SUPERPOWER SELECTOR
// ============================================================
const SUPERPOWER_QUESTIONS = [
  {
    q: "When your friend is sad, you...",
    options: [
      { text: "Listen and give the best hugs 🤗", value: "empathy" },
      { text: "Make them laugh with a goofy joke 😂", value: "laughter" },
      { text: "Make them something creative 🎨", value: "creative" },
      { text: "Come up with a plan to fix things 💡", value: "brave" },
    ],
  },
  {
    q: "Your dream Saturday is...",
    options: [
      { text: "Painting or crafting all day 🎨", value: "creative" },
      { text: "Helping at an animal shelter 🐾", value: "nature" },
      { text: "Learning about space or science 🔬", value: "science" },
      { text: "Dancing and performing 💃", value: "laughter" },
    ],
  },
  {
    q: "Your superpower would be...",
    options: [
      { text: "Reading minds to understand feelings 💭", value: "empathy" },
      { text: "Creating anything from nothing ✨", value: "creative" },
      { text: "Being fearless in any situation 🦁", value: "brave" },
      { text: "Healing people with kindness 💚", value: "nature" },
    ],
  },
  {
    q: "Your friends come to you when they need...",
    options: [
      { text: "Someone who truly listens 👂", value: "empathy" },
      { text: "Clever ideas and solutions 🧠", value: "science" },
      { text: "A good laugh or adventure 🎉", value: "laughter" },
      { text: "Courage to face something scary 💪", value: "brave" },
    ],
  },
  {
    q: "Your dream job is...",
    options: [
      { text: "Scientist or inventor 🔬", value: "science" },
      { text: "Artist, musician, or actor 🎭", value: "creative" },
      { text: "Wildlife protector or gardener 🌿", value: "nature" },
      { text: "Leader, activist, or explorer 🌍", value: "brave" },
    ],
  },
];

interface Superpower {
  name: string;
  emoji: string;
  color: string;
  description: string;
  traits: string[];
}

const SUPERPOWERS: Record<string, Superpower> = {
  empathy: {
    name: "Empathy Queen",
    emoji: "💖",
    color: "from-pink-400 to-rose-500",
    description:
      "You feel deeply and make everyone around you feel seen and loved. Your heart is your superpower!",
    traits: [
      "Incredible listener",
      "Emotionally wise",
      "Makes people feel safe",
      "Builds deep friendships",
    ],
  },
  creative: {
    name: "Creative Genius",
    emoji: "🎨",
    color: "from-violet-500 to-purple-600",
    description:
      "Your imagination has no limits! You see the world in ways others never could and turn ideas into magic.",
    traits: [
      "Wildly inventive",
      "Sees beauty everywhere",
      "Makes art from nothing",
      "Solves problems creatively",
    ],
  },
  brave: {
    name: "Brave Heart",
    emoji: "🦁",
    color: "from-orange-400 to-coral-500",
    description:
      "Fear? What's that? You charge forward with courage and inspire everyone around you to be bold.",
    traits: [
      "Fearless leader",
      "Speaks truth boldly",
      "Protects others",
      "Faces challenges head-on",
    ],
  },
  science: {
    name: "Science Star",
    emoji: "🔬",
    color: "from-teal-400 to-cyan-500",
    description:
      "Your curious mind asks 'Why?' about everything. You'll discover things that change the world!",
    traits: [
      "Super curious",
      "Loves experiments",
      "Thinks logically",
      "Solves mysteries",
    ],
  },
  nature: {
    name: "Nature Guardian",
    emoji: "🌿",
    color: "from-green-400 to-emerald-500",
    description:
      "You're connected to the living world. Animals trust you, plants thrive near you, and Earth needs you!",
    traits: [
      "Animal whisperer",
      "Earth protector",
      "Patient and wise",
      "Finds peace outdoors",
    ],
  },
  laughter: {
    name: "Laughter Healer",
    emoji: "😄",
    color: "from-yellow-400 to-amber-500",
    description:
      "Your laugh is contagious! You bring joy everywhere you go and remind everyone that life is beautiful.",
    traits: [
      "Spreads pure joy",
      "Uplifts any room",
      "Sees the bright side",
      "Heals hearts with humor",
    ],
  },
};

function tally(answers: string[]): string {
  const counts: Record<string, number> = {};
  for (const a of answers) {
    counts[a] = (counts[a] || 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

export function SuperpowerSelector() {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<Superpower | null>(null);
  const [showCard, setShowCard] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    if (questionIdx < SUPERPOWER_QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setQuestionIdx(questionIdx + 1);
    } else {
      const sp = SUPERPOWERS[tally(newAnswers)];
      setUnlocking(true);
      setTimeout(() => {
        setResult(sp);
        setUnlocking(false);
      }, 1500);
    }
  };

  const reset = () => {
    setQuestionIdx(0);
    setAnswers([]);
    setResult(null);
    setShowCard(false);
    setUnlocking(false);
  };

  if (unlocking) {
    return (
      <div className="text-center py-16">
        {sectionHeader(
          "🦸‍♀️",
          "Superpower Selector",
          "Discovering your unique superpower...",
          "text-purple-gp",
        )}
        <div className="text-6xl animate-spin mb-4">✨</div>
        <p className="text-xl font-bold text-purple-gp animate-pulse">
          Unlocking your superpower...
        </p>
      </div>
    );
  }

  if (result) {
    return (
      <div>
        {sectionHeader(
          "🦸‍♀️",
          "Your Superpower is Revealed!",
          "You are extraordinary!",
          "text-purple-gp",
        )}
        <div
          className={`relative rounded-3xl p-8 bg-gradient-to-br ${result.color} text-white text-center mb-6 shadow-2xl`}
        >
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 70%)",
            }}
          />
          <Confetti active={true} />
          <div className="relative z-10">
            <div className="text-8xl mb-4">{result.emoji}</div>
            <h3 className="font-display text-4xl font-bold mb-3">
              {result.name}
            </h3>
            <p className="text-lg text-white/90 max-w-md mx-auto mb-6">
              {result.description}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {result.traits.map((trait) => (
                <span
                  key={trait}
                  className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-sm font-bold"
                >
                  ✨ {trait}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                className="bg-white text-gray-800 font-bold rounded-full px-8"
                onClick={() => setShowCard(!showCard)}
                data-ocid="superpower.secondary_button"
              >
                {showCard ? "Hide Card" : "📋 Share Your Superpower!"}
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/20 rounded-full px-8"
                onClick={reset}
                data-ocid="superpower.button"
              >
                🔄 Retake Quiz
              </Button>
            </div>
          </div>
        </div>

        {showCard && (
          <div
            className={`rounded-3xl p-6 bg-gradient-to-br ${result.color} text-white text-center border-4 border-white/50`}
            data-ocid="superpower.card"
          >
            <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">
              ✨ Official Certificate ✨
            </p>
            <p className="text-xl font-bold mb-1">This certifies that</p>
            <p className="text-3xl font-display font-bold mb-1">⭐ YOU ⭐</p>
            <p className="text-xl mb-2">possess the superpower of</p>
            <p className="text-4xl font-display font-bold">
              {result.emoji} {result.name}
            </p>
            <div className="mt-4 text-4xl">🌟💫⭐</div>
          </div>
        )}
      </div>
    );
  }

  const q = SUPERPOWER_QUESTIONS[questionIdx];
  const progress = (questionIdx / SUPERPOWER_QUESTIONS.length) * 100;

  return (
    <div>
      {sectionHeader(
        "🦸‍♀️",
        "Superpower Selector",
        "Answer 5 questions to reveal your unique superpower!",
        "text-purple-gp",
      )}

      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>
            Question {questionIdx + 1} of {SUPERPOWER_QUESTIONS.length}
          </span>
          <span>{Math.round(progress)}% done</span>
        </div>
        <Progress
          value={progress}
          className="h-3 rounded-full"
          data-ocid="superpower.loading_state"
        />
      </div>

      <Card
        className="border-2 border-purple-gp/30 shadow-lg"
        data-ocid="superpower.card"
      >
        <CardContent className="p-6">
          <p className="font-display text-xl font-bold text-foreground mb-6 text-center">
            {q.q}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {q.options.map((opt) => (
              <button
                key={opt.text}
                type="button"
                className="p-4 rounded-2xl text-left font-bold transition-all border-2 border-purple-gp/20 bg-purple-light-gp hover:border-purple-gp hover:scale-105 hover:shadow-md"
                onClick={() => handleAnswer(opt.value)}
                data-ocid="superpower.button"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {questionIdx > 0 && (
        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            data-ocid="superpower.secondary_button"
          >
            ← Start Over
          </Button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 3. COMPLIMENT CANNON
// ============================================================
const COMPLIMENT_PACKS: Record<
  string,
  { label: string; emoji: string; color: string; compliments: string[] }
> = {
  brave: {
    label: "Brave",
    emoji: "🦁",
    color: "from-orange-400 to-red-500",
    compliments: [
      "You are braver than you believe! Every single day. 🦁",
      "Your courage lights up every room you walk into! 🔥",
      "You face fears that others run from. That is RARE. ⚡",
      "The bravest thing you do? Being exactly who you are. 💪",
      "You spoke up when it was hard. That took GUTS. 🌟",
      "Heroes aren't born — you're making yourself one, right now. 👑",
      "Your boldness gives others permission to be bold too. 🚀",
    ],
  },
  creative: {
    label: "Creative",
    emoji: "🎨",
    color: "from-purple-500 to-pink-500",
    compliments: [
      "Your imagination is a universe that never stops expanding! 🎨",
      "You see beauty in places others never think to look. ✨",
      "You don't just think outside the box — you toss the box away! 🎭",
      "Every idea you have is a tiny spark that could change the world. 💡",
      "Your creativity is like a superpower — and it's UNIQUELY yours! 🌈",
      "Artists change the world. So do you. Every single day. 🖌️",
      "The world needs your creative voice NOW more than ever. 🎵",
    ],
  },
  kind: {
    label: "Kind",
    emoji: "💖",
    color: "from-pink-400 to-rose-500",
    compliments: [
      "Your kindness creates ripples that reach people you'll never even meet. 💖",
      "The world is warmer because YOU are in it. 🌞",
      "You notice people who feel invisible — that is a rare and beautiful gift. 🤗",
      "Your heart is so big, it's a wonder it fits in your chest! 💝",
      "You make people feel like they matter. Because they do — and so do YOU. 🌸",
      "Kindness is a muscle — and yours is INCREDIBLY strong. 💪",
      "You are someone's reason to smile today. Never forget that! 😊",
    ],
  },
};

export function ComplimentCannon() {
  const [activePack, setActivePack] = useState<string | null>(null);
  const [compliment, setCompliment] = useState<string | null>(null);
  const [firing, setFiring] = useState(false);
  const [gallery, setGallery] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("gph_glow_compliments") || "[]");
    } catch {
      return [];
    }
  });

  const fire = () => {
    if (!activePack) return;
    setFiring(true);
    setTimeout(() => {
      const pack = COMPLIMENT_PACKS[activePack];
      const random =
        pack.compliments[Math.floor(Math.random() * pack.compliments.length)];
      setCompliment(random);
      setFiring(false);
    }, 800);
  };

  const saveCompliment = () => {
    if (!compliment) return;
    const newGallery = [compliment, ...gallery].slice(0, 5);
    setGallery(newGallery);
    localStorage.setItem("gph_glow_compliments", JSON.stringify(newGallery));
    toast.success("💖 Saved to your Compliment Gallery!");
  };

  const pack = activePack ? COMPLIMENT_PACKS[activePack] : null;

  return (
    <div>
      {sectionHeader(
        "🎉",
        "Compliment Cannon",
        "Pick a pack, FIRE the cannon, and let the magic hit you! 💥",
        "text-coral-gp",
      )}

      {/* Pack Selection */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {Object.entries(COMPLIMENT_PACKS).map(([key, p]) => (
          <button
            key={key}
            type="button"
            className={`p-4 rounded-2xl text-center font-bold transition-all border-2 ${
              activePack === key
                ? "border-transparent shadow-lg scale-105"
                : "border-transparent bg-muted/30 hover:scale-102"
            } bg-gradient-to-br ${p.color} text-white`}
            onClick={() => {
              setActivePack(key);
              setCompliment(null);
            }}
            data-ocid="cannon.toggle"
          >
            <div className="text-3xl mb-1">{p.emoji}</div>
            <div className="text-sm">{p.label}</div>
          </button>
        ))}
      </div>

      {/* Cannon + Result */}
      <div
        className={`relative rounded-2xl min-h-48 flex flex-col items-center justify-center p-6 text-white text-center mb-4 overflow-hidden ${pack ? `bg-gradient-to-br ${pack.color}` : "bg-muted"}`}
      >
        {firing && <div className="text-6xl animate-bounce">💥</div>}
        {!firing && compliment && (
          <>
            <Confetti active={true} />
            <div className="relative z-10">
              <div className="text-3xl mb-3">🎉</div>
              <p className="font-display text-xl font-bold leading-relaxed max-w-sm">
                {compliment}
              </p>
            </div>
          </>
        )}
        {!firing && !compliment && activePack && (
          <div>
            <div className="text-5xl mb-2">💣</div>
            <p className="font-bold text-lg">BOOM! Here it comes...</p>
            <p className="opacity-75 text-sm">Ready to fire? Hit the button!</p>
          </div>
        )}
        {!activePack && (
          <div>
            <p className="text-muted-foreground font-bold text-lg">
              👆 Choose a compliment pack first!
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <Button
          size="lg"
          className="flex-1 bg-coral-gp text-white font-display font-bold text-lg rounded-full shadow-lg"
          disabled={!activePack || firing}
          onClick={fire}
          data-ocid="cannon.primary_button"
        >
          {firing ? "💥 FIRING..." : "FIRE! 🎉"}
        </Button>
        {compliment && (
          <Button
            variant="outline"
            className="border-2 border-coral-gp text-coral-gp font-bold rounded-full"
            onClick={saveCompliment}
            disabled={gallery.length >= 5 && gallery.includes(compliment)}
            data-ocid="cannon.secondary_button"
          >
            💾 Save it!
          </Button>
        )}
      </div>

      {/* Gallery */}
      {gallery.length > 0 && (
        <div>
          <h3 className="font-display font-bold text-lg mb-3 text-coral-gp">
            💖 My Compliment Gallery
          </h3>
          <div className="flex flex-col gap-2" data-ocid="cannon.list">
            {gallery.map((c, i) => (
              <div
                key={c}
                className="p-3 rounded-xl bg-coral-light-gp border border-coral-gp/20 text-sm font-medium"
                data-ocid={`cannon.item.${i + 1}`}
              >
                {c}
              </div>
            ))}
          </div>
          {gallery.length >= 5 && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Gallery full (5/5) — clear to add more
            </p>
          )}
        </div>
      )}

      {gallery.length === 0 && (
        <div
          className="text-center py-4 text-muted-foreground text-sm"
          data-ocid="cannon.empty_state"
        >
          Your gallery is empty — fire the cannon and save your favorites! 💖
        </div>
      )}
    </div>
  );
}

// ============================================================
// 4. DREAM DAY PLANNER
// ============================================================
const HOUR_SLOTS = [
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
  "8pm",
  "9pm",
];

const ACTIVITIES = [
  { emoji: "🏖️", label: "Beach" },
  { emoji: "🎨", label: "Art" },
  { emoji: "📚", label: "Reading" },
  { emoji: "💃", label: "Dancing" },
  { emoji: "🍳", label: "Cooking" },
  { emoji: "👭", label: "Friends" },
  { emoji: "🐾", label: "Animals" },
  { emoji: "⚽", label: "Sports" },
  { emoji: "🎵", label: "Music" },
  { emoji: "🎬", label: "Movies" },
  { emoji: "🌿", label: "Nature" },
  { emoji: "🎮", label: "Gaming" },
  { emoji: "✈️", label: "Travel" },
  { emoji: "🛁", label: "Spa" },
  { emoji: "🍰", label: "Baking" },
];

const MOODS = [
  { emoji: "☀️", label: "Sunshine" },
  { emoji: "🛋️", label: "Cozy" },
  { emoji: "🗺️", label: "Adventurous" },
  { emoji: "🎨", label: "Creative" },
  { emoji: "🌙", label: "Calm" },
  { emoji: "🎉", label: "Social" },
];

const DREAM_PEOPLE = [
  { emoji: "👭", label: "BFF" },
  { emoji: "👩‍👧", label: "Mom" },
  { emoji: "👧", label: "Sister" },
  { emoji: "🐶", label: "Dog" },
  { emoji: "🧚", label: "Fairy" },
  { emoji: "🦸‍♀️", label: "Hero" },
  { emoji: "🌟", label: "Idol" },
  { emoji: "🐱", label: "Cat" },
];

export function DreamDayPlanner() {
  const [schedule, setSchedule] = useState<Record<string, string>>({});
  const [mood, setMood] = useState<string | null>(null);
  const [dreamPeople, setDreamPeople] = useState<string[]>([]);
  const [cardVisible, setCardVisible] = useState(false);

  const toggleActivity = (hour: string, emoji: string) => {
    setSchedule((prev) => ({
      ...prev,
      [hour]: prev[hour] === emoji ? "" : emoji,
    }));
  };

  const togglePerson = (person: string) => {
    setDreamPeople((prev) =>
      prev.includes(person)
        ? prev.filter((p) => p !== person)
        : prev.length < 3
          ? [...prev, person]
          : prev,
    );
  };

  const filledHours = Object.values(schedule).filter(Boolean).length;
  const canGenerate = filledHours >= 3 && mood && dreamPeople.length > 0;

  return (
    <div>
      {sectionHeader(
        "🌈",
        "Dream Day Planner",
        "Design your perfect day — every magical hour of it!",
        "text-purple-gp",
      )}

      {/* Mood */}
      <div className="mb-6">
        <h3 className="font-display font-bold text-lg mb-3">
          🌟 What's the vibe of your day?
        </h3>
        <div className="flex flex-wrap gap-2">
          {MOODS.map((m) => (
            <button
              key={m.label}
              type="button"
              className={`px-4 py-2 rounded-full font-bold text-sm border-2 transition-all ${
                mood === m.label
                  ? "bg-purple-gp text-white border-transparent"
                  : "border-purple-gp/30 hover:border-purple-gp"
              }`}
              onClick={() => setMood(m.label)}
              data-ocid="planner.toggle"
            >
              {m.emoji} {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dream People */}
      <div className="mb-6">
        <h3 className="font-display font-bold text-lg mb-1">
          💖 Pick up to 3 dream companions
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          {dreamPeople.length}/3 chosen
        </p>
        <div className="flex flex-wrap gap-2">
          {DREAM_PEOPLE.map((p) => (
            <button
              key={p.label}
              type="button"
              className={`px-3 py-2 rounded-full font-bold text-sm border-2 transition-all ${
                dreamPeople.includes(p.label)
                  ? "bg-pink-gp text-white border-transparent"
                  : "border-pink-gp/30 hover:border-pink-gp"
              }`}
              onClick={() => togglePerson(p.label)}
              data-ocid="planner.toggle"
            >
              {p.emoji} {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hourly Schedule */}
      <div className="mb-6">
        <h3 className="font-display font-bold text-lg mb-3">
          ⏰ Plan your hours
        </h3>
        <div className="grid gap-2">
          {HOUR_SLOTS.map((hour) => (
            <div key={hour} className="flex items-center gap-3">
              <span className="font-bold text-sm w-10 text-right text-muted-foreground shrink-0">
                {hour}
              </span>
              <div className="flex flex-wrap gap-1 flex-1">
                {ACTIVITIES.map((act) => (
                  <button
                    key={act.label}
                    type="button"
                    title={act.label}
                    className={`w-8 h-8 rounded-lg text-base transition-all border ${
                      schedule[hour] === act.emoji
                        ? "bg-purple-light-gp border-purple-gp scale-110 shadow-sm"
                        : "border-transparent hover:bg-muted"
                    }`}
                    onClick={() => toggleActivity(hour, act.emoji)}
                    data-ocid="planner.button"
                  >
                    {act.emoji}
                  </button>
                ))}
              </div>
              {schedule[hour] && (
                <span className="text-xl shrink-0">{schedule[hour]}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <Button
        size="lg"
        className="w-full bg-purple-gp text-white font-display font-bold text-lg rounded-full mb-6 shadow-lg"
        disabled={!canGenerate}
        onClick={() => setCardVisible(true)}
        data-ocid="planner.primary_button"
      >
        {canGenerate
          ? "✨ Generate My Dream Day Card!"
          : `Add ${3 - filledHours > 0 ? `${3 - filledHours} more hours, ` : ""}${!mood ? "a mood, " : ""}${dreamPeople.length === 0 ? "companions " : ""}to continue`}
      </Button>

      {cardVisible && (
        <div
          className="rounded-2xl bg-gradient-to-br from-pink-light-gp to-purple-light-gp p-6 border-2 border-pink-gp/30 shadow-xl"
          data-ocid="planner.card"
        >
          <div className="text-center mb-4">
            <div className="text-3xl mb-1">🌈</div>
            <h3 className="font-display text-2xl font-bold text-pink-gp">
              My Perfect Dream Day
            </h3>
            {mood && (
              <Badge className="bg-purple-gp text-white mt-1">
                {MOODS.find((m) => m.label === mood)?.emoji} {mood} Day
              </Badge>
            )}
          </div>
          <div className="mb-4">
            <p className="font-bold text-sm text-muted-foreground mb-2">
              My Dream Companions
            </p>
            <div className="flex gap-2 flex-wrap">
              {dreamPeople.map((p) => {
                const person = DREAM_PEOPLE.find((dp) => dp.label === p);
                return (
                  <span
                    key={p}
                    className="bg-pink-light-gp border border-pink-gp/30 px-3 py-1 rounded-full text-sm font-bold"
                  >
                    {person?.emoji} {p}
                  </span>
                );
              })}
            </div>
          </div>
          <div>
            <p className="font-bold text-sm text-muted-foreground mb-2">
              My Schedule
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {HOUR_SLOTS.filter((h) => schedule[h]).map((hour) => (
                <div
                  key={hour}
                  className="bg-white/70 rounded-xl p-2 text-center"
                >
                  <div className="text-2xl">{schedule[hour]}</div>
                  <div className="text-xs font-bold text-muted-foreground">
                    {hour}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex gap-2 justify-center">
            <Button
              size="sm"
              className="bg-pink-gp text-white rounded-full"
              onClick={() => {
                const text = `My Dream Day:\nMood: ${mood}\nWith: ${dreamPeople.join(", ")}\nSchedule: ${HOUR_SLOTS.filter(
                  (h) => schedule[h],
                )
                  .map((h) => `${h}: ${schedule[h]}`)
                  .join(", ")}`;
                navigator.clipboard
                  .writeText(text)
                  .then(() => toast.success("📋 Dream Day copied!"));
              }}
              data-ocid="planner.save_button"
            >
              📋 Copy
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full"
              onClick={() => setCardVisible(false)}
              data-ocid="planner.close_button"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 5. GLOW UP GOALS
// ============================================================

const GLOW_GOALS: Record<
  string,
  { emoji: string; color: string; desc: string; tasks: string[] }
> = {
  kinder: {
    emoji: "💖",
    color: "from-pink-400 to-rose-400",
    desc: "Spread kindness every single day. Small acts, big impact.",
    tasks: [
      "Write a kind note to someone you love",
      "Say something nice to a stranger or classmate",
      "Help with a chore without being asked",
      "Listen to someone's whole story without interrupting",
      "Send a voice message to a friend just to say hi",
      "Compliment someone's hard work",
      "Hold the door open for someone",
      "Share your lunch or snack",
      "Forgive someone who hurt you",
      "Leave a positive sticky note for a family member",
    ],
  },
  stronger: {
    emoji: "💪",
    color: "from-orange-400 to-red-400",
    desc: "Build your body and your confidence one day at a time!",
    tasks: [
      "Do 10 jumping jacks when you wake up",
      "Take a 15-minute walk outside",
      "Try 5 push-ups or wall push-ups",
      "Dance to one full song",
      "Drink 6 glasses of water today",
      "Eat a fruit or veggie with every meal",
      "Stretch for 5 minutes before bed",
      "Try a new sport or movement activity",
      "Do a 1-minute plank challenge",
      "Run around the block once",
    ],
  },
  creative: {
    emoji: "🎨",
    color: "from-purple-400 to-violet-500",
    desc: "Create something beautiful every single day!",
    tasks: [
      "Draw or doodle for 10 minutes",
      "Write a poem, even if it's silly",
      "Rearrange your room in a new way",
      "Take a creative photo of something ordinary",
      "Make something using only recycled materials",
      "Write the first paragraph of a story",
      "Design an outfit you wish existed",
      "Create a playlist for a specific feeling",
      "Invent a new game or activity",
      "Make a card for someone you love",
    ],
  },
  braver: {
    emoji: "🦁",
    color: "from-yellow-400 to-amber-500",
    desc: "Push past your comfort zone every single day!",
    tasks: [
      "Say hello first to someone new",
      "Share your opinion even when it's hard",
      "Try a food you've never eaten",
      "Raise your hand in class when you're unsure",
      "Tell someone when they hurt your feelings",
      "Try something you've been afraid to try",
      "Sing out loud (even if only to yourself)",
      "Ask for help when you need it",
      "Stand up for someone being left out",
      "Write down your biggest dream",
    ],
  },
};

const FLOWER_STAGES = ["🌑", "🌱", "🌿", "🌸", "🌺"];

export function GlowUpGoals() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean[]>>({});

  useEffect(() => {
    const loaded: Record<string, boolean[]> = {};
    for (const key of Object.keys(GLOW_GOALS)) {
      try {
        const stored = localStorage.getItem(`gph_glow_goals_${key}`);
        loaded[key] = stored ? JSON.parse(stored) : Array(10).fill(false);
      } catch {
        loaded[key] = Array(10).fill(false);
      }
    }
    setChecked(loaded);
  }, []);

  const toggleTask = (goalKey: string, taskIdx: number) => {
    setChecked((prev) => {
      const current = [...(prev[goalKey] || Array(10).fill(false))];
      current[taskIdx] = !current[taskIdx];
      const updated = { ...prev, [goalKey]: current };
      localStorage.setItem(
        `gph_glow_goals_${goalKey}`,
        JSON.stringify(current),
      );
      return updated;
    });
  };

  const getProgress = (goalKey: string) => {
    const tasks = checked[goalKey] || Array(10).fill(false);
    return (tasks.filter(Boolean).length / tasks.length) * 100;
  };

  const getFlower = (pct: number) => {
    if (pct === 100) return FLOWER_STAGES[4];
    if (pct >= 75) return FLOWER_STAGES[3];
    if (pct >= 50) return FLOWER_STAGES[2];
    if (pct >= 25) return FLOWER_STAGES[1];
    return FLOWER_STAGES[0];
  };

  if (selectedGoal) {
    const goal = GLOW_GOALS[selectedGoal];
    const progress = getProgress(selectedGoal);
    const flower = getFlower(progress);
    const tasks = checked[selectedGoal] || Array(10).fill(false);
    const completedCount = tasks.filter(Boolean).length;

    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full"
            onClick={() => setSelectedGoal(null)}
            data-ocid="goals.button"
          >
            ← Back to Goals
          </Button>
        </div>

        <div
          className={`rounded-2xl p-6 bg-gradient-to-br ${goal.color} text-white mb-6`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold">
                {goal.emoji}{" "}
                {selectedGoal === "kinder"
                  ? "Be Kinder"
                  : selectedGoal === "stronger"
                    ? "Get Stronger"
                    : selectedGoal === "creative"
                      ? "Create More"
                      : "Be Braver"}
              </h3>
              <p className="text-white/90 text-sm mt-1">{goal.desc}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl">{flower}</div>
              <div className="text-xs mt-1 font-bold">
                {Math.round(progress)}%
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Progress
              value={progress}
              className="h-3 bg-white/30"
              data-ocid="goals.loading_state"
            />
          </div>
          {progress === 100 && (
            <div className="text-center mt-3 bg-white/20 rounded-xl p-3">
              <p className="text-xl font-bold">🌟 You're GLOWING! 🌟</p>
              <p className="text-sm">You completed all 10 tasks! YOU LEGEND!</p>
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-3 font-medium">
          {completedCount}/10 tasks completed
        </p>

        <div className="flex flex-col gap-3">
          {goal.tasks.map((task, i) => (
            <button
              key={task}
              type="button"
              className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all font-medium ${
                tasks[i]
                  ? `bg-gradient-to-r ${goal.color} text-white border-transparent`
                  : "border-border hover:border-current bg-card"
              }`}
              onClick={() => toggleTask(selectedGoal, i)}
              data-ocid={`goals.item.${i + 1}`}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  tasks[i] ? "bg-white border-white" : "border-current"
                }`}
              >
                {tasks[i] && <span className="text-xs text-green-600">✓</span>}
              </div>
              <span>{task}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {sectionHeader(
        "🌸",
        "Glow-Up Goals",
        "Pick your 30-day glow-up and bloom into your best self!",
        "text-pink-gp",
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {Object.entries(GLOW_GOALS).map(([key, goal]) => {
          const progress = getProgress(key);
          const flower = getFlower(progress);
          return (
            <button
              key={key}
              type="button"
              className={`p-6 rounded-2xl bg-gradient-to-br ${goal.color} text-white text-left transition-all hover:scale-102 hover:shadow-xl`}
              onClick={() => setSelectedGoal(key)}
              data-ocid="goals.button"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-4xl mb-1">{goal.emoji}</div>
                  <h3 className="font-display text-xl font-bold">
                    {key === "kinder"
                      ? "Be Kinder"
                      : key === "stronger"
                        ? "Get Stronger"
                        : key === "creative"
                          ? "Create More"
                          : "Be Braver"}
                  </h3>
                </div>
                <div className="text-center">
                  <div className="text-4xl">{flower}</div>
                  <div className="text-xs mt-1">{Math.round(progress)}%</div>
                </div>
              </div>
              <p className="text-white/80 text-sm mb-3">{goal.desc}</p>
              <Progress value={progress} className="h-2 bg-white/30" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// 6. BFF BOND TEST
// ============================================================
const BFF_QUESTIONS = [
  {
    q: "Your BFF is...",
    options: [
      { text: "The funniest person you know 😂", value: "laugh" },
      { text: "Your ride-or-die no matter what 💪", value: "support" },
      { text: "Your partner-in-every-adventure 🗺️", value: "adventure" },
      { text: "Your creative co-conspirator 🎨", value: "dream" },
    ],
  },
  {
    q: "You show love by...",
    options: [
      { text: "Making them laugh when they're sad", value: "laugh" },
      { text: "Always being there no matter what", value: "support" },
      { text: "Dragging them on epic adventures", value: "adventure" },
      { text: "Making them something special", value: "dream" },
    ],
  },
  {
    q: "Your perfect friend date is...",
    options: [
      { text: "Watching funny videos and crying-laughing", value: "laugh" },
      {
        text: "Talking about everything under the sun all night",
        value: "support",
      },
      { text: "Hiking somewhere beautiful and new", value: "adventure" },
      { text: "Starting a creative project together", value: "dream" },
    ],
  },
  {
    q: "You'd go on a trip to...",
    options: [
      { text: "A theme park for maximum fun 🎢", value: "laugh" },
      { text: "A cozy cabin with hot chocolate 🏕️", value: "support" },
      { text: "Somewhere wild and unexplored 🌍", value: "adventure" },
      { text: "A city full of art and culture 🎭", value: "dream" },
    ],
  },
  {
    q: "Your friendship anthem is...",
    options: [
      { text: "Count on Me — Bruno Mars 🎵", value: "support" },
      { text: "Girls Just Wanna Have Fun 🎶", value: "laugh" },
      { text: "Life is a Highway 🛣️", value: "adventure" },
      { text: "A Sky Full of Stars ✨", value: "dream" },
    ],
  },
  {
    q: "Ten years from now, you and your BFF will be...",
    options: [
      { text: "Still texting memes and crying-laughing 😂", value: "laugh" },
      { text: "Each other's biggest cheerleaders 💪", value: "support" },
      { text: "Traveling the world together ✈️", value: "adventure" },
      { text: "Co-creating something amazing together 🚀", value: "dream" },
    ],
  },
];

const FRIENDSHIP_ARCHETYPES: Record<
  string,
  { name: string; emoji: string; color: string; desc: string; seal: string }
> = {
  laugh: {
    name: "The Laugh Factory",
    emoji: "😂",
    color: "from-yellow-400 to-amber-400",
    desc: "Your friendship is built on pure joy! You two have a special gift: turning any moment into a memory that makes you laugh for years.",
    seal: "🎭",
  },
  support: {
    name: "The Support Squad",
    emoji: "💪",
    color: "from-pink-400 to-rose-500",
    desc: "Your friendship is unbreakable! You show up for each other unconditionally, and that is the rarest, most precious kind of bond.",
    seal: "💖",
  },
  adventure: {
    name: "The Adventure Pair",
    emoji: "🗺️",
    color: "from-teal-400 to-green-500",
    desc: "Life is your playground! You and your BFF make every day an adventure, and together you're brave enough to explore anything.",
    seal: "🌟",
  },
  dream: {
    name: "The Dream Team",
    emoji: "🚀",
    color: "from-purple-400 to-violet-600",
    desc: "You dream BIG together and make each other's visions come true. When you two combine powers, there's nothing you can't create!",
    seal: "✨",
  },
};

export function BFFBondTest() {
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<
    (typeof FRIENDSHIP_ARCHETYPES)[string] | null
  >(null);
  const [bffName, setBffName] = useState("");

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    if (qIdx < BFF_QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setQIdx(qIdx + 1);
    } else {
      const archetype = FRIENDSHIP_ARCHETYPES[tally(newAnswers)];
      setResult(archetype);
    }
  };

  const reset = () => {
    setQIdx(0);
    setAnswers([]);
    setResult(null);
    setBffName("");
  };

  if (result) {
    return (
      <div>
        {sectionHeader(
          "💖",
          "Your Friendship Revealed!",
          "This is what you and your BFF are made of...",
          "text-pink-gp",
        )}
        <div
          className={`relative rounded-3xl p-8 bg-gradient-to-br ${result.color} text-white text-center mb-6 shadow-2xl border-4 border-white/30`}
          data-ocid="bff.card"
        >
          <Confetti active={true} />
          <div className="relative z-10">
            {/* Seal */}
            <div className="text-5xl mb-2">{result.seal}</div>
            <div className="inline-block border-4 border-white/50 rounded-2xl px-6 py-1 mb-4">
              <p className="text-xs uppercase tracking-widest font-bold opacity-75">
                Official BFF Certificate
              </p>
            </div>
            <div className="text-6xl mb-3">{result.emoji}</div>
            <h3 className="font-display text-4xl font-bold mb-4">
              {result.name}
            </h3>
            <p className="text-lg text-white/90 max-w-md mx-auto mb-6">
              {result.desc}
            </p>

            {/* BFF Name Input */}
            <div className="mb-6">
              <p className="text-sm font-bold mb-2 opacity-80">
                Write your BFF's name on this certificate:
              </p>
              <input
                type="text"
                placeholder="My BFF's name is..."
                value={bffName}
                onChange={(e) => setBffName(e.target.value)}
                className="bg-white/20 border-2 border-white/40 rounded-full px-4 py-2 text-white placeholder-white/60 text-center font-bold w-full max-w-xs focus:outline-none focus:border-white"
                data-ocid="bff.input"
              />
              {bffName && (
                <p className="text-xl font-bold mt-2">🌟 For {bffName} 🌟</p>
              )}
            </div>

            <div className="text-3xl mb-4">💫⭐💫</div>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/20 rounded-full px-8 font-bold"
              onClick={reset}
              data-ocid="bff.button"
            >
              🔄 Start Over
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const q = BFF_QUESTIONS[qIdx];
  const progress = (qIdx / BFF_QUESTIONS.length) * 100;

  return (
    <div>
      {sectionHeader(
        "💖",
        "BFF Bond Test",
        "Discover your friendship superpower — and make a certificate for your bestie!",
        "text-pink-gp",
      )}

      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>
            Question {qIdx + 1} of {BFF_QUESTIONS.length}
          </span>
          <span>{Math.round(progress)}% done</span>
        </div>
        <Progress
          value={progress}
          className="h-3 rounded-full"
          data-ocid="bff.loading_state"
        />
      </div>

      <Card
        className="border-2 border-pink-gp/30 shadow-lg"
        data-ocid="bff.card"
      >
        <CardContent className="p-6">
          <p className="font-display text-xl font-bold text-center mb-6">
            {q.q}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {q.options.map((opt) => (
              <button
                key={opt.text}
                type="button"
                className="p-4 rounded-2xl text-left font-bold border-2 border-pink-gp/20 bg-pink-light-gp hover:border-pink-gp hover:scale-105 transition-all"
                onClick={() => handleAnswer(opt.value)}
                data-ocid="bff.button"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {qIdx > 0 && (
        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            data-ocid="bff.secondary_button"
          >
            ← Start Over
          </Button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 7. GIRL POWER RADIO
// ============================================================

const RADIO_MOODS: Record<
  string,
  {
    emoji: string;
    label: string;
    color: string;
    songs: { artist: string; title: string }[];
  }
> = {
  "pump-up": {
    emoji: "🔥",
    label: "Pump Up",
    color: "from-orange-400 to-red-500",
    songs: [
      { artist: "Lizzo", title: "Good as Hell" },
      { artist: "Katy Perry", title: "Roar" },
      { artist: "Doja Cat", title: "Woman" },
      { artist: "Beyoncé", title: "Run the World (Girls)" },
      { artist: "Taylor Swift", title: "Shake It Off" },
      { artist: "Ariana Grande", title: "God is a Woman" },
    ],
  },
  "feel-good": {
    emoji: "☀️",
    label: "Feel-Good",
    color: "from-yellow-400 to-amber-400",
    songs: [
      { artist: "Pharrell Williams", title: "Happy" },
      { artist: "Lizzo", title: "Juice" },
      { artist: "Taylor Swift", title: "Me!" },
      { artist: "Ariana Grande", title: "7 rings" },
      { artist: "Meghan Trainor", title: "All About That Bass" },
      { artist: "Katy Perry", title: "Firework" },
    ],
  },
  chill: {
    emoji: "🌙",
    label: "Chill Vibes",
    color: "from-indigo-400 to-purple-500",
    songs: [
      { artist: "Olivia Rodrigo", title: "drivers license" },
      { artist: "Taylor Swift", title: "cardigan" },
      { artist: "Ariana Grande", title: "breathin" },
      { artist: "Billie Eilish", title: "lovely" },
      { artist: "SZA", title: "Good Days" },
      { artist: "Lana Del Rey", title: "Summertime Sadness" },
    ],
  },
  brave: {
    emoji: "💪",
    label: "Brave Mode",
    color: "from-teal-400 to-emerald-500",
    songs: [
      { artist: "Rachel Platten", title: "Fight Song" },
      { artist: "Alicia Keys", title: "Girl on Fire" },
      { artist: "Destiny's Child", title: "Survivor" },
      { artist: "P!nk", title: "Raise Your Glass" },
      { artist: "Demi Lovato", title: "Confident" },
      { artist: "Lady Gaga", title: "Born This Way" },
    ],
  },
  dance: {
    emoji: "💃",
    label: "Dance Party",
    color: "from-pink-400 to-fuchsia-500",
    songs: [
      { artist: "Doja Cat", title: "Say So" },
      { artist: "Beyoncé", title: "Crazy in Love" },
      { artist: "Taylor Swift", title: "22" },
      { artist: "Ariana Grande", title: "Into You" },
      { artist: "Lizzo", title: "About Damn Time" },
      { artist: "Nicki Minaj", title: "Super Bass" },
    ],
  },
};

const ADJECTIVES_1 = [
  "Fierce",
  "Golden",
  "Electric",
  "Cosmic",
  "Glowing",
  "Savage",
  "Dreamy",
  "Iconic",
];
const ADJECTIVES_2 = [
  "Shimmer",
  "Power",
  "Crystal",
  "Fire",
  "Stellar",
  "Neon",
  "Sugar",
  "Thunder",
];
const NOUNS = [
  "Vibes",
  "Queens",
  "Galaxy",
  "Storm",
  "Magic",
  "Force",
  "Anthem",
  "Club",
];

function MusicVisualizer({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-1 h-10" aria-label="Music visualizer">
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div
          key={i}
          className={`w-3 rounded-t-full bg-gradient-to-t from-pink-500 to-purple-400 transition-all ${active ? "" : "opacity-30"}`}
          style={
            active
              ? {
                  height: `${30 + Math.sin(i) * 20}%`,
                  animation: `musicBar ${0.4 + i * 0.1}s ease-in-out infinite alternate`,
                }
              : { height: "20%" }
          }
        />
      ))}
    </div>
  );
}

export function GirlPowerRadio() {
  const [activeMood, setActiveMood] = useState<string>("pump-up");
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [playlistName, setPlaylistName] = useState({
    adj1: "Fierce",
    adj2: "Golden",
    noun: "Vibes",
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSong = (songKey: string) => {
    setPlaylist((prev) =>
      prev.includes(songKey)
        ? prev.filter((s) => s !== songKey)
        : [...prev, songKey],
    );
  };

  const mood = RADIO_MOODS[activeMood];
  const generatedName = `${playlistName.adj1} ${playlistName.adj2} ${playlistName.noun}`;

  return (
    <div>
      {sectionHeader(
        "🎵",
        "Girl Power Radio",
        "Build your ultimate girl-power playlist! 🎤✨",
        "text-teal-gp",
      )}

      {/* Mood Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(RADIO_MOODS).map(([key, m]) => (
          <button
            key={key}
            type="button"
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all border-2 ${
              activeMood === key
                ? `bg-gradient-to-r ${m.color} text-white border-transparent shadow-md`
                : "border-border hover:border-teal-gp"
            }`}
            onClick={() => setActiveMood(key)}
            data-ocid="radio.tab"
          >
            {m.emoji} {m.label}
          </button>
        ))}
      </div>

      {/* Current Mood Songs */}
      <div
        className={`rounded-2xl p-5 bg-gradient-to-br ${mood.color} text-white mb-6`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl font-bold">
            {mood.emoji} {mood.label}
          </h3>
          <MusicVisualizer active={isPlaying} />
        </div>
        <div className="flex flex-col gap-2">
          {mood.songs.map((song, i) => {
            const key = `${activeMood}-${i}`;
            const inPlaylist = playlist.includes(key);
            return (
              <button
                key={key}
                type="button"
                className={`flex items-center justify-between p-3 rounded-xl text-left transition-all font-medium ${
                  inPlaylist
                    ? "bg-white text-gray-800 shadow-md"
                    : "bg-white/20 hover:bg-white/30"
                }`}
                onClick={() => toggleSong(key)}
                data-ocid={`radio.item.${i + 1}`}
              >
                <div>
                  <span className="font-bold text-sm">{song.title}</span>
                  <span className="text-xs opacity-75 ml-2">
                    — {song.artist}
                  </span>
                </div>
                <span className="text-lg">{inPlaylist ? "✅" : "➕"}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Playlist Name Generator */}
      <Card className="border-2 border-teal-gp/30 mb-6" data-ocid="radio.card">
        <CardHeader>
          <CardTitle className="text-teal-gp text-lg">
            🎨 Name Your Playlist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <p className="text-xs font-bold text-muted-foreground mb-1">
                Adjective 1
              </p>
              <select
                className="w-full rounded-lg border-2 border-teal-gp/30 px-2 py-2 text-sm font-bold focus:border-teal-gp outline-none bg-card"
                value={playlistName.adj1}
                onChange={(e) =>
                  setPlaylistName((p) => ({ ...p, adj1: e.target.value }))
                }
                data-ocid="radio.select"
              >
                {ADJECTIVES_1.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground mb-1">
                Adjective 2
              </p>
              <select
                className="w-full rounded-lg border-2 border-teal-gp/30 px-2 py-2 text-sm font-bold focus:border-teal-gp outline-none bg-card"
                value={playlistName.adj2}
                onChange={(e) =>
                  setPlaylistName((p) => ({ ...p, adj2: e.target.value }))
                }
                data-ocid="radio.select"
              >
                {ADJECTIVES_2.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground mb-1">
                Noun
              </p>
              <select
                className="w-full rounded-lg border-2 border-teal-gp/30 px-2 py-2 text-sm font-bold focus:border-teal-gp outline-none bg-card"
                value={playlistName.noun}
                onChange={(e) =>
                  setPlaylistName((p) => ({ ...p, noun: e.target.value }))
                }
                data-ocid="radio.select"
              >
                {NOUNS.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-gradient-to-r from-teal-light-gp to-pink-light-gp rounded-xl p-3 text-center">
            <p className="font-display text-xl font-bold text-foreground">
              🎵 {generatedName} 🎵
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Player Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Button
          size="lg"
          className={`rounded-full font-bold px-8 ${isPlaying ? "bg-red-500 text-white hover:bg-red-600" : "bg-teal-gp text-white hover:opacity-90"}`}
          onClick={() => setIsPlaying(!isPlaying)}
          data-ocid="radio.toggle"
        >
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </Button>
      </div>

      {/* Your Playlist */}
      <div>
        <h3 className="font-display font-bold text-lg mb-3 text-teal-gp">
          🎵 Your Playlist: {generatedName}
        </h3>
        {playlist.length === 0 ? (
          <div
            className="text-center py-6 text-muted-foreground bg-muted/20 rounded-xl"
            data-ocid="radio.empty_state"
          >
            <div className="text-3xl mb-2">🎵</div>
            <p>No songs added yet! Tap ➕ on any song to add it.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2" data-ocid="radio.list">
            {playlist.map((key, idx) => {
              const [moodKey, songIdxStr] = key.split("-");
              const songIdx = Number.parseInt(songIdxStr, 10);
              const song = RADIO_MOODS[moodKey]?.songs[songIdx];
              if (!song) return null;
              return (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 rounded-xl bg-teal-light-gp border border-teal-gp/20"
                  data-ocid={`radio.item.${idx + 1}`}
                >
                  <div>
                    <span className="font-bold text-sm">{song.title}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      — {song.artist}
                    </span>
                    <Badge className="ml-2 text-xs bg-teal-gp text-white">
                      {RADIO_MOODS[moodKey]?.emoji}
                    </Badge>
                  </div>
                  <button
                    type="button"
                    className="text-red-400 hover:text-red-600 text-sm font-bold px-2"
                    onClick={() => toggleSong(key)}
                    data-ocid="radio.delete_button"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
            <p className="text-center text-sm text-muted-foreground mt-2">
              🎵 {playlist.length} song{playlist.length !== 1 ? "s" : ""} in
              your playlist
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
