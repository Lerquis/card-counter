import type {
  BlackjackConfig,
  Card,
  DealerState,
  GamePhase,
  Hand,
  PlayerState,
  IndexDeviation,
} from "./types";
import { Shoe } from "./shoe";
import { Counter } from "./counting";
import { calculateHandValue, suggestAction, getApplicableDeviation, shouldTakeInsurance } from "./strategy";

export class BlackjackGame {
  private config: BlackjackConfig;
  private shoe: Shoe;
  private counter: Counter;
  private phase: GamePhase;
  private players: PlayerState[];
  private dealer: DealerState;
  private currentPlayerIndex: number;

  constructor(config: BlackjackConfig, savedPlayerState?: { bankroll: number; buyIn: number }) {
    this.config = config;
    this.shoe = new Shoe(config.decks, config.penetrationPct);
    this.counter = new Counter();
    this.phase = "BETTING";
    this.players = [];
    this.dealer = { hand: [], hiddenCard: true };
    this.currentPlayerIndex = 0;

    // Initialize players (1 human + bots)
    const totalSeats = 1 + config.botSeats;
    for (let i = 0; i < totalSeats; i++) {
      // Use saved state for human player if available
      const isHuman = i === 0;
      const bankroll = isHuman && savedPlayerState ? savedPlayerState.bankroll : (isHuman ? 1000 : 0);
      const buyIn = isHuman && savedPlayerState ? savedPlayerState.buyIn : (isHuman ? 1000 : 0);

      this.players.push({
        hands: [{
          cards: [],
          bet: 0,
          status: "active",
          doubled: false,
          insuranceBet: 0,
        }],
        currentHandIndex: 0,
        bankroll,
        buyIn,
        isBot: i > 0,
        seatIndex: i,
      });
    }
  }

  /**
   * Gets the human player's state for saving
   */
  getPlayerStateForSave(): { bankroll: number; buyIn: number } | null {
    const humanPlayer = this.players[0];
    if (!humanPlayer || humanPlayer.isBot) return null;

    return {
      bankroll: humanPlayer.bankroll,
      buyIn: humanPlayer.buyIn,
    };
  }

  /**
   * Adds a new hand for a player (max 3 hands total)
   */
  addHand(playerIndex: number): boolean {
    if (this.phase !== "BETTING") return false;

    const player = this.players[playerIndex];
    if (!player) return false;

    // Check if player already has 3 hands
    if (player.hands.length >= 3) {
      return false;
    }

    // Add a new empty hand
    player.hands.push({
      cards: [],
      bet: 0,
      status: "active",
      doubled: false,
      insuranceBet: 0,
    });

    return true;
  }

  /**
   * Removes a hand from a player (must have at least 1 hand)
   */
  removeHand(playerIndex: number, handIndex: number): boolean {
    if (this.phase !== "BETTING") return false;

    const player = this.players[playerIndex];
    if (!player) return false;

    // Must have at least 1 hand
    if (player.hands.length <= 1) {
      return false;
    }

    // Check if hand exists
    if (handIndex >= player.hands.length) {
      return false;
    }

    const hand = player.hands[handIndex];

    // Refund bet if any (only for human player)
    if (!player.isBot && hand.bet > 0) {
      player.bankroll += hand.bet;
    }

    // Remove the hand
    player.hands.splice(handIndex, 1);

    return true;
  }

  /**
   * Places a bet for a player's hand
   */
  placeBet(playerIndex: number, handIndex: number, amount: number): boolean {
    if (this.phase !== "BETTING") return false;

    const player = this.players[playerIndex];
    if (!player) return false;

    // Get the hand
    const hand = player.hands[handIndex];
    if (!hand) return false;

    // If hand already has a bet, don't allow placing another
    if (hand.bet > 0) {
      return false;
    }

    // Validate bet amount
    if (amount < this.config.minBet || amount > this.config.maxBet) {
      return false;
    }

    // Check if player has enough bankroll (only for human player)
    if (!player.isBot && player.bankroll < amount) {
      return false;
    }

    // Place the bet
    hand.bet = amount;

    if (!player.isBot) {
      player.bankroll -= amount;
    }

    return true;
  }

