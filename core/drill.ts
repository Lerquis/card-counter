import type { Card, CountSnapshot, DrillConfig } from "./types";
import { Shoe } from "./shoe";
import { Counter } from "./counting";

export interface DrillResult {
  done: boolean;
  cards: Card[];
  snap: CountSnapshot;
}

export class DrillSession {
  private shoe: Shoe;
  private counter: Counter;
  private config: DrillConfig;

  constructor(config: DrillConfig) {
    this.config = config;
    this.shoe = new Shoe(config.decks, 1.0, config.leaveOutCards);
    this.counter = new Counter();
  }

  /**
   * Advances to the next card(s) in the drill
   */
  next(): DrillResult {
    const cardsRemaining = this.shoe.cardsRemaining();

    if (cardsRemaining === 0) {
      return {
        done: true,
        cards: [],
        snap: this.counter.snapshot(0),
      };
    }

    let groupSize = 1;

    if (this.config.enableGroupMode) {
      groupSize = this.determineGroupSize(cardsRemaining);
    }

    const cards: Card[] = [];
    for (let i = 0; i < groupSize; i++) {
      const card = this.shoe.dealOne();
      if (card !== null) {
        cards.push(card);
        this.counter.seen(card);
      }
    }

    const snap = this.counter.snapshot(this.shoe.cardsRemaining());

    return {
      done: this.shoe.cardsRemaining() === 0,
      cards,
      snap,
    };
  }

  /**
   * Determines the optimal group size based on remaining cards
   */
  private determineGroupSize(cardsRemaining: number): number {
    const maxSize = this.config.maxGroupSize;

    // If we have enough cards, use a random size between 2 and maxGroupSize
    if (cardsRemaining >= maxSize * 2) {
      return Math.floor(Math.random() * (maxSize - 1)) + 2; // Random between 2 and maxSize
    }

    // Smart distribution for remaining cards
    // Try to divide remaining cards into reasonable groups
    if (cardsRemaining <= maxSize) {
      return cardsRemaining;
    }

    // Find a group size that divides evenly or leaves a reasonable remainder
    for (let size = maxSize; size >= 2; size--) {
      const remainder = cardsRemaining % size;
      // If it divides evenly or leaves a remainder >= 2, use this size
      if (remainder === 0 || remainder >= 2) {
        return size;
      }
    }

    // Default: use maxGroupSize
    return Math.min(maxSize, cardsRemaining);
  }

  /**
   * Gets the current snapshot without advancing
   */
  getSnapshot(): CountSnapshot {
    return this.counter.snapshot(this.shoe.cardsRemaining());
  }

  /**
   * Checks if the drill is complete
   */
  isDone(): boolean {
    return this.shoe.cardsRemaining() === 0;
  }

  /**
   * Resets the drill session
   */
  reset(): void {
    this.shoe = new Shoe(this.config.decks, 1.0, this.config.leaveOutCards);
    this.counter = new Counter();
  }

  /**
   * Gets the configuration
   */
  getConfig(): DrillConfig {
    return { ...this.config };
  }

  /**
   * Gets the cards that were left out
   */
  getLeftOutCards(): Card[] {
    return this.shoe.getLeftOutCards();
  }
}

/**
 * Starts a new drill session
 */
export function startDrill(config: DrillConfig): DrillSession {
  return new DrillSession(config);
}
