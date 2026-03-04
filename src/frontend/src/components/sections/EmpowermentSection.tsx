import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

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
