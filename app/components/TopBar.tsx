"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Activity, Spade } from "lucide-react";

export function TopBar() {
  const pathname = usePathname();

  const isDrill = pathname?.includes("drill");
  const isBlackjack = pathname?.includes("blackjack");
  const isHome = pathname === "/";

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 backdrop-blur-xl sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Mode Selection */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <Link
              href="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isHome
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                  : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50"
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link
              href="/drill"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isDrill
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50"
              }`}
            >
              <Activity className="w-4 h-4" />
              Drill
            </Link>
            <Link
              href="/blackjack"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isBlackjack
                  ? "bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg shadow-yellow-500/30"
                  : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50"
              }`}
            >
              <Spade className="w-4 h-4" />
              Blackjack
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
