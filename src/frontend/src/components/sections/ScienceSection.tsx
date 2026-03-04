import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

// ===== SCIENCE MAGIC =====
const EXPERIMENTS = [
  {
    title: "Baking Soda Volcano 🌋",
    difficulty: "Easy",
    time: "15 min",
    materials: [
      "Baking soda",
      "White vinegar",
      "Red food coloring",
      "Dish soap",
      "A cup or bottle",
      "A tray",
    ],
    steps: [
      "Place your cup or bottle on the tray (to catch overflow!)",
      "Add 2 tablespoons of baking soda to the cup",
      "Add a few drops of red food coloring and a squirt of dish soap",
      "When ready, pour in 1/4 cup of white vinegar",
      "Watch your volcano ERUPT! 🌋",
    ],
    science:
      "Baking soda (base) + vinegar (acid) = CO2 gas + water + sodium acetate. The bubbles make the lava!",
  },
  {
    title: "Walking Water 🌈",
    difficulty: "Easy",
    time: "30 min",
    materials: [
      "3 clear cups",
      "Water",
      "Blue, red, and yellow food coloring",
      "Paper towels",
    ],
    steps: [
      "Fill cups 1 and 3 with water; leave cup 2 empty",
      "Color cup 1 blue and cup 3 yellow",
      "Twist paper towels into ropes and drape between cups",
      "Wait 20-30 minutes and watch water WALK!",
      "Cup 2 will fill with green water! 🟢",
    ],
    science:
      "Capillary action pulls water up and through the paper towel fibers. The colors mix to make new colors!",
  },
  {
    title: "Invisible Ink ✉️",
    difficulty: "Easy",
    time: "20 min",
    materials: [
      "Lemon juice",
      "Cotton swab or small brush",
      "White paper",
      "A lamp or sunlight",
    ],
    steps: [
      "Dip your cotton swab in lemon juice",
      "Write your secret message on white paper",
      "Let it dry completely — it will become invisible!",
      "To reveal: hold the paper near a lamp bulb or sunlight",
      "Watch your message appear! ✨",
    ],
    science:
      "Lemon juice is organic matter. Heat causes oxidation, turning the juice brown and revealing the message!",
  },
  {
    title: "Cloud in a Jar ☁️",
    difficulty: "Medium",
    time: "20 min",
    materials: ["A glass jar", "Hot water", "Ice cubes", "Hairspray"],
    steps: [
      "Carefully add hot water to fill jar 1/3 full",
      "Swirl the hot water to warm the jar",
      "Quickly spray hairspray into the jar",
      "Immediately put a plate of ice cubes on top",
      "Watch a cloud form inside the jar! 🌥️",
    ],
    science:
      "Warm water creates water vapor. The cold air from ice causes vapor to condense around hairspray particles — forming a cloud!",
  },
  {
    title: "Elephant Toothpaste 🐘",
    difficulty: "Medium",
    time: "15 min",
    materials: [
      "Hydrogen peroxide (3%)",
      "Dry yeast",
      "Warm water",
      "Dish soap",
      "A tall plastic bottle",
      "Food coloring",
    ],
    steps: [
      "Mix 1 teaspoon dry yeast with 2 tablespoons warm water",
      "Add food coloring and dish soap to the bottle",
      "Pour hydrogen peroxide into the bottle",
      "Quickly pour in the yeast mixture",
      "Watch the foam EXPLODE out! 🐘",
    ],
    science:
      "Yeast acts as a catalyst, breaking hydrogen peroxide into water and oxygen gas very quickly. The soap traps the bubbles!",
  },
];

