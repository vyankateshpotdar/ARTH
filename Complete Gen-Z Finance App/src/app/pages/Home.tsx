import { Link } from "react-router";
import { GlassCard } from "../components/GlassCard";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { motion } from "motion/react";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Sparkles,
  MessageCircle,
  BarChart3,
  Zap,
} from "lucide-react";

export function Home() {
  const safeToSpend = 2450;
  const totalBalance = 45000;
  const spentThisWeek = 3200;
  const savedThisWeek = 1800;
  const spendingProgress = 64;

  return (
    <div className="min-h-screen p-4 pt-8 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-white/60 text-sm mb-1">Good morning 👋</p>
          <h1 className="text-3xl font-bold text-white">Your FlowFi</h1>
        </motion.div>
      </div>

      {/* Total Balance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard gradient glow className="mb-6 relative overflow-hidden">
          {/* Sparkle icon */}
          <div className="absolute top-4 right-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.4)]">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="mb-4">
            <p className="text-white/60 text-sm mb-1">Total Balance</p>
            <h2 className="text-4xl font-bold text-white">
              ₹{totalBalance.toLocaleString()}
            </h2>
          </div>

          {/* Safe to Spend */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-green-400 text-sm font-semibold">
                Safe to Spend Today
              </p>
              <Zap className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-green-400">
              ₹{safeToSpend.toLocaleString()}
            </p>
            <p className="text-green-400/60 text-xs mt-1">
              Based on AI calculation
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {/* Spend vs Save Meter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">This Week</h3>
            <span className="text-white/60 text-sm">{spendingProgress}%</span>
          </div>

          <div className="mb-4">
            <Progress value={spendingProgress} className="h-3 rounded-full" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-pink-400" />
              </div>
              <div>
                <p className="text-white/60 text-xs">Spent</p>
                <p className="text-white font-semibold">
                  ₹{spentThisWeek.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-white/60 text-xs">Saved</p>
                <p className="text-white font-semibold">
                  ₹{savedThisWeek.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Achievement Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard className="mb-6 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 border-purple-500/20">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🎉</span>
                <h3 className="text-white font-semibold">Great Job!</h3>
              </div>
              <p className="text-white/80 text-sm mb-3">
                You saved ₹{savedThisWeek.toLocaleString()} this week! That's{" "}
                <span className="text-green-400 font-semibold">36%</span> more
                than last week.
              </p>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 text-xs font-semibold">
                  +15 XP earned
                </span>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/add-expense">
            <Button className="w-full h-24 bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,77,141,0.3)]">
              <Plus className="w-6 h-6" />
              <span>Add Expense</span>
            </Button>
          </Link>

          <Link to="/goals">
            <Button className="w-full h-24 bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-[0_0_20px_rgba(44,182,125,0.3)]">
              <TrendingUp className="w-6 h-6" />
              <span>Save Money</span>
            </Button>
          </Link>

          <Link to="/simulate">
            <Button className="w-full h-24 bg-gradient-to-br from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-[0_0_20px_rgba(127,90,240,0.3)]">
              <BarChart3 className="w-6 h-6" />
              <span>Simulate</span>
            </Button>
          </Link>

          <Link to="/coach">
            <Button className="w-full h-24 bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-[0_0_20px_rgba(61,169,252,0.3)]">
              <MessageCircle className="w-6 h-6" />
              <span>AI Coach</span>
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* AI Tip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <GlassCard className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">AI Tip 💡</h3>
              <p className="text-white/80 text-sm mb-3">
                You can reduce dining by 12% and save an extra ₹800 this month!
              </p>
              <Link to="/coach">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30 rounded-xl"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
