import type { Card, CountSnapshot, Rank } from "./types";

/**
 * Hi-Lo card counting system
 * 2-6: +1
 * 7-9: 0
 * 10-K, A: -1
 */
const HI_LO_VALUES: Record<Rank, number> = {
  "2": 1,
  "3": 1,
  "4": 1,
  "5": 1,
  "6": 1,
  "7": 0,
  "8": 0,
  "9": 0,
  "10": -1,
  J: -1,
  Q: -1,
  K: -1,
  A: -1,
};

export class Counter {
  private runningCount: number = 0;
  private cardsSeen: number = 0;

  /**
   * Processes a seen card and updates the running count
   */
  seen(card: Card): void {
    this.runningCount += HI_LO_VALUES[card.rank];
    this.cardsSeen++;
  }

  /**
   * Resets the counter to initial state
   */
  reset(): void {
    this.runningCount = 0;
    this.cardsSeen = 0;
  }

  /**
   * Gets the current running count
   */
  getRunningCount(): number {
    return this.runningCount;
  }

  /**
   * Gets the number of cards seen
   */
  getCardsSeen(): number {
    return this.cardsSeen;
  }

  /**
   * Calculates and returns a snapshot with running count, true count, etc.
   * @param cardsRemaining - Total cards remaining in shoe
   * @param playableCardsRemaining - Cards remaining that will actually be played (excluding penetration)
   */
  snapshot(cardsRemaining: number, playableCardsRemaining?: number): CountSnapshot {
    // If playableCardsRemaining not provided, assume all remaining cards are playable (drill mode)
    const effectivePlayableCards = playableCardsRemaining ?? cardsRemaining;

    // Round UP the number of decks remaining (as per counting convention)
    const decksRemaining = effectivePlayableCards > 0 ? Math.ceil(effectivePlayableCards / 52) : 0;
    const trueCount = decksRemaining > 0 ? this.runningCount / decksRemaining : 0;

    return {
      runningCount: this.runningCount,
      trueCount: Math.floor(trueCount), // Floor the true count
      decksRemaining: Math.round((effectivePlayableCards / 52) * 10) / 10,
      cardsRemaining,
    };
  }
}
