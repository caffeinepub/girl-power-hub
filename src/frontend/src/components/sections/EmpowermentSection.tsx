import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

// ===== FUTURE LEADERS =====
const LEADERSHIP_TIPS = [
  {
    emoji: "👂",
    title: "Listen More Than You Talk",
    desc: "Great leaders hear everyone's ideas, not just their own. Ask 'What do you think?' and really mean it.",
  },
  {
    emoji: "💡",
    title: "Solve Problems, Don't Just Spot Them",
    desc: "Anyone can point out a problem. Leaders show up with ideas for how to fix it!",
  },
  {
    emoji: "🤝",
    title: "Lift Others Up",
    desc: "The best leaders make everyone around them feel more confident and capable.",
  },
  {
    emoji: "🎯",
    title: "Set Clear Goals",
    desc: "Write down what your group wants to achieve. A destination makes the journey possible.",
  },
  {
    emoji: "🌟",
    title: "Lead by Example",
    desc: "Don't ask others to do what you wouldn't do yourself. Integrity is the foundation of leadership.",
  },
  {
    emoji: "💬",
    title: "Communicate Kindly and Clearly",
    desc: "Great communication is honest, kind, and specific. Say what you mean and mean what you say.",
  },
];

const LEADER_QUIZ_QUESTIONS = [
  {
    question: "When your class project goes wrong, what's your first move?",
    options: [
      {
        text: "Gather everyone to brainstorm solutions together",
        type: "collaborative",
      },
      {
        text: "Take charge and come up with a plan on your own",
        type: "decisive",
      },
      { text: "Think of a totally creative new direction", type: "creative" },
    ],
  },
  {
    question: "Your friend is struggling with a task. You...",
    options: [
      { text: "Work through it together step by step", type: "collaborative" },
      { text: "Show them exactly how to do it efficiently", type: "decisive" },
      { text: "Invent a fun new way to practice the skill", type: "creative" },
    ],
  },
  {
    question: "Your dream class project would be...",
    options: [
      {
        text: "A team project where everyone has an equal role",
        type: "collaborative",
      },
      {
        text: "Something with clear goals and measurable success",
        type: "decisive",
      },
      {
        text: "A totally unique project no one has done before",
        type: "creative",
      },
    ],
  },
];

const LEADER_RESULTS: Record<
  string,
  { title: string; desc: string; emoji: string; color: string }
> = {
  collaborative: {
    title: "You're a Collaborative Leader! 🤝",
    desc: "You have the rare gift of making everyone feel included and valued. You bring out the best in teams and create an environment where great ideas flow freely. Your superpower is building community.",
    emoji: "🤝",
    color: "bg-teal-light-gp text-teal-gp",
  },
  decisive: {
    title: "You're a Decisive Leader! 🎯",
    desc: "You're clear-headed, goal-oriented, and get things done. When there's a challenge, you step up with a plan. Your superpower is turning chaos into clarity and dreams into reality.",
    emoji: "🎯",
    color: "bg-coral-light-gp text-coral-gp",
  },
  creative: {
    title: "You're a Creative Leader! 🌈",
    desc: "You think outside every box and inspire others to imagine what's possible. You bring fresh energy and innovative solutions that no one else would think of. Your superpower is turning imagination into change.",
    emoji: "🌈",
    color: "bg-purple-light-gp text-purple-gp",
  },
};

