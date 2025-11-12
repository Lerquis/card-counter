import type { Action, BasicStrategyTable, Card, IndexDeviation, Rank } from "./types";

/**
 * Basic Strategy tables (simplified examples - real tables would be more complete)
 * Format: playerTotal -> dealerUpcard -> Action
 */
export const BASIC_STRATEGY: BasicStrategyTable = {
  // Hard totals (no ace or ace counted as 1)
  hard: {
    "5": { "2": "HIT", "3": "HIT", "4": "HIT", "5": "HIT", "6": "HIT", "7": "HIT", "8": "HIT", "9": "HIT", "10": "HIT", "A": "HIT" },
    "6": { "2": "HIT", "3": "HIT", "4": "HIT", "5": "HIT", "6": "HIT", "7": "HIT", "8": "HIT", "9": "HIT", "10": "HIT", "A": "HIT" },
    "7": { "2": "HIT", "3": "HIT", "4": "HIT", "5": "HIT", "6": "HIT", "7": "HIT", "8": "HIT", "9": "HIT", "10": "HIT", "A": "HIT" },
    "8": { "2": "HIT", "3": "HIT", "4": "HIT", "5": "HIT", "6": "HIT", "7": "HIT", "8": "HIT", "9": "HIT", "10": "HIT", "A": "HIT" },
    "9": { "2": "HIT", "3": "DOUBLE", "4": "DOUBLE", "5": "DOUBLE", "6": "DOUBLE", "7": "HIT", "8": "HIT", "9": "HIT", "10": "HIT", "A": "HIT" },
    "10": { "2": "DOUBLE", "3": "DOUBLE", "4": "DOUBLE", "5": "DOUBLE", "6": "DOUBLE", "7": "DOUBLE", "8": "DOUBLE", "9": "DOUBLE", "10": "HIT", "A": "HIT" },
    "11": { "2": "DOUBLE", "3": "DOUBLE", "4": "DOUBLE", "5": "DOUBLE", "6": "DOUBLE", "7": "DOUBLE", "8": "DOUBLE", "9": "DOUBLE", "10": "DOUBLE", "A": "DOUBLE" },
    "12": { "2": "HIT", "3": "HIT", "4": "STAND", "5": "STAND", "6": "STAND", "7": "HIT", "8": "HIT", "9": "HIT", "10": "HIT", "A": "HIT" },
    "13": { "2": "STAND", "3": "STAND", "4": "STAND", "5": "STAND", "6": "STAND", "7": "HIT", "8": "HIT", "9": "HIT", "10": "HIT", "A": "HIT" },
    "14": { "2": "STAND", "3": "STAND", "4": "STAND", "5": "STAND", "6": "STAND", "7": "HIT", "8": "HIT", "9": "HIT", "10": "HIT", "A": "HIT" },
    "15": { "2": "STAND", "3": "STAND", "4": "STAND", "5": "STAND", "6": "STAND", "7": "HIT", "8": "HIT", "9": "HIT", "10": "SURRENDER", "A": "HIT" },
    "16": { "2": "STAND", "3": "STAND", "4": "STAND", "5": "STAND", "6": "STAND", "7": "HIT", "8": "HIT", "9": "SURRENDER", "10": "SURRENDER", "A": "SURRENDER" },
    "17": { "2": "STAND", "3": "STAND", "4": "STAND", "5": "STAND", "6": "STAND", "7": "STAND", "8": "STAND", "9": "STAND", "10": "STAND", "A": "STAND" },
    "18": { "2": "STAND", "3": "STAND", "4": "STAND", "5": "STAND", "6": "STAND", "7": "STAND", "8": "STAND", "9": "STAND", "10": "STAND", "A": "STAND" },
    "19": { "2": "STAND", "3": "STAND", "4": "STAND", "5": "STAND", "6": "STAND", "7": "STAND", "8": "STAND", "9": "STAND", "10": "STAND", "A": "STAND" },
    "20": { "2": "STAND", "3": "STAND", "4": "STAND", "5": "STAND", "6": "STAND", "7": "STAND", "8": "STAND", "9": "STAND", "10": "STAND", "A": "STAND" },
    "21": { "2": "STAND", "3": "STAND", "4": "STAND", "5": "STAND", "6": "STAND", "7": "STAND", "8": "STAND", "9": "STAND", "10": "STAND", "A": "STAND" },
  },
  // Soft totals (ace counted as 11)
  soft: {
    "13": { "2": "HIT", "3": "HIT", "4": "HIT", "5": "DOUBLE", "6": "DOUBLE", "7": "HIT", "8": "HIT", "9": "HIT", "10": "HIT", "A": "HIT" },
    "14": { "2": "HIT", "3": "HIT", "4": "HIT", "5": "DOUBLE", "6": "DOUBLE", "7": "HIT", "8": "HIT", "9": "HIT", "10": "HIT", "A": "HIT" },
    "15": { "2": "HIT", "3": "HIT", "4": "DOUBLE", "5": "DOUBLE", "6": "DOUBLE", "7": "HIT", "8": "HIT", "9": "HIT", "10": "HIT", "A": "HIT" },
    "16": { "2": "HIT", "3": "HIT", "4": "DOUBLE", "5": "DOUBLE", "6": "DOUBLE", "7": "HIT", "8": "HIT", "9": "HIT", "10": "HIT", "A": "HIT" },
    "17": { "2": "HIT", "3": "DOUBLE", "4": "DOUBLE", "5": "DOUBLE", "6": "DOUBLE", "7": "HIT", "8": "HIT", "9": "HIT", "10": "HIT", "A": "HIT" },
    "18": { "2": "STAND", "3": "DOUBLE", "4": "DOUBLE", "5": "DOUBLE", "6": "DOUBLE", "7": "STAND", "8": "STAND", "9": "HIT", "10": "HIT", "A": "HIT" },
    "19": { "2": "STAND", "3": "STAND", "4": "STAND", "5": "STAND", "6": "STAND", "7": "STAND", "8": "STAND", "9": "STAND", "10": "STAND", "A": "STAND" },
    "20": { "2": "STAND", "3": "STAND", "4": "STAND", "5": "STAND", "6": "STAND", "7": "STAND", "8": "STAND", "9": "STAND", "10": "STAND", "A": "STAND" },
    "21": { "2": "STAND", "3": "STAND", "4": "STAND", "5": "STAND", "6": "STAND", "7": "STAND", "8": "STAND", "9": "STAND", "10": "STAND", "A": "STAND" },
  },
  // Pairs
  pair: {
    "A,A": { "2": "SPLIT", "3": "SPLIT", "4": "SPLIT", "5": "SPLIT", "6": "SPLIT", "7": "SPLIT", "8": "SPLIT", "9": "SPLIT", "10": "SPLIT", "A": "SPLIT" },
    "10,10": { "2": "STAND", "3": "STAND", "4": "STAND", "5": "STAND", "6": "STAND", "7": "STAND", "8": "STAND", "9": "STAND", "10": "STAND", "A": "STAND" },
    "9,9": { "2": "SPLIT", "3": "SPLIT", "4": "SPLIT", "5": "SPLIT", "6": "SPLIT", "7": "STAND", "8": "SPLIT", "9": "SPLIT", "10": "STAND", "A": "STAND" },
    "8,8": { "2": "SPLIT", "3": "SPLIT", "4": "SPLIT", "5": "SPLIT", "6": "SPLIT", "7": "SPLIT", "8": "SPLIT", "9": "SPLIT", "10": "SPLIT", "A": "SPLIT" },
    "7,7": { "2": "SPLIT", "3": "SPLIT", "4": "SPLIT", "5": "SPLIT", "6": "SPLIT", "7": "SPLIT", "8": "HIT", "9": "HIT", "10": "HIT", "A": "HIT" },
    "6,6": { "2": "SPLIT", "3": "SPLIT", "4": "SPLIT", "5": "SPLIT", "6": "SPLIT", "7": "HIT", "8": "HIT", "9": "HIT", "10": "HIT", "A": "HIT" },
    "5,5": { "2": "DOUBLE", "3": "DOUBLE", "4": "DOUBLE", "5": "DOUBLE", "6": "DOUBLE", "7": "DOUBLE", "8": "DOUBLE", "9": "DOUBLE", "10": "HIT", "A": "HIT" },
    "4,4": { "2": "HIT", "3": "HIT", "4": "HIT", "5": "SPLIT", "6": "SPLIT", "7": "HIT", "8": "HIT", "9": "HIT", "10": "HIT", "A": "HIT" },
    "3,3": { "2": "SPLIT", "3": "SPLIT", "4": "SPLIT", "5": "SPLIT", "6": "SPLIT", "7": "SPLIT", "8": "HIT", "9": "HIT", "10": "HIT", "A": "HIT" },
    "2,2": { "2": "SPLIT", "3": "SPLIT", "4": "SPLIT", "5": "SPLIT", "6": "SPLIT", "7": "SPLIT", "8": "HIT", "9": "HIT", "10": "HIT", "A": "HIT" },
  },
};

