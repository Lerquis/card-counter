import type { Card, ShoeState } from "./types";
import { createShoe, shuffle } from "./deck";

export class Shoe {
  private state: ShoeState;
  private totalCards: number;
  private leftOutCards: Card[];

  constructor(numDecks: number, penetrationPct: number = 0.75, leaveOutCards: number = 0) {
    const cards = shuffle(createShoe(numDecks));

    // Remove leave-out cards from the end if specified
    const availableCards = leaveOutCards > 0
      ? cards.slice(0, cards.length - leaveOutCards)
      : cards;

    this.leftOutCards = leaveOutCards > 0
      ? cards.slice(cards.length - leaveOutCards)
      : [];

    this.totalCards = availableCards.length;
    this.state = {
      cards: availableCards,
      dealtCount: 0,
      penetrationPct,
    };
  }

  /**
   * Deals one card from the shoe
   */
  dealOne(): Card | null {
    if (this.state.dealtCount >= this.state.cards.length) {
      return null;
    }
    const card = this.state.cards[this.state.dealtCount];
    this.state.dealtCount++;
    return card;
  }

  /**
   * Returns the number of cards remaining in the shoe
   */
  cardsRemaining(): number {
    return this.state.cards.length - this.state.dealtCount;
  }

  /**
   * Checks if penetration threshold has been reached
   */
  reachedPenetration(): boolean {
    const dealtPct = this.state.dealtCount / this.totalCards;
    return dealtPct >= this.state.penetrationPct;
  }

  /**
   * Reshuffles the shoe
   */
  reshuffle(numDecks: number, leaveOutCards: number = 0): void {
    const cards = shuffle(createShoe(numDecks));

    const availableCards = leaveOutCards > 0
      ? cards.slice(0, cards.length - leaveOutCards)
      : cards;

    this.leftOutCards = leaveOutCards > 0
      ? cards.slice(cards.length - leaveOutCards)
      : [];

    this.totalCards = availableCards.length;
    this.state.cards = availableCards;
    this.state.dealtCount = 0;
  }

  /**
   * Gets the current state of the shoe
   */
  getState(): ShoeState {
    return { ...this.state };
  }

  /**
   * Gets the penetration percentage
   */
  getPenetrationPct(): number {
    return this.state.dealtCount / this.totalCards;
  }

  /**
   * Gets the total number of cards in the shoe
   */
  getTotalCards(): number {
    return this.totalCards;
  }

  /**
   * Gets the cards that were left out
   */
  getLeftOutCards(): Card[] {
    return [...this.leftOutCards];
  }
}
