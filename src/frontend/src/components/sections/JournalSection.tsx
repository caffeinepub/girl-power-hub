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
