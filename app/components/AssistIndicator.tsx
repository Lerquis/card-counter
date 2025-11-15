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

  return null;
}
