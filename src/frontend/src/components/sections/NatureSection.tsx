import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

// ===== NATURE SCAVENGER HUNT =====
const DEFAULT_SCAVENGER_ITEMS = [
  "A smooth round rock 🪨",
  "A feather from a bird 🪶",
  "A leaf with 5 or more points 🍁",
  "A dandelion or yellow flower 🌼",
  "Something green and fuzzy (moss) 🌿",
  "An acorn or seed pod 🌰",
  "A bug with wings 🦋",
  "A spider web (without the spider!) 🕸️",
  "A piece of bark 🌳",
  "A snail or snail trail 🐌",
  "A pinecone 🪵",
  "A bird nest (don't touch it!) 🐦",
];

export function NatureScavengerHunt() {
  const [localChecked, setLocalChecked] = useState<boolean[]>(
    new Array(DEFAULT_SCAVENGER_ITEMS.length).fill(false),
  );
  const found = localChecked.filter(Boolean).length;

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl text-teal-gp font-bold">
          Nature Scavenger Hunt 🔍
        </h3>
        <Badge className="bg-teal-gp text-white">
          {found}/{DEFAULT_SCAVENGER_ITEMS.length} found!
        </Badge>
      </div>
      <p className="text-muted-foreground">
        Go outside and find these natural treasures! Check them off as you go.
        🌿
      </p>

      <div className="bg-teal-light-gp rounded-full h-3">
        <div
          className="bg-teal-gp h-3 rounded-full transition-all duration-500"
          style={{
            width: `${(found / DEFAULT_SCAVENGER_ITEMS.length) * 100}%`,
          }}
        />
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {DEFAULT_SCAVENGER_ITEMS.map((item, i) => (
          <button
            key={item}
            type="button"
            className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors text-left w-full ${localChecked[i] ? "bg-teal-light-gp border-teal-gp" : "bg-card border-border hover:border-teal-gp"}`}
            onClick={() =>
              setLocalChecked((prev) => {
                const n = [...prev];
                n[i] = !n[i];
                return n;
              })
            }
            data-ocid={`scavenger.checkbox.${i + 1}`}
          >
            <Checkbox
              checked={localChecked[i]}
              className="border-teal-gp data-[state=checked]:bg-teal-gp shrink-0"
            />
            <span
              className={`text-sm ${localChecked[i] ? "line-through text-muted-foreground" : ""}`}
            >
              {item}
            </span>
          </button>
        ))}
      </div>

      {found === DEFAULT_SCAVENGER_ITEMS.length && (
        <Card
          className="bg-yellow-light-gp border-none text-center"
          data-ocid="scavenger.success_state"
        >
          <CardContent className="p-6">
            <div className="text-4xl mb-2">🏆</div>
            <p className="font-display text-xl font-bold text-yellow-gp">
              You found EVERYTHING! Amazing nature explorer! 🌟
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ===== MINI GARDEN =====
const PLANTS = [
  {
    name: "Sunflowers 🌻",
    difficulty: "Super Easy",
    time: "60-90 days",
    steps: [
      "Fill a cup or small pot with potting soil",
      "Push one sunflower seed 1 inch deep",
      "Water gently until soil is moist but not soggy",
      "Place in the sunniest spot you can find",
      "Water every 2-3 days — feel the soil first!",
      "Watch it grow! Sunflowers can grow over 6 feet tall!",
    ],
    tips: "Sunflowers track the sun! Watch them turn toward the light.",
  },
  {
    name: "Basil Herb 🌿",
    difficulty: "Easy",
    time: "3-4 weeks",
    steps: [
      "Fill a cup 3/4 with potting mix",
      "Sprinkle 3-4 seeds on the surface",
      "Cover lightly with 1/4 inch of soil",
      "Water gently and cover with plastic wrap for a greenhouse effect",
      "Remove plastic when seedlings appear (5-7 days)",
      "Keep on a sunny windowsill and water when dry",
    ],
    tips: "Snip leaves regularly to help the plant grow bushier! Add to pizza or pasta.",
  },
  {
    name: "Marigolds 🟠",
    difficulty: "Easy",
    time: "45-60 days",
    steps: [
      "Plant seeds 1/4 inch deep in potting soil",
      "Space seeds about 3 inches apart",
      "Water lightly every day until seeds sprout",
      "Once sprouted, water every 2 days",
      "Pinch off dead flowers to encourage more blooms",
      "Marigolds repel pests — plant near vegetables!",
    ],
    tips: "Marigolds are natural bug repellents and attract helpful pollinators!",
  },
];

export function MiniGarden() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-teal-gp font-bold">
        Grow Your Own Mini Garden 🌱
      </h3>
      <p className="text-muted-foreground">
        Start with these easy-to-grow plants — even in a small space!
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {PLANTS.map((plant, i) => (
          <Card
            key={plant.name}
            className={`cursor-pointer card-hover border-2 transition-all ${selected === i ? "border-teal-gp bg-teal-light-gp" : "border-border hover:border-teal-gp"}`}
            onClick={() => setSelected(selected === i ? null : i)}
            data-ocid={`garden.item.${i + 1}`}
          >
            <CardContent className="p-4">
              <h4 className="font-display font-bold">{plant.name}</h4>
              <div className="flex gap-1 mt-1">
                <Badge variant="outline" className="text-xs">
                  {plant.difficulty}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  ⏱ {plant.time}
                </Badge>
              </div>
              {selected === i && (
                <div className="mt-3 border-t border-teal-gp pt-3">
                  <ol className="flex flex-col gap-1">
                    {plant.steps.map((step, si) => (
                      <li key={step} className="text-xs flex gap-2">
                        <span className="text-teal-gp font-bold">
                          {si + 1}.
                        </span>{" "}
                        {step}
                      </li>
                    ))}
                  </ol>
                  <p className="text-xs text-teal-gp font-bold mt-2">
                    💡 {plant.tips}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ===== SAVE THE BEES =====
export function SaveTheBees() {
  const [checked, setChecked] = useState<boolean[]>(new Array(6).fill(false));
  const beeFacts = [
    "Honey bees can fly up to 15 mph and visit 2,000 flowers a day! 🌸",
    "One-third of our food supply depends on bees for pollination! 🥑",
    "A single bee makes only 1/12 teaspoon of honey in its lifetime! 🍯",
    "Bees communicate by dancing — they do a 'waggle dance' to show where flowers are! 💃",
    "Queen bees can live up to 5 years; worker bees live about 6 weeks! 👑",
    "There are over 20,000 species of bees in the world! 🐝",
  ];
  const gardenProjects = [
    "Plant bee-friendly flowers: lavender, sunflowers, coneflowers, marigolds",
    "Put out a shallow dish of water with stones for bees to drink from",
    "Avoid pesticides in your garden — they harm bees!",
    "Leave some areas of your garden 'wild' for ground-nesting bees",
    "Set up a small bee hotel for solitary bees",
    "Let dandelions grow — they're one of the first spring foods for bees!",
  ];

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-yellow-gp font-bold">
        Save the Bees! 🐝
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-yellow-light-gp border-none">
          <CardContent className="p-4">
            <h4 className="font-display font-bold text-yellow-gp mb-3">
              Amazing Bee Facts 🍯
            </h4>
            {beeFacts.map((fact) => (
              <p key={fact} className="text-sm mb-2 leading-relaxed">
                {fact}
              </p>
            ))}
          </CardContent>
        </Card>
        <Card className="border-2 border-yellow-gp">
          <CardContent className="p-4">
            <h4 className="font-display font-bold text-yellow-gp mb-3">
              Your Bee Garden Project ✅
            </h4>
            <p className="text-xs text-muted-foreground mb-3">
              Check off each action to help save the bees!
            </p>
            {gardenProjects.map((project, i) => (
              <button
                key={project}
                type="button"
                className="flex items-start gap-2 mb-2 cursor-pointer text-left w-full bg-transparent border-0 p-0"
                onClick={() =>
                  setChecked((prev) => {
                    const n = [...prev];
                    n[i] = !n[i];
                    return n;
                  })
                }
                data-ocid={`bees.checkbox.${i + 1}`}
              >
                <Checkbox
                  checked={checked[i]}
                  className="mt-0.5 border-yellow-gp data-[state=checked]:bg-yellow-gp shrink-0"
                />
                <span
                  className={`text-sm ${checked[i] ? "line-through text-muted-foreground" : ""}`}
                >
                  {project}
                </span>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ===== BIRD WATCHING =====
const BIRDS = [
  {
    name: "American Robin 🐦",
    features: "Orange-red breast, dark back",
    song: "Cheerily, cheer-up!",
    when: "Year-round",
  },
  {
    name: "Blue Jay 💙",
    features: "Bright blue feathers, white chest, crest on head",
    song: "Jay! Jay! Jay!",
    when: "Year-round",
  },
  {
    name: "Cardinal 🔴",
    features: "Males are bright red, females brownish-red",
    song: "Cheer, cheer, cheer!",
    when: "Year-round",
  },
  {
    name: "Chickadee 🖤",
    features: "Black cap and bib, white cheeks, tiny size",
    song: "Chick-a-dee-dee-dee",
    when: "Year-round",
  },
  {
    name: "House Sparrow 🟫",
    features: "Brown and gray, small and round",
    song: "Chirp! Chirp!",
    when: "Year-round",
  },
  {
    name: "Mourning Dove 🕊️",
    features: "Gray-brown, long pointed tail",
    song: "Coo-OOO-oo",
    when: "Year-round",
  },
  {
    name: "Hummingbird 🌸",
    features: "Tiny, jewel-colored, hovers in place",
    song: "High-pitched chirps",
    when: "Spring/Summer",
  },
  {
    name: "Woodpecker 🪵",
    features: "Black-white pattern, red on head, pecks on trees",
    song: "Loud rapid tapping!",
    when: "Year-round",
  },
  {
    name: "Canada Goose 🌊",
    features: "Large, black neck, white chin patch",
    song: "HONK! HONK!",
    when: "Spring/Fall migration",
  },
  {
    name: "Goldfinch ⭐",
    features: "Bright yellow body, black wings",
    song: "Per-chic-o-ree!",
    when: "Summer",
  },
];

export function BirdWatching() {
  const [spotted, setSpotted] = useState<boolean[]>(
    new Array(BIRDS.length).fill(false),
  );
  const spottedCount = spotted.filter(Boolean).length;

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl text-teal-gp font-bold">
          Bird Watching 🐦
        </h3>
        <Badge className="bg-teal-gp text-white">
          {spottedCount}/{BIRDS.length} spotted!
        </Badge>
      </div>
      <p className="text-muted-foreground">
        Keep a pair of binoculars handy! Check off each bird when you spot it.
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {BIRDS.map((bird, i) => (
          <button
            key={bird.name}
            type="button"
            className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all text-left w-full ${spotted[i] ? "bg-teal-light-gp border-teal-gp" : "border-border hover:border-teal-gp"}`}
            onClick={() =>
              setSpotted((prev) => {
                const n = [...prev];
                n[i] = !n[i];
                return n;
              })
            }
            data-ocid={`birds.checkbox.${i + 1}`}
          >
            <Checkbox
              checked={spotted[i]}
              className="mt-1 border-teal-gp data-[state=checked]:bg-teal-gp shrink-0"
            />
            <div>
              <p className="font-bold text-sm">{bird.name}</p>
              <p className="text-xs text-muted-foreground">{bird.features}</p>
              <p className="text-xs text-teal-gp">Song: "{bird.song}"</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ===== ROCK COLLECTING =====
const ROCK_TYPES = [
  {
    name: "Granite 🌑",
    fact: "Speckled gray/pink rock — very hard, made from cooled magma",
  },
  {
    name: "Quartz 💎",
    fact: "Clear or white crystal — one of Earth's most common minerals",
  },
  {
    name: "Obsidian 🖤",
    fact: "Shiny black volcanic glass — forms when lava cools super fast",
  },
  {
    name: "Limestone 🪨",
    fact: "Light tan/grey — often contains fossils of ancient sea creatures",
  },
  {
    name: "Sandstone 🟤",
    fact: "Rough, sandy texture — formed from compressed sand over millions of years",
  },
  {
    name: "Marble 🌿",
    fact: "Smooth with swirling patterns — metamorphic rock used in sculptures",
  },
  {
    name: "Basalt ⚫",
    fact: "Dark gray/black — the most common volcanic rock on Earth",
  },
  {
    name: "Geode 🔮",
    fact: "Looks plain outside but has crystals hidden inside!",
  },
  {
    name: "Pumice 🫧",
    fact: "Light enough to float on water — formed from gas bubbles in lava",
  },
  {
    name: "Shale 📜",
    fact: "Flat, layered rock — formed from compressed mud and clay",
  },
];

export function RockCollecting() {
  const [collected, setCollected] = useState<boolean[]>(
    new Array(ROCK_TYPES.length).fill(false),
  );
  const count = collected.filter(Boolean).length;

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl text-teal-gp font-bold">
          Rock Collecting 🪨
        </h3>
        <Badge className="bg-teal-gp text-white">
          {count}/{ROCK_TYPES.length} collected!
        </Badge>
      </div>
      <p className="text-muted-foreground">
        Check off each rock type as you find it! Look in parks, riverbeds,
        gravel driveways, and construction sites.
      </p>
      <div className="bg-teal-light-gp rounded-full h-3">
        <div
          className="bg-teal-gp h-3 rounded-full transition-all duration-500"
          style={{ width: `${(count / ROCK_TYPES.length) * 100}%` }}
        />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {ROCK_TYPES.map((rock, i) => (
          <button
            key={rock.name}
            type="button"
            className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all text-left w-full ${collected[i] ? "bg-teal-light-gp border-teal-gp" : "border-border hover:border-teal-gp"}`}
            onClick={() =>
              setCollected((prev) => {
                const n = [...prev];
                n[i] = !n[i];
                return n;
              })
            }
            data-ocid={`rocks.checkbox.${i + 1}`}
          >
            <Checkbox
              checked={collected[i]}
              className="mt-1 border-teal-gp data-[state=checked]:bg-teal-gp shrink-0"
            />
            <div>
              <p className="font-bold text-sm">{rock.name}</p>
              <p className="text-xs text-muted-foreground">{rock.fact}</p>
            </div>
          </button>
        ))}
      </div>
      {count === ROCK_TYPES.length && (
        <Card
          className="bg-yellow-light-gp border-none text-center"
          data-ocid="rocks.success_state"
        >
          <CardContent className="p-6">
            <div className="text-4xl mb-2">🏆</div>
            <p className="font-display text-xl font-bold text-yellow-gp">
              Rock Star Collector! You found all 10 types! 🌟
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ===== LEAF RUBBINGS =====
export function LeafRubbings() {
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>(
    new Array(8).fill(false),
  );
  const steps = [
    "Collect fresh leaves with visible veins — maple, oak, fern, and ivy work great",
    "Place a leaf face-down (vein side up) on a flat, hard surface",
    "Lay thin white paper over the leaf",
    "Hold the paper firmly with one hand so it doesn't shift",
    "Rub the side of a crayon over the paper in long, smooth strokes",
    "Watch the leaf shape and veins appear like magic!",
    "Try layering multiple leaves for a forest scene",
    "Use different colors for different leaves to make a rainbow collage",
  ];
  const tips = [
    "Thinner paper shows more detail — try tissue paper!",
    "Use the side of a peeled crayon for the best rubbing effect",
    "Press firmly but not too hard or the leaf will crumple",
    "Try rubbing textures from bark, coins, and fabric too!",
  ];

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-teal-gp font-bold">
        🍂 Leaf Rubbings
      </h3>
      <p className="text-muted-foreground">
        Create beautiful nature art with leaves and crayons — no drawing skills
        needed!
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-2 border-teal-light-gp">
          <CardContent className="p-4">
            <h4 className="font-display font-bold text-teal-gp mb-3">
              Step-by-Step Checklist
            </h4>
            {steps.map((step, i) => (
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
                data-ocid={`leaf.checkbox.${i + 1}`}
              >
                <Checkbox
                  checked={checkedSteps[i]}
                  className="border-teal-gp data-[state=checked]:bg-teal-gp shrink-0"
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
        <Card className="bg-teal-light-gp border-none">
          <CardContent className="p-4">
            <h4 className="font-display font-bold text-teal-gp mb-3">
              💡 Pro Tips
            </h4>
            {tips.map((tip) => (
              <p key={tip} className="text-sm mb-2">
                • {tip}
              </p>
            ))}
            <h4 className="font-display font-bold text-teal-gp mt-4 mb-2">
              🍁 Best Leaves to Use
            </h4>
            <div className="flex flex-wrap gap-1">
              {[
                "Maple 🍁",
                "Oak 🌿",
                "Fern 🌾",
                "Ginkgo 🌀",
                "Ivy 🍃",
                "Elm 🌳",
              ].map((leaf) => (
                <Badge key={leaf} variant="outline" className="text-xs">
                  {leaf}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ===== DREAM HOUSE DESIGN =====
export function DreamHouseDesign() {
  const rooms = [
    {
      id: "bedroom",
      label: "My Bedroom",
      emoji: "🛏️",
      placeholder:
        "Giant bean bag chair, glow-in-the-dark stars on ceiling, secret bookshelf door...",
    },
    {
      id: "kitchen",
      label: "Dream Kitchen",
      emoji: "👨‍🍳",
      placeholder:
        "Pizza oven, smoothie station, giant candy wall, indoor herb garden...",
    },
    {
      id: "living",
      label: "Living Room",
      emoji: "🛋️",
      placeholder:
        "Hammock chair, movie screen that drops from ceiling, ball pit corner...",
    },
    {
      id: "backyard",
      label: "Backyard",
      emoji: "🌳",
      placeholder:
        "Treehouse, trampoline, koi pond, vegetable garden, stargazing deck...",
    },
    {
      id: "secret",
      label: "Secret Room",
      emoji: "🔐",
      placeholder:
        "Slide from bedroom, library with rolling ladder, craft room, art studio...",
    },
  ];
  const [roomDesigns, setRoomDesigns] = useState<Record<string, string>>({});

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-yellow-gp font-bold">
        🏡 Design Your Dream House
      </h3>
      <p className="text-muted-foreground">
        What would YOUR dream house look like? Design each room!
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {rooms.map((room, idx) => (
          <Card
            key={room.id}
            className="border-2 border-yellow-light-gp"
            data-ocid={`dreamhouse.item.${idx + 1}`}
          >
            <CardContent className="p-4 flex flex-col gap-2">
              <h4 className="font-display font-bold text-yellow-gp">
                {room.emoji} {room.label}
              </h4>
              <Input
                placeholder={room.placeholder}
                value={roomDesigns[room.id] || ""}
                onChange={(e) =>
                  setRoomDesigns((prev) => ({
                    ...prev,
                    [room.id]: e.target.value,
                  }))
                }
                className="border-yellow-light-gp text-sm"
                data-ocid="dreamhouse.input"
              />
              {roomDesigns[room.id] && (
                <div className="bg-yellow-light-gp rounded-lg p-2 text-xs font-bold text-yellow-gp">
                  ✨ {roomDesigns[room.id]}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {Object.values(roomDesigns).filter(Boolean).length === rooms.length && (
        <Card
          className="bg-yellow-light-gp border-none text-center"
          data-ocid="dreamhouse.success_state"
        >
          <CardContent className="p-6">
            <div className="text-4xl mb-2">🏡</div>
            <p className="font-display text-xl font-bold text-yellow-gp">
              Your dream house is complete! Now let's build it! ✨
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ===== TREE HOUSE PLANS =====
const TREEHOUSE_FEATURES = [
  {
    name: "Rope Ladder 🪢",
    desc: "The classic — a rope ladder that you can pull up for privacy!",
  },
  {
    name: "Lookout Window 🔭",
    desc: "A special window facing your favorite view for stargazing",
  },
  { name: "Slide 🛝", desc: "A fast way down — way more fun than the ladder!" },
  {
    name: "Zip Line 🫸",
    desc: "Attach to a nearby tree for the most epic exit ever",
  },
  {
    name: "Trapdoor 🚪",
    desc: "A secret entrance from below — perfect for forts",
  },
  { name: "Hammock 🏕️", desc: "Hang a hammock inside for reading and napping" },
  {
    name: "Pulley System ⚙️",
    desc: "Hoist up snacks and supplies without climbing down",
  },
  {
    name: "Signal Flag 🚩",
    desc: "A flag you can raise to call your friends to the treehouse",
  },
  {
    name: "Secret Mailbox 📬",
    desc: "A hidden mailbox for passing notes to friends below",
  },
  {
    name: "Solar Lights 💡",
    desc: "String lights powered by a small solar panel for nighttime!",
  },
];

export function TreeHousePlans() {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(TREEHOUSE_FEATURES.length).fill(false),
  );
  const count = checked.filter(Boolean).length;

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl text-teal-gp font-bold">
          Tree House Plans 🌳
        </h3>
        <Badge className="bg-teal-gp text-white">
          {count} features planned!
        </Badge>
      </div>
      <p className="text-muted-foreground">
        Check off the features you want in your dream treehouse! Then draw it on
        paper.
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {TREEHOUSE_FEATURES.map((feat, i) => (
          <button
            key={feat.name}
            type="button"
            className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all text-left w-full ${checked[i] ? "bg-teal-light-gp border-teal-gp" : "border-border hover:border-teal-gp"}`}
            onClick={() =>
              setChecked((prev) => {
                const n = [...prev];
                n[i] = !n[i];
                return n;
              })
            }
            data-ocid={`treehouse.checkbox.${i + 1}`}
          >
            <Checkbox
              checked={checked[i]}
              className="mt-1 border-teal-gp data-[state=checked]:bg-teal-gp shrink-0"
            />
            <div>
              <p className="font-bold text-sm">{feat.name}</p>
              <p className="text-xs text-muted-foreground">{feat.desc}</p>
            </div>
          </button>
        ))}
      </div>
      {count > 0 && (
        <Card
          className="bg-teal-light-gp border-none"
          data-ocid="treehouse.panel"
        >
          <CardContent className="p-4">
            <h4 className="font-display font-bold text-teal-gp mb-2">
              🏗️ Your Treehouse Features ({count} selected)
            </h4>
            <div className="flex flex-wrap gap-2">
              {TREEHOUSE_FEATURES.filter((_, i) => checked[i]).map((feat) => (
                <Badge key={feat.name} className="bg-teal-gp text-white">
                  {feat.name}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Now draw your treehouse on paper and show a grown-up!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ===== NATURE EXPLORERS =====
const EARTH_CHALLENGES = [
  {
    emoji: "🌱",
    title: "Plant a Seed",
    desc: "Plant any seed in a cup of soil — a bean, flower, or herb. Water it every day and watch life grow in your hands!",
    impact: "Creates oxygen & feeds pollinators",
  },
  {
    emoji: "🗑️",
    title: "Pick Up 5 Pieces of Litter",
    desc: "On your next walk outside, pick up at least 5 pieces of litter and put them in the trash. Be a hero for your neighborhood!",
    impact: "Keeps wildlife safe from harmful waste",
  },
  {
    emoji: "💡",
    title: "Turn Off Lights for 1 Hour",
    desc: "Challenge your whole family to 1 hour with the lights off — use candles or natural light instead. Make it a game!",
    impact: "Saves electricity & reduces carbon emissions",
  },
  {
    emoji: "🚿",
    title: "Take a 5-Minute Shower",
    desc: "Time yourself! A short shower saves gallons of water. Challenge your family to do the same and track how much you save.",
    impact: "Saves up to 25 gallons of water!",
  },
  {
    emoji: "♻️",
    title: "Sort Your Recycling",
    desc: "Go through your household trash and make sure paper, plastic, and glass are in the right bins. Be the family recycling champion!",
    impact: "Reduces landfill waste by 30%",
  },
  {
    emoji: "🐦",
    title: "Feed the Birds",
    desc: "Put out some seeds, breadcrumbs, or fruit for local birds. Sit quietly and watch who visits. How many different birds can you spot?",
    impact: "Supports local bird populations",
  },
  {
    emoji: "🌍",
    title: "Teach Someone About Saving the Earth",
    desc: "Pick one thing you've learned about the environment and share it with a friend, parent, or sibling. Spread the knowledge!",
    impact: "One person can inspire hundreds more",
  },
];

// ===== EARTH DAY ACTIVITIES =====
const EARTH_DAY_ACTIVITIES = [
  "🌱 Plant a seed or seedling in your yard or a pot",
  "🗑️ Pick up 10 pieces of litter in your neighborhood",
  "♻️ Sort all recyclables at home and explain to family why it matters",
  "💧 Fix a dripping tap — 1 drop per second = 3,000 gallons a year!",
  "💡 Switch to LED bulbs in one room of your house",
  "🛍️ Use reusable bags instead of plastic bags all week",
  "🚿 Cut your shower time by 2 minutes to save water",
  "🌍 Learn about one endangered animal and share 3 facts with a friend",
  "🌿 Start a compost bin with kitchen scraps",
  "🎨 Make art from recycled materials — give trash a second life!",
  "📚 Read a book about the environment or a nature explorer",
  "🐝 Plant bee-friendly flowers like lavender or sunflowers",
  "🚴 Walk or bike instead of getting a car ride today",
  "🌊 Learn about ocean plastic pollution and one way to help",
  "🏞️ Visit a park, garden, or nature trail and appreciate it!",
];

export function EarthDayActivities() {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(EARTH_DAY_ACTIVITIES.length).fill(false),
  );
  const done = checked.filter(Boolean).length;

  return (
    <div className="flex flex-col gap-5 py-2">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="font-display text-2xl text-teal-gp font-bold">
          Earth Day Activities 🌍
        </h3>
        <Badge className="bg-teal-gp text-white">
          {done}/{EARTH_DAY_ACTIVITIES.length} done!
        </Badge>
      </div>
      <p className="text-muted-foreground">
        Every day can be Earth Day! Check off these activities to be an
        environmental hero. 🌱
      </p>
      <div className="bg-teal-light-gp rounded-full h-3">
        <div
          className="bg-teal-gp h-3 rounded-full transition-all duration-500"
          style={{ width: `${(done / EARTH_DAY_ACTIVITIES.length) * 100}%` }}
        />
      </div>
      <div className="flex flex-col gap-2">
        {EARTH_DAY_ACTIVITIES.map((act, i) => (
          <button
            key={act}
            type="button"
            className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all text-left w-full ${checked[i] ? "bg-teal-light-gp border-teal-gp" : "border-border hover:border-teal-gp"}`}
            onClick={() =>
              setChecked((prev) => {
                const n = [...prev];
                n[i] = !n[i];
                return n;
              })
            }
            data-ocid={`earthday.checkbox.${i + 1}`}
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
      {done === EARTH_DAY_ACTIVITIES.length && (
        <Card
          className="bg-yellow-light-gp border-none text-center"
          data-ocid="earthday.success_state"
        >
          <CardContent className="p-6">
            <div className="text-4xl mb-2">🌍🏆</div>
            <p className="font-display text-xl font-bold text-yellow-gp">
              Earth Hero Unlocked! The planet loves you! 💚
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export function NatureExplorers() {
  const [completed, setCompleted] = useState<boolean[]>(
    new Array(EARTH_CHALLENGES.length).fill(false),
  );
  const done = completed.filter(Boolean).length;
  const pct = Math.round((done / EARTH_CHALLENGES.length) * 100);

  return (
    <div className="flex flex-col gap-5 py-2">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="font-display text-2xl text-teal-gp font-bold">
          Nature Explorers 🐼
        </h3>
        <Badge className="bg-teal-gp text-white">
          {done}/{EARTH_CHALLENGES.length} completed!
        </Badge>
      </div>
      <p className="text-muted-foreground">
        Complete these Earth-saving challenges and become a Nature Explorer
        hero! 🌍
      </p>

      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Earth Hero Progress</span>
          <span>{pct}%</span>
        </div>
        <Progress value={pct} className="h-3" />
      </div>

      {pct === 100 && (
        <div className="bg-teal-light-gp rounded-2xl p-4 text-center">
          <div className="text-3xl mb-2">🌍🎉</div>
          <p className="font-display font-bold text-teal-gp">
            You're an Earth Hero! The planet thanks you! 💚
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {EARTH_CHALLENGES.map((challenge, i) => (
          <button
            key={challenge.title}
            type="button"
            className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all text-left w-full ${
              completed[i]
                ? "bg-teal-light-gp border-teal-gp"
                : "bg-card border-border hover:border-teal-gp"
            }`}
            onClick={() =>
              setCompleted((prev) => {
                const n = [...prev];
                n[i] = !n[i];
                return n;
              })
            }
            data-ocid={`nature.checkbox.${i + 1}`}
          >
            <Checkbox
              checked={completed[i]}
              className="mt-1 border-teal-gp data-[state=checked]:bg-teal-gp shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{challenge.emoji}</span>
                <span
                  className={`font-display font-bold text-sm ${completed[i] ? "line-through text-muted-foreground" : ""}`}
                >
                  {challenge.title}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{challenge.desc}</p>
              <Badge
                variant="outline"
                className="mt-2 text-xs border-teal-gp text-teal-gp"
              >
                🌿 {challenge.impact}
              </Badge>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
