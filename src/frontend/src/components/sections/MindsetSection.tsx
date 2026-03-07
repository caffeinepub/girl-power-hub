import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ===== GROWTH MINDSET QUIZ =====
const QUIZ_QUESTIONS = [
  {
    question: "You got a bad grade on a test. What do you think?",
    options: [
      { text: "I'm just not smart enough for this.", isGrowth: false },
      {
        text: "I can study differently and do better next time.",
        isGrowth: true,
      },
    ],
    explanation:
      "Mistakes are data, not destiny! Every tough test is a map showing you exactly what to practice next.",
  },
  {
    question:
      "Your friend learned a dance move super fast. You're still struggling. You think…",
    options: [
      {
        text: "She's just naturally talented. I'll never get it.",
        isGrowth: false,
      },
      {
        text: "She's practiced more. If I keep going, I'll get it too.",
        isGrowth: true,
      },
    ],
    explanation:
      "Talent is just the head start — effort is what takes you all the way to the finish line!",
  },
  {
    question: "Someone gives you feedback on your art project. You feel…",
    options: [
      { text: "Hurt and embarrassed. They think it's bad.", isGrowth: false },
      { text: "Grateful for ideas to make it even better.", isGrowth: true },
    ],
    explanation:
      "Feedback is like a gift — it helps you see what you can't see yourself. The best artists ask for it!",
  },
  {
    question: "You try something new and fail the first time. You think…",
    options: [
      {
        text: "I should stick to things I'm already good at.",
        isGrowth: false,
      },
      {
        text: "That was attempt one! Let me figure out what went wrong.",
        isGrowth: true,
      },
    ],
    explanation:
      "Every expert was once a beginner who refused to quit. Attempt #1 is just the beginning of the story.",
  },
  {
    question: "You see a hard math problem and think…",
    options: [
      { text: "I hate math. I'm terrible at it.", isGrowth: false },
      {
        text: "This will take some effort — but I enjoy a good challenge.",
        isGrowth: true,
      },
    ],
    explanation:
      "Loving a challenge is a superpower. Your brain actually grows stronger every time you wrestle with a hard problem!",
  },
];

const RESULT_MESSAGES = [
  {
    min: 0,
    max: 1,
    emoji: "🌱",
    msg: "You're just starting to discover your growth mindset! The fact you're here means you're already on the right path. Keep going — every small shift in thinking adds up!",
  },
  {
    min: 2,
    max: 3,
    emoji: "🌿",
    msg: "You're growing! You already think like a champion in many situations. Keep practicing the growth mindset — it gets easier the more you use it.",
  },
  {
    min: 4,
    max: 4,
    emoji: "🌸",
    msg: "You're almost there! You've got a strong growth mindset most of the time. With a little more practice you'll be unstoppable!",
  },
  {
    min: 5,
    max: 5,
    emoji: "🌟",
    msg: "Incredible! You have a full-on GROWTH MINDSET! You know that effort, strategy, and resilience are your greatest tools. You are going places, girl!",
  },
];

