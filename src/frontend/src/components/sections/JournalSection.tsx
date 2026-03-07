import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddJournalEntry,
  useGetAllJournalEntries,
} from "@/hooks/useQueries";
import { useState } from "react";
import { toast } from "sonner";

const MOODS = [
  { emoji: "😄", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "🥰", label: "Loved" },
  { emoji: "😤", label: "Frustrated" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😰", label: "Anxious" },
  { emoji: "🤩", label: "Excited" },
  { emoji: "😴", label: "Tired" },
];

const JOURNAL_PROMPTS = [
  "What made me smile today? 😊",
  "What am I proud of this week? 🌟",
  "One thing I want to improve is... 🌱",
  "My favorite person right now is... because... 💕",
  "If I could have one superpower, I'd use it to... 🦸‍♀️",
  "The best part of being me is... ✨",
  "Something I'm looking forward to is... 🎉",
  "I feel most confident when I... 💪",
  "A goal I'm working toward is... 🎯",
  "What would I tell my younger self? 💌",
  "What does being brave mean to me? 🦁",
  "My favorite memory this month is... 📸",
  "Something that scared me but I did anyway was... 🌊",
  "I want to learn more about... 📚",
  "A kindness I showed someone recently was... 🤗",
  "What makes my friendship special? 🌸",
  "If today were a color, it would be... because... 🎨",
  "Three words that describe me are... 💎",
  "What am I grateful for right now? 🙏",
  "A dream I have for the future is... 🚀",
];

export function JournalSection() {
  const [text, setText] = useState("");
  const [mood, setMood] = useState<string | null>(null);
  const { data: entries = [], isLoading } = useGetAllJournalEntries();
  const addEntry = useAddJournalEntry();

  const handleSave = async () => {
    if (!text.trim()) {
      toast.error("Write something first! ✍️");
      return;
    }
    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    try {
      await addEntry.mutateAsync({ text: text.trim(), date, mood });
      setText("");
      setMood(null);
      toast.success("Journal entry saved! 💖");
    } catch {
      toast.error("Oops! Couldn't save. Try again.");
    }
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-purple-gp font-bold">
        My Journal 📔
      </h3>

      <Card className="border-2 border-purple-light-gp">
        <CardContent className="p-5 flex flex-col gap-4">
          <div>
            <p className="text-sm font-bold text-muted-foreground mb-2">
              How are you feeling? 💭
            </p>
            <div className="flex flex-wrap gap-2">
              {MOODS.map((m) => (
                <Button
                  key={m.label}
                  variant="outline"
                  size="sm"
                  className={`rounded-full ${mood === m.label ? "bg-purple-gp text-white border-purple-gp" : "border-border hover:border-purple-gp"}`}
                  onClick={() => setMood(mood === m.label ? null : m.label)}
                  data-ocid="journal.toggle"
                >
                  {m.emoji} {m.label}
                </Button>
              ))}
            </div>
          </div>

          <Textarea
            placeholder="What's on your mind today? Write freely — this is your safe space 💜"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            className="resize-none border-border focus:border-purple-gp"
            data-ocid="journal.textarea"
          />

          <Button
            onClick={handleSave}
            disabled={addEntry.isPending}
            className="bg-purple-gp text-white rounded-full self-end px-8"
            data-ocid="journal.submit_button"
          >
            {addEntry.isPending ? "Saving... ✨" : "Save Entry 💖"}
          </Button>
        </CardContent>
      </Card>

      {isLoading ? (
        <div
          className="text-center text-muted-foreground py-4"
          data-ocid="journal.loading_state"
        >
          Loading entries... 📖
        </div>
      ) : entries.length === 0 ? (
        <div
          className="text-center text-muted-foreground py-8 bg-muted rounded-xl"
          data-ocid="journal.empty_state"
        >
          <div className="text-4xl mb-2">📔</div>
          <p className="font-display font-bold">
            Your journal is waiting for your first entry!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-bold text-muted-foreground text-sm uppercase tracking-wider">
            Past Entries
          </h4>
          {[...entries].reverse().map((entry, i) => (
            <Card
              key={entry.date + entry.text.slice(0, 20)}
              className="border border-border"
              data-ocid={`journal.item.${i + 1}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">
                    {entry.date}
                  </span>
                  {entry.mood && (
                    <Badge variant="outline" className="text-xs">
                      {MOODS.find((m) => m.label === entry.mood)?.emoji}{" "}
                      {entry.mood}
                    </Badge>
                  )}
                </div>
                <p className="text-sm leading-relaxed">{entry.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export function JournalingIdeas() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copyPrompt = (prompt: string, i: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedIdx(i);
    toast.success("Prompt copied! ✍️");
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-pink-gp font-bold">
        Journaling Ideas 💡
      </h3>
      <p className="text-muted-foreground">
        Click any prompt to copy it to your clipboard, then paste it in your
        journal!
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {JOURNAL_PROMPTS.map((prompt, i) => (
          <Button
            key={prompt}
            variant="outline"
            className={`text-left h-auto py-3 px-4 justify-start whitespace-normal font-normal hover:border-pink-gp transition-colors ${copiedIdx === i ? "border-pink-gp bg-pink-light-gp" : ""}`}
            onClick={() => copyPrompt(prompt, i)}
            data-ocid={`journal_ideas.item.${i + 1}`}
          >
            <span className="text-pink-gp mr-2 font-bold">{i + 1}.</span>{" "}
            {prompt}
            {copiedIdx === i && (
              <span className="ml-auto text-xs text-pink-gp font-bold">
                Copied!
              </span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}

// ===== GRATITUDE JOURNAL =====
export function GratitudeJournal() {
  const STORAGE_KEY = "gratitude-journal";
  const [entries, setEntries] = useState<
    { date: string; items: [string, string, string] }[]
  >(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [item1, setItem1] = useState("");
  const [item2, setItem2] = useState("");
  const [item3, setItem3] = useState("");

  const save = () => {
    if (!item1.trim() || !item2.trim() || !item3.trim()) {
      toast.error("Fill in all 3 things!");
      return;
    }
    const entry = {
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      items: [item1.trim(), item2.trim(), item3.trim()] as [
        string,
        string,
        string,
      ],
    };
    const updated = [entry, ...entries].slice(0, 30);
    setEntries(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setItem1("");
    setItem2("");
    setItem3("");
    toast.success("Gratitude saved! 🌸");
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-teal-gp font-bold">
        Gratitude Journal 🌸
      </h3>
      <p className="text-muted-foreground">
        Name 3 things you're grateful for today. Even tiny things count! 💛
      </p>
      <Card className="border-2 border-teal-light-gp">
        <CardContent className="p-5 flex flex-col gap-3">
          {(
            [
              ["1", item1, setItem1],
              ["2", item2, setItem2],
              ["3", item3, setItem3],
            ] as [string, string, (v: string) => void][]
          ).map(([num, val, setter]) => (
            <div key={num}>
              <p className="text-sm font-bold text-muted-foreground block mb-1">
                Thing #{num} I'm grateful for:
              </p>
              <input
                className="w-full px-3 py-2 rounded-lg border border-border focus:border-teal-gp outline-none text-sm bg-background"
                placeholder="e.g. my dog's wagging tail..."
                value={val}
                onChange={(e) => setter(e.target.value)}
                data-ocid="gratitude.input"
              />
            </div>
          ))}
          <Button
            onClick={save}
            className="bg-teal-gp text-white rounded-full self-start px-8"
            data-ocid="gratitude.submit_button"
          >
            Save Today's Gratitude 🌸
          </Button>
        </CardContent>
      </Card>
      {entries.length > 0 && (
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-bold text-muted-foreground text-sm uppercase tracking-wider">
            Past Entries
          </h4>
          {entries.map((e, i) => (
            <Card
              key={`${e.date}-${i}`}
              className="border border-border"
              data-ocid={`gratitude.item.${i + 1}`}
            >
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground mb-2">{e.date}</p>
                {e.items.map((item) => (
                  <p key={item} className="text-sm">
                    ✅ {item}
                  </p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== DREAM DIARY =====
export function DreamDiary() {
  const STORAGE_KEY = "dream-diary";
  const [entries, setEntries] = useState<
    { date: string; dream: string; feeling: string }[]
  >(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [dream, setDream] = useState("");
  const [feeling, setFeeling] = useState("");
  const FEELINGS = [
    "✨ Magical",
    "😄 Happy",
    "😰 Scary",
    "🤔 Confusing",
    "💫 Inspiring",
    "😌 Peaceful",
  ];

  const save = () => {
    if (!dream.trim()) {
      toast.error("Describe your dream first!");
      return;
    }
    const entry = {
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      dream: dream.trim(),
      feeling,
    };
    const updated = [entry, ...entries].slice(0, 20);
    setEntries(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setDream("");
    setFeeling("");
    toast.success("Dream saved! 💫");
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-purple-gp font-bold">
        Dream Diary 💫
      </h3>
      <p className="text-muted-foreground">
        Write about a dream you had — or an imaginary adventure you wish you
        could have!
      </p>
      <Card className="border-2 border-purple-light-gp">
        <CardContent className="p-5 flex flex-col gap-3">
          <p className="text-sm font-bold text-muted-foreground">
            How did your dream make you feel?
          </p>
          <div className="flex flex-wrap gap-2">
            {FEELINGS.map((f) => (
              <Button
                key={f}
                size="sm"
                variant="outline"
                className={`rounded-full ${feeling === f ? "bg-purple-gp text-white border-purple-gp" : "border-border hover:border-purple-gp"}`}
                onClick={() => setFeeling(feeling === f ? "" : f)}
                data-ocid="dream.toggle"
              >
                {f}
              </Button>
            ))}
          </div>
          <Textarea
            placeholder="Describe your dream or imaginary adventure... let your imagination fly! 🌙"
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            rows={4}
            className="resize-none border-border focus:border-purple-gp"
            data-ocid="dream.textarea"
          />
          <Button
            onClick={save}
            className="bg-purple-gp text-white rounded-full self-start px-8"
            data-ocid="dream.submit_button"
          >
            Save Dream 💫
          </Button>
        </CardContent>
      </Card>
      {entries.length > 0 && (
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-bold text-muted-foreground text-sm uppercase tracking-wider">
            Your Dream Collection
          </h4>
          {entries.map((e, i) => (
            <Card
              key={`${e.date}-${i}`}
              className="border border-purple-light-gp"
              data-ocid={`dream.item.${i + 1}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">
                    {e.date}
                  </span>
                  {e.feeling && (
                    <Badge variant="outline" className="text-xs">
                      {e.feeling}
                    </Badge>
                  )}
                </div>
                <p className="text-sm leading-relaxed">{e.dream}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== LETTER TO FUTURE SELF =====
export function LetterToFutureSelf() {
  const STORAGE_KEY = "future-self-letter";
  const [letter, setLetter] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || "";
    } catch {
      return "";
    }
  });
  const [saved, setSaved] = useState(false);
  const [year, setYear] = useState(String(new Date().getFullYear() + 5));

  const save = () => {
    if (!letter.trim()) {
      toast.error("Write something first!");
      return;
    }
    localStorage.setItem(STORAGE_KEY, letter);
    setSaved(true);
    toast.success(`Letter saved! Open it in ${year} 💌`);
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-pink-gp font-bold">
        Letter to Future Me 💌
      </h3>
      <p className="text-muted-foreground">
        Write a letter to yourself to open in the future! What do you hope for?
        What do you want to remember?
      </p>
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-muted-foreground">
          Open this letter in:
        </span>
        <input
          type="number"
          className="w-24 px-3 py-2 rounded-lg border border-border focus:border-pink-gp outline-none text-sm bg-background"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          data-ocid="letter.input"
        />
      </div>
      <Card className="border-2 border-pink-light-gp">
        <CardContent className="p-5">
          <p className="text-sm font-bold text-pink-gp mb-2">Dear Future Me,</p>
          <Textarea
            placeholder="Right now, I am... My biggest dream is... I want you to know... I hope by the time you read this..."
            value={letter}
            onChange={(e) => {
              setLetter(e.target.value);
              setSaved(false);
            }}
            rows={8}
            className="resize-none border-border focus:border-pink-gp mb-3"
            data-ocid="letter.textarea"
          />
          <Button
            onClick={save}
            className="bg-pink-gp text-white rounded-full px-8"
            data-ocid="letter.submit_button"
          >
            {saved ? "✅ Saved!" : "Save My Letter 💌"}
          </Button>
        </CardContent>
      </Card>
      {saved && (
        <Card className="bg-pink-light-gp border-none">
          <CardContent className="p-4 text-sm">
            <strong>📬 Letter sealed!</strong> It's saved here until you're
            ready to read it in {year}. Come back and read it when the time
            feels right!
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ===== MOOD TRACKER =====
const MOOD_EMOJIS = [
  { emoji: "🌟", label: "Amazing" },
  { emoji: "😄", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "🥰", label: "Loved" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😰", label: "Anxious" },
  { emoji: "😤", label: "Frustrated" },
  { emoji: "😴", label: "Tired" },
  { emoji: "🤩", label: "Excited" },
];

export function MoodTracker() {
  const STORAGE_KEY = "mood-tracker-log";
  const [log, setLog] = useState<
    { date: string; mood: string; note: string }[]
  >(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");

  const save = () => {
    if (!selectedMood) {
      toast.error("Pick a mood first! 😊");
      return;
    }
    const entry = {
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      mood: selectedMood,
      note: note.trim(),
    };
    const updated = [entry, ...log].slice(0, 30);
    setLog(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSelectedMood("");
    setNote("");
    toast.success("Mood logged! 💛");
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-yellow-gp font-bold">
        Mood Tracker 💛
      </h3>
      <p className="text-muted-foreground">
        Check in with how you're feeling each day — patterns tell a story! 📈
      </p>
      <Card className="border-2 border-yellow-light-gp">
        <CardContent className="p-5 flex flex-col gap-4">
          <p className="text-sm font-bold text-muted-foreground">
            How are you feeling right now?
          </p>
          <div className="grid grid-cols-5 gap-2">
            {MOOD_EMOJIS.map((m) => (
              <button
                key={m.label}
                type="button"
                onClick={() =>
                  setSelectedMood(selectedMood === m.label ? "" : m.label)
                }
                className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all ${selectedMood === m.label ? "border-yellow-gp bg-yellow-light-gp" : "border-border hover:border-yellow-gp"}`}
                data-ocid="mood.toggle"
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-xs mt-1 font-bold">{m.label}</span>
              </button>
            ))}
          </div>
          <input
            className="w-full px-3 py-2 rounded-lg border border-border focus:border-yellow-gp outline-none text-sm bg-background"
            placeholder="Optional: why do you feel this way? (private)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            data-ocid="mood.input"
          />
          <Button
            onClick={save}
            className="bg-yellow-gp text-foreground font-bold rounded-full self-start px-8"
            data-ocid="mood.submit_button"
          >
            Log My Mood 💛
          </Button>
        </CardContent>
      </Card>
      {log.length > 0 && (
        <div>
          <h4 className="font-display font-bold text-muted-foreground text-sm uppercase tracking-wider mb-3">
            My Mood History
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {log.map((e, i) => (
              <Card
                key={`${e.date}-${i}`}
                className="bg-yellow-light-gp border-none"
                data-ocid={`mood.item.${i + 1}`}
              >
                <CardContent className="p-3 text-center">
                  <div className="text-2xl">
                    {MOOD_EMOJIS.find((m) => m.label === e.mood)?.emoji || "💛"}
                  </div>
                  <p className="text-xs font-bold text-yellow-gp">{e.mood}</p>
                  <p className="text-xs text-muted-foreground">{e.date}</p>
                  {e.note && (
                    <p className="text-xs mt-1 italic text-foreground">
                      {e.note}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ===== POETRY CORNER =====
const POEM_PROMPTS = [
  "Write a poem about the feeling of sunshine on your face 🌞",
  "Describe your best friend without using their name 💕",
  "Write 4 lines about something that makes you brave 🦁",
  "A poem about your favorite color — what does it feel, smell, taste like? 🎨",
  "Write about a place that feels magical to you 🌟",
  "A poem where every line starts with a different letter of your name ✨",
  "Write about something you lost and then found 🔍",
  "Describe a storm from inside your house ⛈️",
  "A poem about growing up — what you're leaving behind, what's ahead 🌱",
  "Write about your hands and everything they can do 🙌",
];

export function PoetryCorner() {
  const STORAGE_KEY = "poetry-corner";
  const [poems, setPoems] = useState<
    { title: string; text: string; prompt: string }[]
  >(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [prompt, setPrompt] = useState(POEM_PROMPTS[0]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const randomPrompt = () =>
    setPrompt(POEM_PROMPTS[Math.floor(Math.random() * POEM_PROMPTS.length)]);

  const save = () => {
    if (!text.trim()) {
      toast.error("Write your poem first! ✏️");
      return;
    }
    const poem = {
      title: title.trim() || "Untitled Poem",
      text: text.trim(),
      prompt,
    };
    const updated = [poem, ...poems].slice(0, 20);
    setPoems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setTitle("");
    setText("");
    toast.success("Poem saved! 🌸");
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-coral-gp font-bold">
        Poetry Corner ✏️
      </h3>
      <p className="text-muted-foreground">
        Let your words flow! Poetry doesn't have to rhyme — it just has to be
        honest. 💖
      </p>
      <Card className="bg-coral-light-gp border-none">
        <CardContent className="p-4">
          <p className="text-sm font-bold text-coral-gp mb-1">
            Today's Prompt:
          </p>
          <p className="text-sm italic">{prompt}</p>
          <Button
            size="sm"
            variant="outline"
            className="mt-2 rounded-full border-coral-gp text-coral-gp"
            onClick={randomPrompt}
            data-ocid="poetry.secondary_button"
          >
            New Prompt 🎲
          </Button>
        </CardContent>
      </Card>
      <div>
        <p className="text-sm font-bold text-muted-foreground block mb-1">
          Poem Title (optional)
        </p>
        <input
          className="w-full px-3 py-2 rounded-lg border border-border focus:border-coral-gp outline-none text-sm bg-background mb-3"
          placeholder="Give your poem a name..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          data-ocid="poetry.input"
        />
        <Textarea
          placeholder="Start writing your poem here... 🌸"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          className="resize-none border-border focus:border-coral-gp"
          data-ocid="poetry.textarea"
        />
      </div>
      <Button
        onClick={save}
        className="bg-coral-gp text-white rounded-full self-start px-8"
        data-ocid="poetry.submit_button"
      >
        Save My Poem ✨
      </Button>
      {poems.length > 0 && (
        <div>
          <h4 className="font-display font-bold text-muted-foreground text-sm uppercase tracking-wider mb-3">
            My Poetry Collection
          </h4>
          <div className="grid gap-3 sm:grid-cols-2">
            {poems.map((p, i) => (
              <Card
                key={`${p.title}-${i}`}
                className="border-2 border-coral-light-gp"
                data-ocid={`poetry.item.${i + 1}`}
              >
                <CardContent className="p-4">
                  <p className="font-display font-bold text-coral-gp mb-2">
                    📜 {p.title}
                  </p>
                  <p className="text-sm whitespace-pre-line leading-relaxed">
                    {p.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ===== SECRET DIARY PROMPTS =====
const SECRET_PROMPTS = [
  "If I could have a superpower it would be... because...",
  "The bravest thing I ever did was...",
  "Something nobody knows about me is...",
  "My perfect dream day would look like...",
  "A person who changed my life is... because...",
  "Something I'm afraid of that I want to overcome is...",
  "If I could change one thing about the world it would be...",
  "The last time I laughed really hard was...",
  "Something I'm proud of that I never tell anyone is...",
  "My biggest dream for the future is...",
  "If I wrote a book about my life so far, the title would be...",
  "Something I wish my parents/teachers understood about me is...",
  "A mistake I made that I've forgiven myself for is...",
  "The quality I most want people to remember about me is...",
  "If I could speak to anyone in history for one hour, I'd choose...",
  "A habit I want to build (and why it matters to me) is...",
  "Something beautiful I noticed today was...",
  "A memory I never want to forget is...",
  "The way I feel about growing up is...",
  "Something I want to say but haven't found the courage yet is...",
  "What 'home' means to me is...",
  "If my feelings were colors right now, they'd be...",
  "A challenge that's making me stronger right now is...",
];

export function SecretDiaryPrompts() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [responses, setResponses] = useState<Record<number, string>>({});

  const next = () => setCurrentIdx((p) => (p + 1) % SECRET_PROMPTS.length);
  const prev = () =>
    setCurrentIdx(
      (p) => (p - 1 + SECRET_PROMPTS.length) % SECRET_PROMPTS.length,
    );
  const random = () => {
    let r = currentIdx;
    while (r === currentIdx)
      r = Math.floor(Math.random() * SECRET_PROMPTS.length);
    setCurrentIdx(r);
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-purple-gp font-bold">
        Secret Diary Prompts 📔
      </h3>
      <p className="text-muted-foreground">
        These prompts are just for you — no one else needs to read your answers.
        Be honest. Be brave.
      </p>
      <Card className="border-2 border-purple-gp">
        <CardContent className="p-6">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
            Prompt {currentIdx + 1} of {SECRET_PROMPTS.length}
          </p>
          <p className="font-display text-lg font-bold text-foreground mb-4">
            "{SECRET_PROMPTS[currentIdx]}"
          </p>
          <Textarea
            placeholder="Write your honest answer here... no judgment, just you 💜"
            value={responses[currentIdx] || ""}
            onChange={(e) =>
              setResponses((prev) => ({
                ...prev,
                [currentIdx]: e.target.value,
              }))
            }
            rows={4}
            className="resize-none border-purple-gp/30 focus:border-purple-gp"
            data-ocid="secretdiary.textarea"
          />
          <div className="flex gap-2 mt-3 flex-wrap">
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-purple-gp text-purple-gp"
              onClick={prev}
              data-ocid="secretdiary.secondary_button"
            >
              ← Prev
            </Button>
            <Button
              size="sm"
              className="bg-purple-gp text-white rounded-full"
              onClick={random}
              data-ocid="secretdiary.primary_button"
            >
              Random 🎲
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-purple-gp text-purple-gp"
              onClick={next}
              data-ocid="secretdiary.secondary_button"
            >
              Next →
            </Button>
          </div>
        </CardContent>
      </Card>
      {Object.values(responses).filter((v) => v?.trim()).length > 0 && (
        <p className="text-xs text-muted-foreground text-center">
          You've answered{" "}
          {Object.values(responses).filter((v) => v?.trim()).length} prompt
          {Object.values(responses).filter((v) => v?.trim()).length > 1
            ? "s"
            : ""}
          ! Keep going — every answer helps you understand yourself better. 💜
        </p>
      )}
    </div>
  );
}

// ===== ART JOURNALING =====
export function ArtJournaling() {
  const STORAGE_KEY = "art-journal-entries";
  const [entries, setEntries] = useState<
    { date: string; title: string; feeling: string; words: string }[]
  >(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [title, setTitle] = useState("");
  const [feeling, setFeeling] = useState("");
  const [words, setWords] = useState("");
  const FEELING_COLORS = [
    "🔴 Fire",
    "🔵 Ocean",
    "💚 Nature",
    "💛 Sunshine",
    "💜 Magic",
    "🖤 Mystery",
    "🩷 Love",
    "🤍 Peace",
  ];

  const save = () => {
    if (!words.trim()) {
      toast.error("Write something first!");
      return;
    }
    const entry = {
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      title: title.trim() || "Art Journal Entry",
      feeling,
      words: words.trim(),
    };
    const updated = [entry, ...entries].slice(0, 15);
    setEntries(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setTitle("");
    setFeeling("");
    setWords("");
    toast.success("Art journal saved! 🎨");
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-coral-gp font-bold">
        Art Journaling 🎨
      </h3>
      <p className="text-muted-foreground">
        Use colors and words to express how you feel — your journal is a work of
        art!
      </p>
      <Card className="border-2 border-coral-light-gp">
        <CardContent className="p-5 flex flex-col gap-4">
          <input
            className="w-full px-3 py-2 rounded-lg border border-border focus:border-coral-gp outline-none text-sm bg-background"
            placeholder="Entry title (e.g. 'Today I felt...')"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            data-ocid="artjournal.input"
          />
          <div>
            <p className="text-sm font-bold text-muted-foreground mb-2">
              My mood is like this color today:
            </p>
            <div className="flex flex-wrap gap-2">
              {FEELING_COLORS.map((c) => (
                <Button
                  key={c}
                  size="sm"
                  variant="outline"
                  className={`rounded-full text-xs ${feeling === c ? "bg-coral-gp text-white border-coral-gp" : "border-border hover:border-coral-gp"}`}
                  onClick={() => setFeeling(feeling === c ? "" : c)}
                  data-ocid="artjournal.toggle"
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>
          <Textarea
            placeholder="Write freely about how you feel. No rules — just you and your thoughts! 🌈"
            value={words}
            onChange={(e) => setWords(e.target.value)}
            rows={5}
            className="resize-none border-border focus:border-coral-gp"
            data-ocid="artjournal.textarea"
          />
          <Button
            onClick={save}
            className="bg-coral-gp text-white rounded-full self-start px-8"
            data-ocid="artjournal.submit_button"
          >
            Save Entry 🎨
          </Button>
        </CardContent>
      </Card>
      {entries.length > 0 && (
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-bold text-muted-foreground text-sm uppercase tracking-wider">
            My Art Journal
          </h4>
          {entries.map((e, i) => (
            <Card
              key={`${e.date}-${i}`}
              className={`border-2 ${i % 2 === 0 ? "border-coral-light-gp bg-coral-light-gp" : "border-purple-light-gp bg-purple-light-gp"}`}
              data-ocid={`artjournal.item.${i + 1}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-bold text-sm">
                    {e.title}
                  </span>
                  {e.feeling && (
                    <Badge variant="outline" className="text-xs">
                      {e.feeling}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{e.date}</p>
                <p className="text-sm mt-2 leading-relaxed">{e.words}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export function WritingFairyTales() {
  const [story, setStory] = useState({
    heroName: "",
    power: "",
    villain: "",
    magicItem: "",
    place: "",
    lesson: "",
  });
  const [generated, setGenerated] = useState("");

  const generate = () => {
    const { heroName, power, villain, magicItem, place, lesson } = story;
    if (!heroName) {
      toast.error("Give your hero a name first! 🦸‍♀️");
      return;
    }
    setGenerated(
      `Once upon a time in the magical land of ${place || "Sparkleton"}, there lived a brave girl named ${heroName}. She had the extraordinary power of ${power || "believing in herself"}, which made her unlike anyone else in the kingdom.

One dark day, the terrible ${villain || "Shadow Queen"} threatened to steal all joy from the land. Everyone was scared — except ${heroName}.

Armed with her ${magicItem || "golden compass of courage"}, ${heroName} journeyed through enchanted forests and across rainbow bridges. She faced her fears, helped strangers along the way, and discovered new strengths within herself.

When she finally faced the ${villain || "Shadow Queen"}, ${heroName} didn't fight with anger. Instead, she used her power with kindness and wisdom.

In the end, ${heroName} saved the kingdom and the people cheered: "${heroName}! ${heroName}! The girl who changed everything!"

And the lesson she taught everyone was: ${lesson || "true strength comes from love and believing in yourself"}.

✨ THE END ✨`,
    );
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-yellow-gp font-bold">
        Write Your Own Fairy Tale 🧚‍♀️
      </h3>
      <p className="text-muted-foreground">
        Fill in the blanks to create your very own girl-hero story!
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {[
          {
            key: "heroName",
            label: "Your Hero's Name",
            placeholder: "e.g. Zara, Luna, Sage...",
          },
          {
            key: "power",
            label: "Her Special Power",
            placeholder: "e.g. healing with music",
          },
          {
            key: "villain",
            label: "The Villain",
            placeholder: "e.g. the Storm Witch",
          },
          {
            key: "magicItem",
            label: "Her Magic Item",
            placeholder: "e.g. enchanted paintbrush",
          },
          {
            key: "place",
            label: "Magical Place Name",
            placeholder: "e.g. Crystal Valley",
          },
          {
            key: "lesson",
            label: "Lesson of the Story",
            placeholder: "e.g. kindness wins",
          },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label
              htmlFor={`fairy-${key}`}
              className="text-sm font-bold text-muted-foreground block mb-1"
            >
              {label}
            </label>
            <input
              id={`fairy-${key}`}
              className="w-full px-3 py-2 rounded-lg border border-border focus:border-yellow-gp outline-none text-sm bg-background"
              placeholder={placeholder}
              value={story[key as keyof typeof story]}
              onChange={(e) =>
                setStory((prev) => ({ ...prev, [key]: e.target.value }))
              }
              data-ocid="fairytale.input"
            />
          </div>
        ))}
      </div>

      <Button
        onClick={generate}
        className="bg-yellow-gp text-foreground font-bold rounded-full self-start px-8"
        data-ocid="fairytale.primary_button"
      >
        Create My Story ✨
      </Button>

      {generated && (
        <Card className="bg-yellow-light-gp border-none">
          <CardContent className="p-6 whitespace-pre-line text-sm leading-relaxed font-reading">
            {generated}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
