import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useEffect, useRef, useState } from "react";

// ===== MINDFUL MINUTE =====
export function MindfulMinute() {
  const [phase, setPhase] = useState<"idle" | "inhale" | "hold" | "exhale">(
    "idle",
  );
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (phase === "idle") return;
    let duration = phase === "inhale" ? 4 : phase === "hold" ? 4 : 6;
    setCount(duration);
    intervalRef.current = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(intervalRef.current!);
          if (phase === "inhale") setPhase("hold");
          else if (phase === "hold") setPhase("exhale");
          else {
            setPhase("inhale");
            setCycles((prev) => prev + 1);
          }
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [phase]);

  const startBreathing = () => setPhase("inhale");
  const stopBreathing = () => {
    setPhase("idle");
    setCycles(0);
    setCount(0);
  };

  const ringSize =
    phase === "inhale"
      ? "scale-125"
      : phase === "exhale"
        ? "scale-75"
        : "scale-100";
  const phaseColor =
    phase === "inhale"
      ? "bg-pink-light-gp border-pink-gp"
      : phase === "hold"
        ? "bg-yellow-light-gp"
        : "bg-teal-light-gp";
  const phaseLabel =
    phase === "idle"
      ? "Ready to breathe?"
      : phase === "inhale"
        ? "Breathe In 🌸"
        : phase === "hold"
          ? "Hold... ✨"
          : "Breathe Out 🌊";

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <h3 className="font-display text-2xl text-pink-gp font-bold">
        Mindful Minute 🧘‍♀️
      </h3>
      <p className="text-muted-foreground text-center max-w-sm">
        Box breathing calms your mind and body. Follow the circle!
      </p>

      <div className="relative flex items-center justify-center w-48 h-48">
        <div
          className={`absolute inset-0 rounded-full ${phaseColor} border-4 border-pink-gp opacity-30 transition-transform duration-1000 ease-in-out ${ringSize}`}
        />
        <div
          className={`absolute inset-4 rounded-full ${phaseColor} border-2 border-pink-gp opacity-50 transition-transform duration-1000 ease-in-out ${ringSize}`}
        />
        <div
          className={`absolute inset-8 rounded-full bg-pink-gp opacity-70 transition-transform duration-1000 ease-in-out ${ringSize}`}
        />
        <div className="relative z-10 text-center">
          <div className="text-4xl font-display font-bold text-white">
            {count > 0 ? count : "💗"}
          </div>
        </div>
      </div>

      <p className="font-display text-xl font-bold text-foreground">
        {phaseLabel}
      </p>
      {cycles > 0 && (
        <p className="text-muted-foreground text-sm">
          ✨ {cycles} cycle{cycles > 1 ? "s" : ""} completed!
        </p>
      )}

      <div className="flex gap-3">
        {phase === "idle" ? (
          <Button
            onClick={startBreathing}
            className="bg-pink-gp text-white rounded-full px-8"
            data-ocid="mindful.primary_button"
          >
            Start Breathing 🌸
          </Button>
        ) : (
          <Button
            onClick={stopBreathing}
            variant="outline"
            className="rounded-full px-8 border-pink-gp text-pink-gp"
            data-ocid="mindful.secondary_button"
          >
            Stop
          </Button>
        )}
      </div>
    </div>
  );
}

// ===== MORNING MANTRA =====
const MANTRAS = [
  "I am strong, brave, and capable of anything! 💪",
  "Today I choose joy and kindness 🌸",
  "I am enough, exactly as I am ✨",
  "My voice matters and the world needs to hear it 🌟",
  "I face challenges and come out stronger 🦋",
  "I am surrounded by love and I radiate love 💖",
  "Every day I grow wiser and more wonderful 🌻",
  "I believe in my dreams and work towards them 🚀",
  "I am a girl who rocks, changes the world 🎸",
  "Kindness and confidence are my superpowers 👑",
  "I embrace my uniqueness — there's no one like me! 🦄",
  "I am proud of how far I've come 🌈",
  "Good things are coming my way today ⭐",
  "My mistakes help me learn and grow 🌿",
  "I am brave enough to try new things 🏆",
];

export function MorningMantra() {
  const [mantraIdx, setMantraIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  const newMantra = () => {
    setAnimating(true);
    setTimeout(() => {
      setMantraIdx((prev) => {
        let next = prev;
        while (next === prev) next = Math.floor(Math.random() * MANTRAS.length);
        return next;
      });
      setAnimating(false);
    }, 300);
  };

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <h3 className="font-display text-2xl text-purple-gp font-bold">
        Morning Mantra ☀️
      </h3>
      <Card className="w-full max-w-lg bg-purple-light-gp border-none shadow-card">
        <CardContent className="p-8 text-center">
          <div
            className={`text-xl font-display font-bold text-foreground leading-relaxed transition-opacity duration-300 ${animating ? "opacity-0" : "opacity-100"}`}
          >
            "{MANTRAS[mantraIdx]}"
          </div>
        </CardContent>
      </Card>
      <Button
        onClick={newMantra}
        className="bg-purple-gp text-white rounded-full px-8 hover:opacity-90"
        data-ocid="mantra.primary_button"
      >
        New Mantra ✨
      </Button>
    </div>
  );
}

