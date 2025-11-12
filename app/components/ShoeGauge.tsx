"use client";

import { Progress } from "@/app/components/ui/progress";
import { Card } from "@/app/components/ui/card";

interface ShoeGaugeProps {
  penetration: number; // 0-1
  cardsRemaining: number;
  totalCards: number;
}

export function ShoeGauge({ penetration, cardsRemaining, totalCards }: ShoeGaugeProps) {
  const percentageUsed = penetration * 100;

  return (
    <Card className="p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-700/50 shadow-xl">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-orange-500 rounded-full" />
            <span className="font-bold text-white text-lg">Shoe Penetration</span>
          </div>
          <div className="bg-slate-800/50 px-3 py-1 rounded-lg border border-slate-700/50">
            <span className="text-slate-300 font-semibold text-sm">
              {cardsRemaining} / {totalCards} cards
            </span>
          </div>
        </div>
        <Progress
          value={percentageUsed}
          className="h-4 bg-slate-700"
        />
        <div className="text-sm text-center">
          <span className={`font-bold ${
            percentageUsed > 75 ? "text-red-400" : percentageUsed > 50 ? "text-yellow-400" : "text-green-400"
          }`}>
            {percentageUsed.toFixed(1)}% dealt
          </span>
          {percentageUsed > 75 && (
            <span className="ml-2 text-xs text-red-400 animate-pulse">⚠️ Reshuffle soon</span>
          )}
        </div>
      </div>
    </Card>
  );
}
