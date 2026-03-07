import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  useAddMadLib,
  useAddTriviaScore,
  useGetAllMadLibs,
  useGetTriviaScores,
} from "@/hooks/useQueries";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ===== TRIVIA GAME =====
const TRIVIA_QUESTIONS = [
  {
    q: "What is the speed of light?",
    options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "100,000 km/s"],
    correct: 0,
    category: "Science",
  },
  {
    q: "Who was the first woman in space?",
    options: [
      "Sally Ride",
      "Valentina Tereshkova",
      "Mae Jemison",
      "Christa McAuliffe",
    ],
    correct: 1,
    category: "Girl Heroes",
  },
  {
    q: "What planet has rings around it?",
    options: ["Jupiter", "Mars", "Saturn", "Neptune"],
    correct: 2,
    category: "Science",
  },
  {
    q: "Who painted the Mona Lisa?",
    options: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Picasso"],
    correct: 2,
    category: "History",
  },
  {
    q: "Which scientist discovered radioactivity?",
    options: [
      "Rosalind Franklin",
      "Marie Curie",
      "Ada Lovelace",
      "Lise Meitner",
    ],
    correct: 1,
    category: "Girl Heroes",
  },
  {
    q: "How many continents are on Earth?",
    options: ["5", "6", "7", "8"],
    correct: 2,
    category: "Science",
  },
  {
    q: "What is 9 x 8?",
    options: ["63", "72", "81", "64"],
    correct: 1,
    category: "Fun",
  },
  {
    q: "What country invented pizza?",
    options: ["France", "USA", "Italy", "Greece"],
    correct: 2,
    category: "Fun",
  },
  {
    q: "Which animal is known as 'man's best friend'?",
    options: ["Cat", "Horse", "Dog", "Rabbit"],
    correct: 2,
    category: "Fun",
  },
  {
    q: "Malala Yousafzai won the Nobel Prize at what age?",
    options: ["16", "17", "18", "19"],
    correct: 1,
    category: "Girl Heroes",
  },
];

