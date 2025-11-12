"use client";

import { useGame } from "@/store/useGame";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Slider } from "@/app/components/ui/slider";
import { Switch } from "@/app/components/ui/switch";
import { Settings } from "lucide-react";

export function DrillConfiguration() {
  const { drill, updateDrillConfig, startDrill, settings, updateSettings } = useGame();

  const handleDecksChange = (decks: number) => {
    const newConfig = { ...drill.config, decks };
    startDrill(newConfig);
  };

  const handleLeaveOutCardsChange = (leaveOutCards: number) => {
    const newConfig = { ...drill.config, leaveOutCards };
    startDrill(newConfig);
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
            <span className="text-2xl font-bold text-white">{drill.config.decks}</span>
          </div>
          <Slider
            value={[drill.config.decks]}
            onValueChange={([value]) => handleDecksChange(value)}
            min={1}
            max={8}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>1 deck</span>
            <span>8 decks</span>
          </div>
        </div>

        {/* Leave Out Cards */}
        <div className="space-y-3 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
          <div className="flex justify-between items-center">
            <Label className="text-slate-200 font-semibold">Leave Out Cards</Label>
            <span className="text-xl font-bold text-white">{drill.config.leaveOutCards}</span>
          </div>
          <Slider
            value={[drill.config.leaveOutCards]}
            onValueChange={([value]) => handleLeaveOutCardsChange(value)}
            min={0}
            max={52}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-slate-400">
            Cards left out for final count verification
          </div>
        </div>

        {/* Show Card History Toggle */}
        <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
          <div>
            <Label htmlFor="show-history" className="text-slate-200 font-semibold cursor-pointer">
              Show Card History
            </Label>
            <p className="text-xs text-slate-400 mt-1">Display recently seen cards</p>
          </div>
          <Switch
            id="show-history"
            checked={drill.config.showCardHistory}
            onCheckedChange={(checked) => updateDrillConfig({ showCardHistory: checked })}
          />
        </div>

        {/* Show Count Toggle */}
        <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
          <div>
            <Label htmlFor="show-count" className="text-slate-200 font-semibold cursor-pointer">
              Show Count Monitor
            </Label>
            <p className="text-xs text-slate-400 mt-1">Display running and true count</p>
          </div>
          <Switch
            id="show-count"
            checked={drill.config.showAssistAlways}
            onCheckedChange={(checked) => updateDrillConfig({ showAssistAlways: checked })}
          />
        </div>
      </div>
    </Card>
  );
}
