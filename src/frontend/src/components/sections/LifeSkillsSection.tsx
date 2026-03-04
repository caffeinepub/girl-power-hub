import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  useAddGoal,
  useCompleteGoal,
  useGetAllGoals,
} from "@/hooks/useQueries";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ===== MIDDLE SCHOOL SURVIVAL GUIDE =====
const SURVIVAL_TIPS: Record<string, string[]> = {
  "🔒 Lockers": [
    "Practice your combination before the first day",
    "Decorate it! It's your tiny personal space",
    "Keep it organized — a mini shelf is a game changer",
    "Don't share your combo with anyone (even besties)",
    "Keep a backup of your combo somewhere safe at home",
  ],
  "👯 Friendships": [
    "Quality over quantity — a few true friends > a huge fake group",
    "It's normal for friendships to change as you grow",
    "Sit next to someone new at lunch sometimes — be brave!",
    "Clubs and activities are the best way to find your people",
    "If drama happens, give it 24 hours before reacting",
  ],
  "📚 Classes": [
    "Write everything down — don't rely on your memory",
    "Sit near the front if you want to focus better",
    "Ask questions! Teachers LOVE engaged students",
    "Don't leave projects until the night before",
    "Color-code your notes by subject",
  ],
  "💪 Confidence": [
    "Walk with your head up — it genuinely changes how you feel",
    "Fake it till you make it — everyone is more nervous than they look",
    "Do one scary thing each week to build bravery muscles",
    "What other people think about you is none of your business",
    "Your 'awkward phase' is temporary. Your character is forever.",
  ],
};

