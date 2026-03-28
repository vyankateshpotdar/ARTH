import { useState } from "react";
import { GlassCard } from "../components/GlassCard";
import { Progress } from "../components/ui/progress";
import { Slider } from "../components/ui/slider";
import { Button } from "../components/ui/button";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, Sparkles, AlertCircle } from "lucide-react";

interface CategoryBudget {
  id: string;
  name: string;
  emoji: string;
  spent: number;
  limit: number;
  color: string;
}

export function Budget() {
  const [categories, setCategories] = useState<CategoryBudget[]>([
    {
      id: "food",
      name: "Food & Dining",
      emoji: "🍔",
      spent: 8500,
      limit: 10000,
      color: "from-orange-500 to-red-500",
    },
    {
      id: "transport",
      name: "Transport",
      emoji: "🚗",
      spent: 3200,
      limit: 5000,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "shopping",
      name: "Shopping",
      emoji: "🛍️",
      spent: 6800,
      limit: 8000,
      color: "from-pink-500 to-purple-500",
    },
    {
      id: "entertainment",
      name: "Entertainment",
      emoji: "🎮",
      spent: 2500,
      limit: 4000,
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: "bills",
      name: "Bills",
      emoji: "💡",
      spent: 4200,
      limit: 5000,
      color: "from-yellow-500 to-orange-500",
    },
  ]);

  const [editingCategory, setEditingCategory] = useState<string | null>(null);

  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalBudget = categories.reduce((sum, cat) => sum + cat.limit, 0);
  const overallProgress = (totalSpent / totalBudget) * 100;

  const updateCategoryLimit = (id: string, newLimit: number) => {
    setCategories((cats) =>
      cats.map((cat) => (cat.id === id ? { ...cat, limit: newLimit } : cat))
    );
  };

  const getStatusColor = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 90) return "text-red-400";
    if (percentage >= 70) return "text-yellow-400";
    return "text-green-400";
  };

  const getProgressColor = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen p-4 pt-8 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-2">Budget Manager</h1>
          <p className="text-white/60">Control your spending</p>
        </motion.div>
      </div>

      {/* Overall Budget */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard gradient glow className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-white/60 text-sm mb-1">Total Spent</p>
              <h2 className="text-3xl font-bold text-white">
                ₹{totalSpent.toLocaleString()}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-sm mb-1">Budget</p>
              <p className="text-xl font-semibold text-white">
                ₹{totalBudget.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mb-3">
            <Progress value={overallProgress} className="h-3 rounded-full" />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-white/80">{overallProgress.toFixed(0)}% used</span>
            <span className="text-white/80">
              ₹{(totalBudget - totalSpent).toLocaleString()} left
            </span>
          </div>
        </GlassCard>
      </motion.div>

      {/* AI Suggestion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard className="mb-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">AI Suggestion</h3>
              <p className="text-white/80 text-sm mb-3">
                Reduce dining by <span className="text-blue-400 font-semibold">12%</span> to
                save ₹800 this month. You're close to the limit!
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="h-8 bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30 rounded-xl"
                >
                  Adjust Budget
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 text-white/60 hover:text-white hover:bg-white/10 rounded-xl"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Category Budgets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h3 className="text-white font-semibold">Categories</h3>

        {categories.map((category, index) => {
          const percentage = (category.spent / category.limit) * 100;
          const isEditing = editingCategory === category.id;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <GlassCard className="relative overflow-hidden">
                {/* Status indicator */}
                {percentage >= 90 && (
                  <div className="absolute top-3 right-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  </div>
                )}

                <div className="flex items-start gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl flex-shrink-0`}
                  >
                    {category.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold mb-1">
                      {category.name}
                    </h4>
                    <div className="flex items-center gap-2 text-sm">
                      <span className={getStatusColor(category.spent, category.limit)}>
                        ₹{category.spent.toLocaleString()}
                      </span>
                      <span className="text-white/40">of</span>
                      <span className="text-white/60">
                        ₹{category.limit.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setEditingCategory(isEditing ? null : category.id)
                    }
                    className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
                  >
                    {isEditing ? "Done" : "Edit"}
                  </button>
                </div>

                {isEditing ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/80">Monthly Limit</span>
                      <span className="text-white font-semibold">
                        ₹{category.limit.toLocaleString()}
                      </span>
                    </div>
                    <Slider
                      value={[category.limit]}
                      onValueChange={(value) =>
                        updateCategoryLimit(category.id, value[0])
                      }
                      min={1000}
                      max={20000}
                      step={500}
                      className="py-2"
                    />
                  </div>
                ) : (
                  <>
                    <Progress
                      value={percentage}
                      className={`h-2 rounded-full mb-2 ${getProgressColor(
                        category.spent,
                        category.limit
                      )}`}
                    />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/60">
                        {percentage.toFixed(0)}% used
                      </span>
                      {category.spent < category.limit ? (
                        <div className="flex items-center gap-1 text-green-400">
                          <TrendingDown className="w-3 h-3" />
                          <span>
                            ₹{(category.limit - category.spent).toLocaleString()}{" "}
                            left
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-red-400">
                          <TrendingUp className="w-3 h-3" />
                          <span>Over budget!</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
