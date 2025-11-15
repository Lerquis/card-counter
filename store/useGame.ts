import { create } from "zustand";
import type {
  GameMode,
  DrillConfig,
  BlackjackConfig,
  Card,
  CountSnapshot,
} from "@/core/types";
import { DrillSession } from "@/core/drill";
import { BlackjackGame } from "@/core/blackjack";

interface GameState {
  // Current mode
  mode: GameMode;

  // Drill state
  drill: {
    session: DrillSession | null;
    config: DrillConfig;
    isPlaying: boolean;
    recentCards: Card[];
    lastCard: Card | null;
    currentGroup: Card[];
    snapshot: CountSnapshot;
    leftOutCards: Card[];
    showStats: boolean;
    showCompletion: boolean;
  };

  // Blackjack state
  blackjack: {
    game: BlackjackGame | null;
    config: BlackjackConfig;
  };

  // Settings
  settings: {
    showAssistAlways: boolean;
    showAssistOnHover: boolean;
    enableBasicStrategyHints: boolean;
    enableIndexDeviations: boolean;
  };

  // Actions
  setMode: (mode: GameMode) => void;

  // Drill actions
  startDrill: (config: DrillConfig) => void;
  nextCardDrill: () => void;
  togglePlayDrill: () => void;
  resetDrill: () => void;
  updateDrillConfig: (config: Partial<DrillConfig>) => void;

  // Blackjack actions
  startBlackjack: (config: BlackjackConfig) => void;
  resetBlackjackProgress: () => void;
  addHand: (playerIndex: number) => void;
  removeHand: (playerIndex: number, handIndex: number) => void;
  placeBet: (playerIndex: number, handIndex: number, amount: number) => void;
  clearBet: (playerIndex: number, handIndex: number) => void;
  addChips: (playerIndex: number, amount: number) => void;
  dealRound: () => void;
  placeInsurance: (playerIndex: number, handIndex: number) => void;
  skipInsurance: () => void;
  playerHit: (playerIndex: number, handIndex: number) => void;
  playerStand: (playerIndex: number, handIndex: number) => void;
  playerDouble: (playerIndex: number, handIndex: number) => void;
  playerSplit: (playerIndex: number, handIndex: number) => void;
  playerSurrender: (playerIndex: number, handIndex: number) => void;
  dealerPlay: () => void;
  settleRound: () => void;
  newRound: () => void;
  performShuffle: () => void;
  reshuffleNow: () => void;
  updateBlackjackConfig: (config: Partial<BlackjackConfig>) => void;

  // Settings actions
  updateSettings: (settings: Partial<GameState["settings"]>) => void;
}

const defaultDrillConfig: DrillConfig = {
  decks: 6,
  leaveOutCards: 0,
  showCardHistory: true,
  showAssistAlways: false,
  advanceMode: "manual",
  autoMs: 1000,
  enableGroupMode: false,
  maxGroupSize: 6,
};

const defaultBlackjackConfig: BlackjackConfig = {
  decks: 6,
  penetrationPct: 0.75,
  handsPerPlayer: 1,
  botSeats: 0,
  enableBasicStrategyHints: true,
  enableIndexDeviations: true,
  minBet: 10,
  maxBet: 5000,
  dealerHitsSoft17: false,
  blackjackPayout: 1.5,
};

// LocalStorage keys
const BLACKJACK_PLAYER_STATE_KEY = "blackjack_player_state";

// Helper functions for localStorage
function savePlayerState(bankroll: number, buyIn: number): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(
        BLACKJACK_PLAYER_STATE_KEY,
        JSON.stringify({ bankroll, buyIn })
      );
    } catch (error) {
      console.error("Failed to save player state:", error);
    }
  }
}

function loadPlayerState(): { bankroll: number; buyIn: number } | null {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(BLACKJACK_PLAYER_STATE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("Failed to load player state:", error);
    }
  }
  return null;
}

