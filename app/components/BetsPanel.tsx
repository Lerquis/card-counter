"use client";

import { useState } from "react";
import { useGame } from "@/store/useGame";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";

const CHIP_VALUES = [10, 25, 50, 100, 500];

export function BetsPanel() {
  const { blackjack, placeBet, dealRound } = useGame();
  const [currentBet, setCurrentBet] = useState(10);

  const game = blackjack.game;
  if (!game) return null;

  const gameState = game.getState();
  const humanPlayer = gameState.players[0];

  const canPlaceBet = gameState.phase === "BETTING";
  const hasBet = humanPlayer?.hands.length > 0 && humanPlayer.hands[0]?.bet > 0;

  const handleChipClick = (value: number) => {
    setCurrentBet((prev) => Math.min(prev + value, blackjack.config.maxBet));
  };

  const handlePlaceBet = () => {
    if (currentBet >= blackjack.config.minBet && currentBet <= blackjack.config.maxBet) {
      placeBet(0, 0, currentBet);
    }
  };

  const handleDeal = () => {
    dealRound();
  };

  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700/50 shadow-xl">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <div className="w-1 h-6 bg-green-500 rounded-full" />
        Betting
      </h3>

      {canPlaceBet && (
        <>
          {/* Current Bet Display */}
          <div className="space-y-3 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
            <Label className="text-slate-200 font-semibold">Your Bet</Label>
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
              />
              <Button
                onClick={handlePlaceBet}
                disabled={hasBet}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold"
              >
                Place
              </Button>
            </div>
            <div className="flex gap-2 text-xs text-slate-400">
              <span>Min: ${blackjack.config.minBet}</span>
              <span>•</span>
              <span>Max: ${blackjack.config.maxBet}</span>
            </div>
          </div>

          {/* Chip Buttons */}
          <div className="space-y-3">
            <Label className="text-slate-200 font-semibold">Quick Add Chips</Label>
            <div className="grid grid-cols-3 gap-2">
              {CHIP_VALUES.map((value) => (
                <Button
                  key={value}
                  variant="outline"
                  onClick={() => handleChipClick(value)}
                  className={`h-14 bg-gradient-to-br ${
                    value === 10 ? "from-red-700 to-red-600" :
                    value === 25 ? "from-green-700 to-green-600" :
                    value === 50 ? "from-blue-700 to-blue-600" :
                    value === 100 ? "from-purple-700 to-purple-600" :
                    "from-yellow-700 to-yellow-600"
                  } hover:scale-105 transition-transform border-0 text-white shadow-lg font-bold`}
                  disabled={hasBet}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-xs">+</span>
                    <span className="text-lg">${value}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Clear and Deal */}
          <div className="space-y-2">
            <Button
              variant="secondary"
              className="w-full h-10 bg-slate-700 hover:bg-slate-600 text-white"
              onClick={() => setCurrentBet(blackjack.config.minBet)}
              disabled={hasBet}
            >
              Reset Bet
            </Button>

            {hasBet && (
              <Button
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                onClick={handleDeal}
              >
                🎲 Deal Cards
              </Button>
            )}
          </div>

          {/* Current Bet Status */}
          {hasBet && (
            <div className="p-4 bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-lg border border-green-600/50 shadow-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-green-200">Bet Placed:</span>
                <Badge className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1 shadow-lg">
                  ${humanPlayer.hands[0].bet}
                </Badge>
              </div>
            </div>
          )}
        </>
      )}

      {!canPlaceBet && (
        <div className="p-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg text-center border border-slate-600/50">
          <span className="text-base text-slate-300 font-medium">
            {gameState.phase === "PLAYER"
              ? "🎮 Playing round..."
              : gameState.phase === "DEALER"
              ? "🎰 Dealer's turn..."
              : "💰 Settling bets..."}
          </span>
        </div>
      )}
    </Card>
  );
}