export function TriviaGame() {
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const addScore = useAddTriviaScore();
  const { data: leaderboard = [] } = useGetTriviaScores();

  const q = TRIVIA_QUESTIONS[qIndex];

  const handleAnswer = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (qIndex + 1 < TRIVIA_QUESTIONS.length) {
        setQIndex((qi) => qi + 1);
        setSelected(null);
      } else setFinished(true);
    }, 900);
  };

  const restart = () => {
    setQIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setSubmitted(false);
  };

  const submitScore = async () => {
    if (!username.trim()) {
      toast.error("Enter your name first!");
      return;
    }
    await addScore.mutateAsync({
      username: username.trim(),
      score: BigInt(score),
      category: "Mixed",
    });
    setSubmitted(true);
    toast.success("Score submitted! 🏆");
  };

  if (finished) {
    return (
      <div
        className="flex flex-col items-center gap-5 py-4"
        data-ocid="trivia.success_state"
      >
        <div className="text-5xl">
          {score >= 8 ? "🏆" : score >= 5 ? "⭐" : "🌸"}
        </div>
        <h3 className="font-display text-2xl font-bold text-pink-gp">
          You scored {score}/{TRIVIA_QUESTIONS.length}!
        </h3>
        <p className="text-muted-foreground text-center">
          {score >= 8
            ? "Amazing! You're a trivia genius! 🧠"
            : score >= 5
              ? "Great job! Keep learning! 📚"
              : "Good try! Every attempt makes you smarter! 🌟"}
        </p>
        {!submitted ? (
          <div className="flex gap-2 w-full max-w-sm">
            <Input
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-full"
              data-ocid="trivia.input"
            />
            <Button
              onClick={submitScore}
              disabled={addScore.isPending}
              className="bg-pink-gp text-white rounded-full"
              data-ocid="trivia.submit_button"
            >
              Submit 🏆
            </Button>
          </div>
        ) : (
          <Badge className="bg-teal-gp text-white text-base px-4 py-2">
            Score submitted! ✨
          </Badge>
        )}
        <Button
          onClick={restart}
          variant="outline"
          className="rounded-full border-pink-gp text-pink-gp"
          data-ocid="trivia.secondary_button"
        >
          Play Again
        </Button>
        {leaderboard.length > 0 && (
          <div className="w-full max-w-sm">
            <h4 className="font-display font-bold mb-2">🏆 Leaderboard</h4>
            {leaderboard.slice(0, 5).map((entry, i) => (
              <div
                key={entry.username + String(i)}
                className="flex justify-between items-center py-1 border-b border-border text-sm"
                data-ocid={`trivia.item.${i + 1}`}
              >
                <span>
                  {i + 1}. {entry.username}
                </span>
                <Badge variant="outline">{Number(entry.score)}/10</Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 py-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl text-pink-gp font-bold">
          Trivia Time! 🎯
        </h3>
        <Badge className="bg-pink-gp text-white">Score: {score}</Badge>
      </div>
      <div className="bg-pink-light-gp rounded-full h-2">
        <div
          className="bg-pink-gp h-2 rounded-full transition-all duration-300"
          style={{ width: `${(qIndex / TRIVIA_QUESTIONS.length) * 100}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Question {qIndex + 1} of {TRIVIA_QUESTIONS.length} • {q.category}
      </p>
      <Card className="border-2 border-pink-light-gp">
        <CardContent className="p-6">
          <p className="font-display font-bold text-lg text-center">{q.q}</p>
        </CardContent>
      </Card>
      <div className="grid gap-2 sm:grid-cols-2">
        {q.options.map((opt, i) => (
          <Button
            key={opt.slice(0, 20)}
            variant="outline"
            className={`h-auto py-3 px-4 text-left justify-start whitespace-normal font-normal transition-all ${
              selected === null
                ? "hover:border-pink-gp hover:bg-pink-light-gp"
                : i === q.correct
                  ? "border-teal-gp bg-teal-light-gp"
                  : selected === i
                    ? "border-destructive bg-red-50"
                    : "opacity-50"
            }`}
            onClick={() => handleAnswer(i)}
            data-ocid={`trivia.item.${i + 1}`}
          >
            <span className="font-bold mr-2 text-pink-gp">
              {["A", "B", "C", "D"][i]}.
            </span>{" "}
            {opt}
          </Button>
        ))}
      </div>
    </div>
  );
}

// ===== MAD LIBS =====
const MAD_LIB_TEMPLATES = [
  {
    title: "The Princess Scientist 🔬",
    fields: [
      { label: "Girl's name", key: "name" },
      { label: "Adjective", key: "adj1" },
      { label: "Invention name", key: "invention" },
      { label: "Magic ingredient", key: "ingredient" },
      { label: "Silly noise", key: "noise" },
      { label: "Color", key: "color" },
    ],
    template: (f: Record<string, string>) =>
      `Once there was a ${f.adj1} princess named ${f.name} who invented the world's first ${f.invention}. She mixed ${f.color} ${f.ingredient} in her lab and it went "${f.noise}!" and created a rainbow. The whole kingdom cheered and called her the greatest scientist who ever lived! 🌈`,
  },
  {
    title: "The Space Adventure 🚀",
    fields: [
      { label: "Astronaut's name", key: "name" },
      { label: "Planet name", key: "planet" },
      { label: "Silly food", key: "food" },
      { label: "Animal", key: "animal" },
      { label: "Verb (action)", key: "verb" },
      { label: "Exciting word", key: "exclaim" },
    ],
    template: (f: Record<string, string>) =>
      `${f.name} blasted off in her rocket headed to Planet ${f.planet}! When she landed, she found tiny ${f.animal}s eating ${f.food} pizza. "${f.exclaim}!" she shouted. She decided to ${f.verb} with them until sunset. It was the most amazing space mission in history! 🌟`,
  },
  {
    title: "The Friendship Quest 💕",
    fields: [
      { label: "Your name", key: "name" },
      { label: "Best friend's name", key: "friend" },
      { label: "Magical place", key: "place" },
      { label: "Treasure type", key: "treasure" },
      { label: "Obstacle", key: "obstacle" },
      { label: "Superpower", key: "power" },
    ],
    template: (f: Record<string, string>) =>
      `${f.name} and her best friend ${f.friend} embarked on a quest to ${f.place} to find the legendary ${f.treasure}. When they encountered a terrible ${f.obstacle}, ${f.name} used her ${f.power} power and ${f.friend} used her amazing wit. Together they saved the day! They kept the ${f.treasure} as a symbol of their unbreakable friendship! 💎`,
  },
];

export function MadLibsGame() {
  const [storyIdx, setStoryIdx] = useState(0);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [result, setResult] = useState("");
  const addMadLib = useAddMadLib();
  const { data: savedLibs = [] } = useGetAllMadLibs();

  const story = MAD_LIB_TEMPLATES[storyIdx];

  const allFilled = story.fields.every((f) => fields[f.key]?.trim());

  const generate = () => {
    if (!allFilled) {
      toast.error("Fill in all the blanks first!");
      return;
    }
    setResult(story.template(fields));
  };

  const save = async () => {
    if (!result) return;
    await addMadLib.mutateAsync({
      storyTitle: story.title,
      filledText: result,
    });
    toast.success("Mad Lib saved! 🎉");
  };

  const reset = () => {
    setFields({});
    setResult("");
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-coral-gp font-bold">
        Mad Libs! 📖
      </h3>
      <div className="flex gap-2 flex-wrap">
        {MAD_LIB_TEMPLATES.map((t, i) => (
          <Button
            key={t.title}
            size="sm"
            variant={storyIdx === i ? "default" : "outline"}
            className={`rounded-full ${storyIdx === i ? "bg-coral-gp text-white" : "border-coral-gp text-coral-gp"}`}
            onClick={() => {
              setStoryIdx(i);
              reset();
            }}
            data-ocid="madlibs.tab"
          >
            {t.title}
          </Button>
        ))}
      </div>

      {!result ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {story.fields.map((f) => (
            <div key={f.key}>
              <label
                htmlFor={`madlib-${f.key}`}
                className="text-sm font-bold text-muted-foreground block mb-1"
              >
                {f.label}
              </label>
              <Input
                id={`madlib-${f.key}`}
                placeholder={`Enter ${f.label.toLowerCase()}...`}
                value={fields[f.key] || ""}
                onChange={(e) =>
                  setFields((prev) => ({ ...prev, [f.key]: e.target.value }))
                }
                className="rounded-lg border-border focus:border-coral-gp"
                data-ocid="madlibs.input"
              />
            </div>
          ))}
          <Button
            onClick={generate}
            disabled={!allFilled}
            className="sm:col-span-2 bg-coral-gp text-white rounded-full"
            data-ocid="madlibs.primary_button"
          >
            Create My Story! 🎉
          </Button>
        </div>
      ) : (
        <Card className="bg-coral-light-gp border-none">
          <CardContent className="p-6">
            <h4 className="font-display font-bold text-coral-gp mb-3">
              {story.title}
            </h4>
            <p className="text-base leading-relaxed">{result}</p>
            <div className="flex gap-2 mt-4">
              <Button
                onClick={save}
                disabled={addMadLib.isPending}
                className="bg-coral-gp text-white rounded-full"
                data-ocid="madlibs.save_button"
              >
                Save Story 💾
              </Button>
              <Button
                onClick={reset}
                variant="outline"
                className="rounded-full border-coral-gp text-coral-gp"
                data-ocid="madlibs.secondary_button"
              >
                New Story
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {savedLibs.length > 0 && (
        <div>
          <h4 className="font-display font-bold text-sm text-muted-foreground uppercase tracking-wider mb-2">
            Saved Stories 📚
          </h4>
          {savedLibs.map((lib, i) => (
            <Card
              key={lib.storyTitle + lib.filledText.slice(0, 10)}
              className="mb-2 border-border"
              data-ocid={`madlibs.item.${i + 1}`}
            >
              <CardContent className="p-3">
                <p className="font-bold text-coral-gp text-sm">
                  {lib.storyTitle}
                </p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {lib.filledText}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== MATCHING GAME =====
const MATCH_ITEMS = [
  { id: 1, content: "Marie Curie 🔬", pair: 1 },
  { id: 2, content: "Physics Nobel 🏆", pair: 1 },
  { id: 3, content: "Frida Kahlo 🎨", pair: 2 },
  { id: 4, content: "Self-Portrait 🖼️", pair: 2 },
  { id: 5, content: "Malala 📚", pair: 3 },
  { id: 6, content: "Education Activist 💪", pair: 3 },
  { id: 7, content: "Amelia Earhart ✈️", pair: 4 },
  { id: 8, content: "First Solo Flight 🌍", pair: 4 },
  { id: 9, content: "Rosa Parks 🚌", pair: 5 },
  { id: 10, content: "Civil Rights 🌹", pair: 5 },
  { id: 11, content: "Ada Lovelace 💻", pair: 6 },
  { id: 12, content: "First Programmer 🤖", pair: 6 },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function MatchingGame() {
  const [cards, setCards] = useState(() => shuffle(MATCH_ITEMS));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const flip = (idx: number) => {
    if (
      flipped.length === 2 ||
      flipped.includes(idx) ||
      matched.includes(cards[idx].pair)
    )
      return;
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      if (cards[newFlipped[0]].pair === cards[newFlipped[1]].pair) {
        setMatched((m) => [...m, cards[newFlipped[0]].pair]);
        setFlipped([]);
        if (matched.length + 1 === MATCH_ITEMS.length / 2)
          toast.success("🎉 You matched them all!");
      } else {
        setTimeout(() => setFlipped([]), 900);
      }
    }
  };

  const restart = () => {
    setCards(shuffle(MATCH_ITEMS));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl text-teal-gp font-bold">
          Matching Game 🃏
        </h3>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Moves: {moves}</Badge>
          <Badge variant="outline">
            Matched: {matched.length}/{MATCH_ITEMS.length / 2}
          </Badge>
          <Button
            size="sm"
            onClick={restart}
            variant="outline"
            className="rounded-full border-teal-gp text-teal-gp"
            data-ocid="matching.secondary_button"
          >
            Reset
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card, i) => {
          const isFlipped = flipped.includes(i) || matched.includes(card.pair);
          return (
            <button
              key={`${card.id}-${card.content}`}
              type="button"
              className={`aspect-square rounded-xl border-2 flex items-center justify-center text-center text-xs font-bold cursor-pointer transition-all duration-300 p-1 w-full ${
                isFlipped
                  ? matched.includes(card.pair)
                    ? "bg-teal-light-gp border-teal-gp scale-95"
                    : "bg-purple-light-gp border-purple-gp"
                  : "bg-pink-gp border-pink-gp hover:scale-105 text-white"
              }`}
              onClick={() => flip(i)}
              data-ocid={`matching.item.${i + 1}`}
            >
              {isFlipped ? card.content : "💖"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ===== BRAIN GAMES (Riddles) =====
const RIDDLES = [
  { q: "I have hands but can't clap. What am I?", a: "A clock! ⏰" },
  {
    q: "The more you take, the more you leave behind. What am I?",
    a: "Footsteps! 👣",
  },
  {
    q: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    a: "An echo! 🌊",
  },
  { q: "What gets wetter as it dries?", a: "A towel! 🏖️" },
  {
    q: "I have cities but no houses, mountains but no trees, and water but no fish. What am I?",
    a: "A map! 🗺️",
  },
  {
    q: "The more you have of it, the less you see. What is it?",
    a: "Darkness! 🌙",
  },
  {
    q: "What can travel around the world while staying in a corner?",
    a: "A stamp on a letter! 💌",
  },
];

export function BrainGames() {
  const [revealed, setRevealed] = useState<boolean[]>(
    new Array(RIDDLES.length).fill(false),
  );

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-yellow-gp font-bold">
        Brain Games 🧠
      </h3>
      <p className="text-muted-foreground">
        Think carefully, then reveal the answer!
      </p>
      {RIDDLES.map((r, i) => (
        <Card
          key={r.q.slice(0, 30)}
          className="border-2 border-yellow-gp"
          data-ocid={`brain.item.${i + 1}`}
        >
          <CardContent className="p-4">
            <p className="font-bold text-sm mb-2">🤔 {r.q}</p>
            {revealed[i] ? (
              <p className="text-teal-gp font-bold text-sm">✅ {r.a}</p>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="border-yellow-gp text-yellow-gp hover:bg-yellow-light-gp rounded-full"
                onClick={() =>
                  setRevealed((prev) => {
                    const n = [...prev];
                    n[i] = true;
                    return n;
                  })
                }
                data-ocid={`brain.toggle.${i + 1}`}
              >
                Reveal Answer 💡
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ===== FUTURE CAREER QUIZ =====
const CAREER_QUESTIONS = [
  {
    q: "Your favorite subject is:",
    options: [
      "Science & Math",
      "Art & Music",
      "History & Writing",
      "Physical Education",
      "Tech & Computers",
    ],
  },
  {
    q: "In your free time you love to:",
    options: [
      "Experiment & explore",
      "Create & design",
      "Read & research",
      "Move & compete",
      "Build & program",
    ],
  },
  {
    q: "Your superpower would be:",
    options: [
      "Super intelligence",
      "Creativity",
      "Persuasion",
      "Super strength",
      "Seeing the future",
    ],
  },
];
const CAREER_RESULTS = [
  {
    career: "🔬 Scientist / Doctor",
    desc: "You love discovery and helping others! You could cure diseases, explore space, or invent the next big thing.",
  },
  {
    career: "🎨 Artist / Designer",
    desc: "Your creativity has no limits! From fashion design to game art to architecture, you'll beautify the world.",
  },
  {
    career: "📝 Writer / Journalist",
    desc: "Your words have power! You could tell stories that change minds, report on world events, or write bestselling novels.",
  },
  {
    career: "🏅 Athlete / Coach",
    desc: "Your energy and determination are unstoppable! Olympic dreams or inspiring the next generation — you've got this.",
  },
  {
    career: "💻 Tech Innovator / CEO",
    desc: "You think ahead of your time! Building apps, leading companies, or shaping the future of technology — it's all you.",
  },
];

export function FutureCareerQuiz() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<(typeof CAREER_RESULTS)[0] | null>(null);

  const answer = (qi: number, ai: number) => {
    const newAnswers = [...answers];
    newAnswers[qi] = ai;
    setAnswers(newAnswers);
    if (
      newAnswers.filter((a) => a !== undefined).length ===
      CAREER_QUESTIONS.length
    ) {
      const tally = new Array(5).fill(0);
      for (const a of newAnswers) tally[a]++;
      const top = tally.indexOf(Math.max(...tally));
      setResult(CAREER_RESULTS[top]);
    }
  };

  const restart = () => {
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-purple-gp font-bold">
        Future Career Quiz 🔮
      </h3>
      {!result ? (
        <>
          {CAREER_QUESTIONS.map((q, qi) => (
            <div key={q.q.slice(0, 30)}>
              <p className="font-display font-bold text-sm mb-2 text-foreground">
                {qi + 1}. {q.q}
              </p>
              <div className="flex flex-col gap-1">
                {q.options.map((opt, oi) => (
                  <Button
                    key={opt.slice(0, 20)}
                    variant="outline"
                    size="sm"
                    className={`justify-start text-left rounded-full h-auto py-2 px-4 ${answers[qi] === oi ? "bg-purple-gp text-white border-purple-gp" : "hover:border-purple-gp"}`}
                    onClick={() => answer(qi, oi)}
                    data-ocid={`career.item.${qi + 1}`}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <Card
          className="bg-purple-light-gp border-none text-center"
          data-ocid="career.success_state"
        >
          <CardContent className="p-8">
            <div className="text-5xl mb-3">{result.career.split(" ")[0]}</div>
            <h4 className="font-display text-2xl font-bold text-purple-gp mb-2">
              {result.career.substring(2)}
            </h4>
            <p className="text-muted-foreground">{result.desc}</p>
            <Button
              onClick={restart}
              className="mt-4 bg-purple-gp text-white rounded-full"
              data-ocid="career.secondary_button"
            >
              Retake Quiz
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ===== DETECTIVE CODES =====
export function DetectiveCodes() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [shift, setShift] = useState(3);
  const [output, setOutput] = useState("");

  const cipher = (text: string, shiftBy: number) => {
    return text
      .split("")
      .map((char) => {
        if (/[a-zA-Z]/.test(char)) {
          const base = char >= "a" ? 97 : 65;
          const direction = mode === "encode" ? 1 : -1;
          return String.fromCharCode(
            ((char.charCodeAt(0) - base + direction * shiftBy + 26) % 26) +
              base,
          );
        }
        return char;
      })
      .join("");
  };

  const process = () => {
    setOutput(cipher(input, shift));
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-teal-gp font-bold">
        Detective Codes 🔍
      </h3>
      <p className="text-muted-foreground">
        Use Caesar cipher to encode secret messages with your friends!
      </p>

      <div className="flex gap-2">
        {["encode", "decode"].map((m) => (
          <Button
            key={m}
            size="sm"
            className={`rounded-full capitalize ${mode === m ? "bg-teal-gp text-white" : "border-teal-gp text-teal-gp bg-transparent border"}`}
            onClick={() => {
              setMode(m as "encode" | "decode");
              setOutput("");
            }}
            data-ocid="detective.toggle"
          >
            {m === "encode" ? "🔒 Encode" : "🔓 Decode"}
          </Button>
        ))}
      </div>

      <div>
        <label
          htmlFor="shift-range"
          className="text-sm font-bold text-muted-foreground block mb-1"
        >
          Shift amount (1-25): {shift}
        </label>
        <input
          id="shift-range"
          type="range"
          min={1}
          max={25}
          value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
          className="w-full accent-teal-600"
          data-ocid="detective.input"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label
            htmlFor="detective-input"
            className="text-sm font-bold text-muted-foreground block mb-1"
          >
            {mode === "encode" ? "Original message" : "Coded message"}
          </label>
          <Textarea
            id="detective-input"
            placeholder={
              mode === "encode"
                ? "Type your secret message..."
                : "Paste the coded message..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            className="resize-none"
            data-ocid="detective.textarea"
          />
        </div>
        <div>
          <p className="text-sm font-bold text-muted-foreground block mb-1">
            {mode === "encode" ? "Secret code" : "Decoded message"}
          </p>
          <div className="w-full h-24 bg-teal-light-gp rounded-lg border-2 border-teal-gp p-3 font-mono text-sm">
            {output}
          </div>
        </div>
      </div>

      <Button
        onClick={process}
        className="bg-teal-gp text-white rounded-full self-start px-8"
        data-ocid="detective.primary_button"
      >
        {mode === "encode" ? "🔒 Encode Message" : "🔓 Decode Message"}
      </Button>
    </div>
  );
}

// ===== WORD SEARCH =====
const WORD_SEARCH_WORDS = [
  "BRAVE",
  "STRONG",
  "KIND",
  "SMART",
  "FIERCE",
  "BOLD",
  "DREAM",
  "SHINE",
];
function makeWordSearchGrid(
  words: string[],
  size = 10,
): { grid: string[][]; placed: { word: string; cells: [number, number][] }[] } {
  const grid: string[][] = Array.from({ length: size }, () =>
    Array(size).fill(""),
  );
  const placed: { word: string; cells: [number, number][] }[] = [];
  const dirs = [
    [0, 1],
    [1, 0],
    [1, 1],
    [0, -1],
    [-1, 0],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];
  for (const word of words) {
    let attempts = 0;
    while (attempts < 100) {
      const dir = dirs[Math.floor(Math.random() * dirs.length)];
      const r = Math.floor(Math.random() * size);
      const c = Math.floor(Math.random() * size);
      const cells: [number, number][] = [];
      let fits = true;
      for (let i = 0; i < word.length; i++) {
        const nr = r + dir[0] * i;
        const nc = c + dir[1] * i;
        if (nr < 0 || nr >= size || nc < 0 || nc >= size) {
          fits = false;
          break;
        }
        if (grid[nr][nc] !== "" && grid[nr][nc] !== word[i]) {
          fits = false;
          break;
        }
        cells.push([nr, nc]);
      }
      if (fits) {
        cells.forEach(([nr, nc], i) => {
          grid[nr][nc] = word[i];
        });
        placed.push({ word, cells });
        break;
      }
      attempts++;
    }
  }
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (!grid[r][c]) grid[r][c] = letters[Math.floor(Math.random() * 26)];
  return { grid, placed };
}

export function WordSearch() {
  const [{ grid, placed }] = useState(() =>
    makeWordSearchGrid(WORD_SEARCH_WORDS),
  );
  const [found, setFound] = useState<string[]>([]);
  const [selecting, setSelecting] = useState<[number, number][]>([]);
  const [mouse, setMouse] = useState(false);

  const handleCellMouseDown = (r: number, c: number) => {
    setMouse(true);
    setSelecting([[r, c]]);
  };
  const handleCellMouseEnter = (r: number, c: number) => {
    if (mouse) setSelecting((prev) => [...prev, [r, c]]);
  };
  const handleMouseUp = () => {
    setMouse(false);
    const selStr = selecting.map(([r, c]) => grid[r][c]).join("");
    const selStrRev = [...selStr].reverse().join("");
    for (const { word, cells } of placed) {
      const cellStr = cells.map(([r, c]) => grid[r][c]).join("");
      if (
        (selStr === cellStr || selStrRev === cellStr) &&
        selecting.length === word.length &&
        !found.includes(word)
      ) {
        const matchCells =
          selecting.length === cells.length &&
          cells.every(
            ([r, c], i) => selecting[i]?.[0] === r && selecting[i]?.[1] === c,
          );
        const matchRev =
          selecting.length === cells.length &&
          [...cells]
            .reverse()
            .every(
              ([r, c], i) => selecting[i]?.[0] === r && selecting[i]?.[1] === c,
            );
        if (matchCells || matchRev) {
          setFound((prev) => [...prev, word]);
          break;
        }
      }
    }
    setSelecting([]);
  };

  const isFound = (r: number, c: number) =>
    placed.some(
      ({ word, cells }) =>
        found.includes(word) && cells.some(([cr, cc]) => cr === r && cc === c),
    );
  const isSelecting = (r: number, c: number) =>
    selecting.some(([sr, sc]) => sr === r && sc === c);

  return (
    <div className="flex flex-col gap-4 py-2" onMouseUp={handleMouseUp}>
      <h3 className="font-display text-2xl text-pink-gp font-bold">
        Word Search 🔤
      </h3>
      <p className="text-muted-foreground">
        Find all the girl-power words hidden in the grid!
      </p>
      <div className="flex flex-wrap gap-2 mb-2">
        {WORD_SEARCH_WORDS.map((w) => (
          <Badge
            key={w}
            className={
              found.includes(w)
                ? "bg-teal-gp text-white line-through"
                : "bg-pink-light-gp text-pink-gp"
            }
          >
            {w}
          </Badge>
        ))}
      </div>
      <div className="overflow-x-auto">
        <div
          className="inline-grid select-none"
          style={{ gridTemplateColumns: "repeat(10, 2.25rem)", gap: "2px" }}
        >
          {grid.map((row, r) =>
            row.map((letter, c) => (
              <button
                key={`cell-${r * 100 + c}`}
                type="button"
                onMouseDown={() => handleCellMouseDown(r, c)}
                onMouseEnter={() => handleCellMouseEnter(r, c)}
                className={`w-9 h-9 text-xs font-bold rounded flex items-center justify-center border transition-colors select-none ${isFound(r, c) ? "bg-teal-gp text-white border-teal-gp" : isSelecting(r, c) ? "bg-pink-gp text-white border-pink-gp" : "border-border hover:bg-pink-light-gp"}`}
                data-ocid={`wordsearch.item.${r * 10 + c + 1}`}
              >
                {letter}
              </button>
            )),
          )}
        </div>
      </div>
      {found.length === WORD_SEARCH_WORDS.length && (
        <Card
          className="bg-teal-light-gp border-none text-center"
          data-ocid="wordsearch.success_state"
        >
          <CardContent className="p-6">
            <div className="text-4xl mb-2">🏆</div>
            <p className="font-display text-xl font-bold text-teal-gp">
              You found all the words! Girl power! 🌟
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ===== EMOJI STORY =====
const EMOJI_PROMPTS = [
  {
    emojis: "🌧️👧🌈🦋",
    translation:
      "A girl cried, but after the rain came a rainbow, and she turned into something beautiful.",
  },
  {
    emojis: "📚💡🚀⭐",
    translation:
      "She studied hard, had a brilliant idea, and launched herself to the stars.",
  },
  {
    emojis: "🤝💔🌱❤️",
    translation:
      "Two friends had a falling out, but with time and care, love grew back stronger.",
  },
  {
    emojis: "🏔️😰💪🏆",
    translation:
      "The mountain was scary, but she was brave and strong, and she won the challenge.",
  },
  {
    emojis: "🌙✨🔮🦄",
    translation:
      "Under the moonlight, magic sparkled, and unicorn dreams came true.",
  },
];

export function EmojiStory() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [story, setStory] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [userStories, setUserStories] = useState<
    { emojis: string; story: string }[]
  >([]);

  const submit = () => {
    if (!story.trim()) {
      return;
    }
    setUserStories((prev) => [
      { emojis: EMOJI_PROMPTS[currentIdx].emojis, story: story.trim() },
      ...prev.slice(0, 4),
    ]);
    setStory("");
    setRevealed(false);
    setCurrentIdx((p) => (p + 1) % EMOJI_PROMPTS.length);
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-purple-gp font-bold">
        Emoji Story 🌟
      </h3>
      <p className="text-muted-foreground">
        Read the emoji sequence and write your interpretation, then compare with
        ours!
      </p>
      <Card className="border-2 border-purple-gp">
        <CardContent className="p-6 text-center">
          <div className="text-5xl tracking-widest mb-4">
            {EMOJI_PROMPTS[currentIdx].emojis}
          </div>
          <Textarea
            placeholder="What story do these emojis tell you? Write it out..."
            value={story}
            onChange={(e) => setStory(e.target.value)}
            rows={3}
            className="resize-none mb-3"
            data-ocid="emojistory.textarea"
          />
          <div className="flex gap-2 justify-center flex-wrap">
            <Button
              onClick={() => setRevealed(!revealed)}
              variant="outline"
              className="rounded-full border-purple-gp text-purple-gp"
              data-ocid="emojistory.toggle"
            >
              {revealed ? "Hide Our Story 🙈" : "See Our Story 👀"}
            </Button>
            <Button
              onClick={submit}
              disabled={!story.trim()}
              className="bg-purple-gp text-white rounded-full"
              data-ocid="emojistory.primary_button"
            >
              Next Emoji Story ➡️
            </Button>
          </div>
          {revealed && (
            <div className="mt-3 p-3 bg-purple-light-gp rounded-xl text-sm italic text-foreground">
              📖 {EMOJI_PROMPTS[currentIdx].translation}
            </div>
          )}
        </CardContent>
      </Card>
      {userStories.length > 0 && (
        <div>
          <h4 className="font-display font-bold text-muted-foreground text-sm uppercase tracking-wider mb-3">
            Your Stories
          </h4>
          {userStories.map((s, i) => (
            <Card
              key={`${s.emojis}-${i}`}
              className="mb-2 border-border"
              data-ocid={`emojistory.item.${i + 1}`}
            >
              <CardContent className="p-3">
                <p className="text-xl mb-1">{s.emojis}</p>
                <p className="text-sm text-muted-foreground">{s.story}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== RIDDLE CHALLENGE =====
const RIDDLES_CHALLENGE = [
  {
    q: "I have keys but no locks. I have space but no room. You can enter but can't go inside. What am I?",
    a: "A keyboard! ⌨️",
  },
  {
    q: "The more you take, the more you leave behind. What am I?",
    a: "Footsteps! 👣",
  },
  {
    q: "I speak without a mouth and hear without ears. I have no body but come alive with wind. What am I?",
    a: "An echo! 🔊",
  },
  { q: "What gets wetter as it dries?", a: "A towel! 🏖️" },
  { q: "What has hands but can't clap?", a: "A clock! ⏰" },
  {
    q: "I can fly without wings. I can cry without eyes. Wherever I go, darkness flies. What am I?",
    a: "A cloud! ☁️",
  },
  {
    q: "What has cities, but no houses live there; mountains, but no trees grow there; water, but no fish swim there?",
    a: "A map! 🗺️",
  },
  {
    q: "The more you have of it, the less you see. What is it?",
    a: "Darkness! 🌙",
  },
  {
    q: "What can run but never walks, has a mouth but never talks, has a head but never weeps, has a bed but never sleeps?",
    a: "A river! 🌊",
  },
  {
    q: "I'm tall when I'm young, and short when I'm old. What am I?",
    a: "A candle! 🕯️",
  },
];

export function RiddleChallenge() {
  const [revealed, setRevealed] = useState<boolean[]>(
    new Array(RIDDLES_CHALLENGE.length).fill(false),
  );
  const [score, setScore] = useState(0);

  const reveal = (i: number) => {
    if (!revealed[i]) {
      setRevealed((prev) => {
        const n = [...prev];
        n[i] = true;
        return n;
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl text-yellow-gp font-bold">
          Riddle Challenge 🤔
        </h3>
        <Badge className="bg-yellow-gp text-foreground">
          Score: {score}/{RIDDLES_CHALLENGE.length}
        </Badge>
      </div>
      <div className="grid gap-3">
        {RIDDLES_CHALLENGE.map((riddle, i) => (
          <Card
            key={riddle.q.slice(0, 20)}
            className={`border-2 ${revealed[i] ? "border-teal-gp bg-teal-light-gp" : "border-yellow-light-gp"}`}
            data-ocid={`riddle.item.${i + 1}`}
          >
            <CardContent className="p-4">
              <p className="font-bold text-sm mb-2">🤔 {riddle.q}</p>
              {revealed[i] ? (
                <p className="text-sm text-teal-gp font-bold">✅ {riddle.a}</p>
              ) : (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-yellow-gp text-foreground rounded-full"
                    onClick={() => {
                      reveal(i);
                      setScore((s) => s + 1);
                    }}
                    data-ocid={`riddle.button.${i + 1}`}
                  >
                    Got it! +1 ⭐
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-yellow-gp text-yellow-gp rounded-full"
                    onClick={() => reveal(i)}
                    data-ocid={`riddle.toggle.${i + 1}`}
                  >
                    Show Answer
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {score >= 8 && (
        <Card
          className="bg-yellow-light-gp border-none text-center"
          data-ocid="riddle.success_state"
        >
          <CardContent className="p-6">
            <div className="text-4xl mb-2">🧠</div>
            <p className="font-display text-xl font-bold text-yellow-gp">
              Riddle Master! You're a genius! 🌟
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ===== COLOR BY NUMBER =====
const PALETTE = [
  "#FF9EBB",
  "#B57BFF",
  "#5ECFCA",
  "#FFD93D",
  "#FF6B6B",
  "#4CAF50",
  "#FF9800",
  "#FFFFFF",
];
const GRID_SIZE = 12;
const COLOR_NUMBERS: number[][] = Array.from({ length: GRID_SIZE }, (_, r) =>
  Array.from({ length: GRID_SIZE }, (_, c) => {
    const cx = c - GRID_SIZE / 2;
    const cy = r - GRID_SIZE / 2;
    const dist = Math.sqrt(cx * cx + cy * cy);
    if (dist < 2) return 0;
    if (dist < 4) return 2;
    if (dist < 6) return 1;
    return 3 + ((r + c) % 5);
  }),
);

export function ColorByNumber() {
  const [colored, setColored] = useState<Record<string, string>>({});
  const [active, setActive] = useState(0);

  const paint = (r: number, c: number) =>
    setColored((prev) => ({ ...prev, [`${r}-${c}`]: PALETTE[active] }));
  const clear = () => setColored({});

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl text-pink-gp font-bold">
          Color by Number 🎨
        </h3>
        <Button
          size="sm"
          variant="outline"
          className="rounded-full border-pink-gp text-pink-gp"
          onClick={clear}
          data-ocid="colorbynumber.secondary_button"
        >
          Clear 🗑️
        </Button>
      </div>
      <p className="text-muted-foreground">
        Pick a color then click cells to paint your picture!
      </p>
      <div className="flex flex-wrap gap-2">
        {PALETTE.map((color, i) => (
          <button
            key={color}
            type="button"
            onClick={() => setActive(i)}
            className={`w-8 h-8 rounded-full border-4 transition-transform ${active === i ? "scale-125 border-foreground" : "border-transparent hover:scale-110"}`}
            style={{ backgroundColor: color }}
            data-ocid="colorbynumber.toggle"
          />
        ))}
      </div>
      <div className="overflow-x-auto">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${String(GRID_SIZE)}, 1.75rem)`,
            gap: "1px",
          }}
        >
          {COLOR_NUMBERS.map((row, r) =>
            row.map((num, c) => (
              <button
                key={`cell-${r * 100 + c}`}
                type="button"
                onClick={() => paint(r, c)}
                className="w-7 h-7 border border-border/30 rounded-sm flex items-center justify-center text-[8px] font-bold text-muted-foreground hover:opacity-80 transition-opacity"
                style={{ backgroundColor: colored[`${r}-${c}`] || "#f5f5f5" }}
                data-ocid="colorbynumber.canvas_target"
              >
                {!colored[`${r}-${c}`] ? num : ""}
              </button>
            )),
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {PALETTE.map((color, i) => (
          <div key={color} className="flex items-center gap-1 text-xs">
            <div
              className="w-4 h-4 rounded border border-border"
              style={{ backgroundColor: color }}
            />
            <span>{i}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Lazy import Textarea for use in this file
import { Textarea } from "@/components/ui/textarea";
