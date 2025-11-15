import type { Card, QuizConfig, QuizHand, QuizAnswerResult, Action, Rank } from "./types";
import { suggestAction, isPair, calculateHandValue } from "./strategy";
import { Shoe } from "./shoe";

/**
 * Quiz Session - Generates random blackjack hands and validates answers
 */
export class QuizSession {
  private config: QuizConfig;
  private shoe: Shoe;
  private currentHand: QuizHand | null = null;
  private stats = {
    correct: 0,
    incorrect: 0,
    streak: 0,
    bestStreak: 0,
  };

  constructor(config: QuizConfig) {
    this.config = config;
    this.shoe = new Shoe(6, 1.0, 0); // 6 decks, full penetration, no cards left out
  }

  /**
   * Generates a new random quiz hand
   */
  generateNewHand(): QuizHand {
    // Reshuffle if shoe is getting low
    if (this.shoe.cardsRemaining() < 20) {
      this.shoe = new Shoe(6, 1.0, 0);
    }

    // Deal 2 cards to player and 1 to dealer
    const playerCards: Card[] = [
      this.shoe.dealOne()!,
      this.shoe.dealOne()!,
    ];
    const dealerUpcard = this.shoe.dealOne()!;

    // Generate random true count between -10 and +10 if deviations enabled
    const trueCount = this.config.enableDeviations
      ? Math.floor(Math.random() * 21) - 10
      : 0;

    // Determine what actions are available
    const canSplit = isPair(playerCards);
    const canDouble = true; // First two cards, always can double initially
    const canSurrender = this.config.allowSurrender;

    this.currentHand = {
      playerCards,
      dealerUpcard,
      trueCount,
      canDouble,
      canSplit,
      canSurrender,
    };

    return this.currentHand;
  }

  /**
   * Checks if the player's answer is correct
   */
  checkAnswer(playerAction: Action): QuizAnswerResult {
    if (!this.currentHand) {
      throw new Error("No current hand to check");
    }

    const { playerCards, dealerUpcard, trueCount, canSplit, canSurrender } = this.currentHand;

    // Get the correct action from strategy
    let correctAction = suggestAction(
      playerCards,
      dealerUpcard.rank,
      trueCount,
      this.config.enableDeviations
    );

    // Adjust for unavailable actions
    if (correctAction === "SPLIT" && !canSplit) {
      // If can't split, fall back to hard total strategy
      correctAction = suggestAction(playerCards, dealerUpcard.rank, trueCount, false);
    }

    if (correctAction === "SURRENDER" && !canSurrender) {
      // If can't surrender, fall back to the next best action (usually HIT)
      correctAction = "HIT";
    }

    // Check if answer is correct
    const isCorrect = playerAction === correctAction;

    // Update stats
    if (isCorrect) {
      this.stats.correct++;
      this.stats.streak++;
      if (this.stats.streak > this.stats.bestStreak) {
        this.stats.bestStreak = this.stats.streak;
      }
    } else {
      this.stats.incorrect++;
      this.stats.streak = 0;
    }

    // Generate explanation
    const explanation = this.generateExplanation(
      playerCards,
      dealerUpcard,
      trueCount,
      correctAction
    );

    return {
      isCorrect,
      correctAction,
      explanation,
    };
  }

  /**
   * Generates an explanation for the correct action
   */
  private generateExplanation(
    playerCards: Card[],
    dealerUpcard: Card,
    trueCount: number,
    correctAction: Action
  ): string {
    const handValue = calculateHandValue(playerCards);
    const handType = handValue.isSoft ? "soft" : "hard";
    const isPairHand = isPair(playerCards);

    let explanation = "";

    if (isPairHand) {
      explanation = `With a pair of ${playerCards[0].rank}'s (${handValue.value}) vs dealer ${dealerUpcard.rank}, `;
    } else if (handValue.isSoft) {
      explanation = `With soft ${handValue.value} vs dealer ${dealerUpcard.rank}, `;
    } else {
      explanation = `With hard ${handValue.value} vs dealer ${dealerUpcard.rank}, `;
    }

    if (this.config.enableDeviations && trueCount !== 0) {
      explanation += `at true count ${trueCount >= 0 ? '+' : ''}${trueCount}, `;
    }

    explanation += `the correct play is to ${correctAction}.`;

    // Add deviation note if applicable
    if (this.config.enableDeviations) {
      explanation += ` This is based on ${trueCount !== 0 ? 'index deviation' : 'basic strategy'}.`;
    }

    return explanation;
  }

  /**
   * Gets the current hand
   */
  getCurrentHand(): QuizHand | null {
    return this.currentHand;
  }

  /**
   * Gets current statistics
   */
  getStats() {
    return { ...this.stats };
  }

  /**
   * Resets statistics
   */
  resetStats() {
    this.stats = {
      correct: 0,
      incorrect: 0,
      streak: 0,
      bestStreak: 0,
    };
  }

  /**
   * Gets the configuration
   */
  getConfig(): QuizConfig {
    return { ...this.config };
  }

  /**
   * Updates the configuration
   */
  updateConfig(newConfig: Partial<QuizConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

/**
 * Creates a new quiz session
 */
export function startQuiz(config: QuizConfig): QuizSession {
  return new QuizSession(config);
}
