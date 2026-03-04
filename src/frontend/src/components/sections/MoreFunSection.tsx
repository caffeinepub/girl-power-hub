import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddBookPick,
  useAddPostIt,
  useGetAllPostIts,
  useGetBookPicks,
} from "@/hooks/useQueries";
import { useState } from "react";
import { toast } from "sonner";

// ===== BOOK CLUB =====
const STAR_RATINGS = [1, 2, 3, 4, 5];

export function BookClub() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const { data: books = [], isLoading } = useGetBookPicks();
  const addBook = useAddBookPick();

  const handleAdd = async () => {
    if (!title.trim() || !author.trim()) {
      toast.error("Add a title and author!");
      return;
    }
    await addBook.mutateAsync({
      title: title.trim(),
      author: author.trim(),
      review: review.trim(),
      rating: BigInt(rating),
    });
    setTitle("");
    setAuthor("");
    setReview("");
    setRating(5);
    toast.success("Book added to the club! 📚");
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-teal-gp font-bold">
        Book Club 📚
      </h3>
      <Card className="border-2 border-teal-light-gp">
        <CardContent className="p-5 flex flex-col gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              placeholder="Book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-border focus:border-teal-gp"
              data-ocid="book.input"
            />
            <Input
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-border focus:border-teal-gp"
            />
          </div>
          <Textarea
            placeholder="Your review (what did you love?)"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={2}
            className="resize-none"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-muted-foreground">
              Rating:
            </span>
            {STAR_RATINGS.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setRating(s)}
                className={`text-xl transition-transform hover:scale-125 ${s <= rating ? "opacity-100" : "opacity-30"}`}
                data-ocid="book.toggle"
              >
                ⭐
              </button>
            ))}
          </div>
          <Button
            onClick={handleAdd}
            disabled={addBook.isPending}
            className="bg-teal-gp text-white rounded-full self-start px-8"
            data-ocid="book.submit_button"
          >
            Add to Book Club 📚
          </Button>
        </CardContent>
      </Card>

      {isLoading ? (
        <div
          className="text-center text-muted-foreground py-4"
          data-ocid="book.loading_state"
        >
          Loading books... 📖
        </div>
      ) : books.length === 0 ? (
        <div
          className="text-center py-8 text-muted-foreground bg-muted rounded-xl"
          data-ocid="book.empty_state"
        >
          <div className="text-4xl mb-2">📚</div>
          <p className="font-display font-bold">
            No books yet! Be the first to add a pick!
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book, i) => (
            <Card
              key={String(book.title) + String(book.author)}
              className="border-2 border-teal-light-gp card-hover"
              data-ocid={`book.item.${i + 1}`}
            >
              <CardContent className="p-4">
                <h4 className="font-display font-bold text-sm text-teal-gp">
                  {book.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  by {book.author}
                </p>
                <div className="text-sm my-1">
                  {Array.from({ length: Number(book.rating) }).map((_, j) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: decorative stars have no unique content
                    <span key={j}>⭐</span>
                  ))}
                </div>
                {book.review && (
                  <p className="text-xs text-muted-foreground italic">
                    "{book.review}"
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== POSITIVE POST-ITS =====
const POST_IT_COLORS = [
  {
    label: "Pink 🩷",
    value: "pink",
    bg: "bg-pink-light-gp",
    border: "border-pink-gp",
  },
  {
    label: "Yellow 💛",
    value: "yellow",
    bg: "bg-yellow-light-gp",
    border: "border-yellow-gp",
  },
  {
    label: "Teal 🩵",
    value: "teal",
    bg: "bg-teal-light-gp",
    border: "border-teal-gp",
  },
  {
    label: "Purple 💜",
    value: "purple",
    bg: "bg-purple-light-gp",
    border: "border-purple-gp",
  },
  {
    label: "Coral 🧡",
    value: "coral",
    bg: "bg-coral-light-gp",
    border: "border-coral-gp",
  },
];

export function PositivePostIts() {
  const [note, setNote] = useState("");
  const [color, setColor] = useState("pink");
  const { data: postIts = [], isLoading } = useGetAllPostIts();
  const addPostIt = useAddPostIt();

  const handleAdd = async () => {
    if (!note.trim()) {
      toast.error("Write a note first! 📝");
      return;
    }
    await addPostIt.mutateAsync({ note: note.trim(), color });
    setNote("");
    toast.success("Note posted on the board! 📌");
  };

  const getStyle = (c: string) =>
    POST_IT_COLORS.find((p) => p.value === c) || POST_IT_COLORS[0];

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-yellow-gp font-bold">
        Positive Post-its 📌
      </h3>
      <Card className="border-2 border-yellow-light-gp">
        <CardContent className="p-5 flex flex-col gap-3">
          <Textarea
            placeholder="Write a happy thought, affirmation, or note for the board! ✨"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="resize-none"
            data-ocid="postit.textarea"
          />
          <div className="flex gap-2 flex-wrap">
            {POST_IT_COLORS.map((c) => (
              <Button
                key={c.value}
                size="sm"
                variant="outline"
                className={`rounded-full ${color === c.value ? `${c.bg} ${c.border} font-bold` : "border-border"}`}
                onClick={() => setColor(c.value)}
                data-ocid="postit.toggle"
              >
                {c.label}
              </Button>
            ))}
          </div>
          <Button
            onClick={handleAdd}
            disabled={addPostIt.isPending}
            className="bg-yellow-gp text-foreground font-bold rounded-full self-start px-8"
            data-ocid="postit.submit_button"
          >
            Post It! 📌
          </Button>
        </CardContent>
      </Card>

      {isLoading ? (
        <div
          className="text-center text-muted-foreground py-4"
          data-ocid="postit.loading_state"
        >
          Loading board... 📌
        </div>
      ) : postIts.length === 0 ? (
        <div
          className="text-center py-8 text-muted-foreground bg-muted rounded-xl"
          data-ocid="postit.empty_state"
        >
          <div className="text-4xl mb-2">📌</div>
          <p className="font-display font-bold">
            The corkboard is empty! Be the first to post a happy thought!
          </p>
        </div>
      ) : (
        <div>
          <h4 className="font-display font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">
            The Happiness Board 🌟
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {postIts.map((p, i) => {
              const style = getStyle(p.color);
              return (
                <div
                  key={p.note.slice(0, 20) + p.color}
                  className={`${style.bg} border-2 ${style.border} rounded-xl p-4 text-sm font-reading leading-relaxed shadow-sm hover:shadow-md transition-shadow float-animation`}
                  style={{ animationDelay: `${i * 0.3}s` }}
                  data-ocid={`postit.item.${i + 1}`}
                >
                  {p.note}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ===== WRITE YOUR OWN COMIC =====
export function WriteYourOwnComic() {
  const [panels, setPanels] = useState([
    { id: "p1", scene: "", dialogue: "" },
    { id: "p2", scene: "", dialogue: "" },
    { id: "p3", scene: "", dialogue: "" },
  ]);
  const [title, setTitle] = useState("");
  const [heroName, setHeroName] = useState("");

  const updatePanel = (i: number, field: "scene" | "dialogue", val: string) => {
    setPanels((prev) => {
      const n = [...prev];
      n[i] = { ...n[i], [field]: val };
      return n;
    });
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-purple-gp font-bold">
        Write Your Own Comic! 🦸‍♀️
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label
            htmlFor="comic-title"
            className="text-sm font-bold text-muted-foreground block mb-1"
          >
            Comic Title
          </label>
          <Input
            id="comic-title"
            placeholder="The Amazing Adventures of..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-purple-gp"
            data-ocid="comic.input"
          />
        </div>
        <div>
          <label
            htmlFor="comic-hero"
            className="text-sm font-bold text-muted-foreground block mb-1"
          >
            Hero's Name
          </label>
          <Input
            id="comic-hero"
            placeholder="What is your hero called?"
            value={heroName}
            onChange={(e) => setHeroName(e.target.value)}
            className="border-purple-gp"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {panels.map((panel, i) => (
          <div key={panel.id} className="flex flex-col gap-2">
            <div className="font-display font-bold text-purple-gp text-sm">
              Panel {i + 1}
            </div>
            <div className="border-4 border-foreground rounded-lg aspect-square bg-white flex flex-col p-2 gap-1 relative overflow-hidden">
              <div className="flex-1 bg-purple-light-gp rounded-md flex items-center justify-center">
                <span className="text-xs text-muted-foreground text-center px-2">
                  {panel.scene || "🎨 Describe the scene..."}
                </span>
              </div>
              <div className="border-2 border-foreground rounded bg-white p-1">
                <span className="text-xs">
                  {panel.dialogue
                    ? `"${panel.dialogue}"`
                    : "💬 Dialogue here..."}
                </span>
              </div>
            </div>
            <Input
              placeholder="Describe the scene..."
              value={panel.scene}
              onChange={(e) => updatePanel(i, "scene", e.target.value)}
              className="text-xs border-purple-light-gp"
            />
            <Input
              placeholder="Character's words..."
              value={panel.dialogue}
              onChange={(e) => updatePanel(i, "dialogue", e.target.value)}
              className="text-xs border-purple-light-gp"
            />
          </div>
        ))}
      </div>

      {title && (
        <Card
          className="bg-purple-light-gp border-2 border-purple-gp"
          data-ocid="comic.panel"
        >
          <CardContent className="p-4 text-center">
            <h4 className="font-display text-lg font-bold text-purple-gp">
              "{title}"
            </h4>
            {heroName && (
              <p className="text-sm text-muted-foreground">
                Starring: {heroName} 🦸‍♀️
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Fill in all panels above to create your comic story!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ===== MAGIC TRICKS =====
const TRICKS = [
  {
    name: "The Disappearing Coin 🪙",
    steps: [
      "Hold a coin in your right hand, showing the audience",
      "Pretend to transfer it to your left hand, but actually keep it in your right",
      "Close your left fist tightly (empty!)",
      "Say magic words while pointing dramatically at your closed left fist",
      "Open your left hand... EMPTY! The coin vanished!",
      "Secretly drop the coin in your pocket with your right hand",
    ],
    secret:
      "The secret is the 'French Drop' technique — the coin stays in your right hand the whole time!",
  },
  {
    name: "Predict the Future ✨",
    steps: [
      "Before the trick, write a number on a paper and fold it",
      "Ask someone to: think of a number 1-10, double it, add 10, divide by 2, subtract original number",
      "The answer is ALWAYS 5 — no matter what number they start with!",
      "Unfold your paper to reveal you predicted '5'!",
    ],
    secret: "This is math magic! The operations always cancel out, leaving 5.",
  },
  {
    name: "The Invisible String 🎭",
    steps: [
      "Show a piece of string and 'cut' it in the middle with scissors",
      "Bunch up the string — but secretly fold one end so it looks cut",
      "Hold the folded piece, say magic words",
      "Shake and pull — the string is RESTORED!",
      "The secret: you never actually cut the string. Just fold it cleverly!",
    ],
    secret:
      "Practice the fold in a mirror until it looks convincing from the audience's view.",
  },
];

export function MagicTricks() {
  const [selected, setSelected] = useState<number | null>(null);
  const [showSecret, setShowSecret] = useState<boolean[]>(
    new Array(TRICKS.length).fill(false),
  );

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-yellow-gp font-bold">
        Magic Tricks 🪄
      </h3>
      <p className="text-muted-foreground">
        Learn these tricks and amaze your friends! Never reveal your secrets...
        🤫
      </p>
      <div className="flex gap-2 flex-wrap">
        {TRICKS.map((trick, i) => (
          <Button
            key={trick.name}
            size="sm"
            variant={selected === i ? "default" : "outline"}
            className={`rounded-full ${selected === i ? "bg-yellow-gp text-foreground" : "border-yellow-gp text-yellow-gp"}`}
            onClick={() => setSelected(selected === i ? null : i)}
            data-ocid={`magic.item.${i + 1}`}
          >
            {trick.name}
          </Button>
        ))}
      </div>

      {selected !== null && (
        <Card className="border-2 border-yellow-gp bg-yellow-light-gp">
          <CardContent className="p-5">
            <h4 className="font-display font-bold text-yellow-gp mb-3">
              {TRICKS[selected].name}
            </h4>
            <ol className="flex flex-col gap-2 mb-4">
              {TRICKS[selected].steps.map((step, si) => (
                <li key={step} className="flex gap-2 text-sm">
                  <span className="w-6 h-6 rounded-full bg-yellow-gp text-white text-xs flex items-center justify-center shrink-0 font-bold">
                    {si + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <Button
              size="sm"
              variant="outline"
              className="border-yellow-gp text-yellow-gp rounded-full"
              onClick={() =>
                setShowSecret((prev) => {
                  const n = [...prev];
                  n[selected] = !n[selected];
                  return n;
                })
              }
              data-ocid="magic.toggle"
            >
              {showSecret[selected] ? "Hide Secret 🙈" : "Reveal Secret! 🤫"}
            </Button>
            {showSecret[selected] && (
              <Card className="mt-3 border-none bg-white/70">
                <CardContent className="p-3 text-sm italic text-muted-foreground">
                  🤫 <strong>Secret:</strong> {TRICKS[selected].secret}
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ===== SPA NIGHT AT HOME =====
export function SpaNight() {
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>(
    new Array(8).fill(false),
  );
  const routine = [
    "🛁 Draw a warm bath or prepare a foot soak with Epsom salts",
    "💦 Start with a gentle cleanser to wash your face",
    "💆 Apply a face mask (yogurt + honey works great!)",
    "💅 While mask sets, give yourself a mini manicure",
    "🌊 Rinse mask off, then apply moisturizer",
    "🧴 Do a gentle head massage with your fingers",
    "🕯️ Light a candle (with permission!) and play relaxing music",
    "😌 Do 5 minutes of deep breathing before bed",
  ];

  const faceMasks = [
    {
      name: "Honey Oat Mask 🍯",
      ingredients: "2 tbsp oatmeal + 1 tbsp honey + 1 tbsp yogurt",
      benefit: "Moisturizing & calming",
    },
    {
      name: "Avocado Glow 🥑",
      ingredients: "1/2 mashed avocado + 1 tsp honey + 1 tsp lemon juice",
      benefit: "Hydrating & brightening",
    },
    {
      name: "Banana Smoothing 🍌",
      ingredients:
        "1/2 mashed banana + 1 tbsp olive oil + 1 tsp sugar (exfoliant)",
      benefit: "Smoothing & brightening",
    },
  ];

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-pink-gp font-bold">
        Spa Night at Home 🛁
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-2 border-pink-light-gp">
          <CardContent className="p-4">
            <h4 className="font-display font-bold text-pink-gp mb-3">
              Spa Night Routine
            </h4>
            {routine.map((step, i) => (
              <button
                key={step}
                type="button"
                className="flex items-center gap-2 mb-2 cursor-pointer text-left w-full bg-transparent border-0 p-0"
                onClick={() =>
                  setCheckedSteps((prev) => {
                    const n = [...prev];
                    n[i] = !n[i];
                    return n;
                  })
                }
                data-ocid={`spa.checkbox.${i + 1}`}
              >
                <Checkbox
                  checked={checkedSteps[i]}
                  className="border-pink-gp data-[state=checked]:bg-pink-gp"
                />
                <span
                  className={`text-sm ${checkedSteps[i] ? "line-through text-muted-foreground" : ""}`}
                >
                  {step}
                </span>
              </button>
            ))}
          </CardContent>
        </Card>
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-bold text-pink-gp">
            DIY Face Masks 🧴
          </h4>
          {faceMasks.map((mask, i) => (
            <Card
              key={mask.name}
              className="bg-pink-light-gp border-none"
              data-ocid={`spa.item.${i + 1}`}
            >
              <CardContent className="p-3">
                <p className="font-bold text-sm text-pink-gp">{mask.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {mask.ingredients}
                </p>
                <Badge variant="outline" className="text-xs mt-1">
                  {mask.benefit}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== MINI OLYMPICS =====
export function MiniOlympics() {
  const events = [
    {
      name: "Hula Hoop Contest 🌀",
      desc: "Who can hula hoop the longest without dropping it?",
    },
    { name: "Sack Race 👟", desc: "Classic pillowcase race across the yard!" },
    {
      name: "Balloon Pop 🎈",
      desc: "Stomp to pop — last balloon standing wins!",
    },
    {
      name: "Water Balloon Toss 💦",
      desc: "Throw without bursting! Take one step back each round.",
    },
    { name: "Hoop Shooting 🏀", desc: "Most baskets in 60 seconds wins!" },
    {
      name: "Three-Legged Race 👯",
      desc: "Tie ankles with a partner and race across the finish line!",
    },
    {
      name: "Long Jump Challenge 🦘",
      desc: "Mark your start, jump with both feet, measure the distance!",
    },
    {
      name: "Obstacle Course 🏃‍♀️",
      desc: "Set up cones, hula hoops, and hurdles. Fastest time wins!",
    },
  ];

  const [scores, setScores] = useState<Record<string, string>>({});

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-coral-gp font-bold">
        Mini Olympics 🏅
      </h3>
      <p className="text-muted-foreground">
        Set up these backyard events and keep score! Every winner gets a gold
        star! ⭐
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {events.map((event, i) => (
          <Card
            key={event.name}
            className="border-2 border-coral-light-gp"
            data-ocid={`olympics.item.${i + 1}`}
          >
            <CardContent className="p-3 flex flex-col gap-2">
              <h4 className="font-display font-bold text-sm text-coral-gp">
                {event.name}
              </h4>
              <p className="text-xs text-muted-foreground">{event.desc}</p>
              <Input
                placeholder="Winner's name"
                value={scores[event.name] || ""}
                onChange={(e) =>
                  setScores((prev) => ({
                    ...prev,
                    [event.name]: e.target.value,
                  }))
                }
                className="text-xs h-8 border-coral-gp"
              />
            </CardContent>
          </Card>
        ))}
      </div>
      {Object.values(scores).filter(Boolean).length > 0 && (
        <Card
          className="bg-coral-light-gp border-none"
          data-ocid="olympics.panel"
        >
          <CardContent className="p-4">
            <h4 className="font-display font-bold text-coral-gp mb-2">
              🏆 Today's Champions!
            </h4>
            {Object.entries(scores)
              .filter(([, v]) => v)
              .map(([event, winner]) => (
                <div
                  key={event}
                  className="text-sm flex justify-between py-1 border-b border-border last:border-0"
                >
                  <span>{event}</span>
                  <span className="font-bold text-coral-gp">⭐ {winner}</span>
                </div>
              ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ===== STUFFED ANIMAL TEA PARTY =====
export function StuffedAnimalTeaParty() {
  const [guests, setGuests] = useState<string[]>(["Bunny", "Bear", "Unicorn"]);
  const [newGuest, setNewGuest] = useState("");
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>(
    new Array(8).fill(false),
  );

  const steps = [
    "Choose a table or blanket on the floor for your tea party",
    "Set a place for each stuffed animal with a small cup and plate",
    "Decorate with flowers, paper butterflies, or a pretty tablecloth",
    "Prepare your menu: apple slices, crackers, raisins, juice in tiny cups",
    "Dress up your stuffed animals — use doll clothes or tie a ribbon bow",
    "Introduce each guest officially: 'This is Bunny, lover of carrots!'",
    "Pour tea for everyone and say 'Cheers!' 🍵",
    "Play soft music and take photos of your tea party crew!",
  ];

  const addGuest = () => {
    if (newGuest.trim()) {
      setGuests((prev) => [...prev, newGuest.trim()]);
      setNewGuest("");
    }
  };

  const removeGuest = (i: number) => {
    setGuests((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-yellow-gp font-bold">
        🧸 Stuffed Animal Tea Party
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-bold text-yellow-gp">
            Guest List 📋
          </h4>
          <div className="flex gap-2">
            <Input
              placeholder="Stuffed animal name..."
              value={newGuest}
              onChange={(e) => setNewGuest(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addGuest()}
              className="border-yellow-gp"
              data-ocid="teaparty.input"
            />
            <Button
              onClick={addGuest}
              className="bg-yellow-gp text-foreground font-bold rounded-full shrink-0"
              data-ocid="teaparty.primary_button"
            >
              + Add
            </Button>
          </div>
          <Card className="bg-yellow-light-gp border-none">
            <CardContent className="p-4">
              {guests.length === 0 ? (
                <p
                  className="text-sm text-muted-foreground text-center"
                  data-ocid="teaparty.empty_state"
                >
                  No guests yet! Add your stuffed animals above.
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {guests.map((g, i) => (
                    <div
                      key={g + String(i)}
                      className="flex items-center justify-between text-sm"
                      data-ocid={`teaparty.item.${i + 1}`}
                    >
                      <span>🧸 {g}</span>
                      <button
                        type="button"
                        onClick={() => removeGuest(i)}
                        className="text-muted-foreground hover:text-destructive text-xs"
                        data-ocid={`teaparty.delete_button.${i + 1}`}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <Separator className="my-1" />
                  <p className="text-xs font-bold text-yellow-gp">
                    {guests.length} guests attending! 🎉
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="border-2 border-yellow-gp">
            <CardContent className="p-4">
              <h5 className="font-display font-bold text-yellow-gp mb-2">
                🍽️ Menu Ideas
              </h5>
              <ul className="text-sm space-y-1">
                <li>• Mini sandwiches (cucumber, PB&amp;J, cream cheese)</li>
                <li>• Apple slices with honey dip</li>
                <li>• Goldfish crackers or animal crackers</li>
                <li>• Fruit skewers or raisins</li>
                <li>• Juice, lemonade, or herbal tea</li>
                <li>• Mini cupcakes for dessert! 🧁</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-bold text-yellow-gp">
            Setup Checklist ✅
          </h4>
          {steps.map((step, i) => (
            <button
              key={step}
              type="button"
              className="flex items-center gap-2 cursor-pointer text-left w-full bg-transparent border-0 p-0"
              onClick={() =>
                setCheckedSteps((prev) => {
                  const n = [...prev];
                  n[i] = !n[i];
                  return n;
                })
              }
              data-ocid={`teaparty.checkbox.${i + 1}`}
            >
              <Checkbox
                checked={checkedSteps[i]}
                className="border-yellow-gp data-[state=checked]:bg-yellow-gp shrink-0"
              />
              <span
                className={`text-sm ${checkedSteps[i] ? "line-through text-muted-foreground" : ""}`}
              >
                {step}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== MOVIE NIGHT POPCORN =====
const TOPPINGS = [
  {
    id: "chocolate",
    label: "Chocolate Drizzle 🍫",
    desc: "Melt chocolate chips + drizzle over",
  },
  {
    id: "cheese",
    label: "Cheesy Butter 🧀",
    desc: "Melted butter + nutritional yeast + garlic powder",
  },
  {
    id: "cinnamon",
    label: "Cinnamon Sugar 🍂",
    desc: "Butter + cinnamon + sugar = magic",
  },
  {
    id: "spicy",
    label: "Spicy Lime 🌶️",
    desc: "Butter + cayenne + lime juice + salt",
  },
  {
    id: "birthday",
    label: "Birthday Cake 🎂",
    desc: "Butter + rainbow sprinkles + vanilla extract",
  },
  {
    id: "caramel",
    label: "Caramel Sea Salt 🍯",
    desc: "Drizzle caramel sauce + pinch of sea salt",
  },
  {
    id: "ranch",
    label: "Ranch Flavor 🌿",
    desc: "Butter + ranch seasoning packet",
  },
  {
    id: "sriracha",
    label: "Sweet Sriracha 🔥",
    desc: "Honey + sriracha + butter — sweet and spicy!",
  },
];

export function MovieNightPopcorn() {
  const [bowl, setBowl] = useState<string[]>([]);

  const toggle = (id: string) => {
    setBowl((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-coral-gp font-bold">
        🍿 Movie Night Popcorn
      </h3>
      <p className="text-muted-foreground">
        Build your ultimate popcorn bowl! Click toppings to add them.
      </p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {TOPPINGS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`p-3 rounded-xl border-2 cursor-pointer transition-all text-left w-full ${bowl.includes(t.id) ? "bg-coral-light-gp border-coral-gp" : "border-border hover:border-coral-gp"}`}
            onClick={() => toggle(t.id)}
            data-ocid="popcorn.toggle"
          >
            <p className="font-bold text-sm">{t.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
            {bowl.includes(t.id) && (
              <p className="text-xs text-coral-gp font-bold mt-1">
                ✓ In your bowl!
              </p>
            )}
          </button>
        ))}
      </div>
      <Card
        className={`border-2 ${bowl.length > 0 ? "border-coral-gp bg-coral-light-gp" : "border-border"}`}
        data-ocid="popcorn.panel"
      >
        <CardContent className="p-4 text-center">
          <div className="text-4xl mb-2">🍿</div>
          {bowl.length === 0 ? (
            <p
              className="text-muted-foreground text-sm"
              data-ocid="popcorn.empty_state"
            >
              Click toppings to add them to your bowl!
            </p>
          ) : (
            <>
              <p className="font-display font-bold text-coral-gp mb-2">
                Your Popcorn Bowl:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {bowl.map((id) => {
                  const t = TOPPINGS.find((tp) => tp.id === id);
                  return (
                    <Badge key={id} className="bg-coral-gp text-white">
                      {t?.label}
                    </Badge>
                  );
                })}
              </div>
              {bowl.length >= 2 && (
                <p className="text-xs text-coral-gp mt-2 font-bold">
                  {bowl.length === 2
                    ? "Nice combo! 🎬"
                    : bowl.length === 3
                      ? "Perfect triple combo! 🎉"
                      : "Wow, you love toppings! 🍿"}
                </p>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ===== LEARNING SIGN LANGUAGE =====
const ASL_ALPHABET: Record<string, string> = {
  A: "Make a fist, thumb alongside fingers",
  B: "Hold fingers straight up together, thumb tucked in",
  C: "Curve hand into a C shape",
  D: "Index finger up, other fingers curved to touch thumb",
  E: "Fingers bent down, thumb tucked under",
  F: "Index touches thumb to form circle, others spread out",
  G: "Index and thumb point sideways",
  H: "Index and middle fingers point sideways together",
  I: "Pinky finger up, others in fist",
  J: "Like I but draw a J in the air",
  K: "Index and middle finger up in V, thumb between them",
  L: "L-shape: index finger up, thumb out",
  M: "Three fingers folded over thumb",
  N: "Two fingers folded over thumb",
  O: "All fingers and thumb form an O",
  P: "Like K but pointed downward",
  Q: "Like G but pointed downward",
  R: "Index and middle fingers crossed",
  S: "Fist with thumb over fingers",
  T: "Fist with thumb between index and middle finger",
  U: "Index and middle finger up together",
  V: "Index and middle finger up in a V (peace sign!)",
  W: "Three middle fingers spread up",
  X: "Index finger hooked/crooked",
  Y: "Pinky and thumb out, others curled",
  Z: "Draw a Z in the air with your index finger",
};

const ASL_WORDS: Record<string, string> = {
  Hello: "Open hand near forehead, wave it outward (like a salute wave)",
  "Thank You": "Touch fingertips to chin, extend hand outward toward person",
  Friend: "Hook index fingers together, then swap",
  Love: "Cross arms over chest, like hugging yourself",
  Please: "Rub flat hand in a circle on your chest",
  Sorry: "Make an A fist and rub in a circle on your chest",
  Yes: "Make an S fist and nod it up and down",
  No: "Index and middle finger snap to thumb twice",
};

export function LearningSignLanguage() {
  const [activeTab, setActiveTab] = useState<"alphabet" | "words">("alphabet");
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-teal-gp font-bold">
        🤟 Learning Sign Language (ASL)
      </h3>
      <p className="text-muted-foreground">
        Click any letter or word to see how to sign it!
      </p>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={activeTab === "alphabet" ? "default" : "outline"}
          className={`rounded-full ${activeTab === "alphabet" ? "bg-teal-gp text-white" : "border-teal-gp text-teal-gp"}`}
          onClick={() => {
            setActiveTab("alphabet");
            setSelected(null);
          }}
          data-ocid="asl.tab"
        >
          ABC Alphabet
        </Button>
        <Button
          size="sm"
          variant={activeTab === "words" ? "default" : "outline"}
          className={`rounded-full ${activeTab === "words" ? "bg-teal-gp text-white" : "border-teal-gp text-teal-gp"}`}
          onClick={() => {
            setActiveTab("words");
            setSelected(null);
          }}
          data-ocid="asl.tab"
        >
          Common Words
        </Button>
      </div>
      {activeTab === "alphabet" ? (
        <>
          <div className="grid grid-cols-6 sm:grid-cols-9 gap-2">
            {Object.keys(ASL_ALPHABET).map((letter) => (
              <button
                key={letter}
                type="button"
                className={`h-10 w-10 rounded-xl border-2 font-display font-bold text-sm transition-all ${selected === letter ? "bg-teal-gp text-white border-teal-gp" : "border-border hover:border-teal-gp hover:bg-teal-light-gp"}`}
                onClick={() => setSelected(selected === letter ? null : letter)}
                data-ocid="asl.toggle"
              >
                {letter}
              </button>
            ))}
          </div>
          {selected && ASL_ALPHABET[selected] && (
            <Card
              className="bg-teal-light-gp border-2 border-teal-gp"
              data-ocid="asl.panel"
            >
              <CardContent className="p-4">
                <p className="font-display text-3xl font-bold text-teal-gp mb-1">
                  {selected}
                </p>
                <p className="text-sm">👋 {ASL_ALPHABET[selected]}</p>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2">
          {Object.entries(ASL_WORDS).map(([word, desc]) => (
            <button
              key={word}
              type="button"
              className={`p-3 rounded-xl border-2 cursor-pointer transition-all text-left w-full ${selected === word ? "bg-teal-light-gp border-teal-gp" : "border-border hover:border-teal-gp"}`}
              onClick={() => setSelected(selected === word ? null : word)}
              data-ocid="asl.toggle"
            >
              <p className="font-bold text-sm text-teal-gp">{word}</p>
              {selected === word && (
                <p className="text-xs mt-1 text-foreground">👋 {desc}</p>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== PHOTOGRAPHY CLUB =====
const PHOTO_CHALLENGES = [
  "Take a photo of something that makes you smile 😊",
  "Find a symmetrical pattern in nature 🌿",
  "Photograph from a bug's eye view (get low!) 🐛",
  "Photograph the same thing in morning and evening light ☀️",
  "Find 3 different shades of one color in nature 🟢",
  "Take a reflection photo (puddle, window, spoon) 💧",
  "Capture movement — leaves in wind, running water 🌊",
  "Find the perfect golden hour sunset light 🌅",
  "Create a flat lay of 5 things you love 💖",
  "Take a portrait of a pet or stuffed animal 🐾",
];

export function PhotographyClub() {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(PHOTO_CHALLENGES.length).fill(false),
  );
  const count = checked.filter(Boolean).length;

  const tips = [
    {
      title: "Rule of Thirds",
      desc: "Imagine a 3x3 grid — put your subject at an intersection, not the center",
    },
    {
      title: "Golden Hour",
      desc: "Shoot just after sunrise or before sunset for warm, magical light",
    },
    {
      title: "Fill the Frame",
      desc: "Get close to your subject and fill the entire photo for impact",
    },
    {
      title: "Leading Lines",
      desc: "Use roads, fences, rivers to draw the viewer's eye into the photo",
    },
  ];

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-purple-gp font-bold">
        📸 Photography Club
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h4 className="font-display font-bold text-purple-gp mb-3">
            Composition Rules 🎨
          </h4>
          <div className="flex flex-col gap-2">
            {tips.map((tip, i) => (
              <Card
                key={tip.title}
                className="bg-purple-light-gp border-none"
                data-ocid={`photo.item.${i + 1}`}
              >
                <CardContent className="p-3">
                  <p className="font-bold text-sm text-purple-gp">
                    {tip.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {tip.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-display font-bold text-purple-gp">
              Photo Challenges ✅
            </h4>
            <Badge className="bg-purple-gp text-white">
              {count}/{PHOTO_CHALLENGES.length}
            </Badge>
          </div>
          <div className="flex flex-col gap-2">
            {PHOTO_CHALLENGES.map((challenge, i) => (
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
                data-ocid={`photo.checkbox.${i + 1}`}
              >
                <Checkbox
                  checked={checked[i]}
                  className="border-purple-gp data-[state=checked]:bg-purple-gp shrink-0"
                />
                <span
                  className={`text-xs ${checked[i] ? "line-through text-muted-foreground" : ""}`}
                >
                  {challenge}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== SECRET HANDSHAKES =====
const HANDSHAKE_MOVES = [
  "🤜 Fist Bump",
  "👋 High Five",
  "👐 Double High Five",
  "🫳 Low Five",
  "🤞 Finger Snap",
  "👊 Elbow Bump",
  "✌️ Peace Sign",
  "🤙 Hang Loose",
  "👈 Point and Wink",
  "🤸 Wiggle Fingers",
  "💥 Explosion Fist",
  "🎉 Jazz Hands",
];

export function SecretHandshakes() {
  const [sequence, setSequence] = useState<string[]>([]);

  const addMove = (move: string) => setSequence((prev) => [...prev, move]);
  const reset = () => setSequence([]);

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-coral-gp font-bold">
        🤝 Secret Handshake Creator
      </h3>
      <p className="text-muted-foreground">
        Build your BFF signature handshake! Click moves to add them to your
        sequence.
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {HANDSHAKE_MOVES.map((move) => (
          <Button
            key={move}
            size="sm"
            variant="outline"
            className="rounded-full text-xs border-coral-gp text-coral-gp hover:bg-coral-light-gp"
            onClick={() => addMove(move)}
            data-ocid="handshake.secondary_button"
          >
            {move}
          </Button>
        ))}
      </div>
      <Card
        className={`border-2 ${sequence.length > 0 ? "border-coral-gp bg-coral-light-gp" : "border-border"}`}
        data-ocid="handshake.panel"
      >
        <CardContent className="p-4">
          <h4 className="font-display font-bold text-coral-gp mb-3">
            Your Handshake Sequence 🤝
          </h4>
          {sequence.length === 0 ? (
            <p
              className="text-muted-foreground text-sm"
              data-ocid="handshake.empty_state"
            >
              No moves yet! Click a move above to start building.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {sequence.map((move, i) => {
                const occurrenceKey = `${move}-${sequence.slice(0, i + 1).filter((m) => m === move).length}`;
                return (
                  <div
                    key={occurrenceKey}
                    className="flex items-center gap-1"
                    data-ocid={`handshake.item.${i + 1}`}
                  >
                    <Badge className="bg-coral-gp text-white">
                      {i + 1}. {move}
                    </Badge>
                    {i < sequence.length - 1 && (
                      <span className="text-coral-gp font-bold text-xs">→</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
      {sequence.length > 0 && (
        <div className="flex gap-2 items-center">
          <Button
            size="sm"
            variant="outline"
            className="rounded-full border-coral-gp text-coral-gp"
            onClick={reset}
            data-ocid="handshake.delete_button"
          >
            Reset
          </Button>
          <p className="text-xs text-muted-foreground">
            Practice with your bestie until you both know it by heart! 💖
          </p>
        </div>
      )}
    </div>
  );
}

// ===== BACKYARD CAMPING =====
const CAMPING_PACKLIST = [
  "Tent or tarp + poles",
  "Sleeping bag or blankets",
  "Pillow",
  "Flashlight or lantern",
  "Bug spray",
  "Sunscreen",
  "Water bottle",
  "Snacks for the campfire",
  "Star chart or star map app",
  "Binoculars for stargazing",
  "Book or card games",
  "Change of clothes + jacket",
];

export function BackyardCamping() {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(CAMPING_PACKLIST.length).fill(false),
  );
  const packed = checked.filter(Boolean).length;

  const starTips = [
    "🌟 Find the Big Dipper first — it points to the North Star",
    "🔭 Let your eyes adjust for 15 minutes before spotting faint stars",
    "🌙 The best stargazing happens after midnight on clear nights",
    "💫 The Milky Way looks like a smear of light across the sky",
    "🌠 Watch for shooting stars — best in August during the Perseid shower",
  ];

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-teal-gp font-bold">
        ⛺ Backyard Camping
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-display font-bold text-teal-gp">
              Packing List 🎒
            </h4>
            <Badge className="bg-teal-gp text-white">
              {packed}/{CAMPING_PACKLIST.length} packed!
            </Badge>
          </div>
          <div className="flex flex-col gap-2">
            {CAMPING_PACKLIST.map((item, i) => (
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
                data-ocid={`camping.checkbox.${i + 1}`}
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
        </div>
        <div>
          <h4 className="font-display font-bold text-teal-gp mb-3">
            ⭐ Stargazing Tips
          </h4>
          <div className="flex flex-col gap-2">
            {starTips.map((tip) => (
              <div
                key={tip}
                className="text-sm p-2 rounded-lg bg-teal-light-gp border border-teal-gp"
              >
                {tip}
              </div>
            ))}
          </div>
          <Card className="mt-3 border-none bg-yellow-light-gp">
            <CardContent className="p-3">
              <p className="font-bold text-yellow-gp text-sm">
                🌙 Tent Setup Tips
              </p>
              <ul className="text-xs mt-1 space-y-1 text-foreground">
                <li>• Pick flat ground, away from anthills or sharp rocks</li>
                <li>• Stake tent corners first, then raise the poles</li>
                <li>• Keep shoes outside the tent in a bag</li>
                <li>• Zip up the door to keep out bugs!</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ===== FACE PAINTING =====
export function FacePainting() {
  const [design, setDesign] = useState<"butterfly" | "tiger">("butterfly");

  const designs = {
    butterfly: {
      emoji: "🦋",
      colors: ["Purple", "Blue", "Pink", "Black (outlines)", "White highlight"],
      steps: [
        "Start with a clean, dry face — no moisturizer (paint slides on oily skin!)",
        "Apply a white base around both eyes",
        "Use a flat brush to paint large purple/blue wings extending from outer eye corners upward",
        "Add pink accents in the inner corners of the wings",
        "With a thin brush, outline the wings in black — add curvy lines for detail",
        "Paint small black dots around the wing edges",
        "Add white highlight dots on the wings for sparkle",
        "Paint delicate antennae curving up from the center of the forehead",
        "Optional: add glitter eyeshadow over dried paint for extra magic!",
      ],
    },
    tiger: {
      emoji: "🐯",
      colors: ["Orange", "White", "Black", "Yellow accents"],
      steps: [
        "Apply orange paint all over the cheeks and nose area",
        "Paint the nose and upper lip black (the tiger muzzle)",
        "Use white paint for the muzzle area under the nose and chin",
        "Add white above the eyebrows for the mask look",
        "Using a thin brush, paint black stripes radiating out from the nose to cheeks",
        "Add forehead stripes too — about 3-4 parallel stripes",
        "Paint black whisker dots on the white muzzle area",
        "Add a few white sparkle lines in the black stripes for dimension",
        "ROAR! 🐯",
      ],
    },
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-yellow-gp font-bold">
        🎨 Face Painting
      </h3>
      <div className="flex gap-2">
        {(["butterfly", "tiger"] as const).map((d) => (
          <Button
            key={d}
            size="sm"
            variant={design === d ? "default" : "outline"}
            className={`rounded-full capitalize ${design === d ? "bg-yellow-gp text-foreground" : "border-yellow-gp text-yellow-gp"}`}
            onClick={() => setDesign(d)}
            data-ocid="facepainting.tab"
          >
            {designs[d].emoji} {d.charAt(0).toUpperCase() + d.slice(1)}
          </Button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-yellow-light-gp border-none">
          <CardContent className="p-4">
            <h4 className="font-display font-bold text-yellow-gp mb-2">
              🎨 Colors You Need
            </h4>
            <ul className="space-y-1">
              {designs[design].colors.map((c) => (
                <li key={c} className="text-sm">
                  • {c}
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-3">
              ⚠️ Use face-safe, water-based face paint only!
            </p>
          </CardContent>
        </Card>
        <div>
          <h4 className="font-display font-bold text-yellow-gp mb-2">
            Step-by-Step:
          </h4>
          <div className="flex flex-col gap-2">
            {designs[design].steps.map((step, i) => (
              <div key={step} className="flex gap-2 text-sm">
                <div className="w-6 h-6 rounded-full bg-yellow-gp text-foreground text-xs flex items-center justify-center shrink-0 font-bold">
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

// ===== PUDDLE JUMPING =====
export function PuddleJumping() {
  const [checked, setChecked] = useState<boolean[]>(new Array(8).fill(false));

  const activities = [
    "☔ Jump in the biggest puddle you can find — two feet together!",
    "🌊 Make ripple patterns by dropping stones into puddles",
    "🎨 Paint with muddy water using a stick on the sidewalk",
    "👣 Make muddy footprint art on dry pavement",
    "🔍 Look for worms that come to the surface after rain",
    "⛵ Float a leaf boat down a rain stream",
    "🌈 Look for a rainbow after the rain stops!",
    "💧 Count seconds until thunder — each 5 seconds = 1 mile away!",
  ];

  const gear = [
    "🥾 Rubber rain boots (the splashier the better!)",
    "☂️ A bright raincoat or poncho",
    "🧤 Waterproof gloves for cold days",
    "🩳 Clothes you don't mind getting muddy",
    "🧦 Spare dry socks and shoes for when you're done",
  ];

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-teal-gp font-bold">
        ⛈️ Puddle Jumping!
      </h3>
      <p className="font-display text-lg text-teal-gp font-bold italic">
        "There is no bad weather, only inappropriate clothing!" ☔
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h4 className="font-display font-bold text-teal-gp mb-3">
            Rain Day Activity Checklist
          </h4>
          <div className="flex flex-col gap-2">
            {activities.map((act, i) => (
              <button
                key={act}
                type="button"
                className="flex items-center gap-2 cursor-pointer text-left w-full bg-transparent border-0 p-0"
                onClick={() =>
                  setChecked((prev) => {
                    const n = [...prev];
                    n[i] = !n[i];
                    return n;
                  })
                }
                data-ocid={`puddle.checkbox.${i + 1}`}
              >
                <Checkbox
                  checked={checked[i]}
                  className="border-teal-gp data-[state=checked]:bg-teal-gp shrink-0"
                />
                <span
                  className={`text-sm ${checked[i] ? "line-through text-muted-foreground" : ""}`}
                >
                  {act}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-bold text-teal-gp mb-3">
            🌧️ Perfect Puddle Gear
          </h4>
          <div className="flex flex-col gap-2">
            {gear.map((item) => (
              <div
                key={item}
                className="text-sm p-2 rounded-lg bg-teal-light-gp border border-teal-gp"
              >
                {item}
              </div>
            ))}
          </div>
          <Card className="mt-3 border-none bg-yellow-light-gp">
            <CardContent className="p-3">
              <p className="font-bold text-yellow-gp text-sm">
                ⚡ Safety First!
              </p>
              <ul className="text-xs mt-1 space-y-1">
                <li>
                  • Stay inside during lightning — wait 30 min after last bolt
                </li>
                <li>
                  • Avoid flooded streets — currents are stronger than they look
                </li>
                <li>
                  • Jump in puddles on grass or quiet sidewalks, not near
                  traffic
                </li>
                <li>• Always tell a grown-up where you are!</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ===== SPORTY STARS =====
const SPORTY_STORIES = [
  {
    sport: "Soccer ⚽",
    emoji: "⚽",
    name: "Maya Chen",
    age: 12,
    tagline: "The girl who scored the impossible goal",
    story:
      "Maya started playing soccer in her backyard with just a deflated ball and a trash can as a goal. Her school didn't have a girls' team, so she joined the boys' team and worked twice as hard every practice. At the regional championship, Maya's team was down 2-1 in the final minute. She received the ball near midfield, dribbled past two defenders, and launched it from 30 yards out — it curled into the top corner. The crowd went silent, then erupted. Maya didn't celebrate. She ran to her teammates and pointed at each one. 'We did it together,' she said. That's leadership.",
    color: "bg-teal-light-gp",
    border: "border-teal-gp",
    textColor: "text-teal-gp",
  },
  {
    sport: "Dance 💃",
    emoji: "💃",
    name: "Zara Williams",
    age: 11,
    tagline: "The girl who danced through doubt",
    story:
      "When Zara auditioned for the city's youth dance company, the teacher told her she was 'too tall and too loud.' Zara cried for a day. Then she signed up for a different studio across town. She practiced every morning before school and every evening after. When the city showcase came, Zara performed a solo she had choreographed herself — an explosion of joy and power that stopped the audience mid-breath. The same teacher who rejected her was there. Afterward, she pulled Zara aside and apologized. 'I was wrong,' she said. 'You're unforgettable.' And she was.",
    color: "bg-pink-light-gp",
    border: "border-pink-gp",
    textColor: "text-pink-gp",
  },
  {
    sport: "Gymnastics 🤸‍♀️",
    emoji: "🤸‍♀️",
    name: "Sofia Rivera",
    age: 10,
    tagline: "The girl who turned fear into flight",
    story:
      "Sofia was terrified of the balance beam. Every time she got up there, her legs shook and her mind went blank. Her coach suggested she try a different event. But Sofia refused. She started visualizing her routine every single night before bed — feeling every step, every turn, every landing. After three months, something shifted. At the state qualifier, Sofia walked onto the beam with calm, focused eyes. She performed her routine without a wobble, sticking the dismount perfectly. 8.9 out of 10. She didn't make the podium, but she beat her real opponent: her own fear. That was the real gold.",
    color: "bg-purple-light-gp",
    border: "border-purple-gp",
    textColor: "text-purple-gp",
  },
];

export function SportyStars() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-teal-gp font-bold">
        Sporty Stars ⚽
      </h3>
      <p className="text-muted-foreground">
        Stories about girls who love to move, compete, and inspire! Click a card
        to read the full story.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        {SPORTY_STORIES.map((story, i) => (
          <button
            key={story.name}
            type="button"
            className={`text-left rounded-2xl border-2 p-5 transition-all cursor-pointer ${story.color} ${story.border} ${expanded === i ? "shadow-lg" : "hover:shadow-md"}`}
            onClick={() => setExpanded(expanded === i ? null : i)}
            data-ocid={`sporty.item.${i + 1}`}
          >
            <div className="text-4xl mb-3 text-center">{story.emoji}</div>
            <div className="font-display font-bold text-lg text-center mb-1">
              {story.name}
            </div>
            <div
              className={`text-xs font-bold text-center mb-2 ${story.textColor}`}
            >
              {story.sport} • Age {story.age}
            </div>
            <div className="text-xs text-center text-muted-foreground italic mb-2">
              "{story.tagline}"
            </div>
            {expanded === i ? (
              <div className="text-sm text-foreground leading-relaxed mt-3 border-t border-current/20 pt-3">
                {story.story}
              </div>
            ) : (
              <div
                className={`text-xs text-center font-bold ${story.textColor} mt-2`}
              >
                Tap to read her story →
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ===== MUSIC MAKERS =====
const INSTRUMENTS = [
  {
    emoji: "🎸",
    name: "Guitar",
    type: "String",
    funFact:
      "The guitar has 6 strings and over 1,500 years of history! It's one of the most popular instruments on Earth — perfect for pop, rock, country, and more.",
    tryThis:
      "Try pressing your fingers to the frets and plucking one string at a time. Even one note is music!",
  },
  {
    emoji: "🎹",
    name: "Piano",
    type: "Keyboard",
    funFact:
      "The piano has 88 keys — 52 white and 36 black. It can play higher and lower notes than almost any other instrument, and it can play melody AND chords at the same time!",
    tryThis:
      "Find the group of 2 black keys. The white key just to the LEFT of them is always C. That's where most songs start!",
  },
  {
    emoji: "🥁",
    name: "Drums",
    type: "Percussion",
    funFact:
      "Drums are the oldest instruments in the world — humans have been banging on things to make music for over 7,000 years! Drumming is a full-body workout and boosts brain health.",
    tryThis:
      "Tap your hands on your lap: right, right, left, right. That's a basic beat! Add your foot tapping for the bass drum.",
  },
  {
    emoji: "🪗",
    name: "Flute",
    type: "Wind",
    funFact:
      "The flute makes sound by blowing air across an opening — no reed needed! The oldest flute ever found is 43,000 years old and was made from a vulture bone.",
    tryThis:
      "Blow air across the top of a glass bottle to make a tone. That's basically how a flute works!",
  },
  {
    emoji: "🎻",
    name: "Violin",
    type: "String",
    funFact:
      "The violin has only 4 strings, but a skilled player can make thousands of different sounds with the bow! Violins are made of over 70 individual pieces of wood.",
    tryThis:
      "Listen to a violin playing and notice how it can sound like it's crying, laughing, or soaring. Music is a language!",
  },
  {
    emoji: "🎸",
    name: "Ukulele",
    type: "String",
    funFact:
      "The ukulele comes from Hawaii and has only 4 strings — it's one of the easiest instruments to learn! You can play hundreds of songs with just 3 chords.",
    tryThis:
      "The 4 strings are G, C, E, A. Strum them all at once and you already have a chord!",
  },
];

export function MusicMakers() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-purple-gp font-bold">
        Music Makers 🎸
      </h3>
      <p className="text-muted-foreground">
        Discover the world of instruments! Click any to learn more and get a fun
        challenge to try.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {INSTRUMENTS.map((inst, i) => (
          <Card
            key={inst.name}
            className={`border-2 transition-all ${openIdx === i ? "border-purple-gp bg-purple-light-gp" : "border-border hover:border-purple-gp"}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{inst.emoji}</span>
                  <div>
                    <div className="font-display font-bold">{inst.name}</div>
                    <Badge
                      variant="outline"
                      className="text-xs border-purple-gp text-purple-gp"
                    >
                      {inst.type}
                    </Badge>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-xs font-bold text-purple-gp border border-purple-gp rounded-full px-3 py-1 hover:bg-purple-gp hover:text-white transition-colors"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  data-ocid={"music.toggle"}
                >
                  {openIdx === i ? "Close ✕" : "Learn More ▼"}
                </button>
              </div>
              {openIdx === i && (
                <div className="mt-2 space-y-3">
                  <div className="text-sm text-foreground">{inst.funFact}</div>
                  <div className="bg-purple-gp/10 rounded-lg p-3">
                    <p className="text-xs font-bold text-purple-gp mb-1">
                      🎯 Try This!
                    </p>
                    <p className="text-xs text-foreground">{inst.tryThis}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ===== FASHION FUN =====
const STYLE_QUIZ = [
  {
    question: "Pick your color vibe!",
    options: [
      {
        text: "Bold & bright — neon, red, electric blue! 🌈",
        type: "trendsetter",
      },
      { text: "Soft & dreamy — pastels, lavender, blush 🌸", type: "romantic" },
      { text: "Earthy & chill — olive, rust, cream 🌿", type: "natural" },
    ],
  },
  {
    question: "Your dream weekend outfit is...",
    options: [
      {
        text: "Something totally unique that no one else would wear 🎭",
        type: "trendsetter",
      },
      {
        text: "Flowy, comfortable, and a little magical 🧚‍♀️",
        type: "romantic",
      },
      {
        text: "Casual but put-together — jeans and a great top 🌟",
        type: "natural",
      },
    ],
  },
  {
    question: "What's your fashion motto?",
    options: [
      {
        text: "More is more! Layer it, stack it, make a statement! ✨",
        type: "trendsetter",
      },
      {
        text: "Dress like you're the main character in a fairy tale 💫",
        type: "romantic",
      },
      {
        text: "Wear what feels good. Comfort is always stylish 🍃",
        type: "natural",
      },
    ],
  },
];

const STYLE_RESULTS: Record<
  string,
  { title: string; desc: string; emoji: string; tips: string[] }
> = {
  trendsetter: {
    title: "You're a Bold Trendsetter! 🌈",
    desc: "You don't follow trends — you CREATE them! Your style is fearless, expressive, and completely your own. You walk into a room and everyone wonders where you shop.",
    emoji: "🌈",
    tips: [
      "Mix patterns and textures fearlessly",
      "Thrift stores are your playground",
      "Statement accessories = instant outfit upgrade",
      "Wear one thing that surprises people every day",
    ],
  },
  romantic: {
    title: "You're a Dreamy Romantic! 🌸",
    desc: "Your style is soft, magical, and effortlessly beautiful. You dress like the world is a fairy tale — and honestly, when you're around, it kind of is.",
    emoji: "🌸",
    tips: [
      "Look for lace details, floral prints, and flowy fabrics",
      "Pastels are your best friends",
      "Vintage and thrifted dresses are pure gold for your style",
      "A flower crown always works for you",
    ],
  },
  natural: {
    title: "You're an Effortless Natural! 🌿",
    desc: "Your style is grounded, relaxed, and genuinely cool without trying. You know that confidence is the best accessory, and you wear it every day.",
    emoji: "🌿",
    tips: [
      "Quality over quantity — invest in pieces you'll wear forever",
      "Earth tones like rust, sage, and camel are your palette",
      "Oversized sweaters and good jeans are your power outfit",
      "Let your natural self shine — minimal but meaningful",
    ],
  },
};

export function FashionFun() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(STYLE_QUIZ.length).fill(null),
  );
  const [showResult, setShowResult] = useState(false);

  const allAnswered = answers.every((a) => a !== null);

  const getResult = () => {
    const counts: Record<string, number> = {
      trendsetter: 0,
      romantic: 0,
      natural: 0,
    };
    answers.forEach((ans, qi) => {
      if (ans !== null) {
        const type = STYLE_QUIZ[qi].options[ans].type;
        counts[type]++;
      }
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  };

  const resultKey = showResult ? getResult() : null;
  const result = resultKey ? STYLE_RESULTS[resultKey] : null;

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-pink-gp font-bold">
        Fashion Fun 👗
      </h3>
      <p className="text-muted-foreground">
        Express your unique style! Take the quiz to discover your fashion
        personality.
      </p>

      {!showResult ? (
        <>
          {STYLE_QUIZ.map((q, qi) => (
            <div key={q.question} className="mb-3">
              <p className="font-bold text-sm mb-2 text-foreground">
                {qi + 1}. {q.question}
              </p>
              <div className="flex flex-col gap-2">
                {q.options.map((opt, oi) => (
                  <button
                    key={opt.text}
                    type="button"
                    className={`text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${
                      answers[qi] === oi
                        ? "bg-pink-light-gp border-pink-gp font-bold"
                        : "border-border hover:border-pink-gp"
                    }`}
                    onClick={() => {
                      setAnswers((prev) => {
                        const n = [...prev];
                        n[qi] = oi;
                        return n;
                      });
                    }}
                    data-ocid={`fashion.item.${qi + 1}`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {allAnswered && (
            <Button
              className="bg-pink-gp text-white rounded-full font-bold px-8 self-start"
              onClick={() => setShowResult(true)}
              data-ocid="fashion.primary_button"
            >
              Reveal My Style! 👗
            </Button>
          )}
        </>
      ) : result ? (
        <div className="flex flex-col gap-4">
          <Card className="bg-pink-light-gp border-none text-center">
            <CardContent className="p-6">
              <div className="text-5xl mb-3">{result.emoji}</div>
              <h4 className="font-display text-2xl font-bold text-pink-gp mb-2">
                {result.title}
              </h4>
              <p className="text-sm text-foreground">{result.desc}</p>
            </CardContent>
          </Card>
          <div className="grid gap-2 sm:grid-cols-2">
            {result.tips.map((tip, i) => (
              <div
                key={tip}
                className="flex gap-2 items-start p-3 rounded-xl bg-card border border-pink-gp/20"
                data-ocid={`fashion.item.${i + 1}`}
              >
                <span className="text-pink-gp font-bold">✨</span>
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            className="rounded-full border-pink-gp text-pink-gp self-start"
            onClick={() => {
              setAnswers(new Array(STYLE_QUIZ.length).fill(null));
              setShowResult(false);
            }}
            data-ocid="fashion.secondary_button"
          >
            Try Again 🔄
          </Button>
        </div>
      ) : null}
    </div>
  );
}

// ===== BOOK NOOK =====
const GIRL_HERO_BOOKS = [
  {
    title: "Matilda",
    author: "Roald Dahl",
    emoji: "📖",
    desc: "A brilliant girl discovers she has telekinetic powers and uses them to stand up to bullies and a tyrannical headmistress. A celebration of reading, bravery, and the power of a strong mind.",
    genre: "Classic Fantasy",
  },
  {
    title: "Harriet the Spy",
    author: "Louise Fitzhugh",
    emoji: "🔍",
    desc: "Harriet is a 11-year-old aspiring writer who carries a notebook everywhere, recording her honest observations. A story about authenticity, friendship, and finding your voice.",
    genre: "Classic Fiction",
  },
  {
    title: "Hilo: The Boy Who Crashed to Earth",
    author: "Judd Winick",
    emoji: "🦸‍♀️",
    desc: "While the title has a boy, the real hero is Gina — a fearless, clever girl who saves the day more than anyone else. Perfect for graphic novel lovers!",
    genre: "Graphic Novel",
  },
  {
    title: "The One and Only Ivan",
    author: "Katherine Applegate",
    emoji: "🦁",
    desc: "Narrated by a gorilla, this is also the story of Ruby the baby elephant and Stella — about compassion, friendship, and the courage to fight for what's right.",
    genre: "Heartfelt Fiction",
  },
  {
    title: "New Kid",
    author: "Jerry Craft",
    emoji: "🎨",
    desc: "A graphic novel about a boy who wants to be an artist — but there's also an incredible cast of strong girls who support and challenge him to be his best self.",
    genre: "Graphic Novel",
  },
  {
    title: "The Girl Who Drank the Moon",
    author: "Kelly Barnhill",
    emoji: "🌙",
    desc: "Luna is a young girl who accidentally swallowed starlight — and must discover her own magic and power to save those she loves. Breathtaking and magical.",
    genre: "Fantasy",
  },
  {
    title: "Amelia Bedelia",
    author: "Peggy Parish",
    emoji: "🍰",
    desc: "Amelia is hilariously literal but brilliantly creative. A story that teaches kids that thinking differently isn't wrong — it's special.",
    genre: "Early Reader",
  },
  {
    title: "Pippi Longstocking",
    author: "Astrid Lindgren",
    emoji: "🧡",
    desc: "Pippi is the original girl who rules. She lives alone with her horse and monkey, lifts adults over her head, and refuses to be told what to do. A timeless icon.",
    genre: "Classic",
  },
];

export function BookNook() {
  const [wantToRead, setWantToRead] = useState<Set<number>>(new Set());

  const toggleWant = (i: number) => {
    setWantToRead((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-teal-gp font-bold">
        Book Nook 📚
      </h3>
      <p className="text-muted-foreground">
        The best books featuring brave, clever, funny, and unstoppable girl
        heroes!
        {wantToRead.size > 0 && (
          <span className="ml-2">
            <Badge className="bg-teal-gp text-white">
              {wantToRead.size} on your list!
            </Badge>
          </span>
        )}
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {GIRL_HERO_BOOKS.map((book, i) => (
          <Card
            key={book.title}
            className={`border-2 transition-all ${wantToRead.has(i) ? "bg-teal-light-gp border-teal-gp" : "border-border hover:border-teal-gp"}`}
            data-ocid={`booknook.item.${i + 1}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-3xl">{book.emoji}</span>
                  <div>
                    <div className="font-display font-bold text-sm">
                      {book.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      by {book.author}
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs mt-1 border-teal-gp text-teal-gp"
                    >
                      {book.genre}
                    </Badge>
                    <p className="text-xs text-foreground mt-2 leading-relaxed">
                      {book.desc}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className={`shrink-0 text-xs font-bold rounded-full px-3 py-1 transition-colors ${wantToRead.has(i) ? "bg-teal-gp text-white" : "border border-teal-gp text-teal-gp hover:bg-teal-gp hover:text-white"}`}
                  onClick={() => toggleWant(i)}
                  data-ocid={"booknook.toggle"}
                >
                  {wantToRead.has(i) ? "✓ Listed!" : "+ Want to Read"}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
