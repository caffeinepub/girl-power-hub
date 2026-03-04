import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

// ===== MAGIC POTIONS =====
const POTIONS = [
  {
    name: "Unicorn Lemonade 🦄",
    emoji: "🦄",
    color: "pink-light",
    borderColor: "pink-gp",
    ingredients: [
      "1 cup pink lemonade",
      "1/2 cup coconut water",
      "Purple grape juice (for color layering)",
      "Rainbow sprinkles",
      "Edible glitter (optional)",
    ],
    steps: [
      "Fill a glass with ice",
      "Pour coconut water first",
      "Slowly pour pink lemonade over the back of a spoon",
      "Add a splash of grape juice on top for swirling layers",
      "Drop in rainbow sprinkles and edible glitter",
      "Stir gently and WISH for magic! 🌈",
    ],
  },
  {
    name: "Dragon Punch 🐉",
    emoji: "🐉",
    color: "coral-light",
    borderColor: "coral-gp",
    ingredients: [
      "1 cup red cranberry juice",
      "1/2 cup orange juice",
      "Ginger ale or sprite",
      "Frozen raspberries",
      "Red sugar for the rim (optional)",
    ],
    steps: [
      "Rim your glass with red sugar if desired",
      "Fill with ice and frozen raspberries",
      "Pour cranberry juice over the ice",
      "Slowly add orange juice",
      "Top with ginger ale for the FIZZ — the dragon breathes! 🔥",
      "Stir and growl!",
    ],
  },
  {
    name: "Mermaid Smoothie 🧜‍♀️",
    emoji: "🧜‍♀️",
    color: "teal-light",
    borderColor: "teal-gp",
    ingredients: [
      "1 frozen banana",
      "1/2 cup blue/green grapes",
      "1/2 cup coconut milk",
      "1 tsp butterfly pea powder (or blue food coloring)",
      "Coconut flakes for garnish",
    ],
    steps: [
      "Blend banana, grapes, and coconut milk until smooth",
      "Add blue/teal coloring and blend again",
      "Pour into a tall glass",
      "Top with coconut flakes to look like sea foam",
      "Add a paper mermaid tail to the rim!",
      "Dive in! 🌊",
    ],
  },
  {
    name: "Fairy Garden Fizz 🧚",
    emoji: "🧚",
    color: "purple-light",
    borderColor: "purple-gp",
    ingredients: [
      "1/2 cup purple grape juice",
      "1/2 cup lemon-lime soda",
      "Fresh mint leaves",
      "Sliced kiwi",
      "Lavender simple syrup (optional)",
    ],
    steps: [
      "Add mint leaves and kiwi to the bottom of the glass",
      "Gently muddle (press) the mint",
      "Fill with ice",
      "Pour grape juice over ice",
      "Top with lemon-lime soda for magic bubbles! ✨",
      "Garnish with a mint sprig",
    ],
  },
];

