import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── helpers ────────────────────────────────────────────────────────────────

function loadLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function saveLS(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

// ════════════════════════════════════════════════════════════════════════════
// GET OFF YOUR PHONE COMPONENTS
// ════════════════════════════════════════════════════════════════════════════

// ─── 1. PhoneFreeChallenge ───────────────────────────────────────────────────
export function PhoneFreeChallenge() {
  const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [checked, setChecked] = useState<boolean[]>(() =>
    loadLS("pfc-checked", Array(7).fill(false)),
  );

  const toggle = (i: number) => {
    const next = checked.map((v, idx) => (idx === i ? !v : v));
    setChecked(next);
    saveLS("pfc-checked", next);
  };
  const streak = checked.filter(Boolean).length;

  const reset = () => {
    const empty = Array(7).fill(false);
    setChecked(empty);
    saveLS("pfc-checked", empty);
  };

  return (
    <div className="p-4">
      <h2 className="font-display text-2xl font-bold text-teal-gp mb-1">
        📵 Phone-Free Challenge
      </h2>
      <p className="text-muted-foreground text-sm mb-4">
        Check off every day you stayed phone-free for at least 1 hour!
      </p>

      <div className="flex items-center gap-3 mb-5">
        <div className="bg-teal-gp text-white rounded-2xl px-5 py-3 text-center">
          <div className="text-3xl font-bold font-display">{streak}</div>
          <div className="text-xs">days completed</div>
        </div>
        <Progress
          value={(streak / 7) * 100}
          className="flex-1 h-4 rounded-full"
        />
        <span className="text-2xl">
          {streak === 7 ? "🏆" : streak >= 4 ? "⭐" : "💪"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {DAYS.map((day, i) => (
          <button
            key={day}
            type="button"
            onClick={() => toggle(i)}
            data-ocid={`pfc.checkbox.${i + 1}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all font-medium text-sm
              ${checked[i] ? "border-teal-gp bg-teal-gp/10 text-teal-gp" : "border-border hover:border-teal-gp"}`}
          >
            <span
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold
              ${checked[i] ? "bg-teal-gp border-teal-gp text-white" : "border-muted-foreground"}`}
            >
              {checked[i] ? "✓" : ""}
            </span>
            {day}
          </button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={reset}
        className="rounded-full text-muted-foreground"
        data-ocid="pfc.delete_button"
      >
        Reset Week
      </Button>

      {streak === 7 && (
        <div
          className="mt-4 bg-teal-gp/10 border-2 border-teal-gp rounded-2xl p-4 text-center"
          data-ocid="pfc.success_state"
        >
          <div className="text-3xl mb-1">🏆</div>
          <p className="font-bold text-teal-gp font-display">
            INCREDIBLE! You did ALL 7 days!
          </p>
          <p className="text-sm text-muted-foreground">
            You are a Phone-Free Champion! 👑
          </p>
        </div>
      )}
    </div>
  );
}

// ─── 2. PhoneJarGame ─────────────────────────────────────────────────────────
export function PhoneJarGame() {
  const [coins, setCoins] = useState<number>(() => loadLS("pjg-coins", 0));
  const MAX = 20;

  const addCoin = () => {
    const next = Math.min(coins + 1, MAX);
    setCoins(next);
    saveLS("pjg-coins", next);
  };
  const removeCoin = () => {
    const next = Math.max(coins - 1, 0);
    setCoins(next);
    saveLS("pjg-coins", next);
  };
  const reset = () => {
    setCoins(0);
    saveLS("pjg-coins", 0);
  };

  const pct = Math.round((coins / MAX) * 100);

  const msg =
    coins === MAX
      ? "🎉 JAR IS FULL! You're a legend!"
      : coins >= 15
        ? "So close! Keep going! 💛"
        : coins >= 10
          ? "Half-way there! Amazing! ⭐"
          : coins >= 5
            ? "Great start! Keep putting down the phone! 🌟"
            : "Add a coin every time you put your phone down!";

  return (
    <div className="p-4">
      <h2 className="font-display text-2xl font-bold text-teal-gp mb-1">
        🫙 Phone Jar Game
      </h2>
      <p className="text-muted-foreground text-sm mb-5">
        Every time you put your phone down for 30+ minutes, add a coin!
      </p>

      {/* Jar visual */}
      <div className="flex justify-center mb-5">
        <div className="relative w-36 h-44">
          {/* jar body */}
          <div className="absolute bottom-0 left-3 right-3 border-4 border-teal-gp rounded-b-3xl overflow-hidden bg-white/40 h-36">
            <div
              className="absolute bottom-0 left-0 right-0 bg-teal-gp/30 transition-all duration-500"
              style={{ height: `${pct}%` }}
            />
            <div className="absolute inset-0 grid grid-cols-4 gap-1 p-2 content-end">
              {Array.from({ length: MAX }, (_, i) => {
                const slotId = `jar-slot-position-${i + 1}`;
                return (
                  <div
                    key={slotId}
                    className={`w-5 h-5 rounded-full text-center text-xs flex items-center justify-center transition-all duration-300
                      ${i < coins ? "bg-yellow-gp shadow-sm scale-100" : "opacity-0 scale-50"}`}
                  >
                    {i < coins ? "🪙" : ""}
                  </div>
                );
              })}
            </div>
          </div>
          {/* jar lid */}
          <div className="absolute top-6 left-1 right-1 h-5 bg-teal-gp/40 border-2 border-teal-gp rounded-lg" />
          <div className="absolute top-0 left-4 right-4 h-8 bg-teal-gp/20 border-2 border-teal-gp rounded-t-full" />
        </div>
      </div>

      <p className="text-center font-bold text-teal-gp mb-1">
        {coins} / {MAX} coins
      </p>
      <p className="text-center text-sm text-muted-foreground mb-5">{msg}</p>

      <div className="flex gap-3 justify-center">
        <Button
          onClick={addCoin}
          disabled={coins >= MAX}
          className="bg-teal-gp text-white rounded-full px-6 font-bold hover:bg-teal-gp/90"
          data-ocid="pjg.primary_button"
        >
          + Add Coin 🪙
        </Button>
        <Button
          variant="outline"
          onClick={removeCoin}
          disabled={coins <= 0}
          className="rounded-full"
          data-ocid="pjg.secondary_button"
        >
          Remove
        </Button>
        <Button
          variant="ghost"
          onClick={reset}
          className="rounded-full text-muted-foreground text-xs"
          data-ocid="pjg.delete_button"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

// ─── 3. OutdoorAdventureList ─────────────────────────────────────────────────
const OUTDOOR_ADVENTURES = [
  { emoji: "🚴", label: "Go for a bike ride around the block" },
  { emoji: "⭐", label: "Star-gaze in the backyard at night" },
  { emoji: "🦟", label: "Catch fireflies after sunset" },
  { emoji: "🏃", label: "Race your friend to the end of the street" },
  { emoji: "🌸", label: "Pick wildflowers and make a bouquet" },
  { emoji: "🪁", label: "Fly a kite at the park" },
  { emoji: "⛸️", label: "Try roller skating or skateboarding" },
  { emoji: "🌊", label: "Play in a sprinkler or hose" },
  { emoji: "🧗", label: "Climb a tree safely" },
  { emoji: "🍃", label: "Build a leaf pile and jump in it" },
  { emoji: "🐌", label: "Look for snails and slugs after rain" },
  { emoji: "🏕️", label: "Set up a blanket fort in the yard" },
  { emoji: "🎨", label: "Draw with chalk on the sidewalk" },
  { emoji: "⛏️", label: "Dig a mini garden patch" },
  { emoji: "🦋", label: "Spot 5 different butterflies or bugs" },
  { emoji: "📸", label: "Take nature photos with an old camera" },
  { emoji: "🌧️", label: "Puddle jumping in rain boots" },
  { emoji: "🌅", label: "Watch the sunrise or sunset" },
  { emoji: "🏊", label: "Swim laps or play pool games" },
  { emoji: "🎭", label: "Put on an outdoor puppet show" },
];

export function OutdoorAdventureList() {
  const [checked, setChecked] = useState<boolean[]>(() =>
    loadLS("oal-checked", Array(OUTDOOR_ADVENTURES.length).fill(false)),
  );
  const done = checked.filter(Boolean).length;

  const toggle = (i: number) => {
    const next = checked.map((v, idx) => (idx === i ? !v : v));
    setChecked(next);
    saveLS("oal-checked", next);
  };

  return (
    <div className="p-4">
      <h2 className="font-display text-2xl font-bold text-teal-gp mb-1">
        🌳 Outdoor Adventures
      </h2>
      <p className="text-muted-foreground text-sm mb-3">
        Check off every adventure you complete! Your goal: all 20!
      </p>

      <div className="flex items-center gap-3 mb-5">
        <Progress
          value={(done / OUTDOOR_ADVENTURES.length) * 100}
          className="flex-1 h-3"
        />
        <span className="font-bold text-teal-gp text-sm">
          {done}/{OUTDOOR_ADVENTURES.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {OUTDOOR_ADVENTURES.map((a, i) => (
          <button
            key={a.label}
            type="button"
            onClick={() => toggle(i)}
            data-ocid={`oal.item.${i + 1}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm text-left transition-all
              ${checked[i] ? "border-teal-gp bg-teal-gp/10 line-through opacity-70" : "border-border hover:border-teal-gp"}`}
          >
            <span className="text-xl shrink-0">{a.emoji}</span>
            <span className={checked[i] ? "text-muted-foreground" : ""}>
              {a.label}
            </span>
            {checked[i] && <span className="ml-auto text-teal-gp">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── 4. BoredomBusterCards ──────────────────────────────────────────────────
const BOREDOM_BUSTERS = [
  "Write a poem about your pet 🐾",
  "Learn to whistle a song 🎵",
  "Teach yourself to juggle with 2 balls 🎪",
  "Make friendship bracelets 💜",
  "Build the tallest Lego tower you can 🏗️",
  "Write a letter to your future self ✉️",
  "Learn 10 words in a new language 🌍",
  "Design your dream bedroom 🏠",
  "Make a paper plane and see how far it flies ✈️",
  "Draw a comic strip starring YOU 🦸‍♀️",
  "Bake something with ingredients you have 🍪",
  "Start a dance routine to your fave song 💃",
  "Write a short story about a magical place 🏰",
  "Invent a new sport and write the rules ⚽",
  "Make a playlist for every mood 🎧",
  "Try to draw your house from memory 🏡",
  "Collect 10 interesting rocks or leaves 🍂",
  "Fold origami animals from paper 🦢",
  "Learn a magic trick to show your friends 🪄",
  "Make a photo album of your favorite memories 📸",
  "Write a recipe for the most epic sandwich 🥪",
  "Create your own word search puzzle 📝",
  "Do 20 jumping jacks and see how you feel 💪",
];

export function BoredomBusterCards() {
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [order, setOrder] = useState<number[]>(() =>
    [...Array(BOREDOM_BUSTERS.length).keys()].sort(() => Math.random() - 0.5),
  );
  const [done, setDone] = useState<Set<number>>(() => new Set());

  const shuffle = () => {
    setOrder(
      [...Array(BOREDOM_BUSTERS.length).keys()].sort(() => Math.random() - 0.5),
    );
    setCurrent(0);
    setRevealed(false);
    setDone(new Set());
  };

  const next = () => {
    setDone((prev) => new Set(prev).add(order[current]));
    setCurrent((c) => (c + 1) % order.length);
    setRevealed(false);
  };

  const activity = BOREDOM_BUSTERS[order[current]];

  return (
    <div className="p-4">
      <h2 className="font-display text-2xl font-bold text-teal-gp mb-1">
        🎴 Boredom Buster Cards
      </h2>
      <p className="text-muted-foreground text-sm mb-5">
        Tap the card to reveal a fun activity when you&apos;re bored!
      </p>

      <button
        type="button"
        className={`relative mx-auto max-w-sm w-full h-48 rounded-3xl border-4 cursor-pointer select-none transition-all duration-500 flex items-center justify-center
          ${revealed ? "border-teal-gp bg-teal-gp/10 scale-105" : "border-dashed border-teal-gp/40 bg-teal-gp/5 hover:bg-teal-gp/10"}`}
        onClick={() => setRevealed(true)}
        data-ocid="bbc.canvas_target"
      >
        {revealed ? (
          <div className="text-center px-6">
            <p className="text-xl font-bold font-display text-teal-gp leading-snug">
              {activity}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Card {done.size + 1} of {BOREDOM_BUSTERS.length}
            </p>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-5xl mb-3">🎴</div>
            <p className="text-sm text-muted-foreground font-medium">
              Tap to reveal!
            </p>
          </div>
        )}
      </button>

      <div className="flex gap-3 justify-center mt-5">
        {revealed && (
          <Button
            onClick={next}
            className="bg-teal-gp text-white rounded-full font-bold hover:bg-teal-gp/90"
            data-ocid="bbc.primary_button"
          >
            Next Card →
          </Button>
        )}
        <Button
          variant="outline"
          onClick={shuffle}
          className="rounded-full"
          data-ocid="bbc.secondary_button"
        >
          🔀 Shuffle
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3">
        {done.size} cards explored · {BOREDOM_BUSTERS.length - done.size - 1}{" "}
        left
      </p>
    </div>
  );
}

// ─── 5. UnplugAndDoodle ──────────────────────────────────────────────────────
export function UnplugAndDoodle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#f472b6");
  const [size, setSize] = useState(6);
  const [cleared, setCleared] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const getPos = (
    e: React.MouseEvent | React.TouchEvent,
    canvas: HTMLCanvasElement,
  ) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    setDrawing(true);
    setCleared(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    lastPos.current = getPos(e, canvas);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    e.preventDefault();
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (lastPos.current) {
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
    }
    ctx.stroke();
    lastPos.current = pos;
  };

  const stopDraw = () => {
    setDrawing(false);
    lastPos.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setCleared(true);
    }
  };

  const COLORS = [
    "#f472b6",
    "#a78bfa",
    "#34d399",
    "#fb923c",
    "#60a5fa",
    "#facc15",
    "#e11d48",
    "#1e1b4b",
    "#ffffff",
    "#000000",
  ];

  return (
    <div className="p-4">
      <h2 className="font-display text-2xl font-bold text-teal-gp mb-1">
        ✏️ Unplug & Doodle
      </h2>
      <p className="text-muted-foreground text-sm mb-4">
        Put down your phone and draw something amazing on this canvas!
      </p>

      <div className="flex flex-wrap gap-2 mb-3 items-center">
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            data-ocid="doodle.toggle"
            className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110
              ${color === c ? "border-foreground scale-110" : "border-transparent"}`}
            style={{ backgroundColor: c }}
            aria-label={`Color ${c}`}
          />
        ))}
        <div className="ml-2 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Size:</span>
          {[4, 8, 14, 22].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              data-ocid="doodle.secondary_button"
              className={`rounded-full border-2 flex items-center justify-center transition-all
                ${size === s ? "border-teal-gp bg-teal-gp/20" : "border-border"}`}
              style={{ width: s + 14, height: s + 14 }}
            >
              <div
                className="rounded-full bg-foreground"
                style={{ width: s, height: s }}
              />
            </button>
          ))}
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="w-full rounded-2xl border-2 border-border cursor-crosshair touch-none bg-white"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
        data-ocid="doodle.canvas_target"
      />

      <div className="flex gap-3 mt-3 justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={clearCanvas}
          className="rounded-full"
          data-ocid="doodle.delete_button"
        >
          🗑️ Clear Canvas
        </Button>
        {cleared && (
          <span
            className="text-xs text-muted-foreground"
            data-ocid="doodle.success_state"
          >
            Canvas cleared! Start fresh 🎨
          </span>
        )}
      </div>
    </div>
  );
}