export function FutureLeaders() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(LEADER_QUIZ_QUESTIONS.length).fill(null),
  );
  const [showResult, setShowResult] = useState(false);

  const allAnswered = answers.every((a) => a !== null);

  const getResult = () => {
    const counts: Record<string, number> = {
      collaborative: 0,
      decisive: 0,
      creative: 0,
    };
    answers.forEach((ans, qi) => {
      if (ans !== null) {
        const type = LEADER_QUIZ_QUESTIONS[qi].options[ans].type;
        counts[type]++;
      }
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  };

  const resultKey = showResult ? getResult() : null;
  const result = resultKey ? LEADER_RESULTS[resultKey] : null;

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-yellow-gp font-bold">
        Future Leaders 👑
      </h3>
      <p className="text-muted-foreground">
        Level up your leadership skills and discover your leader style!
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {LEADERSHIP_TIPS.map((tip, _i) => (
          <Card key={tip.title} className="bg-yellow-light-gp border-none">
            <CardContent className="p-4">
              <div className="text-2xl mb-2">{tip.emoji}</div>
              <div className="font-display font-bold text-sm text-foreground mb-1">
                {tip.title}
              </div>
              <div className="text-xs text-muted-foreground">{tip.desc}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 bg-card rounded-2xl border-2 border-yellow-gp/30 p-5">
        <h4 className="font-display font-bold text-yellow-gp text-lg mb-4">
          🌟 Leadership Style Quiz
        </h4>
        {LEADER_QUIZ_QUESTIONS.map((q, qi) => (
          <div key={q.question} className="mb-5">
            <p className="font-bold text-sm mb-2">
              {qi + 1}. {q.question}
            </p>
            <div className="flex flex-col gap-2">
              {q.options.map((opt, oi) => (
                <button
                  key={opt.text}
                  type="button"
                  className={`text-left px-4 py-2 rounded-xl border-2 text-sm transition-all ${
                    answers[qi] === oi
                      ? "bg-yellow-light-gp border-yellow-gp font-bold"
                      : "border-border hover:border-yellow-gp"
                  }`}
                  onClick={() => {
                    setAnswers((prev) => {
                      const n = [...prev];
                      n[qi] = oi;
                      return n;
                    });
                    setShowResult(false);
                  }}
                  data-ocid={`leaders.item.${qi + 1}`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ))}
        {allAnswered && !showResult && (
          <Button
            className="bg-yellow-gp text-foreground font-bold rounded-full px-8"
            onClick={() => setShowResult(true)}
            data-ocid="leaders.primary_button"
          >
            Reveal My Leader Type! 👑
          </Button>
        )}
        {result && showResult && (
          <div
            className={`mt-4 p-5 rounded-2xl font-bold text-center ${result.color}`}
          >
            <div className="text-4xl mb-2">{result.emoji}</div>
            <div className="font-display text-xl mb-2">{result.title}</div>
            <div className="text-sm font-normal">{result.desc}</div>
            <Button
              variant="outline"
              className="mt-4 rounded-full border-current"
              onClick={() => {
                setAnswers(new Array(LEADER_QUIZ_QUESTIONS.length).fill(null));
                setShowResult(false);
              }}
              data-ocid="leaders.secondary_button"
            >
              Try Again 🔄
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ===== DAILY HIGH-FIVES =====
const DAILY_GOALS = [
  "Say something kind to someone you don't usually talk to 💬",
  "Draw a picture of your dream future self 🎨",
  "Write down 3 things you're grateful for today ✍️",
  "Do 10 jumping jacks and feel your energy rise 💪",
  "Tell someone in your family you love them ❤️",
  "Drink 6 glasses of water today 💧",
  "Read for 20 minutes without stopping 📚",
  "Clean one corner of your room and feel proud 🧹",
  "Send a kind text to a friend who might need it 📱",
  "Try a food you've never eaten before 🍎",
  "Stand in front of a mirror and say 'I am amazing!' ⭐",
  "Help someone with a task they're struggling with 🤝",
  "Learn one new fact about something you love 🔍",
  "Go outside and breathe fresh air for 10 minutes 🌿",
  "Write a poem — even just 4 lines! ✏️",
  "Do something creative for 15 minutes 🎭",
  "Say no to something that doesn't feel right for you 🙅‍♀️",
  "Compliment yourself on something you did well today 🌟",
  "Listen to your favorite song and really feel it 🎵",
  "Think of a problem in your community and one way to help 💡",
  "Try a new yoga pose you've never done 🧘‍♀️",
  "Write a letter to your future self 💌",
  "Look up the biography of a girl hero and share what you learned 📖",
  "Do something kind for an animal or plant 🌱",
  "Practice a skill you're learning for 10 minutes 🎯",
  "Put your phone away for 1 whole hour 📵",
  "Make someone laugh today 😂",
  "Try teaching someone something you know 🏫",
  "Set one goal for the week and write it down 🗺️",
  "Celebrate a small win — you deserve it! 🎉",
];

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function getGoalIndexForDate(date: string) {
  let hash = 0;
  for (const char of date) hash += char.charCodeAt(0);
  return hash % DAILY_GOALS.length;
}

export function DailyHighFives() {
  const today = getTodayKey();
  const goalIndex = getGoalIndexForDate(today);
  const goal = DAILY_GOALS[goalIndex];

  const [completedDates, setCompletedDates] = useState<string[]>([]);
  const isDoneToday = completedDates.includes(today);

  const streak = (() => {
    let count = 0;
    let day = new Date();
    while (true) {
      const key = day.toISOString().split("T")[0];
      if (completedDates.includes(key)) {
        count++;
        day.setDate(day.getDate() - 1);
      } else {
        break;
      }
    }
    return count;
  })();

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <h3 className="font-display text-2xl text-pink-gp font-bold">
        Daily High-Fives 🖐️
      </h3>
      <p className="text-muted-foreground text-center max-w-sm">
        A new goal every day to help you grow into the awesome person you
        already are!
      </p>

      <div className="flex gap-4">
        <div className="bg-yellow-light-gp rounded-2xl px-6 py-3 text-center">
          <div className="font-display text-3xl font-bold text-yellow-gp">
            {streak}
          </div>
          <div className="text-xs text-muted-foreground">day streak 🔥</div>
        </div>
        <div className="bg-pink-light-gp rounded-2xl px-6 py-3 text-center">
          <div className="font-display text-3xl font-bold text-pink-gp">
            {completedDates.length}
          </div>
          <div className="text-xs text-muted-foreground">total days ⭐</div>
        </div>
      </div>

      <Card
        className={`w-full max-w-lg border-2 ${isDoneToday ? "bg-teal-light-gp border-teal-gp" : "border-pink-gp bg-pink-light-gp"}`}
      >
        <CardContent className="p-8 text-center">
          <div className="text-4xl mb-3">🖐️</div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-3">
            Today's Goal — {today}
          </p>
          <p className="font-display text-lg font-bold text-foreground leading-relaxed">
            {goal}
          </p>
        </CardContent>
      </Card>

      {!isDoneToday ? (
        <Button
          className="bg-pink-gp text-white rounded-full px-8 font-bold text-lg py-6"
          onClick={() => setCompletedDates((prev) => [...prev, today])}
          data-ocid="highfives.primary_button"
        >
          I did it today! 🖐️
        </Button>
      ) : (
        <div className="bg-teal-light-gp rounded-2xl px-8 py-4 text-center">
          <div className="text-2xl mb-1">🌟</div>
          <p className="font-display font-bold text-teal-gp">
            You crushed it today! Come back tomorrow for a new goal!
          </p>
        </div>
      )}
    </div>
  );
}

// ===== GIRL POWER WALL OF FAME (localStorage version) =====
export function GirlPowerWallOfFame() {
  const STORAGE_KEY = "empowerment-wall-of-fame";
  const [entries, setEntries] = useState<{ name: string; reason: string }[]>(
    () => {
      try {
        return JSON.parse(
          localStorage.getItem(STORAGE_KEY) ||
            '[{"name":"My Mom","reason":"She works so hard every day and never gives up on anything!"},{"name":"Malala Yousafzai","reason":"She fought for girls\' education even when it was dangerous!"}]',
        );
      } catch {
        return [];
      }
    },
  );
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");

  const add = () => {
    if (!name.trim() || !reason.trim()) {
      return;
    }
    const updated = [{ name: name.trim(), reason: reason.trim() }, ...entries];
    setEntries(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setName("");
    setReason("");
  };

  const COLORS = [
    "bg-pink-light-gp border-pink-gp",
    "bg-purple-light-gp border-purple-gp",
    "bg-teal-light-gp border-teal-gp",
    "bg-yellow-light-gp border-yellow-gp",
    "bg-coral-light-gp border-coral-gp",
  ];

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-pink-gp font-bold">
        Girl Power Wall of Fame 🏆
      </h3>
      <p className="text-muted-foreground">
        Nominate a girl or woman who ROCKS! Tell everyone why she's amazing.
      </p>
      <Card className="border-2 border-pink-light-gp">
        <CardContent className="p-5 flex flex-col gap-3">
          <Input
            placeholder="Who rocks? (name)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-border focus:border-pink-gp"
            data-ocid="walloffame.input"
          />
          <Input
            placeholder="Why does she rock? ✨"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="border-border focus:border-pink-gp"
          />
          <Button
            onClick={add}
            disabled={!name.trim() || !reason.trim()}
            className="bg-pink-gp text-white rounded-full self-start px-8"
            data-ocid="walloffame.submit_button"
          >
            Add to Wall 🏆
          </Button>
        </CardContent>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((e, i) => (
          <Card
            key={`${e.name}-${i}`}
            className={`border-2 ${COLORS[i % COLORS.length]}`}
            data-ocid={`walloffame.item.${i + 1}`}
          >
            <CardContent className="p-4">
              <div className="text-lg mb-1">⭐</div>
              <h4 className="font-display font-bold text-sm">{e.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{e.reason}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ===== VISION BOARD BUILDER =====
const VISION_CATEGORIES = [
  {
    label: "Career Dream",
    emoji: "💼",
    options: [
      "Doctor 👩‍⚕️",
      "Artist 🎨",
      "Engineer 👩‍💻",
      "Athlete 🏅",
      "Author ✍️",
      "Scientist 🔬",
      "Entrepreneur 💡",
      "Teacher 📚",
    ],
  },
  {
    label: "Place to Visit",
    emoji: "✈️",
    options: [
      "Paris 🗼",
      "Tokyo 🌸",
      "New York 🗽",
      "Safari 🦁",
      "Space 🚀",
      "Maldives 🌊",
      "Egypt 🏛️",
      "Amazon 🌿",
    ],
  },
  {
    label: "Skill to Learn",
    emoji: "🎯",
    options: [
      "Code 💻",
      "Guitar 🎸",
      "Dance 💃",
      "Speak French 🇫🇷",
      "Paint 🖌️",
      "Yoga 🧘",
      "Cook 🍳",
      "Rock climb 🧗",
    ],
  },
  {
    label: "How I'll Feel",
    emoji: "💫",
    options: [
      "Confident 💪",
      "Free 🕊️",
      "Loved 💖",
      "Creative 🌈",
      "Unstoppable ✨",
      "Peaceful 🌿",
      "Joyful 🌟",
      "Powerful 👑",
    ],
  },
];

export function VisionBoardBuilder() {
  const STORAGE_KEY = "vision-board";
  const [board, setBoard] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  });

  const select = (category: string, option: string) => {
    const updated = {
      ...board,
      [category]: board[category] === option ? "" : option,
    };
    setBoard(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const filled = Object.values(board).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-purple-gp font-bold">
        Vision Board Builder ✨
      </h3>
      <p className="text-muted-foreground">
        Build your vision board! Select one option from each category to create
        YOUR dream future. {filled}/4 selected ✨
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {VISION_CATEGORIES.map((cat) => (
          <Card key={cat.label} className="border-2 border-purple-light-gp">
            <CardContent className="p-4">
              <h4 className="font-display font-bold text-purple-gp mb-3">
                {cat.emoji} {cat.label}
              </h4>
              <div className="flex flex-wrap gap-2">
                {cat.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => select(cat.label, opt)}
                    className={`px-3 py-1 rounded-full text-xs font-bold border-2 transition-all ${board[cat.label] === opt ? "bg-purple-gp text-white border-purple-gp" : "border-border hover:border-purple-gp"}`}
                    data-ocid="visionboard.toggle"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {filled === 4 && (
        <Card
          className="bg-purple-light-gp border-2 border-purple-gp text-center"
          data-ocid="visionboard.success_state"
        >
          <CardContent className="p-6">
            <div className="text-3xl mb-2">✨</div>
            <h4 className="font-display font-bold text-purple-gp mb-3">
              Your Vision Board!
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {VISION_CATEGORIES.map(
                (cat) =>
                  board[cat.label] && (
                    <div key={cat.label} className="bg-white/50 rounded-xl p-3">
                      <p className="text-xs font-bold text-purple-gp">
                        {cat.emoji} {cat.label}
                      </p>
                      <p className="text-sm font-bold">{board[cat.label]}</p>
                    </div>
                  ),
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ===== GOAL TRACKER =====
export function GoalTracker() {
  const STORAGE_KEY = "empowerment-goals";
  interface Goal {
    id: number;
    text: string;
    done: boolean;
    week: string;
  }
  const thisWeek = () => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff)).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const [goals, setGoals] = useState<Goal[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [newGoal, setNewGoal] = useState("");

  const add = () => {
    if (!newGoal.trim()) return;
    const updated = [
      ...goals,
      { id: Date.now(), text: newGoal.trim(), done: false, week: thisWeek() },
    ];
    setGoals(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setNewGoal("");
  };

  const toggle = (id: number) => {
    const updated = goals.map((g) =>
      g.id === id ? { ...g, done: !g.done } : g,
    );
    setGoals(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const remove = (id: number) => {
    const updated = goals.filter((g) => g.id !== id);
    setGoals(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const thisWeekGoals = goals.filter((g) => g.week === thisWeek());
  const done = thisWeekGoals.filter((g) => g.done).length;

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-teal-gp font-bold">
        Goal Tracker 🎯
      </h3>
      <p className="text-muted-foreground">
        Set weekly goals and check them off! Small wins lead to big dreams. 💪
      </p>
      <Card className="border-2 border-teal-light-gp">
        <CardContent className="p-4">
          <p className="text-xs font-bold text-muted-foreground mb-2">
            Week of {thisWeek()} — {done}/{thisWeekGoals.length} goals done!
          </p>
          <div className="flex gap-2 mb-3">
            <Input
              placeholder="Add a new goal for this week..."
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && add()}
              className="border-teal-gp focus:border-teal-gp"
              data-ocid="goaltracker.input"
            />
            <Button
              onClick={add}
              disabled={!newGoal.trim()}
              className="bg-teal-gp text-white rounded-full shrink-0"
              data-ocid="goaltracker.submit_button"
            >
              Add 🎯
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            {thisWeekGoals.length === 0 ? (
              <p
                className="text-sm text-muted-foreground text-center py-4"
                data-ocid="goaltracker.empty_state"
              >
                No goals yet this week! Add your first one above. 🌟
              </p>
            ) : (
              thisWeekGoals.map((goal, i) => (
                <div
                  key={goal.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${goal.done ? "bg-teal-light-gp border-teal-gp" : "border-border"}`}
                  data-ocid={`goaltracker.item.${i + 1}`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(goal.id)}
                    className="shrink-0"
                    data-ocid={`goaltracker.checkbox.${i + 1}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${goal.done ? "bg-teal-gp border-teal-gp text-white" : "border-muted-foreground"}`}
                    >
                      {goal.done && "✓"}
                    </div>
                  </button>
                  <span
                    className={`flex-1 text-sm ${goal.done ? "line-through text-muted-foreground" : ""}`}
                  >
                    {goal.text}
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(goal.id)}
                    className="text-muted-foreground hover:text-destructive text-xs"
                    data-ocid={`goaltracker.delete_button.${i + 1}`}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ===== COMMUNITY CHALLENGE =====
const KINDNESS_CHALLENGES = [
  "Say 3 nice things to 3 different people today",
  "Leave a positive note for a classmate or neighbor",
  "Do a chore without being asked",
  "Smile at 5 strangers today",
  "Write a thank-you note to someone who helped you",
  "Pick up litter in your neighborhood",
  "Include someone who looks lonely",
  "Share your lunch or a snack with a friend",
  "Give someone a genuine compliment",
  "Help someone carry something heavy",
  "Hold the door open for 5 people",
  "Donate something you no longer need",
  "Check in on a friend who seems sad",
  "Make a card for someone in a hospital or care home",
  "Teach someone something you're good at",
  "Say 'thank you' more than usual today",
  "Leave a positive review for a local business you love",
  "Call or video chat a relative you haven't talked to in a while",
  "Volunteer for 30 minutes",
  "Plant something beautiful for others to see",
  "Buy a coffee for the person behind you in line",
  "Clean up a community space",
  "Share food with animals — put out bird seed or water",
  "Write a letter to your local government about something you care about",
  "Organize a kindness challenge at school",
  "Start a book drive for underprivileged kids",
  "Leave encouraging sticky notes in public places",
  "Create artwork and give it away",
  "Tutor or help a younger student",
  "End the month with a reflection: how have you changed? 💖",
];

export function CommunityChallenge() {
  const STORAGE_KEY = "community-challenge";
  const [checked, setChecked] = useState<boolean[]>(() => {
    try {
      return JSON.parse(
        localStorage.getItem(STORAGE_KEY) ||
          JSON.stringify(new Array(30).fill(false)),
      );
    } catch {
      return new Array(30).fill(false);
    }
  });

  const toggle = (i: number) => {
    const updated = checked.map((v, idx) => (idx === i ? !v : v));
    setChecked(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const done = checked.filter(Boolean).length;

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-coral-gp font-bold">
        30-Day Kindness Challenge 💖
      </h3>
      <p className="text-muted-foreground">
        One kindness act per day for 30 days. See how much love you can spread!
        ({done}/30 done)
      </p>
      <div className="bg-coral-light-gp rounded-full h-3">
        <div
          className="bg-coral-gp h-3 rounded-full transition-all duration-500"
          style={{ width: `${(done / 30) * 100}%` }}
        />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {KINDNESS_CHALLENGES.map((act, i) => (
          <button
            key={act}
            type="button"
            className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all text-left w-full ${checked[i] ? "bg-coral-light-gp border-coral-gp" : "border-border hover:border-coral-gp"}`}
            onClick={() => toggle(i)}
            data-ocid={`challenge.checkbox.${i + 1}`}
          >
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 ${checked[i] ? "bg-coral-gp border-coral-gp text-white" : "border-muted-foreground text-muted-foreground"}`}
            >
              {i + 1}
            </div>
            <span
              className={`text-sm ${checked[i] ? "line-through text-muted-foreground" : ""}`}
            >
              {act}
            </span>
          </button>
        ))}
      </div>
      {done === 30 && (
        <Card
          className="bg-coral-light-gp border-none text-center"
          data-ocid="challenge.success_state"
        >
          <CardContent className="p-6">
            <div className="text-4xl mb-2">💖🏆</div>
            <p className="font-display text-xl font-bold text-coral-gp">
              30 Days of Kindness Complete! You're changing the world! ✨
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ===== SPEAK UP =====
const SPEECH_TIPS = [
  {
    emoji: "🎯",
    title: "Know Your Topic",
    desc: "Read about what you're going to say. The more you know, the more confident you'll feel.",
  },
  {
    emoji: "🪞",
    title: "Practice Out Loud",
    desc: "Practice in front of a mirror or record yourself. Hearing your own voice makes you braver.",
  },
  {
    emoji: "👁️",
    title: "Make Eye Contact",
    desc: "Look at your audience — not at the floor! Pick a few friendly faces and connect with them.",
  },
  {
    emoji: "💨",
    title: "Breathe First",
    desc: "Before you start, take one deep breath. It calms your nervous system and steadies your voice.",
  },
  {
    emoji: "🎙️",
    title: "Speak Clearly and Slowly",
    desc: "Nervousness makes us rush. Slow down! Speak like every word matters — because it does.",
  },
  {
    emoji: "❌",
    title: "It's OK to Mess Up",
    desc: "Stumbling over words is human! Take a pause, breathe, and continue. No one minds.",
  },
];

const SPEECH_STARTERS = [
  "Thank you for giving me the chance to speak today. I want to talk about something I care deeply about...",
  "Good morning/afternoon! My name is ___ and today I'm going to share something that changed how I think about...",
  "Did you know that ___? I was surprised to learn this, and it made me want to learn more...",
  "I have a dream. It's not just my dream — I believe many of us share it...",
  "Once, I was afraid to speak up. But then I realized that my voice matters — and so does yours...",
  "There's a problem in our community that I think we can solve together...",
];

export function SpeakUp() {
  const [starterIdx, setStarterIdx] = useState(0);
  const [speech, setSpeech] = useState("");

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-yellow-gp font-bold">
        Speak Up! 🎙️
      </h3>
      <p className="text-muted-foreground">
        Your voice matters. Learn to speak with confidence and make people
        listen! 🌟
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SPEECH_TIPS.map((tip, i) => (
          <Card
            key={tip.title}
            className="bg-yellow-light-gp border-none"
            data-ocid={`speakup.item.${i + 1}`}
          >
            <CardContent className="p-4">
              <div className="text-2xl mb-2">{tip.emoji}</div>
              <p className="font-display font-bold text-sm">{tip.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{tip.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-2 border-yellow-gp">
        <CardContent className="p-4">
          <h4 className="font-display font-bold text-yellow-gp mb-3">
            🎤 Speech Starter Generator
          </h4>
          <div className="bg-yellow-light-gp rounded-xl p-3 text-sm italic mb-3">
            "{SPEECH_STARTERS[starterIdx]}"
          </div>
          <Button
            size="sm"
            variant="outline"
            className="border-yellow-gp text-yellow-gp rounded-full"
            onClick={() =>
              setStarterIdx((p) => (p + 1) % SPEECH_STARTERS.length)
            }
            data-ocid="speakup.secondary_button"
          >
            New Starter 🎲
          </Button>
        </CardContent>
      </Card>
      <div>
        <p className="text-sm font-bold text-muted-foreground block mb-2">
          ✍️ Write Your Own Speech (use the starter or go freestyle!):
        </p>
        <Textarea
          placeholder="Start writing your speech here..."
          value={speech}
          onChange={(e) => setSpeech(e.target.value)}
          rows={5}
          className="resize-none border-yellow-gp/30 focus:border-yellow-gp"
          data-ocid="speakup.textarea"
        />
        {speech.split(" ").filter(Boolean).length > 10 && (
          <p className="text-xs text-yellow-gp mt-1 font-bold">
            {speech.split(" ").filter(Boolean).length} words written! Great
            start! 🌟
          </p>
        )}
      </div>
    </div>
  );
}

// ===== FASHION FOR CHANGE =====
const SUSTAINABLE_TIPS = [
  {
    emoji: "👗",
    title: "Thrift First",
    desc: "Before buying new, check thrift stores and consignment shops. You'll find unique pieces and save money!",
  },
  {
    emoji: "✂️",
    title: "Upcycle Old Clothes",
    desc: "Turn old jeans into shorts, a T-shirt into a crop top, or create a patchwork bag from scraps.",
  },
  {
    emoji: "🔄",
    title: "Host a Clothing Swap",
    desc: "Gather friends and swap clothes you no longer wear. Everyone gets 'new' clothes for free!",
  },
  {
    emoji: "🌿",
    title: "Choose Natural Fabrics",
    desc: "Look for cotton, linen, bamboo, or wool — they're biodegradable and easier on the planet.",
  },
  {
    emoji: "🧵",
    title: "Learn to Mend",
    desc: "Sewing a button or patching a tear extends the life of clothing by years. It's a superpower!",
  },
  {
    emoji: "📦",
    title: "Sell or Donate",
    desc: "Clothes you don't wear? List them online or donate to a local charity. Give them a second life.",
  },
];

export function FashionForChange() {
  const [thriftChallenge, setThriftChallenge] = useState({
    item: "",
    where: "",
    cost: "",
  });
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-pink-gp font-bold">
        Fashion for Change 👗
      </h3>
      <p className="text-muted-foreground">
        Style AND sustainability — because looking good and caring for the
        planet aren't opposites! 🌍
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SUSTAINABLE_TIPS.map((tip, i) => (
          <Card
            key={tip.title}
            className="bg-pink-light-gp border-none"
            data-ocid={`fashion.item.${i + 1}`}
          >
            <CardContent className="p-4">
              <div className="text-2xl mb-2">{tip.emoji}</div>
              <p className="font-display font-bold text-sm text-pink-gp">
                {tip.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{tip.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-2 border-pink-gp">
        <CardContent className="p-4">
          <h4 className="font-display font-bold text-pink-gp mb-3">
            🛍️ Thrift Challenge Log
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            Record your next thrift store find!
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["What did you find?", "item", "e.g. vintage jacket"],
              ["Where from?", "where", "e.g. Goodwill"],
              ["How much?", "cost", "e.g. $3.50"],
            ].map(([label, key, ph]) => (
              <div key={key}>
                <p className="text-xs font-bold text-muted-foreground block mb-1">
                  {label}
                </p>
                <Input
                  placeholder={ph}
                  value={thriftChallenge[key as keyof typeof thriftChallenge]}
                  onChange={(e) =>
                    setThriftChallenge((p) => ({ ...p, [key]: e.target.value }))
                  }
                  className="text-sm"
                  data-ocid="fashion.input"
                />
              </div>
            ))}
          </div>
          <Button
            className="bg-pink-gp text-white rounded-full mt-3 px-6"
            onClick={() => setSaved(true)}
            disabled={!thriftChallenge.item.trim()}
            data-ocid="fashion.submit_button"
          >
            Log My Find! 🎉
          </Button>
          {saved && thriftChallenge.item && (
            <Card className="mt-3 bg-pink-light-gp border-none">
              <CardContent className="p-3 text-sm">
                <strong>🛍️ Found:</strong> {thriftChallenge.item}{" "}
                {thriftChallenge.where && `at ${thriftChallenge.where}`}{" "}
                {thriftChallenge.cost && `for ${thriftChallenge.cost}`} —
                Amazing sustainable choice! 🌍
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ===== ART JOURNAL EMPOWERMENT =====
export function ArtJournalEmpowerment() {
  const STORAGE_KEY = "empowerment-art-journal";
  const [entries, setEntries] = useState<
    { prompt: string; response: string; date: string }[]
  >(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [activePrompt, setActivePrompt] = useState(0);
  const [response, setResponse] = useState("");

  const CHANGE_PROMPTS = [
    "Draw or describe what the world looks like when every girl has the same opportunities as every boy.",
    "If you could fix ONE problem in your school or neighborhood, what would it be and how?",
    "What does kindness look like in your community? How could you create more of it?",
    "Draw your future self at 25. What are you doing? How did you get there?",
    "What issue do you feel passionate enough to stand up for? How would you start?",
    "If you could write one law to make the world fairer, what would it say?",
    "What does 'girl power' mean to you in your own words?",
    "Who is someone making the world better right now? What can you learn from them?",
  ];

  const save = () => {
    if (!response.trim()) return;
    const entry = {
      prompt: CHANGE_PROMPTS[activePrompt],
      response: response.trim(),
      date: new Date().toLocaleDateString(),
    };
    const updated = [entry, ...entries].slice(0, 10);
    setEntries(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setResponse("");
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-coral-gp font-bold">
        Change the World Journal 🌍
      </h3>
      <p className="text-muted-foreground">
        Use this space to dream, plan, and imagine the world you want to help
        create!
      </p>
      <div className="flex flex-wrap gap-2">
        {CHANGE_PROMPTS.map((prompt, i) => (
          <Button
            key={prompt.slice(0, 20)}
            size="sm"
            variant={activePrompt === i ? "default" : "outline"}
            className={`rounded-full text-xs ${activePrompt === i ? "bg-coral-gp text-white" : "border-coral-gp text-coral-gp"}`}
            onClick={() => {
              setActivePrompt(i);
              setResponse("");
            }}
            data-ocid="changeworld.tab"
          >
            Prompt {i + 1}
          </Button>
        ))}
      </div>
      <Card className="bg-coral-light-gp border-none">
        <CardContent className="p-4 text-sm italic font-bold text-coral-gp">
          "{CHANGE_PROMPTS[activePrompt]}"
        </CardContent>
      </Card>
      <Textarea
        placeholder="Write, draw (with words!), or plan here..."
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        rows={5}
        className="resize-none border-coral-gp/30 focus:border-coral-gp"
        data-ocid="changeworld.textarea"
      />
      <Button
        onClick={save}
        disabled={!response.trim()}
        className="bg-coral-gp text-white rounded-full self-start px-8"
        data-ocid="changeworld.submit_button"
      >
        Save My Thoughts 💖
      </Button>
      {entries.length > 0 && (
        <div className="flex flex-col gap-2">
          <h4 className="font-display font-bold text-muted-foreground text-sm uppercase tracking-wider">
            My Change Journal
          </h4>
          {entries.map((e, i) => (
            <Card
              key={`${e.date}-${i}`}
              className="border-2 border-coral-light-gp"
              data-ocid={`changeworld.item.${i + 1}`}
            >
              <CardContent className="p-4">
                <p className="text-xs text-coral-gp font-bold italic mb-1">
                  "{e.prompt.slice(0, 60)}..."
                </p>
                <p className="text-sm leading-relaxed">{e.response}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== IDEA BOX =====
interface Idea {
  id: number;
  title: string;
  description: string;
  timestamp: string;
}

export function IdeaBox() {
  const [ideaTitle, setIdeaTitle] = useState("");
  const [ideaDesc, setIdeaDesc] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([
    {
      id: 1,
      title: "A kindness wall at school",
      description:
        "A bulletin board where students can post anonymous compliments about each other! It would make everyone feel seen and appreciated.",
      timestamp: "March 1, 2026",
    },
    {
      id: 2,
      title: "A pet shelter reading program",
      description:
        "Kids read aloud to shelter animals — it calms the animals and helps kids practice reading! A win-win for everyone.",
      timestamp: "February 28, 2026",
    },
  ]);

  const handleSubmit = () => {
    if (!ideaTitle.trim() || !ideaDesc.trim()) return;
    const newIdea: Idea = {
      id: Date.now(),
      title: ideaTitle.trim(),
      description: ideaDesc.trim(),
      timestamp: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
    setIdeas((prev) => [newIdea, ...prev]);
    setIdeaTitle("");
    setIdeaDesc("");
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-purple-gp font-bold">
        Idea Box 💡
      </h3>
      <p className="text-muted-foreground">
        Got a big idea to make the world better? Share it here! Every great
        change started with one brave idea.
      </p>

      <Card className="bg-purple-light-gp border-none">
        <CardContent className="p-5 flex flex-col gap-3">
          <h4 className="font-display font-bold text-purple-gp">
            ✨ Submit Your Big Idea
          </h4>
          <Input
            placeholder="What's your idea called? 💡"
            value={ideaTitle}
            onChange={(e) => setIdeaTitle(e.target.value)}
            className="bg-background border-purple-gp/30 focus:border-purple-gp"
            data-ocid="ideabox.input"
          />
          <Textarea
            placeholder="Tell us more about your idea! What problem does it solve? How would it work? 🌟"
            value={ideaDesc}
            onChange={(e) => setIdeaDesc(e.target.value)}
            className="bg-background border-purple-gp/30 focus:border-purple-gp min-h-[100px]"
            data-ocid="ideabox.textarea"
          />
          <Button
            className="bg-purple-gp text-white rounded-full font-bold self-start"
            onClick={handleSubmit}
            disabled={!ideaTitle.trim() || !ideaDesc.trim()}
            data-ocid="ideabox.submit_button"
          >
            Submit My Idea 💡
          </Button>
        </CardContent>
      </Card>

      <div>
        <h4 className="font-display font-bold text-purple-gp mb-3">
          💜 Ideas from Girls Like You
        </h4>
        {ideas.length === 0 ? (
          <div
            className="text-center py-8 text-muted-foreground"
            data-ocid="ideabox.empty_state"
          >
            No ideas yet! Be the first to share yours 💡
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {ideas.map((idea, i) => (
              <Card
                key={idea.id}
                className="border-2 border-purple-gp/20 hover:border-purple-gp transition-colors"
                data-ocid={`ideabox.item.${i + 1}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-display font-bold text-foreground">
                        💡 {idea.title}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {idea.description}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs shrink-0 border-purple-gp text-purple-gp"
                    >
                      {idea.timestamp}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
