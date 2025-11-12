"use client";

import { useGame } from "@/store/useGame";
import { Badge } from "@/app/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { Activity } from "lucide-react";
import type { CountSnapshot } from "@/core/types";

interface AssistIndicatorProps {
  snapshot: CountSnapshot;
}

export function AssistIndicator({ snapshot }: AssistIndicatorProps) {
  const { settings } = useGame();

  const content = (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between gap-4">
        <span className="text-muted-foreground">Running Count:</span>
        <span className="font-bold">{snapshot.runningCount}</span>
      </div>
      <div className="flex justify-between gap-4">
        <span className="text-muted-foreground">True Count:</span>
        <span className="font-bold">{snapshot.trueCount}</span>
      </div>
      <div className="flex justify-between gap-4">
        <span className="text-muted-foreground">Decks Remaining:</span>
        <span className="font-bold">{snapshot.decksRemaining.toFixed(1)}</span>
      </div>
      <div className="flex justify-between gap-4">
        <span className="text-muted-foreground">Cards Left:</span>
        <span className="font-bold">{snapshot.cardsRemaining}</span>
      </div>
    </div>
  );

  if (settings.showAssistAlways) {
    return (
      <div className="fixed top-20 right-4 z-50 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-xl shadow-2xl p-5 min-w-[240px] backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span className="font-bold text-white">Count Monitor</span>
        </div>
        <div className="space-y-2 text-sm">
          {content}
        </div>
        <div className="mt-4 pt-3 border-t border-slate-700">
          <Badge
            className={`w-full justify-center text-lg font-bold py-2 ${
              snapshot.trueCount >= 2
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                : "bg-slate-700 text-slate-200"
            }`}
          >
            TC: {snapshot.trueCount}
          </Badge>
        </div>
      </div>
    );
  }

  if (settings.showAssistOnHover) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="fixed top-20 right-4 z-50 bg-card border border-border rounded-full p-3 shadow-lg cursor-pointer hover:bg-accent transition-colors">
              <Activity className="w-5 h-5 text-primary" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="left" className="w-64">
            <div className="space-y-2">
              <div className="font-semibold text-sm mb-2">Count Monitor</div>
              {content}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return null;
}
