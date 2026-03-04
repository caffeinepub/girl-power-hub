import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Map "mo:core/Map";
import Array "mo:core/Array";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Order "mo:core/Order";

actor {
  // 1. Journal Entries
  type JournalEntry = {
    text : Text;
    date : Text;
    mood : ?Text;
  };

  module JournalEntry {
    public func compare(entry1 : JournalEntry, entry2 : JournalEntry) : Order.Order {
      Text.compare(entry1.date, entry2.date);
    };
  };

  let journalEntriesMap = Map.empty<Nat, JournalEntry>();
  var journalCounter = 0;

  public shared ({ caller }) func addJournalEntry(text : Text, date : Text, mood : ?Text) : async () {
    let entry : JournalEntry = { text; date; mood };
    journalEntriesMap.add(journalCounter, entry);
    journalCounter += 1;
  };

  public query ({ caller }) func getAllJournalEntries() : async [JournalEntry] {
    journalEntriesMap.values().toArray().sort();
  };

  // 2. Wall of Fame Entries
  type WallOfFameEntry = {
    girlName : Text;
    reason : Text;
  };

  let wallOfFame = List.empty<WallOfFameEntry>();

  public shared ({ caller }) func addWallOfFameEntry(girlName : Text, reason : Text) : async () {
    let entry : WallOfFameEntry = { girlName; reason };
    wallOfFame.add(entry);
  };

  public query ({ caller }) func getAllWallOfFameEntries() : async [WallOfFameEntry] {
    wallOfFame.toArray();
  };

  // 3. Positive Post-its
  type PostIt = {
    note : Text;
    color : Text;
  };

  let postIts = List.empty<PostIt>();

  public shared ({ caller }) func addPostIt(note : Text, color : Text) : async () {
    let postIt : PostIt = { note; color };
    postIts.add(postIt);
  };

  public query ({ caller }) func getAllPostIts() : async [PostIt] {
    postIts.toArray();
  };

  // 4. Vision/Dream Board Items
  type VisionItem = {
    title : Text;
    description : Text;
    category : Text;
  };

  let visionBoard = List.empty<VisionItem>();

  public shared ({ caller }) func addVisionItem(title : Text, description : Text, category : Text) : async () {
    let item : VisionItem = { title; description; category };
    visionBoard.add(item);
  };

  public query ({ caller }) func getVisionBoard() : async [VisionItem] {
    visionBoard.toArray();
  };

  // 5. Goal Items
  type GoalItem = {
    goal : Text;
    completed : Bool;
  };

  let goals = Map.empty<Nat, GoalItem>();
  var goalCounter = 0;

  public shared ({ caller }) func addGoal(goal : Text) : async () {
    let goalItem : GoalItem = { goal; completed = false };
    goals.add(goalCounter, goalItem);
    goalCounter += 1;
  };

  public shared ({ caller }) func completeGoal(id : Nat) : async () {
    switch (goals.get(id)) {
      case (null) { Runtime.trap("Goal not found") };
      case (?goalItem) {
        let updatedGoal = { goalItem with completed = true };
        goals.add(id, updatedGoal);
      };
    };
  };

  public query ({ caller }) func getAllGoals() : async [GoalItem] {
    goals.values().toArray();
  };

  // 6. Book Club Picks
  type BookPick = {
    title : Text;
    author : Text;
    review : Text;
    rating : Nat;
  };

  let bookPicks = List.empty<BookPick>();

  public shared ({ caller }) func addBookPick(title : Text, author : Text, review : Text, rating : Nat) : async () {
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };
    let book : BookPick = { title; author; review; rating };
    bookPicks.add(book);
  };

  public query ({ caller }) func getBookPicks() : async [BookPick] {
    bookPicks.toArray();
  };

  // 7. Trivia Scores
  type TriviaScore = {
    username : Text;
    score : Nat;
    category : Text;
  };

  let triviaScores = List.empty<TriviaScore>();

  public shared ({ caller }) func addTriviaScore(username : Text, score : Nat, category : Text) : async () {
    let trivia : TriviaScore = { username; score; category };
    triviaScores.add(trivia);
  };

  public query ({ caller }) func getTriviaScores() : async [TriviaScore] {
    triviaScores.toArray();
  };

  // 8. Girl Hero Votes
  type GirlHero = {
    heroName : Text;
    votes : Nat;
  };

  let girlHeroes = Map.empty<Text, GirlHero>();

  public shared ({ caller }) func voteForHero(heroName : Text) : async () {
    switch (girlHeroes.get(heroName)) {
      case (null) {
        let newHero : GirlHero = { heroName; votes = 1 };
        girlHeroes.add(heroName, newHero);
      };
      case (?hero) {
        let updatedHero = { hero with votes = hero.votes + 1 };
        girlHeroes.add(heroName, updatedHero);
      };
    };
  };

  public query ({ caller }) func getAllHeroes() : async [GirlHero] {
    girlHeroes.values().toArray();
  };

  // 9. Mad Libs Completions
  type MadLib = {
    storyTitle : Text;
    filledText : Text;
  };

  let madLibs = List.empty<MadLib>();

  public shared ({ caller }) func addMadLib(storyTitle : Text, filledText : Text) : async () {
    let madLib : MadLib = { storyTitle; filledText };
    madLibs.add(madLib);
  };

  public query ({ caller }) func getAllMadLibs() : async [MadLib] {
    madLibs.toArray();
  };

  // 10. Scavenger Hunt Checklist Items
  type ScavengerItem = {
    itemName : Text;
    found : Bool;
  };

  let scavengerItems = Map.empty<Nat, ScavengerItem>();
  var scavengerCounter = 0;

  public shared ({ caller }) func addScavengerItem(itemName : Text) : async () {
    let item : ScavengerItem = { itemName; found = false };
    scavengerItems.add(scavengerCounter, item);
    scavengerCounter += 1;
  };

  public shared ({ caller }) func markItemFound(id : Nat) : async () {
    switch (scavengerItems.get(id)) {
      case (null) { Runtime.trap("Item not found") };
      case (?item) {
        let updatedItem = { item with found = true };
        scavengerItems.add(id, updatedItem);
      };
    };
  };

  public query ({ caller }) func getAllScavengerItems() : async [ScavengerItem] {
    scavengerItems.values().toArray();
  };
};