export function MagicPotions() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-purple-gp font-bold">
        🧪 Magic Potions!
      </h3>
      <p className="text-muted-foreground">
        Click a potion to reveal the magical recipe!
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {POTIONS.map((potion, i) => (
          <Card
            key={potion.name}
            className={`cursor-pointer card-hover border-2 text-center ${selected === i ? `border-[oklch(var(--${potion.borderColor.replace("-gp", "")}))]` : "border-border hover:border-purple-gp"}`}
            onClick={() => setSelected(selected === i ? null : i)}
            data-ocid={`potions.item.${i + 1}`}
          >
            <CardContent className="p-4">
              <div className="text-4xl mb-2">{potion.emoji}</div>
              <h4 className="font-display font-bold text-sm">{potion.name}</h4>
              {selected === i && (
                <p className="text-xs text-purple-gp mt-1 font-bold">
                  Click to collapse ↑
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {selected !== null && (
        <Card className="border-2 border-purple-gp">
          <CardContent className="p-5">
            <h4 className="font-display text-xl font-bold text-purple-gp mb-4">
              {POTIONS[selected].emoji} {POTIONS[selected].name}
            </h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h5 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  Ingredients
                </h5>
                <ul className="space-y-1">
                  {POTIONS[selected].ingredients.map((ing) => (
                    <li key={ing} className="text-sm flex gap-2">
                      <span className="text-purple-gp">•</span> {ing}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  Brewing Steps
                </h5>
                {POTIONS[selected].steps.map((step, si) => (
                  <div key={step} className="flex gap-2 text-sm mb-2">
                    <span className="w-5 h-5 rounded-full bg-purple-gp text-white text-xs flex items-center justify-center shrink-0 font-bold">
                      {si + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ===== BAKING COOKIES =====
const COOKIE_STEPS = [
  {
    step: "Preheat oven to 375°F (190°C) and line a baking sheet with parchment paper",
    tip: "",
  },
  {
    step: "In a large bowl, beat 1 cup (2 sticks) softened butter with 3/4 cup sugar and 3/4 cup brown sugar until fluffy",
    tip: "Soft butter = key! Leave out 30 min before starting",
  },
  {
    step: "Add 2 large eggs and 2 tsp vanilla extract. Beat until combined",
    tip: "Room temperature eggs blend better!",
  },
  {
    step: "In a separate bowl, whisk: 2¼ cups flour + 1 tsp baking soda + 1 tsp salt",
    tip: "",
  },
  {
    step: "Gradually mix dry ingredients into wet ingredients — don't overmix!",
    tip: "Stop when just combined — overmixing = tough cookies",
  },
  {
    step: "Fold in 2 cups chocolate chips with a spoon",
    tip: "Add 1 cup chips + 1 cup chunks for texture!",
  },
  {
    step: "Scoop rounded tablespoons onto the pan, 2 inches apart",
    tip: "For chewier cookies: chill dough 30 minutes first",
  },
  {
    step: "Bake 9-11 minutes until edges are golden but centers look slightly underdone",
    tip: "They firm up as they cool! Don't overbake!",
  },
  {
    step: "Cool on pan 2 minutes, then transfer to a wire rack",
    tip: "They're best warm and gooey 🍪",
  },
];

export function BakingCookies() {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(COOKIE_STEPS.length).fill(false),
  );
  const [mode, setMode] = useState<"chewy" | "crispy">("chewy");

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-coral-gp font-bold">
        🍪 The Best Chocolate Chip Cookies!
      </h3>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={mode === "chewy" ? "default" : "outline"}
          className={`rounded-full ${mode === "chewy" ? "bg-coral-gp text-white" : "border-coral-gp text-coral-gp"}`}
          onClick={() => setMode("chewy")}
          data-ocid="cookies.tab"
        >
          🍪 Extra Chewy
        </Button>
        <Button
          size="sm"
          variant={mode === "crispy" ? "default" : "outline"}
          className={`rounded-full ${mode === "crispy" ? "bg-coral-gp text-white" : "border-coral-gp text-coral-gp"}`}
          onClick={() => setMode("crispy")}
          data-ocid="cookies.tab"
        >
          🥠 Extra Crispy
        </Button>
      </div>
      {mode === "chewy" ? (
        <Card className="bg-coral-light-gp border-none">
          <CardContent className="p-3 text-sm">
            <p className="font-bold text-coral-gp">🍪 Chewy Cookie Secrets:</p>
            <ul className="mt-1 space-y-1">
              <li>
                • Use more brown sugar than white (brown sugar = moisture)
              </li>
              <li>• Add an extra egg YOLK (not the whole egg)</li>
              <li>• Chill dough 30 min before baking</li>
              <li>• Take them out when centers still look underdone</li>
            </ul>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-yellow-light-gp border-none">
          <CardContent className="p-3 text-sm">
            <p className="font-bold text-yellow-gp">
              🥠 Crispy Cookie Secrets:
            </p>
            <ul className="mt-1 space-y-1">
              <li>• Use more white sugar than brown sugar</li>
              <li>• Use melted (not softened) butter</li>
              <li>• Flatten dough balls before baking</li>
              <li>• Bake 2-3 minutes longer and let cool fully on pan</li>
            </ul>
          </CardContent>
        </Card>
      )}
      <h4 className="font-display font-bold text-coral-gp">
        Step-by-Step Recipe (check off as you go!)
      </h4>
      <div className="flex flex-col gap-3">
        {COOKIE_STEPS.map((item, i) => (
          <button
            key={item.step.slice(0, 30)}
            type="button"
            className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all text-left w-full ${checked[i] ? "bg-coral-light-gp border-coral-gp" : "border-border hover:border-coral-gp"}`}
            onClick={() =>
              setChecked((prev) => {
                const n = [...prev];
                n[i] = !n[i];
                return n;
              })
            }
            data-ocid={`cookies.checkbox.${i + 1}`}
          >
            <div
              className={`w-7 h-7 rounded-full text-xs flex items-center justify-center shrink-0 font-bold ${checked[i] ? "bg-coral-gp text-white" : "bg-muted text-muted-foreground"}`}
            >
              {i + 1}
            </div>
            <div>
              <p
                className={`text-sm ${checked[i] ? "line-through text-muted-foreground" : ""}`}
              >
                {item.step}
              </p>
              {item.tip && !checked[i] && (
                <p className="text-xs text-coral-gp font-bold mt-1">
                  💡 {item.tip}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
      {checked.filter(Boolean).length === COOKIE_STEPS.length && (
        <Card
          className="bg-coral-light-gp border-none text-center"
          data-ocid="cookies.success_state"
        >
          <CardContent className="p-6">
            <div className="text-4xl mb-2">🍪</div>
            <p className="font-display text-xl font-bold text-coral-gp">
              Cookies are ready! Share with someone you love! 💖
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

const RECIPES = [
  {
    title: "Strawberry Smoothie Bowl 🍓",
    time: "10 min",
    difficulty: "Easy",
    emoji: "🥣",
    ingredients: [
      "1 frozen banana",
      "1 cup frozen strawberries",
      "1/4 cup milk or almond milk",
      "Toppings: granola, fresh berries, honey, chia seeds",
    ],
    steps: [
      "Blend frozen banana and strawberries with milk until thick",
      "Pour into a bowl — it should be THICK, not drinkable",
      "Arrange toppings in rows or patterns for an Instagram-worthy bowl",
      "Drizzle honey over the top",
      "Eat immediately before it melts! 🌸",
    ],
  },
  {
    title: "Chocolate Chip Cookies 🍪",
    time: "30 min",
    difficulty: "Medium",
    emoji: "🍪",
    ingredients: [
      "2 1/4 cups flour",
      "1 tsp baking soda",
      "1 tsp salt",
      "1 cup (2 sticks) butter, softened",
      "3/4 cup sugar",
      "3/4 cup brown sugar",
      "2 eggs",
      "2 tsp vanilla",
      "2 cups chocolate chips",
    ],
    steps: [
      "Preheat oven to 375°F (190°C)",
      "Beat butter and sugars until creamy",
      "Add eggs and vanilla, beat well",
      "Mix in flour, baking soda, and salt gradually",
      "Stir in chocolate chips with a spoon",
      "Drop rounded tablespoons onto ungreased cookie sheet",
      "Bake 9-11 minutes until golden brown",
      "Cool for 2 minutes on pan, then move to wire rack",
    ],
  },
  {
    title: "Energy Bites 🌿",
    time: "15 min + 1 hr chill",
    difficulty: "Easy",
    emoji: "⚡",
    ingredients: [
      "1 cup rolled oats",
      "2/3 cup shredded coconut",
      "1/2 cup peanut butter",
      "1/2 cup mini chocolate chips",
      "1/3 cup honey",
      "1 tsp vanilla",
    ],
    steps: [
      "Mix all ingredients together in a bowl",
      "Cover and refrigerate for 1 hour",
      "Roll into 1-inch balls (about 20 balls)",
      "Store in the fridge for up to 1 week",
      "Grab one for a quick, healthy snack! ⚡",
    ],
  },
  {
    title: "Magic Potion Juice 🧪",
    time: "5 min",
    difficulty: "Super Easy",
    emoji: "🧪",
    ingredients: [
      "1 cup purple grape juice",
      "1/2 cup lemonade",
      "Splash of soda water",
      "Ice cubes",
      "Frozen blueberries for garnish",
    ],
    steps: [
      "Fill a glass with ice",
      "Pour in grape juice",
      "Slowly pour lemonade over the back of a spoon (creates layers!)",
      "Top with soda water for the potion fizz!",
      "Add frozen blueberries — watch them sink like magic potions!",
    ],
  },
  {
    title: "Movie Night Popcorn Toppings 🍿",
    time: "5 min",
    difficulty: "Super Easy",
    emoji: "🍿",
    ingredients: ["Freshly popped popcorn", "Your choice of toppings below!"],
    steps: [
      "🍫 Chocolate Drizzle: melt chocolate chips, drizzle over popcorn",
      "🧀 Cheesy: toss with melted butter + nutritional yeast + garlic powder",
      "🎃 Cinnamon Sugar: butter + cinnamon + sugar = magic",
      "🌶️ Spicy: butter + cayenne + lime juice + salt",
      "🍬 Birthday Cake: butter + rainbow sprinkles + vanilla extract",
    ],
  },
  {
    title: "Rainbow Cupcakes 🎂",
    time: "45 min",
    difficulty: "Medium",
    emoji: "🧁",
    ingredients: [
      "1 box white cake mix + ingredients on box",
      "Food coloring (red, orange, yellow, green, blue, purple)",
      "White frosting",
      "Sprinkles",
    ],
    steps: [
      "Prepare cake batter according to package directions",
      "Divide batter into 6 equal portions",
      "Dye each portion a different rainbow color",
      "Layer small spoonfuls of each color into cupcake liners",
      "Bake according to package directions",
      "Let cool completely, frost with white frosting",
      "Add rainbow sprinkles and a big swirl of frosting! 🌈",
    ],
  },
];

export function RecipesSection() {
  const [selected, setSelected] = useState<number | null>(null);
  const [matChecked, setMatChecked] = useState<Record<number, boolean[]>>({});

  const toggleMat = (ri: number, mi: number) => {
    setMatChecked((prev) => {
      const arr =
        prev[ri] || new Array(RECIPES[ri].ingredients.length).fill(false);
      const newArr = [...arr];
      newArr[mi] = !newArr[mi];
      return { ...prev, [ri]: newArr };
    });
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-coral-gp font-bold">
        Recipes 🍳
      </h3>
      <p className="text-muted-foreground">
        Click a recipe to see ingredients and steps!
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {RECIPES.map((recipe, i) => (
          <Card
            key={recipe.title}
            className={`cursor-pointer card-hover border-2 ${selected === i ? "border-coral-gp bg-coral-light-gp" : "border-border hover:border-coral-gp"}`}
            onClick={() => setSelected(selected === i ? null : i)}
            data-ocid={`recipes.item.${i + 1}`}
          >
            <CardContent className="p-4">
              <div className="text-3xl mb-2">{recipe.emoji}</div>
              <h4 className="font-display font-bold text-sm">{recipe.title}</h4>
              <div className="flex gap-1 mt-2">
                <Badge variant="outline" className="text-xs">
                  ⏱ {recipe.time}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {recipe.difficulty}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selected !== null && (
        <Card className="border-2 border-coral-gp">
          <CardContent className="p-5 flex flex-col gap-4">
            <h4 className="font-display text-xl font-bold text-coral-gp">
              {RECIPES[selected].emoji} {RECIPES[selected].title}
            </h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h5 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  Ingredients
                </h5>
                {RECIPES[selected].ingredients.map((ing, mi) => (
                  <button
                    key={ing}
                    type="button"
                    className="flex items-center gap-2 py-1 cursor-pointer text-left w-full bg-transparent border-0 p-0"
                    onClick={() => toggleMat(selected, mi)}
                    data-ocid={`recipes.checkbox.${mi + 1}`}
                  >
                    <Checkbox
                      checked={matChecked[selected]?.[mi] || false}
                      className="border-coral-gp data-[state=checked]:bg-coral-gp"
                    />
                    <span
                      className={`text-sm ${matChecked[selected]?.[mi] ? "line-through text-muted-foreground" : ""}`}
                    >
                      {ing}
                    </span>
                  </button>
                ))}
              </div>
              <div>
                <h5 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  Steps
                </h5>
                {RECIPES[selected].steps.map((step, si) => (
                  <div key={step} className="flex gap-2 text-sm mb-2">
                    <span className="w-5 h-5 rounded-full bg-coral-gp text-white text-xs flex items-center justify-center shrink-0 font-bold">
                      {si + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ===== FANCY TEA PARTY =====
export function FancyTeaParty() {
  const setup = [
    "✅ Iron a pretty tablecloth or use a floral one",
    "✅ Set out your nicest cups and saucers",
    "✅ Fold napkins into triangles like in a real tea room",
    "✅ Place a small flower or sprig of herbs on each plate",
    "✅ Have sugar cubes, honey, and lemon slices ready",
    "✅ Make small sandwiches (cucumber, cream cheese, jam)",
    "✅ Bake or buy scones or small cakes",
    "✅ Brew 2-3 different kinds of tea",
  ];

  const manners = [
    "🫖 Pour tea for your guests before pouring for yourself",
    "☕ Stir your tea quietly in a small circle — no clinking!",
    "🫴 Hold the cup handle with two fingers and your thumb",
    "💬 Conversation should be light and positive at the table",
    "🍴 Small bites! Tear scones in half before buttering",
    "📵 No phones at the table — give your guests full attention",
  ];

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-yellow-gp font-bold">
        Fancy Tea Party ☕
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-yellow-light-gp border-none">
          <CardContent className="p-4">
            <h4 className="font-display font-bold text-yellow-gp mb-3">
              Setup Checklist 🫖
            </h4>
            {setup.map((item) => (
              <p key={item} className="text-sm mb-2">
                {item}
              </p>
            ))}
          </CardContent>
        </Card>
        <Card className="border-2 border-yellow-gp">
          <CardContent className="p-4">
            <h4 className="font-display font-bold text-yellow-gp mb-3">
              Tea Party Manners 👑
            </h4>
            {manners.map((m) => (
              <p key={m} className="text-sm mb-2">
                {m}
              </p>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ===== HEALTHY SNACK HACKS =====
export function HealthySnackHacks() {
  const snacks = [
    {
      name: "Ants on a Log 🐜",
      ingredients: "Celery + peanut butter + raisins",
      why: "Crunchy, sweet, protein-packed and actually delicious!",
    },
    {
      name: "Apple Nachos 🍎",
      ingredients:
        "Apple slices + peanut butter drizzle + granola + mini chips",
      why: "All the fun of nachos with way more nutrients!",
    },
    {
      name: "Veggie Roll-Ups 🌯",
      ingredients: "Cream cheese on a tortilla + cucumber, carrots, spinach",
      why: "Like sushi but way easier. Rainbow colors = more nutrients!",
    },
    {
      name: "Frozen Yogurt Bark 🍓",
      ingredients:
        "Greek yogurt + honey spread on a tray + berries on top, freeze 2 hours",
      why: "Tastes like ice cream but is actually good for you!",
    },
    {
      name: "Energy Bites 🌀",
      ingredients:
        "Oats + peanut butter + honey + chocolate chips + roll into balls",
      why: "No baking! Ready in 15 min. Perfect pre-sport snack.",
    },
  ];

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-teal-gp font-bold">
        Healthy Snack Hacks ⚡
      </h3>
      <div className="flex flex-col gap-3">
        {snacks.map((snack, i) => (
          <Card
            key={snack.name}
            className="border-2 border-teal-light-gp card-hover"
            data-ocid={`snacks.item.${i + 1}`}
          >
            <CardContent className="p-4 flex gap-4">
              <div className="flex-1">
                <h4 className="font-display font-bold text-teal-gp">
                  {snack.name}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Recipe:</strong> {snack.ingredients}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  💡 {snack.why}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ===== BAKING BOSS =====
const HEALTHY_RECIPES = [
  {
    name: "No-Bake Energy Balls 💪",
    emoji: "🟤",
    prepTime: "10 min",
    servings: "15 balls",
    difficulty: "Easy",
    why: "Packed with protein and healthy fats to keep your brain sharp and energy high!",
    ingredients: [
      "1 cup rolled oats",
      "1/2 cup peanut butter (or almond butter)",
      "1/3 cup honey",
      "1/2 cup mini chocolate chips",
      "1/2 cup ground flaxseed (optional but powerful!)",
      "1 tsp vanilla extract",
      "Pinch of salt",
    ],
    steps: [
      "Mix all ingredients together in a large bowl until fully combined.",
      "If the mixture is too sticky, add a little more oats. If too dry, add a bit more honey.",
      "Chill the mixture in the fridge for 30 minutes — this makes it easier to roll.",
      "Roll into balls about the size of a ping pong ball with your hands.",
      "Place on a baking sheet lined with parchment paper.",
      "Refrigerate for at least 1 hour until firm.",
      "Store in an airtight container in the fridge for up to 1 week. Enjoy before practice or studying!",
    ],
  },
  {
    name: "Banana Peanut Butter Bites 🍌",
    emoji: "🍌",
    prepTime: "5 min",
    servings: "8 bites",
    difficulty: "Super Easy",
    why: "Bananas give you quick energy, while peanut butter provides lasting fuel. Perfect pre-workout snack!",
    ingredients: [
      "2 ripe bananas",
      "4 tablespoons peanut butter",
      "2 tablespoons granola or crushed nuts",
      "Dark chocolate chips (optional)",
      "Toothpicks for serving",
    ],
    steps: [
      "Peel bananas and cut into 1-inch rounds.",
      "Lay them flat on a parchment-lined tray.",
      "Spread a small amount of peanut butter on top of each piece.",
      "Sprinkle granola or crushed nuts over the peanut butter.",
      "Add a chocolate chip or two on top if you like!",
      "Freeze for 30 minutes for a cold, refreshing treat — or eat right away.",
      "Skewer with toothpicks for fun serving. Makes a great after-school snack!",
    ],
  },
  {
    name: "Rainbow Trail Mix 🌈",
    emoji: "🌈",
    prepTime: "5 min",
    servings: "6 cups",
    difficulty: "Super Easy",
    why: "A mix of nuts, dried fruit, and seeds gives your body vitamins, healthy fats, and protein all at once!",
    ingredients: [
      "1 cup mixed nuts (almonds, cashews, peanuts)",
      "1/2 cup dried cranberries or raisins",
      "1/2 cup sunflower seeds or pumpkin seeds",
      "1/2 cup dried mango pieces",
      "1/2 cup mini pretzels",
      "1/4 cup dark chocolate chips",
      "1/4 cup coconut flakes (optional)",
    ],
    steps: [
      "Gather all your ingredients in separate bowls for a colorful spread!",
      "Find a large mixing bowl and pour everything in together.",
      "Use your (clean!) hands or a spoon to mix it all together.",
      "Taste and adjust — want more chocolate? More nuts? Make it YOUR mix.",
      "Portion into small bags or containers for easy snacking on the go.",
      "Label with the date — keeps fresh at room temperature for 2 weeks.",
      "Eat a small handful before homework or physical activity for steady energy!",
    ],
  },
];

export function BakingBoss() {
  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-coral-gp font-bold">
        Baking Boss 🍪
      </h3>
      <p className="text-muted-foreground">
        Easy, healthy snack recipes that fuel your body and make you strong! No
        oven needed for these.
      </p>

      <Accordion type="single" collapsible className="flex flex-col gap-3">
        {HEALTHY_RECIPES.map((recipe, i) => (
          <AccordionItem
            key={recipe.name}
            value={`recipe-${i}`}
            className="border-2 border-coral-gp/30 rounded-2xl px-4 overflow-hidden"
            data-ocid={`baking.item.${i + 1}`}
          >
            <AccordionTrigger
              className="hover:no-underline py-4"
              data-ocid="baking.toggle"
            >
              <div className="flex items-center gap-3 text-left">
                <span className="text-2xl">{recipe.emoji}</span>
                <div>
                  <div className="font-display font-bold text-foreground">
                    {recipe.name}
                  </div>
                  <div className="flex gap-2 mt-1">
                    <Badge
                      variant="outline"
                      className="text-xs border-coral-gp text-coral-gp"
                    >
                      ⏱ {recipe.prepTime}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs border-coral-gp text-coral-gp"
                    >
                      🍽 {recipe.servings}
                    </Badge>
                    <Badge className="text-xs bg-coral-gp text-white">
                      {recipe.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <p className="text-sm text-teal-gp font-bold mb-3">
                💪 Why it's good for you: {recipe.why}
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h5 className="font-display font-bold text-coral-gp mb-2">
                    🛒 Ingredients
                  </h5>
                  <ul className="space-y-1">
                    {recipe.ingredients.map((ing) => (
                      <li key={ing} className="text-sm flex gap-2">
                        <span className="text-coral-gp font-bold">•</span> {ing}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-display font-bold text-coral-gp mb-2">
                    👩‍🍳 Steps
                  </h5>
                  <div className="flex flex-col gap-2">
                    {recipe.steps.map((step, si) => (
                      <div key={step} className="flex gap-2 text-sm">
                        <div className="w-5 h-5 rounded-full bg-coral-gp text-white text-xs flex items-center justify-center shrink-0 font-bold">
                          {si + 1}
                        </div>
                        <span className="leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