export const useGame = create<GameState>((set, get) => ({
  mode: "DRILL",

  drill: {
    session: null,
    config: defaultDrillConfig,
    isPlaying: false,
    recentCards: [],
    lastCard: null,
    currentGroup: [],
    snapshot: {
      runningCount: 0,
      trueCount: 0,
      decksRemaining: 6,
      cardsRemaining: 312,
    },
    leftOutCards: [],
    showStats: true,
    showCompletion: false,
  },

  blackjack: {
    game: null,
    config: defaultBlackjackConfig,
  },

  settings: {
    showAssistAlways: false,
    showAssistOnHover: true,
    enableBasicStrategyHints: true,
    enableIndexDeviations: true,
  },

  setMode: (mode) => set({ mode }),

  // Drill actions
  startDrill: (config) => {
    const session = new DrillSession(config);
    const snapshot = session.getSnapshot();
    const leftOutCards = session.getLeftOutCards();
    set({
      drill: {
        session,
        config,
        isPlaying: false,
        recentCards: [],
        lastCard: null,
        currentGroup: [],
        snapshot,
        leftOutCards,
        showStats: true,
        showCompletion: false,
      },
    });
  },

  nextCardDrill: () => {
    const { session, recentCards } = get().drill;
    if (!session) return;

    const result = session.next();

    if (result.done) {
      // Si hay cartas en el resultado, mostrarlas primero
      if (result.cards.length > 0) {
        const newRecentCards = [...recentCards, ...result.cards].slice(-15);
        set((state) => ({
          drill: {
            ...state.drill,
            recentCards: newRecentCards,
            lastCard: result.cards[result.cards.length - 1] || null,
            currentGroup: result.cards,
            snapshot: result.snap,
          },
        }));

        // Después de 1.5 segundos, mostrar el mensaje de completado
        setTimeout(() => {
          set((state) => ({
            drill: {
              ...state.drill,
              showCompletion: true,
            },
          }));
        }, 1500);
      } else {
        // No hay cartas, mostrar completado inmediatamente
        set((state) => ({
          drill: {
            ...state.drill,
            snapshot: result.snap,
            currentGroup: [],
            showCompletion: true,
          },
        }));
      }
      return;
    }

    const newRecentCards = result.cards.length > 0
      ? [...recentCards, ...result.cards].slice(-15) // Keep last 15 cards
      : recentCards;

    set((state) => ({
      drill: {
        ...state.drill,
        recentCards: newRecentCards,
        lastCard: result.cards[result.cards.length - 1] || null,
        currentGroup: result.cards,
        snapshot: result.snap,
      },
    }));
  },

  togglePlayDrill: () => {
    set((state) => ({
      drill: {
        ...state.drill,
        isPlaying: !state.drill.isPlaying,
      },
    }));
  },

  resetDrill: () => {
    const { config } = get().drill;
    get().startDrill(config);
  },

  updateDrillConfig: (configUpdate) => {
    set((state) => ({
      drill: {
        ...state.drill,
        config: { ...state.drill.config, ...configUpdate },
      },
    }));
  },

  // Blackjack actions
  startBlackjack: (config) => {
    // Load saved player state
    const savedState = loadPlayerState();
    const game = new BlackjackGame(config, savedState || undefined);
    set({
      blackjack: {
        game,
        config,
      },
    });
  },

  resetBlackjackProgress: () => {
    // Clear saved state
    if (typeof window !== "undefined") {
      localStorage.removeItem(BLACKJACK_PLAYER_STATE_KEY);
    }

    // Restart game with default values
    const { config } = get().blackjack;
    const game = new BlackjackGame(config);
    set({
      blackjack: {
        game,
        config,
      },
    });
  },

  addHand: (playerIndex) => {
    const { game } = get().blackjack;
    if (!game) return;
    game.addHand(playerIndex);
    set((state) => ({ blackjack: { ...state.blackjack } }));
  },

  removeHand: (playerIndex, handIndex) => {
    const { game } = get().blackjack;
    if (!game) return;
    game.removeHand(playerIndex, handIndex);
    set((state) => ({ blackjack: { ...state.blackjack } }));
  },

  placeBet: (playerIndex, handIndex, amount) => {
    const { game } = get().blackjack;
    if (!game) return;
    game.placeBet(playerIndex, handIndex, amount);
    set((state) => ({ blackjack: { ...state.blackjack } }));

    // Save player state after betting
    const playerState = game.getPlayerStateForSave();
    if (playerState) savePlayerState(playerState.bankroll, playerState.buyIn);
  },

  clearBet: (playerIndex, handIndex) => {
    const { game } = get().blackjack;
    if (!game) return;
    game.clearBet(playerIndex, handIndex);
    set((state) => ({ blackjack: { ...state.blackjack } }));

    // Save player state after clearing bet
    const playerState = game.getPlayerStateForSave();
    if (playerState) savePlayerState(playerState.bankroll, playerState.buyIn);
  },

  addChips: (playerIndex, amount) => {
    const { game } = get().blackjack;
    if (!game) return;
    game.addChips(playerIndex, amount);
    set((state) => ({ blackjack: { ...state.blackjack } }));

    // Save player state after adding chips
    const playerState = game.getPlayerStateForSave();
    if (playerState) savePlayerState(playerState.bankroll, playerState.buyIn);
  },

  dealRound: () => {
    const { game } = get().blackjack;
    if (!game) return;
    game.deal();
    set((state) => ({ blackjack: { ...state.blackjack } }));
  },

  placeInsurance: (playerIndex, handIndex) => {
    const { game } = get().blackjack;
    if (!game) return;
    game.placeInsurance(playerIndex, handIndex);
    set((state) => ({ blackjack: { ...state.blackjack } }));

    // Save player state after placing insurance
    const playerState = game.getPlayerStateForSave();
    if (playerState) savePlayerState(playerState.bankroll, playerState.buyIn);
  },

  skipInsurance: () => {
    const { game } = get().blackjack;
    if (!game) return;
    game.proceedAfterInsurance();
    set((state) => ({ blackjack: { ...state.blackjack } }));

    // Save player state after insurance resolution
    const playerState = game.getPlayerStateForSave();
    if (playerState) savePlayerState(playerState.bankroll, playerState.buyIn);
  },

  playerHit: (playerIndex, handIndex) => {
    const { game } = get().blackjack;
    if (!game) return;
    game.hit(playerIndex, handIndex);
    game.nextTurn();
    set((state) => ({ blackjack: { ...state.blackjack } }));
  },

  playerStand: (playerIndex, handIndex) => {
    const { game } = get().blackjack;
    if (!game) return;
    game.stand(playerIndex, handIndex);
    game.nextTurn();
    set((state) => ({ blackjack: { ...state.blackjack } }));
  },

  playerDouble: (playerIndex, handIndex) => {
    const { game } = get().blackjack;
    if (!game) return;
    game.double(playerIndex, handIndex);
    game.nextTurn();
    set((state) => ({ blackjack: { ...state.blackjack } }));
  },

  playerSplit: (playerIndex, handIndex) => {
    const { game } = get().blackjack;
    if (!game) return;
    game.split(playerIndex, handIndex);
    set((state) => ({ blackjack: { ...state.blackjack } }));
  },

  playerSurrender: (playerIndex, handIndex) => {
    const { game } = get().blackjack;
    if (!game) return;
    game.surrender(playerIndex, handIndex);
    game.nextTurn();
    set((state) => ({ blackjack: { ...state.blackjack } }));
  },

  dealerPlay: () => {
    const { game } = get().blackjack;
    if (!game) return;
    game.dealerPlay();
    set((state) => ({ blackjack: { ...state.blackjack } }));
  },

  settleRound: () => {
    const { game } = get().blackjack;
    if (!game) return;
    game.settle();
    set((state) => ({ blackjack: { ...state.blackjack } }));

    // Save player state after settling (winnings/losses)
    const playerState = game.getPlayerStateForSave();
    if (playerState) savePlayerState(playerState.bankroll, playerState.buyIn);
  },

  newRound: () => {
    const { game } = get().blackjack;
    if (!game) return;
    game.newRound();
    set((state) => ({ blackjack: { ...state.blackjack } }));
  },

  performShuffle: () => {
    const { game } = get().blackjack;
    if (!game) return;
    game.performShuffle();
    set((state) => ({ blackjack: { ...state.blackjack } }));
  },

  reshuffleNow: () => {
    const { game } = get().blackjack;
    if (!game) return;
    game.reshuffle();
    set((state) => ({ blackjack: { ...state.blackjack } }));
  },

  updateBlackjackConfig: (configUpdate) => {
    const { game } = get().blackjack;
    // Update game's config if game exists
    if (game) {
      game.updateConfig(configUpdate);
    }
    set((state) => ({
      blackjack: {
        ...state.blackjack,
        config: { ...state.blackjack.config, ...configUpdate },
      },
    }));
  },

  updateSettings: (settingsUpdate) => {
    set((state) => ({
      settings: { ...state.settings, ...settingsUpdate },
    }));
  },
}));