export function ScienceMagic() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [checkedMaterials, setCheckedMaterials] = useState<
    Record<string, boolean[]>
  >({});

  const toggleMaterial = (expTitle: string, mi: number) => {
    setCheckedMaterials((prev) => {
      const arr =
        prev[expTitle] ||
        new Array(
          EXPERIMENTS.find((e) => e.title === expTitle)!.materials.length,
        ).fill(false);
      const newArr = [...arr];
      newArr[mi] = !newArr[mi];
      return { ...prev, [expTitle]: newArr };
    });
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-teal-gp font-bold">
        Science Magic Lab 🔬
      </h3>
      <p className="text-muted-foreground">
        Click any experiment to see how to do it at home!
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {EXPERIMENTS.map((exp, i) => (
          <Card
            key={exp.title}
            className={`cursor-pointer transition-all card-hover border-2 ${activeIdx === i ? "border-teal-gp bg-teal-light-gp" : "border-border hover:border-teal-gp"}`}
            onClick={() => setActiveIdx(activeIdx === i ? null : i)}
            data-ocid={`science.item.${i + 1}`}
          >
            <CardContent className="p-4">
              <div className="font-display font-bold text-sm">{exp.title}</div>
              <div className="flex gap-1 mt-2">
                <Badge variant="outline" className="text-xs">
                  {exp.difficulty}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  ⏱ {exp.time}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {activeIdx !== null && (
        <Card className="border-2 border-teal-gp">
          <CardContent className="p-5 flex flex-col gap-4">
            <h4 className="font-display text-xl font-bold text-teal-gp">
              {EXPERIMENTS[activeIdx].title}
            </h4>

            <div>
              <h5 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-2">
                Materials Checklist
              </h5>
              <div className="grid gap-1 sm:grid-cols-2">
                {EXPERIMENTS[activeIdx].materials.map((mat, mi) => (
                  <button
                    key={mat}
                    type="button"
                    className="flex items-center gap-2 cursor-pointer text-left w-full bg-transparent border-0 p-0"
                    onClick={() =>
                      toggleMaterial(EXPERIMENTS[activeIdx].title, mi)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        toggleMaterial(EXPERIMENTS[activeIdx].title, mi);
                    }}
                    data-ocid={`science.checkbox.${mi + 1}`}
                  >
                    <Checkbox
                      checked={
                        checkedMaterials[EXPERIMENTS[activeIdx].title]?.[mi] ||
                        false
                      }
                      className="border-teal-gp data-[state=checked]:bg-teal-gp"
                    />
                    <span
                      className={`text-sm ${checkedMaterials[EXPERIMENTS[activeIdx].title]?.[mi] ? "line-through text-muted-foreground" : ""}`}
                    >
                      {mat}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-2">
                Steps
              </h5>
              <ol className="flex flex-col gap-2">
                {EXPERIMENTS[activeIdx].steps.map((step, si) => (
                  <li key={step} className="flex gap-2 text-sm">
                    <span className="w-6 h-6 rounded-full bg-teal-gp text-white text-xs flex items-center justify-center shrink-0 font-bold">
                      {si + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <Card className="bg-yellow-light-gp border-none">
              <CardContent className="p-3 text-sm">
                <span className="font-bold text-yellow-gp">
                  🧪 The Science:{" "}
                </span>
                {EXPERIMENTS[activeIdx].science}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ===== PRINCESS SCIENCE (Float or Sink) =====
const OBJECTS = [
  {
    name: "Apple 🍎",
    floats: true,
    why: "Apples are less dense than water — about 25% of an apple is air!",
  },
  {
    name: "Coin 🪙",
    floats: false,
    why: "Metal is much denser than water, so it sinks right to the bottom.",
  },
  {
    name: "Leaf 🍃",
    floats: true,
    why: "Leaves are very light and their surface tension helps them stay up.",
  },
  {
    name: "Rock 🪨",
    floats: false,
    why: "Most rocks are much denser than water — they sink fast!",
  },
  {
    name: "Egg 🥚",
    floats: false,
    why: "Fresh eggs sink! (Stale eggs float because of the air bubble inside.)",
  },
  {
    name: "Orange 🍊",
    floats: true,
    why: "An unpeeled orange floats because its peel is full of tiny air pockets!",
  },
  {
    name: "Grapes 🍇",
    floats: false,
    why: "Grapes are denser than water — they sink to the bottom.",
  },
  {
    name: "Plastic Cap 🧢",
    floats: true,
    why: "Plastic is less dense than water, and the shape traps air.",
  },
];

export function PrincessScience() {
  const [guesses, setGuesses] = useState<
    Record<string, "float" | "sink" | null>
  >({});
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const guess = (name: string, g: "float" | "sink") => {
    setGuesses((prev) => ({ ...prev, [name]: g }));
    setRevealed((prev) => new Set(prev).add(name));
  };

  const correct = Object.entries(guesses).filter(([name, g]) => {
    const obj = OBJECTS.find((o) => o.name === name);
    return (
      obj && ((obj.floats && g === "float") || (!obj.floats && g === "sink"))
    );
  }).length;

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-pink-gp font-bold">
        Princess Science: Float or Sink? 💎
      </h3>
      <p className="text-muted-foreground">
        Guess if each object floats or sinks! Score: {correct}/
        {Object.keys(guesses).length || 0}
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {OBJECTS.map((obj, i) => (
          <Card
            key={obj.name}
            className={`border-2 transition-all ${revealed.has(obj.name) ? ((obj.floats && guesses[obj.name] === "float") || (!obj.floats && guesses[obj.name] === "sink") ? "border-teal-gp bg-teal-light-gp" : "border-destructive bg-red-50") : "border-border"}`}
            data-ocid={`princess.item.${i + 1}`}
          >
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2">
                {obj.name.split(" ")[1] || "🔵"}
              </div>
              <p className="font-bold text-sm mb-3">{obj.name}</p>
              {!revealed.has(obj.name) ? (
                <div className="flex gap-1 justify-center">
                  <Button
                    size="sm"
                    className="bg-blue-400 text-white rounded-full hover:bg-blue-500 px-3"
                    onClick={() => guess(obj.name, "float")}
                    data-ocid={`princess.button.${i + 1}`}
                  >
                    Float 🌊
                  </Button>
                  <Button
                    size="sm"
                    className="bg-stone-400 text-white rounded-full hover:bg-stone-500 px-3"
                    onClick={() => guess(obj.name, "sink")}
                  >
                    Sink ⬇️
                  </Button>
                </div>
              ) : (
                <div className="text-xs">
                  <span
                    className={`font-bold ${(obj.floats && guesses[obj.name] === "float") || (!obj.floats && guesses[obj.name] === "sink") ? "text-teal-gp" : "text-destructive"}`}
                  >
                    {obj.floats ? "✅ Floats!" : "❌ Sinks!"}
                  </span>
                  <p className="text-muted-foreground mt-1">{obj.why}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ===== SPACE SCHOOL =====
const PLANETS = [
  {
    name: "Mercury ☿",
    emoji: "🔴",
    color: "bg-orange-100",
    facts: [
      "Closest planet to the Sun",
      "A year is only 88 Earth days",
      "No atmosphere — extreme temperatures!",
      "About the size of our Moon",
      "Named after the Roman messenger god",
    ],
  },
  {
    name: "Venus ♀",
    emoji: "🟡",
    color: "bg-yellow-100",
    facts: [
      "Hottest planet in the solar system (462°C!)",
      "Spins backwards compared to most planets",
      "A day on Venus is longer than its year!",
      "Covered in thick, toxic clouds",
      "Brightest object in our night sky (after the Moon)",
    ],
  },
  {
    name: "Earth 🌍",
    emoji: "🌍",
    color: "bg-blue-100",
    facts: [
      "Only known planet with life",
      "71% of the surface is water",
      "Has one Moon",
      "Tilted 23.5° causing seasons",
      "About 4.5 billion years old",
    ],
  },
  {
    name: "Mars 🔴",
    emoji: "🔴",
    color: "bg-red-100",
    facts: [
      "Called the Red Planet",
      "Has the tallest volcano in the solar system (Olympus Mons)",
      "A day is 24 hours and 37 minutes",
      "Has two tiny moons: Phobos and Deimos",
      "Humans may visit Mars in your lifetime!",
    ],
  },
  {
    name: "Jupiter ♃",
    emoji: "🟠",
    color: "bg-amber-100",
    facts: [
      "Largest planet — 1,300 Earths could fit inside!",
      "The Great Red Spot is a storm bigger than Earth",
      "Has 95 known moons",
      "Made mostly of hydrogen and helium gas",
      "Its moon Europa may have liquid water",
    ],
  },
  {
    name: "Saturn ♄",
    emoji: "🪐",
    color: "bg-yellow-50",
    facts: [
      "Famous for its beautiful ring system",
      "Rings are made of ice and rock",
      "Least dense planet — it could float on water!",
      "Has 146 known moons",
      "Its moon Titan has lakes of liquid methane",
    ],
  },
  {
    name: "Uranus ♅",
    emoji: "💙",
    color: "bg-sky-100",
    facts: [
      "Rotates on its side — extreme seasons!",
      "Ice giant with methane in its atmosphere",
      "Has 13 known rings",
      "Has 27 known moons named after Shakespeare characters",
      "Coldest planetary atmosphere: -224°C",
    ],
  },
  {
    name: "Neptune ♆",
    emoji: "🌊",
    color: "bg-indigo-100",
    facts: [
      "Windiest planet — winds up to 2,100 km/h!",
      "Takes 165 Earth years to orbit the Sun",
      "Has a large storm called the Great Dark Spot",
      "Its moon Triton orbits in the opposite direction",
      "Named after the Roman god of the sea",
    ],
  },
];

export function SpaceSchool() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-purple-gp font-bold">
        Space School 🚀
      </h3>
      <p className="text-muted-foreground">
        Click a planet to learn amazing facts!
      </p>
      <div className="flex flex-wrap gap-2">
        {PLANETS.map((p, i) => (
          <Button
            key={p.name}
            variant="outline"
            className={`rounded-full ${selected === i ? "bg-purple-gp text-white border-purple-gp" : "border-border hover:border-purple-gp"}`}
            onClick={() => setSelected(selected === i ? null : i)}
            data-ocid={`space.item.${i + 1}`}
          >
            {p.emoji} {p.name}
          </Button>
        ))}
      </div>
      {selected !== null && (
        <Card
          className={`border-2 border-purple-gp ${PLANETS[selected].color}`}
        >
          <CardHeader>
            <CardTitle className="font-display text-xl text-purple-gp">
              {PLANETS[selected].emoji} {PLANETS[selected].name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              {PLANETS[selected].facts.map((fact) => (
                <li key={fact} className="flex gap-2 text-sm">
                  <span className="text-purple-gp font-bold">⭐</span> {fact}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ===== DINOSAUR DIG =====
const DINOS = [
  {
    name: "T-Rex",
    emoji: "🦖",
    hidden: true,
    fact: "The T-Rex's arms were tiny but powerful — they could lift 200kg! It's one of the most powerful predators ever.",
  },
  {
    name: "Triceratops",
    emoji: "🦕",
    hidden: true,
    fact: "Triceratops had three horns and a massive frill. They were herbivores who used horns for defense against T-Rex!",
  },
  {
    name: "Stegosaurus",
    emoji: "🦴",
    hidden: true,
    fact: "Stegosaurus had plates on its back that may have helped regulate body temperature. Its brain was the size of a walnut!",
  },
  {
    name: "Pterodactyl",
    emoji: "🦅",
    hidden: true,
    fact: "Pterodactyls weren't actually dinosaurs — they were flying reptiles! Their wingspan could reach 10 meters.",
  },
  {
    name: "Brachiosaurus",
    emoji: "🦒",
    hidden: true,
    fact: "One of the tallest dinosaurs, Brachiosaurus could reach 13 meters high — like a 4-story building!",
  },
  {
    name: "Velociraptor",
    emoji: "🐆",
    hidden: true,
    fact: "Movie raptors were exaggerated! Real Velociraptors were turkey-sized and covered in feathers — early relatives of birds.",
  },
];

export function DinosaurDig() {
  const [dinos, setDinos] = useState(DINOS);

  const dig = (i: number) => {
    setDinos((prev) => {
      const n = [...prev];
      n[i] = { ...n[i], hidden: false };
      return n;
    });
  };

  const reset = () => setDinos(DINOS);

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl text-yellow-gp font-bold">
          Dinosaur Dig! 🦴
        </h3>
        <Button
          size="sm"
          onClick={reset}
          variant="outline"
          className="rounded-full border-yellow-gp text-yellow-gp"
          data-ocid="dino.secondary_button"
        >
          Reset Dig
        </Button>
      </div>
      <p className="text-muted-foreground">
        Click to dig and reveal a hidden dinosaur!
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {dinos.map((dino, i) => (
          <button
            key={dino.name}
            type="button"
            className={`rounded-xl border-2 p-4 text-center cursor-pointer transition-all w-full ${
              dino.hidden
                ? "bg-yellow-light-gp border-yellow-gp hover:scale-105"
                : "bg-card border-teal-gp"
            }`}
            onClick={() => dino.hidden && dig(i)}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && dino.hidden) dig(i);
            }}
            data-ocid={`dino.item.${i + 1}`}
          >
            {dino.hidden ? (
              <>
                <div className="text-3xl">🏔️</div>
                <div className="text-xs font-bold text-yellow-gp mt-1">
                  Dig here!
                </div>
              </>
            ) : (
              <>
                <div className="text-3xl">{dino.emoji}</div>
                <div className="font-display font-bold text-sm mt-1 text-teal-gp">
                  {dino.name}
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {dino.fact}
                </p>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
