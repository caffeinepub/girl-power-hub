import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ============================================================
// SHARED HELPERS
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

interface ConfettiParticle {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
}

function Confetti({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);
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
      "#ff1493",
    ];
    setParticles(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 8,
        delay: Math.random() * 1.5,
      })),
    );
  }, [active]);
  if (!active || particles.length === 0) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.x}%`,
            top: "-10px",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `confettiFall 2.5s ease-in ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
}

// ============================================================
// 1. SPIN THE DARE WHEEL
// ============================================================
const DARES = [
  "Do your best robot dance for 10 seconds! 🤖",
  "Say a tongue twister 3 times fast: She sells seashells! 🐚",
  "Make your funniest face right now! 😜",
  "Pretend you're a chicken for 15 seconds! 🐔",
  "Speak in a British accent for the next minute! 🫖",
  "Do 10 jumping jacks as fast as you can! ⚡",
  "Hum your favorite song without stopping! 🎵",
  "Walk backwards around the room twice! 🔄",
  "Do your best superhero landing pose! 🦸‍♀️",
  "Make up a 5-second rap about pizza! 🍕",
  "Wiggle your arms like spaghetti for 10 seconds! 🍝",
  "Say 'banana' in the weirdest voice you can! 🍌",
  "Pretend to be a fashion model on a catwalk! 👗",
  "Do your best cheerleader cheer! 📣",
  "Act like you just won an Olympic gold medal! 🥇",
  "Pretend you're melting like ice cream! 🍦",
  "Do the worm (or try to)! 🐛",
  "Sing 'Happy Birthday' like an opera singer! 🎭",
  "Pretend you're swimming through invisible water! 🏊‍♀️",
  "Bark like a dog three times then meow like a cat! 🐶🐱",
];

const WHEEL_COLORS = [
  "#ff69b4",
  "#da70d6",
  "#20b2aa",
  "#ffd700",
  "#ff6347",
  "#9370db",
  "#87ceeb",
  "#ff1493",
  "#00ced1",
  "#ffa500",
  "#7b68ee",
  "#32cd32",
];

