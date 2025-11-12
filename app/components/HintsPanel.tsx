"use client";

import { useGame } from "@/store/useGame";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Lightbulb } from "lucide-react";

export function HintsPanel() {
  const { blackjack, settings } = useGame();

  const game = blackjack.game;
  if (!game) return null;

  const gameState = game.getState();

  if (
    !settings.enableBasicStrategyHints ||
    gameState.phase !== "PLAYER" ||
    gameState.currentPlayerIndex !== 0
  ) {
    return null;
  }

  const humanPlayer = gameState.players[0];
  const currentHand = humanPlayer.hands[humanPlayer.currentHandIndex];

  if (!currentHand || currentHand.status !== "active") {
    return null;
  }

  const suggestedAction = game.getSuggestedAction(0, humanPlayer.currentHandIndex);

  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700/50 shadow-xl">
      <div className="flex items-center gap-2">
        <div className="w-1 h-6 bg-yellow-500 rounded-full" />
        <Lightbulb className="w-6 h-6 text-yellow-400" />
        <h3 className="text-xl font-bold text-white">Strategy Hint</h3>
      </div>

      <div className="space-y-4">
        <div className="p-5 bg-gradient-to-br from-yellow-900/40 to-orange-900/40 rounded-xl border border-yellow-600/50 shadow-lg">
          <div className="text-sm text-yellow-200 font-semibold mb-3">Recommended Action</div>
          <Badge className="text-2xl font-bold px-6 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg shadow-yellow-500/30">
            {suggestedAction}
          </Badge>
        </div>

        <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
          <div className="text-xs text-slate-300">
            {settings.enableIndexDeviations ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                <span className="font-semibold">Index deviations enabled</span>
                <Badge className="ml-auto bg-cyan-600 text-white text-xs">
                  TC: {gameState.snapshot.trueCount}
                </Badge>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-slate-500 rounded-full" />
                <span>Basic strategy only</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-4 rounded-lg border border-slate-600/50">
          <div className="text-sm space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Dealer shows:</span>
              <span className="font-bold text-white text-lg">{gameState.dealer.hand[0]?.rank}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Your cards:</span>
              <span className="font-bold text-white">
                {currentHand.cards
                  .map((c) => c.rank)
                  .join(" + ")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
