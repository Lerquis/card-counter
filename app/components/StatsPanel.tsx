"use client";

import { useState } from "react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { Button } from "@/app/components/ui/button";
import type { CountSnapshot } from "@/core/types";
import { CheckCircle2, XCircle, Eye, EyeOff } from "lucide-react";

interface StatsPanelProps {
  snapshot: CountSnapshot;
  leaveOutCards?: number;
  isDone?: boolean;
  showStats?: boolean;
  onToggleStats?: () => void;
}

export function StatsPanel({ snapshot, leaveOutCards = 0, isDone = false, showStats = true, onToggleStats }: StatsPanelProps) {
  // Calculate expected final count if drill is done
  const expectedFinalCount = isDone && leaveOutCards > 0 ? -snapshot.runningCount : 0;
  const isCountCorrect = isDone ? snapshot.runningCount === expectedFinalCount : null;

  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700/50 shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="w-1 h-6 bg-cyan-500 rounded-full" />
          Statistics
        </h3>
        {onToggleStats && (
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleStats}
            className="bg-slate-700 hover:bg-slate-600 border-slate-600 text-white"
          >
            {showStats ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Hide
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Show
              </>
            )}
          </Button>
        )}
      </div>

      {!showStats && (
        <div className="py-8 text-center">
          <p className="text-slate-400 text-sm">Stats hidden for practice mode</p>
        </div>
      )}

      {showStats && <div className="space-y-3">
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-4 rounded-lg border border-slate-600/50">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-300 font-medium">Running Count</span>
            <Badge
              variant={snapshot.runningCount > 0 ? "default" : "secondary"}
              className={`text-2xl px-4 py-2 ${
                snapshot.runningCount > 0
                  ? "bg-green-600 text-white"
                  : snapshot.runningCount < 0
                  ? "bg-red-600 text-white"
                  : "bg-slate-600 text-white"
              }`}
            >
              {snapshot.runningCount > 0 ? "+" : ""}
              {snapshot.runningCount}
            </Badge>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 p-4 rounded-lg border border-cyan-600/50">
          <div className="flex justify-between items-center">
            <span className="text-sm text-cyan-200 font-medium">True Count</span>
            <Badge
              className={`text-2xl px-4 py-2 ${
                snapshot.trueCount >= 2
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                  : "bg-slate-700 text-slate-200"
              }`}
            >
              {snapshot.trueCount > 0 ? "+" : ""}
              {snapshot.trueCount}
            </Badge>
          </div>
        </div>

        <Separator className="bg-slate-700" />

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">Decks Left</div>
            <div className="text-xl font-bold text-white">{snapshot.decksRemaining.toFixed(1)}</div>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">Cards Left</div>
            <div className="text-xl font-bold text-white">{snapshot.cardsRemaining}</div>
          </div>
        </div>

        {leaveOutCards > 0 && (
          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Cards Left Out</span>
              <span className="font-medium text-orange-400 text-lg">{leaveOutCards}</span>
            </div>
          </div>
        )}

        {isDone && leaveOutCards > 0 && (
          <>
            <Separator className="bg-slate-700" />
            <div className="space-y-3 p-4 bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-lg border border-slate-600/50">
              <div className="font-semibold text-base text-white flex items-center gap-2">
                <div className="w-1 h-5 bg-cyan-500 rounded-full" />
                Verification
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-slate-900/50 p-2 rounded">
                  <span className="text-sm text-slate-300">Expected Final RC</span>
                  <span className="font-bold text-white">{expectedFinalCount}</span>
                </div>
                <div className="flex justify-between items-center bg-slate-900/50 p-2 rounded">
                  <span className="text-sm text-slate-300">Actual Final RC</span>
                  <span className="font-bold text-white">{snapshot.runningCount}</span>
                </div>
              </div>
              <div className={`flex items-center gap-2 mt-3 p-3 rounded-lg ${
                isCountCorrect
                  ? 'bg-green-900/30 border border-green-600/50'
                  : 'bg-red-900/30 border border-red-600/50'
              }`}>
                {isCountCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-semibold text-green-300">Count is correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-400" />
                    <span className="text-sm font-semibold text-red-300">Count mismatch</span>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {isDone && leaveOutCards === 0 && (
          <>
            <Separator className="bg-slate-700" />
            <div className="p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg text-center border border-green-600/50">
              <span className="text-base font-semibold text-green-300">Drill Complete!</span>
            </div>
          </>
        )}
      </div>}
    </Card>
  );
}