  /**
   * Clears a bet for a player's hand and refunds the money
   */
  clearBet(playerIndex: number, handIndex: number): boolean {
    if (this.phase !== "BETTING") return false;

    const player = this.players[playerIndex];
    if (!player) return false;

    const hand = player.hands[handIndex];
    if (!hand || hand.bet === 0) return false;

    // Refund the bet (only for human player)
    if (!player.isBot) {
      player.bankroll += hand.bet;
    }

    // Clear the bet
    hand.bet = 0;

    return true;
  }

  /**
   * Deals initial cards to all players and dealer
   */
  deal(): void {
    if (this.phase !== "BETTING") return;

    // Reset dealer
    this.dealer = { hand: [], hiddenCard: true };

    // Deal two cards to each player hand
    for (const player of this.players) {
      for (const hand of player.hands) {
        const card1 = this.shoe.dealOne();
        const card2 = this.shoe.dealOne();
        if (card1 && card2) {
          hand.cards = [card1, card2];
          this.counter.seen(card1);
          this.counter.seen(card2);

          // Check for blackjack
          const value = calculateHandValue(hand.cards);
          if (value.value === 21) {
            hand.status = "blackjack";
          }
        }
      }
    }

    // Deal two cards to dealer (one hidden)
    const dealerCard1 = this.shoe.dealOne();
    const dealerCard2 = this.shoe.dealOne();
    if (dealerCard1 && dealerCard2) {
      this.dealer.hand = [dealerCard1, dealerCard2];
      this.counter.seen(dealerCard1); // Only count the visible card initially
    }

    // Check if dealer shows an Ace - offer insurance
    if (dealerCard1 && dealerCard1.rank === "A") {
      this.phase = "INSURANCE";
    } else {
      this.phase = "PLAYER";
      this.currentPlayerIndex = 0;
      // Auto-advance if current player can't act (e.g., has blackjack)
      this.nextTurn();
    }
  }

  /**
   * Places insurance bet for a player's hand
   */
  placeInsurance(playerIndex: number, handIndex: number): boolean {
    if (this.phase !== "INSURANCE") return false;

    const player = this.players[playerIndex];
    const hand = player?.hands[handIndex];
    if (!hand) return false;

    // Insurance costs half of the original bet
    const insuranceCost = hand.bet / 2;

    // Check if player has enough bankroll (only for human player)
    if (!player.isBot && player.bankroll < insuranceCost) {
      return false;
    }

    // Place insurance bet
    hand.insuranceBet = insuranceCost;

    if (!player.isBot) {
      player.bankroll -= insuranceCost;
    }

    return true;
  }

  /**
   * Proceeds to player phase after insurance (or skips insurance)
   */
  proceedAfterInsurance(): void {
    if (this.phase !== "INSURANCE") return;

    // Check if dealer has blackjack
    if (this.dealer.hand.length === 2) {
      const dealerValue = calculateHandValue(this.dealer.hand);
      if (dealerValue.value === 21) {
        // Dealer has blackjack - reveal card, pay insurance, settle
        this.dealer.hiddenCard = false;
        this.counter.seen(this.dealer.hand[1]);
        this.settleInsurance(true);

        // Change phase to DEALER temporarily so settle() works correctly
        this.phase = "DEALER";
        this.settle();
        return;
      }
    }

    // Dealer doesn't have blackjack - collect insurance bets
    this.settleInsurance(false);

    // Proceed to player phase
    this.phase = "PLAYER";
    this.currentPlayerIndex = 0;
    this.nextTurn();
  }

  /**
   * Settles insurance bets
   */
  private settleInsurance(dealerHasBlackjack: boolean): void {
    for (const player of this.players) {
      for (const hand of player.hands) {
        if (hand.insuranceBet > 0) {
          if (dealerHasBlackjack) {
            // Insurance pays 2:1 - return bet plus 2x winnings
            const payout = hand.insuranceBet * 3; // Original bet + 2:1 payout
            if (!player.isBot) {
              player.bankroll += payout;
            }
          }
          // If dealer doesn't have blackjack, insurance is lost (already deducted)
        }
      }
    }
  }

