"use client";

import { useEffect, useState } from "react";
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
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);

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

      <div className="max-w-7xl mx-auto p-6 space-y-6 h-[calc(100vh-100px)] md:h-[calc(100vh-100px)] sm:h-[calc(100vh-80px)] overflow-y-auto">
        {/* Main Drill Board */}
        <DrillBoard
          lastCard={drill.lastCard}
          currentGroup={drill.currentGroup}
          recentCards={drill.recentCards}
          showCardHistory={drill.config.showCardHistory}
          isDone={isDone}
          showCompletion={drill.showCompletion}
          snapshot={drill.snapshot}
          leftOutCards={drill.leftOutCards}
          leaveOutCardsConfig={drill.config.leaveOutCards}
          onNext={nextCardDrill}
          onReset={resetDrill}
          onOpenConfig={() => setShowConfigModal(true)}
          onOpenStats={() => setShowStatsModal(true)}
        />

      </div>

      {/* Configuration Modal */}
      <Dialog open={showConfigModal} onOpenChange={setShowConfigModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-slate-600/50">
          <DialogHeader>
            <DialogTitle className="text-2xl text-slate-100 font-bold">Drill Configuration</DialogTitle>
            <DialogDescription className="text-slate-400">
              Configure your drill settings. Changes will reset the current drill.
            </DialogDescription>
          </DialogHeader>
          <DrillConfiguration />
        </DialogContent>
      </Dialog>

      {/* Statistics Modal */}
      <Dialog open={showStatsModal} onOpenChange={setShowStatsModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-slate-600/50">
          <DialogHeader>
            <DialogTitle className="text-2xl text-slate-100 font-bold">Statistics</DialogTitle>
            <DialogDescription className="text-slate-400">
              View your current count statistics.
            </DialogDescription>
          </DialogHeader>
          <StatsPanel
            snapshot={drill.snapshot}
            leaveOutCards={drill.config.leaveOutCards}
            isDone={isDone}
            showStats={drill.showStats}
            onToggleStats={toggleStats}
          />
        </DialogContent>
      </Dialog>

    </div>
  );
}
