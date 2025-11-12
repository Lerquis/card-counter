"use client";

import { useGame } from "@/store/useGame";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import { Settings } from "lucide-react";

export function BlackjackConfiguration() {
  const { blackjack, updateBlackjackConfig, settings, updateSettings, reshuffleNow } = useGame();

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
            className="w-full px-4 py-2 rounded-md border border-slate-600 bg-slate-700 text-white hover:bg-slate-600 transition-colors cursor-pointer focus:ring-2 focus:ring-purple-500 focus:outline-none"
            value={blackjack.config.decks}
            onChange={(e) => {
              const decks = parseInt(e.target.value);
              handleDeckChange(decks);
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
          </select>
        </div>

        {/* Penetration */}
        <div className="space-y-3 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
          <div className="flex justify-between items-center">
            <Label className="text-slate-200 font-semibold">Penetration</Label>
            <span className="text-2xl font-bold text-white">{(blackjack.config.penetrationPct * 100).toFixed(0)}%</span>
          </div>
          <select
            className="w-full px-4 py-2 rounded-md border border-slate-600 bg-slate-700 text-white hover:bg-slate-600 transition-colors cursor-pointer focus:ring-2 focus:ring-purple-500 focus:outline-none"
            value={blackjack.config.penetrationPct}
            onChange={(e) => {
              const penetrationPct = parseFloat(e.target.value);
              updateBlackjackConfig({ penetrationPct });
            }}
          >
            <option value="0.5">50%</option>
            <option value="0.6">60%</option>
            <option value="0.7">70%</option>
            <option value="0.75">75%</option>
            <option value="0.8">80%</option>
          </select>
        </div>

        {/* Show Count Toggle */}
        <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
          <div>
            <Label htmlFor="show-count" className="text-slate-200 font-semibold cursor-pointer">
              Show Count
            </Label>
            <p className="text-xs text-slate-400 mt-1">Display running and true count</p>
          </div>
          <Switch
            id="show-count"
            checked={settings.showAssistAlways}
            onCheckedChange={(checked) => updateSettings({ showAssistAlways: checked })}
          />
        </div>

        {/* Basic Strategy Hints */}
        <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
          <div>
            <Label htmlFor="basic-hints" className="text-slate-200 font-semibold cursor-pointer">
              Strategy Hints
            </Label>
            <p className="text-xs text-slate-400 mt-1">Show basic strategy recommendations</p>
          </div>
          <Switch
            id="basic-hints"
            checked={settings.enableBasicStrategyHints}
            onCheckedChange={(checked) => updateSettings({ enableBasicStrategyHints: checked })}
          />
        </div>

        {/* Index Deviations */}
        <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
          <div>
            <Label htmlFor="index-dev" className="text-slate-200 font-semibold cursor-pointer">
              Index Deviations
            </Label>
            <p className="text-xs text-slate-400 mt-1">Enable count-based strategy adjustments</p>
          </div>
          <Switch
            id="index-dev"
            checked={settings.enableIndexDeviations}
            onCheckedChange={(checked) => updateSettings({ enableIndexDeviations: checked })}
          />
        </div>
      </div>
    </Card>
  );
}