  /**
   * Player hits (takes another card)
   */
  hit(playerIndex: number, handIndex: number): boolean {
    if (this.phase !== "PLAYER") return false;

    const player = this.players[playerIndex];
    const hand = player?.hands[handIndex];
    if (!hand || hand.status !== "active") return false;

    const card = this.shoe.dealOne();
    if (!card) return false;

    hand.cards.push(card);
    this.counter.seen(card);

    // Check for bust
    const value = calculateHandValue(hand.cards);
    if (value.value > 21) {
      hand.status = "bust";
    }

    return true;
  }

  /**
   * Player stands (ends their turn)
   */
  stand(playerIndex: number, handIndex: number): boolean {
    if (this.phase !== "PLAYER") return false;

    const player = this.players[playerIndex];
    const hand = player?.hands[handIndex];
    if (!hand || hand.status !== "active") return false;

    hand.status = "stand";
    return true;
  }

  /**
   * Player doubles down
   */
  double(playerIndex: number, handIndex: number): boolean {
    if (this.phase !== "PLAYER") return false;

    const player = this.players[playerIndex];
    const hand = player?.hands[handIndex];
    if (!hand || hand.status !== "active" || hand.cards.length !== 2) return false;

    // Check if player has enough bankroll (only for human player)
    if (!player.isBot && player.bankroll < hand.bet) {
      return false;
    }

    // Double the bet
    if (!player.isBot) {
      player.bankroll -= hand.bet;
    }
    hand.bet *= 2;
    hand.doubled = true;

    // Deal one more card
    const card = this.shoe.dealOne();
    if (!card) return false;

    hand.cards.push(card);
    this.counter.seen(card);

    // Check for bust
    const value = calculateHandValue(hand.cards);
    if (value.value > 21) {
      hand.status = "bust";
    } else {
      hand.status = "stand";
    }

    return true;
  }

  /**
   * Player splits a pair
   */
  split(playerIndex: number, handIndex: number): boolean {
    if (this.phase !== "PLAYER") return false;

    const player = this.players[playerIndex];
    const hand = player?.hands[handIndex];
    if (!hand || hand.status !== "active" || hand.cards.length !== 2) return false;

    // Check if cards are a pair
    const value1 = ["J", "Q", "K"].includes(hand.cards[0].rank) ? "10" : hand.cards[0].rank;
    const value2 = ["J", "Q", "K"].includes(hand.cards[1].rank) ? "10" : hand.cards[1].rank;
    if (value1 !== value2) return false;

    // Check if player has enough bankroll (only for human player)
    if (!player.isBot && player.bankroll < hand.bet) {
      return false;
    }

    // Create new hand with second card
    const newHand: Hand = {
      cards: [hand.cards[1]],
      bet: hand.bet,
      status: "active",
      doubled: false,
      insuranceBet: 0,
    };

    // Update original hand with first card
    hand.cards = [hand.cards[0]];

    // Add new hand
    player.hands.splice(handIndex + 1, 0, newHand);

    // Deduct bet from bankroll (only for human player)
    if (!player.isBot) {
      player.bankroll -= hand.bet;
    }

    // Deal one card to each split hand
    const card1 = this.shoe.dealOne();
    const card2 = this.shoe.dealOne();
    if (card1 && card2) {
      hand.cards.push(card1);
      newHand.cards.push(card2);
      this.counter.seen(card1);
      this.counter.seen(card2);
    }

    return true;
  }

  /**
   * Player surrenders
   */
  surrender(playerIndex: number, handIndex: number): boolean {
    if (this.phase !== "PLAYER") return false;

    const player = this.players[playerIndex];
    const hand = player?.hands[handIndex];
    if (!hand || hand.status !== "active" || hand.cards.length !== 2) return false;

    hand.status = "surrender";

    // Return half the bet (only for human player)
    if (!player.isBot) {
      player.bankroll += hand.bet / 2;
    }

    return true;
  }

