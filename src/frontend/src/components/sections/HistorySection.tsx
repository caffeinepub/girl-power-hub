import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddWallOfFameEntry,
  useGetAllHeroes,
  useGetAllWallOfFameEntries,
  useVoteForHero,
} from "@/hooks/useQueries";
import { useState } from "react";
import { toast } from "sonner";

// ===== GIRL HERO HISTORY =====
const GIRL_HEROES = [
  {
    name: "Marie Curie",
    years: "1867–1934",
    emoji: "⚗️",
    field: "Science",
    bio: "The first woman to win a Nobel Prize — and the only person to win in TWO different sciences (Physics and Chemistry). She discovered polonium and radium, revolutionizing our understanding of radioactivity.",
    quote: "Nothing in life is to be feared; it is only to be understood.",
  },
  {
    name: "Harriet Tubman",
    years: "1822–1913",
    emoji: "🗽",
    field: "Freedom Fighter",
    bio: "Escaped slavery and then returned 13 times to rescue 70+ enslaved people via the Underground Railroad. Later served as a spy for the Union Army. Called 'Moses' by her people.",
    quote: "Every great dream begins with a dreamer.",
  },
  {
    name: "Malala Yousafzai",
    years: "1997–present",
    emoji: "📚",
    field: "Education Activist",
    bio: "At age 15, survived a Taliban assassination attempt for speaking out about girls' education. Became the youngest Nobel Peace Prize laureate at age 17.",
    quote:
      "One child, one teacher, one pen, and one book can change the world.",
  },
  {
    name: "Frida Kahlo",
    years: "1907–1954",
    emoji: "🎨",
    field: "Artist",
    bio: "Iconic Mexican painter who transformed personal pain into powerful art. Her work explored identity, postcolonialism, and feminism. Despite 35 surgeries, she created 143 paintings.",
    quote: "I paint flowers so they will not die.",
  },
  {
    name: "Rosa Parks",
    years: "1913–2005",
    emoji: "✊",
    field: "Civil Rights",
    bio: "Refused to give up her seat on a Montgomery bus in 1955, sparking the Montgomery Bus Boycott — a pivotal moment in the Civil Rights Movement. Called the 'Mother of the Civil Rights Movement.'",
    quote:
      "People always say that I didn't give up my seat because I was tired. I was not tired physically.",
  },
  {
    name: "Ada Lovelace",
    years: "1815–1852",
    emoji: "💻",
    field: "Computing Pioneer",
    bio: "Considered the world's first computer programmer — 100 years before computers existed! She wrote the first algorithm designed to run on Charles Babbage's Analytical Engine.",
    quote: "That brain of mine is something more than merely mortal.",
  },
  {
    name: "Amelia Earhart",
    years: "1897–1937",
    emoji: "✈️",
    field: "Aviation",
    bio: "First woman to fly solo across the Atlantic Ocean. Broke countless altitude and speed records. Disappeared mysteriously in 1937 while attempting to circumnavigate the globe.",
    quote:
      "The most difficult thing is the decision to act, the rest is merely tenacity.",
  },
  {
    name: "Serena Williams",
    years: "1981–present",
    emoji: "🎾",
    field: "Sports",
    bio: "Won 23 Grand Slam singles titles — the most by any player in the Open Era. Competed at the highest level while also being a mom and entrepreneur. Consistently ranked World No. 1.",
    quote:
      "I've had to learn to fight all my life — got to learn to keep smiling.",
  },
  {
    name: "Ruth Bader Ginsburg",
    years: "1933–2020",
    emoji: "⚖️",
    field: "Justice & Law",
    bio: "Second woman ever appointed to the US Supreme Court. Championed gender equality and civil rights for decades. Became a pop culture icon known as 'The Notorious RBG.'",
    quote:
      "Fight for the things you care about, but do it in a way that will lead others to join you.",
  },
  {
    name: "Simone Biles",
    years: "2000–present",
    emoji: "🤸‍♀️",
    field: "Gymnastics",
    bio: "The most decorated gymnast in history with 37 Olympic and World Championship medals. Has 4 gymnastics skills named after her. Became an advocate for mental health by bravely speaking out.",
    quote:
      "I'd rather regret the risks that didn't work out than the chances I didn't take at all.",
  },
];

