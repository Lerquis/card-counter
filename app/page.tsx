import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Activity, Spade, TrendingUp, Target, Zap, BookOpen, Brain } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm px-8 py-4 rounded-full border border-cyan-500/20">
            <Spade className="w-16 h-16 text-yellow-400 drop-shadow-glow" />
            <Activity className="w-16 h-16 text-cyan-400 drop-shadow-glow" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-200 to-cyan-400 drop-shadow-2xl">
            Blackjack Card Counter
          </h1>
          <p className="text-2xl text-slate-200 max-w-3xl mx-auto font-light">
            Master card counting with interactive drills and practice your
            skills with real blackjack gameplay
          </p>
        </div>

        {/* Mode Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Quiz Mode */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
            <Card className="relative bg-slate-900/90 backdrop-blur-xl border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
              <CardHeader className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <Brain className="w-8 h-8 text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white">Strategy Quiz</CardTitle>
                    <CardDescription className="text-slate-400">
                      Test your blackjack knowledge
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-start gap-2 text-slate-300">
                    <Brain className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Strategy practice</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <Target className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Instant feedback</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <TrendingUp className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Track accuracy</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <Zap className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Deviation testing</span>
                  </div>
                </div>
                <Link href="/quiz" className="block">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-0 shadow-lg shadow-purple-500/50" size="lg">
                    Start Quiz
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Drill Mode */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
            <Card className="relative bg-slate-900/90 backdrop-blur-xl border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
              <CardHeader className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <Activity className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white">Card Counting Drill</CardTitle>
                    <CardDescription className="text-slate-400">
                      Train your counting skills
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-start gap-2 text-slate-300">
                    <Zap className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Manual card practice</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Running & true count</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <Target className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">1-8 decks configurable</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Card verification</span>
                  </div>
                </div>
                <Link href="/drill" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white border-0 shadow-lg shadow-blue-500/50" size="lg">
                    Start Training Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Blackjack Mode */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
            <Card className="relative bg-slate-900/90 backdrop-blur-xl border-slate-700/50 hover:border-yellow-500/50 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl" />
              <CardHeader className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-yellow-500/20 rounded-xl">
                    <Spade className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white">Blackjack Game</CardTitle>
                    <CardDescription className="text-slate-400">
                      Play with strategy hints
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-start gap-2 text-slate-300">
                    <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Full gameplay</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Basic strategy hints</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <Target className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Index deviations</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Casino rules</span>
                  </div>
                </div>
                <Link href="/blackjack" className="block">
                  <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white border-0 shadow-lg shadow-yellow-500/50" size="lg">
                    Play Blackjack
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Educational Sections */}
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-cyan-500 rounded-full" />
              <BookOpen className="w-6 h-6 text-cyan-400" />
              Learn Blackjack & Card Counting
            </CardTitle>
            <CardDescription className="text-slate-400">
              Everything you need to know to master the game
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {/* Basic Rules */}
              <AccordionItem value="rules" className="border-slate-700">
                <AccordionTrigger className="text-white hover:text-cyan-400 text-lg">
                  📋 Basic Blackjack Rules
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <h4 className="text-cyan-400 font-semibold mb-3">Game Objective</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Beat the dealer by getting a hand value closer to 21 without going over. Number cards count as their face value, face cards (J, Q, K) count as 10, and Aces count as either 1 or 11.
                    </p>
                  </div>

                  <div className="bg-slate-800/50 p-4 rounded-lg overflow-x-auto">
                    <h4 className="text-cyan-400 font-semibold mb-3">Player Actions</h4>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left py-2 px-3 text-yellow-400">Action</th>
                          <th className="text-left py-2 px-3 text-slate-300">Description</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-300">
                        <tr className="border-b border-slate-700/50">
                          <td className="py-2 px-3 font-semibold text-green-400">Hit</td>
                          <td className="py-2 px-3">Take another card</td>
                        </tr>
                        <tr className="border-b border-slate-700/50">
                          <td className="py-2 px-3 font-semibold text-red-400">Stand</td>
                          <td className="py-2 px-3">Keep your current hand</td>
                        </tr>
                        <tr className="border-b border-slate-700/50">
                          <td className="py-2 px-3 font-semibold text-blue-400">Double</td>
                          <td className="py-2 px-3">Double your bet, take one card, then stand</td>
                        </tr>
                        <tr className="border-b border-slate-700/50">
                          <td className="py-2 px-3 font-semibold text-purple-400">Split</td>
                          <td className="py-2 px-3">Split a pair into two separate hands</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold text-orange-400">Surrender</td>
                          <td className="py-2 px-3">Forfeit half your bet and end the hand</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <h4 className="text-cyan-400 font-semibold mb-3">Payouts</h4>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="bg-green-900/30 p-3 rounded border border-green-700/50">
                        <div className="text-green-400 font-bold">3:2</div>
                        <div className="text-slate-300 text-xs">Blackjack (21 with 2 cards)</div>
                      </div>
                      <div className="bg-blue-900/30 p-3 rounded border border-blue-700/50">
                        <div className="text-blue-400 font-bold">1:1</div>
                        <div className="text-slate-300 text-xs">Regular win</div>
                      </div>
                      <div className="bg-cyan-900/30 p-3 rounded border border-cyan-700/50">
                        <div className="text-cyan-400 font-bold">2:1</div>
                        <div className="text-slate-300 text-xs">Insurance (if dealer has BJ)</div>
                      </div>
                    </div>
                  </div>

                  {/* Basic Strategy Tables */}
                  <div className="bg-slate-800/50 p-4 rounded-lg overflow-x-auto space-y-6">
                    <div>
                      <h4 className="text-cyan-400 font-semibold mb-3">Basic Strategy - Hard Totals</h4>
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-yellow-400">Player</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">2</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">3</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">4</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">5</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">6</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">7</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">8</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">9</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">10</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">A</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">17-20</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">16</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-orange-900/40 p-2 text-orange-300">Sr</td><td className="border border-slate-600 bg-orange-900/40 p-2 text-orange-300">Sr</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">15</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-orange-900/40 p-2 text-orange-300">Sr</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">13-14</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">12</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">11</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">10</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">9</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">5-8</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td></tr>
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <h4 className="text-cyan-400 font-semibold mb-3">Basic Strategy - Soft Totals</h4>
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-yellow-400">Player</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">2</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">3</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">4</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">5</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">6</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">7</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">8</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">9</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">10</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">A</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">A,9</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">A,8</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">Ds</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">A,7</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">Ds</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">Ds</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">Ds</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">Ds</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">Ds</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">A,6</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">A,4-5</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">A,2-3</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td></tr>
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <h4 className="text-cyan-400 font-semibold mb-3">Basic Strategy - Pairs</h4>
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-yellow-400">Player</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">2</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">3</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">4</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">5</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">6</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">7</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">8</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">9</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">10</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">A</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">A,A</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">10,10</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">9,9</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td><td className="border border-slate-600 bg-red-900/40 p-2 text-red-300">S</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">8,8</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">7,7</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">6,6</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">5,5</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-blue-900/40 p-2 text-blue-300">D</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">4,4</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">2,2-3,3</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300">P</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td><td className="border border-slate-600 bg-green-900/40 p-2 text-green-300">H</td></tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 p-3 rounded-lg border border-slate-600">
                      <h4 className="text-yellow-400 font-semibold mb-2 text-sm">Legend:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-green-900/40 border border-green-700 rounded flex items-center justify-center text-green-300">H</div>
                          <span className="text-slate-300">Hit</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-red-900/40 border border-red-700 rounded flex items-center justify-center text-red-300">S</div>
                          <span className="text-slate-300">Stand</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-900/40 border border-blue-700 rounded flex items-center justify-center text-blue-300">D</div>
                          <span className="text-slate-300">Double</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-purple-900/40 border border-purple-700 rounded flex items-center justify-center text-purple-300">P</div>
                          <span className="text-slate-300">Split</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-orange-900/40 border border-orange-700 rounded flex items-center justify-center text-orange-300 text-[10px]">Sr</div>
                          <span className="text-slate-300">Surrender</span>
                        </div>
                      </div>
                      <p className="text-slate-400 text-xs mt-2">
                        <strong>Ds</strong> = Double if allowed, otherwise Stand |
                        <strong> D</strong> = Double if allowed, otherwise Hit
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Card Counting */}
              <AccordionItem value="counting" className="border-slate-700">
                <AccordionTrigger className="text-white hover:text-cyan-400 text-lg">
                  🎯 Card Counting & True Count
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 p-4 rounded-lg border border-cyan-700/30">
                    <p className="text-slate-200 leading-relaxed">
                      This application teaches the{" "}
                      <span className="text-cyan-400 font-semibold">Hi-Lo card counting system</span>, one of the most
                      popular and effective methods for tracking the ratio of high to
                      low cards in blackjack.
                    </p>
                  </div>

                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <h4 className="text-cyan-400 font-semibold mb-3">Hi-Lo Count Values</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-green-900/30 p-4 rounded-lg border border-green-700/50">
                        <div className="text-green-400 font-bold text-2xl mb-2">+1</div>
                        <div className="text-slate-300 font-semibold mb-1">Low Cards</div>
                        <div className="text-slate-400 text-sm">2, 3, 4, 5, 6</div>
                        <div className="text-slate-500 text-xs mt-2">Good for dealer (more likely to bust)</div>
                      </div>
                      <div className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-700/50">
                        <div className="text-yellow-400 font-bold text-2xl mb-2">0</div>
                        <div className="text-slate-300 font-semibold mb-1">Neutral Cards</div>
                        <div className="text-slate-400 text-sm">7, 8, 9</div>
                        <div className="text-slate-500 text-xs mt-2">No effect on count</div>
                      </div>
                      <div className="bg-red-900/30 p-4 rounded-lg border border-red-700/50">
                        <div className="text-red-400 font-bold text-2xl mb-2">-1</div>
                        <div className="text-slate-300 font-semibold mb-1">High Cards</div>
                        <div className="text-slate-400 text-sm">10, J, Q, K, A</div>
                        <div className="text-slate-500 text-xs mt-2">Good for player (more blackjacks)</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <h4 className="text-cyan-400 font-semibold mb-3">Understanding Counts</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-600 text-white font-bold px-3 py-1 rounded text-sm mt-1">RC</div>
                        <div>
                          <div className="text-slate-200 font-semibold">Running Count</div>
                          <div className="text-slate-400 text-sm">The raw count of all cards seen. Add/subtract as each card is dealt.</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-cyan-600 text-white font-bold px-3 py-1 rounded text-sm mt-1">TC</div>
                        <div>
                          <div className="text-slate-200 font-semibold">True Count</div>
                          <div className="text-slate-400 text-sm">Running Count ÷ Decks Remaining. This normalizes the count to account for how many cards are left.</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 p-4 rounded-lg border border-green-700/50">
                    <h4 className="text-green-400 font-semibold mb-2">💰 Betting Strategy</h4>
                    <div className="text-slate-300 text-sm space-y-2">
                      <p><strong>TC ≤ +1:</strong> Bet minimum (house has advantage)</p>
                      <p><strong>TC +2:</strong> Increase bet 2-4x (slight player advantage)</p>
                      <p><strong>TC +3:</strong> Increase bet 4-6x (good player advantage)</p>
                      <p><strong>TC +4 or higher:</strong> Maximum bet (strong player advantage)</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Index Deviations */}
              <AccordionItem value="deviations" className="border-slate-700">
                <AccordionTrigger className="text-white hover:text-cyan-400 text-lg">
                  📊 Index Deviations (Illustrious 18 + Fab 4)
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-4 rounded-lg border border-purple-700/30">
                    <p className="text-slate-200 leading-relaxed text-sm">
                      Index deviations are strategic adjustments to basic strategy based on the true count.
                      The <span className="text-purple-400 font-semibold">Illustrious 18</span> are the most profitable play deviations,
                      while the <span className="text-pink-400 font-semibold">Fab 4</span> are the most important surrender deviations.
                    </p>
                  </div>

                  <div className="bg-slate-800/50 p-4 rounded-lg overflow-x-auto space-y-4">
                    <div>
                      <h4 className="text-purple-400 font-semibold mb-3">The Illustrious 18 - Deviation Matrix</h4>
                      <p className="text-slate-400 text-sm mb-3">Shows the True Count at which to deviate from basic strategy. Empty cells mean follow basic strategy.</p>
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-yellow-400">Player</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">2</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">3</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">4</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">5</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">6</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">7</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">8</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">9</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">10</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">A</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">Insurance</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300 font-bold">+3 ✓</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">10,10</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300 font-bold">+5 P</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-purple-300 font-bold">+4 P</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">16</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-red-300 font-bold">+5 S</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-red-300 font-bold">0 S</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-red-300 font-bold">+5 S</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">15</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-red-300 font-bold">+4 S</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-red-300 font-bold">+5 S</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">13</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-red-300 font-bold">-1 S</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">12</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-red-300 font-bold">+3 S</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-red-300 font-bold">+2 S</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-red-300 font-bold">0 S</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">11</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-blue-300 font-bold">+1 D</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">10</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-blue-300 font-bold">+4 D</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-blue-300 font-bold">+4 D</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">9</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-blue-300 font-bold">+1 D</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-blue-300 font-bold">+3 D</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">8</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-purple-900/40 p-2 text-blue-300 font-bold">+2 D</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td></tr>
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <h4 className="text-pink-400 font-semibold mb-3">The Fab 4 Surrenders - Deviation Matrix</h4>
                      <p className="text-slate-400 text-sm mb-3">Shows when to surrender based on True Count. Empty cells mean follow basic strategy.</p>
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-yellow-400">Player</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">2</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">3</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">4</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">5</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">6</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">7</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">8</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">9</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">10</th>
                            <th className="border border-slate-600 bg-slate-700 p-2 text-cyan-400">A</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">16</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-pink-900/40 p-2 text-orange-300 font-bold">+1 Sr</td><td className="border border-slate-600 bg-pink-900/40 p-2 text-orange-300 font-bold">0 Sr</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td></tr>
                          <tr><td className="border border-slate-600 bg-slate-700 p-2 text-yellow-400 font-semibold">15</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-slate-800/50 p-2 text-slate-600">-</td><td className="border border-slate-600 bg-pink-900/40 p-2 text-orange-300 font-bold">0 Sr</td><td className="border border-slate-600 bg-pink-900/40 p-2 text-orange-300 font-bold">+1 Sr</td></tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 p-3 rounded-lg border border-slate-600">
                      <h4 className="text-yellow-400 font-semibold mb-2 text-sm">Deviation Legend:</h4>
                      <div className="grid md:grid-cols-3 gap-2 text-xs text-slate-300">
                        <div><span className="text-blue-300 font-bold">D</span> = Double at this TC</div>
                        <div><span className="text-red-300 font-bold">S</span> = Stand at this TC</div>
                        <div><span className="text-purple-300 font-bold">P</span> = Split at this TC</div>
                        <div><span className="text-orange-300 font-bold">Sr</span> = Surrender at this TC</div>
                        <div><span className="text-purple-300 font-bold">✓</span> = Take Insurance at this TC</div>
                      </div>
                      <p className="text-slate-400 text-xs mt-2">
                        Numbers show the True Count threshold. For example, "+3 D" means double when TC ≥ +3.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 p-4 rounded-lg border border-yellow-700/50">
                    <h4 className="text-yellow-400 font-semibold mb-2">💡 Usage Tips</h4>
                    <ul className="text-slate-300 text-sm space-y-1 list-disc list-inside">
                      <li>Learn insurance at TC +3 first - it's the most valuable</li>
                      <li>Master the 16 vs 10 plays (both surrender and stand)</li>
                      <li>Practice deviations in this app's Blackjack mode</li>
                      <li>Enable "Index Deviations" in settings to see hints</li>
                    </ul>
                  </div>

                  <p className="text-slate-400 text-xs italic border-l-2 border-cyan-600 pl-3 py-2 bg-cyan-900/10 rounded">
                    Note: These deviations assume 6-deck, H17 (dealer hits soft 17), DAS (double after split allowed).
                    Exact indices may vary slightly with different rules.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <p className="text-slate-400 text-xs italic border-l-2 border-cyan-600 pl-3 py-2 bg-cyan-900/10 rounded mt-4">
              ⚠️ This is for educational purposes only. Card counting is legal but may be prohibited in casinos.
              Always gamble responsibly.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