  /**
   * Dealer plays their hand
   */
  dealerPlay(): void {
    if (this.phase !== "DEALER") return;

    // Reveal hidden card and count it
    if (this.dealer.hiddenCard && this.dealer.hand.length > 1) {
      this.counter.seen(this.dealer.hand[1]);
      this.dealer.hiddenCard = false;
    }

    // Dealer hits until 17 or higher
    let dealerValue = calculateHandValue(this.dealer.hand);
    const hitOn17 = this.config.dealerHitsSoft17 && dealerValue.isSoft;

    while (dealerValue.value < 17 || (dealerValue.value === 17 && hitOn17)) {
      const card = this.shoe.dealOne();
      if (!card) break;

      this.dealer.hand.push(card);
      this.counter.seen(card);
      dealerValue = calculateHandValue(this.dealer.hand);
    }
  }

  /**
   * Settles all bets and updates bankrolls
   */
  settle(): void {
    if (this.phase !== "DEALER" && this.phase !== "SETTLE") return;

    const dealerValue = calculateHandValue(this.dealer.hand);

    for (const player of this.players) {
      for (const hand of player.hands) {
        if (hand.status === "surrender") {
          // Already handled in surrender method
          continue;
        }

        const handValue = calculateHandValue(hand.cards);

        let winAmount = 0;

        if (hand.status === "bust") {
          // Player busts, loses bet (already deducted)
          winAmount = 0;
        } else if (hand.status === "blackjack") {
          if (dealerValue.value === 21 && this.dealer.hand.length === 2) {
            // Push
            winAmount = hand.bet;
          } else {
            // Blackjack pays 3:2 (or configured payout)
            winAmount = hand.bet + hand.bet * this.config.blackjackPayout;
          }
        } else if (dealerValue.value > 21) {
          // Dealer busts, player wins
          winAmount = hand.bet * 2;
        } else if (handValue.value > dealerValue.value) {
          // Player wins
          winAmount = hand.bet * 2;
        } else if (handValue.value === dealerValue.value) {
          // Push
          winAmount = hand.bet;
        } else {
          // Dealer wins (player already lost bet)
          winAmount = 0;
        }

        if (!player.isBot) {
          player.bankroll += winAmount;
        }
      }
    }

    // Check if shuffle is needed after settling
    if (this.shouldReshuffle()) {
      this.phase = "SHUFFLING";
    } else {
      this.phase = "SETTLE";
    }
  }

  /**
   * Advances to next player/phase
   */
  nextTurn(): void {
    if (this.phase !== "PLAYER") return;

    // Loop until we find an active hand or everyone is done
    while (true) {
      const currentPlayer = this.players[this.currentPlayerIndex];
      if (!currentPlayer) break;

      // Check if current hand is active
      const currentHand = currentPlayer.hands[currentPlayer.currentHandIndex];
      if (currentHand && currentHand.status === "active") {
        // Found an active hand, stop here
        return;
      }

      // Current hand is not active (blackjack, bust, stand, surrender)
      // Move to next hand
      currentPlayer.currentHandIndex++;
      if (currentPlayer.currentHandIndex < currentPlayer.hands.length) {
        // Continue loop to check if next hand is active
        continue;
      }

      // No more hands for this player, move to next player
      this.currentPlayerIndex++;
      if (this.currentPlayerIndex < this.players.length) {
        this.players[this.currentPlayerIndex].currentHandIndex = 0;
        // Continue loop to check if next player's first hand is active
        continue;
      }

      // All players done, move to dealer
      this.phase = "DEALER";
      break;
    }
  }

  /**
   * Checks if reshuffle is needed
   */
  shouldReshuffle(): boolean {
    return this.shoe.reachedPenetration();
  }

  /**
   * Reshuffles the shoe
   */
  reshuffle(): void {
    this.shoe.reshuffle(this.config.decks);
    this.counter.reset();
  }