export function SpinTheDareWheel() {
  const [spinning, setSpinning] = useState(false);
  const [currentDare, setCurrentDare] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setCurrentDare(null);
    setShowConfetti(false);
    const spins = 5 + Math.floor(Math.random() * 5);
    const extra = Math.floor(Math.random() * 360);
    const newRotation = rotation + spins * 360 + extra;
    setRotation(newRotation);
    setTimeout(() => {
      const dare = DARES[Math.floor(Math.random() * DARES.length)];
      setCurrentDare(dare);
      setSpinning(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 2200);
  };

  const sliceCount = 12;
  const sliceAngle = 360 / sliceCount;

  return (
    <div>
      {sectionHeader(
        "🎡",
        "Spin the Dare Wheel!",
        "Spin and get a fun dare to do right now!",
        "text-pink-gp",
      )}
      <div className="relative max-w-md mx-auto">
        <Confetti active={showConfetti} />

        {/* Wheel */}
        <div className="flex justify-center mb-6">
          <div className="relative" style={{ width: 280, height: 280 }}>
            {/* Pointer */}
            <div
              className="absolute z-10 top-[-16px] left-1/2 -translate-x-1/2"
              style={{
                width: 0,
                height: 0,
                borderLeft: "14px solid transparent",
                borderRight: "14px solid transparent",
                borderTop: "28px solid #ff1493",
              }}
            />
            {/* Spinning wheel made of divs */}
            <div
              style={{
                width: 280,
                height: 280,
                borderRadius: "50%",
                border: "6px solid #ff1493",
                overflow: "hidden",
                position: "relative",
                transition: spinning
                  ? "transform 2.2s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                  : "none",
                transform: `rotate(${rotation}deg)`,
                boxShadow: "0 0 30px rgba(255,105,180,0.4)",
              }}
            >
              {WHEEL_COLORS.map((color, i) => (
                <div
                  key={color}
                  style={{
                    position: "absolute",
                    width: "50%",
                    height: "50%",
                    top: "0",
                    right: "0",
                    transformOrigin: "0% 100%",
                    transform: `rotate(${i * sliceAngle - 90}deg) skewY(${90 - sliceAngle}deg)`,
                    backgroundColor: color,
                  }}
                />
              ))}
              {/* Center */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "white",
                  border: "4px solid #ff1493",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  zIndex: 5,
                }}
              >
                ✨
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="rounded-full bg-pink-gp text-white font-bold text-lg px-10 py-4 hover:scale-105 transition-transform shadow-lg"
            onClick={spin}
            disabled={spinning}
            data-ocid="dare-wheel.primary_button"
          >
            {spinning ? "Spinning... 🌀" : "SPIN THE WHEEL! 🎡"}
          </Button>
        </div>

        {currentDare && !spinning && (
          <div
            className="mt-6 p-6 rounded-2xl text-center border-4 border-pink-gp animate-bounce"
            style={{ background: "linear-gradient(135deg, #fff0f5, #f5e6ff)" }}
          >
            <div className="text-3xl mb-2">🎯 YOUR DARE!</div>
            <p className="font-bold text-xl text-foreground leading-snug">
              {currentDare}
            </p>
            <Button
              className="mt-4 rounded-full bg-purple-gp text-white"
              onClick={spin}
              data-ocid="dare-wheel.secondary_button"
            >
              Spin Again! 🎡
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// 2. EMOJI MOOD DANCE PARTY
// ============================================================
const MOODS = [
  {
    label: "Happy",
    emoji: "😄",
    dancer: "🕺",
    move: "Do the Happy Shuffle! Shake your hips left and right with a big smile!",
    vibe: "Upbeat pop — think Taylor Swift or Lizzo! 🎶",
    color: "#ffd700",
  },
  {
    label: "Silly",
    emoji: "🤪",
    dancer: "🦩",
    move: "Flap your arms like a flamingo and hop on one foot!",
    vibe: "Quirky indie pop or Weird Al! 🎵",
    color: "#ff6347",
  },
  {
    label: "Fierce",
    emoji: "😤",
    dancer: "💃",
    move: "Strike a power pose — hands on hips, then stomp in a circle!",
    vibe: "Beyoncé, Cardi B, fierce girl power anthems! 🔥",
    color: "#ff1493",
  },
  {
    label: "Chill",
    emoji: "😎",
    dancer: "🧘‍♀️",
    move: "Sway side to side slowly, arms loose, totally zen!",
    vibe: "Lo-fi beats or chill R&B — Jhené Aiko vibes 🌊",
    color: "#20b2aa",
  },
  {
    label: "Excited",
    emoji: "🤩",
    dancer: "🌟",
    move: "Jump up and down 3 times, spin around, then throw your hands up!",
    vibe: "Dance pop or K-pop — BTS, BLACKPINK! ⚡",
    color: "#da70d6",
  },
  {
    label: "Shy",
    emoji: "🥺",
    dancer: "🌸",
    move: "Gently sway with tiny little steps, arms close to your body — so cute!",
    vibe: "Soft indie or Studio Ghibli soundtrack 🌸",
    color: "#ffb6c1",
  },
];

export function EmojiMoodDanceParty() {
  const [selectedMood, setSelectedMood] = useState<(typeof MOODS)[0] | null>(
    null,
  );
  const [dancing, setDancing] = useState(false);

  const pickMood = (mood: (typeof MOODS)[0]) => {
    setSelectedMood(mood);
    setDancing(true);
  };

  return (
    <div>
      {sectionHeader(
        "💃",
        "Emoji Mood Dance Party!",
        "Pick your mood and get a dance move just for you!",
        "text-purple-gp",
      )}

      <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto mb-6">
        {MOODS.map((mood) => (
          <button
            key={mood.label}
            type="button"
            onClick={() => pickMood(mood)}
            className="flex flex-col items-center justify-center gap-1 p-4 rounded-2xl border-3 font-bold text-sm transition-all hover:scale-105 active:scale-95"
            style={{
              backgroundColor: `${mood.color}22`,
              borderColor: mood.color,
              borderWidth: selectedMood?.label === mood.label ? 3 : 2,
            }}
            data-ocid="dance-party.primary_button"
          >
            <span className="text-3xl">{mood.emoji}</span>
            <span className="text-xs">{mood.label}</span>
          </button>
        ))}
      </div>

      {selectedMood && (
        <div
          className="max-w-sm mx-auto rounded-2xl p-6 text-center border-4"
          style={{
            borderColor: selectedMood.color,
            backgroundColor: `${selectedMood.color}15`,
          }}
        >
          <div
            className="text-7xl mb-4"
            style={{
              display: "inline-block",
              animation: dancing
                ? "bounce 0.6s ease-in-out infinite alternate"
                : "none",
            }}
          >
            {selectedMood.dancer}
          </div>
          <style>
            {
              "@keyframes bounce { from { transform: translateY(0) rotate(-5deg); } to { transform: translateY(-12px) rotate(5deg); } }"
            }
          </style>
          <h3
            className="font-display font-bold text-xl mb-2"
            style={{ color: selectedMood.color }}
          >
            {selectedMood.label} Dance Move!
          </h3>
          <p className="text-foreground font-bold mb-3 leading-snug">
            {selectedMood.move}
          </p>
          <div className="bg-white/60 rounded-xl p-3 text-sm text-muted-foreground">
            🎵 <strong>Playlist vibe:</strong> {selectedMood.vibe}
          </div>
          <Button
            className="mt-4 rounded-full text-white font-bold"
            style={{ backgroundColor: selectedMood.color }}
            onClick={() => setSelectedMood(null)}
            data-ocid="dance-party.secondary_button"
          >
            Try Another Mood! 💃
          </Button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 3. DESIGN YOUR DREAM BEDROOM
// ============================================================
const ROOM_CATEGORIES = [
  {
    name: "Bed",
    options: [
      { emoji: "🛏️", label: "Canopy Bed" },
      { emoji: "🪑", label: "Bunk Bed" },
      { emoji: "🛌", label: "Princess Bed" },
      { emoji: "💤", label: "Hammock" },
    ],
  },
  {
    name: "Rug",
    options: [
      { emoji: "🌸", label: "Floral Rug" },
      { emoji: "⭐", label: "Star Rug" },
      { emoji: "🌈", label: "Rainbow Rug" },
      { emoji: "🐻", label: "Fluffy Rug" },
    ],
  },
  {
    name: "Desk",
    options: [
      { emoji: "💻", label: "Tech Desk" },
      { emoji: "🎨", label: "Art Desk" },
      { emoji: "📚", label: "Study Desk" },
      { emoji: "✨", label: "Glam Desk" },
    ],
  },
  {
    name: "Lamp",
    options: [
      { emoji: "🌙", label: "Moon Lamp" },
      { emoji: "🌟", label: "Star Lamp" },
      { emoji: "🏮", label: "Fairy Lights" },
      { emoji: "🕯️", label: "Candle Vibe" },
    ],
  },
  {
    name: "Posters",
    options: [
      { emoji: "🦋", label: "Butterfly Art" },
      { emoji: "🌺", label: "Flower Power" },
      { emoji: "🦄", label: "Unicorn Magic" },
      { emoji: "🚀", label: "Space Dreams" },
    ],
  },
  {
    name: "Plants",
    options: [
      { emoji: "🌵", label: "Cactus" },
      { emoji: "🌿", label: "Monstera" },
      { emoji: "🌸", label: "Flower Pot" },
      { emoji: "🌻", label: "Sunflower" },
    ],
  },
  {
    name: "Window",
    options: [
      { emoji: "🪟", label: "Bay Window" },
      { emoji: "🎀", label: "Curtains" },
      { emoji: "🌅", label: "Garden View" },
      { emoji: "☁️", label: "Sky View" },
    ],
  },
];

export function DesignYourDreamBedroom() {
  const [selections, setSelections] = useState<
    Record<string, { emoji: string; label: string }>
  >(() => {
    try {
      const saved = localStorage.getItem("dream-bedroom-selections");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [saved, setSaved] = useState(false);

  const pick = (
    categoryName: string,
    option: { emoji: string; label: string },
  ) => {
    const updated = { ...selections, [categoryName]: option };
    setSelections(updated);
    setSaved(false);
  };

  const saveRoom = () => {
    localStorage.setItem(
      "dream-bedroom-selections",
      JSON.stringify(selections),
    );
    setSaved(true);
    toast.success("Your dream bedroom is saved! 🏠✨");
  };

  const chosenCount = Object.keys(selections).length;

  return (
    <div>
      {sectionHeader(
        "🛋️",
        "Design Your Dream Bedroom!",
        "Pick items for each category to build your perfect room!",
        "text-coral-gp",
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 max-w-2xl mx-auto">
        {ROOM_CATEGORIES.map((cat) => (
          <div key={cat.name} className="bg-pink-light-gp rounded-xl p-3">
            <h3 className="font-bold text-sm text-pink-gp mb-2">
              ✨ {cat.name}
            </h3>
            <div className="flex gap-2 flex-wrap">
              {cat.options.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => pick(cat.name, opt)}
                  className="flex flex-col items-center p-2 rounded-lg text-xs transition-all hover:scale-110 border-2"
                  style={{
                    borderColor:
                      selections[cat.name]?.label === opt.label
                        ? "#ff69b4"
                        : "transparent",
                    backgroundColor:
                      selections[cat.name]?.label === opt.label
                        ? "#fff0f5"
                        : "white",
                  }}
                  data-ocid="bedroom.secondary_button"
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className="text-xs text-center leading-tight mt-1">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Room Preview */}
      {chosenCount > 0 && (
        <div className="max-w-2xl mx-auto mb-6">
          <h3 className="font-display font-bold text-pink-gp text-center mb-3">
            🏠 My Room Preview
          </h3>
          <div
            className="rounded-2xl p-6 border-4 border-pink-gp grid grid-cols-4 sm:grid-cols-7 gap-3 text-center"
            style={{
              background: "linear-gradient(135deg, #fff0f5, #f5e6ff, #e6f9ff)",
            }}
          >
            {Object.entries(selections).map(([cat, item]) => (
              <div key={cat} className="flex flex-col items-center">
                <span className="text-4xl">{item.emoji}</span>
                <span className="text-xs text-muted-foreground mt-1">
                  {cat}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center">
        <Button
          size="lg"
          onClick={saveRoom}
          disabled={chosenCount === 0}
          className="rounded-full bg-pink-gp text-white font-bold px-10"
          data-ocid="bedroom.save_button"
        >
          {saved ? "Saved! ✅" : "Save My Room! 💾"}
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          {chosenCount} of 7 items chosen
        </p>
      </div>
    </div>
  );
}

// ============================================================
// 4. ULTIMATE TRIVIA
// ============================================================
const TRIVIA_QUESTIONS = [
  {
    q: "Who was the first female US Vice President?",
    a: [
      "Kamala Harris",
      "Hillary Clinton",
      "Michelle Obama",
      "Condoleezza Rice",
    ],
    correct: 0,
    cat: "Girl Power",
  },
  {
    q: "What gas do plants breathe in?",
    a: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correct: 2,
    cat: "Nature",
  },
  {
    q: "How many colors are in a rainbow?",
    a: ["5", "6", "7", "8"],
    correct: 2,
    cat: "Fun Facts",
  },
  {
    q: "Who sings 'Shake It Off'?",
    a: ["Katy Perry", "Ariana Grande", "Taylor Swift", "Billie Eilish"],
    correct: 2,
    cat: "Pop Culture",
  },
  {
    q: "What is the largest ocean on Earth?",
    a: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: 3,
    cat: "Nature",
  },
  {
    q: "What year did the first iPhone come out?",
    a: ["2005", "2006", "2007", "2008"],
    correct: 2,
    cat: "Fun Facts",
  },
  {
    q: "Who painted the Mona Lisa?",
    a: ["Michelangelo", "Da Vinci", "Picasso", "Raphael"],
    correct: 1,
    cat: "Girl Power",
  },
  {
    q: "What animal is on the WWF logo?",
    a: ["Polar Bear", "Tiger", "Panda", "Elephant"],
    correct: 2,
    cat: "Nature",
  },
  {
    q: "Which planet is known as the Red Planet?",
    a: ["Venus", "Jupiter", "Saturn", "Mars"],
    correct: 3,
    cat: "Fun Facts",
  },
  {
    q: "Who created the character Hermione Granger?",
    a: ["Suzanne Collins", "J.K. Rowling", "Stephenie Meyer", "Roald Dahl"],
    correct: 1,
    cat: "Pop Culture",
  },
  {
    q: "How many sides does a hexagon have?",
    a: ["5", "6", "7", "8"],
    correct: 1,
    cat: "Fun Facts",
  },
  {
    q: "What is the fastest land animal?",
    a: ["Lion", "Leopard", "Horse", "Cheetah"],
    correct: 3,
    cat: "Nature",
  },
  {
    q: "Malala Yousafzai is known for advocating for what?",
    a: ["Climate", "Girls' Education", "Animal Rights", "Food Justice"],
    correct: 1,
    cat: "Girl Power",
  },
  {
    q: "Which K-pop group has 4 members called BLACKPINK?",
    a: ["True", "False", "Maybe", "Unsure"],
    correct: 0,
    cat: "Pop Culture",
  },
  {
    q: "What language is spoken in Brazil?",
    a: ["Spanish", "English", "Portuguese", "French"],
    correct: 2,
    cat: "Fun Facts",
  },
];

export function UltimateTrivia() {
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [answered, setAnswered] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [popup, setPopup] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const handleAnswerRef = useRef<(idx: number) => void>(() => {});

  // biome-ignore lint/correctness/useExhaustiveDependencies: qIndex triggers timer reset intentionally
  useEffect(() => {
    if (gameOver) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(15);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleAnswerRef.current(-1);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [qIndex, gameOver]);

  const handleAnswer = (idx: number) => {
    if (answered !== null) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setAnswered(idx);
    const correct = TRIVIA_QUESTIONS[qIndex].correct;
    if (idx === correct) {
      setScore((s) => s + 10);
      setStreak((prev) => {
        const newStreak = prev + 1;
        setPopup(newStreak >= 3 ? "You're on FIRE! 🔥 +10" : "+10 pts! ✅");
        return newStreak;
      });
    } else {
      setStreak(0);
      setPopup(`❌ Correct: ${TRIVIA_QUESTIONS[qIndex].a[correct]}`);
    }
    setTimeout(() => {
      setPopup(null);
      setAnswered(null);
      if (qIndex + 1 >= TRIVIA_QUESTIONS.length) {
        setGameOver(true);
        setShowConfetti(true);
      } else {
        setQIndex((q) => q + 1);
      }
    }, 1500);
  };

  handleAnswerRef.current = handleAnswer;

  const restart = () => {
    setQIndex(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(15);
    setAnswered(null);
    setGameOver(false);
    setShowConfetti(false);
  };

  const stars = Math.min(5, Math.floor(score / 30));
  const q = TRIVIA_QUESTIONS[qIndex];

  const scoreMessages = [
    "Keep trying! 💪",
    "Good start! ⭐",
    "Well done! 🌟",
    "Amazing! 🏆",
    "GENIUS GIRL! 👑",
    "PERFECT! 🎊",
  ];

  return (
    <div>
      {sectionHeader(
        "⚡",
        "Ultimate Trivia Challenge!",
        "15 questions, 15 seconds each — can you beat the clock?",
        "text-yellow-gp",
      )}

      <div className="relative max-w-lg mx-auto">
        <Confetti active={showConfetti} />

        {/* Score + streak bar */}
        {!gameOver && (
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="font-bold text-pink-gp text-lg">⭐ {score} pts</div>
            <div className="text-sm text-muted-foreground">
              Q{qIndex + 1}/15
            </div>
            {streak >= 3 && (
              <div className="font-bold text-coral-gp text-sm animate-pulse">
                🔥 Streak x{streak}
              </div>
            )}
          </div>
        )}

        {gameOver ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="font-display text-3xl font-bold text-pink-gp mb-2">
              Game Over!
            </h3>
            <p className="text-2xl font-bold mb-3">You scored {score}/150!</p>
            <div className="flex justify-center gap-1 mb-3 text-3xl">
              {"12345".split("").map((n, i) => (
                <span
                  key={n}
                  style={{ color: i < stars ? "#ffd700" : "#e0e0e0" }}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-muted-foreground mb-6">{scoreMessages[stars]}</p>
            <Button
              className="rounded-full bg-pink-gp text-white font-bold"
              onClick={restart}
              data-ocid="trivia.primary_button"
            >
              Play Again! 🎮
            </Button>
          </div>
        ) : (
          <div>
            {/* Timer */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Time left</span>
                <span
                  className={`font-bold ${timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-teal-gp"}`}
                >
                  {timeLeft}s
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 rounded-full transition-all duration-1000"
                  style={{
                    width: `${(timeLeft / 15) * 100}%`,
                    background:
                      timeLeft <= 5
                        ? "#ff4444"
                        : "linear-gradient(90deg, #ff69b4, #da70d6)",
                  }}
                />
              </div>
            </div>

            {/* Category badge */}
            <div className="mb-4 flex gap-2 items-center">
              <span className="text-xs font-bold bg-purple-light-gp text-purple-gp px-3 py-1 rounded-full">
                {q.cat}
              </span>
            </div>

            {/* Question */}
            <div className="bg-card border-2 border-pink-gp rounded-2xl p-5 mb-5 relative">
              {popup && (
                <div
                  className="absolute top-2 right-2 font-bold text-sm px-3 py-1 rounded-full animate-bounce"
                  style={{
                    background:
                      popup.startsWith("+") || popup.includes("FIRE")
                        ? "#d4edda"
                        : "#fde8e8",
                    color:
                      popup.startsWith("+") || popup.includes("FIRE")
                        ? "#155724"
                        : "#721c24",
                  }}
                >
                  {popup}
                </div>
              )}
              <p className="font-bold text-lg text-foreground">{q.q}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {q.a.map((answer, i) => {
                let borderColor = "transparent";
                let bgColor = "white";
                if (answered !== null) {
                  if (i === q.correct) {
                    borderColor = "#28a745";
                    bgColor = "#d4edda";
                  } else if (i === answered) {
                    borderColor = "#dc3545";
                    bgColor = "#fde8e8";
                  }
                }
                return (
                  <button
                    key={`ans-${answer}`}
                    type="button"
                    onClick={() => handleAnswer(i)}
                    disabled={answered !== null}
                    className="p-3 rounded-xl text-left font-bold transition-all border-2 hover:scale-102 text-sm"
                    style={{ borderColor, backgroundColor: bgColor }}
                    data-ocid="trivia.secondary_button"
                  >
                    <span className="font-bold text-muted-foreground mr-2">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {answer}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// 5. CREATE YOUR SUPERHERO
// ============================================================
const SUPERPOWERS = [
  { emoji: "🦅", label: "Flying" },
  { emoji: "💪", label: "Super Strength" },
  { emoji: "⏰", label: "Time Travel" },
  { emoji: "👁️", label: "Invisibility" },
  { emoji: "🧠", label: "Telepathy" },
  { emoji: "💚", label: "Healing" },
  { emoji: "🔥", label: "Fire Control" },
  { emoji: "⚡", label: "Super Speed" },
];

const COSTUME_COMBOS = [
  { colors: ["#ff69b4", "#da70d6"], name: "Pink & Purple" },
  { colors: ["#20b2aa", "#ffd700"], name: "Teal & Gold" },
  { colors: ["#ff6347", "#ff1493"], name: "Coral & Hot Pink" },
  { colors: ["#9370db", "#87ceeb"], name: "Purple & Sky Blue" },
  { colors: ["#32cd32", "#ffd700"], name: "Green & Gold" },
  { colors: ["#1e90ff", "#ff69b4"], name: "Blue & Pink" },
];

export function CreateYourSuperhero() {
  const [step, setStep] = useState(1);
  const [power, setPower] = useState<(typeof SUPERPOWERS)[0] | null>(null);
  const [costume, setCostume] = useState<(typeof COSTUME_COMBOS)[0] | null>(
    null,
  );
  const [heroName, setHeroName] = useState("");
  const [generated, setGenerated] = useState(false);

  const generate = () => {
    if (!power || !costume || !heroName.trim()) return;
    setGenerated(true);
  };

  const copyHero = () => {
    const text = `🦸‍♀️ SUPERHERO PROFILE\nName: ${heroName}\nSuperpower: ${power?.emoji} ${power?.label}\nCostume: ${costume?.name}\nCreated with Girl Power Hub! 💖`;
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Copied to clipboard! 📋"));
  };

  const reset = () => {
    setStep(1);
    setPower(null);
    setCostume(null);
    setHeroName("");
    setGenerated(false);
  };

  return (
    <div>
      {sectionHeader(
        "🦸‍♀️",
        "Create Your Superhero!",
        "3 steps to become the ultimate girl superhero!",
        "text-purple-gp",
      )}

      {!generated ? (
        <div className="max-w-lg mx-auto">
          {/* Step indicators */}
          <div className="flex gap-2 mb-6 justify-center">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className="flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-all"
                style={{
                  backgroundColor: step >= s ? "#da70d6" : "#f0e6ff",
                  color: step >= s ? "white" : "#9370db",
                }}
              >
                {step > s ? "✓" : s}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div>
              <h3 className="font-bold text-center mb-4 text-lg">
                Step 1: Choose Your Superpower ⚡
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SUPERPOWERS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => {
                      setPower(p);
                      setStep(2);
                    }}
                    className="flex flex-col items-center p-4 rounded-2xl border-2 hover:scale-105 transition-all bg-purple-light-gp"
                    style={{
                      borderColor:
                        power?.label === p.label ? "#da70d6" : "transparent",
                    }}
                    data-ocid="superhero.secondary_button"
                  >
                    <span className="text-4xl mb-2">{p.emoji}</span>
                    <span className="font-bold text-sm">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-bold text-center mb-4 text-lg">
                Step 2: Choose Your Costume Colors 👗
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {COSTUME_COMBOS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => {
                      setCostume(c);
                      setStep(3);
                    }}
                    className="flex flex-col items-center p-4 rounded-2xl border-2 hover:scale-105 transition-all bg-white"
                    style={{
                      borderColor:
                        costume?.name === c.name ? "#da70d6" : "#e0e0e0",
                    }}
                    data-ocid="superhero.secondary_button"
                  >
                    <div className="flex gap-2 mb-2">
                      {c.colors.map((col) => (
                        <div
                          key={col}
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: col }}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold">{c.name}</span>
                  </button>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-3"
                onClick={() => setStep(1)}
              >
                ← Back
              </Button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-bold text-center mb-4 text-lg">
                Step 3: Enter Your Hero Name! 👑
              </h3>
              <input
                value={heroName}
                onChange={(e) => setHeroName(e.target.value)}
                placeholder="e.g. Starlight Phoenix..."
                className="w-full px-4 py-3 text-lg rounded-xl border-2 border-purple-gp mb-4 focus:outline-none focus:border-pink-gp text-center font-bold"
                data-ocid="superhero.input"
              />
              <div className="flex gap-3">
                <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
                  ← Back
                </Button>
                <Button
                  className="flex-1 rounded-full bg-purple-gp text-white font-bold"
                  disabled={!heroName.trim()}
                  onClick={generate}
                  data-ocid="superhero.primary_button"
                >
                  Generate My Hero Card! 🦸‍♀️
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-sm mx-auto text-center">
          <div
            className="rounded-2xl p-8 border-4 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${costume?.colors[0]}22, ${costume?.colors[1]}22)`,
              borderColor: costume?.colors[0],
              boxShadow: `0 0 30px ${costume?.colors[0]}60`,
            }}
          >
            <div className="text-6xl mb-3">🦸‍♀️</div>
            <h2
              className="font-display text-3xl font-bold mb-2"
              style={{ color: costume?.colors[0] }}
            >
              {heroName}
            </h2>
            <div className="flex gap-2 justify-center mb-3">
              {costume?.colors.map((col) => (
                <div
                  key={col}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  style={{ backgroundColor: col }}
                />
              ))}
            </div>
            <div className="bg-white/70 rounded-xl p-3 mb-4">
              <p className="font-bold text-lg">
                {power?.emoji} {power?.label}
              </p>
              <p className="text-sm text-muted-foreground">Superpower</p>
            </div>
            <p
              className="text-sm font-bold"
              style={{ color: costume?.colors[1] }}
            >
              🌟 Created with Girl Power Hub 🌟
            </p>
          </div>
          <div className="flex gap-3 mt-4 justify-center">
            <Button
              className="rounded-full bg-purple-gp text-white"
              onClick={copyHero}
              data-ocid="superhero.secondary_button"
            >
              Share My Hero! 📋
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={reset}
              data-ocid="superhero.cancel_button"
            >
              Create New Hero
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 6. BFF COMPATIBILITY TEST
// ============================================================
const BFF_QUESTIONS = [
  {
    q: "Fave food?",
    options: ["🍕 Pizza", "🍔 Burger", "🍣 Sushi", "🍦 Ice Cream"],
  },
  {
    q: "Dream vacation?",
    options: ["🏝️ Beach", "🏔️ Mountains", "🗼 Paris", "🏙️ NYC"],
  },
  {
    q: "Fave color?",
    options: ["💗 Pink", "💜 Purple", "💙 Blue", "💚 Green"],
  },
  {
    q: "Fave subject?",
    options: ["🎨 Art", "🔬 Science", "📚 English", "🧮 Math"],
  },
  {
    q: "Fave movie type?",
    options: ["😂 Comedy", "🎭 Drama", "👻 Horror", "🧚 Fantasy"],
  },
  {
    q: "Fave season?",
    options: ["☀️ Summer", "🍂 Fall", "❄️ Winter", "🌸 Spring"],
  },
  { q: "Fave music?", options: ["🎤 Pop", "🎸 Rock", "🎵 R&B", "💃 K-Pop"] },
  { q: "Fave pet?", options: ["🐶 Dog", "🐱 Cat", "🐰 Bunny", "🐠 Fish"] },
  {
    q: "Fave hobby?",
    options: ["✏️ Drawing", "⚽ Sports", "📖 Reading", "🎮 Gaming"],
  },
  {
    q: "Fave dessert?",
    options: ["🍰 Cake", "🍪 Cookies", "🧁 Cupcake", "🍩 Donut"],
  },
];

const TIERS = [
  { min: 80, label: "Soul Sisters! 👯‍♀️", color: "#ff1493" },
  { min: 60, label: "Total Besties! 💖", color: "#ff69b4" },
  { min: 40, label: "Great Match! 🌟", color: "#da70d6" },
  { min: 20, label: "Still Friends! 😊", color: "#20b2aa" },
  { min: 0, label: "Opposites Attract! 🌈", color: "#ffd700" },
];

export function BFFCompatibilityTest() {
  const [myAnswers, setMyAnswers] = useState<number[]>([]);
  const [bffAnswers, setBffAnswers] = useState<number[]>([]);
  const [bffName, setBffName] = useState("");
  const [myName, setMyName] = useState("");
  const [phase, setPhase] = useState<
    "my-name" | "my-answers" | "bff-name" | "bff-answers" | "result"
  >("my-name");
  const [tempAnswer, setTempAnswer] = useState<number | null>(null);

  const currentQ =
    phase === "my-answers" ? myAnswers.length : bffAnswers.length;

  const pickAnswer = (idx: number) => {
    setTempAnswer(idx);
    setTimeout(() => {
      if (phase === "my-answers") {
        const updated = [...myAnswers, idx];
        setMyAnswers(updated);
        if (updated.length >= BFF_QUESTIONS.length) setPhase("bff-name");
      } else {
        const updated = [...bffAnswers, idx];
        setBffAnswers(updated);
        if (updated.length >= BFF_QUESTIONS.length) setPhase("result");
      }
      setTempAnswer(null);
    }, 400);
  };

  const matches = myAnswers.filter((a, i) => a === bffAnswers[i]).length;
  const pct = Math.round((matches / BFF_QUESTIONS.length) * 100);
  const tier = TIERS.find((t) => pct >= t.min) || TIERS[4];

  const reset = () => {
    setMyAnswers([]);
    setBffAnswers([]);
    setBffName("");
    setMyName("");
    setPhase("my-name");
    setTempAnswer(null);
  };

  return (
    <div>
      {sectionHeader(
        "💕",
        "BFF Compatibility Test!",
        "Answer 10 questions each to discover your friendship score!",
        "text-pink-gp",
      )}

      <div className="max-w-lg mx-auto">
        {phase === "my-name" && (
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Enter your name to start!
            </p>
            <input
              value={myName}
              onChange={(e) => setMyName(e.target.value)}
              placeholder="Your name..."
              className="w-full px-4 py-3 rounded-xl border-2 border-pink-gp mb-4 text-center font-bold text-lg focus:outline-none"
              data-ocid="bff-test.input"
            />
            <Button
              className="rounded-full bg-pink-gp text-white font-bold px-10"
              disabled={!myName.trim()}
              onClick={() => setPhase("my-answers")}
              data-ocid="bff-test.primary_button"
            >
              Start! 💕
            </Button>
          </div>
        )}

        {(phase === "my-answers" || phase === "bff-answers") &&
          currentQ < BFF_QUESTIONS.length && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-pink-gp">
                  {phase === "my-answers"
                    ? `${myName}'s turn 💖`
                    : `${bffName}'s turn 💕`}
                </span>
                <span className="text-sm text-muted-foreground">
                  Q{currentQ + 1}/10
                </span>
              </div>
              <Progress value={(currentQ / 10) * 100} className="mb-4 h-2" />
              <div className="bg-pink-light-gp rounded-2xl p-5 mb-4 text-center">
                <p className="font-display font-bold text-xl">
                  {BFF_QUESTIONS[currentQ].q}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {BFF_QUESTIONS[currentQ].options.map((opt, i) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => pickAnswer(i)}
                    className="p-3 rounded-xl border-2 font-bold text-sm transition-all hover:scale-105 text-center"
                    style={{
                      borderColor: tempAnswer === i ? "#ff69b4" : "#e0e0e0",
                      backgroundColor: tempAnswer === i ? "#fff0f5" : "white",
                    }}
                    data-ocid="bff-test.secondary_button"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

        {phase === "bff-name" && (
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Now your BFF's turn! What's their name?
            </p>
            <input
              value={bffName}
              onChange={(e) => setBffName(e.target.value)}
              placeholder="BFF's name..."
              className="w-full px-4 py-3 rounded-xl border-2 border-pink-gp mb-4 text-center font-bold text-lg focus:outline-none"
              data-ocid="bff-test.input"
            />
            <Button
              className="rounded-full bg-pink-gp text-white font-bold px-10"
              disabled={!bffName.trim()}
              onClick={() => setPhase("bff-answers")}
              data-ocid="bff-test.primary_button"
            >
              {bffName}'s Turn! 💕
            </Button>
          </div>
        )}

        {phase === "result" && (
          <div className="text-center">
            <div className="text-6xl mb-4">💕</div>
            <h3
              className="font-display text-2xl font-bold mb-2"
              style={{ color: tier.color }}
            >
              {tier.label}
            </h3>
            <div className="mb-4">
              <div
                className="text-4xl font-bold mb-1"
                style={{ color: tier.color }}
              >
                {pct}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
                <div
                  className="h-5 rounded-full transition-all duration-1000"
                  style={{ width: `${pct}%`, backgroundColor: tier.color }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {matches}/10 matching answers
              </p>
            </div>
            {/* Certificate */}
            <div
              className="rounded-2xl border-4 p-6 mb-4"
              style={{ borderColor: tier.color, background: `${tier.color}10` }}
            >
              <div className="text-2xl mb-2">
                🏆 Official Friendship Certificate 🏆
              </div>
              <p className="font-bold text-lg">
                {myName} & {bffName}
              </p>
              <p className="text-sm text-muted-foreground">
                have been officially certified as
              </p>
              <p
                className="font-display font-bold text-xl mt-1"
                style={{ color: tier.color }}
              >
                {tier.label}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Issued by Girl Power Hub 💖
              </p>
            </div>
            <Button
              className="rounded-full bg-pink-gp text-white font-bold"
              onClick={reset}
              data-ocid="bff-test.primary_button"
            >
              Try Again! 💕
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// 7. TALENT SHOW BUZZER
// ============================================================
const TALENTS = [
  {
    label: "Singing",
    emoji: "🎤",
    prompts: [
      "Sing the chorus of your favorite song in an opera voice! 🎭",
      "Perform 'Twinkle Twinkle' as a rock song! 🎸",
      "Sing 'Happy Birthday' like a pop star! 🎂",
    ],
  },
  {
    label: "Dancing",
    emoji: "💃",
    prompts: [
      "Do your best moonwalk across the room! 🌙",
      "Perform a 30-second freestyle dance battle! 🕺",
      "Dance like a ballerina for 30 seconds! 🩰",
    ],
  },
  {
    label: "Comedy",
    emoji: "😂",
    prompts: [
      "Tell your funniest joke and your best punchline! 😂",
      "Do a stand-up comedy bit about school lunch! 🍱",
      "Impersonate your funniest teacher! 👩‍🏫",
    ],
  },
  {
    label: "Magic Trick",
    emoji: "🪄",
    prompts: [
      "Pick a card, ANY card! Reveal your trick! 🃏",
      "Make something disappear and reappear! ✨",
      "Perform your best mind-reading act! 🧠",
    ],
  },
  {
    label: "Gymnastics",
    emoji: "🤸‍♀️",
    prompts: [
      "Do your best cartwheel or round off! 🌀",
      "Show your best flexibility move! 🌟",
      "Perform a 30-second floor routine! 🏅",
    ],
  },
  {
    label: "Art",
    emoji: "🎨",
    prompts: [
      "Draw something amazing in 30 seconds! 🖍️",
      "Create a face using only your fingers! 🤚",
      "Sketch your dream house super quick! 🏡",
    ],
  },
  {
    label: "Storytelling",
    emoji: "📖",
    prompts: [
      "Tell the most dramatic story about your day! 📺",
      "Make up a fairy tale with YOU as the hero! 🏰",
      "Describe your dream adventure in 30 seconds! 🗺️",
    ],
  },
  {
    label: "Impressions",
    emoji: "🎭",
    prompts: [
      "Do your best impression of a famous person! 🌟",
      "Impersonate 3 different animals in 30 seconds! 🐘",
      "Do your best impression of a movie character! 🎬",
    ],
  },
];

export function TalentShowBuzzer() {
  const [talent, setTalent] = useState<(typeof TALENTS)[0] | null>(null);
  const [prompt, setPrompt] = useState("");
  const [timer, setTimer] = useState(30);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [starsRevealed, setStarsRevealed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pickTalent = (t: (typeof TALENTS)[0]) => {
    setTalent(t);
    setPrompt(t.prompts[Math.floor(Math.random() * t.prompts.length)]);
    setTimer(30);
    setRunning(false);
    setFinished(false);
    setStarsRevealed(0);
  };

  const startPerformance = () => {
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current!);
          setRunning(false);
          setFinished(true);
          const s = 7 + Math.floor(Math.random() * 4);
          setScore(s);
          // Reveal stars one by one
          for (let i = 1; i <= s; i++) {
            setTimeout(() => setStarsRevealed(i), i * 200);
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTalent(null);
    setPrompt("");
    setTimer(30);
    setRunning(false);
    setFinished(false);
    setScore(0);
    setStarsRevealed(0);
  };

  const crowdRow = "👏👏👏👏👏👏👏👏";

  return (
    <div>
      {sectionHeader(
        "🎤",
        "Talent Show Buzzer!",
        "Pick your talent, get a prompt, and perform!",
        "text-coral-gp",
      )}

      {!talent && (
        <div className="max-w-lg mx-auto">
          <p className="text-center text-muted-foreground mb-4">
            What's your talent today?
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TALENTS.map((t) => (
              <button
                key={t.label}
                type="button"
                onClick={() => pickTalent(t)}
                className="flex flex-col items-center p-4 rounded-2xl bg-coral-light-gp hover:scale-105 transition-all border-2 border-transparent hover:border-coral-gp"
                data-ocid="talent-show.secondary_button"
              >
                <span className="text-4xl mb-2">{t.emoji}</span>
                <span className="font-bold text-sm">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {talent && !finished && (
        <div className="max-w-md mx-auto text-center">
          <div className="bg-coral-light-gp rounded-2xl p-5 mb-4 border-2 border-coral-gp">
            <div className="text-4xl mb-2">{talent.emoji}</div>
            <h3 className="font-display font-bold text-xl text-coral-gp mb-3">
              {talent.label} Challenge!
            </h3>
            <p className="font-bold text-foreground leading-snug">{prompt}</p>
          </div>

          {/* Crowd */}
          {running && (
            <div className="mb-4 space-y-1">
              {[0, 1, 2].map((row) => (
                <div
                  key={row}
                  className="text-2xl animate-pulse"
                  style={{ animationDelay: `${row * 0.2}s` }}
                >
                  {crowdRow}
                </div>
              ))}
            </div>
          )}

          {/* Timer */}
          <div className="mb-4">
            <div
              className="text-5xl font-bold mb-2"
              style={{ color: timer <= 10 ? "#ff4444" : "#ff6347" }}
            >
              {timer}s
            </div>
            <Progress value={(timer / 30) * 100} className="h-4" />
          </div>

          {!running && (
            <Button
              size="lg"
              className="rounded-full bg-coral-gp text-white font-bold px-10"
              onClick={startPerformance}
              data-ocid="talent-show.primary_button"
            >
              Start Performing! 🎭
            </Button>
          )}
        </div>
      )}

      {finished && (
        <div className="max-w-md mx-auto text-center py-4">
          <div className="text-6xl mb-3">🏆</div>
          <h3 className="font-display font-bold text-3xl text-coral-gp mb-2">
            AMAZING PERFORMANCE!
          </h3>
          <p className="text-muted-foreground mb-4">Your score:</p>
          <div className="flex justify-center gap-1 mb-2 text-4xl">
            {"1234567890".split("").map((n, i) => (
              <span
                key={n}
                style={{
                  color: i < starsRevealed ? "#ffd700" : "#e0e0e0",
                  transition: "color 0.2s",
                }}
              >
                ★
              </span>
            ))}
          </div>
          <p className="font-bold text-2xl text-coral-gp mb-6">{score}/10 ⭐</p>
          <div className="flex gap-3 justify-center">
            <Button
              className="rounded-full bg-coral-gp text-white font-bold"
              onClick={() => pickTalent(talent!)}
              data-ocid="talent-show.primary_button"
            >
              Perform Again! 🎭
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={reset}
              data-ocid="talent-show.cancel_button"
            >
              New Talent
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 8. BUCKET LIST BUILDER
// ============================================================
const BUCKET_CATEGORIES = [
  {
    name: "Travel",
    emoji: "✈️",
    items: [
      "Visit Paris 🗼",
      "See the Northern Lights ✨",
      "Swim in the Great Barrier Reef 🐠",
      "Visit Disney World 🏰",
      "See the Grand Canyon 🏜️",
      "Ride a gondola in Venice 🛶",
      "Visit Japan 🌸",
      "Road trip across the USA 🚗",
    ],
  },
  {
    name: "Adventure",
    emoji: "🏔️",
    items: [
      "Go zip-lining 🌿",
      "Try rock climbing 🧗‍♀️",
      "Go white water rafting 🚣",
      "Skydive (when you're older!) 🪂",
      "Hike a mountain 🥾",
      "Surf a wave 🏄‍♀️",
      "Try horseback riding 🐴",
      "Go snorkeling 🤿",
    ],
  },
  {
    name: "Creative",
    emoji: "🎨",
    items: [
      "Write a novel 📖",
      "Paint a mural 🖌️",
      "Make a short film 🎬",
      "Design your own clothing line 👗",
      "Record an album 🎤",
      "Create a webcomic 🦸‍♀️",
      "Learn to play guitar 🎸",
      "Start a blog ✍️",
    ],
  },
  {
    name: "Friendship",
    emoji: "👯‍♀️",
    items: [
      "Have a best friends road trip 🚗",
      "Throw a surprise party 🎉",
      "Make a memory scrapbook 📸",
      "Bake cookies for friends 🍪",
      "Have a sleepover in a fort 🏰",
      "Write letters to pen pals ✉️",
      "Do a charity challenge together 💪",
      "Create a friendship time capsule 📦",
    ],
  },
  {
    name: "Learning",
    emoji: "📚",
    items: [
      "Learn a second language 🌍",
      "Try coding 💻",
      "Master a magic trick 🪄",
      "Learn to drive (one day!) 🚗",
      "Get a black belt 🥋",
      "Learn to play chess ♟️",
      "Take an art class 🎨",
      "Learn first aid 🩺",
    ],
  },
  {
    name: "Kindness",
    emoji: "💖",
    items: [
      "Volunteer at a shelter 🐾",
      "Start a food drive 🥫",
      "Plant trees 🌳",
      "Visit a nursing home 🌸",
      "Donate to a cause ❤️",
      "Mentor a younger kid 👶",
      "Clean up a park 🌿",
      "Write thank-you notes 📝",
    ],
  },
];

const BADGES = [
  { threshold: 10, emoji: "💫", label: "Dreamer" },
  { threshold: 25, emoji: "🌟", label: "Big Dreamer" },
  { threshold: 40, emoji: "🏆", label: "Legend" },
];

export function BucketListBuilder() {
  const [checked, setChecked] = useState<Set<string>>(() => {
    try {
      const s = localStorage.getItem("bucket-list");
      return new Set(s ? JSON.parse(s) : []);
    } catch {
      return new Set();
    }
  });

  const toggle = (item: string) => {
    const updated = new Set(checked);
    if (updated.has(item)) updated.delete(item);
    else updated.add(item);
    setChecked(updated);
    localStorage.setItem("bucket-list", JSON.stringify([...updated]));
  };

  const count = checked.size;
  const total = BUCKET_CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);
  const pct = Math.round((count / total) * 100);
  const unlockedBadges = BADGES.filter((b) => count >= b.threshold);

  return (
    <div>
      {sectionHeader(
        "🌟",
        "Bucket List Builder!",
        "Check off your dream adventures — 48 things to do before you grow up!",
        "text-teal-gp",
      )}

      {/* Progress */}
      <div className="max-w-lg mx-auto mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-bold text-teal-gp">
            {count} of {total} dreams unlocked!
          </span>
          <span className="text-muted-foreground">{pct}%</span>
        </div>
        <Progress value={pct} className="h-3" />

        {/* Badges */}
        {unlockedBadges.length > 0 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {unlockedBadges.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2 px-3 py-1 rounded-full font-bold text-sm bg-yellow-light-gp border-2 border-yellow-gp"
                style={{ animation: "shine 2s ease-in-out infinite" }}
              >
                <span className="text-xl">{b.emoji}</span>
                <span className="text-yellow-gp">{b.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {BUCKET_CATEGORIES.map((cat) => (
          <div key={cat.name} className="bg-teal-light-gp rounded-2xl p-4">
            <h3 className="font-bold text-teal-gp mb-3">
              {cat.emoji} {cat.name}
            </h3>
            <div className="space-y-2">
              {cat.items.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 cursor-pointer hover:bg-white/50 rounded-lg p-1 transition-all"
                >
                  <input
                    type="checkbox"
                    checked={checked.has(item)}
                    onChange={() => toggle(item)}
                    className="accent-pink-500 w-4 h-4"
                    data-ocid="bucket-list.checkbox"
                  />
                  <span
                    className="text-sm"
                    style={{
                      textDecoration: checked.has(item)
                        ? "line-through"
                        : "none",
                      color: checked.has(item) ? "#ff69b4" : "inherit",
                    }}
                  >
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// 9. GLOW STICK DANCE CHALLENGE
// ============================================================
const SONG_MOODS = [
  { label: "Pop", emoji: "🎵", color: "#ff69b4" },
  { label: "Hip Hop", emoji: "🎤", color: "#9370db" },
  { label: "EDM", emoji: "⚡", color: "#00ffff" },
  { label: "K-Pop", emoji: "💖", color: "#ff1493" },
  { label: "Country", emoji: "🤠", color: "#ffd700" },
];

const DANCE_CUES = [
  "Left arm wave! 👋",
  "Spin around! 🌀",
  "Jump up! ⬆️",
  "Shake it! 💃",
  "Clap clap clap! 👏",
  "Do the robot! 🤖",
  "Head roll! 🌀",
  "Drop low! ⬇️",
];

export function GlowStickDanceChallenge() {
  const [mood, setMood] = useState<(typeof SONG_MOODS)[0] | null>(null);
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [cueIndex, setCueIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [dancerAngle, setDancerAngle] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cueRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startDance = () => {
    if (!mood) return;
    setRunning(true);
    setTimeLeft(60);
    setCueIndex(0);
    setFinished(false);
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current!);
          clearInterval(cueRef.current!);
          setRunning(false);
          setFinished(true);
          return 0;
        }
        return t - 1;
      });
      setDancerAngle((a) => a + 15);
    }, 1000);
    cueRef.current = setInterval(() => {
      setCueIndex((i) => (i + 1) % DANCE_CUES.length);
    }, 8000);
  };

  const reset = () => {
    clearInterval(intervalRef.current!);
    clearInterval(cueRef.current!);
    setMood(null);
    setRunning(false);
    setTimeLeft(60);
    setFinished(false);
    setCueIndex(0);
  };

  const neonColor = mood?.color || "#ff69b4";

  return (
    <div>
      {sectionHeader(
        "🌈",
        "Glow Stick Dance Challenge!",
        "Pick your vibe and dance like nobody's watching!",
        "text-purple-gp",
      )}

      <div
        className="max-w-md mx-auto rounded-2xl p-6 text-center"
        style={{
          background: "linear-gradient(135deg, #0a0020, #0d0035, #000020)",
          border: `3px solid ${neonColor}`,
          boxShadow: `0 0 20px ${neonColor}60, 0 0 40px ${neonColor}30`,
        }}
      >
        {!mood && !running && !finished && (
          <div>
            <p className="text-white/80 mb-4 font-bold">Pick your song mood:</p>
            <div className="grid grid-cols-5 gap-2">
              {SONG_MOODS.map((m) => (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => setMood(m)}
                  className="flex flex-col items-center p-3 rounded-xl transition-all hover:scale-110"
                  style={{
                    background: `${m.color}25`,
                    border: `2px solid ${m.color}`,
                    boxShadow: `0 0 10px ${m.color}50`,
                    color: "white",
                  }}
                  data-ocid="glow-dance.secondary_button"
                >
                  <span className="text-2xl">{m.emoji}</span>
                  <span className="text-xs mt-1 font-bold">{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {mood && !running && !finished && (
          <div>
            <div
              className="text-5xl mb-4"
              style={{ color: neonColor, textShadow: `0 0 20px ${neonColor}` }}
            >
              {mood.emoji}
            </div>
            <p
              className="text-white font-bold text-lg mb-2"
              style={{ color: neonColor }}
            >
              {mood.label} Time!
            </p>
            <p className="text-white/60 text-sm mb-6">
              60 seconds of pure dancing! Move those arms and feet!
            </p>
            <button
              type="button"
              onClick={startDance}
              className="px-8 py-4 rounded-full font-bold text-lg text-white transition-all hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${neonColor}, #ff1493)`,
                boxShadow: `0 0 20px ${neonColor}, 0 0 40px ${neonColor}60`,
              }}
              data-ocid="glow-dance.primary_button"
            >
              Start Dancing! 💃
            </button>
          </div>
        )}

        {running && (
          <div>
            {/* Stick figure dancer */}
            <div className="flex justify-center mb-4 relative">
              <div style={{ position: "relative", width: 80, height: 120 }}>
                {/* Head */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    border: `3px solid ${neonColor}`,
                    boxShadow: `0 0 10px ${neonColor}`,
                  }}
                />
                {/* Body */}
                <div
                  style={{
                    position: "absolute",
                    top: 30,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 4,
                    height: 40,
                    backgroundColor: neonColor,
                    boxShadow: `0 0 8px ${neonColor}`,
                  }}
                />
                {/* Left arm */}
                <div
                  style={{
                    position: "absolute",
                    top: 38,
                    left: "10%",
                    width: 30,
                    height: 4,
                    backgroundColor: neonColor,
                    boxShadow: `0 0 8px ${neonColor}`,
                    transform: `rotate(${Math.sin((dancerAngle * Math.PI) / 180) * 30}deg)`,
                    transformOrigin: "right center",
                  }}
                />
                {/* Right arm */}
                <div
                  style={{
                    position: "absolute",
                    top: 38,
                    right: "10%",
                    width: 30,
                    height: 4,
                    backgroundColor: neonColor,
                    boxShadow: `0 0 8px ${neonColor}`,
                    transform: `rotate(${-Math.sin((dancerAngle * Math.PI) / 180) * 30}deg)`,
                    transformOrigin: "left center",
                  }}
                />
                {/* Left leg */}
                <div
                  style={{
                    position: "absolute",
                    top: 70,
                    left: "30%",
                    width: 4,
                    height: 40,
                    backgroundColor: neonColor,
                    boxShadow: `0 0 8px ${neonColor}`,
                    transform: `rotate(${Math.cos((dancerAngle * Math.PI) / 180) * 20}deg)`,
                    transformOrigin: "top center",
                  }}
                />
                {/* Right leg */}
                <div
                  style={{
                    position: "absolute",
                    top: 70,
                    right: "30%",
                    width: 4,
                    height: 40,
                    backgroundColor: neonColor,
                    boxShadow: `0 0 8px ${neonColor}`,
                    transform: `rotate(${-Math.cos((dancerAngle * Math.PI) / 180) * 20}deg)`,
                    transformOrigin: "top center",
                  }}
                />
              </div>
            </div>

            {/* Timer */}
            <div
              className="text-6xl font-bold mb-2"
              style={{ color: neonColor, textShadow: `0 0 15px ${neonColor}` }}
            >
              {timeLeft}s
            </div>

            {/* Dance cue */}
            <div
              className="px-4 py-3 rounded-xl mb-4 font-bold text-xl"
              style={{
                background: `${neonColor}20`,
                border: `2px solid ${neonColor}`,
                color: neonColor,
                textShadow: `0 0 10px ${neonColor}`,
                boxShadow: `0 0 10px ${neonColor}40`,
                animation: "pulse 0.5s ease-in-out",
              }}
            >
              {DANCE_CUES[cueIndex]}
            </div>

            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div
                className="h-3 rounded-full transition-all duration-1000"
                style={{
                  width: `${(timeLeft / 60) * 100}%`,
                  backgroundColor: neonColor,
                  boxShadow: `0 0 8px ${neonColor}`,
                }}
              />
            </div>
          </div>
        )}

        {finished && (
          <div>
            <div
              className="text-5xl mb-3"
              style={{ color: "#ffd700", textShadow: "0 0 20px #ffd700" }}
            >
              🏆
            </div>
            <h3
              className="font-bold text-2xl text-white mb-2"
              style={{ textShadow: `0 0 10px ${neonColor}` }}
            >
              Dance Star Certificate!
            </h3>
            <div
              className="rounded-xl p-4 mb-4"
              style={{
                border: `2px solid ${neonColor}`,
                background: `${neonColor}15`,
              }}
            >
              <p className="text-white font-bold">
                🎤 You danced for 60 seconds!
              </p>
              <p className="text-white/70 text-sm mt-1">
                Genre: {mood?.label} {mood?.emoji}
              </p>
              <p className="font-bold mt-2" style={{ color: neonColor }}>
                ⭐ Official Dance Star ⭐
              </p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="px-8 py-3 rounded-full font-bold text-white"
              style={{
                background: `linear-gradient(135deg, ${neonColor}, #ff1493)`,
                boxShadow: `0 0 15px ${neonColor}`,
              }}
              data-ocid="glow-dance.primary_button"
            >
              Dance Again! 💃
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// 10. STAR GIRL AWARDS
// ============================================================
const AWARD_CATEGORIES = [
  { emoji: "🎨", label: "Most Creative" },
  { emoji: "💃", label: "Best Dancer" },
  { emoji: "😂", label: "Funniest" },
  { emoji: "💖", label: "Best Friend" },
  { emoji: "🏔️", label: "Most Adventurous" },
  { emoji: "👩‍🍳", label: "Best Cook" },
  { emoji: "👗", label: "Most Fashionable" },
  { emoji: "🎤", label: "Best Singer" },
  { emoji: "✨", label: "Most Inspiring" },
  { emoji: "🌸", label: "Kindest Heart" },
];

export function StarGirlAwards() {
  const [nominees, setNominees] = useState<string[]>(Array(10).fill(""));
  const [showReveal, setShowReveal] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [done, setDone] = useState(false);

  const updateNominee = (i: number, val: string) => {
    const updated = [...nominees];
    updated[i] = val;
    setNominees(updated);
  };

  const allFilled = nominees.every((n) => n.trim().length > 0);

  const startAwardShow = () => {
    setShowReveal(true);
    setRevealedCount(0);
    for (let i = 1; i <= 10; i++) {
      setTimeout(() => {
        setRevealedCount(i);
        if (i === 10) setDone(true);
      }, i * 1000);
    }
  };

  const reset = () => {
    setNominees(Array(10).fill(""));
    setShowReveal(false);
    setRevealedCount(0);
    setDone(false);
  };

  return (
    <div>
      {sectionHeader(
        "🏅",
        "Star Girl Awards!",
        "Nominate your friends and reveal the award show!",
        "text-yellow-gp",
      )}

      {!showReveal ? (
        <div className="max-w-lg mx-auto">
          <p className="text-center text-muted-foreground mb-5">
            Fill in a name for each award category (could be you or a friend!):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {AWARD_CATEGORIES.map((award, i) => (
              <div
                key={award.label}
                className="flex items-center gap-2 bg-yellow-light-gp rounded-xl p-3"
              >
                <span className="text-2xl shrink-0">{award.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-xs text-yellow-gp mb-1">
                    {award.label}
                  </p>
                  <input
                    value={nominees[i]}
                    onChange={(e) => updateNominee(i, e.target.value)}
                    placeholder="Enter a name..."
                    className="w-full px-2 py-1 rounded-lg border border-yellow-gp text-sm font-bold focus:outline-none focus:border-pink-gp"
                    data-ocid="awards.input"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button
              size="lg"
              className="rounded-full font-bold px-10 text-foreground"
              style={{ background: "oklch(var(--yellow))" }}
              disabled={!allFilled}
              onClick={startAwardShow}
              data-ocid="awards.primary_button"
            >
              Generate Award Show! 🎬
            </Button>
          </div>
        </div>
      ) : (
        <div className="max-w-lg mx-auto text-center">
          <div
            className="rounded-2xl p-6 border-4"
            style={{
              borderColor: "#ffd700",
              background: "linear-gradient(135deg, #fffde7, #fff8e1)",
              boxShadow: "0 0 30px rgba(255,215,0,0.3)",
            }}
          >
            <div className="text-4xl mb-2">🎬 AWARD SHOW! 🎬</div>
            <p className="text-sm text-muted-foreground mb-6">
              Girl Power Hub Official Awards Ceremony
            </p>

            <div className="space-y-3">
              {AWARD_CATEGORIES.map((award, i) => (
                <div
                  key={award.label}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all"
                  style={{
                    background:
                      i < revealedCount
                        ? "linear-gradient(135deg, #fff9c4, #fffde7)"
                        : "#f5f5f5",
                    border:
                      i < revealedCount
                        ? "2px solid #ffd700"
                        : "2px solid #e0e0e0",
                    animation:
                      i === revealedCount - 1
                        ? "drumroll 0.3s ease-out"
                        : "none",
                    opacity: i < revealedCount ? 1 : 0.4,
                  }}
                >
                  <span className="text-2xl">{award.emoji}</span>
                  <div className="flex-1 text-left">
                    <p className="text-xs font-bold text-muted-foreground">
                      {award.label}
                    </p>
                    {i < revealedCount ? (
                      <p className="font-display font-bold text-foreground">
                        {nominees[i]} 🏆
                      </p>
                    ) : (
                      <p className="text-muted-foreground text-sm">...</p>
                    )}
                  </div>
                  {i < revealedCount && <span className="text-xl">✨</span>}
                </div>
              ))}
            </div>

            {done && (
              <div className="mt-6">
                <div className="text-3xl mb-2">
                  🎊 Congratulations to ALL winners! 🎊
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  You are all AMAZING Girl Power stars!
                </p>
                <Button
                  className="rounded-full font-bold text-foreground"
                  style={{ background: "oklch(var(--yellow))" }}
                  onClick={reset}
                  data-ocid="awards.primary_button"
                >
                  New Award Show! 🎬
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes drumroll {
          0% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes shine {
          0%, 100% { box-shadow: 0 0 5px rgba(255,215,0,0.3); }
          50% { box-shadow: 0 0 15px rgba(255,215,0,0.7); }
        }
      `}</style>
    </div>
  );
}
