import type { Card, CountSnapshot, DrillConfig } from "./types";
import { Shoe } from "./shoe";
import { Counter } from "./counting";

export interface DrillResult {
  done: boolean;
  card: Card | null;
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
   * Advances to the next card in the drill
   */
  next(): DrillResult {
    const card = this.shoe.dealOne();

    if (card === null) {
      return {
        done: true,
        card: null,
        snap: this.counter.snapshot(0),
      };
    }

    this.counter.seen(card);
    const snap = this.counter.snapshot(this.shoe.cardsRemaining());

    return {
      done: false,
      card,
      snap,
    };
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