export function GirlHeroHistory() {
  const [selected, setSelected] = useState<number | null>(null);
  const { data: votes = [] } = useGetAllHeroes();
  const voteForHero = useVoteForHero();

  const getVotes = (name: string) => {
    const hero = votes.find((h) => h.heroName === name);
    return hero ? Number(hero.votes) : 0;
  };

  const handleVote = async (name: string) => {
    try {
      await voteForHero.mutateAsync(name);
      toast.success(`Voted for ${name}! 💖`);
    } catch {
      toast.error("Couldn't vote. Try again!");
    }
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-pink-gp font-bold">
        Girl Hero History 👑
      </h3>
      <p className="text-muted-foreground">
        Learn about amazing women who changed the world! Click to read their
        story, then vote for your fave.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GIRL_HEROES.map((hero, i) => (
          <Card
            key={hero.name}
            className={`cursor-pointer card-hover border-2 transition-all ${selected === i ? "border-pink-gp bg-pink-light-gp" : "border-border hover:border-pink-gp"}`}
            onClick={() => setSelected(selected === i ? null : i)}
            data-ocid={`hero.item.${i + 1}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-2xl mb-1">{hero.emoji}</div>
                  <h4 className="font-display font-bold text-sm">
                    {hero.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">{hero.years}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {hero.field}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">
                    {getVotes(hero.name)} votes
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs text-pink-gp hover:bg-pink-light-gp p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVote(hero.name);
                    }}
                    data-ocid={`hero.button.${i + 1}`}
                  >
                    💖 Vote
                  </Button>
                </div>
              </div>
              {selected === i && (
                <div className="mt-3 border-t border-pink-gp pt-3">
                  <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                    {hero.bio}
                  </p>
                  <blockquote className="text-xs italic text-pink-gp border-l-2 border-pink-gp pl-2">
                    "{hero.quote}"
                  </blockquote>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ===== REAL GIRLS WHO ROCK =====
const REAL_GIRLS = [
  {
    name: "Jazz Jennings",
    age: "Teen",
    field: "Transgender Rights",
    emoji: "🌈",
    story:
      "Became a transgender advocate at age 6. Co-founded the TransKids Purple Rainbow Foundation to support trans youth. Her story is told in a TV documentary series.",
  },
  {
    name: "Greta Thunberg",
    age: "Teen",
    field: "Climate Activism",
    emoji: "🌿",
    story:
      "Started striking for climate action alone at age 15 outside the Swedish parliament. Inspired millions of students worldwide to strike for the planet.",
  },
  {
    name: "Gitanjali Rao",
    age: "Teen",
    field: "Inventor & Scientist",
    emoji: "🔬",
    story:
      "Named TIME Magazine's first-ever Kid of the Year. She invented Tethys, a device to detect lead in drinking water, and Kindly, an app to combat cyberbullying.",
  },
  {
    name: "Marley Dias",
    age: "Teen",
    field: "Literacy & Representation",
    emoji: "📚",
    story:
      "At age 11, launched #1000BlackGirlBooks campaign, collecting and donating over 13,000 books featuring black girl protagonists. Now a published author herself.",
  },
  {
    name: "Zendaya",
    age: "Young Adult",
    field: "Entertainment & Advocacy",
    emoji: "⭐",
    story:
      "Started acting at 14. Now one of Hollywood's most respected performers. Uses her platform to speak about race, mental health, and body image representation.",
  },
  {
    name: "Emma González",
    age: "Teen",
    field: "Gun Violence Prevention",
    emoji: "🕊️",
    story:
      "After surviving the Parkland shooting, she co-founded March for Our Lives and became one of the most powerful youth voices in American political history.",
  },
];

export function RealGirlsWhoRock() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-teal-gp font-bold">
        Real Girls Who Rock 🌟
      </h3>
      <p className="text-muted-foreground">
        These modern girls and young women are making waves right now!
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {REAL_GIRLS.map((girl, i) => (
          <Card
            key={girl.name}
            className={`cursor-pointer card-hover border-2 ${selected === i ? "border-teal-gp bg-teal-light-gp" : "border-border hover:border-teal-gp"}`}
            onClick={() => setSelected(selected === i ? null : i)}
            data-ocid={`realgirlsrock.item.${i + 1}`}
          >
            <CardContent className="p-4">
              <div className="text-2xl mb-2">{girl.emoji}</div>
              <h4 className="font-display font-bold text-sm">{girl.name}</h4>
              <Badge variant="outline" className="text-xs mt-1">
                {girl.field}
              </Badge>
              {selected === i && (
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {girl.story}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ===== DREAM JOBS =====
const DREAM_JOBS = [
  {
    title: "Marine Biologist 🐠",
    desc: "Study ocean animals and ecosystems",
    day: "Dive into coral reefs, collect specimens, analyze data in a lab, write research papers, travel to remote ocean locations.",
    skills: ["Biology", "Swimming", "Research", "Writing"],
  },
  {
    title: "Game Developer 🎮",
    desc: "Design and code video games",
    day: "Write code, create character designs, test games, fix bugs, collaborate with artists and writers, present ideas to teams.",
    skills: ["Coding", "Creativity", "Math", "Problem-solving"],
  },
  {
    title: "Astronaut 🚀",
    desc: "Travel to space and explore the universe",
    day: "Train in simulators, learn to spacewalk, conduct experiments, communicate with Earth, eat freeze-dried meals in zero gravity!",
    skills: ["Science", "Engineering", "Fitness", "Teamwork"],
  },
  {
    title: "Fashion Designer 👗",
    desc: "Create clothing and accessories",
    day: "Sketch designs, choose fabrics, visit factories, manage social media, attend fashion shows, collaborate with stylists.",
    skills: ["Art", "Business", "Trend awareness", "Sewing"],
  },
  {
    title: "Chef / Food Scientist 🍳",
    desc: "Create amazing dishes and recipes",
    day: "Develop new recipes, source local ingredients, manage kitchen teams, research food science, host cooking events, travel to learn cuisines.",
    skills: ["Cooking", "Chemistry", "Creativity", "Management"],
  },
  {
    title: "Psychologist 🧠",
    desc: "Help people understand their minds",
    day: "Meet with clients, conduct assessments, do research, write treatment plans, give talks, work with schools or hospitals.",
    skills: ["Empathy", "Research", "Communication", "Patience"],
  },
  {
    title: "Architect 🏛️",
    desc: "Design buildings and spaces",
    day: "Meet with clients, create blueprints, use design software, visit construction sites, solve structural problems, win design awards!",
    skills: ["Math", "Art", "Engineering", "Creativity"],
  },
  {
    title: "Wildlife Photographer 📸",
    desc: "Capture animals in their natural habitat",
    day: "Wake before sunrise, hike to remote locations, wait hours for the perfect shot, edit photos, sell to magazines, travel the world.",
    skills: ["Photography", "Patience", "Nature knowledge", "Fitness"],
  },
];

export function DreamJobsSection() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-purple-gp font-bold">
        Dream Jobs 💫
      </h3>
      <p className="text-muted-foreground">
        Click a job to explore what a day in that life looks like!
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {DREAM_JOBS.map((job, i) => (
          <Card
            key={job.title}
            className={`cursor-pointer card-hover border-2 transition-all ${selected === i ? "border-purple-gp bg-purple-light-gp" : "border-border hover:border-purple-gp"}`}
            onClick={() => setSelected(selected === i ? null : i)}
            data-ocid={`dreamjobs.item.${i + 1}`}
          >
            <CardContent className="p-4">
              <h4 className="font-display font-bold text-sm">{job.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{job.desc}</p>
              {selected === i && (
                <div className="mt-3 border-t border-purple-gp pt-3">
                  <p className="text-xs font-bold text-purple-gp mb-1">
                    A Day In The Life:
                  </p>
                  <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                    {job.day}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {job.skills.map((s) => (
                      <Badge key={s} variant="outline" className="text-xs">
                        {s}
                      </Badge>
                    ))}
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

// ===== ASIAN HERITAGE MONTH =====
const ASIAN_HEROES = [
  {
    name: "Kamala Harris",
    heritage: "South Asian (Indian)",
    field: "Politics",
    bio: "First woman, first Black American, and first South Asian American to become US Vice President.",
  },
  {
    name: "Malala Yousafzai",
    heritage: "Pakistani",
    field: "Education",
    bio: "Nobel Peace Prize winner who fights for every girl's right to education around the world.",
  },
  {
    name: "Simone Biles",
    heritage: "Olympic Heritage",
    field: "Gymnastics",
    bio: "Most decorated gymnast in history — proving determination beats everything.",
  },
  {
    name: "Yayoi Kusama",
    heritage: "Japanese",
    field: "Art",
    bio: "The world's highest-selling living female artist, known for her polka dot obsessions and infinity rooms.",
  },
  {
    name: "Chien-Shiung Wu",
    heritage: "Chinese American",
    field: "Physics",
    bio: "Called 'The First Lady of Physics.' Her experiment disproved a theory everyone believed, changing nuclear physics forever.",
  },
];

export function AsianHeritageMonth() {
  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-coral-gp font-bold">
        Asian Heritage Month 🌸
      </h3>
      <p className="text-muted-foreground">
        Celebrating incredible Asian women and their contributions to our world!
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {ASIAN_HEROES.map((hero, i) => (
          <Card
            key={hero.name}
            className="border-2 border-coral-light-gp card-hover"
            data-ocid={`asian.item.${i + 1}`}
          >
            <CardContent className="p-4">
              <h4 className="font-display font-bold text-coral-gp">
                {hero.name}
              </h4>
              <div className="flex gap-2 mt-1 mb-2">
                <Badge variant="outline" className="text-xs">
                  {hero.heritage}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {hero.field}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{hero.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-coral-light-gp border-none">
        <CardContent className="p-4">
          <h4 className="font-display font-bold text-coral-gp mb-2">
            Cultural Highlights 🌏
          </h4>
          <ul className="text-sm space-y-1">
            <li>
              🏮 Chinese New Year: Year of the Dragon in 2024 — strength and
              prosperity!
            </li>
            <li>
              🎋 Tanabata (Japanese Star Festival): Celebrate love and wishes on
              July 7
            </li>
            <li>🪔 Diwali: Festival of lights celebrated across South Asia</li>
            <li>
              🌸 Cherry Blossom season in Japan represents renewal and beauty
            </li>
            <li>
              🥢 Asian cuisine spans over 50 countries with incredible
              diversity!
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

// ===== GIRL POWER WALL OF FAME =====
export function WallOfFame() {
  const [girlName, setGirlName] = useState("");
  const [reason, setReason] = useState("");
  const { data: entries = [], isLoading } = useGetAllWallOfFameEntries();
  const addEntry = useAddWallOfFameEntry();

  const COLORS = [
    "bg-pink-light-gp border-pink-gp",
    "bg-purple-light-gp border-purple-gp",
    "bg-teal-light-gp border-teal-gp",
    "bg-yellow-light-gp border-yellow-gp",
    "bg-coral-light-gp border-coral-gp",
  ];

  const handleAdd = async () => {
    if (!girlName.trim() || !reason.trim()) {
      toast.error("Add both a name and a reason!");
      return;
    }
    try {
      await addEntry.mutateAsync({
        girlName: girlName.trim(),
        reason: reason.trim(),
      });
      setGirlName("");
      setReason("");
      toast.success(`${girlName} is on the Wall of Fame! 🌟`);
    } catch {
      toast.error("Couldn't add. Try again!");
    }
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-pink-gp font-bold">
        Girl Power Wall of Fame 🏆
      </h3>
      <p className="text-muted-foreground">
        Nominate a girl or woman who ROCKS! Tell everyone why she's amazing.
      </p>

      <Card className="border-2 border-pink-light-gp">
        <CardContent className="p-5 flex flex-col gap-3">
          <Input
            placeholder="Who rocks? (name)"
            value={girlName}
            onChange={(e) => setGirlName(e.target.value)}
            className="border-border focus:border-pink-gp"
            data-ocid="wall.input"
          />
          <Input
            placeholder="Why does she rock? ✨"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="border-border focus:border-pink-gp"
          />
          <Button
            onClick={handleAdd}
            disabled={addEntry.isPending}
            className="bg-pink-gp text-white rounded-full self-start px-8"
            data-ocid="wall.submit_button"
          >
            Add to Wall 🏆
          </Button>
        </CardContent>
      </Card>

      {isLoading ? (
        <div
          className="text-center py-4 text-muted-foreground"
          data-ocid="wall.loading_state"
        >
          Loading... 🌟
        </div>
      ) : entries.length === 0 ? (
        <div
          className="text-center py-8 text-muted-foreground bg-muted rounded-xl"
          data-ocid="wall.empty_state"
        >
          <div className="text-4xl mb-2">🏆</div>
          <p className="font-display font-bold">
            The wall is empty! Be the first to add someone amazing!
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry, i) => (
            <Card
              key={entry.girlName + entry.reason.slice(0, 10)}
              className={`border-2 ${COLORS[i % COLORS.length]}`}
              data-ocid={`wall.item.${i + 1}`}
            >
              <CardContent className="p-4">
                <div className="text-lg mb-1">⭐</div>
                <h4 className="font-display font-bold text-sm">
                  {entry.girlName}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {entry.reason}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== EARTH DAY HISTORY =====
const EARTH_DAY_FACTS = [
  {
    q: "What year was the first Earth Day?",
    options: ["1960", "1970", "1980", "1990"],
    correct: 1,
    fact: "The first Earth Day was April 22, 1970! 20 million Americans participated.",
  },
  {
    q: "Who founded Earth Day?",
    options: ["Al Gore", "Gaylord Nelson", "John Muir", "Rachel Carson"],
    correct: 1,
    fact: "Senator Gaylord Nelson, inspired by a 1969 oil spill, created Earth Day to raise environmental awareness.",
  },
  {
    q: "How many countries celebrate Earth Day today?",
    options: ["50", "100", "150", "193+"],
    correct: 3,
    fact: "Over 193 countries celebrate Earth Day, making it the largest civic observance in the world!",
  },
  {
    q: "What major law was passed after the first Earth Day?",
    options: [
      "Clean Air Act",
      "Clean Water Act",
      "Endangered Species Act",
      "All of these",
    ],
    correct: 3,
    fact: "The Clean Air Act, Clean Water Act, AND Endangered Species Act were all passed thanks to Earth Day activism!",
  },
];

export function EarthDayHistory() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(EARTH_DAY_FACTS.length).fill(null),
  );
  const score = answers.filter(
    (a, i) => a === EARTH_DAY_FACTS[i].correct,
  ).length;

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-teal-gp font-bold">
        Earth Day History 🌍
      </h3>
      <p className="text-muted-foreground">
        Learn how Earth Day started and test your knowledge!
      </p>
      <Card className="bg-teal-light-gp border-none">
        <CardContent className="p-4">
          <p className="font-bold text-teal-gp mb-2">
            🌱 Why Earth Day Matters
          </p>
          <p className="text-sm text-foreground">
            Earth Day was born out of a massive oil spill in Santa Barbara,
            California in 1969. Senator Gaylord Nelson channeled the energy of
            the anti-war movement into the cause of environmental action — and
            the world changed forever. Today it's a global movement!
          </p>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-4">
        {EARTH_DAY_FACTS.map((item, qi) => (
          <Card
            key={item.q}
            className="border-2 border-teal-light-gp"
            data-ocid={`earthday.item.${qi + 1}`}
          >
            <CardContent className="p-4">
              <p className="font-bold text-sm mb-2">
                {qi + 1}. {item.q}
              </p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {item.options.map((opt, oi) => (
                  <Button
                    key={opt}
                    size="sm"
                    variant="outline"
                    className={`h-auto py-2 text-left justify-start text-xs ${answers[qi] !== null ? (oi === item.correct ? "border-teal-gp bg-teal-light-gp text-teal-gp font-bold" : answers[qi] === oi ? "border-destructive bg-red-50" : "opacity-50") : "hover:border-teal-gp"}`}
                    onClick={() =>
                      answers[qi] === null &&
                      setAnswers((prev) => {
                        const n = [...prev];
                        n[qi] = oi;
                        return n;
                      })
                    }
                    data-ocid={`earthday.button.${qi + 1}`}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
              {answers[qi] !== null && (
                <p className="text-xs text-teal-gp">
                  {answers[qi] === item.correct ? "✅" : "❌"} {item.fact}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {answers.every((a) => a !== null) && (
        <Card
          className={`border-none text-center ${score >= 3 ? "bg-teal-light-gp" : "bg-yellow-light-gp"}`}
          data-ocid="earthday.success_state"
        >
          <CardContent className="p-6">
            <div className="text-4xl mb-2">{score >= 3 ? "🌍" : "🌱"}</div>
            <p className="font-display text-xl font-bold">
              {score}/{EARTH_DAY_FACTS.length} —{" "}
              {score >= 3 ? "Earth Day Expert!" : "Keep learning!"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ===== WOMEN'S HISTORY MONTH =====
const WOMENS_HISTORY_FACTS = [
  {
    name: "Susan B. Anthony",
    field: "Suffrage",
    fact: "Fought for women's right to vote for 50 years. Was arrested for voting in 1872. The 19th Amendment was ratified 14 years after her death.",
    emoji: "🗳️",
  },
  {
    name: "Eleanor Roosevelt",
    field: "Human Rights",
    fact: "Served as First Lady and became the first chair of the UN Commission on Human Rights. Helped write the Universal Declaration of Human Rights.",
    emoji: "🕊️",
  },
  {
    name: "Rosie the Riveter",
    field: "Cultural Symbol",
    fact: "The iconic 'We Can Do It!' poster became a symbol of women entering the workforce during WWII, proving women could do 'men's' jobs.",
    emoji: "💪",
  },
  {
    name: "Gloria Steinem",
    field: "Feminism",
    fact: "Co-founded Ms. Magazine and spent decades fighting for women's equality, reproductive rights, and workplace fairness.",
    emoji: "✊",
  },
  {
    name: "Katherine Johnson",
    field: "Space",
    fact: "NASA mathematician whose calculations were so trusted that John Glenn refused to fly unless she personally verified the computer's numbers!",
    emoji: "🚀",
  },
];

export function WomensHistoryMonth() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-pink-gp font-bold">
        Women's History Month 🌸
      </h3>
      <p className="text-muted-foreground">
        March is Women's History Month — celebrating the women who changed
        everything!
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {WOMENS_HISTORY_FACTS.map((item, i) => (
          <Card
            key={item.name}
            className={`cursor-pointer card-hover border-2 transition-all ${selected === i ? "border-pink-gp bg-pink-light-gp" : "border-border hover:border-pink-gp"}`}
            onClick={() => setSelected(selected === i ? null : i)}
            data-ocid={`womenshistory.item.${i + 1}`}
          >
            <CardContent className="p-4">
              <div className="text-2xl mb-1">{item.emoji}</div>
              <h4 className="font-display font-bold text-sm">{item.name}</h4>
              <Badge variant="outline" className="text-xs mt-1">
                {item.field}
              </Badge>
              {selected === i && (
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  {item.fact}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="bg-pink-light-gp border-none">
        <CardContent className="p-4 text-sm">
          <p className="font-bold text-pink-gp mb-1">💡 Did You Know?</p>
          <p>
            Women's History Month began as a single week in 1980 (Women's
            History Week) and was expanded to a full month in 1987 by Congress!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ===== BLACK HISTORY MONTH =====
const BLACK_WOMEN_HEROES = [
  {
    name: "Harriet Tubman",
    field: "Freedom Fighter",
    emoji: "🗽",
    bio: "Called 'Moses,' she made 13 missions to rescue 70+ people via the Underground Railroad and never lost a passenger.",
  },
  {
    name: "Maya Angelou",
    field: "Poet & Author",
    emoji: "✍️",
    bio: "Her memoir 'I Know Why the Caged Bird Sings' changed literature forever. She read her poem at President Clinton's inauguration.",
  },
  {
    name: "Madam C.J. Walker",
    field: "Entrepreneur",
    emoji: "💼",
    bio: "First self-made female millionaire in America. Built a hair care empire from scratch when doors were closed to Black women.",
  },
  {
    name: "Shirley Chisholm",
    field: "Politics",
    emoji: "🏛️",
    bio: "First Black woman elected to US Congress (1968) and first to run for US President (1972). 'Unbought and Unbossed.'",
  },
  {
    name: "Mae C. Jemison",
    field: "Astronaut",
    emoji: "🚀",
    bio: "First Black woman in space (1992). Also a doctor and teacher who founded a company to make science accessible to students.",
  },
  {
    name: "Toni Morrison",
    field: "Literature",
    emoji: "📚",
    bio: "Nobel Prize-winning novelist. 'Beloved' won the Pulitzer Prize. Her work centered Black experiences at the heart of American literature.",
  },
];

export function BlackHistoryMonth() {
  const [selected, setSelected] = useState<number | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const quiz = {
    q: "Who was the first Black woman elected to the US Congress?",
    a: "Shirley Chisholm",
    options: [
      "Mae C. Jemison",
      "Harriet Tubman",
      "Shirley Chisholm",
      "Toni Morrison",
    ],
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="font-display text-2xl text-purple-gp font-bold">
        Black History Month 💜
      </h3>
      <p className="text-muted-foreground">
        February is Black History Month — celebrating incredible Black women who
        changed history!
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {BLACK_WOMEN_HEROES.map((hero, i) => (
          <Card
            key={hero.name}
            className={`cursor-pointer card-hover border-2 transition-all ${selected === i ? "border-purple-gp bg-purple-light-gp" : "border-border hover:border-purple-gp"}`}
            onClick={() => setSelected(selected === i ? null : i)}
            data-ocid={`blackhistory.item.${i + 1}`}
          >
            <CardContent className="p-4">
              <div className="text-2xl mb-1">{hero.emoji}</div>
              <h4 className="font-display font-bold text-sm">{hero.name}</h4>
              <Badge variant="outline" className="text-xs mt-1">
                {hero.field}
              </Badge>
              {selected === i && (
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  {hero.bio}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-2 border-purple-light-gp">
        <CardContent className="p-4">
          <p className="font-bold text-purple-gp mb-3">🧠 Quick Quiz:</p>
          <p className="text-sm font-bold mb-3">{quiz.q}</p>
          <div className="flex flex-wrap gap-2">
            {quiz.options.map((opt) => (
              <Button
                key={opt}
                size="sm"
                variant="outline"
                className={`rounded-full ${quizAnswer === opt ? (opt === quiz.a ? "bg-teal-gp text-white border-teal-gp" : "bg-destructive text-white border-destructive") : "hover:border-purple-gp"}`}
                onClick={() => setQuizAnswer(opt)}
                data-ocid="blackhistory.toggle"
              >
                {opt}
              </Button>
            ))}
          </div>
          {quizAnswer && (
            <p className="text-sm mt-3 font-bold">
              {quizAnswer === quiz.a
                ? "✅ Correct! Shirley Chisholm was elected in 1968."
                : "❌ Not quite — it was Shirley Chisholm!"}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ===== COMMUNITY SERVICE =====
const SERVICE_IDEAS = [
  {
    title: "Blanket Drive for Shelters 🧸",
    desc: "Collect blankets, stuffed animals, and toiletries for your local homeless shelter",
    impact: "Keeps people warm and makes them feel cared for",
  },
  {
    title: "Read to Kids 📚",
    desc: "Volunteer to read to younger children at your local library or school",
    impact: "Builds literacy and creates joy for little ones",
  },
  {
    title: "Clean Up a Park 🌳",
    desc: "Organize a neighborhood park cleanup with friends and family",
    impact: "Makes your community beautiful and safer for wildlife",
  },
  {
    title: "Bake for Neighbors 🍪",
    desc: "Bake cookies or treats for elderly neighbors who live alone",
    impact: "Reduces loneliness and spreads warmth",
  },
  {
    title: "Pet Shelter Help 🐾",
    desc: "Walk dogs, socialize cats, or make toys for animals at a shelter",
    impact: "Helps animals find loving homes faster",
  },
  {
    title: "Letter Writing Campaign ✉️",
    desc: "Write letters to veterans, elderly in care homes, or hospitalized kids",
    impact: "Brighten someone's day who needs a reminder they matter",
  },
  {
    title: "Community Garden 🌻",
    desc: "Help plant and maintain a community garden, then donate the food",
    impact: "Feeds families and builds community connections",
  },
];

export function CommunityService() {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(SERVICE_IDEAS.length).fill(false),
  );
  const done = checked.filter(Boolean).length;

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-coral-gp font-bold">
        Community Service 💖
      </h3>
      <p className="text-muted-foreground">
        Small acts of service create HUGE ripples! Check off what you've done or
        want to do.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {SERVICE_IDEAS.map((idea, i) => (
          <button
            key={idea.title}
            type="button"
            className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all text-left w-full ${checked[i] ? "bg-coral-light-gp border-coral-gp" : "border-border hover:border-coral-gp"}`}
            onClick={() =>
              setChecked((prev) => {
                const n = [...prev];
                n[i] = !n[i];
                return n;
              })
            }
            data-ocid={`service.checkbox.${i + 1}`}
          >
            <Checkbox
              checked={checked[i]}
              className="mt-1 border-coral-gp data-[state=checked]:bg-coral-gp shrink-0"
            />
            <div>
              <p
                className={`font-bold text-sm ${checked[i] ? "line-through text-muted-foreground" : ""}`}
              >
                {idea.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{idea.desc}</p>
              <p className="text-xs text-coral-gp mt-1 font-bold">
                💖 {idea.impact}
              </p>
            </div>
          </button>
        ))}
      </div>
      {done > 0 && (
        <Card
          className="bg-coral-light-gp border-none text-center"
          data-ocid="service.success_state"
        >
          <CardContent className="p-4">
            <p className="font-display font-bold text-coral-gp">
              You've done {done} service {done === 1 ? "act" : "acts"}! The
              world is better because of you! 💖
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ===== HERO INTERVIEWS =====
const INTERVIEW_QUESTIONS = [
  "What was your biggest dream when you were my age?",
  "What's one thing you wish someone had told you when you were growing up?",
  "What was the hardest thing you ever overcame? How did you do it?",
  "Who was your hero or role model? Why?",
  "What's something you're still learning even now?",
  "What does being brave mean to you?",
  "What's your proudest accomplishment?",
  "If you could go back and give your younger self advice, what would it be?",
  "What's one thing that always makes you feel better on a hard day?",
  "What do you think makes someone a good leader?",
  "How did you figure out what you wanted to do with your life?",
  "What's something you failed at that actually taught you something important?",
  "What's a moment when you surprised yourself by being braver than you thought?",
  "What makes you happiest in life?",
  "What do you want people to remember about you someday?",
];

export function HeroInterviews() {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const nextQuestion = () =>
    setQuestionIdx((prev) => (prev + 1) % INTERVIEW_QUESTIONS.length);
  const randomQuestion = () => {
    let next = questionIdx;
    while (next === questionIdx)
      next = Math.floor(Math.random() * INTERVIEW_QUESTIONS.length);
    setQuestionIdx(next);
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="font-display text-2xl text-coral-gp font-bold">
        Hero Interviews 🎤
      </h3>
      <p className="text-muted-foreground">
        Ask your mom, grandma, teacher, or any hero in your life one of these
        questions. Then write down what they say — you'll treasure it forever!
      </p>

      <Card className="bg-coral-light-gp border-none">
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-3">🎤</div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Question {questionIdx + 1} of {INTERVIEW_QUESTIONS.length}
          </p>
          <p className="font-display text-xl font-bold text-foreground leading-relaxed">
            "{INTERVIEW_QUESTIONS[questionIdx]}"
          </p>
          <div className="flex gap-3 justify-center mt-4">
            <Button
              className="bg-coral-gp text-white rounded-full"
              onClick={randomQuestion}
              data-ocid="interview.primary_button"
            >
              New Question 🎲
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-coral-gp text-coral-gp"
              onClick={nextQuestion}
              data-ocid="interview.secondary_button"
            >
              Next Question →
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <h4 className="font-display font-bold text-coral-gp mb-2">
          ✍️ Write Their Answer Here
        </h4>
        <Textarea
          placeholder="What did your hero say? Write it down so you never forget... 💖"
          value={answers[questionIdx] ?? ""}
          onChange={(e) =>
            setAnswers((prev) => ({ ...prev, [questionIdx]: e.target.value }))
          }
          className="min-h-[120px] border-coral-gp/30 focus:border-coral-gp"
          data-ocid="interview.textarea"
        />
      </div>

      {Object.keys(answers).filter((k) => answers[Number(k)].trim()).length >
        0 && (
        <div>
          <h4 className="font-display font-bold text-coral-gp mb-3">
            💝 Your Hero's Wisdom
          </h4>
          <div className="flex flex-col gap-3">
            {Object.entries(answers)
              .filter(([, val]) => val.trim())
              .map(([qi, ans], i) => (
                <Card
                  key={qi}
                  className="border-2 border-coral-gp/20"
                  data-ocid={`interview.item.${i + 1}`}
                >
                  <CardContent className="p-4">
                    <p className="text-xs font-bold text-coral-gp mb-1">
                      Q: "{INTERVIEW_QUESTIONS[Number(qi)]}"
                    </p>
                    <p className="text-sm text-foreground italic">"{ans}"</p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
