"use client";

import { useEffect } from "react";
import { useGame } from "@/store/useGame";
import { TopBar } from "@/app/components/TopBar";
import { AssistIndicator } from "@/app/components/AssistIndicator";
import { ShoeGauge } from "@/app/components/ShoeGauge";
import { TableBJ } from "@/app/components/TableBJ";
import { BlackjackConfiguration } from "@/app/components/BlackjackConfiguration";

export default function BlackjackPage() {
  const { blackjack, startBlackjack } = useGame();

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

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Shoe Gauge */}
        <ShoeGauge
          penetration={gameState.penetration}
          cardsRemaining={gameState.snapshot.cardsRemaining}
          totalCards={totalCards}
        />

        {/* Game Table - Now includes betting panel and game info */}
        <TableBJ
          players={gameState.players}
          dealer={gameState.dealer}
          currentPlayerIndex={gameState.currentPlayerIndex}
          phase={gameState.phase}
          snapshot={gameState.snapshot}
        />

        {/* Configuration */}
        <BlackjackConfiguration />
      </div>
    </div>
  );
}
