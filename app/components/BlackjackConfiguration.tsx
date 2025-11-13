"use client";

import { useGame } from "@/store/useGame";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import { Button } from "@/app/components/ui/button";
import { Settings, RotateCcw } from "lucide-react";

export function BlackjackConfiguration() {
  const { blackjack, updateBlackjackConfig, settings, updateSettings, reshuffleNow } = useGame();

  // Get current phase
  const currentPhase = blackjack.game ? blackjack.game.getState().phase : "BETTING";
  const isBettingPhase = currentPhase === "BETTING";

  const handleDeckChange = (decks: number) => {
    updateBlackjackConfig({ decks });
    // Reshuffle immediately with new deck count if in BETTING phase
    if (blackjack.game) {
      const gameState = blackjack.game.getState();
      if (gameState.phase === "BETTING") {
        reshuffleNow();
      }
    }
  };

  const handleReset = () => {
    if (isBettingPhase) {
      reshuffleNow();
    }
  };

  return (
    <Card className="p-6 space-y-6 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700/50 shadow-xl">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <div className="w-1 h-6 bg-purple-500 rounded-full" />
        <Settings className="w-6 h-6 text-purple-400" />
        Configuration
      </h3>

      <div className="space-y-6">
        {/* Decks Configuration */}
        <div className="space-y-3 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
          <div className="flex justify-between items-center">
            <Label className="text-slate-200 font-semibold">Number of Decks</Label>
            <span className="text-2xl font-bold text-white">{blackjack.config.decks}</span>
          </div>
          <select
            className="w-full px-4 py-2 rounded-md border border-slate-600 bg-slate-700 text-white hover:bg-slate-600 transition-colors cursor-pointer focus:ring-2 focus:ring-purple-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            value={blackjack.config.decks}
            onChange={(e) => {
              const decks = parseInt(e.target.value);
              handleDeckChange(decks);
            }}
            disabled={!isBettingPhase}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
          </select>
          {!isBettingPhase && (
            <p className="text-xs text-yellow-400 mt-2">Configuration locked during game. Use Reset to shuffle.</p>
          )}
        </div>

        {/* Penetration */}
        <div className="space-y-3 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
          <div className="flex justify-between items-center">
            <Label className="text-slate-200 font-semibold">Penetration</Label>
            <span className="text-2xl font-bold text-white">{(blackjack.config.penetrationPct * 100).toFixed(0)}%</span>
          </div>
          <select
            className="w-full px-4 py-2 rounded-md border border-slate-600 bg-slate-700 text-white hover:bg-slate-600 transition-colors cursor-pointer focus:ring-2 focus:ring-purple-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            value={blackjack.config.penetrationPct}
            onChange={(e) => {
              const penetrationPct = parseFloat(e.target.value);
              updateBlackjackConfig({ penetrationPct });
            }}
            disabled={!isBettingPhase}
          >
            <option value="0.5">50%</option>
            <option value="0.6">60%</option>
            <option value="0.7">70%</option>
            <option value="0.75">75%</option>
            <option value="0.8">80%</option>
          </select>
        </div>

        {/* Reset Button */}
        <div className="pt-4 border-t border-slate-700/50">
          <Button
            onClick={handleReset}
            disabled={!isBettingPhase}
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset (Shuffle)
          </Button>
          {!isBettingPhase && (
            <p className="text-xs text-slate-400 mt-2 text-center">Reset only available during betting phase</p>
          )}
        </div>
      </div>
    </Card>
  );
}
