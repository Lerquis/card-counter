"use client";

import { useEffect, useState } from "react";
import { useGame } from "@/store/useGame";
import { TopBar } from "@/app/components/TopBar";
import { AssistIndicator } from "@/app/components/AssistIndicator";
import { TableBJ } from "@/app/components/TableBJ";
import { BlackjackConfiguration } from "@/app/components/BlackjackConfiguration";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";

export default function BlackjackPage() {
  const { blackjack, startBlackjack } = useGame();
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Initialize game on mount
  useEffect(() => {
    if (!blackjack.game) {
      startBlackjack(blackjack.config);
    }
  }, []);

  const game = blackjack.game;
  if (!game) {
    return <div>Loading...</div>;
  }

  const gameState = game.getState();
  const totalCards = gameState.totalCards;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950">
      <TopBar />

      <AssistIndicator snapshot={gameState.snapshot} />

      <div className="max-w-7xl mx-auto p-6 space-y-6 h-[calc(100vh-100px)] md:h-[calc(100vh-100px)] sm:h-[calc(100vh-80px)] overflow-y-auto">
        {/* Game Table - Now includes betting panel and game info */}
        <TableBJ
          players={gameState.players}
          dealer={gameState.dealer}
          currentPlayerIndex={gameState.currentPlayerIndex}
          phase={gameState.phase}
          snapshot={gameState.snapshot}
          penetration={gameState.penetration}
          totalCards={totalCards}
          onOpenConfig={() => setShowConfigModal(true)}
        />
      </div>

      {/* Configuration Modal */}
      <Dialog open={showConfigModal} onOpenChange={setShowConfigModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-slate-600/50">
          <DialogHeader>
            <DialogTitle className="text-2xl text-slate-100 font-bold">Blackjack Configuration</DialogTitle>
            <DialogDescription className="text-slate-400">
              Configure game settings. Some changes require reshuffling (only available in betting phase).
            </DialogDescription>
          </DialogHeader>
          <BlackjackConfiguration />
        </DialogContent>
      </Dialog>
    </div>
  );
}