  /**
   * Resets for a new round
   */
  newRound(): void {
    this.phase = "BETTING";
    this.currentPlayerIndex = 0;
    this.dealer = { hand: [], hiddenCard: true };

    for (const player of this.players) {
      // Initialize with one empty hand for each player
      player.hands = [{
        cards: [],
        bet: 0,
        status: "active",
        doubled: false,
        insuranceBet: 0,
      }];
      player.currentHandIndex = 0;
    }
  }

  /**
   * Performs shuffle (called by UI after showing animation)
   */
  performShuffle(): void {
    if (this.phase === "SHUFFLING") {
      this.reshuffle();
      this.phase = "SETTLE";
    }
  }

  /**
   * Adds chips (rebuy) for a player
   * Maximum $1000 per rebuy
   */
  addChips(playerIndex: number, amount: number): boolean {
    const player = this.players[playerIndex];
    if (!player || player.isBot) return false;

    // Validate amount (max $1000 per rebuy)
    if (amount <= 0 || amount > 1000) {
      return false;
    }

    // Add to bankroll and buy-in
    player.bankroll += amount;
    player.buyIn += amount;

    return true;
  }

  /**
   * Updates the game configuration
   */
  updateConfig(configUpdate: Partial<BlackjackConfig>): void {
    this.config = { ...this.config, ...configUpdate };
  }

  /**
   * Calculates playable cards remaining (excluding penetration)
   */
  private getPlayableCardsRemaining(): number {
    const totalCards = this.shoe.getTotalCards();
    const penetrationPct = this.config.penetrationPct;
    const cardsRemaining = this.shoe.cardsRemaining();

    // Playable cards = cards remaining - cards in penetration
    // Cards in penetration = totalCards * (1 - penetrationPct)
    const playableCards = cardsRemaining - (totalCards * (1 - penetrationPct));

    // Ensure we don't return negative values
    return Math.max(0, playableCards);
  }

  /**
   * Gets the current game state
   */
  getState() {
    return {
      phase: this.phase,
      players: this.players,
      dealer: this.dealer,
      currentPlayerIndex: this.currentPlayerIndex,
      snapshot: this.counter.snapshot(this.shoe.cardsRemaining(), this.getPlayableCardsRemaining()),
      penetration: this.shoe.getPenetrationPct(),
      totalCards: this.shoe.getTotalCards(),
      needsShuffle: this.shouldReshuffle(),
    };
  }

  /**
   * Gets suggested action for current player
   */
  getSuggestedAction(playerIndex: number, handIndex: number): string {
    const player = this.players[playerIndex];
    const hand = player?.hands[handIndex];
    if (!hand || this.dealer.hand.length === 0) return "STAND";

    const dealerUpcard = this.dealer.hand[0].rank;
    const snapshot = this.counter.snapshot(this.shoe.cardsRemaining(), this.getPlayableCardsRemaining());

    return suggestAction(
      hand.cards,
      dealerUpcard,
      snapshot.trueCount,
      this.config.enableIndexDeviations
    );
  }

  /**
   * Gets the applicable deviation for current situation (if any)
   */
  getApplicableDeviation(playerIndex: number, handIndex: number): IndexDeviation | null {
    const player = this.players[playerIndex];
    const hand = player?.hands[handIndex];
    if (!hand || this.dealer.hand.length === 0) return null;

    const dealerUpcard = this.dealer.hand[0].rank;
    const snapshot = this.counter.snapshot(this.shoe.cardsRemaining(), this.getPlayableCardsRemaining());

    return getApplicableDeviation(hand.cards, dealerUpcard, snapshot.trueCount);
  }

  /**
   * Gets the configuration
   */
  getConfig(): BlackjackConfig {
    return { ...this.config };
  }

  /**
   * Gets insurance suggestion for current situation
   */
  shouldTakeInsurance(): boolean {
    const snapshot = this.counter.snapshot(this.shoe.cardsRemaining(), this.getPlayableCardsRemaining());
    return shouldTakeInsurance(snapshot.trueCount, this.config.enableIndexDeviations);
  }
}