/**
 * Index Deviations - The Illustrious 18 + Fab 4 Surrenders
 * These are the most valuable count-dependent strategy changes for Hi-Lo
 */
export const INDEX_DEVIATIONS: IndexDeviation[] = [
  // ILLUSTRIOUS 18 (ordered by importance)
  // 1. Insurance at +3 (handled separately in game logic)

  // 2. 16 vs 10: Stand at TC 0
  {
    hand: "16",
    dealerUpcard: "10",
    trueCount: 0,
    action: "STAND",
    description: "16 vs 10: Stand at TC ≥ 0",
  },

  // 3. 15 vs 10: Stand at TC +4
  {
    hand: "15",
    dealerUpcard: "10",
    trueCount: 4,
    action: "STAND",
    description: "15 vs 10: Stand at TC ≥ +4",
  },

  // 4. 20 vs 5: Double at TC +5
  {
    hand: "20",
    dealerUpcard: "5",
    trueCount: 5,
    action: "DOUBLE",
    description: "20 vs 5: Double at TC ≥ +5",
  },

  // 5. 20 vs 6: Double at TC +4
  {
    hand: "20",
    dealerUpcard: "6",
    trueCount: 4,
    action: "DOUBLE",
    description: "20 vs 6: Double at TC ≥ +4",
  },

  // 6. 16 vs 9: Stand at TC +5
  {
    hand: "16",
    dealerUpcard: "9",
    trueCount: 5,
    action: "STAND",
    description: "16 vs 9: Stand at TC ≥ +5",
  },

  // 7. 13 vs 2: Stand at TC -1
  {
    hand: "13",
    dealerUpcard: "2",
    trueCount: -1,
    action: "STAND",
    description: "13 vs 2: Stand at TC ≥ -1",
  },

  // 8. 12 vs 3: Stand at TC +2
  {
    hand: "12",
    dealerUpcard: "3",
    trueCount: 2,
    action: "STAND",
    description: "12 vs 3: Stand at TC ≥ +2",
  },

  // 9. 12 vs 2: Stand at TC +3
  {
    hand: "12",
    dealerUpcard: "2",
    trueCount: 3,
    action: "STAND",
    description: "12 vs 2: Stand at TC ≥ +3",
  },

  // 10. 11 vs A: Double at TC +1
  {
    hand: "11",
    dealerUpcard: "A",
    trueCount: 1,
    action: "DOUBLE",
    description: "11 vs A: Double at TC ≥ +1",
  },

  // 11. 9 vs 2: Double at TC +1
  {
    hand: "9",
    dealerUpcard: "2",
    trueCount: 1,
    action: "DOUBLE",
    description: "9 vs 2: Double at TC ≥ +1",
  },

  // 12. 10 vs 10: Double at TC +4
  {
    hand: "10",
    dealerUpcard: "10",
    trueCount: 4,
    action: "DOUBLE",
    description: "10 vs 10: Double at TC ≥ +4",
  },

  // 13. 9 vs 7: Double at TC +3
  {
    hand: "9",
    dealerUpcard: "7",
    trueCount: 3,
    action: "DOUBLE",
    description: "9 vs 7: Double at TC ≥ +3",
  },

  // 14. 16 vs A: Stand at TC +5
  {
    hand: "16",
    dealerUpcard: "A",
    trueCount: 5,
    action: "STAND",
    description: "16 vs A: Stand at TC ≥ +5",
  },

  // 15. 8 vs 6: Double at TC +2
  {
    hand: "8",
    dealerUpcard: "6",
    trueCount: 2,
    action: "DOUBLE",
    description: "8 vs 6: Double at TC ≥ +2",
  },

  // 16. 15 vs A: Stand at TC +5
  {
    hand: "15",
    dealerUpcard: "A",
    trueCount: 5,
    action: "STAND",
    description: "15 vs A: Stand at TC ≥ +5",
  },

  // 17. 12 vs 4: Stand at TC 0
  {
    hand: "12",
    dealerUpcard: "4",
    trueCount: 0,
    action: "STAND",
    description: "12 vs 4: Stand at TC ≥ 0",
  },

  // 18. 12 vs 5: Stand at TC -2
  {
    hand: "12",
    dealerUpcard: "5",
    trueCount: -2,
    action: "STAND",
    description: "12 vs 5: Stand at TC ≥ -2",
  },

  // 19. 12 vs 6: Stand at TC -1
  {
    hand: "12",
    dealerUpcard: "6",
    trueCount: -1,
    action: "STAND",
    description: "12 vs 6: Stand at TC ≥ -1",
  },

  // 20. 13 vs 3: Stand at TC -2
  {
    hand: "13",
    dealerUpcard: "3",
    trueCount: -2,
    action: "STAND",
    description: "13 vs 3: Stand at TC ≥ -2",
  },

  // 21. 10 vs A: Double at TC +4
  {
    hand: "10",
    dealerUpcard: "A",
    trueCount: 4,
    action: "DOUBLE",
    description: "10 vs A: Double at TC ≥ +4",
  },

  // FAB 4 SURRENDERS
  // 1. 16 vs 9: Surrender at TC +1 (overrides stand at +5)
  {
    hand: "16",
    dealerUpcard: "9",
    trueCount: 1,
    action: "SURRENDER",
    description: "16 vs 9: Surrender at TC ≥ +1",
  },

  // 2. 16 vs 10: Surrender at TC 0 (overrides stand at 0 if surrender allowed)
  {
    hand: "16",
    dealerUpcard: "10",
    trueCount: 0,
    action: "SURRENDER",
    description: "16 vs 10: Surrender at TC ≥ 0",
  },

  // 3. 16 vs A: Surrender at TC -1
  {
    hand: "16",
    dealerUpcard: "A",
    trueCount: -1,
    action: "SURRENDER",
    description: "16 vs A: Surrender at TC ≥ -1",
  },

  // 4. 15 vs 10: Surrender at TC 0
  {
    hand: "15",
    dealerUpcard: "10",
    trueCount: 0,
    action: "SURRENDER",
    description: "15 vs 10: Surrender at TC ≥ 0",
  },

  // 5. 15 vs 9: Surrender at TC +2
  {
    hand: "15",
    dealerUpcard: "9",
    trueCount: 2,
    action: "SURRENDER",
    description: "15 vs 9: Surrender at TC ≥ +2",
  },

  // 6. 15 vs A: Surrender at TC +1
  {
    hand: "15",
    dealerUpcard: "A",
    trueCount: 1,
    action: "SURRENDER",
    description: "15 vs A: Surrender at TC ≥ +1",
  },

  // 7. 14 vs 10: Surrender at TC +3
  {
    hand: "14",
    dealerUpcard: "10",
    trueCount: 3,
    action: "SURRENDER",
    description: "14 vs 10: Surrender at TC ≥ +3",
  },

  // Additional valuable deviations
  // 8. 11 vs A: Double at TC +1
  {
    hand: "11",
    dealerUpcard: "A",
    trueCount: 1,
    action: "DOUBLE",
    description: "11 vs A: Double at TC ≥ +1",
  },
];

