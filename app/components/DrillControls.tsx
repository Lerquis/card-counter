"use client";

import { useEffect } from "react";
import { useGame } from "@/store/useGame";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Slider } from "@/app/components/ui/slider";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";

export function DrillControls() {
  const { drill, nextCardDrill, togglePlayDrill, resetDrill, updateDrillConfig } = useGame();

  // Auto-advance effect
  useEffect(() => {
    if (!drill.isPlaying || drill.config.advanceMode !== "auto") return;

    const interval = setInterval(() => {
      nextCardDrill();
    }, drill.config.autoMs);

    return () => clearInterval(interval);
  }, [drill.isPlaying, drill.config.advanceMode, drill.config.autoMs, nextCardDrill]);

  const isDone = drill.session?.isDone() ?? false;

  return (
    <Card className="p-6 space-y-6 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700/50 shadow-xl">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <div className="w-1 h-6 bg-blue-500 rounded-full" />
        Controls
      </h3>
      <div className="space-y-4">
        {/* Main Controls */}
        <div className="flex gap-3 justify-center">
          <Button
            size="lg"
            onClick={togglePlayDrill}
            disabled={isDone}
            className={`min-w-[120px] h-14 text-lg font-semibold ${
              drill.isPlaying
                ? "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 shadow-lg shadow-orange-500/30"
                : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-lg shadow-green-500/30"
            }`}
          >
            {drill.isPlaying ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Play
              </>
            )}
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={nextCardDrill}
            disabled={drill.isPlaying || isDone}
            className="min-w-[120px] h-14 text-lg font-semibold bg-slate-800 border-slate-600 hover:bg-slate-700 text-white"
          >
            <SkipForward className="w-5 h-5 mr-2" />
            Next
          </Button>

          <Button
            size="lg"
            variant="secondary"
            onClick={resetDrill}
            className="min-w-[120px] h-14 text-lg font-semibold bg-slate-700 hover:bg-slate-600 text-white"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>
        </div>

        {/* Advance Mode Selection */}
        <div className="space-y-3 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
          <Label className="text-slate-200 font-semibold">Advance Mode</Label>
          <div className="flex gap-2">
            <Button
              variant={drill.config.advanceMode === "manual" ? "default" : "outline"}
              onClick={() => updateDrillConfig({ advanceMode: "manual" })}
              className={`flex-1 h-10 ${
                drill.config.advanceMode === "manual"
                  ? "bg-blue-600 hover:bg-blue-500 text-white"
                  : "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
              }`}
            >
              Manual
            </Button>
            <Button
              variant={drill.config.advanceMode === "auto" ? "default" : "outline"}
              onClick={() => updateDrillConfig({ advanceMode: "auto" })}
              className={`flex-1 h-10 ${
                drill.config.advanceMode === "auto"
                  ? "bg-blue-600 hover:bg-blue-500 text-white"
                  : "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
              }`}
            >
              Auto
            </Button>
          </div>
        </div>

        {/* Speed Control (for auto mode) */}
        {drill.config.advanceMode === "auto" && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Speed</Label>
              <span className="text-sm text-muted-foreground">
                {drill.config.autoMs}ms
              </span>
            </div>
            <Slider
              value={[drill.config.autoMs]}
              onValueChange={([value]) => updateDrillConfig({ autoMs: value })}
              min={300}
              max={2000}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Fast</span>
              <span>Slow</span>
            </div>
          </div>
        )}

        {/* Leave Out Cards */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Leave Out Cards (for verification)</Label>
            <span className="text-sm text-muted-foreground">
              {drill.config.leaveOutCards}
            </span>
          </div>
          <Slider
            value={[drill.config.leaveOutCards]}
            onValueChange={([value]) => updateDrillConfig({ leaveOutCards: value })}
            min={0}
            max={52}
            step={1}
            className="w-full"
          />
        </div>
      </div>
    </Card>
  );
}
