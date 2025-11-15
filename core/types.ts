// Card types
export type Suit = "♠" | "♥" | "♦" | "♣";
export type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";

export interface Card {
  rank: Rank;
  suit: Suit;
}

// Counting system
export type CountingSystem = "HI_LO";

export interface CountSnapshot {
  runningCount: number;
  trueCount: number;
  decksRemaining: number;
  cardsRemaining: number;
}

// Game modes
export type GameMode = "DRILL" | "BLACKJACK" | "QUIZ";

// Drill configuration
export interface DrillConfig {
  decks: number;
  leaveOutCards: number;
  showCardHistory: boolean;
  showAssistAlways: boolean;
  advanceMode: "manual" | "auto";
  autoMs: number;
  enableGroupMode: boolean;
  maxGroupSize: number;
}

// Blackjack configuration
export interface BlackjackConfig {
  decks: number;
  penetrationPct: number;
  handsPerPlayer: number;
  botSeats: number;
  enableBasicStrategyHints: boolean;
  enableIndexDeviations: boolean;
  minBet: number;
  maxBet: number;
  dealerHitsSoft17: boolean;
  blackjackPayout: number; // 1.5 for 3:2, 1.2 for 6:5
}

// Shoe state
export interface ShoeState {
  cards: Card[];
  dealtCount: number;
  penetrationPct: number;
}

// Hand types
export type HandType = "hard" | "soft" | "pair";

export interface Hand {
  cards: Card[];
  bet: number;
  status: "active" | "stand" | "bust" | "blackjack" | "surrender";
  doubled: boolean;
  insuranceBet: number;
}

export interface PlayerState {
  hands: Hand[];
  currentHandIndex: number;
  bankroll: number;
  buyIn: number; // Total amount bought in (started at $1000)
  isBot: boolean;
  seatIndex: number;
}

export interface DealerState {
  hand: Card[];
  hiddenCard: boolean;
}

// Actions
export type Action = "HIT" | "STAND" | "DOUBLE" | "SPLIT" | "SURRENDER";

// Game phase
export type GamePhase = "BETTING" | "DEAL" | "INSURANCE" | "PLAYER" | "DEALER" | "SETTLE" | "SHUFFLING";

// Strategy tables (simplified structure)
export interface BasicStrategyTable {
  hard: Record<string, Record<string, Action>>;
  soft: Record<string, Record<string, Action>>;
  pair: Record<string, Record<string, Action>>;
}

export interface IndexDeviation {
  hand: string;
  dealerUpcard: Rank;
  trueCount: number;
  action: Action;
  description: string;
}

// Drill state
export interface DrillState {
  config: DrillConfig;
  cards: Card[];
  currentIndex: number;
  isPlaying: boolean;
  snapshot: CountSnapshot;
  lastCard: Card | null;
}

// Quiz configuration
export interface QuizConfig {
  enableDeviations: boolean;
  dealerHitsSoft17: boolean;
  allowDoubleAfterSplit: boolean;
  allowSurrender: boolean;
}

// Quiz question/hand
export interface QuizHand {
  playerCards: Card[];
  dealerUpcard: Card;
  trueCount: number;
  canDouble: boolean;
  canSplit: boolean;
  canSurrender: boolean;
}

// Quiz answer result
export interface QuizAnswerResult {
  isCorrect: boolean;
  correctAction: Action;
  explanation: string;
}
