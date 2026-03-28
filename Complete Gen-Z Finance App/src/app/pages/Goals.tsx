import { useState } from "react";
import { GlassCard } from "../components/GlassCard";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { motion } from "motion/react";
import { Plus, Target, TrendingUp, Calendar, Zap } from "lucide-react";

interface Goal {
  id: string;
  name: string;
  emoji: string;
  target: number;
  current: number;
  deadline: string;
  autoSave: boolean;
  color: string;
  priority?: boolean;
}

export function Goals() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "emergency",
      name: "Emergency Fund",
      emoji: "🛡️",
      target: 50000,
      current: 32000,
      deadline: "Dec 2026",
      autoSave: true,
      color: "from-green-500 to-emerald-500",
      priority: true,
    },
    {
      id: "vacation",
      name: "Bali Trip",
      emoji: "🏖️",
      target: 80000,
      current: 24000,
      deadline: "Jun 2026",
      autoSave: true,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "laptop",
      name: "New Laptop",
      emoji: "💻",
      target: 60000,
      current: 15000,
      deadline: "Aug 2026",
      autoSave: false,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "invest",
      name: "Investment Fund",
      emoji: "📈",
      target: 100000,
      current: 28000,
      deadline: "Dec 2026",
      autoSave: true,
      color: "from-orange-500 to-red-500",
    },
  ]);

  const toggleAutoSave = (id: string) => {
    setGoals((goals) =>
      goals.map((goal) =>
        goal.id === id ? { ...goal, autoSave: !goal.autoSave } : goal
      )
    );
  };

  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  const totalCurrent = goals.reduce((sum, goal) => sum + goal.current, 0);
  const overallProgress = (totalCurrent / totalTarget) * 100;

  return (
    <div className="min-h-screen p-4 pt-8 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-2">Savings Goals</h1>
          <p className="text-white/60">Track your financial dreams</p>
        </motion.div>
      </div>

      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard gradient glow className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/60 text-sm mb-1">Total Saved</p>
              <h2 className="text-3xl font-bold text-white">
                ₹{totalCurrent.toLocaleString()}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-sm mb-1">Target</p>
              <p className="text-xl font-semibold text-white">
                ₹{totalTarget.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mb-3">
            <Progress value={overallProgress} className="h-3 rounded-full" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/80 text-sm">
              {overallProgress.toFixed(0)}% completed
            </span>
            <div className="flex items-center gap-1 text-green-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>On track!</span>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Goals List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 mb-6"
      >
        {goals.map((goal, index) => {
          const progress = (goal.current / goal.target) * 100;
          const remaining = goal.target - goal.current;

          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <GlassCard
                className={`relative ${
                  goal.priority
                    ? "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30"
                    : ""
                }`}
              >
                {/* Priority Badge */}
                {goal.priority && (
                  <div className="absolute top-3 right-3">
                    <div className="px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-green-400 font-semibold">
                        Priority
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${goal.color} flex items-center justify-center text-3xl flex-shrink-0 shadow-lg`}
                  >
                    {goal.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {goal.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Calendar className="w-4 h-4" />
                      <span>{goal.deadline}</span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-white/80">
                      ₹{goal.current.toLocaleString()}
                    </span>
                    <span className="text-white/60">
                      ₹{goal.target.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2 rounded-full" />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-white/60">
                      {progress.toFixed(0)}% completed
                    </span>
                    <span className="text-xs text-white/60">
                      ₹{remaining.toLocaleString()} to go
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={goal.autoSave}
                      onCheckedChange={() => toggleAutoSave(goal.id)}
                    />
                    <span className="text-sm text-white/80">Auto-save</span>
                  </div>
                  <Button
                    size="sm"
                    className="h-8 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl"
                  >
                    Add ₹500
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Add New Goal Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button className="w-full h-14 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl shadow-[0_0_20px_rgba(127,90,240,0.4)] flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          <span>Create New Goal</span>
        </Button>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6"
      >
        <GlassCard className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <div className="flex gap-3">
            <Target className="w-6 h-6 text-blue-400 flex-shrink-0" />
            <div>
              <h4 className="text-white font-semibold mb-1">Pro Tip 💡</h4>
              <p className="text-white/80 text-sm">
                Enable auto-save to automatically transfer money to your goals
                every week. You'll reach them faster!
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
