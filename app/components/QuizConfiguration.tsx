"use client";

import { useGame } from "@/store/useGame";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";

export function QuizConfiguration() {
  const { quiz, updateQuizConfig, resetQuizStats } = useGame();
  const { config } = quiz;

  const handleConfigChange = (key: string, value: boolean) => {
    updateQuizConfig({ [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* Enable Deviations */}
      <Card className="p-6 bg-slate-800/50 border-slate-700">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="enable-deviations" className="text-lg font-semibold text-slate-100">
              Enable Index Deviations
            </Label>
            <p className="text-sm text-slate-400">
              Include count-dependent strategy deviations (Illustrious 18, Fab 4). Shows True Count
              and tests deviation plays.
            </p>
          </div>
          <Switch
            id="enable-deviations"
            checked={config.enableDeviations}
            onCheckedChange={(checked) => handleConfigChange("enableDeviations", checked)}
          />
        </div>
      </Card>

      <Separator className="bg-slate-700" />

      {/* Game Rules */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-100">Game Rules</h3>

        {/* Dealer Hits Soft 17 */}
        <Card className="p-5 bg-slate-800/50 border-slate-700">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="dealer-h17" className="text-base font-semibold text-slate-100">
                Dealer Hits Soft 17
              </Label>
              <p className="text-sm text-slate-400">
                Dealer must hit on soft 17 (A-6)
              </p>
            </div>
            <Switch
              id="dealer-h17"
              checked={config.dealerHitsSoft17}
              onCheckedChange={(checked) => handleConfigChange("dealerHitsSoft17", checked)}
            />
          </div>
        </Card>

        {/* Allow Double After Split */}
        <Card className="p-5 bg-slate-800/50 border-slate-700">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="das" className="text-base font-semibold text-slate-100">
                Double After Split (DAS)
              </Label>
              <p className="text-sm text-slate-400">
                Allow doubling down after splitting pairs
              </p>
            </div>
            <Switch
              id="das"
              checked={config.allowDoubleAfterSplit}
              onCheckedChange={(checked) => handleConfigChange("allowDoubleAfterSplit", checked)}
            />
          </div>
        </Card>

        {/* Allow Surrender */}
        <Card className="p-5 bg-slate-800/50 border-slate-700">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="surrender" className="text-base font-semibold text-slate-100">
                Allow Surrender
              </Label>
              <p className="text-sm text-slate-400">
                Allow late surrender option
              </p>
            </div>
            <Switch
              id="surrender"
              checked={config.allowSurrender}
              onCheckedChange={(checked) => handleConfigChange("allowSurrender", checked)}
            />
          </div>
        </Card>
      </div>

      <Separator className="bg-slate-700" />

      {/* Reset Stats */}
      <div className="pt-4">
        <Button
          onClick={resetQuizStats}
          variant="outline"
          className="w-full h-12 text-base font-semibold bg-slate-800/50 border-slate-600 text-slate-200 hover:bg-slate-700 hover:text-white"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Statistics
        </Button>
      </div>
    </div>
  );
}