// ─── 6. StretchBreakTimer ────────────────────────────────────────────────────
const STRETCH_PROMPTS = [
  { emoji: "🙆‍♀️", label: "Reach your arms up high — stretch to the sky!" },
  { emoji: "🧘‍♀️", label: "Sit cross-legged and breathe deeply 3 times" },
  { emoji: "🦵", label: "Stand up and shake out your legs" },
  { emoji: "👐", label: "Roll your shoulders backwards 5 times" },
  { emoji: "🤸‍♀️", label: "Touch your toes (or try!)" },
  {
    emoji: "😤",
    label: "Take a big breath in through your nose, out through your mouth",
  },
  { emoji: "💪", label: "Flex your arms and make a muscle!" },
  { emoji: "🌀", label: "Gently roll your neck from side to side" },
];

export function StretchBreakTimer() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [promptIdx, setPromptIdx] = useState(0);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = (seconds: number) => {
    setTimeLeft(seconds);
    setRunning(true);
    setDone(false);
    setPromptIdx(Math.floor(Math.random() * STRETCH_PROMPTS.length));
  };

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setRunning(false);
          setDone(true);
          clearInterval(intervalRef.current!);
          return 0;
        }
        if (t % 10 === 0)
          setPromptIdx(Math.floor(Math.random() * STRETCH_PROMPTS.length));
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [running]);

  const stop = () => {
    setRunning(false);
    setTimeLeft(0);
    clearInterval(intervalRef.current!);
  };

  const prompt = STRETCH_PROMPTS[promptIdx];
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="p-4">
      <h2 className="font-display text-2xl font-bold text-teal-gp mb-1">
        🧘 Stretch Break Timer
      </h2>
      <p className="text-muted-foreground text-sm mb-5">
        Take a stretch break from your screen — your body will thank you!
      </p>

      {!running && !done && (
        <div className="flex flex-wrap gap-3 justify-center mb-5">
          {[
            { label: "30 sec", value: 30 },
            { label: "1 min", value: 60 },
            { label: "5 min", value: 300 },
          ].map((opt) => (
            <Button
              key={opt.value}
              onClick={() => start(opt.value)}
              className="bg-teal-gp text-white rounded-full px-6 font-bold hover:bg-teal-gp/90"
              data-ocid="stretch.primary_button"
            >
              ⏱️ {opt.label}
            </Button>
          ))}
        </div>
      )}

      {running && (
        <div className="text-center" data-ocid="stretch.loading_state">
          <div className="text-7xl font-display font-bold text-teal-gp mb-2">
            {mins > 0 ? `${mins}:${String(secs).padStart(2, "0")}` : secs}
          </div>
          <div className="text-5xl mb-3">{prompt.emoji}</div>
          <p className="text-lg font-medium text-foreground mb-5 max-w-xs mx-auto">
            {prompt.label}
          </p>
          <Button
            variant="outline"
            onClick={stop}
            className="rounded-full"
            data-ocid="stretch.cancel_button"
          >
            Stop Timer
          </Button>
        </div>
      )}

      {done && (
        <div
          className="text-center bg-teal-gp/10 rounded-2xl p-6"
          data-ocid="stretch.success_state"
        >
          <div className="text-5xl mb-3">🎉</div>
          <p className="font-display font-bold text-teal-gp text-xl mb-1">
            Great stretch break!
          </p>
          <p className="text-muted-foreground text-sm mb-4">
            Your body and mind feel refreshed!
          </p>
          <Button
            onClick={() => setDone(false)}
            className="bg-teal-gp text-white rounded-full"
            data-ocid="stretch.secondary_button"
          >
            Take Another Break
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── 7. GratitudeWalk ────────────────────────────────────────────────────────
const GRATITUDE_PROMPTS = [
  "Find something blue — what is it?",
  "Listen quietly — can you hear a bird?",
  "Pick up a leaf and describe its texture",
  "Spot 3 different shapes in nature",
  "Feel the ground beneath your feet",
  "Find something that smells wonderful",
  "Watch a cloud for 30 seconds",
  "Name 3 things you're grateful for RIGHT NOW",
  "Touch the bark of a tree",
  "Find a tiny creature (bug, worm, snail)",
  "Notice the light — is it warm or cool?",
  "Pick a wildflower (if allowed!)",
  "Find something perfectly symmetrical",
  "Listen for the wind in the leaves",
  "Spot something that makes you smile",
  "Find the biggest rock nearby",
  "Notice 5 different shades of green",
  "Take 3 deep breaths of fresh air",
];

export function GratitudeWalk() {
  const [promptIdx, setPromptIdx] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(() => new Set());
  const [note, setNote] = useState("");

  const nextPrompt = () => {
    setVisited((prev) => new Set(prev).add(promptIdx));
    let next = Math.floor(Math.random() * GRATITUDE_PROMPTS.length);
    while (next === promptIdx && GRATITUDE_PROMPTS.length > 1)
      next = Math.floor(Math.random() * GRATITUDE_PROMPTS.length);
    setPromptIdx(next);
    setNote("");
  };

  return (
    <div className="p-4">
      <h2 className="font-display text-2xl font-bold text-teal-gp mb-1">
        🌸 Gratitude Walk
      </h2>
      <p className="text-muted-foreground text-sm mb-5">
        Go outside and use these prompts to notice the beauty around you!
      </p>

      <div className="bg-teal-gp/10 border-2 border-teal-gp rounded-3xl p-6 text-center mb-5">
        <div className="text-5xl mb-3">🌿</div>
        <p className="text-xl font-bold font-display text-teal-gp leading-snug">
          {GRATITUDE_PROMPTS[promptIdx]}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Prompt {visited.size + 1} · {GRATITUDE_PROMPTS.length} total prompts
        </p>
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write what you discovered... 🌱"
        rows={3}
        className="w-full px-4 py-3 rounded-2xl border-2 border-border text-sm focus:border-teal-gp outline-none resize-none mb-3"
        data-ocid="gratitude.textarea"
      />

      <Button
        onClick={nextPrompt}
        className="w-full bg-teal-gp text-white rounded-full font-bold hover:bg-teal-gp/90"
        data-ocid="gratitude.primary_button"
      >
        Next Prompt 🌸
      </Button>

      <p className="text-center text-xs text-muted-foreground mt-3">
        {visited.size} prompts explored
      </p>
    </div>
  );
}

// ─── 8. RealLifeScavengerHunt ────────────────────────────────────────────────
const SCAVENGER_ITEMS = [
  { emoji: "📚", label: "A book with a red cover" },
  { emoji: "🧦", label: "A sock with a fun pattern" },
  { emoji: "🌱", label: "Something growing (plant or sprout)" },
  { emoji: "🪨", label: "An interesting rock or pebble" },
  { emoji: "🔑", label: "Something that opens a lock" },
  { emoji: "📷", label: "Something round and shiny" },
  { emoji: "🎀", label: "Something tied in a bow or knot" },
  { emoji: "🧩", label: "A piece of a puzzle or game" },
  { emoji: "🖊️", label: "A writing tool that isn't a pencil" },
  { emoji: "🌸", label: "Something that smells like flowers" },
  { emoji: "🎶", label: "Something that makes a sound" },
  { emoji: "🌈", label: "Every color of the rainbow (separate items)" },
  { emoji: "🏠", label: "A tiny model of a building or house" },
  { emoji: "🧵", label: "Something made by hand or sewn" },
  { emoji: "🦋", label: "A picture of an animal on something" },
  { emoji: "📌", label: "Something perfectly square" },
  { emoji: "🍃", label: "A leaf with an interesting shape" },
  { emoji: "💡", label: "Something that lights up" },
  { emoji: "🎁", label: "Something wrapped in paper or fabric" },
  { emoji: "⏰", label: "Something that tells you the time" },
  { emoji: "🌟", label: "Something that sparkles or glitters" },
  { emoji: "🧲", label: "Something magnetic" },
];

export function RealLifeScavengerHunt() {
  const [found, setFound] = useState<boolean[]>(() =>
    loadLS("rlsh-found", Array(SCAVENGER_ITEMS.length).fill(false)),
  );
  const total = found.filter(Boolean).length;

  const toggle = (i: number) => {
    const next = found.map((v, idx) => (idx === i ? !v : v));
    setFound(next);
    saveLS("rlsh-found", next);
  };

  const reset = () => {
    const empty = Array(SCAVENGER_ITEMS.length).fill(false);
    setFound(empty);
    saveLS("rlsh-found", empty);
  };

  return (
    <div className="p-4">
      <h2 className="font-display text-2xl font-bold text-teal-gp mb-1">
        🔍 Real-Life Scavenger Hunt
      </h2>
      <p className="text-muted-foreground text-sm mb-3">
        Hunt for all 22 items around your house or outside. GO!
      </p>

      <div className="flex items-center gap-3 mb-5">
        <Progress
          value={(total / SCAVENGER_ITEMS.length) * 100}
          className="flex-1 h-3"
        />
        <span className="font-bold text-teal-gp text-sm">
          {total}/{SCAVENGER_ITEMS.length}
        </span>
        {total === SCAVENGER_ITEMS.length && (
          <span className="text-2xl">🏆</span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {SCAVENGER_ITEMS.map((item, i) => (
          <button
            key={item.label}
            type="button"
            onClick={() => toggle(i)}
            data-ocid={`hunt.item.${i + 1}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm text-left transition-all
              ${found[i] ? "border-teal-gp bg-teal-gp/10 line-through opacity-60" : "border-border hover:border-teal-gp"}`}
          >
            <span className="text-xl">{item.emoji}</span>
            <span>{item.label}</span>
            {found[i] && <span className="ml-auto text-teal-gp">✓</span>}
          </button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={reset}
        className="rounded-full text-muted-foreground"
        data-ocid="hunt.delete_button"
      >
        Start Over
      </Button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// STOP DOOM SCROLLING COMPONENTS
// ════════════════════════════════════════════════════════════════════════════

// ─── 9. ScrollSwapChallenge ──────────────────────────────────────────────────
const SCROLL_SWAPS = [
  {
    trigger: "😴 Bored",
    emoji: "🎨",
    swap: "Grab a pencil and doodle for 5 minutes",
    color: "bg-purple-gp/10 border-purple-gp",
  },
  {
    trigger: "😟 Anxious",
    emoji: "🌬️",
    swap: "Try box breathing: 4 in, 4 hold, 4 out, 4 hold",
    color: "bg-teal-gp/10 border-teal-gp",
  },
  {
    trigger: "😢 Sad",
    emoji: "✍️",
    swap: "Write down 3 things that made you smile this week",
    color: "bg-pink-gp/10 border-pink-gp",
  },
  {
    trigger: "😠 Angry",
    emoji: "🏃‍♀️",
    swap: "Do 20 jumping jacks to burn off steam",
    color: "bg-coral-gp/10 border-coral-gp",
  },
  {
    trigger: "🥺 Lonely",
    emoji: "📞",
    swap: "Text or call your bestie for a real chat",
    color: "bg-yellow-gp/10 border-yellow-gp",
  },
  {
    trigger: "😵 Overwhelmed",
    emoji: "🧘‍♀️",
    swap: "Lie down, close your eyes, and breathe for 2 minutes",
    color: "bg-purple-gp/10 border-purple-gp",
  },
];

export function ScrollSwapChallenge() {
  const [flipped, setFlipped] = useState<Set<number>>(() => new Set());

  const flip = (i: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="p-4">
      <h2 className="font-display text-2xl font-bold text-coral-gp mb-1">
        🔄 Scroll Swap Challenge
      </h2>
      <p className="text-muted-foreground text-sm mb-5">
        When you feel like scrolling, click the card that matches your mood and
        try the swap instead!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SCROLL_SWAPS.map((item, i) => (
          <button
            key={item.trigger}
            type="button"
            onClick={() => flip(i)}
            data-ocid={`scrollswap.item.${i + 1}`}
            className={`rounded-2xl border-2 p-4 text-left transition-all cursor-pointer hover:scale-105 active:scale-100 ${item.color}`}
          >
            {flipped.has(i) ? (
              <div>
                <div className="text-3xl mb-2">{item.emoji}</div>
                <p className="font-bold text-foreground text-sm">{item.swap}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Tap to flip back
                </p>
              </div>
            ) : (
              <div>
                <div className="text-2xl mb-1">{item.trigger}</div>
                <p className="text-xs text-muted-foreground">
                  Tap to see your swap →
                </p>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── 10. GroundingExercise ───────────────────────────────────────────────────
const GROUNDING_STEPS = [
  {
    count: 5,
    sense: "SEE",
    emoji: "👀",
    prompt: "Look around. Name 5 things you can SEE right now.",
    color: "bg-purple-gp/10 border-purple-gp text-purple-gp",
  },
  {
    count: 4,
    sense: "TOUCH",
    emoji: "🖐️",
    prompt: "Name 4 things you can TOUCH — reach out and feel them.",
    color: "bg-teal-gp/10 border-teal-gp text-teal-gp",
  },
  {
    count: 3,
    sense: "HEAR",
    emoji: "👂",
    prompt: "Close your eyes. Name 3 things you can HEAR.",
    color: "bg-pink-gp/10 border-pink-gp text-pink-gp",
  },
  {
    count: 2,
    sense: "SMELL",
    emoji: "👃",
    prompt: "Name 2 things you can SMELL (or imagine your favorite smells!).",
    color: "bg-coral-gp/10 border-coral-gp text-coral-gp",
  },
  {
    count: 1,
    sense: "TASTE",
    emoji: "👅",
    prompt: "Name 1 thing you can TASTE right now. Take a deep breath.",
    color: "bg-yellow-gp/10 border-yellow-gp",
  },
];

export function GroundingExercise() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(""));
  const [done, setDone] = useState(false);

  const current = GROUNDING_STEPS[step];

  const next = () => {
    if (step < GROUNDING_STEPS.length - 1) setStep((s) => s + 1);
    else setDone(true);
  };
  const reset = () => {
    setStep(0);
    setAnswers(Array(5).fill(""));
    setDone(false);
  };

  return (
    <div className="p-4">
      <h2 className="font-display text-2xl font-bold text-coral-gp mb-1">
        🌿 5-4-3-2-1 Grounding
      </h2>
      <p className="text-muted-foreground text-sm mb-5">
        Feeling anxious or overwhelmed? This technique will bring you back to
        the present moment.
      </p>

      {/* Progress dots */}
      <div className="flex gap-2 justify-center mb-5">
        {GROUNDING_STEPS.map((s, i) => (
          <div
            key={s.sense}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all
              ${i < step ? "bg-coral-gp border-coral-gp text-white" : i === step ? "border-coral-gp text-coral-gp" : "border-border text-muted-foreground"}`}
          >
            {s.count}
          </div>
        ))}
      </div>

      {!done ? (
        <div>
          <div
            className={`rounded-3xl border-2 p-6 mb-4 text-center ${current.color}`}
          >
            <div className="text-5xl mb-2">{current.emoji}</div>
            <h3
              className={`font-display text-2xl font-bold mb-2 ${current.color.split(" ").find((c) => c.startsWith("text-")) ?? ""}`}
            >
              {current.count} things you can {current.sense}
            </h3>
            <p className="text-foreground text-sm">{current.prompt}</p>
          </div>

          <textarea
            value={answers[step]}
            onChange={(e) => {
              const next = [...answers];
              next[step] = e.target.value;
              setAnswers(next);
            }}
            placeholder={`Write your ${current.count} things here...`}
            rows={3}
            className="w-full px-4 py-3 rounded-2xl border-2 border-border text-sm focus:border-coral-gp outline-none resize-none mb-4"
            data-ocid="grounding.textarea"
          />

          <Button
            onClick={next}
            className="w-full bg-coral-gp text-white rounded-full font-bold hover:bg-coral-gp/90"
            data-ocid="grounding.primary_button"
          >
            {step < GROUNDING_STEPS.length - 1
              ? `Next: ${GROUNDING_STEPS[step + 1].count} things →`
              : "Finish ✓"}
          </Button>
        </div>
      ) : (
        <div
          className="text-center bg-coral-gp/10 rounded-3xl p-6"
          data-ocid="grounding.success_state"
        >
          <div className="text-5xl mb-3">🌸</div>
          <p className="font-display font-bold text-coral-gp text-xl mb-2">
            You're grounded! 🌿
          </p>
          <p className="text-muted-foreground text-sm mb-4">
            You used all 5 senses to come back to the present moment. That was
            amazing!
          </p>
          <Button
            onClick={reset}
            className="bg-coral-gp text-white rounded-full"
            data-ocid="grounding.secondary_button"
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── 11. FeelingsCheckIn ─────────────────────────────────────────────────────
const FEELINGS = [
  {
    emoji: "😊",
    label: "Happy",
    activity: "Share your happiness — write a kind note to someone 💌",
  },
  {
    emoji: "😔",
    label: "Sad",
    activity: "It's okay to feel sad. Curl up with a cozy book or journal 📖",
  },
  {
    emoji: "😟",
    label: "Anxious",
    activity: "Try box breathing: breathe in 4, hold 4, out 4, hold 4 🌬️",
  },
  {
    emoji: "😠",
    label: "Angry",
    activity:
      "Do 20 jumping jacks or rip a piece of paper to release tension 🏃‍♀️",
  },
  {
    emoji: "😴",
    label: "Tired",
    activity: "Lie down, close your eyes, and listen to calming sounds 🎵",
  },
  {
    emoji: "😐",
    label: "Bored",
    activity: "Pick a boredom buster — draw, dance, or go outside! 🎨",
  },
  {
    emoji: "🥺",
    label: "Lonely",
    activity: "Call your bestie, hug a stuffed animal, or pet your cat 🐱",
  },
  {
    emoji: "🤩",
    label: "Excited",
    activity: "Channel that energy — start a new creative project! ✨",
  },
  {
    emoji: "😨",
    label: "Scared",
    activity: "Ground yourself with the 5-4-3-2-1 technique 🌿",
  },
  {
    emoji: "🥰",
    label: "Grateful",
    activity: "Write down 5 things you're grateful for today 📝",
  },
];

export function FeelingsCheckIn() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="p-4">
      <h2 className="font-display text-2xl font-bold text-coral-gp mb-1">
        💛 Feelings Check-In
      </h2>
      <p className="text-muted-foreground text-sm mb-5">
        How are you feeling right now? Pick one and get a personalized activity
        instead of scrolling!
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5">
        {FEELINGS.map((f, i) => (
          <button
            key={f.label}
            type="button"
            onClick={() => setSelected(i)}
            data-ocid={`feelings.item.${i + 1}`}
            className={`rounded-2xl border-2 p-3 text-center transition-all hover:scale-105 active:scale-100
              ${selected === i ? "border-coral-gp bg-coral-gp/10 scale-105" : "border-border hover:border-coral-gp"}`}
          >
            <div className="text-3xl mb-1">{f.emoji}</div>
            <div className="text-xs font-bold">{f.label}</div>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div
          className="bg-coral-gp/10 border-2 border-coral-gp rounded-3xl p-5 text-center"
          data-ocid="feelings.success_state"
        >
          <div className="text-4xl mb-2">{FEELINGS[selected].emoji}</div>
          <p className="font-bold text-coral-gp font-display text-lg mb-1">
            You&apos;re feeling {FEELINGS[selected].label}
          </p>
          <p className="text-foreground text-sm">
            {FEELINGS[selected].activity}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelected(null)}
            className="mt-3 rounded-full text-muted-foreground"
            data-ocid="feelings.cancel_button"
          >
            Check in again
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── 12. ScreenTimeTracker ──────────────────────────────────────────────────
const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function ScreenTimeTracker() {
  const [hours, setHours] = useState<number[]>(() =>
    loadLS("stt-hours", Array(7).fill(0)),
  );
  const [inputDay, setInputDay] = useState(0);
  const [inputVal, setInputVal] = useState("");

  const log = () => {
    const val = Number.parseFloat(inputVal);
    if (Number.isNaN(val) || val < 0) return;
    const next = hours.map((h, i) => (i === inputDay ? val : h));
    setHours(next);
    saveLS("stt-hours", next);
    setInputVal("");
  };

  const max = Math.max(...hours, 1);
  const avg =
    hours.filter((h) => h > 0).reduce((a, b) => a + b, 0) /
    (hours.filter((h) => h > 0).length || 1);

  const BAR_COLORS = [
    "#f472b6",
    "#a78bfa",
    "#34d399",
    "#fb923c",
    "#60a5fa",
    "#facc15",
    "#e11d48",
  ];

  return (
    <div className="p-4">
      <h2 className="font-display text-2xl font-bold text-coral-gp mb-1">
        📊 Screen Time Tracker
      </h2>
      <p className="text-muted-foreground text-sm mb-5">
        Log how many hours you spend on screens each day. Awareness is the first
        step!
      </p>

      {/* Bar chart */}
      <div className="flex items-end gap-2 h-32 mb-2">
        {hours.map((h, i) => (
          <div
            key={WEEK_DAYS[i]}
            className="flex-1 flex flex-col items-center gap-1"
          >
            <span className="text-xs font-bold text-muted-foreground">
              {h > 0 ? h : ""}
            </span>
            <div
              className="w-full rounded-t-lg transition-all duration-500"
              style={{
                height: `${(h / max) * 100}%`,
                backgroundColor: BAR_COLORS[i],
                minHeight: h > 0 ? 8 : 0,
              }}
              data-ocid="stt.chart_point"
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2 mb-5">
        {WEEK_DAYS.map((d) => (
          <div
            key={d}
            className="flex-1 text-center text-xs font-bold text-muted-foreground"
          >
            {d}
          </div>
        ))}
      </div>

      {avg > 0 && (
        <div className="bg-coral-gp/10 rounded-2xl p-3 mb-4 text-center text-sm">
          <span className="font-bold text-coral-gp">
            Daily average: {avg.toFixed(1)} hrs
          </span>
          {avg > 4 ? (
            <span className="ml-2 text-muted-foreground">
              — consider a digital detox day! 📵
            </span>
          ) : avg < 2 ? (
            <span className="ml-2 text-muted-foreground">— amazing! 🌟</span>
          ) : null}
        </div>
      )}

      {/* Log input */}
      <div className="flex gap-2 items-center">
        <select
          value={inputDay}
          onChange={(e) => setInputDay(Number(e.target.value))}
          className="px-3 py-2 rounded-xl border-2 border-border text-sm focus:border-coral-gp outline-none"
          data-ocid="stt.select"
        >
          {WEEK_DAYS.map((d, i) => (
            <option key={d} value={i}>
              {d}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="0"
          max="24"
          step="0.5"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Hours..."
          className="flex-1 px-3 py-2 rounded-xl border-2 border-border text-sm focus:border-coral-gp outline-none"
          onKeyDown={(e) => e.key === "Enter" && log()}
          data-ocid="stt.input"
        />
        <Button
          onClick={log}
          className="bg-coral-gp text-white rounded-xl font-bold hover:bg-coral-gp/90"
          data-ocid="stt.submit_button"
        >
          Log
        </Button>
      </div>
    </div>
  );
}

// ─── 13. BedtimeWindDown ────────────────────────────────────────────────────
const WIND_DOWN_STEPS = [
  {
    emoji: "📱",
    label: "Put your phone in another room",
    tip: "Out of sight, out of mind! Your sleep will be so much better.",
  },
  {
    emoji: "🛁",
    label: "Take a warm shower or bath",
    tip: "Warm water signals your body it's time to relax.",
  },
  {
    emoji: "🧴",
    label: "Do your skincare routine",
    tip: "Even just moisturizer counts! A little self-care goes a long way.",
  },
  {
    emoji: "👘",
    label: "Change into cozy pajamas",
    tip: "Comfy clothes = sleepy brain!",
  },
  {
    emoji: "📖",
    label: "Read a book (not on a screen!)",
    tip: "Even 10 minutes of a physical book helps.",
  },
  {
    emoji: "✍️",
    label: "Write 3 things you're grateful for",
    tip: "End the day on a positive note.",
  },
  {
    emoji: "🌬️",
    label: "Do 3 deep belly breaths",
    tip: "Breathe in slowly for 4 counts, out for 6.",
  },
  {
    emoji: "🌙",
    label: "Turn off the lights and close your eyes",
    tip: "Let your mind drift to a peaceful place. Sweet dreams! 💫",
  },
];

export function BedtimeWindDown() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const next = () => {
    if (step < WIND_DOWN_STEPS.length - 1) setStep((s) => s + 1);
    else setDone(true);
  };
  const reset = () => {
    setStep(0);
    setDone(false);
  };

  const current = WIND_DOWN_STEPS[step];

  return (
    <div className="p-4">
      <h2 className="font-display text-2xl font-bold text-coral-gp mb-1">
        🌙 Bedtime Wind-Down
      </h2>
      <p className="text-muted-foreground text-sm mb-5">
        A calming no-screen bedtime routine to help you sleep better!
      </p>

      {/* Progress */}
      <div className="flex gap-1 mb-5">
        {WIND_DOWN_STEPS.map((s, i) => (
          <div
            key={s.label}
            className={`flex-1 h-2 rounded-full transition-all ${i <= step ? "bg-coral-gp" : "bg-border"}`}
          />
        ))}
      </div>

      {!done ? (
        <div>
          <div className="bg-coral-gp/10 border-2 border-coral-gp rounded-3xl p-6 text-center mb-4">
            <div className="text-5xl mb-3">{current.emoji}</div>
            <h3 className="font-display font-bold text-xl text-coral-gp mb-2">
              Step {step + 1}: {current.label}
            </h3>
            <p className="text-sm text-muted-foreground">{current.tip}</p>
          </div>

          <Button
            onClick={next}
            className="w-full bg-coral-gp text-white rounded-full font-bold hover:bg-coral-gp/90"
            data-ocid="bedtime.primary_button"
          >
            {step < WIND_DOWN_STEPS.length - 1
              ? "Done! Next step →"
              : "Finish — Sweet Dreams! 🌙"}
          </Button>
        </div>
      ) : (
        <div
          className="text-center bg-coral-gp/10 rounded-3xl p-8"
          data-ocid="bedtime.success_state"
        >
          <div className="text-5xl mb-3">🌙✨</div>
          <p className="font-display font-bold text-coral-gp text-xl mb-2">
            Sweet dreams! 💫
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            You completed your wind-down routine. Your body and mind are ready
            for rest.
          </p>
          <Button
            variant="outline"
            onClick={reset}
            className="rounded-full"
            data-ocid="bedtime.secondary_button"
          >
            Start Over
          </Button>
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground mt-3">
        Step {done ? WIND_DOWN_STEPS.length : step + 1} of{" "}
        {WIND_DOWN_STEPS.length}
      </p>
    </div>
  );
}

// ─── 14. DoomScrollDetox ────────────────────────────────────────────────────
const DETOX_DAYS = [
  {
    day: 1,
    challenge: "No social media before breakfast 🍳",
    tip: "Eat breakfast phone-free and notice what you see, smell, and taste.",
  },
  {
    day: 2,
    challenge: "Phone-free for 2 hours in the afternoon 📵",
    tip: "Fill those 2 hours with an activity from the Boredom Buster deck!",
  },
  {
    day: 3,
    challenge: "No phone in your bedroom tonight 🌙",
    tip: "Charge your phone in the kitchen or hallway for better sleep.",
  },
  {
    day: 4,
    challenge: "Replace scrolling with journaling for 15 min 📔",
    tip: "Whenever you reach for your phone, write 3 sentences in your journal instead.",
  },
  {
    day: 5,
    challenge: "Go outside for 30 mins without your phone 🌳",
    tip: "Leave your phone inside and notice how it feels to be fully present.",
  },
  {
    day: 6,
    challenge: "Delete your most-used social app for 24 hours 🗑️",
    tip: "You can reinstall it tomorrow — this is just about showing yourself you CAN!",
  },
  {
    day: 7,
    challenge: "Full phone-free morning until noon ☀️",
    tip: "Start with breakfast, then go for a walk, read, or create something amazing!",
  },
];

export function DoomScrollDetox() {
  const [completed, setCompleted] = useState<boolean[]>(() =>
    loadLS("dsd-completed", Array(7).fill(false)),
  );

  const toggle = (i: number) => {
    const next = completed.map((v, idx) => (idx === i ? !v : v));
    setCompleted(next);
    saveLS("dsd-completed", next);
  };
  const reset = () => {
    const empty = Array(7).fill(false);
    setCompleted(empty);
    saveLS("dsd-completed", empty);
  };

  const done = completed.filter(Boolean).length;

  return (
    <div className="p-4">
      <h2 className="font-display text-2xl font-bold text-coral-gp mb-1">
        ✨ 7-Day Doom Scroll Detox
      </h2>
      <p className="text-muted-foreground text-sm mb-3">
        7 days, 7 challenges to break the doom-scrolling habit for good!
      </p>

      <div className="flex items-center gap-3 mb-5">
        <Progress value={(done / 7) * 100} className="flex-1 h-3" />
        <span className="font-bold text-coral-gp text-sm">{done}/7 days</span>
        {done === 7 && <span className="text-2xl">🏆</span>}
      </div>

      <div className="flex flex-col gap-3">
        {DETOX_DAYS.map((d, i) => (
          <div
            key={d.day}
            className={`rounded-2xl border-2 p-4 transition-all
              ${completed[i] ? "border-coral-gp bg-coral-gp/10 opacity-80" : "border-border"}`}
          >
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => toggle(i)}
                data-ocid={`detox.checkbox.${i + 1}`}
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all
                  ${completed[i] ? "bg-coral-gp border-coral-gp text-white" : "border-muted-foreground hover:border-coral-gp"}`}
              >
                {completed[i] ? "✓" : ""}
              </button>
              <div>
                <p
                  className={`font-bold text-sm ${completed[i] ? "line-through text-muted-foreground" : "text-foreground"}`}
                >
                  Day {d.day}: {d.challenge}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{d.tip}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {done === 7 && (
        <div
          className="mt-4 bg-coral-gp/10 border-2 border-coral-gp rounded-2xl p-4 text-center"
          data-ocid="detox.success_state"
        >
          <div className="text-3xl mb-1">🏆</div>
          <p className="font-bold text-coral-gp font-display">
            You completed the 7-Day Detox!
          </p>
          <p className="text-sm text-muted-foreground">
            You have proven you are stronger than any algorithm. 💪
          </p>
        </div>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={reset}
        className="rounded-full mt-4 text-muted-foreground"
        data-ocid="detox.delete_button"
      >
        Reset Plan
      </Button>
    </div>
  );
}

// ─── 15. SocialMediaBreakIdeas ───────────────────────────────────────────────
const BREAK_IDEAS = [
  { emoji: "🧁", label: "Bake cupcakes from scratch" },
  { emoji: "🎨", label: "Watercolor paint something you love" },
  { emoji: "📚", label: "Read 3 chapters of your current book" },
  { emoji: "🌱", label: "Water and talk to your plants" },
  { emoji: "🎸", label: "Learn 3 chords on a guitar or ukulele" },
  { emoji: "✉️", label: "Write a letter to your grandparent" },
  { emoji: "🧩", label: "Work on a jigsaw puzzle" },
  { emoji: "💃", label: "Learn a TikTok dance (offline!)" },
  { emoji: "🐕", label: "Take your dog for an extra-long walk" },
  { emoji: "🌸", label: "Press flowers from your garden" },
  { emoji: "🏓", label: "Play ping pong or a board game" },
  { emoji: "🧁", label: "Decorate cookies with icing" },
  { emoji: "🎭", label: "Act out scenes from your favorite movie" },
  { emoji: "🗺️", label: "Plan an imaginary adventure trip" },
  { emoji: "🖊️", label: "Start a bullet journal or planner" },
  { emoji: "🌟", label: "Make a vision board for your goals" },
  { emoji: "🌙", label: "Star-gaze with a star map" },
  { emoji: "🎵", label: "Make a playlist for every mood" },
  { emoji: "🧘", label: "Do a 10-minute yoga session" },
  { emoji: "🌍", label: "Learn 10 phrases in a new language" },
  { emoji: "📸", label: "Take an outdoor photography walk" },
  { emoji: "🎀", label: "Style your hair in 5 different ways" },
];

export function SocialMediaBreakIdeas() {
  const [favorites, setFavorites] = useState<Set<number>>(() => {
    const saved = loadLS<number[]>("smbi-favs", []);
    return new Set(saved);
  });
  const [filter, setFilter] = useState<"all" | "favorites">("all");

  const toggleFav = useCallback((i: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      saveLS("smbi-favs", [...next]);
      return next;
    });
  }, []);

  const displayed =
    filter === "favorites"
      ? BREAK_IDEAS.filter((_, i) => favorites.has(i))
      : BREAK_IDEAS;

  return (
    <div className="p-4">
      <h2 className="font-display text-2xl font-bold text-coral-gp mb-1">
        💡 Social Media Break Ideas
      </h2>
      <p className="text-muted-foreground text-sm mb-4">
        22 things to do instead of opening Instagram, TikTok, or YouTube. Tap ❤️
        to save your favorites!
      </p>

      <div className="flex gap-2 mb-4">
        <Button
          size="sm"
          onClick={() => setFilter("all")}
          className={`rounded-full font-bold ${filter === "all" ? "bg-coral-gp text-white" : "bg-muted text-muted-foreground"}`}
          data-ocid="smbi.tab"
        >
          All {BREAK_IDEAS.length}
        </Button>
        <Button
          size="sm"
          onClick={() => setFilter("favorites")}
          className={`rounded-full font-bold ${filter === "favorites" ? "bg-coral-gp text-white" : "bg-muted text-muted-foreground"}`}
          data-ocid="smbi.tab"
        >
          ❤️ Favorites {favorites.size > 0 ? `(${favorites.size})` : ""}
        </Button>
      </div>

      {displayed.length === 0 && (
        <div
          className="text-center py-8 text-muted-foreground"
          data-ocid="smbi.empty_state"
        >
          <div className="text-4xl mb-2">💛</div>
          <p>No favorites yet — tap the heart on any idea!</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {displayed.map((idea, i) => {
          const realIdx = BREAK_IDEAS.indexOf(idea);
          return (
            <div
              key={idea.label}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-border hover:border-coral-gp transition-all"
              data-ocid={`smbi.item.${i + 1}`}
            >
              <span className="text-2xl">{idea.emoji}</span>
              <span className="flex-1 text-sm">{idea.label}</span>
              <button
                type="button"
                onClick={() => toggleFav(realIdx)}
                data-ocid="smbi.toggle"
                className="text-lg transition-transform hover:scale-125"
                aria-label={
                  favorites.has(realIdx) ? "Remove favorite" : "Add favorite"
                }
              >
                {favorites.has(realIdx) ? "❤️" : "🤍"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── 16. PositiveFeedReset ───────────────────────────────────────────────────
const UPLIFTING_IDEAS = [
  {
    emoji: "🎨",
    label: "Art & Design",
    example: "Studio Ghibli fan art, Procreate tutorials",
  },
  {
    emoji: "🌱",
    label: "Gardening & Plants",
    example: "Houseplant care, tiny garden ideas",
  },
  {
    emoji: "📚",
    label: "Books & Reading",
    example: "BookTok, reading vlogs, book recommendations",
  },
  {
    emoji: "🎵",
    label: "Music & Songwriting",
    example: "Original songs, instrument tutorials",
  },
  {
    emoji: "🧪",
    label: "Science & Cool Facts",
    example: "Wild science experiments, space discoveries",
  },
  {
    emoji: "🏋️‍♀️",
    label: "Sports & Fitness",
    example: "Gymnastics, dance tutorials, yoga flows",
  },
  {
    emoji: "🌍",
    label: "Travel & Culture",
    example: "Cultural traditions, cool places around the world",
  },
  {
    emoji: "🍳",
    label: "Cooking & Baking",
    example: "Easy recipes for kids, cake decorating",
  },
  {
    emoji: "💻",
    label: "Coding & Tech",
    example: "Game dev tutorials, beginner coding projects",
  },
  {
    emoji: "🐾",
    label: "Animals & Nature",
    example: "Wildlife conservation, cute animal rescues",
  },
];

export function PositiveFeedReset() {
  const [myList, setMyList] = useState<string[]>(() => loadLS("pfr-list", []));
  const [input, setInput] = useState("");

  const add = () => {
    const val = input.trim();
    if (!val) return;
    const next = [...myList, val];
    setMyList(next);
    saveLS("pfr-list", next);
    setInput("");
  };

  const remove = (i: number) => {
    const next = myList.filter((_, idx) => idx !== i);
    setMyList(next);
    saveLS("pfr-list", next);
  };

  return (
    <div className="p-4">
      <h2 className="font-display text-2xl font-bold text-coral-gp mb-1">
        💖 Positive Feed Reset
      </h2>
      <p className="text-muted-foreground text-sm mb-5">
        Curate a feed that makes you feel inspired, not awful! Here are content
        ideas — plus add your own positive creators below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
        {UPLIFTING_IDEAS.map((idea, i) => (
          <div
            key={idea.label}
            className="rounded-xl border-2 border-border p-3"
            data-ocid={`pfr.item.${i + 1}`}
          >
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xl">{idea.emoji}</span>
              <span className="font-bold text-sm">{idea.label}</span>
            </div>
            <p className="text-xs text-muted-foreground pl-7">{idea.example}</p>
          </div>
        ))}
      </div>

      <div className="bg-coral-gp/5 border-2 border-coral-gp rounded-2xl p-4">
        <h3 className="font-display font-bold text-coral-gp mb-3">
          💖 My Positive Feed List
        </h3>

        <div className="flex gap-2 mb-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="Add a creator or account you love..."
            className="flex-1 px-3 py-2 rounded-xl border-2 border-border text-sm focus:border-coral-gp outline-none"
            data-ocid="pfr.input"
          />
          <Button
            onClick={add}
            className="bg-coral-gp text-white rounded-xl font-bold hover:bg-coral-gp/90 shrink-0"
            data-ocid="pfr.submit_button"
          >
            Add
          </Button>
        </div>

        {myList.length === 0 ? (
          <p
            className="text-sm text-muted-foreground text-center py-3"
            data-ocid="pfr.empty_state"
          >
            Add your favorite positive creators here! 💛
          </p>
        ) : (
          <div className="flex flex-col gap-1">
            {myList.map((item, i) => (
              <div
                key={`mylist-${item}`}
                className="flex items-center gap-2 bg-background rounded-lg px-3 py-2"
                data-ocid={`pfr.item.${UPLIFTING_IDEAS.length + i + 1}`}
              >
                <span className="text-sm flex-1">💖 {item}</span>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  data-ocid={`pfr.delete_button.${i + 1}`}
                  className="text-muted-foreground hover:text-destructive transition-colors text-xs px-2 py-1 rounded"
                  aria-label="Remove"
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