export function GrowthMindsetQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const q = QUIZ_QUESTIONS[currentQ];
  const resultMsg = RESULT_MESSAGES.find(
    (r) => score >= r.min && score <= r.max,
  );

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplanation(true);
    const correct = q.options[idx].isGrowth;
    if (correct) setScore((s) => s + 1);
    setAnswers((prev) => [...prev, correct]);
  };

  const handleNext = () => {
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowExplanation(false);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  };

  if (finished) {
    return (
      <div className="max-w-xl mx-auto text-center" data-ocid="quiz.section">
        <div className="text-6xl mb-4">{resultMsg?.emoji}</div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Quiz Complete! You scored {score}/{QUIZ_QUESTIONS.length}
        </h2>
        <div className="bg-teal-light-gp rounded-2xl p-6 mb-6">
          <p className="text-foreground text-base leading-relaxed">
            {resultMsg?.msg}
          </p>
        </div>
        <div className="flex gap-2 justify-center flex-wrap mb-4">
          {answers.map((correct, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: static quiz answers indexed by position
              key={i}
              className={`text-2xl ${correct ? "opacity-100" : "opacity-30"}`}
            >
              ⭐
            </span>
          ))}
        </div>
        <Button
          className="rounded-full bg-teal-gp text-white font-bold px-8"
          onClick={handleRestart}
          data-ocid="quiz.primary_button"
        >
          Try Again 🔄
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto" data-ocid="quiz.section">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-2xl font-bold text-foreground">
          🧠 Growth Mindset Quiz
        </h2>
        <Badge className="bg-teal-gp text-white rounded-full">
          {currentQ + 1}/{QUIZ_QUESTIONS.length}
        </Badge>
      </div>
      <div className="w-full bg-border rounded-full h-2 mb-6">
        <div
          className="bg-teal-gp h-2 rounded-full transition-all duration-500"
          style={{
            width: `${((currentQ + 1) / QUIZ_QUESTIONS.length) * 100}%`,
          }}
        />
      </div>
      <Card className="rounded-2xl border-2 border-border mb-4">
        <CardHeader>
          <CardTitle className="font-display text-lg text-foreground leading-snug">
            {q.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {q.options.map((opt, idx) => {
            let btnClass =
              "w-full text-left rounded-xl border-2 p-4 font-medium transition-all text-sm cursor-pointer";
            if (selected === null) {
              btnClass +=
                " border-border hover:border-teal-gp hover:bg-teal-light-gp";
            } else if (opt.isGrowth) {
              btnClass +=
                " border-teal-gp bg-teal-light-gp text-teal-gp font-bold";
            } else if (selected === idx && !opt.isGrowth) {
              btnClass += " border-coral-gp bg-coral-light-gp text-coral-gp";
            } else {
              btnClass += " border-border opacity-50";
            }
            return (
              <button
                // biome-ignore lint/suspicious/noArrayIndexKey: quiz answer options indexed by position
                key={idx}
                type="button"
                className={btnClass}
                onClick={() => handleAnswer(idx)}
                data-ocid={`quiz.item.${idx + 1}`}
              >
                {opt.text}
              </button>
            );
          })}
        </CardContent>
      </Card>
      {showExplanation && (
        <div className="bg-purple-light-gp rounded-2xl p-4 mb-4 border-2 border-purple-gp/30">
          <p className="text-sm font-medium text-foreground">
            💜 <strong>Growth Mindset Insight:</strong> {q.explanation}
          </p>
        </div>
      )}
      {selected !== null && (
        <Button
          className="w-full rounded-full bg-teal-gp text-white font-bold"
          onClick={handleNext}
          data-ocid="quiz.primary_button"
        >
          {currentQ < QUIZ_QUESTIONS.length - 1
            ? "Next Question →"
            : "See My Results 🌟"}
        </Button>
      )}
    </div>
  );
}

// ===== AFFIRMATION GENERATOR =====
const AFFIRMATIONS = [
  "I am brave enough to try things that scare me.",
  "My ideas are worth sharing with the world.",
  "I grow stronger every time I face a challenge.",
  "I am enough, exactly as I am right now.",
  "My voice matters and people want to hear it.",
  "I choose kindness — starting with myself.",
  "Every mistake is a step toward becoming amazing.",
  "I have the power to create my own happiness.",
  "I am surrounded by people who believe in me.",
  "My dreams are valid and absolutely achievable.",
  "I am learning, growing, and becoming better each day.",
  "I radiate confidence, warmth, and positive energy.",
  "I deserve good things — I don't need to earn them.",
  "Challenges make me stronger, not smaller.",
  "I trust my instincts because they are wise.",
  "I am a girl who gets things done.",
  "The world is better because I am in it.",
  "I can do hard things — I've proven that before.",
  "Today I choose to see my own beauty.",
  "My future is bright, and I'm writing the story.",
  "I attract friendships that lift me up.",
  "I am creative, curious, and capable.",
  "I give myself permission to take up space.",
];

export function AffirmationGenerator() {
  const [current, setCurrent] = useState<string>(AFFIRMATIONS[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [copied, setCopied] = useState(false);

  const pickNew = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const remaining = AFFIRMATIONS.filter((a) => a !== current);
      setCurrent(remaining[Math.floor(Math.random() * remaining.length)]);
      setIsAnimating(false);
    }, 200);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(current).then(() => {
      setCopied(true);
      toast.success("Copied! Share it with someone who needs it 💌");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="max-w-lg mx-auto text-center"
      data-ocid="affirmation.section"
    >
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        ✨ Affirmation Generator
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        A fresh power-up for your mindset — whenever you need it.
      </p>

      <div
        className={`relative bg-gradient-to-br from-purple-light-gp to-pink-light-gp rounded-3xl p-8 mb-6 border-2 border-purple-gp/20 shadow-card min-h-[140px] flex items-center justify-center transition-opacity duration-200 ${isAnimating ? "opacity-0" : "opacity-100"}`}
        data-ocid="affirmation.card"
      >
        <div className="absolute top-3 left-3 text-2xl opacity-30">✦</div>
        <div className="absolute bottom-3 right-3 text-2xl opacity-30">✦</div>
        <p className="font-display text-xl font-bold text-foreground leading-snug px-4">
          "{current}"
        </p>
      </div>

      <div className="flex gap-3 justify-center">
        <Button
          size="lg"
          className="rounded-full bg-purple-gp text-white font-bold px-8 hover:opacity-90 transition-opacity"
          onClick={pickNew}
          data-ocid="affirmation.primary_button"
        >
          Get My Affirmation ✨
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="rounded-full border-purple-gp text-purple-gp font-bold"
          onClick={handleCopy}
          data-ocid="affirmation.secondary_button"
        >
          {copied ? "Copied! ✓" : "Copy 📋"}
        </Button>
      </div>
    </div>
  );
}

// ===== FEAR CRUSHER =====
const FEAR_TIPS: Record<string, { tips: string[]; story: string }> = {
  default: {
    tips: [
      "Name your fear out loud — giving it a name takes away its power.",
      "Take three slow breaths: in for 4 counts, hold 2, out for 6.",
      "Ask yourself: 'What's the very smallest step I can take toward this?'",
    ],
    story:
      "Maya was terrified of speaking in class. Her hands would shake just thinking about it. One day she decided to ask just ONE question per week. By month two, she was raising her hand every day. By the end of the year, she was leading the class debate team. One tiny step at a time — that's how you crush a fear.",
  },
  heights: {
    tips: [
      "Start small — climb a ladder one rung at a time, then look down only when you're ready.",
      "Focus on what's holding you (the railing, the floor) rather than the drop.",
      "Practice controlled breathing: slow your breath to slow your heart rate.",
    ],
    story:
      "Priya was so scared of heights she couldn't climb the jungle gym. She started by just putting her hands on the first rung. Then the second. After two weeks of tiny climbs, she reached the top and screamed with joy — not fear.",
  },
  failure: {
    tips: [
      "Reframe failure as 'research' — you're collecting data on what doesn't work yet.",
      "Make a list of times you failed and what you learned. You'll be surprised!",
      "Set a 'failure quota' — aim to fail at 3 new things per week. It de-fangs the fear.",
    ],
    story:
      "Simone entered the science fair and came in last place. She was devastated. But she studied the winning project and reworked her experiment. The next year she won second place. The year after that? First. Failure was just her training ground.",
  },
  rejection: {
    tips: [
      "Remember: rejection is redirection. Every 'no' is pointing you somewhere better.",
      "Practice small rejections on purpose — ask for discounts, request favors. Build up tolerance.",
      "Write down your last three 'nos' and find the silver lining in each one.",
    ],
    story:
      "Aisha tried out for the school play and didn't get a role. She was put on the crew instead. That's where she discovered she loved directing. Three years later she won a young filmmaker's award. The rejection was the best thing that happened to her.",
  },
};

function getFearType(text: string): string {
  const lower = text.toLowerCase();
  if (
    lower.includes("height") ||
    lower.includes("fall") ||
    lower.includes("climb")
  )
    return "heights";
  if (
    lower.includes("fail") ||
    lower.includes("mistake") ||
    lower.includes("wrong")
  )
    return "failure";
  if (
    lower.includes("reject") ||
    lower.includes("ignore") ||
    lower.includes("like me")
  )
    return "rejection";
  return "default";
}

export function FearCrusher() {
  const [fearText, setFearText] = useState("");
  const [result, setResult] = useState<null | {
    tips: string[];
    story: string;
  }>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleCrush = () => {
    if (!fearText.trim()) {
      toast.error("Tell me what scares you first! 💪");
      return;
    }
    const type = getFearType(fearText);
    setResult(FEAR_TIPS[type]);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFearText("");
    setResult(null);
    setSubmitted(false);
  };

  return (
    <div className="max-w-xl mx-auto" data-ocid="fear.section">
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        💪 Fear Crusher
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        Type what scares you. We'll tackle it together with real strategies and
        an inspiring story.
      </p>

      {!submitted ? (
        <div>
          <div className="relative mb-4">
            <Input
              value={fearText}
              onChange={(e) => setFearText(e.target.value)}
              placeholder="I'm scared of... (e.g., heights, failing, rejection)"
              className="rounded-xl border-2 border-border focus:border-coral-gp pr-4 py-3 text-base"
              onKeyDown={(e) => e.key === "Enter" && handleCrush()}
              data-ocid="fear.input"
            />
          </div>
          <Button
            className="w-full rounded-full bg-coral-gp text-white font-bold text-base py-3"
            onClick={handleCrush}
            data-ocid="fear.primary_button"
          >
            Crush My Fear 💥
          </Button>
        </div>
      ) : (
        <div>
          <div className="bg-coral-light-gp rounded-2xl p-4 mb-4 border-2 border-coral-gp/20">
            <p className="text-sm text-muted-foreground mb-1 font-medium">
              Your fear:
            </p>
            <p className="font-display font-bold text-foreground">
              "{fearText}"
            </p>
          </div>

          <h3 className="font-display font-bold text-foreground mb-3">
            🛠️ 3 Ways to Face It
          </h3>
          <div className="flex flex-col gap-3 mb-6">
            {result?.tips.map((tip, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: fear tips indexed by position
                key={i}
                className="flex items-start gap-3 bg-card border-2 border-border rounded-xl p-4"
                data-ocid={`fear.item.${i + 1}`}
              >
                <span className="text-xl shrink-0">{["1️⃣", "2️⃣", "3️⃣"][i]}</span>
                <p className="text-sm text-foreground">{tip}</p>
              </div>
            ))}
          </div>

          <div className="bg-purple-light-gp rounded-2xl p-5 border-2 border-purple-gp/20 mb-4">
            <h3 className="font-display font-bold text-foreground mb-2">
              📖 A Brave Girl Story
            </h3>
            <p className="text-sm text-foreground leading-relaxed">
              {result?.story}
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full rounded-full border-coral-gp text-coral-gp font-bold"
            onClick={handleReset}
            data-ocid="fear.secondary_button"
          >
            Crush Another Fear 💪
          </Button>
        </div>
      )}
    </div>
  );
}

// ===== MISTAKE JOURNAL =====
interface MistakeEntry {
  id: string;
  mistake: string;
  learned: string;
  nextTime: string;
  date: string;
}

export function MistakeJournal() {
  const [mistake, setMistake] = useState("");
  const [learned, setLearned] = useState("");
  const [nextTime, setNextTime] = useState("");
  const [entries, setEntries] = useState<MistakeEntry[]>([]);
  const [step, setStep] = useState<"write" | "reframe">("write");

  useEffect(() => {
    const saved = localStorage.getItem("gph-mistake-journal");
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch {
        /* ignore */
      }
    }
  }, []);

  const handleReframe = () => {
    if (!mistake.trim()) {
      toast.error("Tell me about your mistake first!");
      return;
    }
    setStep("reframe");
  };

  const handleSave = () => {
    if (!learned.trim() || !nextTime.trim()) {
      toast.error("Fill in both fields to complete your reframe!");
      return;
    }
    const newEntry: MistakeEntry = {
      id: Date.now().toString(),
      mistake,
      learned,
      nextTime,
      date: new Date().toLocaleDateString(),
    };
    const updated = [newEntry, ...entries].slice(0, 3);
    setEntries(updated);
    localStorage.setItem("gph-mistake-journal", JSON.stringify(updated));
    toast.success("Mistake reframed! You're growing 🌱");
    setMistake("");
    setLearned("");
    setNextTime("");
    setStep("write");
  };

  return (
    <div className="max-w-xl mx-auto" data-ocid="mistake.section">
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        📖 Mistake Journal
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        Turn every mistake into a growth moment. This is a judgment-free zone.
        💚
      </p>

      {step === "write" ? (
        <div>
          <label
            htmlFor="mistake-what"
            className="block text-sm font-bold text-foreground mb-2"
          >
            What happened?
          </label>
          <Textarea
            id="mistake-what"
            value={mistake}
            onChange={(e) => setMistake(e.target.value)}
            placeholder="I made a mistake when..."
            className="rounded-xl border-2 border-border focus:border-teal-gp resize-none mb-4 min-h-[100px]"
            data-ocid="mistake.textarea"
          />
          <Button
            className="w-full rounded-full bg-teal-gp text-white font-bold"
            onClick={handleReframe}
            data-ocid="mistake.primary_button"
          >
            Reframe It 🔄
          </Button>
        </div>
      ) : (
        <div>
          <div className="bg-teal-light-gp rounded-2xl p-4 mb-4 border-2 border-teal-gp/20">
            <p className="text-sm text-muted-foreground">What happened:</p>
            <p className="font-medium text-foreground text-sm mt-1">
              "{mistake}"
            </p>
          </div>

          <div className="bg-card rounded-2xl border-2 border-teal-gp/30 p-5 mb-4">
            <h3 className="font-display font-bold text-teal-gp text-base mb-4">
              🌱 Reframe It
            </h3>
            <div className="mb-4">
              <label
                htmlFor="mistake-learned"
                className="block text-sm font-bold text-foreground mb-2"
              >
                What I learned was...
              </label>
              <Textarea
                id="mistake-learned"
                value={learned}
                onChange={(e) => setLearned(e.target.value)}
                placeholder="I learned that..."
                className="rounded-xl border-2 border-border focus:border-teal-gp resize-none min-h-[80px]"
                data-ocid="mistake.input"
              />
            </div>
            <div>
              <label
                htmlFor="mistake-nexttime"
                className="block text-sm font-bold text-foreground mb-2"
              >
                Next time I can...
              </label>
              <Textarea
                id="mistake-nexttime"
                value={nextTime}
                onChange={(e) => setNextTime(e.target.value)}
                placeholder="Next time I will..."
                className="rounded-xl border-2 border-border focus:border-teal-gp resize-none min-h-[80px]"
                data-ocid="mistake.textarea"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 rounded-full border-border text-muted-foreground"
              onClick={() => setStep("write")}
              data-ocid="mistake.cancel_button"
            >
              ← Back
            </Button>
            <Button
              className="flex-1 rounded-full bg-teal-gp text-white font-bold"
              onClick={handleSave}
              data-ocid="mistake.save_button"
            >
              Save Entry 💾
            </Button>
          </div>
        </div>
      )}

      {entries.length > 0 && (
        <div className="mt-8">
          <h3 className="font-display font-bold text-muted-foreground text-sm uppercase tracking-wider mb-3">
            Recent Entries ({entries.length}/3)
          </h3>
          <div className="flex flex-col gap-3" data-ocid="mistake.list">
            {entries.map((entry, i) => (
              <div
                key={entry.id}
                className="bg-card border-2 border-border rounded-xl p-4"
                data-ocid={`mistake.item.${i + 1}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    {entry.date}
                  </span>
                  <Badge className="bg-teal-gp text-white text-xs">
                    Reframed ✓
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 mb-1">
                  <strong>Mistake:</strong> {entry.mistake}
                </p>
                <p className="text-xs text-foreground line-clamp-1 mb-1">
                  <strong>Learned:</strong> {entry.learned}
                </p>
                <p className="text-xs text-foreground line-clamp-1">
                  <strong>Next time:</strong> {entry.nextTime}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ===== POWER WORDS WALL =====
const WORD_COLORS = [
  "bg-pink-gp text-white",
  "bg-purple-gp text-white",
  "bg-teal-gp text-white",
  "bg-coral-gp text-white",
  "bg-yellow-gp text-foreground",
  "bg-pink-light-gp text-pink-gp",
  "bg-purple-light-gp text-purple-gp",
  "bg-teal-light-gp text-teal-gp",
  "bg-coral-light-gp text-coral-gp",
];

const SEED_WORDS = [
  "Brave",
  "Resilient",
  "Creative",
  "Unstoppable",
  "Fierce",
  "Kind",
  "Brilliant",
];

export function PowerWordsWall() {
  const [words, setWords] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("gph-power-words");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setWords(parsed.length > 0 ? parsed : SEED_WORDS);
      } catch {
        setWords(SEED_WORDS);
      }
    } else {
      setWords(SEED_WORDS);
    }
  }, []);

  const saveWords = (updated: string[]) => {
    setWords(updated);
    localStorage.setItem("gph-power-words", JSON.stringify(updated));
  };

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      toast.error("Type a word first! 💬");
      return;
    }
    if (words.map((w) => w.toLowerCase()).includes(trimmed.toLowerCase())) {
      toast.error("That word is already on your wall!");
      return;
    }
    saveWords([...words, trimmed]);
    toast.success(`"${trimmed}" added to your Power Wall! 🌟`);
    setInput("");
  };

  const handleClearAll = () => {
    saveWords([]);
    toast.success("Wall cleared! Ready for new power words.");
  };

  return (
    <div className="max-w-xl mx-auto" data-ocid="powerwords.section">
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        🌟 Power Words Wall
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        What words make you feel strong, brave, and unstoppable? Build your own
        wall!
      </p>

      <div className="flex gap-2 mb-6">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a power word..."
          className="flex-1 rounded-full border-2 border-border focus:border-pink-gp"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          maxLength={20}
          data-ocid="powerwords.input"
        />
        <Button
          className="rounded-full bg-pink-gp text-white font-bold px-6 shrink-0"
          onClick={handleAdd}
          data-ocid="powerwords.primary_button"
        >
          Add ✨
        </Button>
      </div>

      {words.length === 0 ? (
        <div
          className="text-center py-12 border-2 border-dashed border-border rounded-2xl"
          data-ocid="powerwords.empty_state"
        >
          <div className="text-4xl mb-3">🌟</div>
          <p className="text-muted-foreground text-sm">
            Your Power Words Wall is empty. Add your first word above!
          </p>
        </div>
      ) : (
        <div
          className="bg-card border-2 border-border rounded-2xl p-6 mb-4"
          data-ocid="powerwords.list"
        >
          <div className="flex flex-wrap gap-3">
            {words.map((word, i) => (
              <span
                key={word}
                className={`inline-flex items-center font-display font-bold text-sm px-4 py-2 rounded-full shadow-sm transition-transform hover:scale-105 cursor-default ${WORD_COLORS[i % WORD_COLORS.length]}`}
                data-ocid={`powerwords.item.${i + 1}`}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      {words.length > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {words.length} power {words.length === 1 ? "word" : "words"} on your
            wall
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-coral-gp text-xs"
            onClick={handleClearAll}
            data-ocid="powerwords.delete_button"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
}
