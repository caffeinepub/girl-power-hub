import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddVisionItem, useGetVisionBoard } from "@/hooks/useQueries";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ===== GENERIC CRAFT GUIDE =====
interface CraftGuideProps {
  title: string;
  emoji: string;
  color: string;
  borderColor: string;
  materials: string[];
  steps: string[];
  tips?: string[];
}

export function CraftGuide({
  title,
  emoji,
  color,
  borderColor,
  materials,
  steps,
  tips,
}: CraftGuideProps) {
  const [matChecked, setMatChecked] = useState<boolean[]>(
    new Array(materials.length).fill(false),
  );

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3
        className="font-display text-2xl font-bold"
        style={{ color: `var(--${borderColor})` }}
      >
        {emoji} {title}
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Card
          className="border-2"
          style={{
            borderColor: `oklch(var(--${borderColor}))`,
            background: `oklch(var(--${color}))`,
          }}
        >
          <CardContent className="p-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">
              Materials Checklist
            </h4>
            {materials.map((m, i) => (
              <button
                key={m}
                type="button"
                className="flex items-center gap-2 py-1 cursor-pointer text-left w-full bg-transparent border-0 p-0"
                onClick={() =>
                  setMatChecked((prev) => {
                    const n = [...prev];
                    n[i] = !n[i];
                    return n;
                  })
                }
                data-ocid={`craft.checkbox.${i + 1}`}
              >
                <Checkbox checked={matChecked[i]} />
                <span
                  className={`text-sm ${matChecked[i] ? "line-through text-muted-foreground" : ""}`}
                >
                  {m}
                </span>
              </button>
            ))}
          </CardContent>
        </Card>
        <div className="flex flex-col gap-2">
          <h4 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">
            Steps
          </h4>
          {steps.map((step, i) => (
            <div key={step} className="flex gap-3 text-sm">
              <div
                className="w-7 h-7 rounded-full text-white text-xs flex items-center justify-center shrink-0 font-bold"
                style={{ background: `oklch(var(--${borderColor}))` }}
              >
                {i + 1}
              </div>
              <span className="leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      </div>
      {tips && tips.length > 0 && (
        <Card
          className="border-none"
          style={{ background: "oklch(var(--yellow-light))" }}
        >
          <CardContent className="p-3">
            <p className="font-bold text-sm text-yellow-gp mb-1">💡 Pro Tips</p>
            <ul className="text-sm space-y-1">
              {tips.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export function FlowerCrownCrafting() {
  return (
    <CraftGuide
      title="Flower Crown Crafting"
      emoji="🌸"
      color="pink-light"
      borderColor="pink"
      materials={[
        "Floral wire (or pipe cleaners)",
        "Fresh or artificial flowers",
        "Green floral tape",
        "Scissors",
        "Ribbon (optional)",
      ]}
      steps={[
        "Measure wire around your head and add 4 inches for overlap",
        "Twist the wire into a circle that fits your head",
        "Trim your flowers/foliage to 2-3 inch lengths",
        "Start wrapping flowers to the wire with floral tape",
        "Overlap each flower slightly, rotating as you go",
        "When complete, twist the wire ends together and cover with tape",
        "Tie ribbons to hang down the back if desired",
      ]}
      tips={[
        "Use silk flowers for a longer-lasting crown",
        "Add greenery between flowers to fill gaps",
        "Keep the crown out of direct sunlight",
      ]}
    />
  );
}

export function TieDyeTips() {
  const [selectedPattern, setSelectedPattern] = useState<string>("spiral");
  const patterns = [
    {
      id: "spiral",
      name: "Spiral 🌀",
      desc: "Pinch center, twist tightly in one direction, band with rubber bands in sections. Apply colors to each section.",
    },
    {
      id: "bullseye",
      name: "Bullseye 🎯",
      desc: "Pinch any spot and pull up, then band at equal intervals. Apply different colors between each band.",
    },
    {
      id: "stripes",
      name: "Stripes 〰️",
      desc: "Fold shirt accordion-style (like a fan) lengthwise, then band at equal intervals. Apply colors between bands.",
    },
    {
      id: "scrunch",
      name: "Scrunch 🤜",
      desc: "Scrunch and scrumple the shirt randomly into a ball, band in multiple directions. Apply colors randomly!",
    },
  ];

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-teal-gp font-bold">
        🌈 Tie-Dye Tips
      </h3>
      <p className="text-muted-foreground">
        Choose a pattern technique, then follow the steps!
      </p>
      <div className="flex flex-wrap gap-2">
        {patterns.map((p) => (
          <Button
            key={p.id}
            size="sm"
            variant={selectedPattern === p.id ? "default" : "outline"}
            className={`rounded-full ${selectedPattern === p.id ? "bg-teal-gp text-white" : "border-teal-gp text-teal-gp"}`}
            onClick={() => setSelectedPattern(p.id)}
            data-ocid="tiedye.tab"
          >
            {p.name}
          </Button>
        ))}
      </div>
      {patterns.find((p) => p.id === selectedPattern) && (
        <Card className="bg-teal-light-gp border-2 border-teal-gp">
          <CardContent className="p-4">
            <p className="font-bold text-teal-gp mb-2">
              {patterns.find((p) => p.id === selectedPattern)?.name}
            </p>
            <p className="text-sm">
              {patterns.find((p) => p.id === selectedPattern)?.desc}
            </p>
          </CardContent>
        </Card>
      )}
      <CraftGuide
        title="Tie-Dye Instructions"
        emoji="👕"
        color="teal-light"
        borderColor="teal"
        materials={[
          "White cotton shirt (pre-washed)",
          "Rubber bands",
          "Fabric dye (multiple colors)",
          "Gloves",
          "Plastic bags",
          "Plastic bottles for dye",
        ]}
        steps={[
          "Wet your shirt and wring out excess water",
          "Apply your chosen folding pattern (see above)",
          "Secure with rubber bands tightly",
          "Mix dye with water in plastic bottles",
          "Apply dye generously to all sections, squeeze through",
          "Wrap in plastic bag and let sit 6-8 hours (or overnight!)",
          "Rinse under cold water, remove rubber bands while rinsing",
          "Wash separately in cold water and dry — reveal your masterpiece!",
        ]}
      />
    </div>
  );
}

export function DIYBathBombs() {
  return (
    <CraftGuide
      title="DIY Bath Bombs"
      emoji="🛁"
      color="purple-light"
      borderColor="purple"
      materials={[
        "1 cup baking soda",
        "1/2 cup citric acid",
        "1/2 cup corn starch",
        "1/2 cup Epsom salt",
        "Essential oil (lavender or rose)",
        "Coconut oil (2 tablespoons)",
        "Food coloring",
        "Bath bomb molds",
      ]}
      steps={[
        "Mix all dry ingredients in a bowl (baking soda, citric acid, corn starch, Epsom salt)",
        "In a separate bowl, mix wet ingredients (oils, colorings)",
        "Very slowly add wet mix to dry mix — don't let it fizz!",
        "Mix quickly until it holds shape when squeezed",
        "Press firmly into molds",
        "Let dry for 24-48 hours in a cool, dry place",
        "Pop out carefully and wrap in plastic wrap",
        "Drop one in your bath and enjoy the fizz! 🌸",
      ]}
      tips={[
        "Add the wet mix VERY slowly to avoid premature fizzing",
        "If too dry, add a tiny bit more oil",
        "Use dried flower petals for extra beauty",
      ]}
    />
  );
}

export function OrigamiSection() {
  const [project, setProject] = useState("crane");
  const projects: Record<string, { steps: string[] }> = {
    crane: {
      steps: [
        "Start with a square piece of paper, colored side down",
        "Fold in half diagonally, crease, then unfold",
        "Fold in half the other diagonal way, crease, then unfold",
        "Fold in half horizontally, crease, unfold, then vertically",
        "Collapse into a diamond shape (squash fold)",
        "Fold left and right edges to the center line",
        "Fold top triangle down, unfold all",
        "Open up the front flap and squash fold using the creases",
        "Repeat on other side",
        "Fold left and right edges to center on both sides",
        "Fold bottom points up for the neck and tail",
        "Inside-reverse fold one point down for the head",
        "Pull the wings apart gently to inflate! 🕊️",
      ],
    },
    heart: {
      steps: [
        "Start with a square piece of paper",
        "Fold in half diagonally to make a triangle",
        "Fold the triangle in half again",
        "Open the inner layer of the top corner",
        "Squash fold it into a square",
        "Repeat on the other side",
        "Fold down the top point of each side",
        "Fold both sides back to the center",
        "Fold the bottom point up",
        "Flip over and shape the top into a heart curve! 💖",
      ],
    },
    frog: {
      steps: [
        "Start with a square piece of paper",
        "Fold in half horizontally and vertically, unfold",
        "Fold diagonally both ways, unfold",
        "Collapse into a small square (preliminary fold)",
        "Fold left and right edges to the center",
        "Fold up the bottom triangle",
        "Open the corner and squash fold to make a leg",
        "Repeat for all four corners",
        "Fold the legs down outward",
        "Fold the top half down for the body",
        "Draw eyes and press the back to make it jump! 🐸",
      ],
    },
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-yellow-gp font-bold">
        Origami Paper Folding 🦢
      </h3>
      <div className="flex gap-2">
        {[
          ["crane", "🕊️ Crane"],
          ["heart", "💖 Heart"],
          ["frog", "🐸 Frog"],
        ].map(([id, label]) => (
          <Button
            key={id}
            size="sm"
            variant={project === id ? "default" : "outline"}
            className={`rounded-full ${project === id ? "bg-yellow-gp text-foreground" : "border-yellow-gp text-yellow-gp"}`}
            onClick={() => setProject(id)}
            data-ocid="origami.tab"
          >
            {label}
          </Button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {projects[project].steps.map((step, i) => (
          <div key={step} className="flex gap-3 text-sm items-start">
            <div className="w-7 h-7 rounded-full bg-yellow-gp text-foreground text-xs flex items-center justify-center shrink-0 font-bold">
              {i + 1}
            </div>
            <span className="leading-relaxed pt-1">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== BACKPACK DECORATING =====
export function BackpackDecorating() {
  return (
    <CraftGuide
      title="Backpack Decorating"
      emoji="🎒"
      color="pink-light"
      borderColor="pink"
      materials={[
        "Iron-on patches (flowers, stars, animals)",
        "Enamel pins or button pins",
        "Keychain charms",
        "Fabric paint + small brush",
        "Washi tape (for temporary designs)",
        "Rhinestone stickers",
        "Iron (with adult help)",
      ]}
      steps={[
        "Lay your backpack flat and plan your design before committing",
        "Iron-on patches: place patch face-up, cover with cloth, press iron for 15 seconds",
        "Pins: push through fabric layers near the zipper or front pocket for stability",
        "Fabric paint: sketch your design lightly with pencil first, then paint",
        "Charms: attach to zipper pulls with a small jump ring or clip",
        "Rhinestone stickers: peel and press, then seal with clear fabric glue",
        "Step back and admire your one-of-a-kind backpack!",
      ]}
      tips={[
        "Iron-on patches stick better if you also hand-sew the edges",
        "Use fabric glue over painted areas after drying to seal and protect",
        "Place heavier pins near the bottom of pockets so the bag doesn't droop",
      ]}
    />
  );
}

// ===== STICKER MAKING =====
export function StickerMaking() {
  return (
    <CraftGuide
      title="Sticker Making"
      emoji="🎨"
      color="yellow-light"
      borderColor="yellow"
      materials={[
        "Clear packing tape",
        "White paper + markers or colored pencils",
        "Scissors",
        "Printed images (optional)",
        "Wax paper or sticker backing sheets",
        "Clear nail polish (optional — for sealing)",
      ]}
      steps={[
        "Draw or print your design on white paper — keep it bold and not too detailed",
        "Color your design completely if hand-drawing",
        "Cut your design out leaving a small white border",
        "Place a piece of clear packing tape over your design",
        "Press firmly to remove all air bubbles",
        "Trim away any excess tape around the edges",
        "Stick onto wax paper for storage — peel off when you're ready to use!",
      ]}
      tips={[
        "Wet the tape side slightly to make it re-stickable",
        "Use a credit card to smooth out air bubbles",
        "For waterproof stickers, brush a thin layer of clear nail polish over the front",
      ]}
    />
  );
}

// ===== BALLOON ANIMALS =====
export function BalloonAnimals() {
  const [selectedShape, setSelectedShape] = useState("dog");
  const shapes: Record<
    string,
    { emoji: string; steps: string[]; tip: string }
  > = {
    dog: {
      emoji: "🐶",
      steps: [
        "Inflate balloon leaving 3 inches uninflated at the tail",
        "Twist a 2-inch bubble at the nozzle end — this will be the nose",
        "Make two more 2-inch bubbles right after the nose",
        "Fold the two bubbles together and twist them around each other — these are the ears!",
        "Make a 3-inch bubble for the neck",
        "Make two 3-inch bubbles and twist them together to form the front legs",
        "Make a 3-inch body bubble",
        "Make two 3-inch bubbles and twist together for back legs",
        "The remaining balloon is the tail — give it a little curl! 🐶",
      ],
      tip: "Keep twists tight and always twist in the same direction to prevent unraveling.",
    },
    heart: {
      emoji: "💖",
      steps: [
        "Inflate a heart-shaped balloon or a round 260 balloon halfway",
        "Pinch the nozzle end and tie a knot",
        "Push the knot down into the center of the balloon",
        "Pinch both sides to create two bumps at the top",
        "Flatten slightly for a classic heart shape",
        "For a 260 balloon: fold in half, twist the middle, then shape both halves into rounded bumps",
        "Tie the tail end to the nozzle for a sturdy heart!",
      ],
      tip: "Don't over-inflate — hearts need room to be shaped without popping!",
    },
    flower: {
      emoji: "🌸",
      steps: [
        "Inflate a balloon about 80%, leaving some room",
        "Twist off a small bubble at the nozzle end (1 inch)",
        "Make 5 more equal-sized bubbles (each about 2 inches)",
        "Bring the 1st and 6th bubbles together and twist them — this closes the petal loop",
        "Each pair of adjacent bubbles forms one petal — you'll have 3 petals",
        "For more petals, make 5 equal bubbles and loop them into a circle",
        "The remaining balloon becomes the stem!",
      ],
      tip: "Use a green balloon for the stem and a bright color for the flower top!",
    },
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-pink-gp font-bold">
        🎈 Balloon Animals
      </h3>
      <p className="text-muted-foreground">
        Choose a shape to learn how to make it! You'll need 260 modeling
        balloons and a pump.
      </p>
      <div className="flex gap-2 flex-wrap">
        {Object.entries(shapes).map(([id, s]) => (
          <Button
            key={id}
            size="sm"
            variant={selectedShape === id ? "default" : "outline"}
            className={`rounded-full capitalize ${selectedShape === id ? "bg-pink-gp text-white" : "border-pink-gp text-pink-gp"}`}
            onClick={() => setSelectedShape(id)}
            data-ocid="balloons.tab"
          >
            {s.emoji} {id.charAt(0).toUpperCase() + id.slice(1)}
          </Button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {shapes[selectedShape].steps.map((step, i) => (
          <div key={step} className="flex gap-3 text-sm items-start">
            <div className="w-7 h-7 rounded-full bg-pink-gp text-white text-xs flex items-center justify-center shrink-0 font-bold">
              {i + 1}
            </div>
            <span className="leading-relaxed pt-1">{step}</span>
          </div>
        ))}
      </div>
      <Card
        className="border-none"
        style={{ background: "oklch(var(--yellow-light))" }}
      >
        <CardContent className="p-3">
          <p className="font-bold text-sm text-yellow-gp mb-1">💡 Pro Tip</p>
          <p className="text-sm">{shapes[selectedShape].tip}</p>
        </CardContent>
      </Card>
    </div>
  );
}

// ===== SOAP CARVING =====
export function SoapCarving() {
  return (
    <CraftGuide
      title="Soap Carving"
      emoji="🧼"
      color="teal-light"
      borderColor="teal"
      materials={[
        "1 bar of Ivory or Dove soap (soft bars work best)",
        "Plastic knife or popsicle stick",
        "Butter knife (with adult help for detail work)",
        "Toothpick for fine details",
        "Paper towel",
        "Pencil or toothpick for marking",
      ]}
      steps={[
        "Unwrap your soap and let it sit overnight to harden slightly",
        "Use a pencil or toothpick to lightly sketch your design onto the soap surface",
        "Simple shapes work best: star, heart, turtle, cat face, flower",
        "Use a plastic knife to carve away the outer edges following your sketch",
        "Work slowly — remove small amounts at a time",
        "Use a toothpick to add fine details like petals, features, or patterns",
        "Smooth rough edges by gently rubbing with a slightly damp finger",
        "Display your creation or use it in the bath for a sweet-smelling treat!",
      ]}
      tips={[
        "Save soap shavings! Mix with water to make liquid hand soap",
        "Keep your carving simple and bold — intricate details often break",
        "Cold soap carves more cleanly than warm soap",
      ]}
    />
  );
}

// ===== KINDNESS ROCK PAINTING =====
export function KindnessRockPainting() {
  return (
    <CraftGuide
      title="Kindness Rock Painting"
      emoji="🪨"
      color="purple-light"
      borderColor="purple"
      materials={[
        "Smooth, flat rocks (collect from outside or buy)",
        "Acrylic paint (bright colors)",
        "Small paintbrushes",
        "Black paint pen for outlines",
        "Mod Podge or clear sealant spray",
        "White base coat paint",
      ]}
      steps={[
        "Wash and dry your rocks completely",
        "Paint a white base coat over each rock and let dry (this helps colors pop!)",
        "Choose your design: a sun, rainbow, flower, heart, or a kind message",
        "Paint your main design with bright colors and let dry",
        "Add details and outlines with a black paint pen",
        "Write a kind message: 'You are loved', 'Keep going!', 'Smile!'",
        "Seal with Mod Podge or clear spray when completely dry",
        "Leave your rocks in parks, benches, or gardens to brighten someone's day! 🌟",
      ]}
      tips={[
        "Use at least 2 coats of white base for the best color payoff",
        "Seal the rocks with 2-3 layers of Mod Podge so they're weatherproof",
        "Start a Kindness Rock trail in your neighborhood!",
      ]}
    />
  );
}

// ===== JEWELRY MAKING =====
export function JewelryMaking() {
  return (
    <CraftGuide
      title="Jewelry Making"
      emoji="💍"
      color="pink-light"
      borderColor="pink"
      materials={[
        "Seed beads (various colors)",
        "Elastic cord or jewelry wire",
        "Clasps and jump rings",
        "Needle for beading",
        "Scissors",
        "Pendant charms (optional)",
        "Crimp beads (for wire jewelry)",
      ]}
      steps={[
        "Plan your design: what colors, patterns, and length do you want?",
        "Cut elastic cord about 4 inches longer than your finished length",
        "Thread your needle and string beads in your chosen pattern",
        "For bracelets: measure around your wrist + 1 inch for the knot",
        "When done beading, tie a strong double knot and trim excess cord",
        "For wire: use crimp beads to secure — squeeze with pliers",
        "Add a charm or pendant to the center for a focal point",
        "For necklaces: use a clasp; for rings: tie elastic tightly around your finger",
      ]}
      tips={[
        "Use a bead mat or tray so beads don't roll away",
        "Secure your knot with a tiny dab of clear nail polish",
        "Try a memory wire bracelet — it holds its shape without a clasp!",
      ]}
    />
  );
}

// ===== DOLLHOUSE DECORATING =====
export function DollhouseDecorating() {
  return (
    <CraftGuide
      title="Dollhouse Decorating"
      emoji="🏠"
      color="yellow-light"
      borderColor="yellow"
      materials={[
        "Cardboard boxes (various sizes)",
        "Wrapping paper or washi tape for wallpaper",
        "Fabric scraps for rugs and curtains",
        "Popsicle sticks for furniture frames",
        "Small bottle caps as vases or bowls",
        "Buttons and beads for decorations",
        "Hot glue gun (with adult help)",
        "Colored markers and paint",
      ]}
      steps={[
        "Choose your boxes: shoe boxes make great rooms, small boxes become furniture",
        "Design your room layout before gluing — bedroom, kitchen, living room?",
        "Cover box walls with cut pieces of wrapping paper as wallpaper",
        "Make a rug from a fabric scrap — cut to fit the floor",
        "Build a bed: stack two flat pieces of cardboard + fabric pillow and blanket",
        "Make a sofa: box + fabric wrapped around it, secured with glue",
        "Add curtains with fabric strips taped to the top of window cut-outs",
        "Decorate with tiny paintings (drawn on paper), vases (bottle caps), and plants",
      ]}
      tips={[
        "Use hot glue sparingly — it dries fast so work quickly!",
        "Magazine cut-outs make perfect tiny artwork for the walls",
        "Model Magic clay is great for making tiny food, fruits, and accessories",
      ]}
    />
  );
}

// ===== FRIENDSHIP SCRAPBOOKING =====
export function FriendshipScrapbooking() {
  const [pages, setPages] = useState([
    { id: "p1", title: "Our First Meeting", description: "" },
    { id: "p2", title: "Funniest Memory", description: "" },
    { id: "p3", title: "Best Adventure Together", description: "" },
  ]);

  const updatePage = (
    i: number,
    field: "title" | "description",
    val: string,
  ) => {
    setPages((prev) => {
      const n = [...prev];
      n[i] = { ...n[i], [field]: val };
      return n;
    });
  };

  const addPage = () => {
    setPages((prev) => [
      ...prev,
      { id: `p${prev.length + 1}`, title: "New Memory", description: "" },
    ]);
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-pink-gp font-bold">
        📸 Friendship Scrapbooking
      </h3>
      <p className="text-muted-foreground">
        Plan your friendship scrapbook pages! Give each memory a title and
        describe what to include.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((page, i) => (
          <Card
            key={page.id}
            className="border-2 border-pink-light-gp"
            data-ocid={`scrapbook.item.${i + 1}`}
          >
            <CardContent className="p-4 flex flex-col gap-3">
              <div className="font-display font-bold text-pink-gp text-sm">
                📖 Page {i + 1}
              </div>
              <Input
                placeholder="Page title..."
                value={page.title}
                onChange={(e) => updatePage(i, "title", e.target.value)}
                className="border-pink-light-gp text-sm"
                data-ocid="scrapbook.input"
              />
              <Textarea
                placeholder="What photos, mementos, or stickers will you include? What happened?"
                value={page.description}
                onChange={(e) => updatePage(i, "description", e.target.value)}
                rows={3}
                className="resize-none text-sm"
              />
              {page.title && (
                <div className="bg-pink-light-gp rounded-lg p-2 text-xs text-pink-gp font-bold">
                  "{page.title}" ✨
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        onClick={addPage}
        variant="outline"
        className="self-start rounded-full border-pink-gp text-pink-gp"
        data-ocid="scrapbook.primary_button"
      >
        + Add Another Page
      </Button>

      <Card className="bg-pink-light-gp border-none">
        <CardContent className="p-4">
          <p className="font-bold text-pink-gp mb-2">💡 Scrapbook Ideas</p>
          <ul className="text-sm space-y-1 text-foreground">
            <li>
              • Include ticket stubs, receipts, wrappers from your adventures
            </li>
            <li>
              • Print photos at a pharmacy and stick them in with decorative
              tape
            </li>
            <li>• Write quotes your friend always says</li>
            <li>• Rate your friendship moments: ⭐⭐⭐⭐⭐</li>
            <li>• Include a folded note or letter from each other</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

// ===== DECORATING YOUR JOURNAL =====
export function DecoratingYourJournal() {
  return (
    <CraftGuide
      title="Decorate Your Journal"
      emoji="📔"
      color="purple-light"
      borderColor="purple"
      materials={[
        "Blank journal or notebook",
        "Washi tape (various patterns)",
        "Stickers and die-cuts",
        "Fine-tip markers and gel pens",
        "Watercolor paints",
        "Magazine clippings",
        "Mod Podge or glue stick",
        "Stamps and ink pad (optional)",
      ]}
      steps={[
        "Start with the cover: lay out your design before gluing anything down",
        "Use washi tape strips diagonally or in patterns across the cover",
        "Arrange stickers and cutouts for a collage effect — overlapping looks great",
        "Add your name in large bubble letters using gel pens",
        "Paint a watercolor background on the cover for a dreamy effect",
        "Seal the whole cover with a layer of Mod Podge for protection",
        "Decorate the inside back cover too — quotes, your fave things, selfie space",
        "Add page tabs with washi tape folded over the edge of key pages",
      ]}
      tips={[
        "Let each layer fully dry before adding the next to avoid smearing",
        "Use a white gel pen over dark surfaces for stunning pop-art text",
        "Emboss your name on the cover using a stamp, embossing powder + heat gun",
      ]}
    />
  );
}

// ===== PUPPET SHOW THEATER =====
interface PuppetCharacter {
  id: string;
  name: string;
  lines: string[];
}

export function PuppetShowTheater() {
  const [characters, setCharacters] = useState<PuppetCharacter[]>([
    { id: "c1", name: "Princess Sparkle", lines: [""] },
    { id: "c2", name: "Dragon Ember", lines: [""] },
  ]);
  const [showTitle, setShowTitle] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const updateCharacterName = (ci: number, name: string) => {
    setCharacters((prev) => {
      const n = [...prev];
      n[ci] = { ...n[ci], name };
      return n;
    });
  };

  const addLine = (ci: number) => {
    setCharacters((prev) => {
      const n = [...prev];
      n[ci] = { ...n[ci], lines: [...n[ci].lines, ""] };
      return n;
    });
  };

  const updateLine = (ci: number, li: number, val: string) => {
    setCharacters((prev) => {
      const n = [...prev];
      const lines = [...n[ci].lines];
      lines[li] = val;
      n[ci] = { ...n[ci], lines };
      return n;
    });
  };

  const addCharacter = () => {
    setCharacters((prev) => [
      ...prev,
      {
        id: `c${prev.length + 1}`,
        name: `Character ${prev.length + 1}`,
        lines: [""],
      },
    ]);
  };

  const charColors = [
    "pink-gp",
    "teal-gp",
    "purple-gp",
    "yellow-gp",
    "coral-gp",
  ];

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-purple-gp font-bold">
        🎭 Puppet Show Theater
      </h3>
      <p className="text-muted-foreground">
        Write your puppet show script! Name your characters and give them their
        lines.
      </p>

      <div>
        <label
          htmlFor="puppet-show-title"
          className="text-sm font-bold text-muted-foreground block mb-1"
        >
          Show Title
        </label>
        <Input
          id="puppet-show-title"
          placeholder="The Amazing Puppet Adventure..."
          value={showTitle}
          onChange={(e) => setShowTitle(e.target.value)}
          className="border-purple-gp max-w-sm"
          data-ocid="puppet.input"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button
          size="sm"
          variant={!previewMode ? "default" : "outline"}
          className={`rounded-full ${!previewMode ? "bg-purple-gp text-white" : "border-purple-gp text-purple-gp"}`}
          onClick={() => setPreviewMode(false)}
          data-ocid="puppet.tab"
        >
          ✏️ Write
        </Button>
        <Button
          size="sm"
          variant={previewMode ? "default" : "outline"}
          className={`rounded-full ${previewMode ? "bg-purple-gp text-white" : "border-purple-gp text-purple-gp"}`}
          onClick={() => setPreviewMode(true)}
          data-ocid="puppet.tab"
        >
          🎭 Preview Script
        </Button>
      </div>

      {!previewMode ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {characters.map((char, ci) => (
            <Card
              key={char.id}
              className="border-2 border-purple-light-gp"
              data-ocid={`puppet.item.${ci + 1}`}
            >
              <CardContent className="p-4 flex flex-col gap-3">
                <div
                  className={`font-display font-bold text-${charColors[ci % charColors.length]} text-sm`}
                >
                  🎭 Character {ci + 1}
                </div>
                <Input
                  placeholder="Character name..."
                  value={char.name}
                  onChange={(e) => updateCharacterName(ci, e.target.value)}
                  className="border-purple-light-gp font-bold"
                />
                <div className="flex flex-col gap-2">
                  {char.lines.map((line, li) => (
                    <Textarea
                      key={`${char.id}-line-${li}`}
                      placeholder={`Line ${li + 1}...`}
                      value={line}
                      onChange={(e) => updateLine(ci, li, e.target.value)}
                      rows={2}
                      className="resize-none text-sm"
                    />
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="self-start text-xs border-purple-gp text-purple-gp rounded-full"
                  onClick={() => addLine(ci)}
                  data-ocid="puppet.secondary_button"
                >
                  + Add Line
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-2 border-purple-gp bg-purple-light-gp">
          <CardContent className="p-5">
            {showTitle && (
              <h4 className="font-display text-xl font-bold text-purple-gp text-center mb-4">
                🎭 "{showTitle}"
              </h4>
            )}
            {characters.flatMap((char, ci) =>
              char.lines.filter(Boolean).map((line) => (
                <div
                  key={`${char.name}-${line.slice(0, 20)}`}
                  className="mb-2 text-sm"
                >
                  <span
                    className={`font-bold text-${charColors[ci % charColors.length]}`}
                  >
                    {char.name}:{" "}
                  </span>
                  <span className="italic">"{line}"</span>
                </div>
              )),
            )}
            {characters.every((c) => c.lines.every((l) => !l)) && (
              <p className="text-muted-foreground text-center text-sm">
                Write some lines in the editor to preview your script!
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="rounded-full border-purple-gp text-purple-gp"
          onClick={addCharacter}
          data-ocid="puppet.primary_button"
        >
          + Add Character
        </Button>
      </div>

      <Card className="bg-yellow-light-gp border-none">
        <CardContent className="p-4">
          <p className="font-bold text-yellow-gp mb-2">
            🧦 How to Make Puppets
          </p>
          <div className="grid gap-2 sm:grid-cols-2 text-sm">
            <div>
              <strong>Sock Puppet:</strong> Slide hand into old sock, glue felt
              eyes and yarn hair onto the toe end
            </div>
            <div>
              <strong>Paper Bag Puppet:</strong> Draw a face on the folded flap
              — it opens and closes like a mouth!
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ===== VISION / DREAM BOARD =====
const VISION_CATEGORIES = [
  "Career",
  "Travel",
  "Friendship",
  "Health",
  "Learning",
  "Creativity",
  "Family",
  "Adventure",
  "Personal Growth",
  "Fun",
];

export function VisionBoardSection() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Career");
  const addItem = useAddVisionItem();
  const { data: items = [], isLoading } = useGetVisionBoard();

  const categoryColors: Record<string, string> = {
    Career: "bg-pink-light-gp text-pink-gp border-pink-gp",
    Travel: "bg-teal-light-gp text-teal-gp border-teal-gp",
    Friendship: "bg-yellow-light-gp text-yellow-gp border-yellow-gp",
    Health: "bg-green-50 text-green-700 border-green-400",
    Learning: "bg-purple-light-gp text-purple-gp border-purple-gp",
    Creativity: "bg-coral-light-gp text-coral-gp border-coral-gp",
    Family: "bg-rose-50 text-rose-600 border-rose-400",
    Adventure: "bg-amber-50 text-amber-700 border-amber-400",
    "Personal Growth": "bg-violet-50 text-violet-700 border-violet-400",
    Fun: "bg-sky-50 text-sky-700 border-sky-400",
  };

  const handleAdd = async () => {
    if (!title.trim()) {
      toast.error("Give your dream a title!");
      return;
    }
    await addItem.mutateAsync({
      title: title.trim(),
      description: desc.trim(),
      category,
    });
    setTitle("");
    setDesc("");
    toast.success("Dream added to your vision board! 🌟");
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-pink-gp font-bold">
        Dream Board / Vision Board ✨
      </h3>
      <p className="text-muted-foreground">
        Add your dreams and aspirations! What do you want to achieve?
      </p>

      <Card className="border-2 border-pink-light-gp">
        <CardContent className="p-5 flex flex-col gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="vision-title"
                className="text-sm font-bold text-muted-foreground block mb-1"
              >
                My Dream / Goal
              </label>
              <Input
                id="vision-title"
                placeholder="e.g. Become a marine biologist"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-border focus:border-pink-gp"
                data-ocid="vision.input"
              />
            </div>
            <div>
              <label
                htmlFor="vision-category"
                className="text-sm font-bold text-muted-foreground block mb-1"
              >
                Category
              </label>
              <select
                id="vision-category"
                className="w-full px-3 py-2 rounded-lg border border-border focus:border-pink-gp outline-none text-sm bg-background"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                data-ocid="vision.select"
              >
                {VISION_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="vision-desc"
              className="text-sm font-bold text-muted-foreground block mb-1"
            >
              Why this dream? (optional)
            </label>
            <Input
              id="vision-desc"
              placeholder="Because I love animals and the ocean..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="border-border focus:border-pink-gp"
            />
          </div>
          <Button
            onClick={handleAdd}
            disabled={addItem.isPending}
            className="bg-pink-gp text-white rounded-full self-start px-8"
            data-ocid="vision.submit_button"
          >
            Add to Board ✨
          </Button>
        </CardContent>
      </Card>

      {isLoading ? (
        <div
          className="text-center text-muted-foreground py-4"
          data-ocid="vision.loading_state"
        >
          Loading your dreams... ✨
        </div>
      ) : items.length === 0 ? (
        <div
          className="text-center text-muted-foreground py-8 bg-muted rounded-xl"
          data-ocid="vision.empty_state"
        >
          <div className="text-4xl mb-2">🌟</div>
          <p className="font-display font-bold">
            Your vision board is empty! Add your first dream above.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Card
              key={item.title + item.category}
              className={`border-2 card-hover ${categoryColors[item.category] || "bg-card border-border"}`}
              data-ocid={`vision.item.${i + 1}`}
            >
              <CardContent className="p-4">
                <Badge variant="outline" className="text-xs mb-2">
                  {item.category}
                </Badge>
                <p className="font-display font-bold">{item.title}</p>
                {item.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.description}
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

// ===== ART GALLERY =====
const PALETTE_COLORS = [
  { label: "Hot Pink", hex: "#e91e8c" },
  { label: "Purple", hex: "#9b59b6" },
  { label: "Teal", hex: "#1abc9c" },
  { label: "Coral", hex: "#ff6b6b" },
  { label: "Golden", hex: "#f39c12" },
  { label: "Sky Blue", hex: "#3498db" },
  { label: "Forest", hex: "#27ae60" },
  { label: "Black", hex: "#1a1a2e" },
  { label: "White", hex: "#ffffff" },
];

interface SavedArtwork {
  id: number;
  dataUrl: string;
}

export function ArtGallery() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(PALETTE_COLORS[0].hex);
  const [brushSize, setBrushSize] = useState(6);
  const [savedArt, setSavedArt] = useState<SavedArtwork[]>([]);
  const artIdRef = useRef(0);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#fff8f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    lastPos.current = getPos(e);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    const pos = getPos(e);
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = color;
    ctx.beginPath();
    if (lastPos.current) {
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
    }
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  };

  const stopDraw = () => {
    setIsDrawing(false);
    lastPos.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    ctx.fillStyle = "#fff8f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveToGallery = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (savedArt.length >= 6) {
      toast.error("Gallery full! Delete one to add more.");
      return;
    }
    const dataUrl = canvas.toDataURL("image/png");
    artIdRef.current += 1;
    setSavedArt((prev) => [{ id: artIdRef.current, dataUrl }, ...prev]);
    clearCanvas();
    toast.success("Saved to your gallery! 🎨");
  };

  const deleteArt = (id: number) => {
    setSavedArt((prev) => prev.filter((art) => art.id !== id));
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-yellow-gp font-bold">
        Art Gallery 🎨
      </h3>
      <p className="text-muted-foreground">
        Draw with your mouse or finger, pick your colors, and save your
        masterpieces!
      </p>

      <div className="flex flex-col gap-3">
        {/* Color Palette */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-bold text-muted-foreground">
            Color:
          </span>
          {PALETTE_COLORS.map((c) => (
            <button
              key={c.hex}
              type="button"
              title={c.label}
              className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${color === c.hex ? "border-foreground scale-110 shadow-lg" : "border-border"}`}
              style={{ backgroundColor: c.hex }}
              onClick={() => setColor(c.hex)}
              data-ocid="artgallery.toggle"
            />
          ))}
        </div>

        {/* Brush Size */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-muted-foreground">
            Brush:
          </span>
          {[3, 6, 12, 20].map((size) => (
            <button
              key={size}
              type="button"
              className={`rounded-full border-2 flex items-center justify-center transition-all ${brushSize === size ? "border-yellow-gp bg-yellow-light-gp" : "border-border hover:border-yellow-gp"}`}
              style={{ width: `${size + 16}px`, height: `${size + 16}px` }}
              onClick={() => setBrushSize(size)}
              data-ocid="artgallery.toggle"
            >
              <span
                className="rounded-full bg-foreground"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="border-4 border-yellow-gp rounded-2xl overflow-hidden bg-[#fff8f0] cursor-crosshair touch-none">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="w-full"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
          data-ocid="artgallery.canvas_target"
        />
      </div>

      <div className="flex gap-3">
        <Button
          className="bg-yellow-gp text-foreground font-bold rounded-full"
          onClick={saveToGallery}
          disabled={savedArt.length >= 6}
          data-ocid="artgallery.save_button"
        >
          Save to Gallery 🖼️
        </Button>
        <Button
          variant="outline"
          className="rounded-full border-yellow-gp text-yellow-gp"
          onClick={clearCanvas}
          data-ocid="artgallery.secondary_button"
        >
          Clear Canvas 🗑️
        </Button>
      </div>

      {/* Saved Gallery */}
      {savedArt.length > 0 && (
        <div>
          <h4 className="font-display font-bold text-yellow-gp mb-3">
            🖼️ Your Saved Masterpieces ({savedArt.length}/6)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {savedArt.map((artwork, i) => (
              <div
                key={artwork.id}
                className="relative group rounded-xl overflow-hidden border-2 border-yellow-gp"
                data-ocid={`artgallery.item.${i + 1}`}
              >
                <img
                  src={artwork.dataUrl}
                  alt={`Artwork ${i + 1}`}
                  className="w-full object-cover"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-destructive text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => deleteArt(artwork.id)}
                  data-ocid={`artgallery.delete_button.${i + 1}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
