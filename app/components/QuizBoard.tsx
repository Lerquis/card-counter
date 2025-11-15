"use client";

import { CardImage } from "./CardImage";
import type { QuizHand, QuizAnswerResult, QuizConfig, Action } from "@/core/types";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Settings, Trophy, Target, Flame } from "lucide-react";
import { FullscreenButton } from "./FullscreenButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface QuizBoardProps {
  currentHand: QuizHand | null;
  stats: { correct: number; incorrect: number; streak: number; bestStreak: number };
  lastResult: QuizAnswerResult | null;
  showResult: boolean;
  onAnswer: (action: Action) => void;
  onNext: () => void;
  onOpenConfig: () => void;
  config: QuizConfig;
}

export function QuizBoard({
  currentHand,
  stats,
  lastResult,
  showResult,
  onAnswer,
  onNext,
  onOpenConfig,
  config,
}: QuizBoardProps) {
  const actions: { label: string; action: Action; color: string; disabled?: boolean }[] = [
    { label: "Hit", action: "HIT", color: "from-blue-600 to-blue-700" },
    { label: "Stand", action: "STAND", color: "from-green-600 to-green-700" },
    {
      label: "Double",
      action: "DOUBLE",
      color: "from-yellow-600 to-yellow-700",
      disabled: !currentHand?.canDouble,
    },
    {
      label: "Split",
      action: "SPLIT",
      color: "from-purple-600 to-purple-700",
      disabled: !currentHand?.canSplit,
    },
    {
      label: "Surrender",
      action: "SURRENDER",
      color: "from-red-600 to-red-700",
      disabled: !currentHand?.canSurrender,
    },
  ];

  const accuracy = stats.correct + stats.incorrect > 0
    ? Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100)
    : 0;

  return (
    <div
      id="quiz-board"
      className="relative min-h-[600px] rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 shadow-2xl"
    >
      {/* Fullscreen Button */}
      <FullscreenButton targetId="quiz-board" />

      {/* Config Button */}
      <div className="absolute top-4 left-4 z-50">
        <Button
          onClick={onOpenConfig}
          size="icon"
          variant="ghost"
          className="bg-slate-800/80 hover:bg-slate-700/90 backdrop-blur-sm border border-slate-600/50 text-slate-200 hover:text-white shadow-lg"
          title="Configuration"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Statistics Bar */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <Badge className="bg-green-900/80 text-green-100 px-4 py-2 text-sm font-semibold border border-green-600/50">
          <Trophy className="w-4 h-4 mr-1.5 inline" />
          {stats.correct}
        </Badge>
        <Badge className="bg-red-900/80 text-red-100 px-4 py-2 text-sm font-semibold border border-red-600/50">
          <Target className="w-4 h-4 mr-1.5 inline" />
          {stats.incorrect}
        </Badge>
        <Badge className="bg-orange-900/80 text-orange-100 px-4 py-2 text-sm font-semibold border border-orange-600/50">
          <Flame className="w-4 h-4 mr-1.5 inline" />
          {stats.streak}
        </Badge>
        <Badge className="bg-cyan-900/80 text-cyan-100 px-4 py-2 text-sm font-semibold border border-cyan-600/50">
          {accuracy}%
        </Badge>
      </div>

      {/* Decorative background */}
      <div className="absolute inset-0 bg-[url(/blackjack_layout.png)] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50" />

      {/* Animated glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />

      {/* Content */}
      <div className="relative z-10 space-y-8 pt-16">
        <AnimatePresence mode="wait">
          {currentHand ? (
            <motion.div
              key="quiz-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              {/* Title */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-cyan-300 mb-2">Blackjack Strategy Quiz</h2>
                <p className="text-slate-300 text-lg">What's the correct play?</p>
              </div>

              {/* True Count Display (if deviations enabled) */}
              {config.enableDeviations && (
                <div className="flex justify-center">
                  <Badge className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 text-white px-6 py-3 text-xl font-bold border border-purple-500/50">
                    True Count: {currentHand.trueCount >= 0 ? '+' : ''}{currentHand.trueCount}
                  </Badge>
                </div>
              )}

              {/* Cards Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Dealer's Card */}
                <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 p-6 rounded-xl border border-red-600/50">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-red-200">Dealer Shows</h3>
                  </div>
                  <div className="flex justify-center">
                    <CardImage card={currentHand.dealerUpcard} size="lg" className="shadow-2xl" />
                  </div>
                </div>

                {/* Player's Cards */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 rounded-xl border border-blue-600/50">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-blue-200">Your Hand</h3>
                  </div>
                  <div className="flex justify-center gap-4">
                    {currentHand.playerCards.map((card, idx) => (
                      <CardImage key={idx} card={card} size="lg" className="shadow-2xl" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                {actions.map((actionBtn) => (
                  <Button
                    key={actionBtn.action}
                    size="lg"
                    onClick={() => onAnswer(actionBtn.action)}
                    disabled={actionBtn.disabled || showResult}
                    className={`h-14 px-8 text-lg font-bold bg-gradient-to-r ${actionBtn.color} hover:opacity-90 text-white shadow-lg min-w-[140px] disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    {actionBtn.label}
                  </Button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-slate-300 text-xl"
            >
              Loading quiz...
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Result Modal */}
      <Dialog open={showResult} onOpenChange={() => {}}>
        <DialogContent className="max-w-lg bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-slate-600/50">
          <DialogHeader>
            <DialogTitle
              className={`text-3xl font-bold ${
                lastResult?.isCorrect ? "text-green-400" : "text-red-400"
              }`}
            >
              {lastResult?.isCorrect ? "✓ Correct!" : "✗ Incorrect"}
            </DialogTitle>
            <DialogDescription className="text-slate-300 text-lg pt-4">
              {lastResult?.explanation}
            </DialogDescription>
            {!lastResult?.isCorrect && (
              <div className="pt-4">
                <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xl px-6 py-3 font-bold">
                  Correct Answer: {lastResult?.correctAction}
                </Badge>
              </div>
            )}
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={onNext}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg"
            >
              Next Question
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