/**
 * Calculates the total value of a hand
 */
export function calculateHandValue(cards: Card[]): { value: number; isSoft: boolean } {
  let total = 0;
  let aces = 0;

  for (const card of cards) {
    if (card.rank === "A") {
      aces++;
      total += 11;
    } else if (["J", "Q", "K"].includes(card.rank)) {
      total += 10;
    } else {
      total += parseInt(card.rank);
    }
  }

  // Adjust for aces
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return {
    value: total,
    isSoft: aces > 0,
  };
}

/**
 * Determines if a hand is a pair
 */
export function isPair(cards: Card[]): boolean {
  if (cards.length !== 2) return false;

  // Check if both cards have the same value (10, J, Q, K are all considered 10)
  const value1 = ["J", "Q", "K"].includes(cards[0].rank) ? "10" : cards[0].rank;
  const value2 = ["J", "Q", "K"].includes(cards[1].rank) ? "10" : cards[1].rank;

  return value1 === value2;
}

/**
 * Gets the applicable deviation for a given situation (if any)
 */
export function getApplicableDeviation(
  playerCards: Card[],
  dealerUpcard: Rank,
  trueCount: number
): IndexDeviation | null {
  const handValue = calculateHandValue(playerCards);

  // Sort deviations: Surrenders first (higher priority), then by true count descending
  const sortedDeviations = [...INDEX_DEVIATIONS].sort((a, b) => {
    if (a.action === "SURRENDER" && b.action !== "SURRENDER") return -1;
    if (a.action !== "SURRENDER" && b.action === "SURRENDER") return 1;
    return b.trueCount - a.trueCount;
  });

  for (const deviation of sortedDeviations) {
    if (
      deviation.hand === handValue.value.toString() &&
      deviation.dealerUpcard === dealerUpcard &&
      trueCount >= deviation.trueCount
    ) {
      return deviation;
    }
  }

  return null;
}

