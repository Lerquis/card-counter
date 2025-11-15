"use client";

import { useEffect, useState } from "react";
import { useGame } from "@/store/useGame";
import { TopBar } from "@/app/components/TopBar";
import { QuizBoard } from "@/app/components/QuizBoard";
import { QuizConfiguration } from "@/app/components/QuizConfiguration";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";

export default function QuizPage() {
  const { quiz, startQuiz, answerQuiz, nextQuestionQuiz } = useGame();
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Initialize quiz on mount
  useEffect(() => {
    if (!quiz.session) {
      startQuiz(quiz.config);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950">
      <TopBar />

      <div className="max-w-7xl mx-auto p-6 space-y-6 h-[calc(100vh-100px)] md:h-[calc(100vh-100px)] sm:h-[calc(100vh-80px)] overflow-y-auto">
        {/* Main Quiz Board */}
        <QuizBoard
          currentHand={quiz.currentHand}
          stats={quiz.stats}
          lastResult={quiz.lastResult}
          showResult={quiz.showResult}
          onAnswer={answerQuiz}
          onNext={nextQuestionQuiz}
          onOpenConfig={() => setShowConfigModal(true)}
          config={quiz.config}
        />
      </div>

      {/* Configuration Modal */}
      <Dialog open={showConfigModal} onOpenChange={setShowConfigModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-slate-600/50">
          <DialogHeader>
            <DialogTitle className="text-2xl text-slate-100 font-bold">Quiz Configuration</DialogTitle>
            <DialogDescription className="text-slate-400">
              Configure quiz settings. Changes will reset your current stats.
            </DialogDescription>
          </DialogHeader>
          <QuizConfiguration />
        </DialogContent>
      </Dialog>
    </div>
  );
}