// ===== ANXIETY TOOLKIT =====
const ANXIETY_TIPS = [
  {
    emoji: "🫁",
    title: "4-7-8 Breathing",
    desc: "Inhale 4 sec, hold 7 sec, exhale 8 sec. Repeat 4 times.",
  },
  {
    emoji: "👀",
    title: "5-4-3-2-1 Grounding",
    desc: "Name 5 things you see, 4 you hear, 3 you can touch, 2 you smell, 1 you taste.",
  },
  {
    emoji: "💧",
    title: "Drink Cold Water",
    desc: "Sipping cold water activates your vagus nerve and calms anxiety quickly.",
  },
  {
    emoji: "🚶‍♀️",
    title: "Walk It Out",
    desc: "Even a 5-minute walk outside dramatically reduces anxiety hormones.",
  },
  {
    emoji: "✍️",
    title: "Write It Down",
    desc: "Getting worries out of your head and onto paper makes them feel more manageable.",
  },
  {
    emoji: "🎵",
    title: "Music Reset",
    desc: "Put on your favorite upbeat song and let yourself dance or sing along!",
  },
  {
    emoji: "🤗",
    title: "Hug Something",
    desc: "A hug — from a person, pet, or pillow — releases oxytocin and reduces stress.",
  },
  {
    emoji: "🌊",
    title: "Ocean Breathing",
    desc: "Breathe in through your nose, out through your mouth making an 'ahhh' sound.",
  },
];

