"use client";

import { useGame } from "@/store/useGame";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Hand } from "lucide-react";

export function ActionPanel() {
  const { blackjack, playerHit, playerStand, playerDouble, playerSplit, playerSurrender } =
    useGame();

  const game = blackjack.game;
  if (!game) return null;

  const gameState = game.getState();
  const humanPlayer = gameState.players[0];

  if (gameState.phase !== "PLAYER" || gameState.currentPlayerIndex !== 0) {
    return null; // Not player's turn
  }

  const currentHand = humanPlayer.hands[humanPlayer.currentHandIndex];
  if (!currentHand || currentHand.status !== "active") {
    return null;
  }

  const canDouble = currentHand.cards.length === 2 && humanPlayer.bankroll >= currentHand.bet;
  const canSplit =
    currentHand.cards.length === 2 &&
    currentHand.cards[0].rank === currentHand.cards[1].rank &&
    humanPlayer.bankroll >= currentHand.bet;
  const canSurrender = currentHand.cards.length === 2;

  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700/50 shadow-xl">
      <div className="flex items-center gap-2">
        <div className="w-1 h-6 bg-yellow-500 rounded-full" />
        <Hand className="w-6 h-6 text-yellow-400" />
        <h3 className="text-xl font-bold text-white">Your Turn</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          size="lg"
          onClick={() => playerHit(0, humanPlayer.currentHandIndex)}
          className="h-16 text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg shadow-green-500/20"
        >
          ✋ HIT
        </Button>

        <Button
          size="lg"
          onClick={() => playerStand(0, humanPlayer.currentHandIndex)}
          className="h-16 text-lg font-bold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-lg shadow-red-500/20"
        >
          🛑 STAND
        </Button>

        <Button
          size="lg"
          variant="outline"
          onClick={() => playerDouble(0, humanPlayer.currentHandIndex)}
          disabled={!canDouble}
          className="h-16 text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white border-0 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
        >
          2x DOUBLE
        </Button>

        <Button
          size="lg"
          variant="outline"
          onClick={() => playerSplit(0, humanPlayer.currentHandIndex)}
          disabled={!canSplit}
          className="h-16 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-0 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ✂️ SPLIT
        </Button>

        <Button
          size="lg"
          onClick={() => playerSurrender(0, humanPlayer.currentHandIndex)}
          disabled={!canSurrender}
          className="h-16 text-lg font-bold col-span-2 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
        >
          🏳️ SURRENDER
        </Button>
      </div>
    </Card>
  );
}
