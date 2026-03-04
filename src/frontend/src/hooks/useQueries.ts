import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

// ===== JOURNAL =====
export function useGetAllJournalEntries() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["journalEntries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllJournalEntries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddJournalEntry() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      text,
      date,
      mood,
    }: {
      text: string;
      date: string;
      mood: string | null;
    }) => {
      if (!actor) throw new Error("No actor");
      await actor.addJournalEntry(text, date, mood);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["journalEntries"] }),
  });
}

// ===== WALL OF FAME =====
export function useGetAllWallOfFameEntries() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["wallOfFame"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllWallOfFameEntries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddWallOfFameEntry() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      girlName,
      reason,
    }: {
      girlName: string;
      reason: string;
    }) => {
      if (!actor) throw new Error("No actor");
      await actor.addWallOfFameEntry(girlName, reason);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wallOfFame"] }),
  });
}

// ===== POST-ITS =====
export function useGetAllPostIts() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["postIts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPostIts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddPostIt() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ note, color }: { note: string; color: string }) => {
      if (!actor) throw new Error("No actor");
      await actor.addPostIt(note, color);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["postIts"] }),
  });
}

// ===== VISION BOARD =====
export function useGetVisionBoard() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["visionBoard"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVisionBoard();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddVisionItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      description,
      category,
    }: {
      title: string;
      description: string;
      category: string;
    }) => {
      if (!actor) throw new Error("No actor");
      await actor.addVisionItem(title, description, category);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["visionBoard"] }),
  });
}

// ===== GOALS =====
export function useGetAllGoals() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["goals"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGoals();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddGoal() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (goal: string) => {
      if (!actor) throw new Error("No actor");
      await actor.addGoal(goal);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] }),
  });
}

export function useCompleteGoal() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      await actor.completeGoal(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] }),
  });
}

// ===== BOOK CLUB =====
export function useGetBookPicks() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["bookPicks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBookPicks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddBookPick() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      author,
      review,
      rating,
    }: {
      title: string;
      author: string;
      review: string;
      rating: bigint;
    }) => {
      if (!actor) throw new Error("No actor");
      await actor.addBookPick(title, author, review, rating);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookPicks"] }),
  });
}

// ===== TRIVIA SCORES =====
export function useGetTriviaScores() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["triviaScores"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTriviaScores();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTriviaScore() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      username,
      score,
      category,
    }: {
      username: string;
      score: bigint;
      category: string;
    }) => {
      if (!actor) throw new Error("No actor");
      await actor.addTriviaScore(username, score, category);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["triviaScores"] }),
  });
}

// ===== GIRL HEROES =====
export function useGetAllHeroes() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["heroes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllHeroes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVoteForHero() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (heroName: string) => {
      if (!actor) throw new Error("No actor");
      await actor.voteForHero(heroName);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["heroes"] }),
  });
}

// ===== MAD LIBS =====
export function useGetAllMadLibs() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["madLibs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMadLibs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddMadLib() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      storyTitle,
      filledText,
    }: {
      storyTitle: string;
      filledText: string;
    }) => {
      if (!actor) throw new Error("No actor");
      await actor.addMadLib(storyTitle, filledText);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["madLibs"] }),
  });
}

// ===== SCAVENGER HUNT =====
export function useGetAllScavengerItems() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["scavengerItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllScavengerItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMarkItemFound() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      await actor.markItemFound(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["scavengerItems"] }),
  });
}