export function AnxietyToolkit() {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(ANXIETY_TIPS.length).fill(false),
  );

  const toggle = (i: number) =>
    setChecked((prev) => {
      const n = [...prev];
      n[i] = !n[i];
      return n;
    });

  const done = checked.filter(Boolean).length;

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-teal-gp font-bold">
        Anxiety Toolkit 🧰
      </h3>
      <p className="text-muted-foreground">
        When anxiety shows up, try one of these coping strategies. Check it off
        when you do it!
      </p>
      {done > 0 && (
        <div className="bg-teal-light-gp rounded-xl p-3 text-center font-display font-bold text-teal-gp">
          🌟 You've tried {done} strateg{done === 1 ? "y" : "ies"} today! You're
          amazing!
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        {ANXIETY_TIPS.map((tip, i) => (
          <button
            key={tip.title}
            type="button"
            className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-colors cursor-pointer text-left w-full ${checked[i] ? "bg-teal-light-gp border-teal-gp" : "bg-card border-border hover:border-teal-gp"}`}
            onClick={() => toggle(i)}
            data-ocid={`anxiety.checkbox.${i + 1}`}
          >
            <Checkbox
              checked={checked[i]}
              className="mt-1 border-teal-gp data-[state=checked]:bg-teal-gp"
            />
            <div>
              <div className="font-display font-bold text-sm">
                {tip.emoji} {tip.title}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {tip.desc}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ===== YOGA FOR KIDS =====
const YOGA_POSES = [
  {
    name: "Mountain Pose 🏔️",
    emoji: "🧍‍♀️",
    desc: "Stand tall with feet together, arms at sides. Take 3 deep breaths. Feel strong like a mountain!",
    benefit: "Improves posture & focus",
  },
  {
    name: "Tree Pose 🌳",
    emoji: "🌲",
    desc: "Stand on one foot, place other foot on inner calf. Raise arms like branches. Hold 5 breaths, switch sides.",
    benefit: "Balance & concentration",
  },
  {
    name: "Warrior Pose ⚔️",
    emoji: "💪",
    desc: "Step one foot back, bend front knee, raise arms above head. Look forward like a warrior!",
    benefit: "Strength & confidence",
  },
  {
    name: "Child's Pose 🤸‍♀️",
    emoji: "😌",
    desc: "Kneel, sit back on heels, stretch arms forward on the floor. Rest your forehead down. Breathe slowly.",
    benefit: "Calming & relaxing",
  },
  {
    name: "Downward Dog 🐕",
    emoji: "🐶",
    desc: "Hands and feet on floor, push hips up to make an upside-down V shape. Press heels toward floor.",
    benefit: "Stretches whole body",
  },
  {
    name: "Cat-Cow 🐱🐄",
    emoji: "🐾",
    desc: "On hands and knees, arch back up (cat) then dip belly down (cow). Repeat 5 times with breathing.",
    benefit: "Flexibility & stress relief",
  },
  {
    name: "Butterfly Pose 🦋",
    emoji: "🦋",
    desc: "Sit with feet touching, knees out. Flap knees like butterfly wings! Hold feet and breathe.",
    benefit: "Hip opening & calm",
  },
  {
    name: "Star Pose ⭐",
    emoji: "⭐",
    desc: "Stand with legs wide, arms out to sides. Stretch to all 5 points! You're a shining star!",
    benefit: "Confidence & joy",
  },
];

export function YogaForKids() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-yellow-gp font-bold">
        Yoga for Kids 🧘‍♀️
      </h3>
      <p className="text-muted-foreground">
        Click any pose to learn how to do it!
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {YOGA_POSES.map((pose, i) => (
          <button
            key={pose.name}
            type="button"
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all card-hover text-left w-full ${activeIdx === i ? "bg-yellow-light-gp border-yellow-gp shadow-lg" : "bg-card border-border hover:border-yellow-gp"}`}
            onClick={() => setActiveIdx(activeIdx === i ? null : i)}
            data-ocid={`yoga.item.${i + 1}`}
          >
            <div className="text-3xl text-center mb-2">{pose.emoji}</div>
            <div className="font-display font-bold text-sm text-center">
              {pose.name}
            </div>
            <Badge
              variant="outline"
              className="mt-1 text-xs w-full justify-center"
            >
              {pose.benefit}
            </Badge>
            {activeIdx === i && (
              <div className="mt-3 text-xs text-foreground leading-relaxed border-t border-yellow-gp pt-2">
                {pose.desc}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ===== SELF-CARE SUNDAY =====
const SELF_CARE_ACTIVITIES = [
  "💧 Drink 8 glasses of water",
  "🛁 Take a relaxing bath",
  "📵 Put your phone away for 1 hour",
  "📚 Read a book you love",
  "🎨 Draw or color something",
  "💌 Write a letter to your future self",
  "🌿 Go outside for 15 minutes",
  "💤 Sleep before 10pm",
  "🧹 Tidy up your space",
  "🎵 Make a feel-good playlist",
  "🍎 Eat a nutritious meal",
  "📝 Write 3 things you're grateful for",
  "🤸‍♀️ Stretch or do light yoga",
  "💕 Call or text a friend",
  "🧴 Moisturize and do skincare",
];

export function SelfCareSunday() {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(SELF_CARE_ACTIVITIES.length).fill(false),
  );
  const done = checked.filter(Boolean).length;
  const pct = Math.round((done / SELF_CARE_ACTIVITIES.length) * 100);

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-coral-gp font-bold">
        Self-Care Sunday 💆‍♀️
      </h3>
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-muted rounded-full h-3">
          <div
            className="bg-coral-gp h-3 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="font-display font-bold text-coral-gp text-sm">
          {pct}% ✨
        </span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {SELF_CARE_ACTIVITIES.map((act, i) => (
          <button
            key={act}
            type="button"
            className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors text-left w-full ${checked[i] ? "bg-coral-light-gp border-coral-gp line-through text-muted-foreground" : "hover:bg-coral-light-gp border-border"}`}
            onClick={() =>
              setChecked((prev) => {
                const n = [...prev];
                n[i] = !n[i];
                return n;
              })
            }
            data-ocid={`selfcare.checkbox.${i + 1}`}
          >
            <Checkbox
              checked={checked[i]}
              className="border-coral-gp data-[state=checked]:bg-coral-gp shrink-0"
            />
            <span className="text-sm">{act}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ===== BULLY PROOFING =====
const BULLY_SCENARIOS = [
  {
    situation: "Someone at lunch says 'Nobody wants you to sit here.'",
    options: [
      {
        text: "Cry and walk away",
        isGood: false,
        feedback:
          "It's okay to feel hurt, but you don't have to accept that. Try standing your ground calmly!",
      },
      {
        text: "Say calmly 'That's not kind. I have every right to sit here.' and sit down",
        isGood: true,
        feedback:
          "Perfect! You stood your ground calmly and didn't escalate. 💪",
      },
      {
        text: "Yell back at them",
        isGood: false,
        feedback:
          "This might make things worse. A calm, firm response works better!",
      },
    ],
  },
  {
    situation: "Someone keeps leaving you out of the group chat.",
    options: [
      {
        text: "Say nothing and feel sad",
        isGood: false,
        feedback: "You deserve to speak up! Talk to a trusted adult or friend.",
      },
      {
        text: "Start a new group chat with people who value you",
        isGood: true,
        feedback:
          "Yes! Create your own community with people who lift you up! 🌟",
      },
      {
        text: "Send mean messages back",
        isGood: false,
        feedback: "This lowers you to their level. You're better than that!",
      },
    ],
  },
];

export function BullyProofing() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(BULLY_SCENARIOS.length).fill(null),
  );

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-pink-gp font-bold">
        Bully-Proofing 💪
      </h3>
      <p className="text-muted-foreground">
        Practice these scenarios. What would YOU do?
      </p>
      {BULLY_SCENARIOS.map((sc, si) => (
        <Card
          key={sc.situation.slice(0, 30)}
          className="border-2 border-pink-light-gp"
        >
          <CardHeader>
            <CardTitle className="text-base font-display">
              <span className="text-pink-gp">Scenario {si + 1}:</span>{" "}
              {sc.situation}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {sc.options.map((opt, oi) => (
              <Button
                key={opt.text.slice(0, 30)}
                variant="outline"
                className={`text-left h-auto py-2 px-3 justify-start whitespace-normal ${
                  answers[si] === oi
                    ? opt.isGood
                      ? "border-teal-gp bg-teal-light-gp text-foreground"
                      : "border-destructive bg-red-50 text-foreground"
                    : "border-border hover:border-pink-gp"
                }`}
                onClick={() =>
                  setAnswers((prev) => {
                    const n = [...prev];
                    n[si] = oi;
                    return n;
                  })
                }
                data-ocid={`bully.item.${si + 1}`}
              >
                {opt.text}
              </Button>
            ))}
            {answers[si] !== null && (
              <div
                className={`mt-2 p-3 rounded-lg text-sm font-bold ${sc.options[answers[si]!].isGood ? "bg-teal-light-gp text-teal-gp" : "bg-red-50 text-destructive"}`}
              >
                {sc.options[answers[si]!].isGood ? "✅ " : "💡 "}
                {sc.options[answers[si]!].feedback}
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <Card className="bg-pink-light-gp border-none">
        <CardContent className="p-4">
          <h4 className="font-display font-bold text-pink-gp mb-2">
            💬 Scripts That Work
          </h4>
          <ul className="text-sm space-y-1">
            <li>• "That's not okay with me."</li>
            <li>• "I'm not going to let that bother me."</li>
            <li>• "I'll talk to a trusted adult about this."</li>
            <li>• "You don't have that power over me."</li>
            <li>• "My friends respect me. I deserve respect."</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

// ===== BOUNDARIES =====
const BOUNDARY_SCENARIOS = [
  {
    situation: "Your friend keeps reading your diary without asking.",
    options: [
      {
        text: "Let them — you don't want to cause conflict",
        isGood: false,
        feedback:
          "Your private thoughts deserve respect! It's okay to set limits.",
      },
      {
        text: "Say 'Please don't read my diary. It's private and that feels like a violation of my trust.'",
        isGood: true,
        feedback:
          "Excellent! Clear, direct, and respectful boundary-setting! 🌟",
      },
      {
        text: "Get really angry and end the friendship immediately",
        isGood: false,
        feedback:
          "A conversation first gives your friend a chance to learn and do better.",
      },
    ],
  },
  {
    situation:
      "Someone keeps hugging you even when you've said you don't like hugs.",
    options: [
      {
        text: "Just allow it to make them happy",
        isGood: false,
        feedback:
          "Your body belongs to you. You get to decide who touches you!",
      },
      {
        text: "Say firmly 'I've asked you not to hug me. Please respect that.' and step back",
        isGood: true,
        feedback:
          "Your body, your rules. You communicated clearly and firmly. 💪",
      },
      {
        text: "Avoid them forever",
        isGood: false,
        feedback: "Try communicating first — avoidance can complicate things.",
      },
    ],
  },
];

export function BoundariesSection() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(BOUNDARY_SCENARIOS.length).fill(null),
  );

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-purple-gp font-bold">
        Boundaries 🌿
      </h3>
      <p className="text-muted-foreground">
        Boundaries are healthy! Practice standing up for yourself in these
        scenarios.
      </p>
      {BOUNDARY_SCENARIOS.map((sc, si) => (
        <Card
          key={sc.situation.slice(0, 30)}
          className="border-2 border-purple-light-gp"
        >
          <CardHeader>
            <CardTitle className="text-base font-display">
              <span className="text-purple-gp">Situation:</span> {sc.situation}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {sc.options.map((opt, oi) => (
              <Button
                key={opt.text.slice(0, 30)}
                variant="outline"
                className={`text-left h-auto py-2 px-3 justify-start whitespace-normal ${
                  answers[si] === oi
                    ? opt.isGood
                      ? "border-teal-gp bg-teal-light-gp"
                      : "border-destructive bg-red-50"
                    : "border-border hover:border-purple-gp"
                }`}
                onClick={() =>
                  setAnswers((prev) => {
                    const n = [...prev];
                    n[si] = oi;
                    return n;
                  })
                }
                data-ocid={`boundaries.item.${si + 1}`}
              >
                {opt.text}
              </Button>
            ))}
            {answers[si] !== null && (
              <div
                className={`p-3 rounded-lg text-sm font-bold mt-1 ${sc.options[answers[si]!].isGood ? "bg-teal-light-gp text-teal-gp" : "bg-red-50 text-destructive"}`}
              >
                {sc.options[answers[si]!].feedback}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ===== RAINBOW NAIL ART =====
const NAIL_DESIGNS: Record<
  string,
  { emoji: string; tools: string[]; steps: string[] }
> = {
  "Rainbow Stripes 🌈": {
    emoji: "🌈",
    tools: [
      "Nail polish: red, orange, yellow, green, blue, purple",
      "Thin nail art brush or toothpick",
      "Base coat + top coat",
      "Tape for clean lines (optional)",
    ],
    steps: [
      "Apply base coat and let dry completely",
      "Apply a white base coat for colors to pop",
      "Using a thin brush, paint a red stripe across the nail",
      "Add orange, yellow, green, blue, violet stripes side by side",
      "Clean edges with a small brush dipped in nail polish remover",
      "Seal with top coat for a glossy finish!",
    ],
  },
  "Polka Dots 🫧": {
    emoji: "🫧",
    tools: [
      "2-3 nail polish colors",
      "Dotting tool or toothpick",
      "Base coat + top coat",
      "Small bowl with water",
    ],
    steps: [
      "Apply your base color and let dry fully",
      "Dip a dotting tool or the rounded end of a bobby pin into a contrasting color",
      "Gently press dots onto the nail — vary the size by pressing harder or lighter",
      "Try a pattern: large center dot surrounded by smaller dots",
      "Layer colors — white dots on pink, gold dots on navy, pink dots on white",
      "Seal with top coat!",
    ],
  },
  "Mini Flowers 🌸": {
    emoji: "🌸",
    tools: [
      "Nail polish: white, pink, yellow (for center)",
      "Dotting tool or toothpick",
      "Base coat + top coat",
    ],
    steps: [
      "Apply your base color (pastel works beautifully for flowers)",
      "Using a dotting tool, make 5 dots in a circle for each flower",
      "The dots should be touching at the center to form petals",
      "Add a single yellow dot in the very center",
      "Make flowers big or tiny — mix sizes for a garden effect!",
      "Seal with top coat!",
    ],
  },
  "Galaxy 🌌": {
    emoji: "🌌",
    tools: [
      "Nail polish: black, dark blue, purple, white",
      "Small sponge (cut from makeup sponge)",
      "Dotting tool for stars",
      "Base coat + top coat",
    ],
    steps: [
      "Apply a black base coat",
      "Dab dark blue polish onto a sponge piece and sponge onto the nail",
      "Sponge purple and dark teal on top, blending slightly",
      "Use a toothpick to add tiny white dots for stars",
      "Add a few larger white stars using the dotting tool",
      "Seal with top coat — you have a galaxy on your nails!",
    ],
  },
  "Ombre 🌅": {
    emoji: "🌅",
    tools: [
      "Two coordinating nail polish colors",
      "Makeup sponge",
      "Base coat + top coat",
      "Tape around nails",
    ],
    steps: [
      "Apply base coat and let dry",
      "Paint both colors side by side on the sponge",
      "Dab the sponge onto your nail with a dabbing motion — not swiping!",
      "Repeat 2-3 times for more opacity, letting each layer dry slightly",
      "Clean up edges with a brush and nail polish remover",
      "Seal with top coat!",
    ],
  },
};

export function RainbowNailArt() {
  const [selectedDesign, setSelectedDesign] = useState(
    Object.keys(NAIL_DESIGNS)[0],
  );

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-pink-gp font-bold">
        💅 Rainbow Nail Art
      </h3>
      <p className="text-muted-foreground">
        Choose a design to learn how to create it!
      </p>
      <div className="flex flex-wrap gap-2">
        {Object.keys(NAIL_DESIGNS).map((design) => (
          <Button
            key={design}
            size="sm"
            variant={selectedDesign === design ? "default" : "outline"}
            className={`rounded-full ${selectedDesign === design ? "bg-pink-gp text-white" : "border-pink-gp text-pink-gp"}`}
            onClick={() => setSelectedDesign(design)}
            data-ocid="nailart.tab"
          >
            {NAIL_DESIGNS[design].emoji}{" "}
            {design.split(" ").slice(0, 2).join(" ")}
          </Button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-pink-light-gp border-none">
          <CardContent className="p-4">
            <h4 className="font-display font-bold text-pink-gp mb-2">
              🛠️ Tools You Need
            </h4>
            <ul className="space-y-1">
              {NAIL_DESIGNS[selectedDesign].tools.map((tool) => (
                <li key={tool} className="text-sm flex gap-2">
                  <span className="text-pink-gp font-bold">•</span> {tool}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <div>
          <h4 className="font-display font-bold text-pink-gp mb-2">
            Step-by-Step:
          </h4>
          <div className="flex flex-col gap-2">
            {NAIL_DESIGNS[selectedDesign].steps.map((step, i) => (
              <div key={step} className="flex gap-2 text-sm">
                <div className="w-6 h-6 rounded-full bg-pink-gp text-white text-xs flex items-center justify-center shrink-0 font-bold">
                  {i + 1}
                </div>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== GIRL POWER HAIRSTYLES =====
const HAIRSTYLES: Record<
  string,
  {
    emoji: string;
    difficulty: string;
    time: string;
    steps: string[];
    tips: string[];
  }
> = {
  "Basic Braid": {
    emoji: "💆‍♀️",
    difficulty: "Easy",
    time: "5 min",
    steps: [
      "Brush hair smooth and pull into a low ponytail",
      "Divide into 3 equal sections",
      "Cross right section over center (center is now on right)",
      "Cross left section over new center",
      "Repeat, alternating right and left, working downward",
      "Secure the end with a hair elastic",
      "Gently tug each section outward for a fuller, looser braid!",
    ],
    tips: [
      "Mist hair lightly with water for easier braiding",
      "The looser the braid, the more boho it looks!",
    ],
  },
  "Fishtail Braid": {
    emoji: "🐠",
    difficulty: "Medium",
    time: "10 min",
    steps: [
      "Pull hair into a ponytail and divide into 2 equal sections",
      "Take a thin strand from the outside of the LEFT section",
      "Cross it over and add it to the INSIDE of the RIGHT section",
      "Take a thin strand from the outside of the RIGHT section",
      "Cross it over and add it to the INSIDE of the LEFT section",
      "Repeat all the way down — the smaller the strands, the fancier it looks!",
      "Secure with an elastic. Pull strands gently to loosen for a messy-chic look",
    ],
    tips: [
      "Use thinner strands for a detailed fishtail",
      "Secure at the top before braiding so it doesn't unravel",
    ],
  },
  "Space Buns": {
    emoji: "🌙",
    difficulty: "Easy",
    time: "5 min",
    steps: [
      "Part hair down the center from forehead to nape of neck",
      "Pull each side into a high ponytail — one on each side of the head",
      "Twist each ponytail tightly until it naturally coils around itself",
      "Wrap the twisted ponytail around its own base to form a bun",
      "Secure tightly with bobby pins and another elastic",
      "Pull out a few face-framing pieces for a cute, soft look!",
    ],
    tips: [
      "Leave some hair out for cute wispy pieces",
      "Add glitter or bow clips to each bun for extra fun!",
    ],
  },
  "Messy Bun": {
    emoji: "🎀",
    difficulty: "Easy",
    time: "3 min",
    steps: [
      "Pull all hair into a high ponytail and secure with an elastic",
      "Instead of pulling the hair all the way through, leave a loop on the last pass",
      "Fan out the loop into a round bun shape",
      "Wrap the remaining tail around the bun base and pin",
      "Pull out wispy pieces around your face",
      "Tug gently at the bun to make it bigger and messier — that's the look!",
    ],
    tips: [
      "Messy buns look best on second-day hair",
      "A tiny bump before the bun adds volume!",
    ],
  },
};

export function GirlPowerHairstyles() {
  const [selected, setSelected] = useState("Basic Braid");

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-pink-gp font-bold">
        🎀 Girl Power Hairstyles
      </h3>
      <p className="text-muted-foreground">
        Choose a style to learn step-by-step!
      </p>
      <div className="flex flex-wrap gap-2">
        {Object.entries(HAIRSTYLES).map(([name, style]) => (
          <Button
            key={name}
            size="sm"
            variant={selected === name ? "default" : "outline"}
            className={`rounded-full ${selected === name ? "bg-pink-gp text-white" : "border-pink-gp text-pink-gp"}`}
            onClick={() => setSelected(name)}
            data-ocid="hair.tab"
          >
            {style.emoji} {name}
          </Button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h4 className="font-display font-bold text-pink-gp">
              {HAIRSTYLES[selected].emoji} {selected}
            </h4>
            <Badge variant="outline" className="text-xs">
              {HAIRSTYLES[selected].difficulty}
            </Badge>
            <Badge variant="outline" className="text-xs">
              ⏱ {HAIRSTYLES[selected].time}
            </Badge>
          </div>
          <div className="flex flex-col gap-2">
            {HAIRSTYLES[selected].steps.map((step, i) => (
              <div key={step} className="flex gap-2 text-sm">
                <div className="w-6 h-6 rounded-full bg-pink-gp text-white text-xs flex items-center justify-center shrink-0 font-bold">
                  {i + 1}
                </div>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Card className="bg-pink-light-gp border-none">
            <CardContent className="p-4">
              <p className="font-bold text-pink-gp mb-2">💡 Pro Tips</p>
              <ul className="space-y-1">
                {HAIRSTYLES[selected].tips.map((tip) => (
                  <li key={tip} className="text-sm">
                    • {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="mt-3 border-2 border-pink-light-gp">
            <CardContent className="p-4">
              <p className="font-bold text-pink-gp mb-2">🛠️ You'll Need</p>
              <ul className="text-sm space-y-1">
                <li>• Hair brush or comb</li>
                <li>• Hair elastics (several)</li>
                <li>• Bobby pins</li>
                <li>• Water spray bottle</li>
                <li>• Hair clips for sections</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ===== FEELING HAPPY CORNER =====
const HAPPY_TIPS = [
  {
    emoji: "🌞",
    title: "Start with Gratitude",
    desc: "Write down 3 things you're thankful for every morning. Your brain starts searching for the good!",
  },
  {
    emoji: "💃",
    title: "Move Your Body",
    desc: "Dance, jump, do cartwheels — movement releases happy chemicals in your brain instantly.",
  },
  {
    emoji: "🌿",
    title: "Go Outside",
    desc: "Even 10 minutes of fresh air and sunlight can completely change your mood. Nature is healing!",
  },
  {
    emoji: "🤗",
    title: "Connect with Someone",
    desc: "A genuine hug or a funny conversation with a friend is one of the fastest ways to feel better.",
  },
  {
    emoji: "🎵",
    title: "Play Your Happy Song",
    desc: "Make a playlist of songs that instantly make you smile. Music is a superpower for mood!",
  },
  {
    emoji: "🎨",
    title: "Create Something",
    desc: "Draw, paint, bake, build — making something with your hands is deeply satisfying.",
  },
];

const AFFIRMATIONS = [
  "I am brave enough to handle anything that comes my way! 💪",
  "My feelings are valid and I'm allowed to feel them 💖",
  "I choose happiness and it chooses me right back! ✨",
  "I am surrounded by people who love and support me 🤗",
  "Every day I get stronger, braver, and more wonderful 🌟",
  "I am enough — exactly as I am, right now! 🦋",
  "Good things are always on their way to me 🌈",
  "I face hard things and come out shining on the other side ⭐",
];

export function FeelingHappyCorner() {
  const [braveScore, setBraveScore] = useState([5]);
  const [affirmIdx, setAffirmIdx] = useState(0);

  const braveLabels = [
    "Working on it",
    "Getting braver",
    "Feeling okay",
    "Pretty brave",
    "Super brave!",
    "LEGENDARY brave!!",
  ];
  const braveLabel =
    braveLabels[
      Math.min(Math.floor(braveScore[0] / 2), braveLabels.length - 1)
    ];

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-pink-gp font-bold">
        Feeling Happy Corner 😊
      </h3>
      <p className="text-muted-foreground">
        Your space to boost your mood, track your bravery, and remember how
        amazing you are!
      </p>

      {/* Daily Affirmation */}
      <Card className="bg-pink-light-gp border-none">
        <CardContent className="p-6 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Today's Affirmation ✨
          </p>
          <p className="font-display text-xl font-bold text-foreground leading-relaxed">
            "{AFFIRMATIONS[affirmIdx]}"
          </p>
          <Button
            className="mt-4 bg-pink-gp text-white rounded-full"
            onClick={() =>
              setAffirmIdx((prev) => (prev + 1) % AFFIRMATIONS.length)
            }
            data-ocid="happycorner.primary_button"
          >
            New Affirmation 🌸
          </Button>
        </CardContent>
      </Card>

      {/* Brave Meter */}
      <Card className="border-2 border-pink-gp/30">
        <CardContent className="p-5">
          <h4 className="font-display font-bold text-pink-gp mb-4">
            🦁 Brave Meter — How brave do you feel today?
          </h4>
          <Slider
            min={0}
            max={10}
            step={1}
            value={braveScore}
            onValueChange={setBraveScore}
            className="mb-3"
            data-ocid="happycorner.toggle"
          />
          <div className="flex justify-between text-xs text-muted-foreground mb-3">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
          <div className="text-center bg-pink-light-gp rounded-xl py-3">
            <span className="text-2xl font-display font-bold text-pink-gp">
              {braveScore[0]}/10 — {braveLabel}
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            {braveScore[0] >= 8
              ? "🌟 You are absolutely GLOWING with bravery!"
              : braveScore[0] >= 5
                ? "💪 You're doing great — keep going!"
                : "💖 Every small step counts. You're braver than you know!"}
          </p>
        </CardContent>
      </Card>

      {/* Happy Tips */}
      <h4 className="font-display font-bold text-pink-gp">
        💖 Tips to Stay Positive & Brave
      </h4>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {HAPPY_TIPS.map((tip) => (
          <Card
            key={tip.title}
            className="bg-card border-2 border-pink-gp/20 hover:border-pink-gp transition-colors"
          >
            <CardContent className="p-4">
              <div className="text-2xl mb-2">{tip.emoji}</div>
              <div className="font-display font-bold text-sm mb-1">
                {tip.title}
              </div>
              <div className="text-xs text-muted-foreground">{tip.desc}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ===== CONFIDENCE BOOSTING =====
const EMPOWERMENT_POEMS = [
  {
    title: "I Am Made of Stars",
    author: "For every brave girl",
    emoji: "⭐",
    lines: [
      "I am made of stars and morning light,",
      "of courage stitched through darkest night.",
      "My voice is strong, my heart is true,",
      "there's nothing I cannot push through.",
      "",
      "I stumble sometimes, yes I do,",
      "but falling down is not the end.",
      "I rise again like spring flowers rise,",
      "and bloom before my own surprised eyes.",
      "",
      "I am a girl who rocks and soars,",
      "who opens all the closed-up doors.",
      "So watch me shine, watch me grow —",
      "I am a star, and I let it show! ⭐",
    ],
    rating: 0,
  },
  {
    title: "Brave & Bright",
    author: "For the girl who doubts herself",
    emoji: "🌟",
    lines: [
      "There are days I don't feel brave,",
      "when my confidence seems to hide.",
      "But bravery isn't fearlessness —",
      "it's doing things terrified.",
      "",
      "So I take one step, then another,",
      "I breathe and hold my head up high.",
      "Because courage lives inside my chest —",
      "and it's bigger than the sky.",
      "",
      "Brave and bright, I face the day,",
      "I find my strength along the way.",
      "One small brave moment at a time —",
      "this extraordinary life is mine! 🌟",
    ],
    rating: 0,
  },
  {
    title: "Wonderfully Me",
    author: "For the girl who is finding herself",
    emoji: "🦋",
    lines: [
      "I don't need to be like anyone else,",
      "I don't need to be perfect or cool.",
      "I am wonderfully, perfectly me —",
      "and that's the greatest gift of all.",
      "",
      "My laugh is loud, my dreams are big,",
      "my heart is open wide.",
      "I bring my whole amazing self",
      "to every single thing I try.",
      "",
      "So here I am, unique and bright,",
      "a one-of-a-kind original.",
      "The world gets richer, better, more —",
      "because I'm here. And that's magical. 🦋",
    ],
    rating: 0,
  },
  {
    title: "Girl, You Are Enough",
    author: "For the day you forget",
    emoji: "💖",
    lines: [
      "On days when the world feels too heavy,",
      "when nothing goes the way you planned,",
      "remember this one simple truth:",
      "you are exactly enough as you stand.",
      "",
      "Your kindness matters, your laughter heals,",
      "your presence is a gift to this earth.",
      "You don't need to earn your place here —",
      "you came here with infinite worth.",
      "",
      "So breathe. Rest. Be gentle with yourself.",
      "Tomorrow is waiting, patient and new.",
      "And the world will be better tomorrow",
      "just because it will still have you. 💖",
    ],
    rating: 0,
  },
];

export function ConfidenceBoosting() {
  const [poemIdx, setPoemIdx] = useState(0);
  const [ratings, setRatings] = useState<number[]>(
    new Array(EMPOWERMENT_POEMS.length).fill(0),
  );

  const poem = EMPOWERMENT_POEMS[poemIdx];
  const myRating = ratings[poemIdx];

  const nextPoem = () =>
    setPoemIdx((prev) => (prev + 1) % EMPOWERMENT_POEMS.length);

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-purple-gp font-bold">
        Confidence Boosting ⭐
      </h3>
      <p className="text-muted-foreground">
        Poems written to help you feel like the superstar you are!
      </p>

      <div className="flex gap-2 flex-wrap">
        {EMPOWERMENT_POEMS.map((p, i) => (
          <Button
            key={p.title}
            size="sm"
            variant={poemIdx === i ? "default" : "outline"}
            className={`rounded-full text-xs ${poemIdx === i ? "bg-purple-gp text-white" : "border-purple-gp text-purple-gp"}`}
            onClick={() => setPoemIdx(i)}
            data-ocid={"confidence.tab"}
          >
            {p.emoji} {p.title}
          </Button>
        ))}
      </div>

      <Card className="bg-purple-light-gp border-none">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">{poem.emoji}</div>
            <h4 className="font-display text-xl font-bold text-purple-gp">
              {poem.title}
            </h4>
            <p className="text-xs text-muted-foreground italic">
              {poem.author}
            </p>
          </div>
          <div className="font-serif text-sm leading-loose text-foreground text-center">
            {poem.lines.map((line, i) =>
              line === "" ? (
                // biome-ignore lint/suspicious/noArrayIndexKey: poem lines are static content
                <br key={`br-${poemIdx}-${i}`} />
              ) : (
                // biome-ignore lint/suspicious/noArrayIndexKey: poem lines are static content
                <div key={`line-${poemIdx}-${i}`}>{line}</div>
              ),
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-muted-foreground">
            Rate this poem:
          </span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`text-xl transition-transform hover:scale-125 ${star <= myRating ? "text-yellow-gp" : "text-muted"}`}
              onClick={() =>
                setRatings((prev) => {
                  const n = [...prev];
                  n[poemIdx] = star;
                  return n;
                })
              }
              data-ocid={"confidence.toggle"}
            >
              ⭐
            </button>
          ))}
          {myRating > 0 && (
            <Badge className="bg-purple-gp text-white">
              {
                [
                  "",
                  "Nice!",
                  "Pretty good!",
                  "I like it!",
                  "Love it!",
                  "AMAZING! 💜",
                ][myRating]
              }
            </Badge>
          )}
        </div>
        <Button
          className="bg-purple-gp text-white rounded-full"
          onClick={nextPoem}
          data-ocid="confidence.secondary_button"
        >
          Read Next Poem ✨
        </Button>
      </div>
    </div>
  );
}
