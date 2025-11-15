"use client";

import { useState } from "react";
import { CardImage } from "./CardImage";
import type { Card } from "@/core/types";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { SkipForward, RotateCcw, Settings, BarChart3 } from "lucide-react";
import { FullscreenButton } from "./FullscreenButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface DrillBoardProps {
  lastCard: Card | null;
  currentGroup: Card[];
  recentCards: Card[];
  showCardHistory: boolean;
  isDone: boolean;
  showCompletion: boolean;
  snapshot: { runningCount: number; trueCount: number };
  leftOutCards: Card[];
  leaveOutCardsConfig: number;
  onNext: () => void;
  onReset: () => void;
  onOpenConfig: () => void;
  onOpenStats: () => void;
}

export function DrillBoard({ lastCard, currentGroup, recentCards, showCardHistory, isDone, showCompletion, snapshot, leftOutCards, leaveOutCardsConfig, onNext, onReset, onOpenConfig, onOpenStats }: DrillBoardProps) {
  const isGroupMode = currentGroup.length > 1;
  const groupKey = currentGroup.map(c => `${c.rank}-${c.suit}`).join('_');

  return (
    <div id="drill-board" className="relative min-h-[600px] rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 shadow-2xl">
      {/* Fullscreen Button */}
      <FullscreenButton targetId="drill-board" />

      {/* Config and Stats Buttons */}
      <div className="absolute top-4 left-4 z-50 flex gap-2">
        <Button
          onClick={onOpenConfig}
          size="icon"
          variant="ghost"
          className="bg-slate-800/80 hover:bg-slate-700/90 backdrop-blur-sm border border-slate-600/50 text-slate-200 hover:text-white shadow-lg"
          title="Configuration"
        >
          <Settings className="w-5 h-5" />
        </Button>
        <Button
          onClick={onOpenStats}
          size="icon"
          variant="ghost"
          className="bg-slate-800/80 hover:bg-slate-700/90 backdrop-blur-sm border border-slate-600/50 text-slate-200 hover:text-white shadow-lg"
          title="Statistics"
        >
          <BarChart3 className="w-5 h-5" />
        </Button>
      </div>

      {/* Decorative background */}
      <div className="absolute inset-0 bg-[url(/blackjack_layout.png)] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50" />

      {/* Animated glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />

      {/* Content */}
      <div className="relative z-10 space-y-8">
        {/* Main Card Display */}
        <div className="flex flex-col items-center justify-center min-h-[350px] gap-6">
          <AnimatePresence mode="wait">
            {isDone && showCompletion ? (
              // Completion View
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-3xl space-y-6"
              >
                {/* Title */}
                <div className="text-center mb-6">
                  <h2 className="text-4xl font-bold text-cyan-300 mb-2">Drill Complete!</h2>
                  <p className="text-slate-300 text-lg">You've gone through the entire shoe. Check your final count below.</p>
                </div>

                {/* Count Results */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 p-5 rounded-xl border border-cyan-600/50">
                    <div className="text-sm text-cyan-200 font-medium mb-2">Final Running Count</div>
                    <Badge className="text-3xl px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg">
                      {snapshot.runningCount}
                    </Badge>
                  </div>
                  <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-5 rounded-xl border border-blue-600/50">
                    <div className="text-sm text-blue-200 font-medium mb-2">Final True Count</div>
                    <Badge className="text-3xl px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
                      {snapshot.trueCount}
                    </Badge>
                  </div>
                </div>

                {/* Left Out Cards */}
                {leaveOutCardsConfig > 0 && leftOutCards.length > 0 && (
                  <div className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 p-5 rounded-xl border border-orange-600/50">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="text-lg font-bold text-orange-200">
                        Cards Left Out ({leftOutCards.length})
                      </div>
                    </div>
                    <div className="text-sm text-orange-200/80 mb-4">
                      These cards were removed from the deck before the drill. A perfect count means RC + leftout cards = 0.
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {leftOutCards.map((card, idx) => (
                        <CardImage key={idx} card={card} size="sm" className="shadow-lg" />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : currentGroup.length > 0 ? (
              isGroupMode ? (
                // Group mode: Show multiple cards horizontally
                <motion.div
                  key={groupKey}
                  initial={{ scale: 0.8, opacity: 0, y: -30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 30 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-3xl rounded-2xl" />
                  <div className="flex gap-4 items-center relative z-10">
                    {currentGroup.map((card, idx) => (
                      <motion.div
                        key={`${card.rank}-${card.suit}-${idx}`}
                        initial={{ x: -50, opacity: 0, rotate: -20 }}
                        animate={{ x: 0, opacity: 1, rotate: 0 }}
                        transition={{ delay: idx * 0.1, type: "spring", bounce: 0.4 }}
                      >
                        <CardImage
                          card={card}
                          size="md"
                          className="shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-transform duration-200"
                        />
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-lg font-bold text-purple-300 bg-purple-900/50 px-4 py-2 rounded-full border border-purple-500/50">
                      Group of {currentGroup.length}
                    </span>
                  </div>
                </motion.div>
              ) : (
                // Single card mode
                <motion.div
                  key={`${lastCard?.rank}-${lastCard?.suit}`}
                  initial={{ scale: 0, rotate: -180, opacity: 0, y: -50 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1, y: 0 }}
                  exit={{ scale: 0, rotate: 180, opacity: 0, y: 50 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 blur-2xl rounded-2xl" />
                  <CardImage card={lastCard!} size="lg" className="shadow-2xl relative z-10 transform hover:scale-105 transition-transform duration-200" />
                </motion.div>
              )
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/60 backdrop-blur-sm px-8 py-6 rounded-xl border border-slate-600/50 shadow-xl"
              >
                <p className="text-slate-300 text-xl font-medium text-center">
                  Press <span className="text-blue-400 font-bold">Next</span> to begin
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              size="lg"
              onClick={onNext}
              disabled={isDone}
              className="h-16 px-8 text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg shadow-green-500/30 min-w-[160px]"
            >
              <SkipForward className="w-6 h-6 mr-2" />
              Next Card
            </Button>

            <Button
              size="lg"
              onClick={onReset}
              className="h-16 px-6 text-lg font-semibold bg-slate-700 hover:bg-slate-600 text-white shadow-lg min-w-[120px]"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Recent Cards Strip - Conditional */}
        {showCardHistory && recentCards.length > 0 && (
          <div className="bg-gradient-to-r from-slate-800/80 via-slate-700/80 to-slate-800/80 backdrop-blur-sm rounded-xl p-5 border border-slate-600/50 shadow-xl">
            <div className="text-slate-200 text-sm font-semibold mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-500 rounded-full" />
              Card History
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800/50">
              {recentCards.map((card, idx) => (
                <motion.div
                  key={`${card.rank}-${card.suit}-${idx}`}
                  initial={{ x: -30, opacity: 0, scale: 0.8 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.03, type: "spring" }}
                  className="flex-shrink-0"
                >
                  <CardImage card={card} size="sm" className="hover:scale-110 transition-transform duration-200" />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
