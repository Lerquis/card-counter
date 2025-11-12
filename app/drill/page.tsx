"use client";

import { useEffect } from "react";
import { useGame } from "@/store/useGame";
import { TopBar } from "@/app/components/TopBar";
import { AssistIndicator } from "@/app/components/AssistIndicator";
import { DrillBoard } from "@/app/components/DrillBoard";
import { DrillConfiguration } from "@/app/components/DrillConfiguration";
import { StatsPanel } from "@/app/components/StatsPanel";
import { CardImage } from "@/app/components/CardImage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "@/app/components/ui/badge";

export default function DrillPage() {
  const router = useRouter();
  const { drill, startDrill, resetDrill, nextCardDrill } = useGame();

  // Initialize drill on mount
  useEffect(() => {
    if (!drill.session) {
      startDrill(drill.config);
    }
  }, []);

  const isDone = drill.session?.isDone() ?? false;

  const toggleStats = () => {
    // Toggle stats visibility
    useGame.setState((state) => ({
      drill: {
        ...state.drill,
        showStats: !state.drill.showStats,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950">
      <TopBar />

      <AssistIndicator snapshot={drill.snapshot} />

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Main Drill Board */}
        <DrillBoard
          lastCard={drill.lastCard}
          recentCards={drill.recentCards}
          showCardHistory={drill.config.showCardHistory}
          isDone={isDone}
          onNext={nextCardDrill}
          onReset={resetDrill}
        />

        {/* Configuration and Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          <DrillConfiguration />
          <StatsPanel
            snapshot={drill.snapshot}
            leaveOutCards={drill.config.leaveOutCards}
            isDone={isDone}
            showStats={drill.showStats}
            onToggleStats={toggleStats}
          />
        </div>
      </div>

      {/* Completion Dialog */}
      <Dialog open={isDone}>
        <DialogContent className="max-w-3xl bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-cyan-600/50">
          <DialogHeader>
            <DialogTitle className="text-3xl text-cyan-300 font-bold">Drill Complete!</DialogTitle>
            <DialogDescription className="text-slate-300 text-base">
              You've gone through the entire shoe. Check your final count below.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-6">
            {/* Count Results */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 p-5 rounded-xl border border-cyan-600/50">
                <div className="text-sm text-cyan-200 font-medium mb-2">Final Running Count</div>
                <Badge className="text-3xl px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg">
                  {drill.snapshot.runningCount}
                </Badge>
              </div>
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-5 rounded-xl border border-blue-600/50">
                <div className="text-sm text-blue-200 font-medium mb-2">Final True Count</div>
                <Badge className="text-3xl px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
                  {drill.snapshot.trueCount}
                </Badge>
              </div>
            </div>

            {/* Left Out Cards */}
            {drill.config.leaveOutCards > 0 && drill.leftOutCards.length > 0 && (
              <div className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 p-5 rounded-xl border border-orange-600/50">
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-lg font-bold text-orange-200">
                    Cards Left Out ({drill.leftOutCards.length})
                  </div>
                </div>
                <div className="text-sm text-orange-200/80 mb-4">
                  These cards were removed from the deck before the drill. A perfect count means RC + leftout cards = 0.
                </div>
                <div className="flex flex-wrap gap-2">
                  {drill.leftOutCards.map((card, idx) => (
                    <CardImage key={idx} card={card} size="sm" className="shadow-lg" />
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="secondary"
              onClick={() => router.push("/")}
              className="bg-slate-700 hover:bg-slate-600 text-white"
            >
              Back to Home
            </Button>
            <Button
              onClick={resetDrill}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
            >
              Restart Drill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
