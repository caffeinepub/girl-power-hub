import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PostIt {
    note: string;
    color: string;
}
export interface GirlHero {
    votes: bigint;
    heroName: string;
}
export interface GoalItem {
    goal: string;
    completed: boolean;
}
export interface JournalEntry {
    date: string;
    mood?: string;
    text: string;
}
export interface TriviaScore {
    username: string;
    score: bigint;
    category: string;
}
export interface MadLib {
    storyTitle: string;
    filledText: string;
}
export interface WallOfFameEntry {
    girlName: string;
    reason: string;
}
export interface ScavengerItem {
    found: boolean;
    itemName: string;
}
export interface VisionItem {
    title: string;
    description: string;
    category: string;
}
export interface BookPick {
    review: string;
    title: string;
    author: string;
    rating: bigint;
}
export interface backendInterface {
    addBookPick(title: string, author: string, review: string, rating: bigint): Promise<void>;
    addGoal(goal: string): Promise<void>;
    addJournalEntry(text: string, date: string, mood: string | null): Promise<void>;
    addMadLib(storyTitle: string, filledText: string): Promise<void>;
    addPostIt(note: string, color: string): Promise<void>;
    addScavengerItem(itemName: string): Promise<void>;
    addTriviaScore(username: string, score: bigint, category: string): Promise<void>;
    addVisionItem(title: string, description: string, category: string): Promise<void>;
    addWallOfFameEntry(girlName: string, reason: string): Promise<void>;
    completeGoal(id: bigint): Promise<void>;
    getAllGoals(): Promise<Array<GoalItem>>;
    getAllHeroes(): Promise<Array<GirlHero>>;
    getAllJournalEntries(): Promise<Array<JournalEntry>>;
    getAllMadLibs(): Promise<Array<MadLib>>;
    getAllPostIts(): Promise<Array<PostIt>>;
    getAllScavengerItems(): Promise<Array<ScavengerItem>>;
    getAllWallOfFameEntries(): Promise<Array<WallOfFameEntry>>;
    getBookPicks(): Promise<Array<BookPick>>;
    getTriviaScores(): Promise<Array<TriviaScore>>;
    getVisionBoard(): Promise<Array<VisionItem>>;
    markItemFound(id: bigint): Promise<void>;
    voteForHero(heroName: string): Promise<void>;
}