/**
 * Determines if insurance should be taken based on True Count
 * Insurance is only profitable when TC >= +3
 */
export function shouldTakeInsurance(trueCount: number, enableDeviations: boolean = false): boolean {
  if (!enableDeviations) {
    // Basic strategy: Never take insurance
    return false;
  }

  // With card counting: Take insurance at TC >= +3
  return trueCount >= 3;
}

/**
 * Suggests the best action for a given hand
 */
export function suggestAction(
  playerCards: Card[],
  dealerUpcard: Rank,
  trueCount: number,
  enableDeviations: boolean = false
): Action {
  const handValue = calculateHandValue(playerCards);

  // Check for blackjack
  if (playerCards.length === 2 && handValue.value === 21) {
    return "STAND";
  }

  // Check index deviations first if enabled
  if (enableDeviations) {
    const deviation = getApplicableDeviation(playerCards, dealerUpcard, trueCount);
    if (deviation) {
      return deviation.action;
    }
  }

  // Check if it's a pair
  if (isPair(playerCards)) {
    const pairKey = `${playerCards[0].rank},${playerCards[0].rank}`;
    const action = BASIC_STRATEGY.pair[pairKey]?.[dealerUpcard];
    if (action) return action;
  }

  // Check soft or hard total
  const handKey = handValue.value.toString();
  if (handValue.isSoft) {
    const action = BASIC_STRATEGY.soft[handKey]?.[dealerUpcard];
    if (action) return action;
  }

  const action = BASIC_STRATEGY.hard[handKey]?.[dealerUpcard];
  if (action) return action;

  // Default fallback
  return handValue.value < 17 ? "HIT" : "STAND";
}