export function MiddleSchoolGuide() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-purple-gp font-bold">
        Middle School Survival Guide 🏫
      </h3>
      <p className="text-muted-foreground">
        Everything they don't tell you before middle school!
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {Object.entries(SURVIVAL_TIPS).map(([section, tips]) => (
          <Card
            key={section}
            className={`cursor-pointer border-2 card-hover ${activeSection === section ? "border-purple-gp bg-purple-light-gp" : "border-border hover:border-purple-gp"}`}
            onClick={() =>
              setActiveSection(activeSection === section ? null : section)
            }
            data-ocid={`middle.item.${Object.keys(SURVIVAL_TIPS).indexOf(section) + 1}`}
          >
            <CardContent className="p-4">
              <h4 className="font-display font-bold">{section}</h4>
              {activeSection === section && (
                <ul className="mt-3 space-y-1">
                  {tips.map((tip) => (
                    <li key={tip} className="text-sm flex gap-2">
                      <span className="text-purple-gp font-bold">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ===== GOAL SETTING =====
export function GoalSetting() {
  const [newGoal, setNewGoal] = useState("");
  const { data: goals = [], isLoading } = useGetAllGoals();
  const addGoal = useAddGoal();
  const completeGoal = useCompleteGoal();

  const handleAdd = async () => {
    if (!newGoal.trim()) {
      toast.error("Type a goal first!");
      return;
    }
    await addGoal.mutateAsync(newGoal.trim());
    setNewGoal("");
    toast.success("Goal added! You've got this! 🎯");
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-yellow-gp font-bold">
        Goal Setting 🎯
      </h3>
      <div className="flex gap-2">
        <Input
          placeholder="Add a new goal (e.g. Read 10 books this year)"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          className="rounded-full border-yellow-gp focus:border-yellow-gp"
          data-ocid="goals.input"
        />
        <Button
          onClick={handleAdd}
          disabled={addGoal.isPending}
          className="bg-yellow-gp text-foreground rounded-full shrink-0 font-bold"
          data-ocid="goals.submit_button"
        >
          Add 🎯
        </Button>
      </div>

      {isLoading ? (
        <div
          className="text-center text-muted-foreground py-4"
          data-ocid="goals.loading_state"
        >
          Loading goals... ✨
        </div>
      ) : goals.length === 0 ? (
        <div
          className="text-center py-8 text-muted-foreground bg-muted rounded-xl"
          data-ocid="goals.empty_state"
        >
          <div className="text-4xl mb-2">🎯</div>
          <p className="font-display font-bold">
            No goals yet! What do you want to achieve?
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {goals.map((goal, i) => (
            <div
              key={goal.goal + String(i)}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-colors ${goal.completed ? "border-teal-gp bg-teal-light-gp" : "border-border hover:border-yellow-gp"}`}
              data-ocid={`goals.item.${i + 1}`}
            >
              <Checkbox
                checked={goal.completed}
                className="border-yellow-gp data-[state=checked]:bg-teal-gp shrink-0"
                onCheckedChange={() =>
                  !goal.completed && completeGoal.mutate(BigInt(i))
                }
                data-ocid={`goals.checkbox.${i + 1}`}
              />
              <span
                className={`flex-1 text-sm ${goal.completed ? "line-through text-muted-foreground" : ""}`}
              >
                {goal.goal}
              </span>
              {goal.completed && (
                <Badge className="bg-teal-gp text-white text-xs">
                  Done! ✅
                </Badge>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== PUBLIC SPEAKING TIMER =====
export function PublicSpeakingTips() {
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [topic, setTopic] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current!);
            setTimerActive(false);
            toast.success("60 seconds! Great practice! 🎤");
            return 60;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current!);
  }, [timerActive]);

  const TOPICS = [
    "My favorite book",
    "Why school uniforms are/aren't a good idea",
    "The most interesting place I've visited",
    "What I'd do if I were principal for a day",
    "Why we should protect the environment",
  ];

  const randomTopic = () =>
    setTopic(TOPICS[Math.floor(Math.random() * TOPICS.length)]);

  const tips = [
    "💡 Make eye contact — look at different people in your audience",
    "🐢 Slow down! Nervous speakers always talk too fast",
    "💪 Stand with feet shoulder-width apart — it builds confidence",
    "✋ Use hand gestures to emphasize your points naturally",
    "🎤 Project your voice — speak to the person in the back of the room",
    "😌 Pause before starting and breathe — it makes you look confident",
    "📝 Know your first sentence perfectly — it sets the tone",
    "🌟 Remember: the audience WANTS you to succeed!",
  ];

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-coral-gp font-bold">
        Public Speaking Tips 🎤
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {tips.map((tip) => (
          <div
            key={tip}
            className="text-sm p-3 rounded-lg bg-coral-light-gp border border-border"
          >
            {tip}
          </div>
        ))}
      </div>
      <Card className="border-2 border-coral-gp">
        <CardContent className="p-5">
          <h4 className="font-display font-bold text-coral-gp mb-3">
            60-Second Speech Practice 🏆
          </h4>
          <div className="flex gap-2 mb-3">
            <Input
              placeholder="Enter your topic or..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="rounded-full border-coral-gp"
              data-ocid="speaking.input"
            />
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-coral-gp text-coral-gp shrink-0"
              onClick={randomTopic}
              data-ocid="speaking.secondary_button"
            >
              Random Topic
            </Button>
          </div>
          <div className="text-center">
            <div
              className={`text-6xl font-display font-bold mb-4 ${timeLeft <= 10 ? "text-destructive" : "text-coral-gp"}`}
            >
              {timeLeft}s
            </div>
            {!timerActive ? (
              <Button
                onClick={() => setTimerActive(true)}
                disabled={!topic}
                className="bg-coral-gp text-white rounded-full px-8"
                data-ocid="speaking.primary_button"
              >
                Start Speaking! 🎤
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setTimerActive(false);
                  setTimeLeft(60);
                }}
                variant="outline"
                className="rounded-full border-coral-gp text-coral-gp"
                data-ocid="speaking.toggle"
              >
                Stop
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ===== INDOOR PARTY IDEAS =====
const PARTY_GAMES = [
  {
    name: "Freeze Dance 💃",
    howTo:
      "Play music and dance! When it stops, freeze. Last one moving is out. Add silly dance challenges each round!",
  },
  {
    name: "DIY Photo Booth 📸",
    howTo:
      "Set up props (hats, glasses, boas), hang a fun background, take tons of silly photos. Make a slideshow at the end!",
  },
  {
    name: "Scavenger Hunt 🔍",
    howTo:
      "Hide clues around the house leading to a prize. Divide into teams and see who solves all the clues first!",
  },
  {
    name: "Spa Station 💆‍♀️",
    howTo:
      "Set up stations: nail painting, face masks, hair braiding. Everyone rotates through and pampers each other!",
  },
  {
    name: "Movie Marathon 🎬",
    howTo:
      "Pick 2-3 favorite movies, make themed snacks for each one, build a pillow fort and snuggle in!",
  },
  {
    name: "Lip Sync Battle 🎤",
    howTo:
      "Each person picks a song and lip syncs it dramatically. Judges score on performance. The drama should be EXTREME!",
  },
  {
    name: "Craft Party 🎨",
    howTo:
      "Set up craft stations: tie-dye, jewelry making, vision boards. Everyone makes something to take home!",
  },
  {
    name: "Talent Show ⭐",
    howTo:
      "Each guest performs a talent — singing, dancing, comedy, magic tricks. Vote for your favorites!",
  },
  {
    name: "Baking Challenge 🍰",
    howTo:
      "Everyone decorates a cupcake or cookie. Judge on creativity! Display them before eating.",
  },
  {
    name: "Board Game Tournament 🎲",
    howTo:
      "Set up multiple board games. Rotate through them in rounds. Keep a running score chart on the wall.",
  },
];

export function IndoorPartyIdeas() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-pink-gp font-bold">
        Indoor Party Ideas 🎉
      </h3>
      <p className="text-muted-foreground">
        Click any game to see how to play!
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PARTY_GAMES.map((game, i) => (
          <Card
            key={game.name}
            className={`cursor-pointer card-hover border-2 ${selected === i ? "border-pink-gp bg-pink-light-gp" : "border-border hover:border-pink-gp"}`}
            onClick={() => setSelected(selected === i ? null : i)}
            data-ocid={`party.item.${i + 1}`}
          >
            <CardContent className="p-4">
              <h4 className="font-display font-bold text-sm">{game.name}</h4>
              {selected === i && (
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {game.howTo}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ===== BUDGET PARTY PLANNING =====
export function BudgetPartyPlanning() {
  const [budget, setBudget] = useState("20");
  const [checked, setChecked] = useState<boolean[]>(new Array(8).fill(false));

  const tasks = [
    "Send digital invites (free using Canva or Evite)",
    "DIY decorations: print and cut-out streamers from colored paper",
    "Make your own playlist instead of hiring a DJ",
    "Bake/make food instead of ordering out",
    "Activities: games, crafts, scavenger hunt (costs almost nothing!)",
    "Dollar store for party favors — balloons, small items",
    "Make a photo slideshow on your TV for $0",
    "Set up a potluck: everyone brings one dish!",
  ];

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-yellow-gp font-bold">
        Budget Party Planning 💰
      </h3>
      <div className="flex items-center gap-3">
        <label
          htmlFor="budget-input"
          className="text-sm font-bold text-muted-foreground shrink-0"
        >
          My budget: $
        </label>
        <Input
          id="budget-input"
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-24 rounded-full border-yellow-gp"
          data-ocid="budget.input"
        />
      </div>
      <Card className="bg-yellow-light-gp border-none">
        <CardContent className="p-4">
          <p className="font-bold text-yellow-gp mb-2">
            With ${budget}, here's what to prioritize:
          </p>
          <p className="text-sm">
            Food (40%): ${Math.round(Number(budget) * 0.4)} • Decorations (30%):
            ${Math.round(Number(budget) * 0.3)} • Activities (20%): $
            {Math.round(Number(budget) * 0.2)} • Favors (10%): $
            {Math.round(Number(budget) * 0.1)}
          </p>
        </CardContent>
      </Card>
      <h4 className="font-display font-bold text-sm text-muted-foreground uppercase tracking-wider">
        Budget Tips Checklist ✅
      </h4>
      {tasks.map((task, i) => (
        <button
          key={task}
          type="button"
          className="flex items-center gap-2 cursor-pointer text-left w-full bg-transparent border-0 p-0"
          onClick={() =>
            setChecked((prev) => {
              const n = [...prev];
              n[i] = !n[i];
              return n;
            })
          }
          data-ocid={`budget.checkbox.${i + 1}`}
        >
          <Checkbox
            checked={checked[i]}
            className="border-yellow-gp data-[state=checked]:bg-yellow-gp"
          />
          <span
            className={`text-sm ${checked[i] ? "line-through text-muted-foreground" : ""}`}
          >
            {task}
          </span>
        </button>
      ))}
    </div>
  );
}

// ===== HOW TO DISAGREE RESPECTFULLY =====
const DISAGREE_SCENARIOS = [
  {
    situation: "Your friend says pineapple DOES belong on pizza. You disagree!",
    goodResponse:
      "I see it differently! For me, the sweetness doesn't work with pizza. But I get why you love it — to each their own! 🍕",
    badResponse: "That's disgusting! How can you possibly like that?!",
  },
  {
    situation: "Someone at school says a movie you love is terrible.",
    goodResponse:
      "That's fair! I understand why it's not for everyone. What bugged you about it? I'm curious.",
    badResponse: "You have no taste. That movie is objectively amazing.",
  },
];

export function DisagreeRespectfully() {
  const tips = [
    "Use 'I statements': 'I see it differently' not 'You're wrong'",
    "Ask questions before arguing: 'Can you help me understand why you think that?'",
    "Find common ground first: 'I agree with you on X, but I see Y differently'",
    "It's okay to agree to disagree — not every argument needs a winner",
    "Tone matters more than words — stay calm even when frustrated",
    "Give them a moment to finish speaking before you respond",
    "Take a breath if you're getting heated — it's okay to pause",
    "Respect doesn't mean agreement — you can disagree and still be kind",
  ];

  const [picked, setPicked] = useState<(string | null)[]>(
    new Array(DISAGREE_SCENARIOS.length).fill(null),
  );

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-teal-gp font-bold">
        How to Disagree Respectfully 🤝
      </h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {tips.map((tip) => (
          <div
            key={tip}
            className="text-sm p-3 rounded-lg bg-teal-light-gp border border-teal-gp"
          >
            {tip}
          </div>
        ))}
      </div>
      <h4 className="font-display font-bold text-muted-foreground text-sm uppercase tracking-wider">
        Practice Scenarios
      </h4>
      {DISAGREE_SCENARIOS.map((sc, si) => (
        <Card
          key={sc.situation.slice(0, 30)}
          className="border-2 border-teal-light-gp"
        >
          <CardContent className="p-4">
            <p className="font-display font-bold text-sm mb-3">
              {sc.situation}
            </p>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className={`justify-start text-left h-auto py-2 px-3 whitespace-normal font-normal ${picked[si] === "good" ? "border-teal-gp bg-teal-light-gp" : ""}`}
                onClick={() =>
                  setPicked((prev) => {
                    const n = [...prev];
                    n[si] = "good";
                    return n;
                  })
                }
                data-ocid={`disagree.button.${si + 1}`}
              >
                🟢 "{sc.goodResponse}"
              </Button>
              <Button
                variant="outline"
                className={`justify-start text-left h-auto py-2 px-3 whitespace-normal font-normal ${picked[si] === "bad" ? "border-destructive bg-red-50" : ""}`}
                onClick={() =>
                  setPicked((prev) => {
                    const n = [...prev];
                    n[si] = "bad";
                    return n;
                  })
                }
              >
                🔴 "{sc.badResponse}"
              </Button>
            </div>
            {picked[si] && (
              <p
                className={`mt-2 text-sm font-bold p-2 rounded-lg ${picked[si] === "good" ? "bg-teal-light-gp text-teal-gp" : "bg-red-50 text-destructive"}`}
              >
                {picked[si] === "good"
                  ? "✅ Perfect! Kind, respectful, and still honest."
                  : "💡 Try again — this would likely make things worse."}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ===== JUMP ROPE PRO =====
const JUMP_ROPE_TRICKS = [
  {
    name: "Basic Bounce 🟢",
    level: "Beginner",
    desc: "Two-footed jump — land softly with bent knees each time the rope passes under",
  },
  {
    name: "Alternate Foot 🟡",
    level: "Beginner",
    desc: "Jog in place while jumping — left foot, right foot, left foot, right foot!",
  },
  {
    name: "Fast Feet 🟡",
    level: "Intermediate",
    desc: "Jump as fast as you can for 30 seconds — how many can you do?!",
  },
  {
    name: "Double Under 🔴",
    level: "Advanced",
    desc: "Swing the rope twice for each single jump — jump higher and swing fast!",
  },
  {
    name: "Cross Arms 🟡",
    level: "Intermediate",
    desc: "Cross your arms in front of your body on one rotation, then uncross",
  },
  {
    name: "Side Swing 🟢",
    level: "Beginner",
    desc: "Swing rope to one side without jumping, then jump — repeat on both sides",
  },
];

const JUMP_CHALLENGES = [
  "Can you jump 10 times without missing?",
  "Try 30 seconds of non-stop jumping",
  "Jump on one foot for 5 hops each side",
  "Try the alternate foot for 20 steps",
  "Jump while singing 'Ice Cream, Soda Pop'",
  "Try to beat your personal best record!",
];

export function JumpRopePro() {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(JUMP_CHALLENGES.length).fill(false),
  );

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-coral-gp font-bold">
        🪢 Jump Rope Pro
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h4 className="font-display font-bold text-coral-gp mb-3">
            Tricks to Learn
          </h4>
          <div className="flex flex-col gap-2">
            {JUMP_ROPE_TRICKS.map((trick, i) => (
              <Card
                key={trick.name}
                className="border-2 border-coral-light-gp"
                data-ocid={`jumprope.item.${i + 1}`}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-sm text-coral-gp">
                      {trick.name}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {trick.level}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{trick.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-bold text-coral-gp mb-3">
            Challenge Checklist ✅
          </h4>
          <div className="flex flex-col gap-2">
            {JUMP_CHALLENGES.map((challenge, i) => (
              <button
                key={challenge}
                type="button"
                className="flex items-center gap-2 cursor-pointer text-left w-full bg-transparent border-0 p-0"
                onClick={() =>
                  setChecked((prev) => {
                    const n = [...prev];
                    n[i] = !n[i];
                    return n;
                  })
                }
                data-ocid={`jumprope.checkbox.${i + 1}`}
              >
                <Checkbox
                  checked={checked[i]}
                  className="border-coral-gp data-[state=checked]:bg-coral-gp shrink-0"
                />
                <span
                  className={`text-sm ${checked[i] ? "line-through text-muted-foreground" : ""}`}
                >
                  {challenge}
                </span>
              </button>
            ))}
          </div>
          <Card className="mt-4 bg-coral-light-gp border-none">
            <CardContent className="p-3">
              <p className="font-bold text-coral-gp text-sm">
                🎵 Classic Jump Rope Chants
              </p>
              <ul className="text-xs mt-1 space-y-1">
                <li>• "Ice Cream, Soda Pop, Cherries on Top..."</li>
                <li>• "Teddy Bear, Teddy Bear, turn around..."</li>
                <li>• "A my name is Alice..." (letters of alphabet)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ===== LEARNING FRENCH =====
const FRENCH_PHRASES: Record<
  string,
  { french: string; phonetic: string; meaning: string }[]
> = {
  "👋 Greetings": [
    {
      french: "Bonjour",
      phonetic: "bohn-ZHOOR",
      meaning: "Hello / Good morning",
    },
    { french: "Bonsoir", phonetic: "bohn-SWAHR", meaning: "Good evening" },
    { french: "Au revoir", phonetic: "oh ruh-VWAHR", meaning: "Goodbye" },
    { french: "Merci", phonetic: "mair-SEE", meaning: "Thank you" },
    { french: "S'il vous plaît", phonetic: "seel voo PLAY", meaning: "Please" },
    {
      french: "Excusez-moi",
      phonetic: "ex-koo-zay MWAH",
      meaning: "Excuse me",
    },
  ],
  "🔢 Numbers": [
    {
      french: "Un, deux, trois",
      phonetic: "uhn, duh, TWAH",
      meaning: "One, two, three",
    },
    {
      french: "Quatre, cinq",
      phonetic: "KAT-ruh, sank",
      meaning: "Four, five",
    },
    { french: "Six, sept", phonetic: "sees, set", meaning: "Six, seven" },
    {
      french: "Huit, neuf, dix",
      phonetic: "weet, nuhf, dees",
      meaning: "Eight, nine, ten",
    },
  ],
  "🎨 Colors": [
    { french: "Rouge", phonetic: "roozh", meaning: "Red" },
    { french: "Bleu", phonetic: "bluh", meaning: "Blue" },
    { french: "Vert", phonetic: "vair", meaning: "Green" },
    { french: "Jaune", phonetic: "zhohn", meaning: "Yellow" },
    { french: "Rose", phonetic: "rohz", meaning: "Pink" },
  ],
  "🍕 Food": [
    { french: "La pizza", phonetic: "lah peet-ZAH", meaning: "Pizza" },
    { french: "Le chocolat", phonetic: "luh sho-ko-LAH", meaning: "Chocolate" },
    { french: "La glace", phonetic: "lah glass", meaning: "Ice cream" },
    { french: "Le pain", phonetic: "luh paN", meaning: "Bread" },
    { french: "J'ai faim", phonetic: "zhay FAN", meaning: "I'm hungry" },
  ],
};

export function LearningFrench() {
  const [activeCategory, setActiveCategory] = useState("👋 Greetings");
  const [selectedPhrase, setSelectedPhrase] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-purple-gp font-bold">
        🇫🇷 Learning French — Bonjour!
      </h3>
      <p className="text-muted-foreground">
        Click a phrase to hear how to pronounce it!
      </p>
      <div className="flex flex-wrap gap-2">
        {Object.keys(FRENCH_PHRASES).map((cat) => (
          <Button
            key={cat}
            size="sm"
            variant={activeCategory === cat ? "default" : "outline"}
            className={`rounded-full ${activeCategory === cat ? "bg-purple-gp text-white" : "border-purple-gp text-purple-gp"}`}
            onClick={() => {
              setActiveCategory(cat);
              setSelectedPhrase(null);
            }}
            data-ocid="french.tab"
          >
            {cat}
          </Button>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {FRENCH_PHRASES[activeCategory].map((phrase, i) => (
          <button
            key={phrase.french}
            type="button"
            className={`p-3 rounded-xl border-2 cursor-pointer transition-all text-left w-full ${selectedPhrase === phrase.french ? "bg-purple-light-gp border-purple-gp" : "border-border hover:border-purple-gp"}`}
            onClick={() =>
              setSelectedPhrase(
                selectedPhrase === phrase.french ? null : phrase.french,
              )
            }
            data-ocid={`french.item.${i + 1}`}
          >
            <p className="font-display font-bold text-purple-gp">
              {phrase.french}
            </p>
            <p className="text-xs text-muted-foreground">{phrase.meaning}</p>
            {selectedPhrase === phrase.french && (
              <div className="mt-2 bg-white rounded-lg p-2 border border-purple-gp">
                <p className="text-xs font-bold text-purple-gp">
                  🔊 Say it like:
                </p>
                <p className="text-sm font-display italic text-foreground">
                  "{phrase.phonetic}"
                </p>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ===== LEARNING UKULELE =====
const UKULELE_CHORDS: Record<string, { fingers: string[]; tip: string }> = {
  C: {
    fingers: [
      "Strings: G-C-E-A (thinnest at bottom)",
      "Ring finger on A string, 3rd fret",
      "All other strings: open (no fingers)",
      "Strum all 4 strings downward",
    ],
    tip: "This is the easiest chord! Just one finger.",
  },
  Am: {
    fingers: [
      "Middle finger on G string, 2nd fret",
      "All other strings: open",
      "Strum all 4 strings",
    ],
    tip: "Am sounds sad and beautiful. Learn this for ballads!",
  },
  F: {
    fingers: [
      "Index finger on E string, 1st fret",
      "Middle finger on G string, 2nd fret",
      "Strum all 4 strings",
    ],
    tip: "F + C + Am + G = thousands of songs you know!",
  },
  G: {
    fingers: [
      "Index finger on C string, 2nd fret",
      "Middle finger on A string, 2nd fret",
      "Ring finger on E string, 3rd fret",
      "Strum all 4 strings",
    ],
    tip: "G needs 3 fingers — practice moving between C and G slowly.",
  },
};

export function LearningUkulele() {
  const [selectedChord, setSelectedChord] = useState("C");
  const songs = [
    { title: "You Are My Sunshine", chords: "C - F - C - G" },
    { title: "Somewhere Over the Rainbow", chords: "C - Am - F - G" },
    { title: "Happy Birthday", chords: "C - G - C - F" },
    { title: "Riptide (simplified)", chords: "Am - G - C (repeat!)" },
  ];

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-yellow-gp font-bold">
        🎸 Learning Ukulele
      </h3>
      <p className="text-muted-foreground">
        Ukulele has only 4 strings — it's the perfect beginner instrument!
        Master these 4 chords and you can play hundreds of songs.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h4 className="font-display font-bold text-yellow-gp mb-3">
            Beginner Chords
          </h4>
          <div className="flex gap-2 mb-3">
            {Object.keys(UKULELE_CHORDS).map((chord) => (
              <Button
                key={chord}
                size="sm"
                variant={selectedChord === chord ? "default" : "outline"}
                className={`rounded-full font-display font-bold ${selectedChord === chord ? "bg-yellow-gp text-foreground" : "border-yellow-gp text-yellow-gp"}`}
                onClick={() => setSelectedChord(chord)}
                data-ocid="ukulele.tab"
              >
                {chord}
              </Button>
            ))}
          </div>
          <Card
            className="bg-yellow-light-gp border-2 border-yellow-gp"
            data-ocid="ukulele.panel"
          >
            <CardContent className="p-4">
              <p className="font-display text-2xl font-bold text-yellow-gp mb-3">
                Chord: {selectedChord}
              </p>
              <div className="flex flex-col gap-1 mb-3">
                {UKULELE_CHORDS[selectedChord].fingers.map((line) => (
                  <div key={line} className="flex gap-2 text-sm">
                    <span className="text-yellow-gp font-bold">•</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg p-2 border border-yellow-gp text-xs text-yellow-gp font-bold">
                💡 {UKULELE_CHORDS[selectedChord].tip}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <h4 className="font-display font-bold text-yellow-gp mb-3">
            Beginner Songs 🎵
          </h4>
          <div className="flex flex-col gap-2">
            {songs.map((song, i) => (
              <Card
                key={song.title}
                className="border-2 border-yellow-light-gp"
                data-ocid={`ukulele.item.${i + 1}`}
              >
                <CardContent className="p-3">
                  <p className="font-display font-bold text-sm text-yellow-gp">
                    {song.title}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">
                    {song.chords}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="mt-3 bg-yellow-light-gp border-none">
            <CardContent className="p-3">
              <p className="font-bold text-yellow-gp text-sm">
                🎯 Practice Tips
              </p>
              <ul className="text-xs mt-1 space-y-1">
                <li>
                  • Practice 10-15 minutes daily — consistency beats long
                  sessions
                </li>
                <li>• Learn chord transitions first, then add strumming</li>
                <li>
                  • Your fingertips will get sore at first — that's normal! Keep
                  going!
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ===== HELPING ANIMALS =====
export function HelpingAnimals() {
  const [checked, setChecked] = useState<boolean[]>(new Array(6).fill(false));
  const blanketSteps = [
    "Buy 1.5 yards each of two different fleece fabrics",
    "Lay both pieces on top of each other, right sides facing out",
    "Cut a 4-inch square from each corner",
    "Cut fringe strips around all 4 edges: 4 inches long, 1 inch wide",
    "Tie each pair of fringe strips (one from each layer) with a double knot",
    "Continue all the way around until the blanket is tied — no sewing needed!",
    "Deliver to your local animal shelter with a note of love!",
  ];

  const donationIdeas = [
    "Old towels and blankets (clean!)",
    "Unopened pet food cans",
    "Pet toys (new or gently used)",
    "Cat litter",
    "Collars, leashes, carriers",
    "Monetary donations for vet care",
  ];

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-teal-gp font-bold">
        🐾 Helping Animals
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h4 className="font-display font-bold text-teal-gp mb-3">
            No-Sew Fleece Blanket 🧶
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            Make cozy blankets for shelter animals — no sewing machine needed!
          </p>
          <div className="flex flex-col gap-2">
            {blanketSteps.map((step, i) => (
              <div key={step} className="flex gap-2 text-sm">
                <div className="w-6 h-6 rounded-full bg-teal-gp text-white text-xs flex items-center justify-center shrink-0 font-bold">
                  {i + 1}
                </div>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-bold text-teal-gp mb-3">
            More Ways to Help 💖
          </h4>
          <Card className="bg-teal-light-gp border-none mb-3">
            <CardContent className="p-4">
              <p className="font-bold text-teal-gp mb-2">
                Donation Drive Ideas
              </p>
              <div className="flex flex-col gap-1">
                {donationIdeas.map((item, i) => (
                  <button
                    key={item}
                    type="button"
                    className="flex items-center gap-2 cursor-pointer text-left w-full bg-transparent border-0 p-0"
                    onClick={() =>
                      setChecked((prev) => {
                        const n = [...prev];
                        n[i] = !n[i];
                        return n;
                      })
                    }
                    data-ocid={`animals.checkbox.${i + 1}`}
                  >
                    <Checkbox
                      checked={checked[i]}
                      className="border-teal-gp data-[state=checked]:bg-teal-gp shrink-0"
                    />
                    <span
                      className={`text-sm ${checked[i] ? "line-through text-muted-foreground" : ""}`}
                    >
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-teal-gp">
            <CardContent className="p-4">
              <p className="font-bold text-teal-gp mb-2">🌟 Volunteer Ideas</p>
              <ul className="text-sm space-y-1">
                <li>• Walk dogs at the shelter (with an adult!)</li>
                <li>• Socialize cats — just sit and read to them!</li>
                <li>• Foster animals temporarily in your home</li>
                <li>• Fundraise with a bake sale for the shelter</li>
                <li>• Share adoption posts on social media</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ===== FRIENDSHIP FIXERS =====
const FRIENDSHIP_SCENARIOS = [
  {
    situation:
      "Your best friend is feeling really sad and crying at school. What do you do?",
    options: [
      {
        text: "Give them space and pretend you didn't notice",
        isGood: false,
        feedback:
          "Sometimes people need a gentle nudge to know someone cares. Noticing matters!",
      },
      {
        text: "Sit next to them, say 'Hey, I'm here if you want to talk' and just be present",
        isGood: true,
        feedback:
          "Perfect! Just being present without pressure is one of the kindest things you can do. 💖",
      },
      {
        text: "Tell everyone else that your friend is upset",
        isGood: false,
        feedback:
          "That breaks trust. Your friend's feelings are private — protect them!",
      },
    ],
  },
  {
    situation:
      "You hear a rumor about a friend that might not be true. A classmate wants you to share it.",
    options: [
      {
        text: "Share it because everyone will find out anyway",
        isGood: false,
        feedback:
          "Spreading unverified information can hurt someone deeply. Check first!",
      },
      {
        text: "Say 'I don't know if that's true, and I don't think it's right to share it without knowing'",
        isGood: true,
        feedback:
          "This is integrity in action! You're the kind of friend people are lucky to have. ⭐",
      },
      {
        text: "Ask your friend directly if it's true before saying anything to anyone",
        isGood: true,
        feedback:
          "Going directly to the source shows respect and real friendship! 🌟",
      },
    ],
  },
  {
    situation:
      "Your friend group wants to leave someone out of a party because they 'don't fit in.' What do you do?",
    options: [
      {
        text: "Go along with it — you don't want drama",
        isGood: false,
        feedback:
          "Staying silent is a choice too. And the person left out feels it deeply.",
      },
      {
        text: "Invite the person yourself and tell your group 'Everyone deserves to feel included'",
        isGood: true,
        feedback:
          "That takes courage and compassion. You're not just a friend — you're a leader. 👑",
      },
      {
        text: "Tell the excluded person privately so they don't feel blindsided",
        isGood: true,
        feedback:
          "Giving someone a heads-up is kind! But inviting them anyway is even better.",
      },
    ],
  },
];

export function FriendshipFixers() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(FRIENDSHIP_SCENARIOS.length).fill(null),
  );

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-pink-gp font-bold">
        Friendship Fixers 👭
      </h3>
      <p className="text-muted-foreground">
        Great friendships take practice! Work through these real-life scenarios
        and discover the kindest, bravest responses.
      </p>

      {FRIENDSHIP_SCENARIOS.map((sc, si) => (
        <Card
          key={sc.situation.slice(0, 30)}
          className="border-2 border-pink-gp/20"
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
                data-ocid={`friendship.item.${si + 1}`}
              >
                {opt.text}
              </Button>
            ))}
            {answers[si] !== null && (
              <div
                className={`mt-2 p-3 rounded-lg text-sm font-bold ${sc.options[answers[si]!].isGood ? "bg-teal-light-gp text-teal-gp" : "bg-red-50 text-destructive"}`}
              >
                {sc.options[answers[si]!].isGood ? "💖 " : "💡 "}
                {sc.options[answers[si]!].feedback}
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <Card className="bg-pink-light-gp border-none">
        <CardContent className="p-4">
          <h4 className="font-display font-bold text-pink-gp mb-2">
            💝 Friendship Superpowers
          </h4>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              {
                emoji: "👂",
                skill:
                  "Really listen — put your phone away when a friend talks",
              },
              {
                emoji: "🤐",
                skill:
                  "Keep secrets safe — never share what was told in confidence",
              },
              {
                emoji: "🌟",
                skill:
                  "Celebrate their wins even when you're having a hard day",
              },
              {
                emoji: "💬",
                skill:
                  "Say sorry and mean it — and accept apologies gracefully",
              },
            ].map((s) => (
              <div key={s.skill} className="flex gap-2 text-sm">
                <span className="text-xl">{s.emoji}</span>
                <span>{s.skill}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ===== CODING COOLNESS =====
const CODING_PUZZLES = [
  {
    title: "Make a Sandwich 🥪",
    desc: "Put the steps in order to make a peanut butter sandwich!",
    steps: [
      { id: "a", emoji: "🍞", label: "Get 2 slices of bread" },
      { id: "b", emoji: "🥜", label: "Spread peanut butter on one slice" },
      { id: "c", emoji: "🍯", label: "Add jelly on the other slice" },
      { id: "d", emoji: "🤝", label: "Press the slices together" },
      { id: "e", emoji: "🍽️", label: "Put on a plate and enjoy!" },
    ],
    correctOrder: ["a", "b", "c", "d", "e"],
  },
  {
    title: "Morning Routine 🌅",
    desc: "Arrange the morning steps in the right order!",
    steps: [
      { id: "a", emoji: "⏰", label: "Wake up when the alarm goes off" },
      { id: "b", emoji: "🚿", label: "Take a shower" },
      { id: "c", emoji: "👗", label: "Get dressed" },
      { id: "d", emoji: "🥣", label: "Eat breakfast" },
      { id: "e", emoji: "🎒", label: "Grab your backpack and go!" },
    ],
    correctOrder: ["a", "b", "c", "d", "e"],
  },
  {
    title: "Plant a Flower 🌸",
    desc: "Code the correct steps to grow a flower!",
    steps: [
      { id: "a", emoji: "🪣", label: "Fill pot with soil" },
      { id: "b", emoji: "🌱", label: "Press a seed into the soil" },
      { id: "c", emoji: "💧", label: "Water the seed" },
      { id: "d", emoji: "☀️", label: "Put in sunlight" },
      { id: "e", emoji: "🌸", label: "Watch it grow and bloom!" },
    ],
    correctOrder: ["a", "b", "c", "d", "e"],
  },
];

export function CodingCoolness() {
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [order, setOrder] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [solved, setSolved] = useState<boolean[]>(
    new Array(CODING_PUZZLES.length).fill(false),
  );

  const puzzle = CODING_PUZZLES[puzzleIdx];
  const remaining = puzzle.steps.filter((s) => !order.includes(s.id));

  const _handleStepClick = (id: string) => {
    if (selected === id) {
      setSelected(null);
    } else if (selected === null) {
      setSelected(id);
    } else {
      // swap in order if both are already in order list
      const selInOrder = order.includes(selected);
      const idInOrder = order.includes(id);
      if (selInOrder && idInOrder) {
        const newOrder = [...order];
        const si = newOrder.indexOf(selected);
        const ii = newOrder.indexOf(id);
        [newOrder[si], newOrder[ii]] = [newOrder[ii], newOrder[si]];
        setOrder(newOrder);
      }
      setSelected(null);
    }
  };

  const addToOrder = (id: string) => {
    const newOrder = [...order, id];
    setOrder(newOrder);
    setSelected(null);
    if (newOrder.length === puzzle.steps.length) {
      const correct = newOrder.every(
        (stepId, i) => stepId === puzzle.correctOrder[i],
      );
      if (correct) {
        setSolved((prev) => {
          const n = [...prev];
          n[puzzleIdx] = true;
          return n;
        });
      }
    }
  };

  const removeFromOrder = (id: string) => {
    setOrder(order.filter((s) => s !== id));
  };

  const resetPuzzle = () => {
    setOrder([]);
    setSelected(null);
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-teal-gp font-bold">
        Coding Coolness 💻
      </h3>
      <p className="text-muted-foreground">
        Coding is all about giving computers the RIGHT instructions in the RIGHT
        ORDER. Try arranging these steps to run the program!
      </p>

      <div className="flex gap-2 flex-wrap">
        {CODING_PUZZLES.map((p, i) => (
          <Button
            key={p.title}
            size="sm"
            variant={puzzleIdx === i ? "default" : "outline"}
            className={`rounded-full text-xs ${puzzleIdx === i ? "bg-teal-gp text-white" : "border-teal-gp text-teal-gp"}`}
            onClick={() => {
              setPuzzleIdx(i);
              resetPuzzle();
            }}
            data-ocid={"coding.tab"}
          >
            {solved[i] ? "✅ " : ""}
            {p.title}
          </Button>
        ))}
      </div>

      <Card className="border-2 border-teal-gp/30">
        <CardContent className="p-5">
          <h4 className="font-display font-bold text-teal-gp mb-1">
            {puzzle.title}
          </h4>
          <p className="text-sm text-muted-foreground mb-4">{puzzle.desc}</p>

          {/* Your Program Area */}
          <div className="mb-4">
            <p className="text-xs font-bold text-teal-gp uppercase tracking-wider mb-2">
              Your Program (click to remove):
            </p>
            <div className="min-h-[80px] bg-teal-light-gp rounded-xl p-3 flex flex-col gap-2">
              {order.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">
                  Pick steps from below to build your program! 👇
                </p>
              ) : (
                order.map((id, i) => {
                  const step = puzzle.steps.find((s) => s.id === id)!;
                  return (
                    <button
                      key={id}
                      type="button"
                      className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 text-sm shadow-sm hover:bg-red-50 transition-colors text-left w-full"
                      onClick={() => removeFromOrder(id)}
                      data-ocid={`coding.item.${i + 1}`}
                    >
                      <span className="text-teal-gp font-bold text-xs w-4">
                        {i + 1}.
                      </span>
                      <span className="text-lg">{step.emoji}</span>
                      <span>{step.label}</span>
                      <span className="ml-auto text-red-400 text-xs">
                        ✕ remove
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Available Steps */}
          {remaining.length > 0 && (
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Available Steps (click to add to program):
              </p>
              <div className="flex flex-col gap-2">
                {remaining.map((step) => (
                  <button
                    key={step.id}
                    type="button"
                    className="flex items-center gap-2 bg-card border-2 border-border rounded-lg px-3 py-2 text-sm hover:border-teal-gp transition-colors text-left w-full"
                    onClick={() => addToOrder(step.id)}
                    data-ocid={"coding.button"}
                  >
                    <span className="text-lg">{step.emoji}</span>
                    <span>{step.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          {order.length === puzzle.steps.length && (
            <div
              className={`mt-4 p-4 rounded-xl text-center font-bold ${
                solved[puzzleIdx]
                  ? "bg-teal-light-gp text-teal-gp"
                  : "bg-red-50 text-destructive"
              }`}
            >
              {solved[puzzleIdx] ? (
                <div>
                  <div className="text-3xl mb-2">🎉</div>
                  <p className="font-display text-lg">
                    You did it! Program runs perfectly! 💻✨
                  </p>
                  <p className="text-sm font-normal mt-1">
                    You just thought like a computer scientist!
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-2xl mb-2">🔄</div>
                  <p>Hmm, the order isn't quite right. Try again!</p>
                  <Button
                    size="sm"
                    className="mt-2 bg-destructive text-white rounded-full"
                    onClick={resetPuzzle}
                    data-ocid="coding.secondary_button"
                  >
                    Reset & Try Again
                  </Button>
                </div>
              )}
            </div>
          )}

          {order.length > 0 && order.length < puzzle.steps.length && (
            <Button
              size="sm"
              variant="outline"
              className="mt-3 rounded-full border-teal-gp text-teal-gp"
              onClick={resetPuzzle}
              data-ocid="coding.secondary_button"
            >
              Start Over 🔄
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="bg-teal-light-gp border-none">
        <CardContent className="p-4">
          <h4 className="font-display font-bold text-teal-gp mb-2">
            💻 Real Coding Fun Facts
          </h4>
          <ul className="text-sm space-y-1">
            <li>
              • The first computer programmer was a woman: Ada Lovelace, in the
              1840s!
            </li>
            <li>
              • Coding is just giving instructions in a language computers
              understand
            </li>
            <li>
              • If you've ever given directions to a friend, you've already
              coded!
            </li>
            <li>
              • Most apps and games are built with 3 main skills: logic,
              creativity, and patience
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
