"use client";

import { useState, useEffect } from "react";
import { CardImage } from "./CardImage";
import type { DealerState, PlayerState, CountSnapshot } from "@/core/types";
import { motion } from "framer-motion";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { calculateHandValue } from "@/core/strategy";
import { Eye, EyeOff, Lightbulb, X, Plus, Shield, Coins } from "lucide-react";
import { useGame } from "@/store/useGame";

interface TableBJProps {
  players: PlayerState[];
  dealer: DealerState;
  currentPlayerIndex: number;
  phase: string;
  snapshot: CountSnapshot;
}

const CHIP_VALUES = [10, 50, 100, 500, 1000];

export function TableBJ({ players, dealer, currentPlayerIndex, phase, snapshot }: TableBJProps) {
  const { blackjack, resetBlackjackProgress, addHand, removeHand, placeBet, clearBet, addChips, dealRound, placeInsurance, skipInsurance, playerHit, playerStand, playerDouble, playerSplit, playerSurrender, newRound, dealerPlay, settleRound, performShuffle, settings } = useGame();
  const [currentBet, setCurrentBet] = useState(10);
  const [selectedHandIndex, setSelectedHandIndex] = useState(0);
  const [showTrueCount, setShowTrueCount] = useState(true);
  const [dealerCardsToShow, setDealerCardsToShow] = useState(dealer.hand.length);
  const [dealerPlayExecuted, setDealerPlayExecuted] = useState(false);
  const [showShuffling, setShowShuffling] = useState(false);
  const [showRebuyDialog, setShowRebuyDialog] = useState(false);
  const [rebuyAmount, setRebuyAmount] = useState(500);

  const humanPlayer = players[0];
  const canPlaceBet = phase === "BETTING";
  const allHandsHaveBets = humanPlayer?.hands.length > 0 && humanPlayer.hands.every(h => h.bet > 0);
  const canAddHand = humanPlayer?.hands.length < 3;
  const isInsurancePhase = phase === "INSURANCE";
  const insuranceSuggestion = isInsurancePhase && blackjack.game ? blackjack.game.shouldTakeInsurance() : false;

  const isPlayerTurn = phase === "PLAYER" && currentPlayerIndex === 0;
  const currentHand = humanPlayer?.hands[humanPlayer.currentHandIndex];
  const canAct = isPlayerTurn && currentHand?.status === "active";

  const canDouble = canAct && currentHand.cards.length === 2 && humanPlayer.bankroll >= currentHand.bet;
  const canSplit = canAct && currentHand.cards.length === 2 &&
    currentHand.cards[0].rank === currentHand.cards[1].rank &&
    humanPlayer.bankroll >= currentHand.bet;
  const canSurrender = canAct && currentHand.cards.length === 2;

  // Get hints
  const suggestedAction = canAct && blackjack.game ? blackjack.game.getSuggestedAction(0, humanPlayer.currentHandIndex) : null;
  const appliedDeviation = canAct && blackjack.game && settings.enableIndexDeviations ? blackjack.game.getApplicableDeviation(0, humanPlayer.currentHandIndex) : null;

  const handleChipClick = (value: number) => {
    setCurrentBet((prev) => Math.min(prev + value, blackjack.config.maxBet));
  };

  const handlePlaceBet = () => {
    if (currentBet >= blackjack.config.minBet && currentBet <= blackjack.config.maxBet) {
      placeBet(0, selectedHandIndex, currentBet);
    }
  };

  const handleDeal = () => {
    dealRound();
  };

  const handleAddHand = () => {
    addHand(0);
  };

  const handleTakeInsurance = () => {
    // Take insurance on all hands
    if (humanPlayer) {
      humanPlayer.hands.forEach((_, idx) => {
        placeInsurance(0, idx);
      });
    }
    skipInsurance();
  };

  const handleDeclineInsurance = () => {
    skipInsurance();
  };

  const handleRebuy = () => {
    if (rebuyAmount > 0 && rebuyAmount <= 1000) {
      addChips(0, rebuyAmount);
      setShowRebuyDialog(false);
      setRebuyAmount(500); // Reset to default
    }
  };

  // Reset selected hand when phase changes to BETTING
  useEffect(() => {
    if (phase === "BETTING") {
      setSelectedHandIndex(0);
    }
  }, [phase]);

  // Animate dealer cards when dealer is playing
  useEffect(() => {
    if (phase === "DEALER") {
      if (!dealerPlayExecuted) {
        // First, let the dealer play to get all cards
        setDealerPlayExecuted(true);
        dealerPlay();
        // Wait for state to update before animating
        setTimeout(() => {
          setDealerCardsToShow(2); // Start with initial 2 cards visible
        }, 50);
      }
    } else {
      // Reset when not in DEALER phase
      setDealerCardsToShow(dealer.hand.length);
      setDealerPlayExecuted(false);
    }
  }, [phase, dealerPlayExecuted, dealerPlay]);

  // Animate dealer cards appearing one by one
  useEffect(() => {
    if (phase === "DEALER" && dealerPlayExecuted && dealerCardsToShow < dealer.hand.length) {
      const timer = setTimeout(() => {
        setDealerCardsToShow(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    } else if (phase === "DEALER" && dealerPlayExecuted && dealerCardsToShow >= dealer.hand.length && dealer.hand.length > 0) {
      // All cards shown, settle after a brief delay
      const timer = setTimeout(() => {
        settleRound();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase, dealer.hand.length, dealerCardsToShow, dealerPlayExecuted, settleRound]);

  // Handle shuffling animation
  useEffect(() => {
    if (phase === "SHUFFLING") {
      setShowShuffling(true);
      const timer = setTimeout(() => {
        performShuffle();
        setShowShuffling(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase, performShuffle]);

  return (
    <div className="relative min-h-[700px] rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-green-900 via-green-800 to-green-900 border border-green-700/50 shadow-2xl">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[url(/blackjack_layout.png)] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-transparent to-green-950/50" />

      {/* Felt texture effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-transparent to-green-900/10" />

      {/* Game Info Bar - Top Right */}
      <div className="absolute top-4 right-4 z-20 flex gap-2 items-center text-xs">
        <div className="bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-700/50">
          <span className="text-slate-400 font-medium">Phase: </span>
          <Badge className={`text-xs ${
            phase === "BETTING" ? "bg-blue-600" :
            phase === "INSURANCE" ? "bg-cyan-600" :
            phase === "PLAYER" ? "bg-green-600" :
            phase === "DEALER" ? "bg-yellow-600" :
            "bg-purple-600"
          }`}>{phase}</Badge>
        </div>
        <div className="bg-gradient-to-r from-green-900/90 to-emerald-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-green-700/50">
          <div className="flex flex-col">
            <span className="text-green-300 font-medium text-xs">💰 ${humanPlayer?.bankroll ?? 0}</span>
            <span className="text-green-400/70 text-[10px]">Buy-in: ${humanPlayer?.buyIn ?? 0}</span>
          </div>
        </div>
        <button
          onClick={() => setShowRebuyDialog(true)}
          className="bg-gradient-to-r from-yellow-900/90 to-orange-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-yellow-700/50 hover:from-yellow-800 hover:to-orange-800 transition-colors"
          title="Add chips"
        >
          <Coins className="w-4 h-4 text-yellow-300" />
        </button>
        <div className="bg-gradient-to-r from-cyan-900/90 to-blue-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-cyan-700/50 flex items-center gap-2">
          <button
            onClick={() => setShowTrueCount(!showTrueCount)}
            className="text-cyan-300 hover:text-cyan-200 transition-colors"
          >
            {showTrueCount ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
          {showTrueCount && (
            <>
              <span className="text-cyan-300 font-medium text-xs">TC:</span>
              <Badge
                className={`text-xs ${
                  snapshot.trueCount >= 2
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                    : "bg-slate-700 text-slate-200"
                }`}
              >
                {snapshot.trueCount > 0 ? "+" : ""}
                {snapshot.trueCount}
              </Badge>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-8">
        {/* Dealer Area */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm px-6 py-2 rounded-full border border-slate-600/50 shadow-xl">
            <span className="text-yellow-300 font-bold text-xl">DEALER</span>
          </div>
          <div className="flex gap-3 p-4 bg-slate-900/40 rounded-xl backdrop-blur-sm">
            {dealer.hand.slice(0, dealerCardsToShow).map((card, idx) => (
              <motion.div
                key={`dealer-${idx}`}
                initial={{ y: -100, opacity: 0, rotate: -10 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ delay: idx * 0.2, type: "spring" }}
              >
                <CardImage
                  card={card}
                  size="md"
                  hidden={idx === 1 && dealer.hiddenCard}
                  className="shadow-2xl hover:scale-105 transition-transform"
                />
              </motion.div>
            ))}
          </div>
          {!dealer.hiddenCard && dealer.hand.length > 0 && (
            <Badge className="text-2xl font-bold px-5 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg shadow-yellow-500/30">
              {calculateHandValue(dealer.hand).value}
            </Badge>
          )}
        </div>

        {/* Players Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {players.map((player, playerIdx) => (
            <div
              key={`player-${playerIdx}`}
              className={`space-y-4 p-5 rounded-xl border-2 transition-all duration-300 ${
                playerIdx === currentPlayerIndex
                  ? "border-yellow-500 bg-gradient-to-br from-yellow-900/40 to-orange-900/40 shadow-xl shadow-yellow-500/20 scale-105"
                  : "border-slate-700/50 bg-slate-900/60 backdrop-blur-sm"
              }`}
            >
              {/* Player Label */}
              <div className="text-center">
                <div className={`font-bold text-lg ${
                  player.isBot ? "text-slate-300" : "text-yellow-300"
                }`}>
                  {player.isBot ? `Bot ${playerIdx}` : "🎮 YOU"}
                </div>
                {!player.isBot && (
                  <div className="text-green-400 text-sm font-semibold mt-1">
                    💰 ${player.bankroll}
                  </div>
                )}
              </div>

              {/* Player Hands */}
              <div className="space-y-3">
                {player.hands.map((hand, handIdx) => {
                  const handValue = calculateHandValue(hand.cards);
                  const isActive =
                    playerIdx === currentPlayerIndex &&
                    player.currentHandIndex === handIdx;

                  return (
                    <div
                      key={`hand-${handIdx}`}
                      className={`space-y-3 p-3 rounded-lg transition-all duration-200 relative ${
                        isActive
                          ? "bg-gradient-to-br from-yellow-600/30 to-orange-600/30 ring-2 ring-yellow-500 shadow-lg"
                          : "bg-slate-800/50"
                      }`}
                    >
                      {/* Close Hand Button - Only in BETTING phase for human player */}
                      {canPlaceBet && !player.isBot && player.hands.length > 1 && (
                        <button
                          onClick={() => removeHand(playerIdx, handIdx)}
                          className="absolute -top-2 -right-2 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow-lg transition-colors"
                          title="Remove hand"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}

                      {/* Cards */}
                      <div className="flex gap-2 justify-center flex-wrap">
                        {hand.cards.length === 0 && canPlaceBet ? (
                          <div className="text-slate-400 text-sm italic py-4">
                            Hand {handIdx + 1}
                          </div>
                        ) : (
                          hand.cards.map((card, cardIdx) => (
                            <motion.div
                              key={`hand-${handIdx}-card-${cardIdx}`}
                              initial={{ scale: 0, rotate: -180, y: -20 }}
                              animate={{ scale: 1, rotate: 0, y: 0 }}
                              transition={{ delay: cardIdx * 0.15, type: "spring" }}
                            >
                              <CardImage card={card} size="sm" className="shadow-lg hover:scale-110 transition-transform" />
                            </motion.div>
                          ))
                        )}
                      </div>

                      {/* Hand Info */}
                      {hand.cards.length > 0 && (
                        <div className="flex justify-between items-center">
                          <Badge
                            className={`text-sm font-bold px-3 py-1 ${
                              hand.status === "bust"
                                ? "bg-red-600 text-white"
                                : hand.status === "blackjack"
                                ? "bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg"
                                : "bg-slate-700 text-slate-200"
                            }`}
                          >
                            {handValue.isSoft && handValue.value <= 21
                              ? `${handValue.value} / ${handValue.value - 10}`
                              : handValue.value}
                          </Badge>
                          <span className="text-green-400 text-sm font-semibold">💵 ${hand.bet}</span>
                        </div>
                      )}

                      {/* Bet amount in BETTING phase */}
                      {canPlaceBet && hand.bet === 0 && (
                        <div className="text-center text-slate-400 text-xs">
                          No bet placed
                        </div>
                      )}

                      {/* Status */}
                      {hand.status !== "active" && hand.cards.length > 0 && (
                        <div className="text-center">
                          <Badge
                            className={`text-xs font-bold ${
                              hand.status === "blackjack"
                                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white animate-pulse"
                                : hand.status === "bust"
                                ? "bg-red-600 text-white"
                                : "bg-slate-600 text-slate-200"
                            }`}
                          >
                            {hand.status.toUpperCase()}
                          </Badge>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Betting Panel - Integrated */}
        {canPlaceBet && (
          <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-xl max-w-2xl mx-auto">
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <div className="w-1 h-5 bg-green-500 rounded-full" />
                Place Your Bets
              </h4>

              {/* Hand Selector */}
              {humanPlayer && humanPlayer.hands.length > 0 && (
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                  <div className="text-sm text-slate-400 mb-2">Select Hand to Bet:</div>
                  <div className="grid grid-cols-3 gap-2">
                    {humanPlayer.hands.map((hand, idx) => (
                      <div key={idx} className="relative">
                        <button
                          onClick={() => setSelectedHandIndex(idx)}
                          className={`w-full p-3 rounded-lg border-2 transition-all ${
                            selectedHandIndex === idx
                              ? "border-green-500 bg-green-900/40 shadow-lg"
                              : "border-slate-600 bg-slate-800/50 hover:border-slate-500"
                          }`}
                        >
                          <div className="text-xs font-semibold text-white">Hand {idx + 1}</div>
                          <div className={`text-sm font-bold mt-1 ${
                            hand.bet > 0 ? "text-green-400" : "text-slate-500"
                          }`}>
                            ${hand.bet || 0}
                          </div>
                        </button>
                        {/* Clear Bet Button */}
                        {hand.bet > 0 && (
                          <button
                            onClick={() => clearBet(0, idx)}
                            className="absolute -top-1 -right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow-lg transition-colors z-10"
                            title="Clear bet"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Current Bet Input */}
              <div className="space-y-3 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={currentBet}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setCurrentBet(
                        Math.min(Math.max(value, blackjack.config.minBet), blackjack.config.maxBet)
                      );
                    }}
                    min={blackjack.config.minBet}
                    max={blackjack.config.maxBet}
                    className="text-xl font-bold bg-slate-700 border-slate-600 text-white"
                    disabled={humanPlayer?.hands[selectedHandIndex]?.bet > 0}
                  />
                  <Button
                    onClick={handlePlaceBet}
                    disabled={humanPlayer?.hands[selectedHandIndex]?.bet > 0}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold px-6 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Place
                  </Button>
                </div>
                <div className="flex gap-2 text-xs text-slate-400">
                  <span>Min: ${blackjack.config.minBet}</span>
                  <span>•</span>
                  <span>Max: ${blackjack.config.maxBet}</span>
                  {humanPlayer?.hands[selectedHandIndex]?.bet > 0 && (
                    <>
                      <span>•</span>
                      <span className="text-green-400 font-semibold">Bet placed on Hand {selectedHandIndex + 1}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Chip Buttons */}
              <div className="grid grid-cols-5 gap-2">
                {CHIP_VALUES.map((value) => (
                  <Button
                    key={value}
                    variant="outline"
                    onClick={() => handleChipClick(value)}
                    disabled={humanPlayer?.hands[selectedHandIndex]?.bet > 0}
                    className={`h-12 bg-gradient-to-br ${
                      value === 10 ? "from-red-700 to-red-600" :
                      value === 50 ? "from-blue-700 to-blue-600" :
                      value === 100 ? "from-purple-700 to-purple-600" :
                      value === 500 ? "from-yellow-700 to-yellow-600" :
                      "from-pink-700 to-pink-600"
                    } hover:scale-105 transition-transform border-0 text-white shadow-lg font-bold disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-xs">+</span>
                      <span className="text-sm">${value}</span>
                    </div>
                  </Button>
                ))}
              </div>

              {/* Add Hand & Deal Buttons */}
              <div className="grid grid-cols-2 gap-3">
                {/* Add Hand Button */}
                <Button
                  onClick={handleAddHand}
                  disabled={!canAddHand}
                  className="h-12 text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Hand ({humanPlayer?.hands.length || 0}/3)
                </Button>

                {/* Deal Button */}
                <Button
                  className="h-12 text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/30 disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={handleDeal}
                  disabled={!allHandsHaveBets}
                >
                  🎲 Deal Cards
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Insurance Panel */}
        {isInsurancePhase && humanPlayer && (
          <div className="bg-gradient-to-br from-cyan-900/95 to-blue-900/95 backdrop-blur-sm rounded-xl p-6 border-2 border-cyan-500/50 shadow-2xl max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-cyan-400" />
                <div>
                  <h4 className="text-xl font-bold text-cyan-200">Insurance Offered</h4>
                  <p className="text-sm text-cyan-300/70">Dealer shows Ace</p>
                </div>
              </div>

              {/* Insurance Info */}
              <div className="bg-slate-900/60 rounded-lg p-4 border border-cyan-600/30">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-cyan-300/70 mb-1">Insurance Cost</div>
                    <div className="text-lg font-bold text-white">
                      ${humanPlayer.hands.reduce((sum, h) => sum + (h.bet / 2), 0)}
                    </div>
                    <div className="text-xs text-cyan-300/70 mt-1">
                      (Half of total bets)
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-cyan-300/70 mb-1">Payout if Dealer has BJ</div>
                    <div className="text-lg font-bold text-green-400">
                      ${humanPlayer.hands.reduce((sum, h) => sum + (h.bet / 2) * 2, 0)}
                    </div>
                    <div className="text-xs text-cyan-300/70 mt-1">
                      (2:1 payout)
                    </div>
                  </div>
                </div>
              </div>

              {/* Strategy Hint */}
              {settings.enableBasicStrategyHints && (
                <div className={`rounded-lg p-4 border-2 ${
                  insuranceSuggestion
                    ? "bg-green-900/40 border-green-600/50"
                    : "bg-red-900/40 border-red-600/50"
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm font-semibold text-white">Strategy Recommendation</span>
                  </div>
                  <div className="text-sm text-white/90">
                    {settings.enableIndexDeviations ? (
                      insuranceSuggestion ? (
                        <>
                          <span className="font-bold text-green-400">TAKE INSURANCE</span> - True Count is +3 or higher
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-cyan-600 text-white text-xs">
                              TC: {snapshot.trueCount}
                            </Badge>
                            <span className="text-xs text-cyan-300">Profitable at TC ≥ +3</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="font-bold text-red-400">DECLINE INSURANCE</span> - True Count is below +3
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-slate-600 text-white text-xs">
                              TC: {snapshot.trueCount}
                            </Badge>
                            <span className="text-xs text-slate-300">Not profitable below TC +3</span>
                          </div>
                        </>
                      )
                    ) : (
                      <>
                        <span className="font-bold text-red-400">DECLINE INSURANCE</span> - Basic Strategy
                        <p className="text-xs text-slate-300 mt-1">
                          Insurance is generally a bad bet without card counting
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="lg"
                  onClick={handleTakeInsurance}
                  className={`h-14 text-lg font-bold shadow-lg ${
                    insuranceSuggestion
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-green-500/30"
                      : "bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500"
                  }`}
                >
                  <Shield className="w-5 h-5 mr-2" />
                  TAKE INSURANCE
                </Button>

                <Button
                  size="lg"
                  onClick={handleDeclineInsurance}
                  className={`h-14 text-lg font-bold shadow-lg ${
                    !insuranceSuggestion
                      ? "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 shadow-red-500/30"
                      : "bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500"
                  }`}
                >
                  ✋ DECLINE
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons - Player Turn */}
        {canAct && (
          <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-xl max-w-2xl mx-auto">
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <div className="w-1 h-5 bg-yellow-500 rounded-full" />
                Your Turn
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="lg"
                  onClick={() => playerHit(0, humanPlayer.currentHandIndex)}
                  className="h-14 text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg shadow-green-500/20"
                >
                  ✋ HIT
                </Button>

                <Button
                  size="lg"
                  onClick={() => playerStand(0, humanPlayer.currentHandIndex)}
                  className="h-14 text-lg font-bold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-lg shadow-red-500/20"
                >
                  🛑 STAND
                </Button>

                <Button
                  size="lg"
                  onClick={() => playerDouble(0, humanPlayer.currentHandIndex)}
                  disabled={!canDouble}
                  className="h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  2x DOUBLE
                </Button>

                <Button
                  size="lg"
                  onClick={() => playerSplit(0, humanPlayer.currentHandIndex)}
                  disabled={!canSplit}
                  className="h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ✂️ SPLIT
                </Button>

                <Button
                  size="lg"
                  onClick={() => playerSurrender(0, humanPlayer.currentHandIndex)}
                  disabled={!canSurrender}
                  className="h-14 text-lg font-bold col-span-2 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  🏳️ SURRENDER
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Strategy Hints - integrated when player can act */}
        {canAct && settings.enableBasicStrategyHints && suggestedAction && (
          <div className="bg-gradient-to-br from-yellow-900/95 to-orange-900/95 backdrop-blur-sm rounded-xl p-6 border-2 border-yellow-500/50 shadow-2xl max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-400" />
                <h4 className="text-lg font-bold text-yellow-200">Strategy Hint</h4>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Recommended Action */}
                <div className="bg-gradient-to-br from-yellow-800/40 to-orange-800/40 rounded-lg p-4 border border-yellow-600/50">
                  <div className="text-xs text-yellow-200 font-semibold mb-2">Recommended</div>
                  <Badge className="text-xl font-bold px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg">
                    {suggestedAction}
                  </Badge>
                </div>

                {/* Deviation Info or Basic Strategy */}
                <div className="bg-slate-900/60 rounded-lg p-4 border border-yellow-600/30">
                  {appliedDeviation ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        <span className="text-xs text-cyan-300 font-semibold">INDEX DEVIATION</span>
                      </div>
                      <p className="text-xs text-yellow-100 leading-relaxed">
                        {appliedDeviation.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-cyan-600 text-white text-xs px-2 py-0.5">
                          TC: {snapshot.trueCount}
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-slate-500 rounded-full" />
                        <span className="text-xs text-slate-400 font-semibold">BASIC STRATEGY</span>
                      </div>
                      {settings.enableIndexDeviations && (
                        <p className="text-xs text-slate-400">
                          No deviation applies at TC {snapshot.trueCount}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Hand info */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-slate-900/60 p-2 rounded border border-yellow-600/20">
                  <span className="text-yellow-300/70 text-xs">Dealer shows:</span>
                  <span className="ml-2 font-bold text-white">{dealer.hand[0]?.rank}</span>
                </div>
                <div className="bg-slate-900/60 p-2 rounded border border-yellow-600/20">
                  <span className="text-yellow-300/70 text-xs">Your cards:</span>
                  <span className="ml-2 font-bold text-white">
                    {currentHand.cards.map((c) => c.rank).join(" + ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shuffling Animation */}
        {showShuffling && (
          <div className="bg-gradient-to-br from-yellow-900/95 to-orange-900/95 backdrop-blur-sm rounded-xl p-8 border-2 border-yellow-500/50 shadow-2xl max-w-md mx-auto animate-pulse">
            <div className="flex flex-col items-center gap-4">
              <div className="text-6xl">🔀</div>
              <h3 className="text-2xl font-bold text-yellow-200">Shuffling...</h3>
              <div className="w-full bg-yellow-800/50 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* New Round Button - After Settlement */}
        {phase === "SETTLE" && !showShuffling && (
          <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-xl max-w-md mx-auto">
            <Button
              size="lg"
              onClick={newRound}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg shadow-green-500/30"
            >
              🎲 New Round
            </Button>
          </div>
        )}
      </div>

      {/* Rebuy Dialog */}
      {showRebuyDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border-2 border-yellow-600/50 shadow-2xl max-w-md w-full mx-4"
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center gap-3">
                <Coins className="w-10 h-10 text-yellow-400" />
                <div>
                  <h3 className="text-2xl font-bold text-white">Add Chips</h3>
                  <p className="text-sm text-slate-400">Maximum $1000 per rebuy</p>
                </div>
              </div>

              {/* Current Stats */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Current Balance</div>
                    <div className="text-xl font-bold text-green-400">${humanPlayer?.bankroll ?? 0}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Total Buy-in</div>
                    <div className="text-xl font-bold text-yellow-400">${humanPlayer?.buyIn ?? 0}</div>
                  </div>
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-white">Amount to Add</label>
                <Input
                  type="number"
                  value={rebuyAmount}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setRebuyAmount(Math.min(Math.max(value, 0), 1000));
                  }}
                  min={0}
                  max={1000}
                  className="text-2xl font-bold bg-slate-700 border-slate-600 text-white text-center"
                />
                <div className="text-xs text-slate-400 text-center">
                  New balance: ${(humanPlayer?.bankroll ?? 0) + rebuyAmount}
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {[100, 250, 500, 1000].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    onClick={() => setRebuyAmount(amount)}
                    className={`h-12 ${
                      rebuyAmount === amount
                        ? "bg-yellow-600 border-yellow-500 text-white"
                        : "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      setShowRebuyDialog(false);
                      setRebuyAmount(500);
                    }}
                    className="h-12 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="lg"
                    onClick={handleRebuy}
                    disabled={rebuyAmount <= 0 || rebuyAmount > 1000}
                    className="h-12 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Coins className="w-5 h-5 mr-2" />
                    Add ${rebuyAmount}
                  </Button>
                </div>

                {/* Reset Progress Button */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    if (confirm("Are you sure you want to reset your progress? This will reset your bankroll and buy-in to $1000.")) {
                      resetBlackjackProgress();
                      setShowRebuyDialog(false);
                      setRebuyAmount(500);
                    }
                  }}
                  className="w-full h-10 bg-red-900/50 border-red-600/50 text-red-300 hover:bg-red-900 hover:text-red-200 text-xs"
                >
                  Reset Progress to $1000
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
